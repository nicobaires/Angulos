<script lang="ts">
  import {
    polarToCartesian,
    describeSector
  } from '../../../lib/math/angles';

  interface Props {
    alpha: number;
    onchange: (newAlpha: number) => void;
  }

  let { alpha, onchange }: Props = $props();

  let isDragging = $state<boolean>(false);
  let svgElement = $state<SVGSVGElement | null>(null);

  const cx = 160;
  const cy = 160;
  const radius = 110;
  const supplementary = $derived(180 - alpha);

  // Puntos de la secante móvil
  const p1 = $derived(polarToCartesian(cx, cy, radius, alpha));
  const p3 = $derived(polarToCartesian(cx, cy, radius, alpha + 180));

  // Sectores coloreados por parejas congruentes
  const sector1 = $derived(describeSector(cx, cy, 65, 0, alpha));
  const sector2 = $derived(describeSector(cx, cy, 65, alpha, 180));
  const sector3 = $derived(describeSector(cx, cy, 65, 180, 180 + alpha));
  const sector4 = $derived(describeSector(cx, cy, 65, 180 + alpha, 360));

  // Etiquetas de los 4 ángulos
  const pos1 = $derived(polarToCartesian(cx, cy, 42, alpha / 2));
  const pos2 = $derived(polarToCartesian(cx, cy, 42, (alpha + 180) / 2));
  const pos3 = $derived(polarToCartesian(cx, cy, 42, 180 + alpha / 2));
  const pos4 = $derived(polarToCartesian(cx, cy, 42, 180 + (alpha + 180) / 2));

  function updateFromPointer(clientX: number, clientY: number) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * 320;
    const svgY = ((clientY - rect.top) / rect.height) * 320;

    const dx = svgX - cx;
    const dy = cy - svgY;

    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    if (deg < 0) deg += 360;

    // Normalizar si se toca el lado opuesto
    if (deg > 180) deg -= 180;

    const clamped = Math.max(15, Math.min(165, deg));
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

  function handlePointerUp() {
    isDragging = false;
  }
</script>

<div class="relative w-full aspect-square max-w-[320px] mx-auto p-2 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm cursor-pointer"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    role="region"
    aria-label="Gráfico interactivo de rectas secantes y ángulos opuestos por el vértice"
  >
    <!-- Círculo base de fondo -->
    <circle cx={cx} cy={cy} r={radius} fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="3 3" />

    <!-- 4 Sectores (Azul para 1 y 3, Esmeralda para 2 y 4) -->
    {#if sector1}<path d={sector1} fill="#3b82f6" fill-opacity="0.3" />{/if}
    {#if sector2}<path d={sector2} fill="#10b981" fill-opacity="0.3" />{/if}
    {#if sector3}<path d={sector3} fill="#3b82f6" fill-opacity="0.3" />{/if}
    {#if sector4}<path d={sector4} fill="#10b981" fill-opacity="0.3" />{/if}

    <!-- Recta 1: Horizontal fija -->
    <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#334155" stroke-width="3" stroke-linecap="round" />

    <!-- Recta 2: Secante móvil -->
    <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />

    <!-- Números y medidas de los 4 ángulos -->
    <text x={pos1.x} y={pos1.y + 4} font-size="10" font-weight="bold" fill="#1d4ed8" text-anchor="middle">
      1̂: {alpha}°
    </text>
    <text x={pos2.x} y={pos2.y + 4} font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">
      2̂: {supplementary}°
    </text>
    <text x={pos3.x} y={pos3.y + 4} font-size="10" font-weight="bold" fill="#1d4ed8" text-anchor="middle">
      3̂: {alpha}°
    </text>
    <text x={pos4.x} y={pos4.y + 4} font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">
      4̂: {supplementary}°
    </text>

    <!-- Vértice Central -->
    <circle cx={cx} cy={cy} r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2" />

    <!-- Tirador de Arrastre Táctil -->
    <g transform={`translate(${p1.x}, ${p1.y})`}>
      <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
      <circle cx="0" cy="0" r="14" fill="#4f46e5" fill-opacity={isDragging ? '0.4' : '0.15'} />
      <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#4f46e5" stroke-width="3" class="shadow-sm" />
    </g>
  </svg>
</div>

