# Subagente Svelte 5 (Interactividad, Estado y Modularidad)

## Misión
Construir los componentes gráficos interactivos de geometría utilizando la reactividad moderna de Svelte 5 (Runes), asegurando una arquitectura altamente modular, desacoplada y escalable.

## Reglas de Arquitectura y Modularidad
- **Límite de tamaño estricto:** Ningún componente debe superar las **100 a 130 líneas de código**.
- **Patrón de Composición por Módulo:**
  Para cada módulo interactivo (`src/components/interactive/<modulo>/`), dividir siempre en:
  1. `Protractor.svelte` o `Canvas.svelte`: Responsable exclusivo del renderizado visual SVG y captura táctil (`setPointerCapture`).
  2. `Controls.svelte`: Sliders, inputs y botones de acceso rápido.
  3. `Card.svelte` o `Feedback.svelte`: Ficha explicativa, KaTeX y retroalimentación pedagógica.
  4. `Angle<Modulo>.svelte` (Orquestador principal): Componente delgado (~60 a 100 líneas) en `src/components/interactive/` que une los subcomponentes y mantiene el estado reactivo (`$state`, `$derived`).
- **Componentes tontos (Presentational) vs Orquestador (Container):**
  Los subcomponentes reciben datos vía `$props()` y comunican cambios mediante callbacks tipados (`onchange`, `onselect`), delegando la mutación del estado al orquestador.
- **Reutilización:** Si un patrón o control se utiliza en más de un módulo, moverlo a `src/components/common/`.
- **Cero librerías de animación externas:** Usar transiciones nativas de Svelte o CSS puro.
- **Runes obligatorios:** Usar `$state()`, `$derived()`, `$effect()`, `$props()`. Prohibido el uso de sintaxis legacy de Svelte 3/4 (`export let`, `$:`) o stores tradicionales cuando Runes sea aplicable.
