import type { PairType } from '../math/pairs';

export interface PairChallenge {
  id: string;
  type: PairType;
  title: string;
  prompt: string;
  formula: string;
  targetAlpha: number;
  tolerance: number;
  hint: string;
  successMessage: string;
}

export const PAIRS_CHALLENGES: PairChallenge[] = [
  {
    id: 'c1',
    type: 'complementarios',
    title: 'Complemento de 30°',
    prompt: 'Ajustá el ángulo alfa a 30° y observá cuánto mide su complemento beta.',
    formula: '\\alpha = 30^\\circ \\implies \\beta = 60^\\circ',
    targetAlpha: 30,
    tolerance: 1.5,
    hint: 'Recordá que dos ángulos complementarios siempre suman 90° (un ángulo recto).',
    successMessage: '¡Excelente! 30° + 60° = 90°. Son complementarios.'
  },
  {
    id: 'c2',
    type: 'complementarios',
    title: 'Ángulos Complementarios Iguales',
    prompt: 'Buscá que ambos ángulos alfa y beta midan exactamente lo mismo.',
    formula: '\\alpha = \\beta = 45^\\circ',
    targetAlpha: 45,
    tolerance: 1.5,
    hint: 'La mitad de 90° es 45°. Ambos ángulos deben tener la misma apertura.',
    successMessage: '¡Muy bien! A 45° cada uno, ambos ángulos se reparten el recto en partes iguales.'
  },
  {
    id: 'c3',
    type: 'suplementarios',
    title: 'Suplementarios y Adyacentes',
    prompt: 'Ajustá alfa a 120° para ver qué sucede con beta.',
    formula: '\\alpha = 120^\\circ \\implies \\beta = 60^\\circ',
    targetAlpha: 120,
    tolerance: 1.5,
    hint: 'Los ángulos adyacentes comparten un lado y forman una línea recta continua de 180°.',
    successMessage: '¡Correcto! 120° + 60° = 180°. Forman un ángulo llano continuo.'
  },
  {
    id: 'c4',
    type: 'opuestos',
    title: 'Opuestos por el Vértice',
    prompt: 'Rotá la recta secante hasta que el ángulo 1 mida 70° y verificá el ángulo 3.',
    formula: '\\hat{1} = \\hat{3} = 70^\\circ',
    targetAlpha: 70,
    tolerance: 1.5,
    hint: 'Los ángulos opuestos por el vértice siempre son congruentes (tienen igual medida).',
    successMessage: '¡Impecable! Los opuestos 1 y 3 miden 70°, y los adyacentes 2 y 4 miden 110°.'
  }
];

