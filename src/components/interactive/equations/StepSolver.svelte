<script lang="ts">
  import type { EquationProblem, EquationRelationType } from '../../../lib/math/equations';
  import { STEP_GUIDES } from '../../../lib/pedagogical/equationsBank';
  import Katex from '../../common/Math.svelte';

  interface Props {
    problem: EquationProblem;
    currentStep: 1 | 2 | 3 | 'done';
    onadvance: (nextStep: 1 | 2 | 3 | 'done') => void;
  }

  let { problem, currentStep, onadvance }: Props = $props();

  let userRelation = $state<EquationRelationType | null>(null);
  let userX = $state<string>('');
  let userAlpha = $state<string>('');
  let errorMessage = $state<string>('');

  $effect(() => {
    if (problem.id) {
      userRelation = null;
      userX = '';
      userAlpha = '';
      errorMessage = '';
    }
  });

  function checkStep1() {
    if (userRelation === problem.relationType) {
      errorMessage = '';
      onadvance(2);
    } else if (problem.relationType === 'suma90') {
      errorMessage = 'Observá el ángulo recto: forman 90°, por lo tanto son complementarios (suman 90°).';
    } else if (problem.relationType === 'suma180') {
      errorMessage = 'Observá la recta o posición interna: son suplementarios (suman 180°).';
    } else {
      errorMessage = 'Observá su posición: son congruentes (opuestos por el vértice o alternos internos, son iguales).';
    }
  }

  function checkStep2() {
    if (Number(userX) === problem.xSolution) {
      errorMessage = '';
      onadvance(3);
    } else {
      errorMessage = 'Valor de x incorrecto. Revisá el despeje pasando términos con signo opuesto.';
    }
  }

  function checkStep3() {
    if (Number(userAlpha) === problem.alphaSolution) {
      errorMessage = '';
      onadvance('done');
    } else {
      errorMessage = `Reemplazá x = ${problem.xSolution} en la fórmula de alfa: ${problem.exprAlpha}.`;
    }
  }
</script>

<div class="px-4 py-2 space-y-3 select-none">
  {#if currentStep === 1}
    <div class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
      <p class="text-xs font-bold text-slate-800 dark:text-slate-100">{STEP_GUIDES[1].instruction}</p>
      <div class="grid grid-cols-3 gap-1.5">
        <button
          onclick={() => { userRelation = 'igualdad'; checkStep1(); }}
          class="p-2 rounded-xl border text-center transition active:scale-95 touch-manipulation min-h-[44px] {userRelation === 'igualdad' ? 'bg-blue-50 border-blue-400 dark:bg-blue-950/60 dark:border-blue-500' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}"
        >
          <Katex formula="\alpha = \beta" />
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Iguales</p>
        </button>
        <button
          onclick={() => { userRelation = 'suma180'; checkStep1(); }}
          class="p-2 rounded-xl border text-center transition active:scale-95 touch-manipulation min-h-[44px] {userRelation === 'suma180' ? 'bg-blue-50 border-blue-400 dark:bg-blue-950/60 dark:border-blue-500' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}"
        >
          <Katex formula="\alpha + \beta = 180^\circ" />
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Suman 180°</p>
        </button>
        <button
          onclick={() => { userRelation = 'suma90'; checkStep1(); }}
          class="p-2 rounded-xl border text-center transition active:scale-95 touch-manipulation min-h-[44px] {userRelation === 'suma90' ? 'bg-blue-50 border-blue-400 dark:bg-blue-950/60 dark:border-blue-500' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}"
        >
          <Katex formula="\alpha + \beta = 90^\circ" />
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Suman 90°</p>
        </button>
      </div>
    </div>
  {/if}

  {#if currentStep === 2}
    <div class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
      <p class="text-xs font-bold text-slate-800 dark:text-slate-100">{STEP_GUIDES[2].instruction}</p>
      <div class="flex gap-2 items-center">
        <span class="text-xs font-bold text-slate-600 dark:text-slate-400">x =</span>
        <input type="number" bind:value={userX} placeholder="Ingresá x" class="flex-1 p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-center text-sm font-bold touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onclick={checkStep2} class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 touch-manipulation min-h-[44px]">Confirmar</button>
      </div>
    </div>
  {/if}

  {#if currentStep === 3}
    <div class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
      <p class="text-xs font-bold text-slate-800 dark:text-slate-100">{STEP_GUIDES[3].instruction}</p>
      <div class="flex gap-2 items-center">
        <span class="text-xs font-bold text-slate-600 dark:text-slate-400">α =</span>
        <input type="number" bind:value={userAlpha} placeholder="Ángulo en °" class="flex-1 p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-center text-sm font-bold touch-manipulation focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        <button onclick={checkStep3} class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 touch-manipulation min-h-[44px]">Comprobar</button>
      </div>
    </div>
  {/if}

  {#if errorMessage}
    <div class="p-2.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-xl text-xs flex items-center gap-2">
      <span>⚠️</span>
      <p class="flex-1 leading-snug">{errorMessage}</p>
    </div>
  {/if}
</div>
