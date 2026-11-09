<script lang="ts">
  import type { DecimalChallenge } from '../../../lib/pedagogical/fractions/decimalChallenges';
  import { evaluateChallengeAttempt } from '../../../lib/pedagogical/fractions/challengeSession';
  import type { FractionStep } from '../../../lib/math/fractions';
  import Katex from '../../common/Math.svelte';
  import FractionChain from './FractionChain.svelte';
  import FractionInput from './FractionInput.svelte';
  import FractionFeedback from './FractionFeedback.svelte';

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
  let history = $state<FractionStep[]>([]);
  let isComplete = $state<boolean>(false);
  let feedbackMessage = $state<string>('');
  let feedbackType = $state<'success' | 'warning' | 'error' | null>(null);

  $effect(() => {
    if (challenge.id) {
      inputNum = ''; inputDen = ''; history = [];
      isComplete = false; feedbackMessage = ''; feedbackType = null;
    }
  });

  function handleConfirm() {
    const outcome = evaluateChallengeAttempt({
      rawNum: inputNum, rawDen: inputDen,
      challenge, history, isNewStar
    });
    if (!outcome.valid) return;
    history = outcome.nextHistory;
    isComplete = outcome.isComplete;
    feedbackType = outcome.feedbackType;
    feedbackMessage = outcome.feedbackMessage;
    if (outcome.clearsInput) { inputNum = ''; inputDen = ''; }
    if (outcome.notify !== undefined) oncomplete(outcome.notify);
  }
</script>

<div class="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-3.5 select-none transition-colors">
  <div class="flex items-center justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-800">
    <span class="font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400">
      🎯 Desafío {currentIndex + 1} de {total}
    </span>
    <span class="px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px]">
      {challenge.title}
    </span>
  </div>

  <div class="text-center space-y-1">
    <p class="text-xs text-slate-600 dark:text-slate-400">Expresá en fracción irreducible:</p>
    <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
      <Katex formula={challenge.displayLatex} displayMode={true} />
    </div>
  </div>

  <div class="flex items-center justify-center gap-2 py-1 flex-wrap">
    <FractionChain {history} {isComplete} />
    {#if !isComplete}
      <FractionInput bind:num={inputNum} bind:den={inputDen} />
    {/if}
  </div>

  <FractionFeedback
    type={feedbackType} message={feedbackMessage} displayLatex={challenge.displayLatex}
    targetNum={challenge.targetNum} targetDen={challenge.targetDen}
  />

  <div class="flex justify-end pt-1">
    {#if !isComplete}
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
