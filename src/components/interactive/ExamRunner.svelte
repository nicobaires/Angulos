<script lang="ts">
  import { onMount } from 'svelte';
  import { generateExamDeck, type ExamQuestion } from '../../lib/pedagogical/examGenerator';
  import { createSeededRng } from '../../lib/math/equations';
  import ExamQuiz from './exam/ExamQuiz.svelte';
  import ExamCertificate from './exam/ExamCertificate.svelte';

  let stage = $state<'intro' | 'quiz' | 'certificate'>('intro');
  let deck = $state<ExamQuestion[]>(generateExamDeck(createSeededRng(2024)));
  let score = $state<number>(0);

  onMount(() => {
    deck = generateExamDeck();
  });

  function startExam() {
    deck = generateExamDeck();
    score = 0;
    stage = 'quiz';
  }

  function handleComplete(finalScore: number) {
    score = finalScore;
    stage = 'certificate';
  }
</script>

<div class="w-full select-none p-4 sm:p-6 max-w-xl mx-auto">
  {#if stage === 'intro'}
    <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-center space-y-4">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-3xl flex items-center justify-center mx-auto shadow-md">
        🎓
      </div>
      <div>
        <h2 class="text-xl font-black text-slate-900 dark:text-slate-100">Examen Integrador de Geometría</h2>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Evaluá todo lo aprendido en los 4 módulos de 2° Año</p>
      </div>

      <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-left space-y-1.5 text-slate-700 dark:text-slate-300">
        <div class="font-bold text-slate-900 dark:text-slate-100">Reglas de la evaluación:</div>
        <div>• <strong>5 preguntas</strong> de opción múltiple (1 de cada tema clave).</div>
        <div>• Cada respuesta correcta suma <strong>2 puntos</strong> (calificación sobre 10).</div>
        <div>• Al aprobar con <strong>6 o más</strong>, obtenés tu diploma escolar imprimible.</div>
      </div>

      <button
        onclick={startExam}
        class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition active:scale-95 touch-manipulation min-h-[48px]"
      >
        🚀 Comenzar Examen Ahora
      </button>
    </div>
  {:else if stage === 'quiz'}
    <ExamQuiz {deck} oncomplete={handleComplete} />
  {:else if stage === 'certificate'}
    <ExamCertificate {score} onretry={startExam} />
  {/if}
</div>
