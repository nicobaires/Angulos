<script lang="ts">
  import type { EquationProblem } from '../../../lib/math/equations';
  import { polarToCartesian, describeSector, describeArcLine } from '../../../lib/math/angles';

  interface Props {
    problem: EquationProblem;
  }

  let { problem }: Props = $props();

  const cx = 160;
  const y1 = 80;
  const y2 = 180;
  const radius = 34;

  const isAlternos = $derived(problem.type === 'paralelas_alternos');
  const theta = $derived(Math.max(45, Math.min(68, problem.diagramAngle % 90 || 55)));

  const rad = $derived((theta * Math.PI) / 180);
  const tanTheta = $derived(Math.tan(rad));
  const x1 = $derived(cx + (130 - y1) / tanTheta);
  const x2 = $derived(cx - (y2 - 130) / tanTheta);

  const secTop = $derived({ x: x1 + 35 * Math.cos(rad), y: y1 - 35 * Math.sin(rad) });
  const secBottom = $derived({ x: x2 - 35 * Math.cos(rad), y: y2 + 35 * Math.sin(rad) });

  // Alternos: 3 (abajo izq) y 5 (arriba der). Conjugados: 4 (abajo der) y 5 (arriba der).
  const alphaAngles = $derived(isAlternos ? { start: 180, end: 180 + theta } : { start: 180 + theta, end: 360 });
  const betaAngles = $derived({ start: 0, end: theta });

  const sectorAlpha = $derived(describeSector(x1, y1, radius, alphaAngles.start, alphaAngles.end));
  const arcAlpha = $derived(describeArcLine(x1, y1, radius, alphaAngles.start, alphaAngles.end));
  const labelAlpha = $derived(
    isAlternos
      ? polarToCartesian(x1, y1, 20, 180 + theta / 2)
      : polarToCartesian(x1, y1, 20, 180 + (theta + 180) / 2)
  );

  const sectorBeta = $derived(describeSector(x2, y2, radius, betaAngles.start, betaAngles.end));
  const arcBeta = $derived(describeArcLine(x2, y2, radius, betaAngles.start, betaAngles.end));
  const labelBeta = $derived(polarToCartesian(x2, y2, 20, theta / 2));
</script>

<svg viewBox="0 0 320 270" class="w-full h-full drop-shadow-xs" role="region" aria-label="Diagrama de paralelas con secante">
  <!-- Sectores de los ángulos -->
  {#if sectorAlpha}<path d={sectorAlpha} fill="#3b82f6" fill-opacity="0.32" />{/if}
  {#if arcAlpha}<path d={arcAlpha} fill="none" stroke="#2563eb" stroke-width="2" />{/if}

  {#if sectorBeta}<path d={sectorBeta} fill={isAlternos ? '#3b82f6' : '#f59e0b'} fill-opacity="0.32" />{/if}
  {#if arcBeta}<path d={arcBeta} fill="none" stroke={isAlternos ? '#2563eb' : '#d97706'} stroke-width="2" />{/if}

  <!-- Rectas Paralelas R1 y R2 -->
  <line x1="25" y1={y1} x2="295" y2={y1} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="2.5" stroke-linecap="round" />
  <line x1="25" y1={y2} x2="295" y2={y2} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="2.5" stroke-linecap="round" />
  <text x="285" y={y1 - 6} font-size="10" font-weight="bold" class="fill-slate-500 dark:fill-slate-400">R₁</text>
  <text x="285" y={y2 - 6} font-size="10" font-weight="bold" class="fill-slate-500 dark:fill-slate-400">R₂</text>

  <!-- Recta Secante -->
  <line x1={secTop.x} y1={secTop.y} x2={secBottom.x} y2={secBottom.y} stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" />

  <!-- Vértices -->
  <circle cx={x1} cy={y1} r="4" class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="1.5" />
  <circle cx={x2} cy={y2} r="4" class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="1.5" />

  <!-- Etiquetas de Ángulos -->
  <text x={labelAlpha.x} y={labelAlpha.y + 4} font-size="12" font-weight="900" class="fill-blue-700 dark:fill-blue-400 select-none" text-anchor="middle">α</text>
  <text x={labelBeta.x} y={labelBeta.y + 4} font-size="12" font-weight="900" class="{isAlternos ? 'fill-blue-700 dark:fill-blue-400' : 'fill-amber-700 dark:fill-amber-400'} select-none" text-anchor="middle">β</text>
</svg>
