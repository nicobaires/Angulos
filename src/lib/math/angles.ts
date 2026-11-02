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
      description: 'Mide exactamente 0°. Los dos rayos coinciden y no hay apertura.'
    };
  }

  if (angle > 0 && angle < 90) {
    return {
      type: 'agudo',
      name: 'Ángulo Agudo',
      description: 'Mide más de 0° y menos de 90°. Es más cerrado que una esquina recta.'
    };
  }

  if (angle === 90) {
    return {
      type: 'recto',
      name: 'Ángulo Recto',
      description: 'Mide exactamente 90°. Forma una esquina perpendicular perfecta (como en un cuadrado).'
    };
  }

  if (angle > 90 && angle < 180) {
    return {
      type: 'obtuso',
      name: 'Ángulo Obtuso',
      description: 'Mide más de 90° y menos de 180°. Es más abierto que un ángulo recto.'
    };
  }

  if (angle === 180) {
    return {
      type: 'llano',
      name: 'Ángulo Llano',
      description: 'Mide exactamente 180°. Los rayos forman una línea recta continua.'
    };
  }

  if (angle > 180 && angle < 360) {
    return {
      type: 'concavo',
      name: 'Ángulo Cóncavo',
      description: 'Mide más de 180° y menos de 360°. Abarca más de media vuelta.'
    };
  }

  return {
    type: 'completo',
    name: 'Ángulo Completo',
    description: 'Mide exactamente 360°. Da una vuelta entera alrededor del vértice.'
  };
}

