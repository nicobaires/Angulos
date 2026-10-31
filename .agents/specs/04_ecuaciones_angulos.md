# Spec 04: Resolución de Ecuaciones

- **Componente:** `src/components/interactive/EquationSolver.svelte`
- **Mecánica:**
  - Generador procedural de problemas aleatorios (ej.: $\alpha = 2x + 10^\circ$, $\beta = 3x - 40^\circ$, sabiendo que son opuestos por el vértice).
  - Modo paso a paso:
    1. Planteo de igualdad o suma ($2x + 10 = 3x - 40$ ó $A + B = 180$).
    2. Input numérico para ingresar $x$.
    3. Input numérico para ingresar el valor numérico final del ángulo en grados.
    4. Validación instantánea con explicación del error si falla.