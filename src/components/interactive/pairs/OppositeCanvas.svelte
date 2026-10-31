<script lang="ts">
  import { polarToCartesian, describeSector, describeArcLine } from '../../../lib/math/angles';

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

  const p1 = $derived(polarToCartesian(cx, cy, radius, alpha));
  const p3 = $derived(polarToCartesian(cx, cy, radius, alpha + 180));

  // Sectores coloreados por parejas congruentes
  const sector1 = $derived(describeSector(cx, cy, 68, 0, alpha));
  const sector2 = $derived(describeSector(cx, cy, 68, alpha, 180));
  const sector3 = $derived(describeSector(cx, cy, 68, 180, 180 + alpha));
  const sector4 = $derived(describeSector(cx, cy, 68, 180 + alpha, 360));

  // Arcos con radios diferenciados (técnica pedagógica: 46px para par 1, 62px para par 2)
  const arc1 = $derived(describeArcLine(cx, cy, 46, 0, alpha));
  const arc3 = $derived(describeArcLine(cx, cy, 46, 180, 180 + alpha));
  const arc2 = $derived(describeArcLine(cx, cy, 60, alpha, 180));
  const arc4 = $derived(describeArcLine(cx, cy, 60, 180 + alpha, 360));

  // Posiciones de etiquetas
  const pos1 = $derived(polarToCartesian(cx, cy, 34, alpha / 2));
  const pos2 = $derived(polarToCartesian(cx, cy, 76, (alpha + 180) / 2));
  const pos3 = $derived(polarToCartesian(cx, cy, 34, 180 + alpha / 2));
  const pos4 = $derived(polarToCartesian(cx, cy, 76, 180 + (alpha + 180) / 2));

  function updateFromPointer(clientX: number, clientY: number) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * 320;
    const svgY = ((clientY - rect.top) / rect.height) * 320;
    let deg = (Math.atan2(cy - svgY, svgX - cx) * 180) / Math.PI;
    if (deg < 0) deg += 360;
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
</script>

<div class="relative w-full aspect-square max-w-[320px] mx-auto p-2 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm cursor-pointer"
    onpointerdown={handlePointerDown}
    onpointermove={(e) => isDragging && updateFromPointer(e.clientX, e.clientY)}
    onpointerup={() => (isDragging = false)}
    onpointercancel={() => (isDragging = false)}
    role="region"
    aria-label="Rectas secantes y ángulos opuestos por el vértice"
  >
    <circle cx={cx} cy={cy} r={radius} fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="3 3" />

    <!-- Par 1: Azul vibrante (#3b82f6) para 1̂ y 3̂ -->
    {#if sector1}<path d={sector1} fill="#3b82f6" fill-opacity="0.32" />{/if}
    {#if sector3}<path d={sector3} fill="#3b82f6" fill-opacity="0.32" />{/if}
    {#if arc1}<path d={arc1} fill="none" stroke="#2563eb" stroke-width="2.5" />{/if}
    {#if arc3}<path d={arc3} fill="none" stroke="#2563eb" stroke-width="2.5" />{/if}

    <!-- Par 2: Ámbar cálido (#f59e0b) para 2̂ y 4̂ -->
    {#if sector2}<path d={sector2} fill="#f59e0b" fill-opacity="0.32" />{/if}
    {#if sector4}<path d={sector4} fill="#f59e0b" fill-opacity="0.32" />{/if}
    {#if arc2}<path d={arc2} fill="none" stroke="#d97706" stroke-width="2.5" />{/if}
    {#if arc4}<path d={arc4} fill="none" stroke="#d97706" stroke-width="2.5" />{/if}

    <!-- Recta 1 (fija horizontal) y Recta 2 (secante) -->
    <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#334155" stroke-width="3" stroke-linecap="round" />
    <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />

    <!-- Etiquetas con alto contraste -->
    <text x={pos1.x} y={pos1.y + 4} font-size="11" font-weight="900" fill="#1d4ed8" text-anchor="middle">1̂: {alpha}°</text>
    <text x={pos3.x} y={pos3.y + 4} font-size="11" font-weight="900" fill="#1d4ed8" text-anchor="middle">3̂: {alpha}°</text>
    <text x={pos2.x} y={pos2.y + 4} font-size="11" font-weight="900" fill="#b45309" text-anchor="middle">2̂: {supplementary}°</text>
    <text x={pos4.x} y={pos4.y + 4} font-size="11" font-weight="900" fill="#b45309" text-anchor="middle">4̂: {supplementary}°</text>

    <!-- Vértice y Tirador de Arrastre -->
    <circle cx={cx} cy={cy} r={6} fill="#0f172a" stroke="#ffffff" stroke-width="2" />
    <g transform={`translate(${p1.x}, ${p1.y})`}>
      <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
      <circle cx="0" cy="0" r="14" fill="#4f46e5" fill-opacity={isDragging ? '0.4' : '0.15'} />
      <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#4f46e5" stroke-width="3" class="shadow-sm" />
    </g>
  </svg>
</div>
