import type { SimplifiedFraction } from './types';

/**
 * Calcula el Máximo Común Divisor (MCD) utilizando el Algoritmo de Euclides.
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

/**
 * Simplifica una fracción dividiendo numerador y denominador por su MCD.
 */
export function simplifyFraction(num: number, den: number): SimplifiedFraction {
  if (den === 0) {
    throw new Error('El denominador no puede ser cero.');
  }
  const sign = (num < 0) !== (den < 0) ? -1 : 1;
  const absNum = Math.abs(Math.round(num));
  const absDen = Math.abs(Math.round(den));
  const divisor = gcd(absNum, absDen);

  return {
    num: sign * (absNum / divisor),
    den: absDen / divisor,
    gcd: divisor
  };
}
