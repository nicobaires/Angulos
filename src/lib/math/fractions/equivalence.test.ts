import { describe, it, expect } from 'vitest';
import { validateFractionAnswer } from './equivalence';

describe('validateFractionAnswer', () => {
  const targetNum = 3;
  const targetDen = 4; // 0,75 = 3/4

  it('valida como correct una respuesta irreducible directa', () => {
    const res = validateFractionAnswer(3, 4, targetNum, targetDen);
    expect(res.status).toBe('correct');
  });

  it('valida como reducible una fracción equivalente reducible (ej 75/100)', () => {
    const res = validateFractionAnswer(75, 100, targetNum, targetDen);
    expect(res.status).toBe('reducible');
    if (res.status === 'reducible') {
      expect(res.gcd).toBe(25);
      expect(res.message).toContain('todavía se puede simplificar');
    }
  });

  it('admite pasos intermedios de reducción en cadena (75/100 -> 15/20 -> 3/4)', () => {
    const history = [{ num: 75, den: 100 }];
    const step2 = validateFractionAnswer(15, 20, targetNum, targetDen, history);
    expect(step2.status).toBe('reducible');

    const history2 = [{ num: 75, den: 100 }, { num: 15, den: 20 }];
    const step3 = validateFractionAnswer(3, 4, targetNum, targetDen, history2);
    expect(step3.status).toBe('correct');
  });

  it('detecta fracciones repetidas en la cadena', () => {
    const history = [{ num: 75, den: 100 }];
    const res = validateFractionAnswer(75, 100, targetNum, targetDen, history);
    expect(res.status).toBe('repeated');
    if (res.status === 'repeated') {
      expect(res.message).toContain('Ya ingresaste esa fracción');
    }
  });

  it('detecta amplificación indebida', () => {
    const history = [{ num: 75, den: 100 }];
    const res = validateFractionAnswer(150, 200, targetNum, targetDen, history);
    expect(res.status).toBe('amplified');
    if (res.status === 'amplified') {
      expect(res.message).toContain('amplificar');
    }
  });

  it('rechaza fracciones que no equivalen al decimal', () => {
    const res = validateFractionAnswer(2, 3, targetNum, targetDen);
    expect(res.status).toBe('incorrect');
    if (res.status === 'incorrect') {
      expect(res.message).toContain('no equivale');
    }
  });

  it('rechaza denominadores menores o iguales a cero', () => {
    const res = validateFractionAnswer(3, 0, targetNum, targetDen);
    expect(res.status).toBe('incorrect');
  });
});
