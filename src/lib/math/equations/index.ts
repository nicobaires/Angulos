import type { EquationProblem, Rng } from './types';
import {
  generateOppositeEquationProblem,
  generateSupplementaryEquationProblem,
  generateComplementaryEquationProblem,
  generateAlternateInteriorEquationProblem,
  generateConsecutiveInteriorEquationProblem
} from './builders';

export * from './types';
export * from './steps';
export * from './builders';

export function generateRandomProblem(rng: Rng = Math.random): EquationProblem {
  const roll = rng();
  if (roll < 0.22) return generateComplementaryEquationProblem(rng);
  if (roll < 0.44) return generateAlternateInteriorEquationProblem(rng);
  if (roll < 0.66) return generateConsecutiveInteriorEquationProblem(rng);
  if (roll < 0.83) return generateOppositeEquationProblem(rng);
  return generateSupplementaryEquationProblem(rng);
}
