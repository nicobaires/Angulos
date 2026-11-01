---
name: exercise-generator
description: >-
  Generación procedural de problemas algebraicos sobre ángulos con soluciones enteras y limpias en src/lib/math/equations/.
---

# Skill: Generador Procedural de Ecuaciones con Ángulos

## Ubicación en la Arquitectura
El motor matemático modular reside en **`src/lib/math/equations/`**:
- **`types.ts`:** Tipos, contratos e interfaces (`EquationProblem`, `EquationProblemType`, `EquationRelationType`, `Rng`, `createSeededRng`).
- **`steps.ts`:** Formateadores de signos y constructores analíticos KaTeX (`buildEqualitySteps`, `buildSumSteps`).
- **`builders.ts`:** Generadores matemáticos especializados para cada variante.
- **`index.ts`:** API pública unificada y selector aleatorio ponderado (`generateRandomProblem`).

Todos los archivos deben respetar el límite estricto de **$\le 130$ líneas**.

---

## 5 Variantes Curriculares de 2° Año

| Tipo | Relación geométrica | Ecuación base | Rango $x$ | Particularidad |
|---|---|---|---|---|
| `opuestos` | `igualdad` | $ax + b = cx + d$ | 12 a 19 | Opuestos por el vértice ($a > c$) |
| `suplementarios` | `suma180` | $(ax + b) + (cx + d) = 180^\circ$ | 10 a 17 | Adyacentes sobre recta plana |
| `complementarios` | `suma90` | $(ax + b) + (cx + d) = 90^\circ$ | 6 a 11 | Ángulo recto perpendicular |
| `paralelas_alternos` | `igualdad` | $ax + b = cx + d$ | 10 a 16 | Alternos internos entre $R_1 \parallel R_2$ |
| `paralelas_conjugados`| `suma180` | $(ax + b) + (cx + d) = 180^\circ$ | 10 a 17 | Conjugados internos del mismo lado |

---

## Ponderación en `generateRandomProblem`

Para garantizar variedad didáctica equiprobable:
- $22\%$ Complementarios (`suma90`).
- $22\%$ Alternos internos (`igualdad`).
- $22\%$ Conjugados internos (`suma180`).
- $17\%$ Opuestos por el vértice (`igualdad`).
- $17\%$ Suplementarios adyacentes (`suma180`).

---

## Regla de Oro: Determinismo y Regresión
1. **Hidratación SSG:** En Astro estático, inicializar siempre con `createSeededRng(2024)` para que el HTML inicial del servidor coincida con el cliente. En `onMount()` del componente Svelte se genera un ejercicio aleatorio fresco con `generateRandomProblem()`.
2. **Snapshot de Regresión:** Cualquier modificación matemática debe contrastarse con `src/lib/math/equationsSnapshot.test.ts`. El snapshot **no debe regenerarse**; el orden y secuencia de llamadas a `rng()` debe ser rigurosamente preservado.
