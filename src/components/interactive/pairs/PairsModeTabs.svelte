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

<div class="px-4 py-2 border-b border-slate-100 flex gap-2 overflow-x-auto select-none no-scrollbar">
  {#each tabs as t}
    <button
      onclick={() => onselect(t.type)}
      class="flex-1 min-w-[100px] p-2 rounded-xl text-left border transition active:scale-95 touch-manipulation min-h-[44px] {activeMode === t.type ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}"
    >
      <div class="flex items-center gap-1.5">
        <span class="text-base">{t.icon}</span>
        <span class="text-xs font-bold">{t.label}</span>
      </div>
      <p class="text-[10px] font-medium opacity-75 mt-0.5">{t.sum}</p>
    </button>
  {/each}
</div>

