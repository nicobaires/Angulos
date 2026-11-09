import { describe, it, expect } from 'vitest';
import { RELATIONS_MAP, type TransversalRelation } from './transversal';

describe('transversal relations map', () => {
  const expectedRelations: TransversalRelation[] = [
    'alternos_internos',
    'alternos_externos',
    'correspondientes',
    'conjugados_internos',
    'conjugados_externos'
  ];

  it('contains all 5 geometrical transversal relations', () => {
    for (const rel of expectedRelations) {
      expect(RELATIONS_MAP[rel]).toBeDefined();
      expect(RELATIONS_MAP[rel].name).toBeTruthy();
      expect(RELATIONS_MAP[rel].description).toBeTruthy();
      expect(RELATIONS_MAP[rel].formula).toBeTruthy();
      expect(RELATIONS_MAP[rel].rule).toBeTruthy();
      expect(RELATIONS_MAP[rel].pairs.length).toBeGreaterThan(0);
    }
  });

  it('correctly sets congruence for alternating and corresponding angles', () => {
    expect(RELATIONS_MAP.alternos_internos.isCongruent).toBe(true);
    expect(RELATIONS_MAP.alternos_externos.isCongruent).toBe(true);
    expect(RELATIONS_MAP.correspondientes.isCongruent).toBe(true);
  });

  it('correctly sets supplementary property for conjugate angles', () => {
    expect(RELATIONS_MAP.conjugados_internos.isCongruent).toBe(false);
    expect(RELATIONS_MAP.conjugados_externos.isCongruent).toBe(false);
  });

  it('defines valid angle pairs (1 to 8) for each relation', () => {
    expect(RELATIONS_MAP.alternos_internos.pairs).toEqual([[3, 5], [4, 6]]);
    expect(RELATIONS_MAP.alternos_externos.pairs).toEqual([[1, 7], [2, 8]]);
    expect(RELATIONS_MAP.correspondientes.pairs).toEqual([[1, 5], [2, 6], [3, 7], [4, 8]]);
    expect(RELATIONS_MAP.conjugados_internos.pairs).toEqual([[3, 6], [4, 5]]);
    expect(RELATIONS_MAP.conjugados_externos.pairs).toEqual([[1, 8], [2, 7]]);
  });
});
