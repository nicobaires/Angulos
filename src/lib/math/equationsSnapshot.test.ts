import { describe, it, expect } from 'vitest';
import {
  createSeededRng,
  generateOppositeEquationProblem,
  generateSupplementaryEquationProblem,
  generateComplementaryEquationProblem,
  generateAlternateInteriorEquationProblem,
  generateConsecutiveInteriorEquationProblem,
  generateRandomProblem
} from './equations';

describe('equations regression snapshots', () => {
  it('produce exactamente los mismos resultados para 20 semillas fijas', () => {
    const results: Record<string, unknown[]> = {
      opp: [],
      sup: [],
      comp: [],
      alt: [],
      conj: [],
      rand: []
    };

    for (let seed = 1; seed <= 20; seed++) {
      results.opp.push(generateOppositeEquationProblem(createSeededRng(seed)));
      results.sup.push(generateSupplementaryEquationProblem(createSeededRng(seed)));
      results.comp.push(generateComplementaryEquationProblem(createSeededRng(seed)));
      results.alt.push(generateAlternateInteriorEquationProblem(createSeededRng(seed)));
      results.conj.push(generateConsecutiveInteriorEquationProblem(createSeededRng(seed)));
      results.rand.push(generateRandomProblem(createSeededRng(seed)));
    }

    expect(results).toMatchSnapshot();
  });
});
