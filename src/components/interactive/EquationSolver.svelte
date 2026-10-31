<script lang="ts">
  import { onMount } from 'svelte';
  import { generateRandomProblem, createSeededRng, type EquationProblem } from '../../lib/math/equations';
  import EquationDiagram from './equations/EquationDiagram.svelte';
  import StepSolver from './equations/StepSolver.svelte';
  import EquationFeedback from './equations/EquationFeedback.svelte';

  // Ejercicio inicial determinista: el HTML del build (SSG) y la hidratación del cliente
  // coinciden. Recién al montar se sortea uno aleatorio para el alumno.
  let problem = $state<EquationProblem>(generateRandomProblem(createSeededRng(2024)));
  let currentStep = $state<1 | 2 | 3 | 'done'>(1);

  function handleAdvance(nextStep: 1 | 2 | 3 | 'done') {
    currentStep = nextStep;
  }

  onMount(() => {
    problem = generateRandomProblem();
  });

  function handleNewProblem() {
    problem = generateRandomProblem();
    currentStep = 1;
  }
</script>

<div class="flex flex-col w-full select-none">
  <!-- Cabecera -->
  <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
    <div>
      <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Módulo 4</span>
      <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">Ecuaciones con Ángulos</h2>
    </div>
    <span class="text-xs font-bold px-2.5 py-1 bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 rounded-full border border-violet-200 dark:border-violet-800/60">
      {problem.title}
    </span>
  </div>

  <!-- Diagrama Geométrico SVG con Expresiones -->
  <EquationDiagram {problem} />

  <!-- Asistente de Pasos -->
  <StepSolver {problem} {currentStep} onadvance={handleAdvance} />

  <!-- Feedback y Controles de Solución -->
  <EquationFeedback {problem} {currentStep} onnewproblem={handleNewProblem} />
</div>

