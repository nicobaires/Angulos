<script lang="ts">
  import type { TransversalRelation } from '../../lib/math/transversal';
  import { TRANSVERSAL_CHALLENGES } from '../../lib/pedagogical/transversalChallenges';
  import ModuleSplit from '../common/ModuleSplit.svelte';
  import RelationshipFilter from './transversal/RelationshipFilter.svelte';
  import TransversalCanvas from './transversal/TransversalCanvas.svelte';
  import TransversalControls from './transversal/TransversalControls.svelte';
  import TransversalCard from './transversal/TransversalCard.svelte';
  import TransversalChallenge from './transversal/TransversalChallenge.svelte';

  let theta = $state<number>(55);
  // Ningún botón marcado por defecto según spec 05
  let relation = $state<TransversalRelation | null>(null);
  let challengeIndex = $state<number | null>(null);
  let challengeFeedback = $state<string>('');
  let challengeSuccess = $state<boolean>(false);
  let hasSubmitted = $state<boolean>(false);

  function handleRelationSelect(newRel: TransversalRelation) {
    relation = newRel;
    if (hasSubmitted && !challengeSuccess) {
      hasSubmitted = false;
      challengeFeedback = '';
    }
  }

  function handleThetaChange(newTheta: number) {
    theta = newTheta;
  }

  function startChallenge() {
    challengeIndex = challengeIndex === null ? 0 : (challengeIndex + 1) % TRANSVERSAL_CHALLENGES.length;
    relation = null; // Ningún botón seleccionado al iniciar desafío
    challengeSuccess = false;
    challengeFeedback = '';
    hasSubmitted = false;
  }

  function confirmAnswer() {
    if (challengeIndex === null) return;
    if (!relation) {
      hasSubmitted = true;
      challengeSuccess = false;
      challengeFeedback = 'Tocá una de las opciones de arriba para indicar qué relación tienen los ángulos.';
      return;
    }
    hasSubmitted = true;
    const cur = TRANSVERSAL_CHALLENGES[challengeIndex];
    if (relation === cur.relation) {
      challengeSuccess = true;
      challengeFeedback = cur.explanation;
    } else {
      challengeSuccess = false;
      challengeFeedback = cur.hint;
    }
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
      <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Módulo 3</span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">Paralelas y Secante</h2>
    </div>
    <button
      onclick={challengeIndex === null ? startChallenge : exitChallenge}
      class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-500 {challengeIndex === null ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 font-semibold'}"
    >
      {challengeIndex === null ? '🎯 ¡Modo Desafío!' : 'Salir del modo'}
    </button>
  </div>

  <div class="w-full lg:max-w-2xl lg:mx-auto">
    <!-- Selector de Relaciones -->
    <RelationshipFilter selected={relation} onselect={handleRelationSelect} />
  </div>

  <ModuleSplit>
    {#snippet visual()}
      <!-- Canvas SVG de las 2 paralelas y secante con 8 sectores -->
      <TransversalCanvas {theta} {relation} onchange={handleThetaChange} />
    {/snippet}
    {#snippet panel()}
      {#if challengeIndex !== null}
        <TransversalChallenge
          challenge={TRANSVERSAL_CHALLENGES[challengeIndex]}
          {challengeIndex}
          totalChallenges={TRANSVERSAL_CHALLENGES.length}
          {hasSubmitted}
          {challengeSuccess}
          {challengeFeedback}
          onconfirm={confirmAnswer}
          onskip={startChallenge}
          onnext={startChallenge}
        />
      {/if}
      <!-- Controles de inclinación -->
      <TransversalControls {theta} onchange={handleThetaChange} />
      <!-- Ficha pedagógica -->
      <TransversalCard {relation} {theta} />
    {/snippet}
  </ModuleSplit>
</div>
