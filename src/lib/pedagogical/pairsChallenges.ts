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
    prompt: '¿Cuánto mide el ángulo complementario de 30°? Ajustá alfa a su valor correcto.',
    formula: '30^\\circ + \\alpha = 90^\\circ \\implies \\alpha = 60^\\circ',
    targetAlpha: 60,
    tolerance: 1.5,
    hint: 'Dos ángulos complementarios suman 90°. Si uno mide 30°, pensá: 90° - 30°.',
    successMessage: '¡Excelente! El complementario de 30° es 60°, ya que 30° + 60° = 90°.'
  },
  {
    id: 'c2',
    type: 'complementarios',
    title: 'Complementarios Iguales',
    prompt: '¿Cuánto deben medir dos ángulos complementarios para ser iguales? Ajustá alfa.',
    formula: '\\alpha = \\beta = 45^\\circ',
    targetAlpha: 45,
    tolerance: 1.5,
    hint: 'La mitad de 90° es 45°. Ambos ángulos deben tener la misma apertura.',
    successMessage: '¡Muy bien! A 45° cada uno, ambos ángulos se reparten el recto en partes iguales.'
  },
  {
    id: 'c3',
    type: 'suplementarios',
    title: 'Suplementario de 60°',
    prompt: '¿Cuánto mide el ángulo suplementario de 60°? Ajustá alfa para completar el ángulo llano (180°).',
    formula: '60^\\circ + \\alpha = 180^\\circ \\implies \\alpha = 120^\\circ',
    targetAlpha: 120,
    tolerance: 1.5,
    hint: 'Los ángulos suplementarios forman una recta continua de 180°. Pensá: 180° - 60°.',
    successMessage: '¡Correcto! El suplementario de 60° es 120°, porque 60° + 120° = 180°.'
  },
  {
    id: 'c4',
    type: 'opuestos',
    title: 'Opuestos por el Vértice',
    prompt: 'Si los ángulos adyacentes 2̂ y 4̂ miden 110°, ¿cuánto deben medir los opuestos 1̂ y 3̂? Ajustá la recta secante.',
    formula: '\\hat{1} = 180^\\circ - 110^\\circ = 70^\\circ',
    targetAlpha: 70,
    tolerance: 1.5,
    hint: 'Como 1̂ y 2̂ son adyacentes sobre una misma recta, suman 180°: 180° - 110° = 70°.',
    successMessage: '¡Impecable! 1̂ y 3̂ miden 70° (opuestos congruentes), y son suplementarios con 2̂ y 4̂ (110°).'
  }
];
