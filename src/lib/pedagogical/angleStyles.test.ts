import { describe, it, expect } from 'vitest';
import { ANGLE_STYLES, getAngleStyle } from './angleStyles';
import type { AngleClassification } from '../math/angles';

describe('angleStyles', () => {
  const allTypes: AngleClassification[] = [
    'nulo',
    'agudo',
    'recto',
    'obtuso',
    'llano',
    'concavo',
    'completo'
  ];

  it('define estilos válidos para las 7 clasificaciones angulares', () => {
    for (const type of allTypes) {
      const style = getAngleStyle(type);
      expect(style).toBeDefined();
      expect(style.colorName.length).toBeGreaterThan(0);
      expect(style.badgeClass.length).toBeGreaterThan(0);
      // Validar código hexadecimal válido (#ffffff o #fff)
      expect(style.colorHex).toMatch(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
    }
  });

  it('ANGLE_STYLES contiene exactamente los 7 tipos', () => {
    expect(Object.keys(ANGLE_STYLES).sort()).toEqual(allTypes.sort());
  });
});

