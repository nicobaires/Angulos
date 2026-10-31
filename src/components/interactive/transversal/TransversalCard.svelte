<script lang="ts">
  import { RELATIONS_MAP, type TransversalRelation } from '../../../lib/math/transversal';
  import Katex from '../../common/Math.svelte';

  interface Props {
    relation: TransversalRelation | null;
    theta: number;
  }

  let { relation, theta }: Props = $props();

  const rel = $derived(relation ? RELATIONS_MAP[relation] : null);
  const obtuse = $derived(180 - theta);
</script>

<div class="p-4 mx-4 mb-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs select-none transition-colors">
  {#if rel}
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Relación entre Paralelas</span>
      <span class="text-xs px-2.5 py-0.5 rounded-full font-bold {rel.isCongruent ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'}">
        {rel.isCongruent ? 'Congruentes (Iguales)' : 'Suplementarios (180°)'}
      </span>
    </div>

    <h3 class="text-base font-black text-slate-900 dark:text-slate-100">{rel.name}</h3>
    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{rel.description}</p>

    <div class="my-2 p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex flex-col items-center justify-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
      <div class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Propiedad Teórica:</div>
      <Katex formula={rel.formula} />
      
      <div class="mt-1 pt-1.5 border-t border-slate-200 dark:border-slate-700 w-full flex items-center justify-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300">
        {#if rel.isCongruent}
          <span>Valores en pantalla:</span>
          <Katex formula={`\\text{Pares destacados} = ${theta}^\\circ`} />
        {:else}
          <span>Suma en pantalla:</span>
          <Katex formula={`${theta}^\\circ + ${obtuse}^\\circ = 180^\\circ`} />
        {/if}
      </div>
    </div>

    <div class="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
      <span>💡</span>
      <span>{rel.rule}</span>
    </div>
  {:else}
    <div class="py-2 text-center space-y-1">
      <div class="text-2xl">📐</div>
      <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">Exploración de Relaciones</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
        Tocá cualquiera de los botones de arriba (Alternos, Correspondientes, Conjugados) para ver cómo se relacionan los ángulos.
      </p>
    </div>
  {/if}
</div>
