<script lang="ts">
  interface Props {
    theta: number;
    onchange: (val: number) => void;
  }

  let { theta, onchange }: Props = $props();

  const presets = [35, 45, 55, 65, 75];

  function handleSlider(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    onchange(val);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.shiftKey && (e.key === 'ArrowRight' || e.key === 'ArrowUp')) {
      e.preventDefault();
      onchange(Math.min(75, theta + 10));
    } else if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
      e.preventDefault();
      onchange(Math.max(30, theta - 10));
    }
  }
</script>

<div class="px-5 py-2 space-y-2 select-none">
  <!-- Slider de inclinación -->
  <div class="space-y-1">
    <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
      <span>30°</span>
      <span>Inclinación: {theta}°</span>
      <span>75°</span>
    </div>
    <input
      type="range"
      min="30"
      max="75"
      step="1"
      value={theta}
      oninput={handleSlider}
      onkeydown={handleKeyDown}
      class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
      aria-label="Control deslizante para regular la inclinación de la secante"
    />
  </div>

  <!-- Botones de Acceso Rápido -->
  <div class="flex flex-wrap gap-1.5 justify-center">
    {#each presets as p}
      <button
        onclick={() => onchange(p)}
        class="px-2.5 py-1 text-xs font-bold rounded-lg border transition active:scale-95 touch-manipulation min-h-[36px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none {theta === p ? 'bg-slate-900 text-white border-slate-900 dark:bg-blue-600 dark:border-blue-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 lg:hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}"
      >
        {p}°
      </button>
    {/each}
  </div>
</div>

