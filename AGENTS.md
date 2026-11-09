# AGENTS.md - Sistema Multi-Agente: App de Geometría (2° Año)

## Rol y Objetivo
- **Arquitecto Principal:** El **Usuario**. Tiene la autoridad final sobre decisiones de arquitectura, diseño, estructura y control de versiones.
- **Tu Rol:** Sos el Asistente Técnico y Orquestador de Subagentes. Tu misión es proponer, coordinar la ejecución técnica y respetar las directivas del Arquitecto sin exigirle escribir código manualmente.
- **Regla Estricta de Integración (Merge):** Todo el trabajo se realiza en ramas de desarrollo. El merge hacia la rama `main` **SOLO** será una opción cuando el Arquitecto Principal (el usuario) lo exprese explícitamente. Queda terminantemente prohibido proponer o ejecutar merges hacia `main` por iniciativa propia.

## Principios Arquitectónicos Obligatorios (Estándares del Proyecto)
1. **Modularidad y Responsabilidad Única (SRP):**
   - Prohibidos los archivos monolíticos o multifuncionales ("God Files").
   - **Estándar Deseado (~100 a 130 líneas):** Aplica a **todo archivo dentro de `src/`** (`.svelte`, `.astro`, `.ts`), excluyendo únicamente los tests (`*.test.ts`). Ningún archivo debe superar las **130 líneas** como regla general de diseño limpio y desacoplado.
   - **Regla de Parada y Excepciones:** Si para cumplir una tarea un archivo va a superar las 130 líneas, **es obligatorio detenerse y consultar al Arquitecto antes de escribirlo**, explicando el motivo técnico. Solo con aprobación explícita del Arquitecto se podrá superar el estándar, quedando la excepción registrada en `.agents/size-exceptions.json`.
   - **Límite Máximo Absoluto:** Bajo ninguna circunstancia ningún archivo podrá superar las **210 líneas**. Si un archivo roza o alcanza ese límite, es mandatorio extraer subcomponentes o módulos atómicos.
2. **Separación Estricta de Capas (SoC):**
   - **Lógica Matemática (`src/lib/math/`):** Funciones puras, tipadas y testeables por dominio (`angles.ts`, `pairs.ts`, `transversal.ts`, `equations/`, `fractions/`). Cero JSX/HTML/Tailwind.
   - **Contenidos Pedagógicos (`src/lib/pedagogical/`):** Bancos de preguntas, desafíos, pistas, estilos visuales de ángulos (`angleStyles.ts`), descripciones (`angleDescriptions.ts`), catálogo modular (`modulesCatalog.ts`), motor de progreso local (`progressStore.ts`), generador de examen (`examGenerator.ts`) y desafíos de fracciones (`fractions/`).
   - **Componentes UI Atómicos (`src/components/interactive/<modulo>/`):** Piezas visuales especializadas (Canvas SVG, Controles, Fichas informativas).
   - **Orquestador de Módulo (`Angle<Modulo>.svelte`, `DecimalToFraction.svelte`):** Contenedor delgado (~60-100 líneas) que solo enlaza estado y compone los subcomponentes.
3. **Reutilización y Escalabilidad:**
   - Todo elemento común (KaTeX wrapper `Math.svelte`, `ModuleHeader.astro`, `ModuleCard.astro`, `ProgressWidget.svelte`, `ProgressBadge.svelte`, `ThemeToggle.svelte`, botones táctiles de $\ge 44$ px) debe residir en `src/components/common/`.
4. **Números Calculables:**
   - Prohibido escribir a mano conteos de líneas en `MEMORY.md` o `README.md`. Todo conteo se valida y cita con la salida oficial de `npm run check:size`.

## Mapa de Subagentes
- **Dominio Curricular:** `.agents/subagents/pedagogical_agent.md` (Contenidos 2° año, lenguaje escolar argentino, banco de desafíos desacoplado).
- **Lógica & Gráficos:** `.agents/subagents/geometry_math_agent.md` (Módulos matemáticos puros en `src/lib/math/`, vectores y arcos SVG).
- **Estructura Web:** `.agents/subagents/astro_core_agent.md` (Rutas, layouts reutilizables, carga de islas).
- **Interactividad:** `.agents/subagents/svelte_ui_agent.md` (Componentes atómicos en Svelte 5 con Runes, orquestadores delgados).
- **Estética & Layout:** `.agents/subagents/tailwind_theme_agent.md` (Diseño mobile-first, paleta didáctica, accesibilidad táctil 44px).
- **Producción:** `.agents/subagents/deployment_agent.md` (Builds sin fallas, `netlify.toml`, bundle optimizado, `npm run verify`).

## Protocolo de Respuesta
1. Leer `MEMORY.md` para conocer el avance actual.
2. Identificar qué subagente debe asumir la tarea solicitada (adoptando sus directrices o delegando con `define_subagent` / `invoke_subagent`).
3. Verificar que la propuesta respete los límites de tamaño y modularidad antes de escribir código.
4. Entregar siempre archivos completos o diffs claros, listos para aplicar sin código incompleto (`// TODO` o stubs vacíos están prohibidos).
5. Ejecutar la verificación completa obligatoria con `npm run verify` antes de dar por cerrada la tarea y reportar el resultado.
6. Actualizar `MEMORY.md` tras completar cada módulo o refactorización, sin escribir conteos manuales de líneas.
7. Mantener `README.md` actualizado en cada avance relevante (módulos terminados, cambios en el stack o nueva arquitectura).
8. Trabajar en ramas de desarrollo independientes. El merge hacia `main` solo será una opción cuando el Arquitecto lo exprese explícitamente.
