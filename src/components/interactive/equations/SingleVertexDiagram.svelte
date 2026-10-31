<script lang="ts">
  import type { EquationProblem } from '../../../lib/math/equations';
  import { polarToCartesian, describeSector } from '../../../lib/math/angles';

  interface Props {
    problem: EquationProblem;
  }

  let { problem }: Props = $props();

  const isComp = $derived(problem.type === 'complementarios');
  const cx = $derived(isComp ? 115 : 160);
  const cy = $derived(isComp ? 185 : 135);
  const radius = $derived(isComp ? 105 : 100);

  const angle = $derived(
    isComp
      ? Math.min(68, Math.max(22, problem.diagramAngle))
      : Math.min(145, Math.max(35, problem.diagramAngle))
  );

  const p1 = $derived(polarToCartesian(cx, cy, radius + 15, angle));
  const p3 = $derived(polarToCartesian(cx, cy, radius + 15, angle + 180));

  const sectorAlpha = $derived(describeSector(cx, cy, 52, 0, angle));
  const sectorBeta = $derived(
    isComp
      ? describeSector(cx, cy, 52, angle, 90)
      : problem.type === 'opuestos'
        ? describeSector(cx, cy, 52, 180, 180 + angle)
        : describeSector(cx, cy, 52, angle, 180)
  );

  const labelAlphaPos = $derived(polarToCartesian(cx, cy, 30, angle / 2));
  const labelBetaPos = $derived(
    isComp
      ? polarToCartesian(cx, cy, 30, angle + (90 - angle) / 2)
      : problem.type === 'opuestos'
        ? polarToCartesian(cx, cy, 30, 180 + angle / 2)
        : polarToCartesian(cx, cy, 30, angle + (180 - angle) / 2)
  );
</script>

<svg viewBox="0 0 320 270" class="w-full h-full drop-shadow-xs" role="region" aria-label="Diagrama de ángulos de vértice único">
  {#if !isComp}
    <circle cx={cx} cy={cy} r={radius} class="fill-slate-50 stroke-slate-200 dark:fill-slate-900/90 dark:stroke-slate-800 transition-colors" stroke-width="1.5" stroke-dasharray="3 3" />
  {/if}

  {#if sectorAlpha}<path d={sectorAlpha} fill="#3b82f6" fill-opacity="0.32" />{/if}
  {#if sectorBeta}<path d={sectorBeta} fill={problem.type === 'opuestos' ? '#3b82f6' : '#f59e0b'} fill-opacity="0.32" />{/if}

  {#if isComp}
    <!-- Rectángulo de 90° en el vértice -->
    <path d="M {cx} {cy - 16} L {cx + 16} {cy - 16} L {cx + 16} {cy}" fill="none" class="stroke-slate-400 dark:stroke-slate-500" stroke-width="2" />
    <circle cx={cx + 8} cy={cy - 8} r="1.5" class="fill-slate-500 dark:fill-slate-400" />
    <!-- Rayo Horizontal (0°) y Rayo Vertical (90°) -->
    <line x1={cx} y1={cy} x2={cx + radius + 20} y2={cy} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="3" stroke-linecap="round" />
    <line x1={cx} y1={cy} x2={cx} y2={cy - radius - 20} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="3" stroke-linecap="round" />
    <!-- Semirrecta divisoria -->
    <line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
  {:else}
    <!-- Recta horizontal base -->
    <line x1={cx - radius - 15} y1={cy} x2={cx + radius + 15} y2={cy} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="3" stroke-linecap="round" />
    {#if problem.type === 'opuestos'}
      <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {:else}
      <line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    {/if}
  {/if}

  <text x={labelAlphaPos.x} y={labelAlphaPos.y + 4} font-size="12" font-weight="900" class="fill-blue-700 dark:fill-blue-400 select-none" text-anchor="middle">α</text>
  <text x={labelBetaPos.x} y={labelBetaPos.y + 4} font-size="12" font-weight="900" class="{problem.type === 'opuestos' ? 'fill-blue-700 dark:fill-blue-400' : 'fill-amber-700 dark:fill-amber-400'} select-none" text-anchor="middle">β</text>

  <circle cx={cx} cy={cy} r="5" class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="2" />
</svg>
