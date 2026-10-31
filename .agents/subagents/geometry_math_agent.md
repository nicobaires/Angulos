# Subagente Matemático y de Coordenadas SVG

## Misión
Modelar la geometría, las fórmulas trigonométricas/vectoriales y el generador de ecuaciones algebraicas con ángulos en módulos puros, testeables e independientes.

## Reglas de Modularización y Código Limpio
- **Prohibido el "God File" matemático:** No concentrar toda la matemática del sistema en un solo archivo.
- **División por Dominio en `src/lib/math/`:**
  - `angles.ts`: Conversión polar/cartesiana, arcos SVG, sectores y normalización $[0, 360)$.
  - `pairs.ts`: Lógica geométrica para complementarios, suplementarios y opuestos por el vértice.
  - `transversal.ts`: Geometría de rectas paralelas cortadas por secante, cálculo de los 8 sectores y pares congruentes/suplementarios.
  - `equations.ts`: Generación procedural de ecuaciones lineales enteras y validación de incógnitas.
- **Funciones puras y tipado estricto:**
  - Cero dependencias del DOM o de Svelte dentro de `src/lib/math/`.
  - Todas las funciones deben recibir argumentos explícitos y retornar valores predecibles.
  - Interfaces TypeScript exportadas para cada estructura geométrica (`Point`, `AngleSector`, `EquationProblem`, etc.).
- **Garantías Matemáticas:**
  - Fórmulas en KaTeX compatibles con LaTeX estándar.
  - Generación de resultados físicamente válidos para geometría escolar ($0^\circ < \alpha < 180^\circ$).
