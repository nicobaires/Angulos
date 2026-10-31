<script lang="ts">
  import type { EquationProblem } from '../../../lib/math/equations';
  import Katex from '../../common/Math.svelte';
  import SingleVertexDiagram from './SingleVertexDiagram.svelte';
  import ParallelDiagram from './ParallelDiagram.svelte';

  interface Props {
    problem: EquationProblem;
  }

  let { problem }: Props = $props();

  const isParallel = $derived(
    problem.type === 'paralelas_alternos' || problem.type === 'paralelas_conjugados'
  );
</script>

<div class="relative w-full aspect-[4/3] max-w-[320px] lg:max-w-[480px] mx-auto p-1 select-none">
  {#if isParallel}
    <ParallelDiagram {problem} />
  {:else}
    <SingleVertexDiagram {problem} />
  {/if}

  <!-- Insignias flotantes con las expresiones algebraicas de cada ángulo -->
  <div class="absolute inset-x-2 bottom-1 flex justify-between gap-1.5 text-xs">
    <div class="bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1">
      <span class="font-extrabold text-amber-700 dark:text-amber-400">β =</span>
      <Katex formula={problem.exprBeta} />
    </div>
    <div class="bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1">
      <span class="font-extrabold text-blue-700 dark:text-blue-400">α =</span>
      <Katex formula={problem.exprAlpha} />
    </div>
  </div>
</div>
