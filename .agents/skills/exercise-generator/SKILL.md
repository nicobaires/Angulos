---
name: exercise-generator
description: >-
  Generación procedural de problemas algebraicos sobre ángulos con soluciones enteras y limpias.
---

# Skill: Generador de Ejercicios de Ecuaciones

## Ubicación en Arquitectura
Todas las funciones de generación matemática de esta skill deben residir en **`src/lib/math/equations.ts`**, mientras que las plantillas de enunciados didácticos deben residir en **`src/lib/pedagogical/equationsBank.ts`**. Los componentes visuales solo consumen los datos generados.

```typescript
export interface AngleEquationProblem {
  type: 'suplementarios' | 'complementarios' | 'opuestos';
  relation: string;
  equationStr: string;
  xValue: number;
  angle1: number;
  angle2: number;
}

export function generateAdjacentProblem(): AngleEquationProblem {
  // a*x + b + c*x + d = 180
  const x = Math.floor(Math.random() * 15) + 10; // x entre 10 y 24
  const a = Math.floor(Math.random() * 3) + 2;   // 2 a 4
  const c = Math.floor(Math.random() * 3) + 1;   // 1 a 3
  
  const totalLinear = (a + c) * x;
  const remainder = 180 - totalLinear;
  const b = Math.floor(remainder / 2);
  const d = remainder - b;

  const angle1 = a * x + b;
  const angle2 = c * x + d;

  return {
    type: 'suplementarios',
    relation: '\\alpha + \\beta = 180^\\circ',
    equationStr: `${a}x ${b >= 0 ? '+' : ''}${b}^\\circ + ${c}x ${d >= 0 ? '+' : ''}${d}^\\circ = 180^\\circ`,
    xValue: x,
    angle1,
    angle2
  };
}

export function generateOppositeProblem(): AngleEquationProblem {
  // a*x + b = c*x + d
  const x = Math.floor(Math.random() * 12) + 8; // x entre 8 y 19
  const c = Math.floor(Math.random() * 2) + 1;  // 1 a 2
  const a = c + Math.floor(Math.random() * 2) + 1; // a > c
  
  // a*x + b = c*x + d => (a - c)*x = d - b
  const diff = (a - c) * x;
  const b = Math.floor(Math.random() * 20) + 5;
  const d = b + diff;

  const angle1 = a * x + b;
  const angle2 = c * x + d;

  return {
    type: 'opuestos',
    relation: '\\alpha = \\beta',
    equationStr: `${a}x ${b >= 0 ? '+' : ''}${b}^\\circ = ${c}x + ${d}^\\circ`,
    xValue: x,
    angle1,
    angle2
  };
}
```
