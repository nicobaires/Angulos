export type PairType = 'complementarios' | 'suplementarios' | 'opuestos';

export interface OppositeAnglesResult {
  angle1: number;
  angle2: number;
  angle3: number;
  angle4: number;
}

/**
 * Calcula el ángulo complementario (suma = 90°)
 */
export function calculateComplementary(alpha: number): number {
  const clamped = Math.max(0, Math.min(90, Math.round(alpha)));
  return 90 - clamped;
}

/**
 * Calcula el ángulo suplementario (suma = 180°)
 */
export function calculateSupplementary(alpha: number): number {
  const clamped = Math.max(0, Math.min(180, Math.round(alpha)));
  return 180 - clamped;
}

/**
 * Calcula los 4 ángulos generados por dos rectas secantes:
 * angle1 y angle3 son opuestos por el vértice (congruentes).
 * angle2 y angle4 son opuestos por el vértice (congruentes).
 * angle1 y angle2 son suplementarios (adyacentes).
 */
export function calculateOppositeAngles(primaryAngle: number): OppositeAnglesResult {
  // primaryAngle entre 15° y 165° para visualización geométrica clara
  const clamped = Math.max(15, Math.min(165, Math.round(primaryAngle)));
  const supplementary = 180 - clamped;

  return {
    angle1: clamped,
    angle2: supplementary,
    angle3: clamped,
    angle4: supplementary
  };
}

