<script lang="ts">
  import type { ExamQuestion } from '../../../lib/pedagogical/examGenerator';
  import Katex from '../../common/Math.svelte';

  interface Props {
    deck: ExamQuestion[];
    oncomplete: (score: number) => void;
  }

  let { deck, oncomplete }: Props = $props();

  let currentIndex = $state<number>(0);
  let selectedId = $state<string | null>(null);
  let isAnswered = $state<boolean>(false);
  let correctCount = $state<number>(0);

  const currentQ = $derived(deck[currentIndex]);

  function handleSelect(id: string) {
    if (isAnswered) return;
    selectedId = id;
  }

  function handleConfirm() {
    if (!selectedId || isAnswered) return;
    isAnswered = true;
    const opt = currentQ.options.find((o) => o.id === selectedId);
    if (opt?.isCorrect) correctCount += 1;
  }

  function handleNext() {
    if (currentIndex + 1 < deck.length) {
      currentIndex += 1;
      selectedId = null;
      isAnswered = false;
    } else {
      const finalScore = Math.round((correctCount / deck.length) * 10);
      oncomplete(finalScore);
    }
  }
</script>

<div class="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-xl mx-auto select-none transition-colors">
  <!-- Encabezado de Pregunta -->
  <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
    <span class="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
      Pregunta {currentIndex + 1} de {deck.length}
    </span>
    <span class="px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
      Módulo {currentQ.moduleNum}: {currentQ.moduleName}
    </span>
  </div>

  <!-- Consigna -->
  <div class="space-y-1.5">
    <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{currentQ.prompt}</h3>
    {#if currentQ.formula}
      <div class="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-sm font-semibold">
        <Katex formula={currentQ.formula} />
      </div>
    {/if}
  </div>

  <!-- Opciones de Respuesta -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {#each currentQ.options as opt}
      {@const isSelected = selectedId === opt.id}
      {@const showSuccess = isAnswered && opt.isCorrect}
      {@const showError = isAnswered && isSelected && !opt.isCorrect}
      <button
        onclick={() => handleSelect(opt.id)}
        disabled={isAnswered}
        class="p-3 rounded-2xl border text-left text-xs sm:text-sm font-bold transition active:scale-[0.98] touch-manipulation min-h-[48px] flex items-center justify-between {showSuccess ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200' : showError ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200' : isSelected ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'}"
      >
        <span>{opt.label}</span>
        {#if showSuccess}<span>✓</span>{:else if showError}<span>✕</span>{/if}
      </button>
    {/each}
  </div>

  <!-- Explicación pedagógica -->
  {#if isAnswered}
    <div class="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl text-xs text-blue-900 dark:text-blue-200">
      <span class="font-bold">Explicación:</span> {currentQ.explanation}
    </div>
  {/if}

  <!-- Botón de Acción -->
  <div class="pt-2 flex justify-end">
    {#if !isAnswered}
      <button
        onclick={handleConfirm}
        disabled={!selectedId}
        class="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Confirmar respuesta
      </button>
    {:else}
      <button
        onclick={handleNext}
        class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        {currentIndex + 1 < deck.length ? 'Siguiente Pregunta ➔' : 'Ver Calificación Final 🎓'}
      </button>
    {/if}
  </div>
</div>

