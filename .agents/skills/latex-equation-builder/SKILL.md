---
name: latex-equation-builder
description: >-
  Renderizador seguro de fórmulas KaTeX en componentes de Svelte 5 con Runes para Astro.
---

# Skill: Renderizador KaTeX Seguro (Svelte 5 Runes)

## Descripción
Formato estándar para renderizar expresiones matemáticas sin roturas de layout ni bloqueos en Astro/Svelte 5, utilizando reactividad moderna con `$props()` y `$derived()`.

## Componente Base (`Math.svelte`)

```svelte
<script>
  import katex from 'katex';

  let { formula = '', displayMode = false } = $props();

  const html = $derived(
    katex.renderToString(formula, {
      throwOnError: false,
      displayMode
    })
  );
</script>

<span class="inline-math px-1 select-none">{@html html}</span>
```

## Buenas Prácticas
1. **Evitar parpadeos:** Incluir los estilos CSS de KaTeX en el layout general de Astro (`<link rel="stylesheet" href=".../katex.min.css">`).
2. **Escape seguro:** Usar `throwOnError: false` para mostrar advertencias visuales limpias en vez de lanzar excepciones no controladas.

