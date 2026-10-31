<script lang="ts">
  import type { EquationProblem } from '../../../lib/math/equations';
  import Katex from '../../common/Math.svelte';

  interface Props {
    problem: EquationProblem;
    currentStep: 1 | 2 | 3 | 'done';
    onnewproblem: () => void;
  }

  let { problem, currentStep, onnewproblem }: Props = $props();

  let showSteps = $state<boolean>(false);
</script>

<div class="p-4 mx-4 mb-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs select-none space-y-3 transition-colors">
  {#if currentStep === 'done'}
    <div class="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-900 dark:text-emerald-200 text-center space-y-1">
      <div class="text-2xl">🎉</div>
      <h4 class="font-extrabold text-sm">¡Ejercicio Resuelto Correctamente!</h4>
      <p class="text-xs">
        Obtuviste <Katex formula={`x = ${problem.xSolution}`} /> y el ángulo <Katex formula={`\\alpha = ${problem.alphaSolution}^\\circ`} />.
      </p>
    </div>
  {/if}

  <!-- Botones de Acción -->
  <div class="flex gap-2">
    <button
      onclick={() => (showSteps = !showSteps)}
      class="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition active:scale-95 touch-manipulation min-h-[44px]"
    >
      {showSteps ? 'Ocultar Desarrollo' : '📖 Ver Paso a Paso'}
    </button>
    <button
      onclick={onnewproblem}
      class="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 touch-manipulation min-h-[44px]"
    >
      🎲 Nuevo Ejercicio
    </button>
  </div>

  <!-- Desarrollo Paso a Paso con KaTeX -->
  {#if showSteps}
    <div class="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-xs">
      <h5 class="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide text-[10px]">Resolución Algebraica:</h5>
      <ol class="space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300">
        {#each problem.steps as s}
          <li class="py-0.5">
            <Katex formula={s} />
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>
