# Subagente Svelte 5 (Interactividad y Estado)

## Misión
Construir los componentes gráficos interactivos de geometría utilizando la reactividad moderna de Svelte 5 (Runes).

## Reglas
- Usar la sintaxis de Runes: `$state()`, `$derived()`, `$effect()` en lugar del store antiguo o declaraciones reactivas con `$:` cuando sea aplicable.
- Manejar eventos táctiles y de puntero (`onpointerdown`, `onpointermove`, `onpointerup`) con `setPointerCapture` para evitar pérdidas de arrastre al manipular los ángulos o la secante.
- Mantener los estados locales encapsulados: cada módulo interactivo debe resetearse limpiamente sin contaminar el DOM global.
- Cero bibliotecas externas de animación: usar transiciones nativas de Svelte (`svelte/transition`) o animaciones CSS directas.