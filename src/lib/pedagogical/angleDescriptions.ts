import type { AngleClassification } from '../math/angles';

export interface AngleClassificationMeta {
  name: string;
  description: string;
}

export const ANGLE_DESCRIPTIONS: Record<AngleClassification, AngleClassificationMeta> = {
  nulo: {
    name: 'Ángulo Nulo',
    description: 'Mide exactamente 0°. Los dos rayos coinciden y no hay apertura.'
  },
  agudo: {
    name: 'Ángulo Agudo',
    description: 'Mide más de 0° y menos de 90°. Es más cerrado que una esquina recta.'
  },
  recto: {
    name: 'Ángulo Recto',
    description: 'Mide exactamente 90°. Forma una esquina perpendicular perfecta (como en un cuadrado).'
  },
  obtuso: {
    name: 'Ángulo Obtuso',
    description: 'Mide más de 90° y menos de 180°. Es más abierto que un ángulo recto.'
  },
  llano: {
    name: 'Ángulo Llano',
    description: 'Mide exactamente 180°. Los rayos forman una línea recta continua.'
  },
  concavo: {
    name: 'Ángulo Cóncavo',
    description: 'Mide más de 180° y menos de 360°. Abarca más de media vuelta.'
  },
  completo: {
    name: 'Ángulo Completo',
    description: 'Mide exactamente 360°. Da una vuelta entera alrededor del vértice.'
  }
};

export function getAngleClassificationMeta(type: AngleClassification): AngleClassificationMeta {
  return ANGLE_DESCRIPTIONS[type];
}
