<script lang="ts">
  import {
    polarToCartesian,
    describeSector,
    describeArcLine
  } from '../../../lib/math/angles';
  import ProtractorTicks from './ProtractorTicks.svelte';

  interface Props {
    angle: number;
    colorHex: string;
    onchange?: (newAngle: number) => void;
    readonly?: boolean;
  }

  let { angle, colorHex, onchange, readonly = false }: Props = $props();

  let isDragging = $state<boolean>(false);
  let svgElement = $state<SVGSVGElement | null>(null);

  const cx = 160;
  const cy = 160;
  const radius = 115;
  const arcRadius = 45;
  const squareSize = 22;

  const currentPoint = $derived(polarToCartesian(cx, cy, radius, angle));
  const sectorPath = $derived(describeSector(cx, cy, radius, 0, angle));
  const arcPath = $derived(describeArcLine(cx, cy, arcRadius, 0, angle));
  const isRightAngle = $derived(Math.round(angle) === 90);

  function updateAngleFromPointer(clientX: number, clientY: number) {
    if (readonly || !svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgX = (clientX - rect.left) * (320 / rect.width);
    const svgY = (clientY - rect.top) * (320 / rect.height);
    let deg = (Math.atan2(cy - svgY, svgX - cx) * 180) / Math.PI;
    if (deg < 0) deg += 360;

    // Snap magnético a ángulos notables
    const notables = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    for (const n of notables) {
      if (Math.abs(deg - n) <= 2.2) {
        deg = n;
        break;
      }
    }
    onchange?.(Math.round(deg));
  }

  function handlePointerDown(e: PointerEvent) {
    if (readonly) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    isDragging = true;
    updateAngleFromPointer(e.clientX, e.clientY);
  }
</script>

<div class="relative w-full aspect-square max-w-[340px] mx-auto p-2 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm {readonly ? '' : 'cursor-pointer'}"
    onpointerdown={handlePointerDown}
    onpointermove={(e) => isDragging && !readonly && updateAngleFromPointer(e.clientX, e.clientY)}
    onpointerup={() => (isDragging = false)}
    onpointercancel={() => (isDragging = false)}
    role="region"
    aria-label="Transportador interactivo para medir ángulos"
  >
    <ProtractorTicks {cx} {cy} {radius} />

    {#if sectorPath}
      <path d={sectorPath} fill={colorHex} fill-opacity="0.25" class="transition-colors duration-150" />
    {/if}

    {#if isRightAngle}
      <rect x={cx} y={cy - squareSize} width={squareSize} height={squareSize} fill="none" stroke={colorHex} stroke-width="2.5" />
      <circle cx={cx + squareSize / 2} cy={cy - squareSize / 2} r="2" fill={colorHex} />
    {:else if arcPath}
      <path d={arcPath} fill="none" stroke={colorHex} stroke-width="2.5" class="transition-colors duration-150" />
    {/if}

    <!-- Rayo Inicial Fijo (0°) -->
    <line x1={cx} y1={cy} x2={cx + radius} y2={cy} class="stroke-slate-900 dark:stroke-slate-100" stroke-width="3" stroke-linecap="round" />

    <!-- Rayo Móvil -->
    <line x1={cx} y1={cy} x2={currentPoint.x} y2={currentPoint.y} stroke={colorHex} stroke-width="3.5" stroke-linecap="round" class="transition-colors duration-150" />

    <!-- Vértice Central -->
    <circle cx={cx} cy={cy} r="6" class="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-800" stroke-width="2" />

    {#if !readonly}
      <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
        <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
        <circle cx="0" cy="0" r="14" fill={colorHex} fill-opacity={isDragging ? '0.4' : '0.15'} />
        <circle cx="0" cy="0" r="9" fill="#ffffff" stroke={colorHex} stroke-width="3" class="shadow-sm" />
      </g>
    {/if}
  </svg>

  <div class="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
    <div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full flex items-center gap-2">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Amplitud:</span>
      <span class="text-base font-extrabold" style={`color: ${colorHex};`}>
        {angle}°
      </span>
    </div>
  </div>
</div>
