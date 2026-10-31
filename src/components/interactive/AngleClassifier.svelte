<script lang="ts">
  import {
    polarToCartesian,
    describeSector,
    describeArcLine,
    getAngleClassification,
    type AngleClassification
  } from '../../lib/math/angles';
  import Katex from '../common/Math.svelte';

  // Estado del ángulo
  let angle = $state<number>(55);
  let isDragging = $state<boolean>(false);
  let svgElement = $state<SVGSVGElement | null>(null);

  // Modo Desafío
  type TargetChallenge = {
    target: AngleClassification;
    title: string;
    hint: string;
  };

  const challenges: TargetChallenge[] = [
    { target: 'agudo', title: 'Encontrá un Ángulo Agudo', hint: 'Fijate que mida más de 0° y menos de 90°.' },
    { target: 'recto', title: 'Encontrá un Ángulo Recto', hint: 'Tiene que medir exactamente 90°.' },
    { target: 'obtuso', title: 'Encontrá un Ángulo Obtuso', hint: 'Buscá que mida entre 90° y 180°.' },
    { target: 'llano', title: 'Encontrá un Ángulo Llano', hint: 'Los dos rayos deben formar una línea recta (180°).' },
    { target: 'concavo', title: 'Encontrá un Ángulo Cóncavo', hint: 'Abarca más de media vuelta (entre 180° y 360°).' },
    { target: 'completo', title: 'Encontrá un Ángulo Completo', hint: 'Tiene que dar un giro entero de 360°.' }
  ];

  let challengeIndex = $state<number | null>(null);
  let challengeFeedback = $state<string>('');
  let challengeSuccess = $state<boolean>(false);

  // Derivados
  const info = $derived(getAngleClassification(angle));

  // Geometría del transportador
  const cx = 160;
  const cy = 160;
  const radius = 115;
  const arcRadius = 45;

  const currentPoint = $derived(polarToCartesian(cx, cy, radius, angle));
  const sectorPath = $derived(describeSector(cx, cy, radius, 0, angle));
  const arcPath = $derived(describeArcLine(cx, cy, arcRadius, 0, angle));

  // Cálculo del cuadradito de 90°
  const isRightAngle = $derived(Math.round(angle) === 90);
  const squareSize = 22;

  // Manejo de puntero y arrastre táctil
  function updateAngleFromPointer(clientX: number, clientY: number) {
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const scaleX = 320 / rect.width;
    const scaleY = 320 / rect.height;

    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;

    const dx = svgX - cx;
    const dy = cy - svgY; // Invertir Y porque en pantalla crece hacia abajo

    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    if (deg < 0) deg += 360;

    // Snap magnético suave a ángulos notables si está cerca (±2°)
    const notables = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    for (const n of notables) {
      if (Math.abs(deg - n) <= 2.2) {
        deg = n;
        break;
      }
    }

    angle = Math.round(deg);
    checkChallengeProgress();
  }

  function handlePointerDown(e: PointerEvent) {
    const target = e.currentTarget as Element;
    target.setPointerCapture(e.pointerId);
    isDragging = true;
    updateAngleFromPointer(e.clientX, e.clientY);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return;
    updateAngleFromPointer(e.clientX, e.clientY);
  }

  function handlePointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
  }

  function setPreset(val: number) {
    angle = val;
    checkChallengeProgress();
  }

  // Lógica de desafíos
  function startChallenge() {
    if (challengeIndex === null) {
      challengeIndex = 0;
    } else {
      challengeIndex = (challengeIndex + 1) % challenges.length;
    }
    challengeFeedback = '';
    challengeSuccess = false;
  }

  function checkChallengeProgress() {
    if (challengeIndex === null) return;
    const currentChallenge = challenges[challengeIndex];
    if (info.type === currentChallenge.target) {
      challengeSuccess = true;
      challengeFeedback = `¡Genial! 🎉 ${info.name}: lograste la apertura correcta.`;
    } else {
      challengeSuccess = false;
      challengeFeedback = currentChallenge.hint;
    }
  }

  function exitChallenge() {
    challengeIndex = null;
    challengeFeedback = '';
    challengeSuccess = false;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera de la sección -->
  <div class="p-4 border-b border-slate-100 flex items-center justify-between">
    <div>
      <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">Módulo 1</span>
      <h2 class="text-lg font-bold text-slate-900">Clasificación según Medida</h2>
    </div>

    {#if challengeIndex === null}
      <button
        onclick={startChallenge}
        class="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 touch-manipulation min-h-[44px]"
      >
        <span>🎯</span>
        <span>¡Modo Desafío!</span>
      </button>
    {:else}
      <button
        onclick={exitChallenge}
        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition active:scale-95 touch-manipulation min-h-[44px]"
      >
        Salir del modo
      </button>
    {/if}
  </div>

  <!-- Banner de Desafío activo -->
  {#if challengeIndex !== null}
    <div class="mx-4 mt-3 p-3 rounded-2xl border transition-all {challengeSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'}">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-bold uppercase tracking-wider">Desafío #{challengeIndex + 1} de {challenges.length}</span>
        <button onclick={startChallenge} class="text-xs underline font-semibold text-blue-600 hover:text-blue-800">
          Siguiente ➔
        </button>
      </div>
      <p class="text-sm font-bold">{challenges[challengeIndex].title}</p>
      <p class="text-xs mt-0.5 opacity-90">{challengeFeedback || challenges[challengeIndex].hint}</p>
    </div>
  {/if}

  <!-- Canvas SVG con Transportador Interactivo -->
  <div class="relative w-full aspect-square max-w-[340px] mx-auto p-2">
    <svg
      bind:this={svgElement}
      viewBox="0 0 320 320"
      class="w-full h-full touch-none select-none drop-shadow-sm"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
      role="region"
      aria-label="Transportador interactivo para medir ángulos"
    >
      <!-- Fondo y Marcas del Transportador -->
      <circle cx={cx} cy={cy} r={radius} fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      
      <!-- Círculo interior guía -->
      <circle cx={cx} cy={cy} r={radius * 0.65} fill="none" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />

      <!-- Marcas cada 10 grados y números cada 30 grados -->
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
          fill={info.colorHex}
          fill-opacity="0.22"
          class="transition-colors duration-150"
        />
      {/if}

      <!-- Arco de medición o cuadradito de ángulo recto -->
      {#if isRightAngle}
        <!-- Cuadradito recto 90° -->
        <rect
          x={cx}
          y={cy - squareSize}
          width={squareSize}
          height={squareSize}
          fill="none"
          stroke={info.colorHex}
          stroke-width="2.5"
        />
        <circle cx={cx + squareSize / 2} cy={cy - squareSize / 2} r="2" fill={info.colorHex} />
      {:else if arcPath}
        <path
          d={arcPath}
          fill="none"
          stroke={info.colorHex}
          stroke-width="2.5"
          class="transition-colors duration-150"
        />
      {/if}

      <!-- Rayo Inicial Fijo (0°, hacia la derecha) -->
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
        stroke={info.colorHex}
        stroke-width="3.5"
        stroke-linecap="round"
        class="transition-colors duration-150"
      />

      <!-- Vértice Central -->
      <circle cx={cx} cy={cy} r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2" />

      <!-- Tirador de Arrastre (Handle táctil con zona amplia de toque) -->
      <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
        <!-- Hitbox invisible de 48px para facilitar el toque con el dedo -->
        <circle cx="0" cy="0" r="24" fill="transparent" class="cursor-grab active:cursor-grabbing" />
        <!-- Aro pulsante si está seleccionado -->
        <circle
          cx="0"
          cy="0"
          r="14"
          fill={info.colorHex}
          fill-opacity={isDragging ? '0.35' : '0.15'}
          class="transition"
        />
        <!-- Botón visual -->
        <circle
          cx="0"
          cy="0"
          r="9"
          fill="#ffffff"
          stroke={info.colorHex}
          stroke-width="3"
          class="shadow-sm"
        />
      </g>
    </svg>

    <!-- Indicador flotante en el centro del transportador -->
    <div class="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
      <div class="bg-white/95 backdrop-blur shadow-sm border border-slate-200 px-3 py-1 rounded-full flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-500">Amplitud:</span>
        <span class="text-base font-extrabold" style={`color: ${info.colorHex};`}>
          {angle}°
        </span>
      </div>
    </div>
  </div>

  <!-- Controles y Slider Táctil -->
  <div class="px-5 py-3 space-y-3">
    <!-- Slider -->
    <div class="space-y-1">
      <div class="flex justify-between text-xs text-slate-500 font-semibold">
        <span>0°</span>
        <span>90°</span>
        <span>180°</span>
        <span>270°</span>
        <span>360°</span>
      </div>
      <input
        type="range"
        min="0"
        max="360"
        step="1"
        bind:value={angle}
        oninput={checkChallengeProgress}
        class="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-manipulation"
      />
    </div>

    <!-- Botones de Acceso Rápido a Ángulos Clave -->
    <div class="flex flex-wrap gap-1.5 justify-center">
      {#each [0, 45, 90, 135, 180, 270, 360] as val}
        <button
          onclick={() => setPreset(val)}
          class="px-2.5 py-1 text-xs font-bold rounded-lg border transition active:scale-95 touch-manipulation min-h-[38px] {angle === val ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}"
        >
          {val}°
        </button>
      {/each}
    </div>
  </div>

  <!-- Ficha Didáctica del Ángulo Actual -->
  <div class="p-4 mx-4 mb-4 rounded-2xl border shadow-sm transition-all {info.badgeClass}">
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-xs font-bold uppercase tracking-wider">Clasificación</span>
      <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-white/70 shadow-xs">
        {info.colorName}
      </span>
    </div>

    <h3 class="text-lg font-black tracking-tight">{info.name}</h3>

    <div class="my-1.5 py-1 px-2.5 bg-white/80 rounded-lg inline-flex items-center text-sm font-semibold">
      {#if info.type === 'nulo'}
        <Katex formula="\alpha = 0^\circ" />
      {:else if info.type === 'agudo'}
        <Katex formula="0^\circ < \alpha < 90^\circ" />
      {:else if info.type === 'recto'}
        <Katex formula="\alpha = 90^\circ" />
      {:else if info.type === 'obtuso'}
        <Katex formula="90^\circ < \alpha < 180^\circ" />
      {:else if info.type === 'llano'}
        <Katex formula="\alpha = 180^\circ" />
      {:else if info.type === 'concavo'}
        <Katex formula="180^\circ < \alpha < 360^\circ" />
      {:else}
        <Katex formula="\alpha = 360^\circ" />
      {/if}
    </div>

    <p class="text-xs mt-1 leading-relaxed opacity-95">
      {info.description}
    </p>

    <!-- Pista didáctica rioplatense -->
    <div class="mt-2.5 pt-2 border-t border-current/15 text-[11px] font-medium flex items-center gap-1.5 opacity-90">
      <span>💡</span>
      <span>
        {#if info.type === 'agudo'}
          Fijate: una porción de pizza común suele tener un ángulo agudo (entre 40° y 50°).
        {:else if info.type === 'recto'}
          La esquina de tu cuaderno o las paredes de tu aula forman ángulos rectos de 90°.
        {:else if info.type === 'obtuso'}
          Un abanico abierto más de la cuenta o el respaldo reclinado de una silla son obtusos.
        {:else if info.type === 'llano'}
          Los dos brazos extendidos hacia los lados en cruz forman un ángulo llano.
        {:else if info.type === 'concavo'}
          Es la parte exterior de la porción de pizza que ya comiste.
        {:else if info.type === 'completo'}
          Como las agujas del reloj cuando vuelven a encontrarse a las 12 tras dar una vuelta.
        {:else}
          Cuando el transportador está completamente cerrado sobre sí mismo.
        {/if}
      </span>
    </div>
  </div>
</div>
