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

## Registro de Decisiones Técnicas
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
