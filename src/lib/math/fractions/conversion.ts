import type { ConversionResult } from './types';
import { simplifyFraction } from './gcd';

export function convertExactToFraction(whole: number, decimals: string): ConversionResult {
  const cleanDec = decimals.replace(/\D/g, '') || '0';
  const rawNum = Number(`${Math.abs(whole)}${cleanDec}`);
  const rawDen = Math.pow(10, cleanDec.length);
  const simplified = simplifyFraction(rawNum, rawDen);

  return {
    type: 'exact',
    parts: { whole: Math.abs(whole), nonPeriodic: cleanDec, periodic: '' },
    latexDisplay: `${whole},${cleanDec}`,
    ruleTitle: 'Decimal Exacto (Finito)',
    ruleDescription: 'Se escribe en el numerador todo el número sin la coma, y en el denominador un 1 seguido de tantos ceros como cifras decimales tenga.',
    numeratorCalculation: `${rawNum}`,
    denominatorCalculation: `1 seguido de ${cleanDec.length} cero(s) = ${rawDen}`,
    rawNumerator: rawNum,
    rawDenominator: rawDen,
    rawLatex: `\\frac{${rawNum}}{${rawDen}}`,
    simplified,
    simplifiedLatex: `\\frac{${simplified.num}}{${simplified.den}}`
  };
}

export function convertPurePeriodicToFraction(whole: number, period: string): ConversionResult {
  const cleanPeriod = period.replace(/\D/g, '') || '3';
  const fullStr = `${Math.abs(whole)}${cleanPeriod}`;
  const fullNum = Number(fullStr);
  const nonPerNum = Math.abs(whole);
  const rawNum = fullNum - nonPerNum;
  const rawDen = Number('9'.repeat(cleanPeriod.length));
  const simplified = simplifyFraction(rawNum, rawDen);

  return {
    type: 'pure_periodic',
    parts: { whole: Math.abs(whole), nonPeriodic: '', periodic: cleanPeriod },
    latexDisplay: `${whole},\\widehat{${cleanPeriod}}`,
    ruleTitle: 'Decimal Periódico Puro',
    ruleDescription: 'En el numerador se resta todo el número sin coma menos la parte entera. En el denominador van tantos nueves como cifras periódicas haya bajo el arco.',
    numeratorCalculation: `${fullNum} - ${nonPerNum} = ${rawNum}`,
    denominatorCalculation: `${cleanPeriod.length} nueve(s) por el período = ${rawDen}`,
    rawNumerator: rawNum,
    rawDenominator: rawDen,
    rawLatex: `\\frac{${fullNum} - ${nonPerNum}}{${rawDen}} = \\frac{${rawNum}}{${rawDen}}`,
    simplified,
    simplifiedLatex: `\\frac{${simplified.num}}{${simplified.den}}`
  };
}

export function convertMixedPeriodicToFraction(whole: number, nonPeriodic: string, period: string): ConversionResult {
  const cleanNonPer = nonPeriodic.replace(/\D/g, '') || '1';
  const cleanPeriod = period.replace(/\D/g, '') || '6';
  const fullNum = Number(`${Math.abs(whole)}${cleanNonPer}${cleanPeriod}`);
  const nonPerNum = Number(`${Math.abs(whole)}${cleanNonPer}`);
  const rawNum = fullNum - nonPerNum;
  const rawDen = Number('9'.repeat(cleanPeriod.length) + '0'.repeat(cleanNonPer.length));
  const simplified = simplifyFraction(rawNum, rawDen);

  return {
    type: 'mixed_periodic',
    parts: { whole: Math.abs(whole), nonPeriodic: cleanNonPer, periodic: cleanPeriod },
    latexDisplay: `${whole},${cleanNonPer}\\widehat{${cleanPeriod}}`,
    ruleTitle: 'Decimal Periódico Mixto',
    ruleDescription: 'En el numerador se resta todo el número sin coma menos la parte no periódica (entero y anteperíodo). En el denominador van tantos nueves como cifras periódicas seguidos de tantos ceros como anteperíodo.',
    numeratorCalculation: `${fullNum} - ${nonPerNum} = ${rawNum}`,
    denominatorCalculation: `${cleanPeriod.length} nueve(s) y ${cleanNonPer.length} cero(s) = ${rawDen}`,
    rawNumerator: rawNum,
    rawDenominator: rawDen,
    rawLatex: `\\frac{${fullNum} - ${nonPerNum}}{${rawDen}} = \\frac{${rawNum}}{${rawDen}}`,
    simplified,
    simplifiedLatex: `\\frac{${simplified.num}}{${simplified.den}}`
  };
}
