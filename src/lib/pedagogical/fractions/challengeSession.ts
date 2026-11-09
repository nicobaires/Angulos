import type { DecimalChallenge } from './decimalChallenges';
import { validateFractionAnswer, type FractionStep } from '../../math/fractions';

export interface ChallengeAttemptParams {
  rawNum: string;
  rawDen: string;
  challenge: DecimalChallenge;
  history: FractionStep[];
  isNewStar: boolean;
}

export interface ChallengeAttemptOutcome {
  valid: boolean;
  nextHistory: FractionStep[];
  isComplete: boolean;
  feedbackType: 'success' | 'warning' | 'error' | null;
  feedbackMessage: string;
  clearsInput: boolean;
  notify?: boolean;
}

export function evaluateChallengeAttempt(params: ChallengeAttemptParams): ChallengeAttemptOutcome {
  const { rawNum, rawDen, challenge, history, isNewStar } = params;
  const numTrim = rawNum.trim();
  const denTrim = rawDen.trim();

  if (!/^\d+$/.test(numTrim) || !/^\d+$/.test(denTrim)) {
    return {
      valid: false,
      nextHistory: history,
      isComplete: false,
      feedbackType: null,
      feedbackMessage: '',
      clearsInput: false
    };
  }

  const num = parseInt(numTrim, 10);
  const den = parseInt(denTrim, 10);
  const res = validateFractionAnswer(num, den, challenge.targetNum, challenge.targetDen, history);

  if (res.status === 'correct') {
    return {
      valid: true,
      nextHistory: [...history, { num, den }],
      isComplete: true,
      feedbackType: 'success',
      feedbackMessage: isNewStar ? '⭐ ¡Excelente! +1 Estrella conseguida' : '✔️ ¡Muy bien! Desafío ya completado',
      clearsInput: true,
      notify: true
    };
  }

  if (res.status === 'reducible') {
    return {
      valid: true,
      nextHistory: [...history, { num, den }],
      isComplete: false,
      feedbackType: 'warning',
      feedbackMessage: `${res.message} (Podés simplificar por ${res.gcd})`,
      clearsInput: true
    };
  }

  if (res.status === 'repeated' || res.status === 'amplified') {
    return {
      valid: true,
      nextHistory: history,
      isComplete: false,
      feedbackType: 'warning',
      feedbackMessage: res.message,
      clearsInput: false
    };
  }

  return {
    valid: true,
    nextHistory: history,
    isComplete: false,
    feedbackType: 'error',
    feedbackMessage: `${res.message} 💡 Pista: ${challenge.hint}`,
    clearsInput: false,
    notify: false
  };
}
