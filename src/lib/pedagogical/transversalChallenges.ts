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
    title: 'Alternos Internos de 3̂',
    prompt: 'Observá el ángulo 3̂. ¿Cuál es su alterno interno y cuánto mide?',
    pair: [3, 5],
    isCongruent: true,
    hint: 'Buscá adentro de las paralelas y cruzando la secante al lado opuesto.',
    explanation: '¡Exacto! 3̂ y 5̂ son alternos internos: están dentro de las paralelas a lados opuestos de la secante y miden lo mismo.'
  },
  {
    id: 't2',
    relation: 'correspondientes',
    title: 'Correspondientes de 1̂',
    prompt: 'Encontrá el ángulo que ocupa la misma posición que 1̂ en la paralela de abajo.',
    pair: [1, 5],
    isCongruent: true,
    hint: '1̂ está arriba a la derecha en la primera recta. Buscá la misma esquina abajo.',
    explanation: '¡Muy bien! 1̂ y 5̂ son correspondientes: están en la misma posición relativa y tienen exactamente igual amplitud.'
  },
  {
    id: 't3',
    relation: 'conjugados_internos',
    title: 'Conjugados Internos (Suma 180°)',
    prompt: '3̂ y 6̂ están adentro y del mismo lado de la secante. ¿Cuánto suman?',
    pair: [3, 6],
    isCongruent: false,
    hint: 'Los conjugados no son iguales: uno es agudo y el otro obtuso.',
    explanation: '¡Excelente! Los ángulos conjugados internos son suplementarios y su suma siempre da 180°.'
  },
  {
    id: 't4',
    relation: 'alternos_externos',
    title: 'Alternos Externos de 2̂',
    prompt: '2̂ está arriba a la izquierda. ¿Cuál es su alterno externo abajo?',
    pair: [2, 8],
    isCongruent: true,
    hint: 'Está afuera de las paralelas y al lado contrario de la secante (abajo a la derecha).',
    explanation: '¡Correcto! 2̂ y 8̂ son alternos externos y tienen exactamente la misma medida (ambos son obtusos).'
  }
];
