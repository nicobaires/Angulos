<script lang="ts">
  import type { TransversalRelation } from '../../../lib/math/transversal';
  import { RELATIONS_MAP } from '../../../lib/math/transversal';

  interface Props {
    selected: TransversalRelation;
    onselect: (relation: TransversalRelation) => void;
  }

  let { selected, onselect }: Props = $props();

  const relations: { id: TransversalRelation; label: string; icon: string; badge: string }[] = [
    { id: 'alternos_internos', label: 'Alt. Internos', icon: '🔀', badge: 'Iguales' },
    { id: 'alternos_externos', label: 'Alt. Externos', icon: '↔️', badge: 'Iguales' },
    { id: 'correspondientes', label: 'Correspondientes', icon: '🔁', badge: 'Iguales' },
    { id: 'conjugados_internos', label: 'Conj. Internos', icon: '➕', badge: '180°' },
    { id: 'conjugados_externos', label: 'Conj. Externos', icon: '➖', badge: '180°' }
  ];
</script>

<div class="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto select-none no-scrollbar transition-colors">
  {#each relations as r}
    <button
      onclick={() => onselect(r.id)}
      class="shrink-0 px-2.5 py-1.5 rounded-xl text-left border transition active:scale-95 touch-manipulation min-h-[44px] {selected === r.id ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs ring-1 ring-blue-300 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-200 dark:ring-blue-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'}"
    >
      <div class="flex items-center gap-1">
        <span class="text-xs">{r.icon}</span>
        <span class="text-xs font-bold whitespace-nowrap">{r.label}</span>
      </div>
      <p class="text-[9px] font-semibold opacity-75 mt-0.5 whitespace-nowrap">{r.badge}</p>
    </button>
  {/each}
</div>

