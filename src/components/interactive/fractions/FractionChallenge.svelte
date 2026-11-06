<script lang="ts">
  import type { DecimalChallenge } from '../../../lib/pedagogical/fractions/decimalChallenges';
  import Katex from '../../common/Math.svelte';

  interface Props {
    challenge: DecimalChallenge;
    currentIndex: number;
    total: number;
    oncomplete: (isCorrect: boolean) => void;
    onnext: () => void;
    isNewStar: boolean;
  }

  let { challenge, currentIndex, total, oncomplete, onnext, isNewStar }: Props = $props();

  let inputNum = $state<string>('');
  let inputDen = $state<string>('');
  let hasSubmitted = $state<boolean>(false);
  let isCorrect = $state<boolean>(false);

  $effect(() => {
    // Al cambiar de desafío se reinicia el estado local
    if (challenge.id) {
      inputNum = '';
      inputDen = '';
      hasSubmitted = false;
      isCorrect = false;
    }
  });

  function handleConfirm() {
    const num = parseInt(inputNum.trim(), 10);
    const den = parseInt(inputDen.trim(), 10);
    if (isNaN(num) || isNaN(den) || den === 0) return;

    hasSubmitted = true;
    isCorrect = num === challenge.targetNum && den === challenge.targetDen;
    oncomplete(isCorrect);
  }
</script>

<div class="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-3.5 select-none transition-colors">
  <!-- Cabecera -->
  <div class="flex items-center justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-800">
    <span class="font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400">
      🎯 Desafío {currentIndex + 1} de {total}
    </span>
    <span class="px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px]">
      {challenge.title}
    </span>
  </div>

  <!-- Consigna -->
  <div class="text-center space-y-1">
    <p class="text-xs text-slate-600 dark:text-slate-400">Expresá en fracción irreducible:</p>
    <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
      <Katex formula={challenge.displayLatex} displayMode={true} />
    </div>
  </div>

  <!-- Inputs de Fracción -->
  <div class="flex items-center justify-center gap-2 py-1">
    <div class="flex flex-col items-center gap-1">
      <input
        type="number"
        inputmode="numeric"
        placeholder="Num"
        bind:value={inputNum}
        disabled={hasSubmitted && isCorrect}
        class="w-20 p-2 text-center text-sm font-black bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
      />
      <div class="w-20 h-0.5 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
      <input
        type="number"
        inputmode="numeric"
        placeholder="Den"
        bind:value={inputDen}
        disabled={hasSubmitted && isCorrect}
        class="w-20 p-2 text-center text-sm font-black bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
      />
    </div>
  </div>

  <!-- Feedback formativo -->
  {#if hasSubmitted}
    {#if isCorrect}
      <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-1">
        <p class="text-xs font-black text-emerald-800 dark:text-emerald-200">
          {isNewStar ? '⭐ ¡Excelente! +1 Estrella conseguida' : '✔️ ¡Muy bien! Desafío ya completado'}
        </p>
        <p class="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
          {challenge.displayLatex} = {challenge.targetNum}/{challenge.targetDen}
        </p>
      </div>
    {:else}
      <div class="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 rounded-2xl text-xs space-y-1">
        <p class="font-bold text-rose-800 dark:text-rose-200">Aún no es la respuesta correcta:</p>
        <p class="text-[11px] text-rose-700 dark:text-rose-300 font-medium">💡 Pista: {challenge.hint}</p>
      </div>
    {/if}
  {/if}

  <!-- Botón de Acción -->
  <div class="flex justify-end pt-1">
    {#if !hasSubmitted || !isCorrect}
      <button
        onclick={handleConfirm}
        disabled={!inputNum || !inputDen}
        class="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Confirmar respuesta
      </button>
    {:else}
      <button
        onclick={onnext}
        class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Siguiente Desafío ➔
      </button>
    {/if}
  </div>
</div>
