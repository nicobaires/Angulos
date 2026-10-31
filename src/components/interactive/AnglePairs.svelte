<script lang="ts">
  import { type PairType, getPairsPresets, getPairsRange } from '../../lib/math/pairs';
  import { PAIRS_CHALLENGES } from '../../lib/pedagogical/pairsChallenges';
  import ModuleSplit from '../common/ModuleSplit.svelte';
  import PairsModeTabs from './pairs/PairsModeTabs.svelte';
  import AdjacentCanvas from './pairs/AdjacentCanvas.svelte';
  import OppositeCanvas from './pairs/OppositeCanvas.svelte';
  import PairsControls from './pairs/PairsControls.svelte';
  import PairsCard from './pairs/PairsCard.svelte';
  import PairsChallenge from './pairs/PairsChallenge.svelte';

  let activeMode = $state<PairType>('complementarios');
  let alpha = $state<number>(35);
  let challengeIndex = $state<number | null>(null);
  let challengeFeedback = $state<string>('');
  let challengeSuccess = $state<boolean>(false);
  let hasSubmitted = $state<boolean>(false);

  const presets = $derived(getPairsPresets(activeMode));
  const range = $derived(getPairsRange(activeMode));

  function handleModeSelect(mode: PairType) {
    activeMode = mode;
    if (mode === 'complementarios' && alpha > 85) alpha = 35;
    if (mode === 'opuestos' && (alpha < 15 || alpha > 165)) alpha = 60;
    if (hasSubmitted && !challengeSuccess) {
      hasSubmitted = false;
      challengeFeedback = '';
    }
  }

  function handleAlphaChange(newAlpha: number) {
    alpha = newAlpha;
    if (hasSubmitted && !challengeSuccess) {
      hasSubmitted = false;
      challengeFeedback = '';
    }
  }

  function startChallenge() {
    challengeIndex = challengeIndex === null ? 0 : (challengeIndex + 1) % PAIRS_CHALLENGES.length;
    const current = PAIRS_CHALLENGES[challengeIndex];
    activeMode = current.type;
    alpha = activeMode === 'complementarios' ? 25 : activeMode === 'suplementarios' ? 50 : 45;
    challengeSuccess = false;
    challengeFeedback = '';
    hasSubmitted = false;
  }

  function confirmAnswer() {
    if (challengeIndex === null) return;
    hasSubmitted = true;
    const current = PAIRS_CHALLENGES[challengeIndex];
    const isCorrect = activeMode === current.type && Math.abs(alpha - current.targetAlpha) <= current.tolerance;
    challengeSuccess = isCorrect;
    challengeFeedback = isCorrect ? current.successMessage : current.hint;
  }

  function exitChallenge() {
    challengeIndex = null;
    challengeFeedback = '';
    challengeSuccess = false;
    hasSubmitted = false;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera -->
  <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
    <div>
      <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Módulo 2</span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">Pares de Ángulos</h2>
    </div>
    <button
      onclick={challengeIndex === null ? startChallenge : exitChallenge}
      class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-500 {challengeIndex === null ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 font-semibold'}"
    >
      {challengeIndex === null ? '🎯 ¡Modo Desafío!' : 'Salir del modo'}
    </button>
  </div>

  <div class="w-full lg:max-w-2xl lg:mx-auto">
    <PairsModeTabs {activeMode} onselect={handleModeSelect} />
  </div>

  <ModuleSplit>
    {#snippet visual()}
      {#if activeMode === 'opuestos'}
        <OppositeCanvas {alpha} onchange={handleAlphaChange} />
      {:else}
        <AdjacentCanvas {alpha} totalAngle={activeMode === 'complementarios' ? 90 : 180} onchange={handleAlphaChange} />
      {/if}
    {/snippet}
    {#snippet panel()}
      {#if challengeIndex !== null}
        <PairsChallenge
          challenge={PAIRS_CHALLENGES[challengeIndex]}
          {challengeIndex}
          totalChallenges={PAIRS_CHALLENGES.length}
          {hasSubmitted}
          {challengeSuccess}
          {challengeFeedback}
          onconfirm={confirmAnswer}
          onskip={startChallenge}
          onnext={startChallenge}
        />
      {/if}
      <PairsControls {alpha} minAlpha={range.min} maxAlpha={range.max} {presets} onchange={handleAlphaChange} />
      <PairsCard mode={activeMode} {alpha} />
    {/snippet}
  </ModuleSplit>
</div>
