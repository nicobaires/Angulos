<script lang="ts">
  import { type PairType, getPairsPresets, getPairsRange } from '../../lib/math/pairs';
  import { PAIRS_CHALLENGES } from '../../lib/pedagogical/pairsChallenges';
  import PairsModeTabs from './pairs/PairsModeTabs.svelte';
  import AdjacentCanvas from './pairs/AdjacentCanvas.svelte';
  import OppositeCanvas from './pairs/OppositeCanvas.svelte';
  import PairsControls from './pairs/PairsControls.svelte';
  import PairsCard from './pairs/PairsCard.svelte';

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
      class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px] {challengeIndex === null ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 font-semibold'}"
    >
      {challengeIndex === null ? '🎯 ¡Modo Desafío!' : 'Salir del modo'}
    </button>
  </div>

  <!-- Banner de Desafío -->
  {#if challengeIndex !== null}
    {@const cur = PAIRS_CHALLENGES[challengeIndex]}
    <div class="mx-4 mt-3 p-3 rounded-2xl border transition-all {hasSubmitted ? (challengeSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-200' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-200') : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200'}">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-bold uppercase tracking-wider">Desafío #{challengeIndex + 1} de {PAIRS_CHALLENGES.length}</span>
        <button onclick={startChallenge} class="text-xs underline font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Saltar ➔
        </button>
      </div>
      <p class="text-sm font-bold">{cur.title}</p>
      <p class="text-xs mt-0.5 opacity-90">{cur.prompt}</p>
      {#if hasSubmitted}
        <p class="text-xs mt-1.5 pt-1.5 border-t border-current/20 font-semibold">{challengeFeedback}</p>
      {/if}
      <div class="mt-2.5 flex justify-end">
        {#if !hasSubmitted || !challengeSuccess}
          <button onclick={confirmAnswer} class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 touch-manipulation min-h-[38px]">
            Confirmar respuesta
          </button>
        {:else}
          <button onclick={startChallenge} class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 touch-manipulation min-h-[38px]">
            Siguiente Desafío ➔
          </button>
        {/if}
      </div>
    </div>
  {/if}

  <PairsModeTabs {activeMode} onselect={handleModeSelect} />

  {#if activeMode === 'opuestos'}
    <OppositeCanvas {alpha} onchange={handleAlphaChange} />
  {:else}
    <AdjacentCanvas {alpha} totalAngle={activeMode === 'complementarios' ? 90 : 180} onchange={handleAlphaChange} />
  {/if}

  <PairsControls {alpha} minAlpha={range.min} maxAlpha={range.max} {presets} onchange={handleAlphaChange} />
  <PairsCard mode={activeMode} {alpha} />
</div>
