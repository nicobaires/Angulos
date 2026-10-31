# MEMORY.md - Estado del Proyecto

## Estado Actual
- **Fase:** Todos los 4 módulos temáticos interactivos completados, modulares, validados en producción con Modo Oscuro, correcciones pedagógicas (Spec 05) y suite de pruebas unitarias automatizadas con Vitest (27/27 tests pasando).
- **Stack seleccionado:** Astro 5, Svelte 5 (Runes), Tailwind CSS (darkMode: 'class'), KaTeX, Vitest, pnpm, Netlify.

## Módulos de Aprendizaje
- [x] Módulo 1: Clasificación según medida (.agents/specs/01_clasificacion_angulos.md)
- [x] Módulo 2: Pares de ángulos (.agents/specs/02_pares_angulos.md)
- [x] Módulo 3: Paralelas cortadas por una secante (.agents/specs/03_paralelas_secante.md)
- [x] Módulo 4: Ecuaciones con ángulos (.agents/specs/04_ecuaciones_angulos.md)
- [x] Soporte Global: Modo Oscuro con persistencia en localStorage y switch accesible en encabezados.
- [x] Refinamiento Didáctico: Correcciones de desafíos, botón de confirmación y coherencia espacial de respuestas (.agents/specs/05_correcciones_desafios.md).
- [x] Testing y Calidad: Vitest con 27 tests unitarios en `angles.test.ts` y `equations.test.ts`, PRNG mulberry32 inyectable y prevención de mismatch de hidratación en SSG.
- [x] Vista de Escritorio: Adaptación aditiva a 2 columnas para pantallas grandes (`lg:`, $\ge 1024\text{ px}$) con `ModuleSplit.svelte`, escalado visual a 480px y cero regresión mobile (.agents/specs/06_vista_escritorio.md).

- [x] Despliegue en Netlify: Publicado y operativo en producción en https://angulos2.netlify.app/
- [x] Modo Desafío Dinámico y Entrada Manual: Aleatorización de preguntas en Módulo 1 y Módulo 2 (valores variados en complementarios, suplementarios y opuestos), gráficos ciegos en desafíos (ocultamiento de la medida dada en la consigna) e inputs numéricos manuales por teclado sincronizados en Módulos 1, 2 y 3.

- [x] Gestión de Ramas y Gobernanza (`AGENTS.md`): Establecido que el usuario es el Arquitecto Principal. Creación de la rama `dev` para futuros desarrollos. La integración (merge) hacia `main` queda reservada estrictamente a la orden explícita del Arquitecto.
- [x] Límite de Líneas Flexible con Justificación: Estándar deseado fijado en $\le 130$ líneas. Excepciones justificadas y aprobadas por el Arquitecto con un tope máximo absoluto e inviolable de 210 líneas.

## Registro de Decisiones Técnicas
- **Desafíos Aleatorios y Procedurales (Módulo 1 y 2):** En Módulo 1 se implementó un barajado Fisher-Yates de los 6 tipos de ángulos. En Módulo 2 se creó un generador procedural (`generatePairsChallengesDeck`) con pools de ángulos limpios ($20^\circ$ a $150^\circ$) para complementarios, suplementarios y opuestos por el vértice, con selección aleatoria por partida.
- **Gráficos Ciegos en Desafíos (Módulo 2):** Para evitar regalar la respuesta o permitir que el alumno busque números coincidentes sin pensar, `AdjacentCanvas.svelte` y `OppositeCanvas.svelte` ocultan la medida en grados del ángulo dado en la consigna durante los desafíos (`hideBetaDegrees` y `hideAdjacentDegrees`), mostrando únicamente los símbolos algebraicos ($\beta$, $\hat{2}$, $\hat{4}$). `PairsCard.svelte` oculta la sustitución numérica en tiempo real durante los desafíos.
- **Entrada Manual de Grados por Teclado:** Se incorporaron inputs numéricos accesibles (`type="number"`, `inputmode="numeric"`) en `AngleControls.svelte`, `PairsControls.svelte` y `TransversalControls.svelte`. Funcionan en sincronización bidireccional con los sliders y el arrastre directo, facilitando la exactitud tanto en móviles como en PC sin frustración motriz.
- **Despliegue Continuo en Netlify:** Archivo `netlify.toml` endurecido con `NODE_VERSION = "20"`, `PNPM_FLAGS = "--frozen-lockfile"` y cabeceras de caché inmutable para `/_astro/*`. Inclusión de `public/favicon.svg` y `src/pages/404.astro` para eliminar errores 404 en navegadores y crawlers. Preconnect de `cdn.jsdelivr.net` en `Layout.astro` para carga instantánea de tipografías KaTeX. Sitio en producción: https://angulos2.netlify.app/
- **Vista de Escritorio y Estrategia Aditiva `lg:` (Spec 06):** Mobile-first estricto donde no se alteran clases sin prefijo. En pantallas $\ge 1024\text{ px}$, el ancho contenedor crece a `max-w-6xl`, las 4 tarjetas de inicio pasan a 2 columnas (`lg:grid-cols-2`), y los módulos dividen pantalla con `ModuleSplit.svelte` (izquierda: visual SVG escalado a 480px; derecha: desafíos, controles y fichas; abajo: resumen de carpeta full-width).
- **Extracción Atómica de Desafíos (SRP en Spec 06):** Para mantener los orquestadores dentro del límite del proyecto ($\le 120$ líneas) al incorporar `ModuleSplit`, se extrajeron los componentes `ClassifierChallenge.svelte`, `PairsChallenge.svelte` y `TransversalChallenge.svelte`.
- **Accesibilidad y Navegación Teclado/Mouse:** Soporte nativo de Pointer Events en todos los gráficos interactivos, indicadores de foco accesible (`focus-visible:ring-2`), y manipulación por teclado en sliders con pasos finos de $\pm 1^\circ$ y saltos de $\pm 10^\circ$ mediante `Shift + Flechas`.
- **Testing Unitario (Vitest):** Cobertura exhaustiva de funciones matemáticas puras (`angles.ts`, `pairs.ts`, `equations.ts`). 500 iteraciones aleatorias de validación para garantizar soluciones enteras positivas y consistencia analítica.
- **Hidratación Determinista (SSG / Módulo 4):** Para evitar desajustes de hidratación entre el HTML estático de Astro y el cliente, `EquationSolver.svelte` inicializa con semilla fija (`createSeededRng(2024)`) y genera un nuevo ejercicio aleatorio en `onMount()`.
- **Botón de Confirmar Respuesta en Desafíos (Spec 05):** Se desacopló la validación continua en arrastre para permitir la exploración táctil libre; la consigna permanece fija y la retroalimentación solo se despliega tras accionar "Confirmar respuesta".
- **Estado Inicial en Módulo 1 y Módulo 3 (Spec 05):** Módulo 1 inicializa en 0°; Módulo 3 inicializa con relación `null` (ningún botón seleccionado por defecto).
- **Coherencia Espacial en Módulo 4 (Spec 05):** Alineación geométrica de las etiquetas SVG ($\alpha$ y $\beta$) con sus insignias inferiores y presentación estandarizada de respuestas con ambas amplitudes ($\text{Rta: } x, \alpha, \beta$).
- **Modo Oscuro (Tailwind + Runes):** Estrategia `darkMode: 'class'` con script inlined anti-FOUC en `Layout.astro` y toggle Svelte 5 reactivo (`ThemeToggle.svelte`). Compatible con temas oscuros tipo blueprint/pizarrón técnico en canvas SVG.
- **Modularidad Estricta (SRP):** Límite máximo de ~100 a 130 líneas por componente. Ningún archivo supera las 119 líneas.
- **Compatibilidad Rollup (WASM):** Configurado `pnpm.overrides.rollup = "npm:@rollup/wasm-node"` en `package.json` para garantizar compilación universal en Vite sin dependencias de instrucciones de CPU no compatibles (AVX2).
- **Svelte 5 Runes:** KaTeX y componentes reactivos estandarizados a `$props()`, `$state()`, `$derived()`.
- **Target Mobile:** Toda interacción debe funcionar fluidamente con el dedo en teléfonos de 360px a 420px de ancho (`min-h-[44px]`, `touch-manipulation`).
- **Despliegue:** Despliegue estático continuo mediante Netlify (`publish = "dist"`, `command = "pnpm run build"`).
