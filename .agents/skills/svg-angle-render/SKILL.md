---
name: svg-angle-render
description: >-
  Cálculo de arcos SVG, conversión de coordenadas polares a cartesianas y normalización angular.
---

# Skill: Generador de Arcos SVG para Ángulos

## Ubicación en Arquitectura
Todas las funciones puras de esta skill deben ubicarse en **`src/lib/math/angles.ts`** y ser importadas por los componentes visuales (`Protractor.svelte`, `AdjacentCanvas.svelte`, etc.). **Nunca incrustar esta lógica directamente en los componentes de interfaz.**

```typescript
export interface Point {
  x: number;
  y: number;
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): Point {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY - radius * Math.sin(angleInRadians)
  };
}

export function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';

  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'Z'
  ].join(' ');
}
```

## Buenas Prácticas
1. **Sistema de coordenadas SVG:** El eje Y en SVG crece hacia abajo; por ello `y = centerY - radius * Math.sin(...)` proyecta los ángulos en orientación matemática estándar (0° a la derecha, 90° arriba).
2. **Hitbox táctil:** Para que el usuario pueda interactuar cómodamente en móvil, los puntos de arrastre deben contar con círculos invisibles con radio mínimo de 22px (`r="22"` con `fill="transparent"` y `touch-action: none`).
