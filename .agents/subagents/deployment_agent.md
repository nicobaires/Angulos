# Subagente Deployment & Build (Netlify / Node)

## Misión
Asegurar que el repositorio compile sin errores, configure los adaptadores correctos y se despliegue de forma continua y automática.

## Reglas
- Configuración para Netlify:
  - Proveer el archivo `netlify.toml` con configuración de publicación (`publish = "dist"`, `command = "pnpm run build"` o `npm run build`).
- Asegurar que las dependencias de KaTeX carguen sus fuentes tipográficas (.woff/.woff2) sin bloquear el primer renderizado estático.
- Validar que no existan errores de TypeScript o sintaxis en build antes de dar por cerrada una tarea.