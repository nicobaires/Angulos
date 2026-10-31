<script lang="ts">
  import { onMount } from 'svelte';
  import { progressStore, type ProgressData, getDefaultProgress } from '../../lib/pedagogical/progressStore';

  interface Props {
    moduleId: 'clasificacion' | 'pares' | 'paralelas' | 'ecuaciones';
    total?: number;
  }

  let { moduleId, total = 4 }: Props = $props();
  let progress = $state<ProgressData>(getDefaultProgress());

  onMount(() => {
    const unsub = progressStore.subscribe((val) => { progress = val; });
    return unsub;
  });

  const count = $derived(
    moduleId === 'ecuaciones'
      ? progress.modules.ecuaciones
      : progress.modules[moduleId]?.length || 0
  );

  const isCompleted = $derived(moduleId !== 'ecuaciones' && count >= total);
</script>

<div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors {isCompleted ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}">
  <span>{isCompleted ? '⭐ Completado' : `⭐ ${count}${moduleId === 'ecuaciones' ? ' resueltas' : `/${total}`}`}</span>
</div>
