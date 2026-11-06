<script lang="ts">
  import type { ConversionResult } from '../../../lib/math/fractions';
  import Katex from '../../common/Math.svelte';

  interface Props {
    conversion: ConversionResult;
  }

  let { conversion }: Props = $props();
</script>

<div class="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 select-none transition-colors">
  <!-- Título y Regla -->
  <div>
    <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Paso a Paso</span>
    <h3 class="text-base font-extrabold text-slate-900 dark:text-slate-100">{conversion.ruleTitle}</h3>
    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{conversion.ruleDescription}</p>
  </div>

  <!-- Pasos detallados -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
    <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
      <span class="font-bold text-slate-700 dark:text-slate-300">1. Numerador:</span>
      <p class="text-[11px] text-slate-600 dark:text-slate-400">{conversion.numeratorCalculation}</p>
    </div>
    <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
      <span class="font-bold text-slate-700 dark:text-slate-300">2. Denominador:</span>
      <p class="text-[11px] text-slate-600 dark:text-slate-400">{conversion.denominatorCalculation}</p>
    </div>
  </div>

  <!-- Fracción armada y Simplificación -->
  <div class="p-4 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900/60 flex flex-col items-center justify-center space-y-2 text-center">
    <span class="text-[11px] font-extrabold text-blue-800 dark:text-blue-300 uppercase tracking-wide">
      Fracción Obtenida:
    </span>
    <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
      <Katex formula={conversion.rawLatex} displayMode={true} />
    </div>

    {#if conversion.simplified.gcd > 1}
      <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">
        Simplificamos dividiendo por <span class="font-bold text-blue-600 dark:text-blue-400">{conversion.simplified.gcd}</span> (MCD):
      </div>
      <div class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 pt-1">
        <Katex formula={conversion.simplifiedLatex} displayMode={true} />
      </div>
    {:else}
      <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
        ✓ Ya es una fracción irreducible.
      </span>
    {/if}
  </div>
</div>
