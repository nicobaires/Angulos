import { describe, it, expect } from 'vitest';
import { normalizeAngle, getAngleClassification } from './angles';
import {
  calculateComplementary,
  calculateSupplementary,
  calculateOppositeAngles,
  getPairsPresets,
  getPairsRange
} from './pairs';

describe('normalizeAngle', () => {
  it.each([
    [0, 0],
    [360, 0],
    [370, 10],
    [-30, 330],
    [-360, 0],
    [725, 5]
  ])('normaliza %d° a %d°', (input, expected) => {
    expect(normalizeAngle(input)).toBe(expected);
  });
});

describe('getAngleClassification', () => {
  it.each([
    [0, 'nulo'],
    [1, 'agudo'],
    [89.9, 'agudo'],
    [90, 'recto'],
    [90.1, 'obtuso'],
    [179, 'obtuso'],
    [180, 'llano'],
    [181, 'concavo'],
    [359, 'concavo'],
    [360, 'completo']
  ])('%d° es %s', (deg, expected) => {
    expect(getAngleClassification(deg).type).toBe(expected);
  });
});

describe('pares de ángulos', () => {
  it('complementarios suman 90° y se acotan al rango válido', () => {
    for (let a = 0; a <= 90; a++) {
      expect(a + calculateComplementary(a)).toBe(90);
    }
    expect(calculateComplementary(-10)).toBe(90);
    expect(calculateComplementary(200)).toBe(0);
  });

  it('suplementarios suman 180° y se acotan al rango válido', () => {
    for (let a = 0; a <= 180; a++) {
      expect(a + calculateSupplementary(a)).toBe(180);
    }
    expect(calculateSupplementary(-10)).toBe(180);
  });

  it('opuestos por el vértice: pares iguales y adyacentes suplementarios', () => {
    for (let a = 15; a <= 165; a++) {
      const r = calculateOppositeAngles(a);
      expect(r.angle1).toBe(r.angle3);
      expect(r.angle2).toBe(r.angle4);
      expect(r.angle1 + r.angle2).toBe(180);
    }
  });

  it('los presets caen dentro del rango de cada modo', () => {
    for (const mode of ['complementarios', 'suplementarios', 'opuestos'] as const) {
      const { min, max } = getPairsRange(mode);
      for (const preset of getPairsPresets(mode)) {
        expect(preset).toBeGreaterThanOrEqual(min);
        expect(preset).toBeLessThanOrEqual(max);
      }
    }
  });
});
