---
name: gamification-progress-engine
description: >-
  Motor de gamificación y progreso local en Svelte 5: deduplicación justa de estrellas, rachas pedagógicas y logros en localStorage.
---

# Skill: Motor de Gamificación y Progreso Local

## Propósito
Gestionar de manera robusta, pedagógica y desacoplada el progreso del estudiante (estrellas, rachas, desafíos completados y medallas) sin penalizaciones cognitivas ni frustración, operando 100% del lado del cliente en `localStorage` y siendo compatible con SSR de Astro 5 y testing en Vitest.

---

## 1. Principios Pedagógicos
1. **Pedagogía Positiva:** No hay penalización por error (no se pierden estrellas ni vidas). El error es una instancia de aprendizaje.
2. **Deduplicación Justa:** 
   - Resolver un desafío predeterminado por primera vez otorga `+1 estrella` y aumenta la racha (`streak`).
   - Repetir un desafío ya completado muestra retroalimentación de éxito (`✔️ Desafío ya completado`), pero **no** vuelve a sumar estrellas ni inflar la racha artificialmente (comportamiento neutral).
   - Los retos con generación procedural o exámenes integradores (`exam-*`, `eq-*`) siempre otorgan estrella al resolverse correctamente.
3. **Resiliencia de Racha:** La racha se evalúa por día de actividad o hitos continuos sin reset punitivo abrupto.

---

## 2. Arquitectura de `progressStore.ts`

El store debe ser agnóstico del compilador Svelte en tests unitarios puros (patrón `subscribe(run)`), permitiendo suscripciones con `$progressStore` en componentes Svelte y lecturas directas en Node/Vitest.

```typescript
export interface UserProgress {
  stars: number;
  completedChallenges: string[]; // Set de IDs de desafíos completados
  unlockedAchievements: string[]; // IDs de medallas obtenidas
  streak: number;
  lastActiveDate: string;
}

// Interfaz del Store
export interface ProgressStore {
  subscribe: (run: (value: UserProgress) => void) => () => void;
  recordSuccess: (challengeId?: string) => { newStar: boolean };
  recordExamCompletion: (score: number, total: number) => { newStar: boolean };
  resetProgress: () => void;
  getState: () => UserProgress;
}
```

---

## 3. Manejo Seguro de SSR y LocalStorage

Para evitar desincronizaciones e hidrataciones fallidas en Astro:
1. Verificar siempre `typeof window !== 'undefined'` antes de acceder a `localStorage`.
2. Proporcionar un estado por defecto válido para renderizado en servidor.
3. Cargar el estado real en el cliente inmediatamente en la inicialización o en `onMount()`.
4. Manejar excepciones con `try/catch` para entornos con cookies/almacenamiento bloqueado (modo incógnito estricto).

```typescript
const STORAGE_KEY = 'angulos_student_progress_v1';

function loadState(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}
```

---

## 4. Banco de Logros e Insignias (`ACHIEVEMENTS_LIST`)

Los logros deben reflejar hitos curriculares y de dedicación:
- `first_star`: "Primer Paso" (1 estrella).
- `three_streak`: "En Racha" (3 aciertos consecutivos).
- `classifier_master`: "Ojo Geométrico" (Todos los desafíos del clasificador).
- `pairs_master`: "Dúo Dinámico" (Desafíos de pares de ángulos).
- `transversal_master`: "Líneas Paralelas" (Desafíos de rectas paralelas y transversal).
- `equation_pro`: "Álgebra Geométrica" (5 ecuaciones resueltas).
- `diploma_earned`: "Graduado en Geometría" (Examen integrador aprobado).

---

## 5. Buenas Prácticas en Componentes UI
- Notificar al alumno de forma diferenciada:
  - Nueva estrella: `⭐ ¡+1 Estrella conseguida!`
  - Desafío ya superado: `✔️ ¡Muy bien! Desafío ya completado anteriormente.`
- Mantener los componentes de gamificación (`StarCounter.svelte`, `AchievementBadge.svelte`) $\le 100$ líneas y desacoplados de la lógica de evaluación geométrica.
