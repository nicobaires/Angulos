<script lang="ts">
  import type { PairType } from '../../../lib/math/pairs';

  interface Props {
    activeMode: PairType;
    onselect: (mode: PairType) => void;
  }

  let { activeMode, onselect }: Props = $props();

  const tabs: { type: PairType; label: string; icon: string; sum: string }[] = [
    { type: 'complementarios', label: 'Complementarios', icon: '📐', sum: 'Suman 90°' },
    { type: 'suplementarios', label: 'Suplementarios', icon: '📏', sum: 'Suman 180°' },
    { type: 'opuestos', label: 'Opuestos', icon: '✂️', sum: 'Son Iguales' }
  ];
</script>

<div class="px-3 py-2 border-b border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-1.5 select-none transition-colors">
  {#each tabs as t}
    <button
      onclick={() => onselect(t.type)}
      class="flex flex-col items-center justify-center p-1.5 rounded-xl text-center border transition active:scale-95 touch-manipulation min-h-[48px] {activeMode === t.type ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs ring-1 ring-blue-300 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-200 dark:ring-blue-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'}"
    >
      <div class="flex items-center justify-center gap-1 w-full">
        <span class="text-sm shrink-0">{t.icon}</span>
        <span class="text-[11px] font-bold tracking-tight truncate">{t.label}</span>
      </div>
      <p class="text-[9px] font-semibold opacity-75 mt-0.5 whitespace-nowrap">{t.sum}</p>
    </button>
  {/each}
</div>
