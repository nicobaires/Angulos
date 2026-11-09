<script lang="ts">
  import { DECIMAL_CHALLENGES, getShuffledChallengeIndices } from '../../lib/pedagogical/fractions/decimalChallenges';
  import { progressStore } from '../../lib/pedagogical/progressStore';
  import FractionExplorer from './fractions/FractionExplorer.svelte';
  import ConversionSteps from './fractions/ConversionSteps.svelte';
  import FractionChallenge from './fractions/FractionChallenge.svelte';

  // Modo Desafío: pantalla enfocada (solo el desafío; los pasos se muestran al acertar)
  let playlist = $state<number[]>([]);
  let currentStep = $state<number | null>(null);
  let isNewStar = $state<boolean>(false);
  let solved = $state<boolean>(false);

  const activeChallenge = $derived(
    currentStep !== null && playlist[currentStep] !== undefined
      ? DECIMAL_CHALLENGES[playlist[currentStep]]
      : null
  );

  function startOrNextChallenge() {
    solved = false;
    if (currentStep === null || currentStep + 1 >= playlist.length) {
      playlist = getShuffledChallengeIndices();
      currentStep = 0;
    } else {
      currentStep++;
    }
  }

  function exitChallengeMode() {
    currentStep = null;
    solved = false;
  }

  function handleChallengeComplete(isCorrect: boolean) {
    if (!activeChallenge || currentStep === null) return;
    if (isCorrect) {
      // El store deduplica por índice numérico del banco (no por id de texto)
      const res = progressStore.recordSuccess('fracciones', playlist[currentStep]);
      isNewStar = res.newStar;
      solved = true;
    } else {
      progressStore.recordFailure();
    }
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera -->
  <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
    <div>
      <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
        Fracciones • Módulo 1
      </span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
        Pasaje de Decimal a Fracción
      </h2>
    </div>
    {#if currentStep === null}
      <button
        onclick={startOrNextChallenge}
        class="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px]"
      >
        <span>🎯</span><span>¡Modo Desafío!</span>
      </button>
    {:else}
      <button
        onclick={exitChallengeMode}
        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl text-xs font-semibold transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Salir del modo
      </button>
    {/if}
  </div>

  {#if activeChallenge && currentStep !== null}
    <div class="w-full max-w-xl mx-auto p-4 space-y-4">
      <FractionChallenge
        challenge={activeChallenge}
        currentIndex={currentStep}
        total={playlist.length}
        {isNewStar}
        oncomplete={handleChallengeComplete}
        onnext={startOrNextChallenge}
      />
      {#if solved}
        <div class="space-y-2">
          <h3 class="text-xs font-extrabold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            📖 Así se resuelve
          </h3>
          <ConversionSteps conversion={activeChallenge.conversion} />
        </div>
      {/if}
    </div>
  {:else}
    <FractionExplorer />
  {/if}
</div>
