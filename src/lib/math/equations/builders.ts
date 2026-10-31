import type { EquationProblem, Rng } from './types';
import { formatSigned, buildEqualitySteps, buildSumSteps } from './steps';

export function generateOppositeEquationProblem(rng: Rng = Math.random): EquationProblem {
  const x = Math.floor(rng() * 8) + 12;
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
  const x = Math.floor(rng() * 8) + 10;
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
  const x = Math.floor(rng() * 6) + 6;
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
  const x = Math.floor(rng() * 7) + 10;
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
  const x = Math.floor(rng() * 8) + 10;
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
