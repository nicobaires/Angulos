<script lang="ts">
  interface Props {
    angle: number;
    onchange?: (val: number) => void;
  }

  let { angle, onchange }: Props = $props();

  const presets = [0, 45, 90, 135, 180, 270, 360];

  function handleSliderInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    onchange?.(val);
  }

  function handlePresetClick(val: number) {
    onchange?.(val);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.shiftKey && (e.key === 'ArrowRight' || e.key === 'ArrowUp')) {
      e.preventDefault();
      onchange?.(Math.min(360, angle + 10));
    } else if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
      e.preventDefault();
      onchange?.(Math.max(0, angle - 10));
    }
  }
</script>

<div class="px-5 py-3 space-y-3 select-none">
  <!-- Slider de control fino con entrada manual -->
  <div class="space-y-1.5">
    <div class="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
      <span>0°</span>
      <div class="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-lg shadow-2xs">
        <label for="angle-number" class="text-[11px] font-bold text-slate-500 dark:text-slate-400">Ingresar:</label>
        <input
          id="angle-number"
          type="number"
          inputmode="numeric"
          min="0"
          max="360"
          value={angle}
          oninput={(e) => {
            const v = Number((e.target as HTMLInputElement).value);
            if (!isNaN(v)) onchange?.(Math.min(360, Math.max(0, Math.round(v))));
          }}
          class="w-12 text-center font-black text-sm bg-transparent text-slate-900 dark:text-slate-100 outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
          aria-label="Ingresar ángulo exacto en grados"
        />
        <span class="text-xs font-bold text-slate-500">°</span>
      </div>
      <span>360°</span>
    </div>
    <input
      type="range"
      min="0"
      max="360"
      step="1"
      value={angle}
      oninput={handleSliderInput}
      onkeydown={handleKeyDown}
      class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
      aria-label="Control deslizante para ajustar el ángulo"
    />
  </div>

  <!-- Botones de Acceso Rápido a Ángulos Clave -->
  <div class="flex flex-wrap gap-1.5 justify-center">
    {#each presets as val}
      <button
        onclick={() => handlePresetClick(val)}
        class="px-2.5 py-1 text-xs font-bold rounded-lg border transition active:scale-95 touch-manipulation min-h-[38px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none {angle === val ? 'bg-slate-900 text-white border-slate-900 dark:bg-blue-600 dark:border-blue-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 lg:hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}"
      >
        {val}°
      </button>
    {/each}
  </div>
</div>

