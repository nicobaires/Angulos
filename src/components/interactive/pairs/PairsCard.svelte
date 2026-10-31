<script lang="ts">
  import type { PairType } from '../../../lib/math/pairs';
  import Katex from '../../common/Math.svelte';

  interface Props {
    mode: PairType;
    alpha: number;
  }

  let { mode, alpha }: Props = $props();

  const beta = $derived(mode === 'complementarios' ? 90 - alpha : 180 - alpha);
</script>

<div class="p-4 mx-4 mb-4 rounded-2xl border bg-white shadow-xs select-none">
  {#if mode === 'complementarios'}
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Propiedad</span>
      <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700">Recto (90°)</span>
    </div>
    <h3 class="text-base font-black text-slate-900">Ángulos Complementarios</h3>

    <div class="my-2 p-2 bg-slate-50 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-slate-800">
      <Katex formula={`\\alpha + \\beta = 90^\\circ`} />
      <span class="text-slate-400">→</span>
      <Katex formula={`${alpha}^\\circ + ${beta}^\\circ = 90^\\circ`} />
    </div>

    <p class="text-xs text-slate-600 leading-relaxed">
      Dos ángulos son <strong>complementarios</strong> si al unirse forman un ángulo recto exacto de 90°.
    </p>

    <div class="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-1.5">
      <span>💡</span>
      <span>Fijate: cada uno de ellos es siempre agudo (menor a 90°).</span>
    </div>

  {:else if mode === 'suplementarios'}
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">Propiedad</span>
      <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800">Llano (180°)</span>
    </div>
    <h3 class="text-base font-black text-slate-900">Ángulos Suplementarios y Adyacentes</h3>

    <div class="my-2 p-2 bg-slate-50 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-slate-800">
      <Katex formula={`\\alpha + \\beta = 180^\\circ`} />
      <span class="text-slate-400">→</span>
      <Katex formula={`${alpha}^\\circ + ${beta}^\\circ = 180^\\circ`} />
    </div>

    <p class="text-xs text-slate-600 leading-relaxed">
      Son <strong>suplementarios</strong> porque suman 180°. Como comparten el vértice y un lado en común, son también <strong>adyacentes</strong> (forman una línea recta).
    </p>

    <div class="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-1.5">
      <span>💡</span>
      <span>Si uno de los dos es agudo, el otro necesariamente tiene que ser obtuso.</span>
    </div>

  {:else}
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Propiedad</span>
      <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-800">Congruencia</span>
    </div>
    <h3 class="text-base font-black text-slate-900">Opuestos por el Vértice</h3>

    <div class="my-2 p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1.5 text-sm font-semibold text-slate-800">
      <div class="flex items-center gap-2">
        <span class="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Par Azul:</span>
        <Katex formula={`\\hat{1} = \\hat{3} = ${alpha}^\\circ`} />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">Par Ámbar:</span>
        <Katex formula={`\\hat{2} = \\hat{4} = ${180 - alpha}^\\circ`} />
      </div>
    </div>

    <p class="text-xs text-slate-600 leading-relaxed">
      Los rayos de uno son semirrectas opuestas a los del otro. <strong>¡Siempre miden exactamente lo mismo!</strong>
    </p>

    <div class="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-1.5">
      <span>💡</span>
      <span>Como una tijera al abrirse: las puntas y los mangos se abren con el mismo ángulo.</span>
    </div>
  {/if}
</div>

