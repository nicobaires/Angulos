import { describe, it, expect } from 'vitest';
import { DECIMAL_CHALLENGES, getShuffledChallengeIndices } from './decimalChallenges';

describe('decimalChallenges', () => {
  it('contiene 12 desafíos representativos de los 3 tipos', () => {
    expect(DECIMAL_CHALLENGES.length).toBe(12);

    const exacts = DECIMAL_CHALLENGES.filter((c) => c.type === 'exact');
    const pures = DECIMAL_CHALLENGES.filter((c) => c.type === 'pure_periodic');
    const mixed = DECIMAL_CHALLENGES.filter((c) => c.type === 'mixed_periodic');

    expect(exacts.length).toBe(4);
    expect(pures.length).toBe(4);
    expect(mixed.length).toBe(4);
  });

  it('cada desafío tiene soluciones matemáticas consistentes con su conversión', () => {
    for (const c of DECIMAL_CHALLENGES) {
      expect(c.targetNum).toBe(c.conversion.simplified.num);
      expect(c.targetDen).toBe(c.conversion.simplified.den);
      expect(c.hint.length).toBeGreaterThan(10);
      expect(c.id).toBeDefined();
    }
  });

  it('getShuffledChallengeIndices devuelve todos los índices sin duplicados', () => {
    const indices = getShuffledChallengeIndices();
    expect(indices.length).toBe(DECIMAL_CHALLENGES.length);
    const set = new Set(indices);
    expect(set.size).toBe(DECIMAL_CHALLENGES.length);
  });

  it('permite inyectar un RNG determinista para reproducibilidad', () => {
    // Generador determinista de prueba
    let seed = 42;
    const fakeRng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const res1 = getShuffledChallengeIndices(fakeRng);
    seed = 42;
    const res2 = getShuffledChallengeIndices(fakeRng);
    expect(res1).toEqual(res2);
  });
});
