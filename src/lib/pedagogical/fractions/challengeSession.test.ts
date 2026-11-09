import { describe, it, expect } from 'vitest';
import { evaluateChallengeAttempt } from './challengeSession';
import { DECIMAL_CHALLENGES } from './decimalChallenges';

describe('evaluateChallengeAttempt', () => {
  const mockChallenge = DECIMAL_CHALLENGES[1]; // 0,75 = 3/4

  it('descarta entradas no numéricas o vacías', () => {
    const res = evaluateChallengeAttempt({
      rawNum: '',
      rawDen: '4',
      challenge: mockChallenge,
      history: [],
      isNewStar: true
    });
    expect(res.valid).toBe(false);
  });

  it('procesa respuesta irreducible correcta', () => {
    const res = evaluateChallengeAttempt({
      rawNum: '3',
      rawDen: '4',
      challenge: mockChallenge,
      history: [],
      isNewStar: true
    });
    expect(res.valid).toBe(true);
    expect(res.isComplete).toBe(true);
    expect(res.notify).toBe(true);
    expect(res.clearsInput).toBe(true);
    expect(res.nextHistory).toEqual([{ num: 3, den: 4 }]);
    expect(res.feedbackType).toBe('success');
  });

  it('admite reducción intermedia sin penalizar', () => {
    const res = evaluateChallengeAttempt({
      rawNum: '75',
      rawDen: '100',
      challenge: mockChallenge,
      history: [],
      isNewStar: true
    });
    expect(res.valid).toBe(true);
    expect(res.isComplete).toBe(false);
    expect(res.notify).toBeUndefined();
    expect(res.clearsInput).toBe(true);
    expect(res.nextHistory).toEqual([{ num: 75, den: 100 }]);
    expect(res.feedbackType).toBe('warning');
  });

  it('marca error cuando la fracción no es equivalente', () => {
    const res = evaluateChallengeAttempt({
      rawNum: '1',
      rawDen: '2',
      challenge: mockChallenge,
      history: [],
      isNewStar: true
    });
    expect(res.valid).toBe(true);
    expect(res.isComplete).toBe(false);
    expect(res.notify).toBe(false);
    expect(res.clearsInput).toBe(false);
    expect(res.feedbackType).toBe('error');
    expect(res.feedbackMessage).toContain('💡 Pista:');
  });
});
