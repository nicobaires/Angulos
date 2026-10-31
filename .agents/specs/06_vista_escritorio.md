# Spec 06: Vista para Escritorio (sin alterar la vista mobile)

## Objetivo
Agregar una presentación pensada para pantallas grandes (notebook, PC, proyector del aula) **sin modificar en nada la vista mobile actual**. En escritorio, el contenido deja de ser una columna angosta centrada y pasa a aprovechar el ancho: visual interactivo a un lado, controles y fichas al otro.

## Regla de oro: mobile intacto
- **Estrategia aditiva y mobile-first:** solo se agregan clases con prefijo `lg:` (≥ 1024 px). Está prohibido editar, quitar o reordenar clases existentes sin prefijo.
- Por debajo de 1024 px (celulares **y tablets**) la app se ve y se comporta exactamente igual que hoy.
- No se toca el `<meta viewport>` (`maximum-scale=1`, `user-scalable=no`) ni los criterios de 360-420 px y zonas táctiles de 44 px.
- No se toca `src/lib/math/` ni `src/lib/pedagogical/`: la lógica y los contenidos son los mismos en ambas vistas.

## Diseño por pantalla (solo ≥ 1024 px)
- **Contenedor global (`Layout.astro`):** `max-w-md` pasa a ser `lg:max-w-6xl`. Se mantiene el fondo, el borde lateral y el modo oscuro.
- **Inicio (`index.astro`):** las 4 tarjetas de módulos pasan de 1 columna a `lg:grid-cols-2`. El header con gradiente ocupa todo el ancho.
- **Páginas de módulo (`/clasificacion`, `/pares`, `/paralelas`, `/ecuaciones`):** layout en dos columnas.
  - Columna izquierda: el visual interactivo (transportador, canvas de pares, canvas de transversal, diagrama de ecuación), más grande: `max-w-[320px]`/`[340px]` pasa a `lg:max-w-[480px]`. Los SVG ya usan `viewBox`, así que escalan sin cambiar la lógica.
  - Columna derecha: controles, ficha didáctica, desafíos y feedback.
  - La guía de repaso de `/ecuaciones` queda debajo, a todo el ancho.
- **`ModuleHeader.astro`:** se mantiene igual; solo se le agrega `lg:px-8` para alinearlo con el nuevo ancho.

## Arquitectura Modular (Estándar AGENTS.md)
- **Nuevo componente común:** `src/components/common/ModuleSplit.svelte` (~25 líneas). Recibe dos snippets de Svelte 5, `visual` y `panel`.
  - En mobile: `flex flex-col w-full`, mismo orden de DOM que hoy (visual y después panel) → resultado idéntico al actual.
  - En escritorio: `lg:grid lg:grid-cols-2 lg:gap-8 lg:p-6`.
- **Orquestadores:** `AngleClassifier`, `AnglePairs`, `ParallelTransversal` y `EquationSolver` reemplazan su contenedor `flex flex-col` por `<ModuleSplit>`.
  - `AnglePairs.svelte` y `ParallelTransversal.svelte` ya tienen 119 líneas: si el cambio los hace superar ~120, extraer primero la parte sobrante a un subcomponente atómico (regla SRP vigente).
- **Estilos:** solo utilidades Tailwind con `lg:`. No se agregan breakpoints personalizados ni CSS global.

## Interacción en escritorio
- **Mouse:** confirmar que el arrastre del transportador (módulo 1), de los ángulos (módulo 2) y de la secante (módulo 3) funciona con mouse. Si hoy se usan eventos táctiles, migrar a **Pointer Events** (cubren mouse, dedo y lápiz) sin cambiar el comportamiento táctil.
- **Hover y foco:** agregar `lg:hover:` en botones y tarjetas, y `focus-visible:` con anillo visible en todo control interactivo.
- **Teclado:** los controles de ángulo deben poder operarse con flechas (±1°, con Shift ±10°) y los botones con Enter/Espacio.
- Mantener `cursor-pointer` / `cursor-grab` en las zonas arrastrables.

## Criterios de Aceptación
1. **Regresión mobile = 0:** capturas de las 5 páginas a 360, 390 y 420 px, en claro y oscuro, antes y después del cambio, sin diferencias de píxeles. (Playwright o equivalente; las capturas "antes" se toman **antes** de tocar nada.)
2. A 1024, 1280 y 1920 px cada módulo muestra dos columnas sin scroll horizontal y con el visual completo visible sin scrollear en 1280×720.
3. A 1023 px se ve la vista mobile; a 1024 px, la de escritorio.
4. Modo oscuro correcto en ambas vistas.
5. Los desafíos y el botón "Confirmar respuesta" (Spec 05) funcionan igual con mouse, teclado y táctil.
6. `pnpm test`, `pnpm run check` y `pnpm run build` pasan sin errores; ningún archivo supera ~120 líneas.

## Plan de Trabajo (Mapa de Subagentes)
1. **Línea base (`deployment_agent`):** tomar las capturas mobile "antes".
2. **`tailwind_theme_agent`:** `Layout.astro`, `index.astro`, `ModuleHeader.astro` con clases `lg:`.
3. **`svelte_ui_agent`:** `ModuleSplit.svelte`, migración de los 4 orquestadores y revisión de Pointer Events, foco y teclado.
4. **`astro_core_agent`:** ajustar el layout de las 4 páginas y la guía de `/ecuaciones`.
5. **`deployment_agent`:** capturas "después", comparación píxel a píxel, tests, check y build.
6. **Cierre:** actualizar `MEMORY.md` (nueva decisión: estrategia aditiva `lg:`) y `README.md` (Vista Escritorio).

## Fuera de Alcance
- Cambios de contenido pedagógico o de lógica matemática.
- Layout específico para tablets (entre 768 y 1023 px): conservan la vista mobile.
- Cambios al `<meta viewport>`.
