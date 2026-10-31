export type EquationProblemType = 'opuestos' | 'suplementarios' | 'complementarios';

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
  relationType: 'igualdad' | 'suma180' | 'suma90';
  xSolution: number;
  alphaSolution: number;
  betaSolution: number;
  steps: string[];
}

/** Generador de números en [0, 1). Inyectable para tests y para render determinista (SSR). */
export type Rng = () => number;

/** PRNG determinista (mulberry32): misma semilla, mismos ejercicios. */
export function createSeededRng(seed: number): Rng {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateOppositeEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 12; // 12 a 19
  const c = Math.floor(rng() * 2) + 1;  // 1 a 2
  const a = c + Math.floor(rng() * 2) + 1; // 2 a 4
  const b = Math.floor(rng() * 15) + 5;   // 5 a 19
  const diff = (a - c) * x;
  const d = b + diff;

  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `opp_${Math.floor(rng() * 1e9)}`,
    type: 'opuestos',
    title: 'Ángulos Opuestos por el Vértice',
    diagramAngle: alpha,
    a, b, c, d,
    exprAlpha: `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}^\\circ`,
    exprBeta: `${c}x + ${d}^\\circ`,
    relationType: 'igualdad',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: [
      `\\text{Por ser opuestos por el vértice: } \\alpha = \\beta`,
      `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}^\\circ = ${c}x + ${d}^\\circ`,
      `${a}x - ${c}x = ${d}^\\circ - ${b}^\\circ`,
      `${a - c}x = ${d - b}^\\circ \\implies x = ${x}`,
      `\\alpha = ${a} \\cdot (${x}) + ${b}^\\circ = ${alpha}^\\circ \\implies \\beta = ${beta}^\\circ`,
      `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
    ]
  };
}

export function generateSupplementaryEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 10; // 10 a 17
  const a = Math.floor(rng() * 3) + 2;  // 2 a 4
  const c = Math.floor(rng() * 2) + 1;  // 1 a 2
  const totalCoeff = a + c;
  const targetLinear = totalCoeff * x;
  const remainder = 180 - targetLinear;
  const b = Math.floor(remainder / 2);
  const d = remainder - b;

  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `sup_${Math.floor(rng() * 1e9)}`,
    type: 'suplementarios',
    title: 'Ángulos Adyacentes y Suplementarios',
    diagramAngle: alpha,
    a, b, c, d,
    exprAlpha: `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}^\\circ`,
    exprBeta: `${c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)}^\\circ`,
    relationType: 'suma180',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: [
      `\\text{Por ser adyacentes suplementarios: } \\alpha + \\beta = 180^\\circ`,
      `(${a}x + ${b}^\\circ) + (${c}x + ${d}^\\circ) = 180^\\circ`,
      `${a + c}x + ${b + d}^\\circ = 180^\\circ`,
      `${a + c}x = 180^\\circ - ${b + d}^\\circ = ${180 - (b + d)}^\\circ \\implies x = ${x}`,
      `\\alpha = ${alpha}^\\circ, \\quad \\beta = 180^\\circ - ${alpha}^\\circ = ${beta}^\\circ`,
      `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
    ]
  };
}

export function generateRandomProblem(rng: Rng = Math.random): EquationProblem {
  return rng() > 0.5
    ? generateOppositeEquationProblem(rng)
    : generateSupplementaryEquationProblem(rng);
}
