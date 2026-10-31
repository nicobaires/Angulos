<script lang="ts">
  import { onMount } from 'svelte';
  import { progressStore, ACHIEVEMENTS, type ProgressData, getDefaultProgress } from '../../lib/pedagogical/progressStore';

  let progress = $state<ProgressData>(getDefaultProgress());
  let showModal = $state<boolean>(false);
  let showConfirm = $state<boolean>(false);

  onMount(() => {
    const unsub = progressStore.subscribe((val) => { progress = val; });
    return unsub;
  });

  function handleReset() {
    progressStore.resetProgress();
    showConfirm = false;
  }
</script>

<!-- Píldora de Progreso en Header -->
<button
  onclick={() => (showModal = true)}
  class="flex items-center gap-2 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 rounded-full text-white text-xs font-bold transition shadow-xs touch-manipulation min-h-[36px]"
  title="Ver progreso y medallas"
  aria-label="Progreso escolar"
>
  <span class="flex items-center gap-1">⭐ <span>{progress.stars}</span></span>
  {#if progress.streak >= 2}
    <span class="flex items-center gap-1 bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse">
      🔥 {progress.streak}
    </span>
  {/if}
</button>

<!-- Modal de Progreso y Medallas -->
{#if showModal}
  <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in select-none">
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 max-w-sm w-full shadow-xl space-y-3.5">
      <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-extrabold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
          <span>🏆</span> Tu Progreso Escolar
        </h3>
        <button onclick={() => (showModal = false)} class="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">✕</button>
      </div>

      <!-- Resumen Estadístico -->
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50">
          <div class="text-base font-black text-amber-600 dark:text-amber-400">⭐ {progress.stars}</div>
          <div class="text-[10px] font-bold text-slate-500 dark:text-slate-400">Estrellas</div>
        </div>
        <div class="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-900/50">
          <div class="text-base font-black text-orange-600 dark:text-orange-400">🔥 {progress.streak}</div>
          <div class="text-[10px] font-bold text-slate-500 dark:text-slate-400">Racha actual</div>
        </div>
        <div class="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
          <div class="text-base font-black text-blue-600 dark:text-blue-400">⚡ {progress.bestStreak}</div>
          <div class="text-[10px] font-bold text-slate-500 dark:text-slate-400">Mejor racha</div>
        </div>
      </div>

      <!-- Vitrina de Medallas -->
      <div>
        <h4 class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medallas Escolares</h4>
        <div class="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-1">
          {#each ACHIEVEMENTS as a}
            {@const isUnlocked = Boolean(progress.achievements[a.id])}
            <div class="flex items-center gap-2 p-2 rounded-xl border text-xs {isUnlocked ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800 opacity-50 grayscale'}">
              <span class="text-lg">{a.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center justify-between">
                  <span>{a.title}</span>
                  {#if isUnlocked}<span class="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">✓</span>{/if}
                </div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{a.description}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Reiniciar Progreso -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
        {#if !showConfirm}
          <button onclick={() => (showConfirm = true)} class="text-[11px] text-rose-600 hover:text-rose-800 dark:text-rose-400 underline">Reiniciar progreso</button>
        {:else}
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] text-rose-600 font-bold">¿Seguro?</span>
            <button onclick={handleReset} class="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold">Sí, borrar</button>
            <button onclick={() => (showConfirm = false)} class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[10px]">No</button>
          </div>
        {/if}
        <button onclick={() => (showModal = false)} class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200">Cerrar</button>
      </div>
    </div>
  </div>
{/if}
