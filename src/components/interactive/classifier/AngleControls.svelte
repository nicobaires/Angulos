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
</script>

<div class="px-5 py-3 space-y-3 select-none">
  <!-- Slider de control fino -->
  <div class="space-y-1">
    <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
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
      value={angle}
      oninput={handleSliderInput}
      class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-manipulation"
      aria-label="Control deslizante para ajustar el ángulo"
    />
  </div>

  <!-- Botones de Acceso Rápido a Ángulos Clave -->
  <div class="flex flex-wrap gap-1.5 justify-center">
    {#each presets as val}
      <button
        onclick={() => handlePresetClick(val)}
        class="px-2.5 py-1 text-xs font-bold rounded-lg border transition active:scale-95 touch-manipulation min-h-[38px] {angle === val ? 'bg-slate-900 text-white border-slate-900 dark:bg-blue-600 dark:border-blue-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}"
      >
        {val}°
      </button>
    {/each}
  </div>
</div>

