<script lang="ts">
  import { RELATIONS_MAP, type TransversalRelation } from '../../../lib/math/transversal';
  import Katex from '../../common/Math.svelte';

  interface Props {
    relation: TransversalRelation;
    theta: number;
  }

  let { relation, theta }: Props = $props();

  const rel = $derived(RELATIONS_MAP[relation]);
  const obtuse = $derived(180 - theta);
</script>

<div class="p-4 mx-4 mb-4 rounded-2xl border bg-white shadow-xs select-none">
  <!-- Cabecera de la ficha -->
  <div class="flex items-center justify-between mb-1">
    <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Relación entre Paralelas</span>
    <span class="text-xs px-2.5 py-0.5 rounded-full font-bold {rel.isCongruent ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-800'}">
      {rel.isCongruent ? 'Congruentes (Iguales)' : 'Suplementarios (180°)'}
    </span>
  </div>

  <h3 class="text-base font-black text-slate-900">{rel.name}</h3>
  <p class="text-xs text-slate-600 mt-0.5">{rel.description}</p>

  <!-- Fórmulas KaTeX -->
  <div class="my-2 p-2.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center gap-1.5 text-sm font-semibold text-slate-800">
    <div class="text-xs text-slate-500 font-bold uppercase">Propiedad Teórica:</div>
    <Katex formula={rel.formula} />
    
    <div class="mt-1 pt-1.5 border-t border-slate-200/80 w-full flex items-center justify-center gap-2 text-xs font-bold text-blue-900">
      {#if rel.isCongruent}
        <span>Valores en pantalla:</span>
        <Katex formula={`\\text{Pares destacados} = ${theta}^\\circ`} />
      {:else}
        <span>Suma en pantalla:</span>
        <Katex formula={`${theta}^\\circ + ${obtuse}^\\circ = 180^\\circ`} />
      {/if}
    </div>
  </div>

  <div class="mt-2 text-[11px] text-slate-600 flex items-center gap-1.5">
    <span>💡</span>
    <span>{rel.rule}</span>
  </div>
</div>
