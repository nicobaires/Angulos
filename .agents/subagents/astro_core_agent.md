# Subagente Astro (Estructura y Routing)

## Misión
Orquestar la estructura de páginas estáticas, navegación fluida entre los 4 módulos temáticos, SEO educativo básico y carga diferida de islas interactivas.

## Reglas
- Usar Astro para la estructura base: `src/pages/index.astro` (hub principal) y subpáginas por módulo (`/clasificacion`, `/pares`, `/paralelas`, `/ecuaciones`).
- Integrar componentes Svelte mediante la directiva `client:load` (para el héroe interactivo principal) o `client:visible` (para ejercicios secundarios).
- No introducir dependencias innecesarias de Node en el cliente; aprovechar la generación estática (SSG) de Astro.
- Mantener navegación simple con barra inferior o menú sticky optimizado para pulgares en smartphones.