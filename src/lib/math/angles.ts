export interface Point {
  x: number;
  y: number;
}

export type AngleClassification =
  | 'nulo'
  | 'agudo'
  | 'recto'
  | 'obtuso'
  | 'llano'
  | 'concavo'
  | 'completo';

export interface AngleClassificationInfo {
  type: AngleClassification;
  name: string;
  description: string;
  colorName: string;
  colorHex: string;
  bgClass: string;
  badgeClass: string;
}

/**
 * Normaliza un ángulo al intervalo [0, 360)
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  // Evita devolver -0 (p. ej. -360 % 360), que se comporta distinto con Object.is
  return normalized === 0 ? 0 : normalized;
}

/**
 * Convierte coordenadas polares (grados) a cartesianas SVG.
 * Eje 0° a la derecha (eje X positivo), 90° hacia arriba (eje Y negativo en SVG).
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY - radius * Math.sin(angleInRadians)
  };
}

/**
 * Genera el path SVG para un sector angular relleno (cuña de pastel).
 */
export function describeSector(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const diff = endAngle - startAngle;
  if (diff >= 360) {
    // Círculo completo
    return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 0 ${cx} ${cy + radius} A ${radius} ${radius} 0 1 0 ${cx} ${cy - radius} Z`;
  }
  if (diff <= 0) {
    return '';
  }

  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = diff > 180 ? 1 : 0;

  // Arco en sentido antihorario matemático (sweep-flag = 0 en SVG porque Y crece hacia abajo)
  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'Z'
  ].join(' ');
}

/**
 * Genera el path SVG para el arco de medida (línea curva entre rayos).
 */
export function describeArcLine(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const diff = endAngle - startAngle;
  if (diff >= 360) {
    return `M ${cx + radius} ${cy} A ${radius} ${radius} 0 1 0 ${cx - radius} ${cy} A ${radius} ${radius} 0 1 0 ${cx + radius} ${cy}`;
  }
  if (diff <= 0) return '';

  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = diff > 180 ? 1 : 0;

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

/**
 * Clasificación y metadatos didácticos según la amplitud en grados
 */
export function getAngleClassification(deg: number): AngleClassificationInfo {
  const angle = Math.round(deg * 10) / 10;

  if (angle === 0) {
    return {
      type: 'nulo',
      name: 'Ángulo Nulo',
      description: 'Mide exactamente 0°. Los dos rayos coinciden y no hay apertura.',
      colorName: 'Gris',
      colorHex: '#64748b',
      bgClass: 'bg-slate-500',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
    };
  }

  if (angle > 0 && angle < 90) {
    return {
      type: 'agudo',
      name: 'Ángulo Agudo',
      description: 'Mide más de 0° y menos de 90°. Es más cerrado que una esquina recta.',
      colorName: 'Ámbar',
      colorHex: '#f59e0b',
      bgClass: 'bg-amber-500',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
    };
  }

  if (angle === 90) {
    return {
      type: 'recto',
      name: 'Ángulo Recto',
      description: 'Mide exactamente 90°. Forma una esquina perpendicular perfecta (como en un cuadrado).',
      colorName: 'Esmeralda',
      colorHex: '#10b981',
      bgClass: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
    };
  }

  if (angle > 90 && angle < 180) {
    return {
      type: 'obtuso',
      name: 'Ángulo Obtuso',
      description: 'Mide más de 90° y menos de 180°. Es más abierto que un ángulo recto.',
      colorName: 'Violeta',
      colorHex: '#8b5cf6',
      bgClass: 'bg-violet-500',
      badgeClass: 'bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/60'
    };
  }

  if (angle === 180) {
    return {
      type: 'llano',
      name: 'Ángulo Llano',
      description: 'Mide exactamente 180°. Los rayos forman una línea recta continua.',
      colorName: 'Rosa',
      colorHex: '#ec4899',
      bgClass: 'bg-pink-500',
      badgeClass: 'bg-pink-50 text-pink-800 border-pink-300 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/60'
    };
  }

  if (angle > 180 && angle < 360) {
    return {
      type: 'concavo',
      name: 'Ángulo Cóncavo',
      description: 'Mide más de 180° y menos de 360°. Abarca más de media vuelta.',
      colorName: 'Cian',
      colorHex: '#06b6d4',
      bgClass: 'bg-cyan-500',
      badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-300 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60'
    };
  }

  return {
    type: 'completo',
    name: 'Ángulo Completo',
    description: 'Mide exactamente 360°. Da una vuelta entera alrededor del vértice.',
    colorName: 'Azul',
    colorHex: '#2563eb',
    bgClass: 'bg-blue-600',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60'
  };
}

