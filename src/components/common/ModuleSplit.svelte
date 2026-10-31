<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    visual: Snippet;
    panel: Snippet;
  }

  let { visual, panel }: Props = $props();
</script>

<div class="flex flex-col w-full lg:grid lg:grid-cols-2 lg:gap-8 lg:p-6 lg:items-start">
  <div class="w-full flex flex-col items-center justify-center">
    {@render visual()}
  </div>
  <div class="w-full flex flex-col">
    {@render panel()}
  </div>
</div>

