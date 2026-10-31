<script lang="ts">
  import { getAngleClassification } from '../../lib/math/angles';
  import { CLASSIFIER_CHALLENGES, getShuffledClassifierIndices } from '../../lib/pedagogical/classifierChallenges';
  import ModuleSplit from '../common/ModuleSplit.svelte';
  import Protractor from './classifier/Protractor.svelte';
  import AngleControls from './classifier/AngleControls.svelte';
  import AngleCard from './classifier/AngleCard.svelte';
  import ClassifierChallenge from './classifier/ClassifierChallenge.svelte';

  let angle = $state<number>(0);
  let playlist = $state<number[]>([]);
  let currentStep = $state<number | null>(null);
  let challengeFeedback = $state<string>('');
  let challengeSuccess = $state<boolean>(false);
  let hasSubmitted = $state<boolean>(false);

  const info = $derived(getAngleClassification(angle));
  const activeChallenge = $derived(
    currentStep !== null && playlist[currentStep] !== undefined
      ? CLASSIFIER_CHALLENGES[playlist[currentStep]]
      : null
  );

  function handleAngleChange(newAngle: number) {
    angle = newAngle;
    if (hasSubmitted && !challengeSuccess) {
      hasSubmitted = false;
      challengeFeedback = '';
    }
  }

  function startOrNextChallenge() {
    if (currentStep === null || currentStep + 1 >= playlist.length) {
      playlist = getShuffledClassifierIndices();
      currentStep = 0;
    } else {
      currentStep++;
    }
    angle = 0;
    challengeFeedback = '';
    challengeSuccess = false;
    hasSubmitted = false;
  }

  function confirmAnswer() {
    if (!activeChallenge) return;
    hasSubmitted = true;
    if (info.type === activeChallenge.target) {
      challengeSuccess = true;
      challengeFeedback = `¡Genial! 🎉 ${info.name}: lograste la apertura correcta.`;
    } else {
      challengeSuccess = false;
      challengeFeedback = activeChallenge.hint;
    }
  }

  function exitChallenge() {
    currentStep = null;
    challengeFeedback = '';
    challengeSuccess = false;
    hasSubmitted = false;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera -->
  <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
    <div>
      <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Módulo 1</span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">Clasificación según Medida</h2>
    </div>
    {#if currentStep === null}
      <button onclick={startOrNextChallenge} class="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-500">
        <span>🎯</span><span>¡Modo Desafío!</span>
      </button>
    {:else}
      <button onclick={exitChallenge} class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition active:scale-95 touch-manipulation min-h-[44px] focus-visible:ring-2 focus-visible:ring-slate-500">
        Salir del modo
      </button>
    {/if}
  </div>

  <ModuleSplit>
    {#snippet visual()}
      <Protractor {angle} colorHex={info.colorHex} onchange={handleAngleChange} />
    {/snippet}
    {#snippet panel()}
      {#if activeChallenge && currentStep !== null}
        <ClassifierChallenge
          challenge={activeChallenge}
          challengeIndex={currentStep}
          totalChallenges={playlist.length}
          {hasSubmitted}
          {challengeSuccess}
          {challengeFeedback}
          onconfirm={confirmAnswer}
          onskip={startOrNextChallenge}
          onnext={startOrNextChallenge}
        />
      {/if}
      <AngleControls {angle} onchange={handleAngleChange} />
      <AngleCard {info} />
    {/snippet}
  </ModuleSplit>
</div>
