export type PairType = 'complementarios' | 'suplementarios' | 'opuestos';

export interface OppositeAnglesResult {
  angle1: number;
  angle2: number;
  angle3: number;
  angle4: number;
}

export function calculateComplementary(alpha: number): number {
  const clamped = Math.max(0, Math.min(90, Math.round(alpha)));
  return 90 - clamped;
}

export function calculateSupplementary(alpha: number): number {
  const clamped = Math.max(0, Math.min(180, Math.round(alpha)));
  return 180 - clamped;
}

export function calculateOppositeAngles(primaryAngle: number): OppositeAnglesResult {
  const clamped = Math.max(15, Math.min(165, Math.round(primaryAngle)));
  const supplementary = 180 - clamped;
  return {
    angle1: clamped,
    angle2: supplementary,
    angle3: clamped,
    angle4: supplementary
  };
}

export function getPairsPresets(mode: PairType): number[] {
  if (mode === 'complementarios') return [15, 30, 45, 60, 75];
  if (mode === 'suplementarios') return [30, 60, 90, 120, 150];
  return [30, 45, 60, 90, 120, 135];
}

export function getPairsRange(mode: PairType): { min: number; max: number } {
  if (mode === 'complementarios') return { min: 5, max: 85 };
  if (mode === 'suplementarios') return { min: 5, max: 175 };
  return { min: 15, max: 165 };
}
