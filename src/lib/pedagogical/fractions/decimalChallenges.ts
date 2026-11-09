import {
  type DecimalType,
  type ConversionResult,
  convertExactToFraction,
  convertPurePeriodicToFraction,
  convertMixedPeriodicToFraction
} from '../../math/fractions';

export interface DecimalChallenge {
  id: string;
  type: DecimalType;
  title: string;
  displayLatex: string;
  conversion: ConversionResult;
  targetNum: number;
  targetDen: number;
  hint: string;
}

export const DECIMAL_CHALLENGES: DecimalChallenge[] = [
  // 1. Exactos
  {
    id: 'dec_exact_05', type: 'exact', title: 'Pasar decimal exacto', displayLatex: '0,5',
    conversion: convertExactToFraction(0, '5'), targetNum: 1, targetDen: 2,
    hint: 'Numerador = 5, Denominador = 10. Luego simplificá dividiendo por 5.'
  },
  {
    id: 'dec_exact_075', type: 'exact', title: 'Pasar decimal exacto', displayLatex: '0,75',
    conversion: convertExactToFraction(0, '75'), targetNum: 3, targetDen: 4,
    hint: 'Numerador = 75, Denominador = 100. Simplificá por 25.'
  },
  {
    id: 'dec_exact_24', type: 'exact', title: 'Decimal exacto con entero', displayLatex: '2,4',
    conversion: convertExactToFraction(2, '4'), targetNum: 12, targetDen: 5,
    hint: 'Numerador = todo el número sin coma (24), Denominador = 10. Simplificá por 2.'
  },
  {
    id: 'dec_exact_0125', type: 'exact', title: 'Decimal exacto (3 cifras)', displayLatex: '0,125',
    conversion: convertExactToFraction(0, '125'), targetNum: 1, targetDen: 8,
    hint: 'Tres lugares decimales: 125/1000. Simplificá dividiendo por 125.'
  },

  // 2. Periódicos Puros
  {
    id: 'dec_pure_03', type: 'pure_periodic', title: 'Periódico puro básico', displayLatex: '0,\\widehat{3}',
    conversion: convertPurePeriodicToFraction(0, '3'), targetNum: 1, targetDen: 3,
    hint: 'Un 9 en el denominador por la cifra bajo el arco: 3/9. Simplificá por 3.'
  },
  {
    id: 'dec_pure_16', type: 'pure_periodic', title: 'Periódico puro con entero', displayLatex: '1,\\widehat{6}',
    conversion: convertPurePeriodicToFraction(1, '6'), targetNum: 5, targetDen: 3,
    hint: 'Restá todo menos el entero: (16 - 1)/9 = 15/9. Simplificá por 3.'
  },
  {
    id: 'dec_pure_045', type: 'pure_periodic', title: 'Periódico puro (2 cifras)', displayLatex: '0,\\widehat{45}',
    conversion: convertPurePeriodicToFraction(0, '45'), targetNum: 5, targetDen: 11,
    hint: 'Dos cifras en el período: 45/99. Simplificá dividiendo por 9.'
  },
  {
    id: 'dec_pure_23', type: 'pure_periodic', title: 'Periódico puro con entero', displayLatex: '2,\\widehat{3}',
    conversion: convertPurePeriodicToFraction(2, '3'), targetNum: 7, targetDen: 3,
    hint: 'Numerador = 23 - 2 = 21. Denominador = 9. Fracción: 21/9 = 7/3.'
  },

  // 3. Periódicos Mixtos
  {
    id: 'dec_mix_016', type: 'mixed_periodic', title: 'Periódico mixto clásico', displayLatex: '0,1\\widehat{6}',
    conversion: convertMixedPeriodicToFraction(0, '1', '6'), targetNum: 1, targetDen: 6,
    hint: 'Numerador = 16 - 1 = 15. Denominador = 90 (un 9 y un 0). 15/90 = 1/6.'
  },
  {
    id: 'dec_mix_123', type: 'mixed_periodic', title: 'Periódico mixto con entero', displayLatex: '1,2\\widehat{3}',
    conversion: convertMixedPeriodicToFraction(1, '2', '3'), targetNum: 37, targetDen: 30,
    hint: 'Numerador = 123 - 12 = 111. Denominador = 90. 111/90 = 37/30 (simplificado por 3).'
  },
  {
    id: 'dec_mix_008', type: 'mixed_periodic', title: 'Mixto con cero no periódico', displayLatex: '0,0\\widehat{8}',
    conversion: convertMixedPeriodicToFraction(0, '0', '8'), targetNum: 4, targetDen: 45,
    hint: 'Numerador = 8 - 0 = 8. Denominador = 90. Simplificá 8/90 por 2.'
  },
  {
    id: 'dec_mix_083', type: 'mixed_periodic', title: 'Periódico mixto', displayLatex: '0,8\\widehat{3}',
    conversion: convertMixedPeriodicToFraction(0, '8', '3'), targetNum: 5, targetDen: 6,
    hint: 'Numerador = 83 - 8 = 75. Denominador = 90. 75/90 = 5/6 (simplificá por 15).'
  }
];

/**
 * Baraja los índices de los desafíos para partidas aleatorias.
 */
export function getShuffledChallengeIndices(): number[] {
  const indices = DECIMAL_CHALLENGES.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}
