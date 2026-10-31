<script lang="ts">
  import type { ClassifierChallenge as ChallengeType } from '../../../lib/pedagogical/classifierChallenges';

  interface Props {
    challenge: ChallengeType;
    challengeIndex: number;
    totalChallenges: number;
    hasSubmitted: boolean;
    challengeSuccess: boolean;
    challengeFeedback: string;
    isNewStar?: boolean;
    onconfirm: () => void;
    onskip: () => void;
    onnext: () => void;
  }

  let {
    challenge,
    challengeIndex,
    totalChallenges,
    hasSubmitted,
    challengeSuccess,
    challengeFeedback,
    isNewStar = false,
    onconfirm,
    onskip,
    onnext
  }: Props = $props();
</script>

<div class="mx-4 mt-3 lg:mt-0 p-3 rounded-2xl border transition-all {hasSubmitted ? (challengeSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-200' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-200') : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200'}">
  <div class="flex items-center justify-between mb-1">
    <span class="text-xs font-bold uppercase tracking-wider">Desafío #{challengeIndex + 1} de {totalChallenges}</span>
    <button onclick={onskip} class="text-xs underline font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
      Saltar ➔
    </button>
  </div>
  <p class="text-sm font-bold">{challenge.title}</p>
  {#if hasSubmitted}
    <p class="text-xs mt-0.5 opacity-90">{challengeFeedback}</p>
    {#if challengeSuccess}
      <div class="mt-1 text-[11px] font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
        <span>{isNewStar ? '⭐ +1 Estrella conseguida' : '✔️ Desafío ya completado'}</span>
      </div>
    {/if}
  {:else}
    <p class="text-xs mt-0.5 opacity-80">Ajustá el transportador a la apertura pedida y tocá confirmar.</p>
  {/if}
  <div class="mt-2.5 flex justify-end">
    {#if !hasSubmitted || !challengeSuccess}
      <button onclick={onconfirm} class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 touch-manipulation min-h-[38px] focus-visible:ring-2 focus-visible:ring-blue-500">
        Confirmar respuesta
      </button>
    {:else}
      <button onclick={onnext} class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 touch-manipulation min-h-[38px] focus-visible:ring-2 focus-visible:ring-emerald-500">
        Siguiente Desafío ➔
      </button>
    {/if}
  </div>
</div>
