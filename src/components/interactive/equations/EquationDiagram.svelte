<script lang="ts">
  import type { EquationProblem } from '../../../lib/math/equations';
  import { polarToCartesian, describeSector } from '../../../lib/math/angles';
  import Katex from '../../common/Math.svelte';

  interface Props {
    problem: EquationProblem;
  }

  let { problem }: Props = $props();

  const cx = 160;
  const cy = 135;
  const radius = 100;
  const angle = $derived(Math.min(145, Math.max(35, problem.diagramAngle)));

  const p1 = $derived(polarToCartesian(cx, cy, radius, angle));
  const p3 = $derived(polarToCartesian(cx, cy, radius, angle + 180));

  const sectorAlpha = $derived(describeSector(cx, cy, 55, 0, angle));
  const sectorBeta = $derived(
    problem.type === 'opuestos'
      ? describeSector(cx, cy, 55, 180, 180 + angle)
      : describeSector(cx, cy, 55, angle, 180)
  );

  const labelAlphaPos = $derived(polarToCartesian(cx, cy, 32, angle / 2));
  const labelBetaPos = $derived(
    polarToCartesian(cx, cy, 32, problem.type === 'opuestos' ? 180 + angle / 2 : angle + (180 - angle) / 2)
  );
</script>

<div class="relative w-full aspect-[4/3] max-w-[320px] lg:max-w-[480px] mx-auto p-1 select-none">
  <svg viewBox="0 0 320 270" class="w-full h-full drop-shadow-xs" role="region" aria-label="Diagrama del problema con ecuaciones">
    <circle cx={cx} cy={cy} r={radius} class="fill-slate-50 stroke-slate-200 dark:fill-slate-900/90 dark:stroke-slate-800 transition-colors" stroke-width="1.5" stroke-dasharray="3 3" />

    {#if sectorAlpha}<path d={sectorAlpha} fill="#3b82f6" fill-opacity="0.32" />{/if}
    {#if sectorBeta}<path d={sectorBeta} fill={problem.type === 'opuestos' ? '#3b82f6' : '#f59e0b'} fill-opacity="0.32" />{/if}

    <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="3" stroke-linecap="round" />

    {#if problem.type === 'opuestos'}
      <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {:else}
      <line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {/if}

    <text x={labelAlphaPos.x} y={labelAlphaPos.y + 4} font-size="12" font-weight="900" class="fill-blue-700 dark:fill-blue-400 select-none" text-anchor="middle">α</text>
    <text x={labelBetaPos.x} y={labelBetaPos.y + 4} font-size="12" font-weight="900" class="{problem.type === 'opuestos' ? 'fill-blue-700 dark:fill-blue-400' : 'fill-amber-700 dark:fill-amber-400'} select-none" text-anchor="middle">β</text>

    <circle cx={cx} cy={cy} r="5" class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="2" />
  </svg>

  <!-- Insignias flotantes alineadas espacialmente con los ángulos del gráfico -->
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
