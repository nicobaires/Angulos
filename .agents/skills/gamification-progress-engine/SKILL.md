---
name: gamification-progress-engine
description: >-
  Motor de gamificación y progreso local en Svelte 5: deduplicación justa de estrellas, rachas pedagógicas y logros en localStorage.
---

# Skill: Motor de Gamificación y Progreso Local

## Propósito
Gestionar de manera robusta, pedagógica y desacoplada el progreso del estudiante (estrellas, racha, desafíos completados por módulo y medallas escolares) sin penalizaciones cognitivas ni frustración, operando 100% del lado del cliente en `localStorage` y siendo compatible con SSR de Astro 5 y testing en Vitest.

---

## 1. Principios Pedagógicos
1. **Pedagogía Positiva:** No se pierden estrellas ganadas. El error solo reinicia la racha momentánea (`recordFailure()`), funcionando como instancia de aprendizaje sin frustración punitiva.
2. **Deduplicación Justa:**
   - La primera vez que el alumno resuelve un desafío de un módulo, recibe `+1 estrella` (`newStar: true`) e incrementa la racha.
   - Si repite un desafío ya superado, la respuesta correcta es pedagógicamente neutral (`newStar: false`): refuerza el conocimiento sin duplicar estrellas artificialmente.
   - Los retos procedurales infinitos (como las ecuaciones de Módulo 4) siempre otorgan estrella al resolverse con éxito.
3. **Vitrina de Logros:** Desbloqueo automático por hitos de estrellas, racha y dominio curricular integral.

---

## 2. API y Contratos de `src/lib/pedagogical/progressStore.ts`

El store opera mediante la instancia singleton `progressStore`:

```typescript
export interface ModuleProgress {
  clasificacion: number[]; // Índices resueltos
  pares: number[];         // Índices canónicos [0..3]
  paralelas: number[];     // Índices resueltos [0..3]
  ecuaciones: number;      // Contador acumulado
  fracciones: number[];    // Índices resueltos [0..11]
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProgressData {
  stars: number;
  streak: number;
  bestStreak: number;
  modules: ModuleProgress;
  achievements: Record<string, number>; // id -> timestamp
}

// Métodos del singleton progressStore:
progressStore.state: ProgressData;
progressStore.subscribe(run: (data: ProgressData) => void): () => void;
progressStore.recordSuccess(
  mod: 'clasificacion' | 'pares' | 'paralelas' | 'ecuaciones' | 'fracciones',
  challengeIndex?: number
): { newStar: boolean };
progressStore.recordFailure(): void;
progressStore.resetProgress(): void;
```

---

## 3. Catálogo de Medallas (`ACHIEVEMENTS`)

Las 8 medallas escolares registradas en `progressStore.ts`:
- `primer_paso` (🎯 Primer Paso): Resolvé tu primer desafío (stars $\ge 1$).
- `racha_3` (🔥 ¡En Llamas!): 3 aciertos consecutivos.
- `racha_5` (⚡ Mente Imparable): 5 aciertos consecutivos.
- `maestro_clasificacion` (🧭 Explorador): Completá los 6 desafíos de Clasificación.
- `maestro_pares` (👥 Dúo Geométrico): Completá los 4 desafíos de Pares.
- `maestro_paralelas` (🛤️ Secante Ninja): Completá los 4 desafíos de Paralelas.
- `experto_algebra` (🧮 Mente Algebraica): Resolvé 3 ecuaciones con ángulos.
- `maestro_fracciones` (🍕 Poder Racional): Resolvé desafíos de Decimales a Fracción.

---

## 4. Componentes UI de Gamificación

- **Píldora y Modal de Progreso (`src/components/common/ProgressWidget.svelte`):**
  Muestra estrellas, fuego de racha y abre el modal accesible con la vitrina completa de las 8 medallas y opción de reinicio.
- **Insignia por Módulo (`src/components/common/ProgressBadge.svelte`):**
  Muestra el avance específico del módulo (ej.: `⭐ 3/4` o `⭐ Completado`) en el catálogo y cabeceras.
