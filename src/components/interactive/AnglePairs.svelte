<script lang="ts">
  import type { PairType } from '../../lib/math/pairs';
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

  const presets = $derived(
    activeMode === 'complementarios'
      ? [15, 30, 45, 60, 75]
      : activeMode === 'suplementarios'
        ? [30, 60, 90, 120, 150]
        : [30, 45, 60, 90, 120, 135]
  );

  const maxAlpha = $derived(
    activeMode === 'complementarios' ? 85 : activeMode === 'suplementarios' ? 175 : 165
  );
  const minAlpha = $derived(activeMode === 'opuestos' ? 15 : 5);

  function handleModeSelect(mode: PairType) {
    activeMode = mode;
    if (mode === 'complementarios' && alpha > 85) alpha = 35;
    if (mode === 'opuestos' && (alpha < 15 || alpha > 165)) alpha = 60;
    checkChallenge();
  }

  function handleAlphaChange(newAlpha: number) {
    alpha = newAlpha;
    checkChallenge();
  }

  function startChallenge() {
    challengeIndex = challengeIndex === null ? 0 : (challengeIndex + 1) % PAIRS_CHALLENGES.length;
    const current = PAIRS_CHALLENGES[challengeIndex];
    activeMode = current.type;
    challengeSuccess = false;
    challengeFeedback = '';
    checkChallenge();
  }

  function checkChallenge() {
    if (challengeIndex === null) return;
    const current = PAIRS_CHALLENGES[challengeIndex];
    const isCorrect = activeMode === current.type && Math.abs(alpha - current.targetAlpha) <= current.tolerance;
    challengeSuccess = isCorrect;
    challengeFeedback = isCorrect ? current.successMessage : current.hint;
  }

  function exitChallenge() {
    challengeIndex = null;
    challengeFeedback = '';
    challengeSuccess = false;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera -->
  <div class="p-4 border-b border-slate-100 flex items-center justify-between">
    <div>
      <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">Módulo 2</span>
      <h2 class="text-lg font-bold text-slate-900">Pares de Ángulos</h2>
    </div>
    <button
      onclick={challengeIndex === null ? startChallenge : exitChallenge}
      class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px] {challengeIndex === null ? 'bg-amber-100 hover:bg-amber-200 text-amber-900' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold'}"
    >
      {challengeIndex === null ? '🎯 ¡Modo Desafío!' : 'Salir del modo'}
    </button>
  </div>

  <!-- Banner de Desafío -->
  {#if challengeIndex !== null}
    {@const cur = PAIRS_CHALLENGES[challengeIndex]}
    <div class="mx-4 mt-3 p-3 rounded-2xl border transition-all {challengeSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'}">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-bold uppercase tracking-wider">Desafío #{challengeIndex + 1} de {PAIRS_CHALLENGES.length}</span>
        <button onclick={startChallenge} class="text-xs underline font-semibold text-blue-600 hover:text-blue-800">
          Siguiente ➔
        </button>
      </div>
      <p class="text-sm font-bold">{cur.title}</p>
      <p class="text-xs mt-0.5 opacity-90">{challengeFeedback || cur.prompt}</p>
    </div>
  {/if}

  <!-- Pestañas de Modos -->
  <PairsModeTabs {activeMode} onselect={handleModeSelect} />

  <!-- Canvas SVG según el Modo -->
  {#if activeMode === 'opuestos'}
    <OppositeCanvas {alpha} onchange={handleAlphaChange} />
  {:else}
    <AdjacentCanvas
      {alpha}
      totalAngle={activeMode === 'complementarios' ? 90 : 180}
      onchange={handleAlphaChange}
    />
  {/if}

  <!-- Controles y Ficha Didáctica -->
  <PairsControls {alpha} {minAlpha} {maxAlpha} {presets} onchange={handleAlphaChange} />
  <PairsCard mode={activeMode} {alpha} />
</div>
