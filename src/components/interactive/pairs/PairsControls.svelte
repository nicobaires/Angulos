<script lang="ts">
  interface Props {
    alpha: number;
    minAlpha?: number;
    maxAlpha: number;
    presets: number[];
    onchange: (val: number) => void;
  }

  let { alpha, minAlpha = 10, maxAlpha, presets, onchange }: Props = $props();

  function handleSlider(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    onchange(val);
  }
</script>

<div class="px-5 py-2 space-y-2 select-none">
  <!-- Slider -->
  <div class="space-y-1">
    <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
      <span>{minAlpha}°</span>
      <span>{Math.round((minAlpha + maxAlpha) / 2)}°</span>
      <span>{maxAlpha}°</span>
    </div>
    <input
      type="range"
      min={minAlpha}
      max={maxAlpha}
      step="1"
      value={alpha}
      oninput={handleSlider}
      class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-manipulation"
      aria-label="Control deslizante para ajustar el ángulo alfa"
    />
  </div>

  <!-- Botones de Acceso Rápido -->
  <div class="flex flex-wrap gap-1.5 justify-center">
    {#each presets as p}
      <button
        onclick={() => onchange(p)}
        class="px-2.5 py-1 text-xs font-bold rounded-lg border transition active:scale-95 touch-manipulation min-h-[36px] {alpha === p ? 'bg-slate-900 text-white border-slate-900 dark:bg-blue-600 dark:border-blue-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}"
      >
        {p}°
      </button>
    {/each}
  </div>
</div>

