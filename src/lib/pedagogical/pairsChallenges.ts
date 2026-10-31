import type { PairType } from '../math/pairs';

export interface PairChallenge {
  id: string;
  type: PairType;
  title: string;
  prompt: string;
  formula: string;
  targetAlpha: number;
  givenAngle: number;
  tolerance: number;
  hint: string;
  successMessage: string;
}

const COMPLEMENT_BASES = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];
const SUPPLEMENT_BASES = [30, 40, 45, 50, 60, 70, 75, 80, 100, 110, 120, 130, 140, 150];
const OPPOSITE_ADJACENTS = [100, 105, 110, 115, 120, 125, 130, 135, 140, 150];

function pickRandom<T>(list: T[], rng: () => number): T {
  return list[Math.floor(rng() * list.length)];
}

export function createComplementChallenge(baseAngle: number = 30): PairChallenge {
  const target = 90 - baseAngle;
  return {
    id: `comp-${baseAngle}`,
    type: 'complementarios',
    title: `Complemento de ${baseAngle}°`,
    prompt: `¿Cuánto mide el ángulo complementario de ${baseAngle}°? Ajustá alfa a su valor correcto.`,
    formula: `${baseAngle}^\\circ + \\alpha = 90^\\circ \\implies \\alpha = ${target}^\\circ`,
    targetAlpha: target,
    givenAngle: baseAngle,
    tolerance: 1.5,
    hint: `Dos ángulos complementarios suman 90°. Si uno mide ${baseAngle}°, pensá: 90° - ${baseAngle}°.`,
    successMessage: `¡Excelente! El complementario de ${baseAngle}° es ${target}°, ya que ${baseAngle}° + ${target}° = 90°.`
  };
}

export function createEqualComplementChallenge(): PairChallenge {
  return {
    id: 'comp-equal-45',
    type: 'complementarios',
    title: 'Complementarios Iguales',
    prompt: '¿Cuánto deben medir dos ángulos complementarios para ser iguales? Ajustá alfa.',
    formula: '\\alpha = \\beta = 45^\\circ',
    targetAlpha: 45,
    givenAngle: 45,
    tolerance: 1.5,
    hint: 'La mitad de 90° es 45°. Ambos ángulos deben tener la misma apertura.',
    successMessage: '¡Muy bien! A 45° cada uno, ambos ángulos se reparten el recto en partes iguales.'
  };
}

export function createSupplementChallenge(baseAngle: number = 60): PairChallenge {
  const target = 180 - baseAngle;
  return {
    id: `supp-${baseAngle}`,
    type: 'suplementarios',
    title: `Suplementario de ${baseAngle}°`,
    prompt: `¿Cuánto mide el ángulo suplementario de ${baseAngle}°? Ajustá alfa para completar el ángulo llano (180°).`,
    formula: `${baseAngle}^\\circ + \\alpha = 180^\\circ \\implies \\alpha = ${target}^\\circ`,
    targetAlpha: target,
    givenAngle: baseAngle,
    tolerance: 1.5,
    hint: `Los ángulos suplementarios forman una recta continua de 180°. Pensá: 180° - ${baseAngle}°.`,
    successMessage: `¡Correcto! El suplementario de ${baseAngle}° es ${target}°, porque ${baseAngle}° + ${target}° = 180°.`
  };
}

export function createOppositeChallenge(adjacentAngle: number = 110): PairChallenge {
  const target = 180 - adjacentAngle;
  return {
    id: `opp-${adjacentAngle}`,
    type: 'opuestos',
    title: 'Opuestos por el Vértice',
    prompt: `Si los ángulos adyacentes 2̂ y 4̂ miden ${adjacentAngle}°, ¿cuánto deben medir los opuestos 1̂ y 3̂? Ajustá la recta secante.`,
    formula: `\\hat{1} = 180^\\circ - ${adjacentAngle}^\\circ = ${target}^\\circ`,
    targetAlpha: target,
    givenAngle: adjacentAngle,
    tolerance: 1.5,
    hint: `Como 1̂ y 2̂ son adyacentes sobre una misma recta, suman 180°: 180° - ${adjacentAngle}° = ${target}°.`,
    successMessage: `¡Impecable! 1̂ y 3̂ miden ${target}° (opuestos congruentes), y son suplementarios con 2̂ y 4̂ (${adjacentAngle}°).`
  };
}

export function generatePairsChallengesDeck(rng: () => number = Math.random): PairChallenge[] {
  const compBase = pickRandom(COMPLEMENT_BASES, rng);
  const suppBase = pickRandom(SUPPLEMENT_BASES, rng);
  const oppAdj = pickRandom(OPPOSITE_ADJACENTS, rng);

  const deck: PairChallenge[] = [
    createComplementChallenge(compBase),
    createEqualComplementChallenge(),
    createSupplementChallenge(suppBase),
    createOppositeChallenge(oppAdj)
  ];

  // Barajado Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

export const PAIRS_CHALLENGES: PairChallenge[] = [
  createComplementChallenge(30),
  createEqualComplementChallenge(),
  createSupplementChallenge(60),
  createOppositeChallenge(110)
];
