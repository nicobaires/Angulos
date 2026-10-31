# Spec 04: Resolución de Ecuaciones

## Arquitectura Modular (Estándar AGENTS.md)
- **Orquestador:** `src/components/interactive/EquationSolver.svelte` (~70 a 90 líneas).
- **Subcomponentes Atómicos (`src/components/interactive/equations/`):**
  - `EquationDiagram.svelte`: Representación visual SVG del par geométrico con las expresiones algebraicas rotuladas (ej.: $\alpha = 2x + 10^\circ$, $\beta = 3x - 40^\circ$).
  - `StepSolver.svelte`: Asistente interactivo paso a paso con inputs numéricos para la incógnita $x$ y el ángulo final.
  - `EquationFeedback.svelte`: Tarjeta de validación instantánea que muestra el desarrollo paso a paso del despeje si el alumno se equivoca o desea ver la explicación.
- **Lógica Matemática:** `src/lib/math/equations.ts` (generador de números limpios enteros positivos, despeje algebraico y validación de respuestas).
- **Contenidos Pedagógicos:** `src/lib/pedagogical/equationsBank.ts` (plantillas pedagógicas de enunciados y pistas de despeje algebraico para 2° año).

## Mecánica
- Generación procedural de problemas aleatorios con soluciones enteras.
- Modo guiado paso a paso:
  1. **Planteo de la relación geométrica:** Identificar si es igualdad ($\alpha = \beta$) o suma ($\alpha + \beta = 180^\circ$).
  2. **Resolución de la incógnita $x$:** Input numérico para ingresar el valor de $x$.
  3. **Cálculo del ángulo numérico final:** Reemplazo de $x$ en la fórmula para obtener el ángulo en grados.
  4. **Validación:** Explicación detallada con KaTeX ante acierto o error.
