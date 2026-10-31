import type { TransversalRelation } from '../math/transversal';

export interface TransversalChallenge {
  id: string;
  relation: TransversalRelation;
  title: string;
  prompt: string;
  pair: [number, number];
  isCongruent: boolean;
  hint: string;
  explanation: string;
}

export const TRANSVERSAL_CHALLENGES: TransversalChallenge[] = [
  {
    id: 't1',
    relation: 'alternos_internos',
    title: 'Relación entre 3̂ y 5̂',
    prompt: 'Observá los ángulos 3̂ y 5̂ (adentro de las paralelas y cruzados). ¿Qué relación tienen?',
    pair: [3, 5],
    isCongruent: true,
    hint: 'Buscá adentro de las paralelas y cruzando la secante al lado opuesto.',
    explanation: '¡Exacto! 3̂ y 5̂ son alternos internos: están dentro de las paralelas a lados opuestos de la secante y miden lo mismo.'
  },
  {
    id: 't2',
    relation: 'correspondientes',
    title: 'Relación entre 1̂ y 5̂',
    prompt: 'Observá los ángulos 1̂ y 5̂ (misma posición relativa en cada recta). ¿Qué relación tienen?',
    pair: [1, 5],
    isCongruent: true,
    hint: 'Ocupan el mismo lugar relativo en cada intersección (arriba a la derecha).',
    explanation: '¡Muy bien! 1̂ y 5̂ son correspondientes: están en la misma posición relativa y tienen igual medida.'
  },
  {
    id: 't3',
    relation: 'conjugados_internos',
    title: 'Relación entre 3̂ y 6̂',
    prompt: '3̂ y 6̂ están adentro y del mismo lado de la secante. ¿Cómo se llaman y cuánto suman?',
    pair: [3, 6],
    isCongruent: false,
    hint: 'Están del mismo lado (internos) y suman 180° (suplementarios).',
    explanation: '¡Excelente! Son conjugados internos: están del mismo lado entre paralelas y su suma da 180°.'
  },
  {
    id: 't4',
    relation: 'alternos_externos',
    title: 'Relación entre 2̂ y 8̂',
    prompt: '2̂ está afuera a la izquierda y 8̂ afuera a la derecha. ¿Qué relación tienen?',
    pair: [2, 8],
    isCongruent: true,
    hint: 'Están afuera de las paralelas y a lados opuestos de la secante.',
    explanation: '¡Correcto! 2̂ y 8̂ son alternos externos y tienen exactamente la misma amplitud.'
  }
];
