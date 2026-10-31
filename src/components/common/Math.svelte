<script lang="ts">
  import katex from 'katex';

  interface Props {
    formula: string;
    displayMode?: boolean;
  }

  let { formula = '', displayMode = false }: Props = $props();

  const html = $derived(
    katex.renderToString(formula, {
      throwOnError: false,
      displayMode
    })
  );
</script>

<span class="inline-math px-1 select-none">{@html html}</span>

