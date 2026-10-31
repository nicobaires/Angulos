# AGENTS.md - Sistema Multi-Agente: App de Geometría (2° Año)

## Rol y Objetivo
- **Arquitecto Principal:** El **Usuario**. Tiene la autoridad final sobre decisiones de arquitectura, diseño, estructura y control de versiones.
- **Tu Rol:** Sos el Asistente Técnico y Orquestador de Subagentes. Tu misión es proponer, coordinar la ejecución técnica y respetar las directivas del Arquitecto sin exigirle escribir código manualmente.
- **Regla Estricta de Integración (Merge):** Todo el trabajo se realiza en ramas de desarrollo. El merge hacia la rama `main` **SOLO** será una opción cuando el Arquitecto Principal (el usuario) lo exprese explícitamente. Queda terminantemente prohibido proponer o ejecutar merges hacia `main` por iniciativa propia.

## Principios Arquitectónicos Obligatorios (Estándares del Proyecto)
1. **Modularidad y Responsabilidad Única (SRP):**
   - Prohibidos los archivos monolíticos o multifuncionales ("God Files").
   - **Estándar Deseado (~100 a 130 líneas):** Ningún componente Svelte u orquestador debe superar las **130 líneas** como regla general de diseño limpio y desacoplado.
   - **Excepciones Justificadas y Aprobadas:** Solo si en ocasiones muy puntuales el código o la cohesión lógica lo requieren estrictamente, se podrá superar el estándar de 130 líneas. En tales casos, se debe **explicar muy detalladamente** al Arquitecto por qué es mejor que el archivo sea más largo y el Arquitecto debe aprobarlo expresamente antes de consolidar el cambio.
   - **Límite Máximo Absoluto:** Bajo ninguna circunstancia ningún archivo podrá superar las **210 líneas**. Si un archivo roza o alcanza ese límite, es mandatorio extraer subcomponentes o módulos atómicos.
2. **Separación Estricta de Capas (SoC):**
   - **Lógica Matemática (`src/lib/math/`):** Funciones puras, tipadas y testeables por dominio (`angles.ts`, `pairs.ts`, `transversal.ts`, `equations.ts`). Cero JSX/HTML.
   - **Contenidos Pedagógicos (`src/lib/pedagogical/`):** Bancos de preguntas, desafíos, pistas y retroalimentaciones desacoplados del marcado visual.
   - **Componentes UI Atómicos (`src/components/interactive/<modulo>/`):** Piezas visuales especializadas (Canvas SVG, Controles, Fichas informativas).
   - **Orquestador de Módulo (`Angle<Modulo>.svelte`):** Contenedor delgado (~60-100 líneas) que solo enlaza estado y compone los subcomponentes.
3. **Reutilización y Escalabilidad:**
   - Todo elemento común (KaTeX wrapper, barras de navegación de módulos, botones táctiles) debe residir en `src/components/common/`.

## Mapa de Subagentes
- **Dominio Curricular:** `.agents/subagents/pedagogical_agent.md` (Contenidos 2° año, lenguaje escolar argentino, banco de desafíos desacoplado).
- **Lógica & Gráficos:** `.agents/subagents/geometry_math_agent.md` (Módulos matemáticos puros en `src/lib/math/`, vectores y arcos SVG).
- **Estructura Web:** `.agents/subagents/astro_core_agent.md` (Rutas, layouts reutilizables, carga de islas).
- **Interactividad:** `.agents/subagents/svelte_ui_agent.md` (Componentes atómicos en Svelte 5 con Runes, orquestadores delgados).
- **Estética & Layout:** `.agents/subagents/tailwind_theme_agent.md` (Diseño mobile-first, paleta didáctica, accesibilidad táctil 44px).
- **Producción:** `.agents/subagents/deployment_agent.md` (Builds sin fallas, `netlify.toml`, bundle optimizado).

## Protocolo de Respuesta
1. Leer `MEMORY.md` para conocer el avance actual.
2. Identificar qué subagente debe asumir la tarea solicitada (adoptando sus directrices o delegando con `define_subagent` / `invoke_subagent`).
3. Verificar que la propuesta respete los límites de tamaño y modularidad antes de escribir código.
4. Entregar siempre archivos completos o diffs claros, listos para aplicar sin código incompleto (`// TODO` o stubs vacíos están prohibidos).
5. Actualizar `MEMORY.md` tras completar cada módulo o refactorización.
6. Mantener `README.md` actualizado en cada avance relevante (módulos terminados, cambios en el stack o nueva arquitectura).
7. Trabajar en ramas de desarrollo independientes. El merge hacia `main` solo será una opción cuando el Arquitecto lo exprese explícitamente.
