<script lang="ts">
  import Katex from '../../common/Math.svelte';

  interface Props {
    type: 'success' | 'warning' | 'error' | null;
    message: string;
    displayLatex: string;
    targetNum: number;
    targetDen: number;
  }

  let { type, message, displayLatex, targetNum, targetDen }: Props = $props();
</script>

{#if type}
  {#if type === 'success'}
    <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-1">
      <p class="text-xs font-black text-emerald-800 dark:text-emerald-200">{message}</p>
      <div class="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
        <Katex formula={`${displayLatex} = \\frac{${targetNum}}{${targetDen}}`} />
      </div>
    </div>
  {:else if type === 'warning'}
    <div class="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-2xl text-xs space-y-1 text-center">
      <p class="font-bold text-amber-800 dark:text-amber-200">{message}</p>
    </div>
  {:else if type === 'error'}
    <div class="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 rounded-2xl text-xs space-y-1">
      <p class="font-bold text-rose-800 dark:text-rose-200">Aún no es la respuesta correcta:</p>
      <p class="text-[11px] text-rose-700 dark:text-rose-300 font-medium">{message}</p>
    </div>
  {/if}
{/if}
