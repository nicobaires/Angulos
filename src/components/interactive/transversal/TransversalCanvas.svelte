<script lang="ts">
  import { polarToCartesian, describeSector, describeArcLine } from '../../../lib/math/angles';
  import { RELATIONS_MAP, type TransversalRelation } from '../../../lib/math/transversal';

  interface Props {
    theta: number;
    relation: TransversalRelation;
    onchange: (newTheta: number) => void;
  }

  let { theta, relation, onchange }: Props = $props();

  let isDragging = $state<boolean>(false);
  let svgElement = $state<SVGSVGElement | null>(null);

  const cx = 160;
  const y1 = 95;
  const y2 = 225;
  const radius = 30;

  // Intersecciones de la secante con las dos paralelas
  const rad = $derived((theta * Math.PI) / 180);
  const tanTheta = $derived(Math.tan(rad));
  const x1 = $derived(cx + (160 - y1) / tanTheta);
  const x2 = $derived(cx - (y2 - 160) / tanTheta);

  // Extremos de la secante
  const secTop = $derived({ x: x1 + 35 * Math.cos(rad), y: y1 - 35 * Math.sin(rad) });
  const secBottom = $derived({ x: x2 - 35 * Math.cos(rad), y: y2 + 35 * Math.sin(rad) });

  // Pares destacados según la relación
  const activePairs = $derived(RELATIONS_MAP[relation].pairs[0]);
  const isCongruent = $derived(RELATIONS_MAP[relation].isCongruent);

  function getAngleColor(id: number): { fill: string; stroke: string; opacity: number } {
    const isFirst = activePairs[0] === id;
    const isSecond = activePairs[1] === id;

    if (isFirst) return { fill: '#3b82f6', stroke: '#1d4ed8', opacity: 0.5 };
    if (isSecond) {
      return isCongruent
        ? { fill: '#3b82f6', stroke: '#1d4ed8', opacity: 0.5 }
        : { fill: '#f59e0b', stroke: '#d97706', opacity: 0.5 };
    }
    return { fill: '#94a3b8', stroke: '#cbd5e1', opacity: 0.1 };
  }

  // Generador de datos para cada uno de los 8 sectores
  const anglesData = $derived([
    { id: 1, vx: x1, vy: y1, start: 0, end: theta, labelPos: polarToCartesian(x1, y1, 18, theta / 2) },
    { id: 2, vx: x1, vy: y1, start: theta, end: 180, labelPos: polarToCartesian(x1, y1, 18, (theta + 180) / 2) },
    { id: 3, vx: x1, vy: y1, start: 180, end: 180 + theta, labelPos: polarToCartesian(x1, y1, 18, 180 + theta / 2) },
    { id: 4, vx: x1, vy: y1, start: 180 + theta, end: 360, labelPos: polarToCartesian(x1, y1, 18, 180 + (theta + 180) / 2) },
    { id: 5, vx: x2, vy: y2, start: 0, end: theta, labelPos: polarToCartesian(x2, y2, 18, theta / 2) },
    { id: 6, vx: x2, vy: y2, start: theta, end: 180, labelPos: polarToCartesian(x2, y2, 18, (theta + 180) / 2) },
    { id: 7, vx: x2, vy: y2, start: 180, end: 180 + theta, labelPos: polarToCartesian(x2, y2, 18, 180 + theta / 2) },
    { id: 8, vx: x2, vy: y2, start: 180 + theta, end: 360, labelPos: polarToCartesian(x2, y2, 18, 180 + (theta + 180) / 2) }
  ]);

  function updatePointer(clientX: number, clientY: number) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * 320;
    const svgY = ((clientY - rect.top) / rect.height) * 320;
    let deg = (Math.atan2(160 - svgY, svgX - cx) * 180) / Math.PI;
    if (deg < 0) deg += 180;
    const clamped = Math.max(30, Math.min(75, deg));
    onchange(Math.round(clamped));
  }
</script>

<div class="relative w-full aspect-square max-w-[320px] mx-auto p-1 select-none">
  <svg
    bind:this={svgElement}
    viewBox="0 0 320 320"
    class="w-full h-full touch-none drop-shadow-sm cursor-pointer"
    onpointerdown={(e) => { (e.currentTarget as Element).setPointerCapture(e.pointerId); isDragging = true; updatePointer(e.clientX, e.clientY); }}
    onpointermove={(e) => isDragging && updatePointer(e.clientX, e.clientY)}
    onpointerup={() => (isDragging = false)}
    onpointercancel={() => (isDragging = false)}
    role="region"
    aria-label="Dos rectas paralelas cortadas por una secante"
  >
    <!-- Paralela 1 (R1) y Paralela 2 (R2) -->
    <line x1="20" y1={y1} x2="300" y2={y1} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="2.5" stroke-linecap="round" />
    <line x1="20" y1={y2} x2="300" y2={y2} class="stroke-slate-700 dark:stroke-slate-300" stroke-width="2.5" stroke-linecap="round" />
    <text x="290" y={y1 - 6} font-size="10" font-weight="bold" class="fill-slate-500 dark:fill-slate-400">R₁</text>
    <text x="290" y={y2 - 6} font-size="10" font-weight="bold" class="fill-slate-500 dark:fill-slate-400">R₂</text>

    <!-- 8 Sectores circulares numerados -->
    {#each anglesData as a}
      {@const c = getAngleColor(a.id)}
      {@const sector = describeSector(a.vx, a.vy, radius, a.start, a.end)}
      {@const arc = describeArcLine(a.vx, a.vy, radius, a.start, a.end)}
      {#if sector}<path d={sector} fill={c.fill} fill-opacity={c.opacity} />{/if}
      {#if arc}<path d={arc} fill="none" stroke={c.stroke} stroke-width="1.8" />{/if}
      <text x={a.labelPos.x} y={a.labelPos.y + 3} font-size="10" font-weight="bold" class="fill-slate-900 dark:fill-slate-100 select-none" text-anchor="middle">
        {a.id}̂
      </text>
    {/each}

    <!-- Recta Secante (S) -->
    <line x1={secBottom.x} y1={secBottom.y} x2={secTop.x} y2={secTop.y} stroke="#4f46e5" stroke-width="3" stroke-linecap="round" />
    <text x={secTop.x + 8} y={secTop.y} font-size="10" font-weight="bold" fill="#4f46e5">S</text>

    <!-- Vértices -->
    <circle cx={x1} cy={y1} r="4" class="fill-slate-900 dark:fill-slate-100" />
    <circle cx={x2} cy={y2} r="4" class="fill-slate-900 dark:fill-slate-100" />

    <!-- Tirador de Arrastre Táctil -->
    <g transform={`translate(${secTop.x}, ${secTop.y})`}>
      <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
      <circle cx="0" cy="0" r="14" fill="#4f46e5" fill-opacity={isDragging ? '0.4' : '0.15'} />
      <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#4f46e5" stroke-width="3" class="shadow-sm" />
    </g>
  </svg>
</div>

