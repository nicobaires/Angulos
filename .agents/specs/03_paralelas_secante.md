# Spec 03: Paralelas cortadas por una Secante

- **Componente:** `src/components/interactive/ParallelTransversal.svelte`
- **Mecánica:**
  - Dos rectas horizontales fijas y una secante que se puede rotar entre 20° y 80°.
  - 8 sectores circulares numerados del 1 al 8.
  - Filtro por botones:
    - "Alternos internos" (resalta pares con igual color).
    - "Alternos externos" (resalta pares con igual color).
    - "Correspondientes" (resalta pares con igual color).
    - "Conjugados internos" (resalta pares suplementarios).
    - "Conjugados externos" (resalta pares suplementarios).