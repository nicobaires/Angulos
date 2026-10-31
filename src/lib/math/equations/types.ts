export type EquationProblemType =
  | 'opuestos'
  | 'suplementarios'
  | 'complementarios'
  | 'paralelas_alternos'
  | 'paralelas_conjugados';

export type EquationRelationType = 'igualdad' | 'suma180' | 'suma90';

export interface EquationProblem {
  id: string;
  type: EquationProblemType;
  title: string;
  diagramAngle: number;
  a: number;
  b: number;
  c: number;
  d: number;
  exprAlpha: string;
  exprBeta: string;
  relationType: EquationRelationType;
  xSolution: number;
  alphaSolution: number;
  betaSolution: number;
  steps: string[];
}

export type Rng = () => number;

export function createSeededRng(seed: number): Rng {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
