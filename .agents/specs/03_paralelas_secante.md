# Spec 03: Paralelas cortadas por una Secante

## Arquitectura Modular (Estándar AGENTS.md)
- **Orquestador:** `src/components/interactive/ParallelTransversal.svelte` (~70 a 90 líneas).
- **Subcomponentes Atómicos (`src/components/interactive/transversal/`):**
  - `TransversalCanvas.svelte`: Canvas SVG con dos rectas horizontales fijas ($R_1 \parallel R_2$) y una secante transversal con ángulo de inclinación regulable ($20^\circ$ a $80^\circ$). Renderiza los 8 arcos numerados del $\hat{1}$ al $\hat{8}$.
  - `RelationshipFilter.svelte`: Botones táctiles para filtrar relaciones geométricas (Alternos internos, Alternos externos, Correspondientes, Conjugados internos, Conjugados externos).
  - `TransversalCard.svelte`: Ficha didáctica que detalla si el par seleccionado es congruente (igual color) o suplementario (colores complementarios con suma $180^\circ$).
- **Lógica Matemática:** `src/lib/math/transversal.ts` (cálculo de coordenadas de intersección, ángulos de los 8 sectores y mapeo de relaciones de igualdad o suplementariedad).
- **Contenidos Pedagógicos:** `src/lib/pedagogical/transversalChallenges.ts` (desafíos: "Identificá los alternos internos de $\hat{3}$", retroalimentación ante errores comunes).

## Mecánica
- Rectas horizontales paralelas y secante con arrastre de rotación.
- 8 sectores numerados y coloreados según la relación seleccionada:
  - **Alternos internos:** Iguales ($\hat{3} = \hat{5}$, $\hat{4} = \hat{6}$).
  - **Alternos externos:** Iguales ($\hat{1} = \hat{7}$, $\hat{2} = \hat{8}$).
  - **Correspondientes:** Iguales ($\hat{1} = \hat{5}$, $\hat{2} = \hat{6}$, $\hat{3} = \hat{7}$, $\hat{4} = \hat{8}$).
  - **Conjugados internos:** Suplementarios ($\hat{3} + \hat{6} = 180^\circ$, $\hat{4} + \hat{5} = 180^\circ$).
  - **Conjugados externos:** Suplementarios ($\hat{1} + \hat{8} = 180^\circ$, $\hat{2} + \hat{7} = 180^\circ$).
