<script lang="ts">
  import type { DecimalParts, DecimalType } from '../../../lib/math/fractions';
  import Katex from '../../common/Math.svelte';

  interface Props {
    type: DecimalType;
    parts: DecimalParts;
    latexDisplay: string;
  }

  let { type, parts, latexDisplay }: Props = $props();
</script>

<div class="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 select-none transition-colors">
  <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
    Número Decimal
  </span>

  <!-- Número grande renderizado con KaTeX -->
  <div class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 py-1">
    <Katex formula={latexDisplay} displayMode={true} />
  </div>

  <!-- Desglose de componentes con badges de colores didácticos -->
  <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
    <span class="px-2.5 py-1 rounded-xl font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
      Parte entera: {parts.whole}
    </span>

    {#if type === 'mixed_periodic'}
      <span class="px-2.5 py-1 rounded-xl font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
        Anteperíodo: {parts.nonPeriodic}
      </span>
    {/if}

    {#if type === 'pure_periodic' || type === 'mixed_periodic'}
      <span class="px-2.5 py-1 rounded-xl font-bold bg-pink-100 dark:bg-pink-950/70 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-900/60">
        Período (bajo el arco): {parts.periodic}
      </span>
    {:else}
      <span class="px-2.5 py-1 rounded-xl font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
        Decimales: {parts.nonPeriodic}
      </span>
    {/if}
  </div>
</div>
