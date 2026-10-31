<script lang="ts">
  import {
    polarToCartesian,
    describeSector,
    describeArcLine
  } from '../../../lib/math/angles';

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
    const scaleX = 320 / rect.width;
    const scaleY = 320 / rect.height;

    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;

    const dx = svgX - cx;
    const dy = cy - svgY;

    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    if (deg < 0) deg += 360;

    // Snap magnético suave a ángulos notables (±2.2°)
    const notables = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    for (const n of notables) {
      if (Math.abs(deg - n) <= 2.2) {
        deg = n;
        break;
      }
    }

    const finalAngle = Math.round(deg);
    onchange?.(finalAngle);
  }

  function handlePointerDown(e: PointerEvent) {
    if (readonly) return;
    const target = e.currentTarget as Element;
    target.setPointerCapture(e.pointerId);
    isDragging = true;
    updateAngleFromPointer(e.clientX, e.clientY);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || readonly) return;
    updateAngleFromPointer(e.clientX, e.clientY);
  }

  function handlePointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
  }
</script>

<div class="relative w-full aspect-square max-w-[340px] mx-auto p-2 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm {readonly ? '' : 'cursor-pointer'}"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    role="region"
    aria-label="Transportador interactivo para medir ángulos"
  >
    <!-- Fondo y Marcas del Transportador -->
    <circle cx={cx} cy={cy} r={radius} fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
    <circle cx={cx} cy={cy} r={radius * 0.65} fill="none" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />

    <!-- Graduaciones del transportador -->
    {#each Array.from({ length: 36 }) as _, i}
      {@const deg = i * 10}
      {@const isMajor = deg % 30 === 0}
      {@const isRight = deg % 90 === 0}
      {@const tickOuter = polarToCartesian(cx, cy, radius, deg)}
      {@const tickInner = polarToCartesian(cx, cy, radius - (isRight ? 12 : isMajor ? 8 : 4), deg)}
      {@const labelPos = polarToCartesian(cx, cy, radius - 20, deg)}

      <line
        x1={tickInner.x}
        y1={tickInner.y}
        x2={tickOuter.x}
        y2={tickOuter.y}
        stroke={isRight ? '#334155' : isMajor ? '#64748b' : '#cbd5e1'}
        stroke-width={isRight ? 2 : 1}
      />

      {#if isMajor && deg < 360}
        <text
          x={labelPos.x}
          y={labelPos.y + 4}
          font-size="9"
          font-weight={isRight ? 'bold' : 'normal'}
          fill={isRight ? '#0f172a' : '#64748b'}
          text-anchor="middle"
          class="pointer-events-none select-none"
        >
          {deg}°
        </text>
      {/if}
    {/each}

    <!-- Sector sombreado de amplitud -->
    {#if sectorPath}
      <path
        d={sectorPath}
        fill={colorHex}
        fill-opacity="0.22"
        class="transition-colors duration-150"
      />
    {/if}

    <!-- Arco de medición o cuadradito de ángulo recto (90°) -->
    {#if isRightAngle}
      <rect
        x={cx}
        y={cy - squareSize}
        width={squareSize}
        height={squareSize}
        fill="none"
        stroke={colorHex}
        stroke-width="2.5"
      />
      <circle cx={cx + squareSize / 2} cy={cy - squareSize / 2} r="2" fill={colorHex} />
    {:else if arcPath}
      <path
        d={arcPath}
        fill="none"
        stroke={colorHex}
        stroke-width="2.5"
        class="transition-colors duration-150"
      />
    {/if}

    <!-- Rayo Inicial Fijo (0°) -->
    <line
      x1={cx}
      y1={cy}
      x2={cx + radius}
      y2={cy}
      stroke="#0f172a"
      stroke-width="3"
      stroke-linecap="round"
    />

    <!-- Rayo Móvil (Ángulo actual) -->
    <line
      x1={cx}
      y1={cy}
      x2={currentPoint.x}
      y2={currentPoint.y}
      stroke={colorHex}
      stroke-width="3.5"
      stroke-linecap="round"
      class="transition-colors duration-150"
    />

    <!-- Vértice Central -->
    <circle cx={cx} cy={cy} r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2" />

    <!-- Tirador de Arrastre Táctil -->
    {#if !readonly}
      <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
        <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
        <circle
          cx="0"
          cy="0"
          r="14"
          fill={colorHex}
          fill-opacity={isDragging ? '0.35' : '0.15'}
          class="transition"
        />
        <circle
          cx="0"
          cy="0"
          r="9"
          fill="#ffffff"
          stroke={colorHex}
          stroke-width="3"
          class="shadow-sm"
        />
      </g>
    {/if}
  </svg>

  <!-- Indicador flotante de amplitud -->
  <div class="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
    <div class="bg-white/95 backdrop-blur shadow-sm border border-slate-200 px-3 py-1 rounded-full flex items-center gap-2">
      <span class="text-xs font-semibold text-slate-500">Amplitud:</span>
      <span class="text-base font-extrabold" style={`color: ${colorHex};`}>
        {angle}°
      </span>
    </div>
  </div>
</div>

