# MEMORY.md - Estado del Proyecto

## Estado Actual
- **Fase:** Todos los 4 módulos temáticos interactivos completados, modulares, validados en producción con Modo Oscuro, correcciones pedagógicas (Spec 05), ampliación curricular de Ecuaciones (Spec 07 / Módulo 4) y suite de pruebas unitarias automatizadas con Vitest (32/32 tests pasando).
- **Rama Activa:** `dev` (Gobernanza estricta: merge a `main` solo con orden explícita del Arquitecto Principal).
- **Stack seleccionado:** Astro 5, Svelte 5 (Runes), Tailwind CSS (darkMode: 'class'), KaTeX, Vitest, pnpm, Netlify.

## Módulos de Aprendizaje
- [x] Módulo 1: Clasificación según medida (.agents/specs/01_clasificacion_angulos.md)
- [x] Módulo 2: Pares de ángulos (.agents/specs/02_pares_angulos.md)
- [x] Módulo 3: Paralelas cortadas por una secante (.agents/specs/03_paralelas_secante.md)
- [x] Módulo 4: Ecuaciones con ángulos (.agents/specs/04_ecuaciones_angulos.md)
  - [x] Variante opuestos por el vértice ($\alpha = \beta$)
  - [x] Variante adyacentes suplementarios ($\alpha + \beta = 180^\circ$)
  - [x] Nueva Variante: complementarios con símbolo de 90° ($\alpha + \beta = 90^\circ$)
  - [x] Nueva Variante: paralelas con alternos internos ($\alpha = \beta$)
  - [x] Nueva Variante: paralelas con conjugados internos ($\alpha + \beta = 180^\circ$)
- [x] Soporte Global: Modo Oscuro con persistencia en localStorage y switch accesible en encabezados.
- [x] Refinamiento Didáctico: Correcciones de desafíos, botón de confirmación y coherencia espacial de respuestas (.agents/specs/05_correcciones_desafios.md).
- [x] Testing y Calidad: Vitest con 32 tests unitarios en `angles.test.ts`, `pairsChallenges.test.ts` y `equations.test.ts`, PRNG mulberry32 inyectable y prevención de mismatch de hidratación en SSG.
- [x] Vista de Escritorio: Adaptación aditiva a 2 columnas para pantallas grandes (`lg:`, $\ge 1024\text{ px}$) con `ModuleSplit.svelte`, escalado visual a 480px y cero regresión mobile (.agents/specs/06_vista_escritorio.md).
- [x] Despliegue en Netlify: Publicado y operativo en producción en https://angulos2.netlify.app/
- [x] Modo Desafío Dinámico y Entrada Manual: Aleatorización de preguntas en Módulo 1 y Módulo 2 (valores variados en complementarios, suplementarios y opuestos), gráficos ciegos en desafíos (ocultamiento de la medida dada en la consigna) e inputs numéricos manuales por teclado sincronizados en Módulos 1, 2 y 3.
- [x] Gestión de Ramas y Gobernanza (`AGENTS.md`): Establecido que el usuario es el Arquitecto Principal. Creación de la rama `dev` para futuros desarrollos. La integración (merge) hacia `main` queda reservada estrictamente a la orden explícita del Arquitecto.
- [x] Límite de Líneas Flexible con Justificación: Estándar deseado fijado en $\le 130$ líneas. Excepciones justificadas y aprobadas por el Arquitecto con un tope máximo absoluto e inviolable de 210 líneas.

## Registro de Decisiones Técnicas
- **Nuevas Variantes Curriculares de Módulo 4 (Spec 07):**
  - Se agregaron 3 nuevos generadores algebraicos en `equations.ts`: `generateComplementaryEquationProblem` ($\alpha + \beta = 90^\circ$), `generateAlternateInteriorEquationProblem` ($\alpha = \beta$), y `generateConsecutiveInteriorEquationProblem` ($\alpha + \beta = 180^\circ$).
  - Se modularizó la renderización visual en SVG: `SingleVertexDiagram.svelte` (75 líneas, gestiona opuestos, suplementarios y complementarios con símbolo de 90°) y `ParallelDiagram.svelte` (68 líneas, gestiona paralelas cortadas por secante destacando alternos o conjugados según corresponda).
  - El orquestador `EquationDiagram.svelte` quedó en 36 líneas y `StepSolver.svelte` en 118 líneas ($\le 130$ líneas), incorporando la 3ra relación geométrica ($\alpha + \beta = 90^\circ$) y retroalimentación pedagógica contextual.
- **Desafíos Aleatorios y Procedurales (Módulo 1 y 2):** En Módulo 1 se implementó un barajado Fisher-Yates de los 6 tipos de ángulos. En Módulo 2 se creó un generador procedural (`generatePairsChallengesDeck`) con pools de ángulos limpios ($20^\circ$ a $150^\circ$) para complementarios, suplementarios y opuestos por el vértice, con selección aleatoria por partida.
- **Gráficos Ciegos en Desafíos (Módulo 2):** Para evitar regalar la respuesta o permitir que el alumno busque números coincidentes sin pensar, `AdjacentCanvas.svelte` y `OppositeCanvas.svelte` ocultan la medida en grados del ángulo dado en la consigna durante los desafíos (`hideBetaDegrees` y `hideAdjacentDegrees`), mostrando únicamente los símbolos algebraicos ($\beta$, $\hat{2}$, $\hat{4}$). `PairsCard.svelte` oculta la sustitución numérica en tiempo real durante los desafíos.
- **Entrada Manual de Grados por Teclado:** Se incorporaron inputs numéricos accesibles (`type="number"`, `inputmode="numeric"`) en `AngleControls.svelte`, `PairsControls.svelte` y `TransversalControls.svelte`. Funcionan en sincronización bidireccional con los sliders y el arrastre directo, facilitando la exactitud tanto en móviles como en PC sin frustración motriz.
- **Despliegue Continuo en Netlify:** Archivo `netlify.toml` endurecido con `NODE_VERSION = "20"`, `PNPM_FLAGS = "--frozen-lockfile"` y cabeceras de caché inmutable para `/_astro/*`. Inclusión de `public/favicon.svg` y `src/pages/404.astro` para eliminar errores 404 en navegadores y crawlers. Preconnect de `cdn.jsdelivr.net` en `Layout.astro` para carga instantánea de tipografías KaTeX. Sitio en producción: https://angulos2.netlify.app/
- **Modularidad Estricta (SRP):** Límite estándar deseado de $\le 130$ líneas por componente. Todos los componentes Svelte del proyecto tienen $\le 120$ líneas actualmente.
