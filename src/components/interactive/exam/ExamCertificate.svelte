<script lang="ts">
  import { progressStore } from '../../../lib/pedagogical/progressStore';

  interface Props {
    score: number;
    onretry: () => void;
  }

  let { score, onretry }: Props = $props();
  let studentName = $state<string>('');

  const isApproved = $derived(score >= 6);
  const evaluation = $derived(
    score === 10
      ? { title: '¡Sobresaliente! 🏆', color: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-100 text-amber-900 border-amber-300' }
      : score >= 8
        ? { title: '¡Distinguido! 🌟', color: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-100 text-blue-900 border-blue-300' }
        : score >= 6
          ? { title: '¡Aprobado! 📚', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
          : { title: '¡A seguir practicando! 💪', color: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-100 text-rose-900 border-rose-300' }
  );

  const formattedDate = $derived(
    new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date())
  );

  function handlePrint() {
    if (typeof window !== 'undefined') window.print();
  }
</script>

<div class="space-y-4 max-w-xl mx-auto select-none print:m-0 print:max-w-none print:p-0">
  <!-- Tarjeta del Certificado (Apta para Imprimir) -->
  <div class="p-6 sm:p-8 bg-amber-50/70 dark:bg-slate-900 border-4 border-double border-amber-300 dark:border-amber-700/80 rounded-3xl shadow-md text-center space-y-4 print:border-black print:bg-white print:text-black">
    <div class="text-3xl sm:text-4xl">🏛️</div>
    <div class="space-y-1">
      <span class="text-[10px] font-extrabold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Matemática • 2° Año Secundaria</span>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Certificado de Práctica</h2>
      <p class="text-xs text-slate-600 dark:text-slate-400">Examen de Práctica de Geometría de Ángulos</p>
    </div>

    <!-- Input de Nombre -->
    <div class="py-2 max-w-sm mx-auto print:hidden">
      <label for="student-name-input" class="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Nombre del estudiante para el diploma:</label>
      <input
        id="student-name-input"
        type="text"
        bind:value={studentName}
        placeholder="Escribí tu nombre y apellido"
        class="w-full p-2.5 text-center text-sm font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Nombre visible en Impresión -->
    <div class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b-2 border-dashed border-amber-300 dark:border-amber-600 pb-1 max-w-xs mx-auto">
      {studentName.trim() || 'Estudiante'}
    </div>

    <!-- Calificación Obtenida -->
    <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-amber-900/60 max-w-xs mx-auto space-y-1">
      <div class="text-xs font-bold text-slate-500 dark:text-slate-400">Calificación Final:</div>
      <div class="text-3xl font-black {evaluation.color}">{score} / 10</div>
      <div class="text-xs font-bold {evaluation.color}">{evaluation.title}</div>
    </div>

    <!-- Pie del Certificado -->
    <div class="pt-3 border-t border-amber-200/80 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-2">
      <span>📅 {formattedDate}</span>
      <span class="px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 bg-amber-100/50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[10px]">
        ★ Práctica 2° Año ★
      </span>
    </div>
  </div>

  <!-- Botones de Acción (Ocultos al Imprimir) -->
  <div class="flex gap-2 print:hidden justify-center text-xs font-bold">
    <button onclick={onretry} class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition active:scale-95 touch-manipulation min-h-[44px]">
      🔄 Volver a Rendir
    </button>
    {#if isApproved}
      <button onclick={handlePrint} class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition active:scale-95 touch-manipulation min-h-[44px] flex items-center gap-1.5">
        <span>🖨️</span><span>Imprimir / Guardar Diploma</span>
      </button>
    {/if}
    <a href="/" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition active:scale-95 touch-manipulation min-h-[44px] inline-flex items-center">
      Inicio ➔
    </a>
  </div>
</div>

