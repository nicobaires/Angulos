import type { AngleClassification } from '../math/angles';

export interface TargetChallenge {
  target: AngleClassification;
  title: string;
  hint: string;
}

export const CLASSIFIER_CHALLENGES: TargetChallenge[] = [
  { target: 'agudo', title: 'Encontrá un Ángulo Agudo', hint: 'Fijate que mida más de 0° y menos de 90°.' },
  { target: 'recto', title: 'Encontrá un Ángulo Recto', hint: 'Tiene que medir exactamente 90°.' },
  { target: 'obtuso', title: 'Encontrá un Ángulo Obtuso', hint: 'Buscá que mida entre 90° y 180°.' },
  { target: 'llano', title: 'Encontrá un Ángulo Llano', hint: 'Los dos rayos deben formar una línea recta (180°).' },
  { target: 'concavo', title: 'Encontrá un Ángulo Cóncavo', hint: 'Abarca más de media vuelta (entre 180° y 360°).' },
  { target: 'completo', title: 'Encontrá un Ángulo Completo', hint: 'Tiene que dar un giro entero de 360°.' }
];

export function getShuffledClassifierIndices(rng: () => number = Math.random): number[] {
  const indices = [0, 1, 2, 3, 4, 5];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }
  return indices;
}
