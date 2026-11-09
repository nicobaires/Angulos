<script lang="ts">
  import type { FractionStep } from '../../../lib/math/fractions';

  interface Props {
    history: FractionStep[];
    isComplete: boolean;
  }

  let { history, isComplete }: Props = $props();
</script>

{#if history.length > 0}
  <div class="flex items-center justify-center gap-2 flex-wrap py-1 text-slate-800 dark:text-slate-100 font-bold">
    {#each history as step, i}
      <div class="inline-flex flex-col items-center px-1">
        <span class="text-sm leading-none font-bold {isComplete && i === history.length - 1 ? 'text-emerald-600 dark:text-emerald-400' : ''}">
          {step.num}
        </span>
        <span class="w-full h-0.5 my-0.5 bg-slate-400 dark:bg-slate-600 {isComplete && i === history.length - 1 ? 'bg-emerald-500 dark:bg-emerald-400' : ''}"></span>
        <span class="text-sm leading-none font-bold {isComplete && i === history.length - 1 ? 'text-emerald-600 dark:text-emerald-400' : ''}">
          {step.den}
        </span>
      </div>
      {#if i < history.length - 1 || !isComplete}
        <span class="text-base text-slate-400 font-bold select-none">=</span>
      {/if}
    {/each}
  </div>
{/if}
