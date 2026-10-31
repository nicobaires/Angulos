# MEMORY.md - Estado del Proyecto

## Estado Actual
- **Fase:** Módulo 1 (Clasificación de Ángulos) implementado y validado en producción. Listo para Módulo 2 (Pares de Ángulos).
- **Stack seleccionado:** Astro 5, Svelte 5 (Runes), Tailwind CSS, KaTeX, pnpm, Netlify.

## Módulos de Aprendizaje
- [x] Módulo 1: Clasificación según medida (.agents/specs/01_clasificacion_angulos.md)
- [ ] Módulo 2: Pares de ángulos (.agents/specs/02_pares_angulos.md)
- [ ] Módulo 3: Paralelas cortadas por una secante (.agents/specs/03_paralelas_secante.md)
- [ ] Módulo 4: Ecuaciones con ángulos (.agents/specs/04_ecuaciones_angulos.md)

## Registro de Decisiones Técnicas
- **Estandarización de Skills:** Carpetas `.agents/skills/<name>/SKILL.md` con frontmatter YAML compatible con el motor de descubrimiento nativo de Antigravity.
- **Compatibilidad Rollup (WASM):** Configurado `pnpm.overrides.rollup = "npm:@rollup/wasm-node"` en `package.json` para garantizar compilación universal en Vite sin dependencias de instrucciones de CPU no compatibles (AVX2).
- **Svelte 5 Runes:** KaTeX y componentes reactivos estandarizados a `$props()`, `$state()`, `$derived()`.
- **SVG Reactivo:** Sin canvas complejo ni librerías de terceros; arcos calculados mediante la skill `svg-angle-render`.
- **Target Mobile:** Toda interacción debe funcionar fluidamente con el dedo en teléfonos de 360px a 420px de ancho (`min-h-[44px]`, `touch-manipulation`).
- **Despliegue:** Despliegue estático continuo mediante Netlify (`publish = "dist"`, `command = "pnpm run build"`).