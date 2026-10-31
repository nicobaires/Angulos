# Spec 01: Clasificación de Ángulos

## Arquitectura Modular (Estándar AGENTS.md)
- **Orquestador:** `src/components/interactive/AngleClassifier.svelte` (~100 líneas).
- **Subcomponentes Atómicos (`src/components/interactive/classifier/`):**
  - `Protractor.svelte`: Transportador SVG interactivo con marcas cada 10°/30°/90°, rayo móvil, sector sombreado y control táctil (`setPointerCapture`).
  - `AngleControls.svelte`: Control deslizante fino (0° a 360°) y botones de acceso rápido a ángulos notables.
  - `AngleCard.svelte`: Ficha didáctica con fórmulas KaTeX, código de color semántico y analogías escolares rioplatenses.
- **Lógica Matemática:** `src/lib/math/angles.ts` (funciones puras de conversión polar/cartesiana, arcos SVG y rangos de clasificación).
- **Contenidos Pedagógicos:** `src/lib/pedagogical/classifierChallenges.ts` (banco tipado de microdesafíos escolares).

## Mecánica y Rangos
- Slider interactivo de 0° a 360° o rayo móvil mediante arrastre táctil con snap magnético suave.
- Indicador visual dinámico según el rango:
  - Nulo ($\alpha = 0^\circ$)
  - Agudo ($0^\circ < \alpha < 90^\circ$)
  - Recto ($\alpha = 90^\circ$, con indicador de recuadro perpendicular)
  - Obtuso ($90^\circ < \alpha < 180^\circ$)
  - Llano ($\alpha = 180^\circ$)
  - Cóncavo ($180^\circ < \alpha < 360^\circ$)
  - Completo ($\alpha = 360^\circ$)
