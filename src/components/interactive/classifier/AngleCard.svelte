<script lang="ts">
  import type { AngleClassificationInfo } from '../../../lib/math/angles';
  import Katex from '../../common/Math.svelte';

  interface Props {
    info: AngleClassificationInfo;
  }

  let { info }: Props = $props();
</script>

<div class="p-4 mx-4 mb-4 rounded-2xl border shadow-sm transition-all select-none {info.badgeClass}">
  <div class="flex items-center justify-between mb-1.5">
    <span class="text-xs font-bold uppercase tracking-wider">Clasificación</span>
    <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-white/70 shadow-xs">
      {info.colorName}
    </span>
  </div>

  <h3 class="text-lg font-black tracking-tight">{info.name}</h3>

  <div class="my-1.5 py-1 px-2.5 bg-white/80 rounded-lg inline-flex items-center text-sm font-semibold">
    {#if info.type === 'nulo'}
      <Katex formula="\alpha = 0^\circ" />
    {:else if info.type === 'agudo'}
      <Katex formula="0^\circ < \alpha < 90^\circ" />
    {:else if info.type === 'recto'}
      <Katex formula="\alpha = 90^\circ" />
    {:else if info.type === 'obtuso'}
      <Katex formula="90^\circ < \alpha < 180^\circ" />
    {:else if info.type === 'llano'}
      <Katex formula="\alpha = 180^\circ" />
    {:else if info.type === 'concavo'}
      <Katex formula="180^\circ < \alpha < 360^\circ" />
    {:else}
      <Katex formula="\alpha = 360^\circ" />
    {/if}
  </div>

  <p class="text-xs mt-1 leading-relaxed opacity-95">
    {info.description}
  </p>

  <!-- Pista didáctica de la vida real -->
  <div class="mt-2.5 pt-2 border-t border-current/15 text-[11px] font-medium flex items-center gap-1.5 opacity-90">
    <span>💡</span>
    <span>
      {#if info.type === 'agudo'}
        Fijate: una porción de pizza común suele tener un ángulo agudo (entre 40° y 50°).
      {:else if info.type === 'recto'}
        La esquina de tu cuaderno o las paredes de tu aula forman ángulos rectos de 90°.
      {:else if info.type === 'obtuso'}
        Un abanico abierto más de la cuenta o el respaldo reclinado de una silla son obtusos.
      {:else if info.type === 'llano'}
        Los dos brazos extendidos hacia los lados en cruz forman un ángulo llano.
      {:else if info.type === 'concavo'}
        Es la parte exterior de la porción de pizza que ya comiste.
      {:else if info.type === 'completo'}
        Como las agujas del reloj cuando vuelven a encontrarse a las 12 tras dar una vuelta.
      {:else}
        Cuando el transportador está completamente cerrado sobre sí mismo.
      {/if}
    </span>
  </div>
</div>
