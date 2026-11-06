<script lang="ts">
  import {
    type DecimalParts,
    type DecimalType,
    convertExactToFraction,
    convertPurePeriodicToFraction,
    convertMixedPeriodicToFraction
  } from '../../lib/math/fractions';
  import {
    DECIMAL_CHALLENGES,
    getShuffledChallengeIndices
  } from '../../lib/pedagogical/fractions/decimalChallenges';
  import { progressStore } from '../../lib/pedagogical/progressStore';
  import ModuleSplit from '../common/ModuleSplit.svelte';
  import DecimalVisualizer from './fractions/DecimalVisualizer.svelte';
  import ConversionSteps from './fractions/ConversionSteps.svelte';
  import DecimalControls from './fractions/DecimalControls.svelte';
  import FractionChallenge from './fractions/FractionChallenge.svelte';

  let currentType = $state<DecimalType>('exact');
  let currentParts = $state<DecimalParts>({ whole: 0, nonPeriodic: '75', periodic: '' });

  // Modo Desafío
  let playlist = $state<number[]>([]);
  let currentStep = $state<number | null>(null);
  let isNewStar = $state<boolean>(false);

  const conversion = $derived.by(() => {
    if (currentType === 'exact') {
      return convertExactToFraction(currentParts.whole, currentParts.nonPeriodic || '0');
    }
    if (currentType === 'pure_periodic') {
      return convertPurePeriodicToFraction(currentParts.whole, currentParts.periodic || '3');
    }
    return convertMixedPeriodicToFraction(
      currentParts.whole,
      currentParts.nonPeriodic || '1',
      currentParts.periodic || '6'
    );
  });

  const activeChallenge = $derived(
    currentStep !== null && playlist[currentStep] !== undefined
      ? DECIMAL_CHALLENGES[playlist[currentStep]]
      : null
  );

  function handleTypeChange(newType: DecimalType) {
    currentType = newType;
    if (newType === 'exact') currentParts = { whole: 0, nonPeriodic: '75', periodic: '' };
    else if (newType === 'pure_periodic') currentParts = { whole: 1, nonPeriodic: '', periodic: '6' };
    else currentParts = { whole: 1, nonPeriodic: '2', periodic: '3' };
  }

  function startOrNextChallenge() {
    if (currentStep === null || currentStep + 1 >= playlist.length) {
      playlist = getShuffledChallengeIndices();
      currentStep = 0;
    } else {
      currentStep++;
    }
  }

  function handleChallengeComplete(isCorrect: boolean) {
    if (!activeChallenge) return;
    if (isCorrect) {
      const res = progressStore.recordSuccess('fracciones_decimal', activeChallenge.id);
      isNewStar = res.newStar;
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
        onclick={() => (currentStep = null)}
        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl text-xs font-semibold transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Salir del modo
      </button>
    {/if}
  </div>

  <ModuleSplit>
    {#snippet visual()}
      <div class="space-y-4 p-4">
        <DecimalVisualizer type={currentType} parts={currentParts} latexDisplay={conversion.latexDisplay} />
        <ConversionSteps {conversion} />
      </div>
    {/snippet}

    {#snippet panel()}
      <div class="space-y-4 p-4">
        {#if activeChallenge && currentStep !== null}
          <FractionChallenge
            challenge={activeChallenge}
            currentIndex={currentStep}
            total={playlist.length}
            {isNewStar}
            oncomplete={handleChallengeComplete}
            onnext={startOrNextChallenge}
          />
        {/if}
        <DecimalControls
          type={currentType}
          parts={currentParts}
          ontypechange={handleTypeChange}
          onpartschange={(newParts) => (currentParts = newParts)}
        />
      </div>
    {/snippet}
  </ModuleSplit>
</div>
