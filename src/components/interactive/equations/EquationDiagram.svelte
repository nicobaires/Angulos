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
</script>

<div class="relative w-full aspect-[4/3] max-w-[320px] mx-auto p-1 select-none">
  <svg viewBox="0 0 320 270" class="w-full h-full drop-shadow-xs" role="region" aria-label="Diagrama del problema con ecuaciones">
    <!-- Círculo base tenue -->
    <circle cx={cx} cy={cy} r={radius} fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="3 3" />

    <!-- Sectores sombreados -->
    {#if sectorAlpha}<path d={sectorAlpha} fill="#3b82f6" fill-opacity="0.32" />{/if}
    {#if sectorBeta}<path d={sectorBeta} fill={problem.type === 'opuestos' ? '#3b82f6' : '#f59e0b'} fill-opacity="0.32" />{/if}

    <!-- Líneas geométricas -->
    <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#334155" stroke-width="3" stroke-linecap="round" />

    {#if problem.type === 'opuestos'}
      <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {:else}
      <line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {/if}

    <circle cx={cx} cy={cy} r="5" fill="#0f172a" stroke="#ffffff" stroke-width="2" />
  </svg>

  <!-- Insignias flotantes con las fórmulas algebraicas -->
  <div class="absolute inset-x-2 bottom-1 flex justify-between gap-1.5 text-xs">
    <div class="bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1">
      <span class="font-extrabold text-blue-700">α =</span>
      <Katex formula={problem.exprAlpha} />
    </div>
    <div class="bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1">
      <span class="font-extrabold text-amber-700">β =</span>
      <Katex formula={problem.exprBeta} />
    </div>
  </div>
</div>
