<script lang="ts">
  import { polarToCartesian, describeSector, describeArcLine } from '../../../lib/math/angles';

  interface Props {
    alpha: number;
    totalAngle: 90 | 180;
    onchange: (newAlpha: number) => void;
  }

  let { alpha, totalAngle, onchange }: Props = $props();

  let isDragging = $state<boolean>(false);
  let svgElement = $state<SVGSVGElement | null>(null);

  const cx = 160;
  const cy = 160;
  const radius = 115;
  const beta = $derived(totalAngle - alpha);

  const dividerPoint = $derived(polarToCartesian(cx, cy, radius, alpha));
  const boundaryPoint = $derived(polarToCartesian(cx, cy, radius, totalAngle));

  const sectorAlpha = $derived(describeSector(cx, cy, radius, 0, alpha));
  const sectorBeta = $derived(describeSector(cx, cy, radius, alpha, totalAngle));
  const arcAlpha = $derived(describeArcLine(cx, cy, 45, 0, alpha));
  const arcBeta = $derived(describeArcLine(cx, cy, 60, alpha, totalAngle));

  const labelAlphaPos = $derived(polarToCartesian(cx, cy, 32, alpha / 2));
  const labelBetaPos = $derived(polarToCartesian(cx, cy, 75, alpha + beta / 2));

  function updateFromPointer(clientX: number, clientY: number) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * 320;
    const svgY = ((clientY - rect.top) / rect.height) * 320;
    const deg = (Math.atan2(cy - svgY, svgX - cx) * 180) / Math.PI;
    const normalized = deg < 0 ? deg + 360 : deg;
    const clamped = Math.max(5, Math.min(totalAngle - 5, normalized));
    onchange(Math.round(clamped));
  }

  function handlePointerDown(e: PointerEvent) {
    const target = e.currentTarget as Element;
    target.setPointerCapture(e.pointerId);
    isDragging = true;
    updateFromPointer(e.clientX, e.clientY);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return;
    updateFromPointer(e.clientX, e.clientY);
  }
</script>

<div class="relative w-full aspect-square max-w-[320px] mx-auto p-2 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm cursor-pointer"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={() => (isDragging = false)}
    onpointercancel={() => (isDragging = false)}
    role="region"
    aria-label="Gráfico interactivo de ángulos complementarios o suplementarios"
  >
    <circle cx={cx} cy={cy} r={radius} class="fill-slate-50 stroke-slate-200 dark:fill-slate-900/90 dark:stroke-slate-800 transition-colors" stroke-width="2" />

    {#if sectorAlpha}<path d={sectorAlpha} fill="#3b82f6" fill-opacity="0.25" />{/if}
    {#if sectorBeta}<path d={sectorBeta} fill="#f59e0b" fill-opacity="0.25" />{/if}
    {#if arcAlpha}<path d={arcAlpha} fill="none" stroke="#2563eb" stroke-width="2.5" />{/if}
    {#if arcBeta}<path d={arcBeta} fill="none" stroke="#d97706" stroke-width="2.5" />{/if}

    <text x={labelAlphaPos.x} y={labelAlphaPos.y + 4} font-size="11" font-weight="bold" class="fill-blue-700 dark:fill-blue-400 select-none" text-anchor="middle">
      α: {alpha}°
    </text>
    <text x={labelBetaPos.x} y={labelBetaPos.y + 4} font-size="11" font-weight="bold" class="fill-amber-700 dark:fill-amber-400 select-none" text-anchor="middle">
      β: {beta}°
    </text>

    <line x1={cx} y1={cy} x2={cx + radius} y2={cy} class="stroke-slate-900 dark:stroke-slate-100" stroke-width="3" stroke-linecap="round" />
    <line x1={cx} y1={cy} x2={boundaryPoint.x} y2={boundaryPoint.y} class="stroke-slate-900 dark:stroke-slate-100" stroke-width="3" stroke-linecap="round" />
    <line x1={cx} y1={cy} x2={dividerPoint.x} y2={dividerPoint.y} stroke="#4f46e5" stroke-width="3.5" stroke-linecap="round" />

    <circle cx={cx} cy={cy} r={6} class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="2" />

    <g transform={`translate(${dividerPoint.x}, ${dividerPoint.y})`}>
      <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
      <circle cx="0" cy="0" r="14" fill="#4f46e5" fill-opacity={isDragging ? '0.4' : '0.15'} />
      <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#4f46e5" stroke-width="3" class="shadow-sm" />
    </g>
  </svg>
</div>
