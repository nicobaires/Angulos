export type TransversalRelation =
  | 'alternos_internos'
  | 'alternos_externos'
  | 'correspondientes'
  | 'conjugados_internos'
  | 'conjugados_externos';

export interface AngleSectorData {
  id: number;
  vertex: 1 | 2;
  deg: number;
  isAcute: boolean;
  startAngle: number;
  endAngle: number;
}

export interface RelationDetails {
  name: string;
  isCongruent: boolean;
  pairs: [number, number][];
  description: string;
  formula: string;
  rule: string;
}

export const RELATIONS_MAP: Record<TransversalRelation, RelationDetails> = {
  alternos_internos: {
    name: 'Alternos Internos',
    isCongruent: true,
    pairs: [[3, 5], [4, 6]],
    description: 'Están entre las paralelas (internos) y a lados opuestos de la secante (alternos).',
    formula: '\\hat{3} = \\hat{5} \\quad \\text{y} \\quad \\hat{4} = \\hat{6}',
    rule: 'Siempre son congruentes (tienen igual medida).'
  },
  alternos_externos: {
    name: 'Alternos Externos',
    isCongruent: true,
    pairs: [[1, 7], [2, 8]],
    description: 'Están fuera de las paralelas (externos) y a lados opuestos de la secante (alternos).',
    formula: '\\hat{1} = \\hat{7} \\quad \\text{y} \\quad \\hat{2} = \\hat{8}',
    rule: 'Siempre son congruentes (tienen igual medida).'
  },
  correspondientes: {
    name: 'Correspondientes',
    isCongruent: true,
    pairs: [[1, 5], [2, 6], [3, 7], [4, 8]],
    description: 'Ocupan la misma posición relativa en cada una de las dos intersecciones.',
    formula: '\\hat{1} = \\hat{5}, \\; \\hat{2} = \\hat{6}, \\; \\hat{3} = \\hat{7}, \\; \\hat{4} = \\hat{8}',
    rule: 'Siempre son congruentes (uno interno y otro externo del mismo lado).'
  },
  conjugados_internos: {
    name: 'Conjugados Internos',
    isCongruent: false,
    pairs: [[3, 6], [4, 5]],
    description: 'Están entre las paralelas y del mismo lado de la recta secante.',
    formula: '\\hat{3} + \\hat{6} = 180^\\circ \\quad \\text{y} \\quad \\hat{4} + \\hat{5} = 180^\\circ',
    rule: 'Siempre son suplementarios (suman 180°).'
  },
  conjugados_externos: {
    name: 'Conjugados Externos',
    isCongruent: false,
    pairs: [[1, 8], [2, 7]],
    description: 'Están fuera de las paralelas y del mismo lado de la recta secante.',
    formula: '\\hat{1} + \\hat{8} = 180^\\circ \\quad \\text{y} \\quad \\hat{2} + \\hat{7} = 180^\\circ',
    rule: 'Siempre son suplementarios (suman 180°).'
  }
};
