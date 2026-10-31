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

export function generateOppositeEquationProblem(): EquationProblem {
  const x = Math.floor(Math.random() * 8) + 12; // 12 a 19
  const c = Math.floor(Math.random() * 2) + 1;  // 1 a 2
  const a = c + Math.floor(Math.random() * 2) + 1; // 2 a 4
  const b = Math.floor(Math.random() * 15) + 5;   // 5 a 19
  const diff = (a - c) * x;
  const d = b + diff;

  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `opp_${Date.now()}_${Math.random()}`,
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

export function generateSupplementaryEquationProblem(): EquationProblem {
  const x = Math.floor(Math.random() * 8) + 10; // 10 a 17
  const a = Math.floor(Math.random() * 3) + 2;  // 2 a 4
  const c = Math.floor(Math.random() * 2) + 1;  // 1 a 2
  const totalCoeff = a + c;
  const targetLinear = totalCoeff * x;
  const remainder = 180 - targetLinear;
  const b = Math.floor(remainder / 2);
  const d = remainder - b;

  const alpha = a * x + b;
  const beta = c * x + d;

  return {
    id: `sup_${Date.now()}_${Math.random()}`,
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

export function generateRandomProblem(): EquationProblem {
  return Math.random() > 0.5
    ? generateOppositeEquationProblem()
    : generateSupplementaryEquationProblem();
}
