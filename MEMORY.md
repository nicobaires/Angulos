# MEMORY.md - Estado del Proyecto

## Estado Actual
- **Fase:** Todos los 4 módulos temáticos interactivos completados, modulares y validados en producción con soporte integral de Modo Oscuro (Dark Mode).
- **Stack seleccionado:** Astro 5, Svelte 5 (Runes), Tailwind CSS (darkMode: 'class'), KaTeX, pnpm, Netlify.

## Módulos de Aprendizaje
- [x] Módulo 1: Clasificación según medida (.agents/specs/01_clasificacion_angulos.md)
- [x] Módulo 2: Pares de ángulos (.agents/specs/02_pares_angulos.md)
- [x] Módulo 3: Paralelas cortadas por una secante (.agents/specs/03_paralelas_secante.md)
- [x] Módulo 4: Ecuaciones con ángulos (.agents/specs/04_ecuaciones_angulos.md)
- [x] Soporte Global: Modo Oscuro con persistencia en localStorage y switch accesible en encabezados.

## Registro de Decisiones Técnicas
- **Modo Oscuro (Tailwind + Runes):** Estrategia `darkMode: 'class'` con script inlined anti-FOUC en `Layout.astro` y toggle Svelte 5 reactivo (`ThemeToggle.svelte`). Compatible con temas oscuros tipo blueprint/pizarrón técnico en canvas SVG.
- **Modularidad Estricta (SRP):** Límite máximo de ~100 a 130 líneas por componente. El componente más extenso (`StepSolver.svelte`) cuenta con 124 líneas. Modularización de `Protractor.svelte` en `ProtractorTicks.svelte`.
- **Estandarización de Skills:** Carpetas `.agents/skills/<name>/SKILL.md` con frontmatter YAML compatible con el motor de descubrimiento nativo de Antigravity.
- **Compatibilidad Rollup (WASM):** Configurado `pnpm.overrides.rollup = "npm:@rollup/wasm-node"` en `package.json` para garantizar compilación universal en Vite sin dependencias de instrucciones de CPU no compatibles (AVX2).
- **Svelte 5 Runes:** KaTeX y componentes reactivos estandarizados a `$props()`, `$state()`, `$derived()`.
- **SVG Reactivo:** Sin canvas complejo ni librerías de terceros; arcos calculados mediante la skill `svg-angle-render`.
- **Target Mobile:** Toda interacción debe funcionar fluidamente con el dedo en teléfonos de 360px a 420px de ancho (`min-h-[44px]`, `touch-manipulation`).
- **Despliegue:** Despliegue estático continuo mediante Netlify (`publish = "dist"`, `command = "pnpm run build"`).
