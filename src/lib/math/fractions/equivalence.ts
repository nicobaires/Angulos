import { gcd } from './gcd';

export type FractionValidationResult =
  | { status: 'correct'; message?: string }
  | { status: 'reducible'; gcd: number; message: string }
  | { status: 'repeated'; message: string }
  | { status: 'amplified'; message: string }
  | { status: 'incorrect'; message: string };

export interface FractionStep {
  num: number;
  den: number;
}

export function validateFractionAnswer(
  num: number,
  den: number,
  targetNum: number,
  targetDen: number,
  history: FractionStep[] = []
): FractionValidationResult {
  if (den <= 0) {
    return { status: 'incorrect', message: 'El denominador debe ser mayor a 0.' };
  }

  const isEquivalent = num * targetDen === den * targetNum;
  if (!isEquivalent) {
    return { status: 'incorrect', message: 'La fracción no equivale a este número decimal.' };
  }

  const alreadyInHistory = history.some((s) => s.num === num && s.den === den);
  if (alreadyInHistory) {
    return {
      status: 'repeated',
      message: 'Ya ingresaste esa fracción. ¡Buscá un divisor común para achicar los números!'
    };
  }

  if (history.length > 0) {
    const last = history[history.length - 1];
    if (num > last.num || den > last.den) {
      return {
        status: 'amplified',
        message: '¡Ojo! La consigna pide simplificar (achicar los números), no amplificar.'
      };
    }
  }

  if (num === targetNum && den === targetDen) {
    return { status: 'correct' };
  }

  const commonDivisor = gcd(num, den);
  return {
    status: 'reducible',
    gcd: commonDivisor,
    message: '¡Muy bien! La fracción es equivalente, pero todavía se puede simplificar.'
  };
}
