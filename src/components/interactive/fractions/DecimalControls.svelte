<script lang="ts">
  import type { DecimalParts, DecimalType } from '../../../lib/math/fractions';

  interface Props {
    type: DecimalType;
    parts: DecimalParts;
    ontypechange: (type: DecimalType) => void;
    onpartschange: (parts: DecimalParts) => void;
  }

  let { type, parts, ontypechange, onpartschange }: Props = $props();

  const PRESETS: Record<DecimalType, Array<{ label: string; parts: DecimalParts }>> = {
    exact: [
      { label: '0,5', parts: { whole: 0, nonPeriodic: '5', periodic: '' } },
      { label: '0,75', parts: { whole: 0, nonPeriodic: '75', periodic: '' } },
      { label: '2,4', parts: { whole: 2, nonPeriodic: '4', periodic: '' } },
      { label: '0,125', parts: { whole: 0, nonPeriodic: '125', periodic: '' } }
    ],
    pure_periodic: [
      { label: '0,3̂', parts: { whole: 0, nonPeriodic: '', periodic: '3' } },
      { label: '1,6̂', parts: { whole: 1, nonPeriodic: '', periodic: '6' } },
      { label: '0,45̂', parts: { whole: 0, nonPeriodic: '', periodic: '45' } },
      { label: '2,3̂', parts: { whole: 2, nonPeriodic: '', periodic: '3' } }
    ],
    mixed_periodic: [
      { label: '0,16̂', parts: { whole: 0, nonPeriodic: '1', periodic: '6' } },
      { label: '1,23̂', parts: { whole: 1, nonPeriodic: '2', periodic: '3' } },
      { label: '0,08̂', parts: { whole: 0, nonPeriodic: '0', periodic: '8' } },
      { label: '0,83̂', parts: { whole: 0, nonPeriodic: '8', periodic: '3' } }
    ]
  };
</script>

<div class="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 select-none transition-colors">
  <!-- Pestañas de tipo -->
  <div class="flex rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1">
    <button
      onclick={() => ontypechange('exact')}
      class="flex-1 py-2 text-xs font-bold rounded-xl transition active:scale-95 touch-manipulation {type === 'exact' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}"
    >
      Exacto
    </button>
    <button
      onclick={() => ontypechange('pure_periodic')}
      class="flex-1 py-2 text-xs font-bold rounded-xl transition active:scale-95 touch-manipulation {type === 'pure_periodic' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}"
    >
      Periódico Puro
    </button>
    <button
      onclick={() => ontypechange('mixed_periodic')}
      class="flex-1 py-2 text-xs font-bold rounded-xl transition active:scale-95 touch-manipulation {type === 'mixed_periodic' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}"
    >
      Periódico Mixto
    </button>
  </div>

  <!-- Presets -->
  <div class="space-y-1">
    <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Ejemplos escolares:</span>
    <div class="grid grid-cols-4 gap-1.5">
      {#each PRESETS[type] as preset}
        <button
          onclick={() => onpartschange(preset.parts)}
          class="py-2 px-1 text-center font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:border-blue-400 active:scale-95 touch-manipulation min-h-[44px]"
        >
          {preset.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Inputs manuales -->
  <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-xs font-bold">
    <label class="flex flex-col items-center">
      <span class="text-[10px] text-slate-500 mb-0.5">Entero</span>
      <input
        type="number"
        min="0"
        max="99"
        value={parts.whole}
        oninput={(e) => onpartschange({ ...parts, whole: Math.max(0, parseInt((e.target as HTMLInputElement).value || '0', 10)) })}
        class="w-14 p-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-bold"
      />
    </label>

    <span class="text-xl font-bold self-end pb-1 text-slate-400">,</span>

    {#if type === 'exact' || type === 'mixed_periodic'}
      <label class="flex flex-col items-center">
        <span class="text-[10px] text-amber-600 dark:text-amber-400 mb-0.5">{type === 'exact' ? 'Decimales' : 'Anteperíodo'}</span>
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="3"
          value={parts.nonPeriodic}
          oninput={(e) => onpartschange({ ...parts, nonPeriodic: (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 3) || '0' })}
          class="w-16 p-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-amber-300 dark:border-amber-700/80 rounded-lg text-slate-900 dark:text-slate-100 font-bold"
        />
      </label>
    {/if}

    {#if type === 'pure_periodic' || type === 'mixed_periodic'}
      <label class="flex flex-col items-center">
        <span class="text-[10px] text-pink-600 dark:text-pink-400 mb-0.5">Período (arco)</span>
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="2"
          value={parts.periodic}
          oninput={(e) => onpartschange({ ...parts, periodic: (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2) || '3' })}
          class="w-16 p-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-pink-300 dark:border-pink-700/80 rounded-lg text-slate-900 dark:text-slate-100 font-bold"
        />
      </label>
    {/if}
  </div>
</div>
