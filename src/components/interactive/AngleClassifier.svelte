<script lang="ts">
  import { getAngleClassification } from '../../lib/math/angles';
  import { CLASSIFIER_CHALLENGES } from '../../lib/pedagogical/classifierChallenges';
  import Protractor from './classifier/Protractor.svelte';
  import AngleControls from './classifier/AngleControls.svelte';
  import AngleCard from './classifier/AngleCard.svelte';

  // Estado del ángulo
  let angle = $state<number>(55);

  // Estado del modo desafío
  let challengeIndex = $state<number | null>(null);
  let challengeFeedback = $state<string>('');
  let challengeSuccess = $state<boolean>(false);

  // Derivados
  const info = $derived(getAngleClassification(angle));

  function handleAngleChange(newAngle: number) {
    angle = newAngle;
    checkChallengeProgress();
  }

  function startChallenge() {
    if (challengeIndex === null) {
      challengeIndex = 0;
    } else {
      challengeIndex = (challengeIndex + 1) % CLASSIFIER_CHALLENGES.length;
    }
    challengeFeedback = '';
    challengeSuccess = false;
  }

  function checkChallengeProgress() {
    if (challengeIndex === null) return;
    const currentChallenge = CLASSIFIER_CHALLENGES[challengeIndex];
    if (info.type === currentChallenge.target) {
      challengeSuccess = true;
      challengeFeedback = `¡Genial! 🎉 ${info.name}: lograste la apertura correcta.`;
    } else {
      challengeSuccess = false;
      challengeFeedback = currentChallenge.hint;
    }
  }

  function exitChallenge() {
    challengeIndex = null;
    challengeFeedback = '';
    challengeSuccess = false;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera de la sección -->
  <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
    <div>
      <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Módulo 1</span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">Clasificación según Medida</h2>
    </div>

    {#if challengeIndex === null}
      <button
        onclick={startChallenge}
        class="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px]"
      >
        <span>🎯</span>
        <span>¡Modo Desafío!</span>
      </button>
    {:else}
      <button
        onclick={exitChallenge}
        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Salir del modo
      </button>
    {/if}
  </div>

  <!-- Banner de Desafío activo -->
  {#if challengeIndex !== null}
    <div class="mx-4 mt-3 p-3 rounded-2xl border transition-all {challengeSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-200' : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200'}">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-bold uppercase tracking-wider">
          Desafío #{challengeIndex + 1} de {CLASSIFIER_CHALLENGES.length}
        </span>
        <button onclick={startChallenge} class="text-xs underline font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Siguiente ➔
        </button>
      </div>
      <p class="text-sm font-bold">{CLASSIFIER_CHALLENGES[challengeIndex].title}</p>
      <p class="text-xs mt-0.5 opacity-90">{challengeFeedback || CLASSIFIER_CHALLENGES[challengeIndex].hint}</p>
    </div>
  {/if}

  <!-- 1. Transportador Interactivo SVG -->
  <Protractor
    {angle}
    colorHex={info.colorHex}
    onchange={handleAngleChange}
  />

  <!-- 2. Controles de Entrada (Slider y Presets) -->
  <AngleControls
    {angle}
    onchange={handleAngleChange}
  />

  <!-- 3. Tarjeta Didáctica Explicativa con KaTeX -->
  <AngleCard {info} />
</div>
