import { describe, it, expect } from 'vitest';
import { gcd, simplifyFraction } from './gcd';
import {
  convertExactToFraction,
  convertPurePeriodicToFraction,
  convertMixedPeriodicToFraction
} from './conversion';

describe('gcd y simplifyFraction', () => {
  it('calcula el MCD correctamente', () => {
    expect(gcd(75, 100)).toBe(25);
    expect(gcd(15, 9)).toBe(3);
    expect(gcd(111, 90)).toBe(3);
    expect(gcd(17, 31)).toBe(1);
    expect(gcd(8, 90)).toBe(2);
  });

  it('simplifica fracciones a su forma irreducible', () => {
    expect(simplifyFraction(75, 100)).toEqual({ num: 3, den: 4, gcd: 25 });
    expect(simplifyFraction(15, 9)).toEqual({ num: 5, den: 3, gcd: 3 });
    expect(simplifyFraction(111, 90)).toEqual({ num: 37, den: 30, gcd: 3 });
  });

  it('lanza error si el denominador es cero', () => {
    expect(() => simplifyFraction(5, 0)).toThrow();
  });
});

describe('convertExactToFraction', () => {
  it('convierte decimales exactos correctamente', () => {
    const r1 = convertExactToFraction(0, '75');
    expect(r1.rawNumerator).toBe(75);
    expect(r1.rawDenominator).toBe(100);
    expect(r1.simplified).toEqual({ num: 3, den: 4, gcd: 25 });
    expect(r1.latexDisplay).toBe('0,75');

    const r2 = convertExactToFraction(2, '5');
    expect(r2.simplified).toEqual({ num: 5, den: 2, gcd: 5 });

    const r3 = convertExactToFraction(0, '125');
    expect(r3.simplified).toEqual({ num: 1, den: 8, gcd: 125 });
  });
});

describe('convertPurePeriodicToFraction', () => {
  it('convierte decimales periódicos puros correctamente', () => {
    // 0,^3 = 3/9 = 1/3
    const r1 = convertPurePeriodicToFraction(0, '3');
    expect(r1.rawNumerator).toBe(3);
    expect(r1.rawDenominator).toBe(9);
    expect(r1.simplified).toEqual({ num: 1, den: 3, gcd: 3 });
    expect(r1.latexDisplay).toBe('0,\\widehat{3}');

    // 1,^6 = (16 - 1)/9 = 15/9 = 5/3
    const r2 = convertPurePeriodicToFraction(1, '6');
    expect(r2.rawNumerator).toBe(15);
    expect(r2.rawDenominator).toBe(9);
    expect(r2.simplified).toEqual({ num: 5, den: 3, gcd: 3 });

    // 0,^45 = 45/99 = 5/11
    const r3 = convertPurePeriodicToFraction(0, '45');
    expect(r3.rawNumerator).toBe(45);
    expect(r3.rawDenominator).toBe(99);
    expect(r3.simplified).toEqual({ num: 5, den: 11, gcd: 9 });
  });
});

describe('convertMixedPeriodicToFraction', () => {
  it('convierte decimales periódicos mixtos correctamente', () => {
    // 0,1^6 = (16 - 1)/90 = 15/90 = 1/6
    const r1 = convertMixedPeriodicToFraction(0, '1', '6');
    expect(r1.rawNumerator).toBe(15);
    expect(r1.rawDenominator).toBe(90);
    expect(r1.simplified).toEqual({ num: 1, den: 6, gcd: 15 });
    expect(r1.latexDisplay).toBe('0,1\\widehat{6}');

    // 1,2^3 = (123 - 12)/90 = 111/90 = 37/30
    const r2 = convertMixedPeriodicToFraction(1, '2', '3');
    expect(r2.rawNumerator).toBe(111);
    expect(r2.rawDenominator).toBe(90);
    expect(r2.simplified).toEqual({ num: 37, den: 30, gcd: 3 });

    // 0,0^8 = 8/90 = 4/45
    const r3 = convertMixedPeriodicToFraction(0, '0', '8');
    expect(r3.rawNumerator).toBe(8);
    expect(r3.rawDenominator).toBe(90);
    expect(r3.simplified).toEqual({ num: 4, den: 45, gcd: 2 });
  });
});
