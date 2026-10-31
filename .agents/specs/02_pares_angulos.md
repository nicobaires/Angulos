# Spec 02: Pares de Ángulos

## Arquitectura Modular (Estándar AGENTS.md)
- **Orquestador:** `src/components/interactive/AnglePairs.svelte` (~70 a 90 líneas).
- **Subcomponentes Atómicos (`src/components/interactive/pairs/`):**
  - `PairsModeTabs.svelte`: Selector táctil de modo (Modo 1: Consecutivos/Adyacentes/Complementarios vs Modo 2: Opuestos por el vértice).
  - `AdjacentCanvas.svelte`: Canvas SVG con rayo divisorio interactivo que reparte una amplitud total ($90^\circ$ o $180^\circ$) entre $\alpha$ y $\beta$.
  - `OppositeCanvas.svelte`: Canvas SVG con dos rectas secantes móviles que forman 4 sectores circulares coloreados con la misma tonalidad para pares congruentes ($\hat{1} = \hat{3}$ y $\hat{2} = \hat{4}$).
  - `PairsControls.svelte`: Sliders de rotación/amplitud y botones de alternancia rápida.
  - `PairsCard.svelte`: Ficha explicativa con KaTeX que muestra en tiempo real las ecuaciones de suma ($\alpha + \beta = 90^\circ$ o $180^\circ$) o igualdad ($\hat{1} = \hat{3}$).
- **Lógica Matemática:** `src/lib/math/pairs.ts` (cálculo de complementos, suplementos y ángulos entre secantes).
- **Contenidos Pedagógicos:** `src/lib/pedagogical/pairsChallenges.ts` (banco de preguntas y desafíos conceptuales: ej. "¿pueden dos ángulos agudos ser suplementarios?").

## Mecánica
- **Modo 1: Complementarios y Suplementarios:**
  - Control de suma fija ($90^\circ$ para complementarios, $180^\circ$ para adyacentes/suplementarios).
  - Modificación fluida de $\alpha$ actualizando automáticamente $\beta = \text{Total} - \alpha$.
- **Modo 2: Opuestos por el Vértice:**
  - Dos rectas secantes que se cruzan en un vértice común.
  - Resaltado con idéntico color para los pares congruentes opuestos.
