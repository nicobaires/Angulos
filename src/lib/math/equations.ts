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

function formatSigned(n: number): string {
  return n >= 0 ? `+ ${n}^\\circ` : `- ${Math.abs(n)}^\\circ`;
}

function buildEqualitySteps(
  rule: string, a: number, b: number, c: number, d: number, x: number, alpha: number, beta: number
): string[] {
  return [
    `\\text{${rule}: } \\alpha = \\beta`,
    `${a}x ${formatSigned(b)} = ${c}x + ${d}^\\circ`,
    `${a}x - ${c}x = ${d}^\\circ - ${b}^\\circ`,
    `${a - c}x = ${d - b}^\\circ \\implies x = ${x}`,
    `\\alpha = ${a} \\cdot (${x}) ${formatSigned(b)} = ${alpha}^\\circ \\implies \\beta = ${beta}^\\circ`,
    `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
  ];
}

function buildSumSteps(
  rule: string, a: number, b: number, c: number, d: number, total: number, x: number, alpha: number, beta: number
): string[] {
  return [
    `\\text{${rule}: } \\alpha + \\beta = ${total}^\\circ`,
    `(${a}x ${formatSigned(b)}) + (${c}x ${formatSigned(d)}) = ${total}^\\circ`,
    `${a + c}x + ${b + d}^\\circ = ${total}^\\circ`,
    `${a + c}x = ${total}^\\circ - ${b + d}^\\circ = ${total - (b + d)}^\\circ \\implies x = ${x}`,
    `\\alpha = ${alpha}^\\circ, \\quad \\beta = ${total}^\\circ - ${alpha}^\\circ = ${beta}^\\circ`,
    `\\text{Rta: } x = ${x}, \\quad \\alpha = ${alpha}^\\circ, \\quad \\beta = ${beta}^\\circ`
  ];
}

export function generateOppositeEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 12; // 12 a 19
  const c = Math.floor(rng() * 2) + 1;
  const a = c + Math.floor(rng() * 2) + 1;
  const b = Math.floor(rng() * 15) + 5;
  const d = b + (a - c) * x;
  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `opp_${Math.floor(rng() * 1e9)}`,
    type: 'opuestos',
    title: 'Ángulos Opuestos por el Vértice',
    diagramAngle: alpha,
    a, b, c, d,
    exprAlpha: `${a}x ${formatSigned(b)}`,
    exprBeta: `${c}x + ${d}^\\circ`,
    relationType: 'igualdad',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: buildEqualitySteps('Por ser opuestos por el vértice', a, b, c, d, x, alpha, beta)
  };
}

export function generateSupplementaryEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 10; // 10 a 17
  const a = Math.floor(rng() * 3) + 2;
  const c = Math.floor(rng() * 2) + 1;
  const remainder = 180 - (a + c) * x;
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
    exprAlpha: `${a}x ${formatSigned(b)}`,
    exprBeta: `${c}x ${formatSigned(d)}`,
    relationType: 'suma180',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: buildSumSteps('Por ser adyacentes suplementarios', a, b, c, d, 180, x, alpha, beta)
  };
}

export function generateComplementaryEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 6) + 6; // 6 a 11
  const a = Math.floor(rng() * 2) + 2;
  const c = Math.floor(rng() * 2) + 1;
  const remainder = 90 - (a + c) * x;
  const b = Math.floor(remainder / 2);
  const d = remainder - b;
  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `comp_${Math.floor(rng() * 1e9)}`,
    type: 'complementarios',
    title: 'Ángulos Complementarios (90°)',
    diagramAngle: alpha,
    a, b, c, d,
    exprAlpha: `${a}x ${formatSigned(b)}`,
    exprBeta: `${c}x ${formatSigned(d)}`,
    relationType: 'suma90',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: buildSumSteps('Por ser complementarios', a, b, c, d, 90, x, alpha, beta)
  };
}

export function generateAlternateInteriorEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 7) + 10; // 10 a 16
  const c = Math.floor(rng() * 2) + 1;
  const a = c + Math.floor(rng() * 2) + 1;
  const b = Math.floor(rng() * 12) + 8;
  const d = b + (a - c) * x;
  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `alt_${Math.floor(rng() * 1e9)}`,
    type: 'paralelas_alternos',
    title: 'Paralelas y Secante: Alternos Internos',
    diagramAngle: alpha > 140 ? 120 : (alpha < 40 ? 55 : alpha),
    a, b, c, d,
    exprAlpha: `${a}x ${formatSigned(b)}`,
    exprBeta: `${c}x + ${d}^\\circ`,
    relationType: 'igualdad',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: buildEqualitySteps('Por ser alternos internos entre paralelas', a, b, c, d, x, alpha, beta)
  };
}

export function generateConsecutiveInteriorEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 10; // 10 a 17
  const a = Math.floor(rng() * 2) + 2;
  const c = Math.floor(rng() * 2) + 1;
  const remainder = 180 - (a + c) * x;
  const b = Math.floor(remainder / 2);
  const d = remainder - b;
  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `conj_${Math.floor(rng() * 1e9)}`,
    type: 'paralelas_conjugados',
    title: 'Paralelas y Secante: Conjugados Internos',
    diagramAngle: alpha,
    a, b, c, d,
    exprAlpha: `${a}x ${formatSigned(b)}`,
    exprBeta: `${c}x ${formatSigned(d)}`,
    relationType: 'suma180',
    xSolution: x,
    alphaSolution: alpha,
    betaSolution: beta,
    steps: buildSumSteps('Por ser conjugados internos entre paralelas', a, b, c, d, 180, x, alpha, beta)
  };
}

export function generateRandomProblem(rng: Rng = Math.random): EquationProblem {
  const roll = rng();
  if (roll < 0.22) return generateComplementaryEquationProblem(rng);
  if (roll < 0.44) return generateAlternateInteriorEquationProblem(rng);
  if (roll < 0.66) return generateConsecutiveInteriorEquationProblem(rng);
  if (roll < 0.83) return generateOppositeEquationProblem(rng);
  return generateSupplementaryEquationProblem(rng);
}
