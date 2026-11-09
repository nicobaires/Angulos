# Spec 11: Auditoría Periódica y Guardas Automáticas

## Objetivo
Que las reglas del proyecto (tamaño de archivos, calidad, documentación al día) se **verifiquen con comandos** y no dependan de que un agente se acuerde de cumplirlas, y dejar un procedimiento repetible de auditoría con dos modelos.

Rama sugerida: `chore/spec-11-guardas` desde `main`. **No hay merge a `main`** salvo orden explícita del Arquitecto (AGENTS.md).

## Diagnóstico (auditoría 2026-11-09, ver `.agents/auditorias/`)
- El protocolo dice "verificar límites de tamaño antes de escribir código", pero nada lo comprueba. Históricamente el tope se subió de ~130 a 210 cuando un archivo chocó con él.
- `netlify.toml` ejecuta solo `pnpm run build`. `astro build` no verifica tipos y no corre los tests. No hay CI (`.github/` solo tiene el banner).
- La documentación de agentes se desfasó: rutas inexistentes (`equations.ts` ahora es carpeta), un skill con símbolos que no existen, números de líneas escritos a mano que ya no coinciden. Una de cada tres commits es `docs:`.

---

## Parte A: Guardas de tamaño y de documentación

### A1. `scripts/check-size.mjs` (Node, sin dependencias nuevas)
- Recorre `src/**/*.{svelte,astro,ts}` excluyendo `*.test.ts` y cuenta líneas.
- Límites: **estándar 130**, **absoluto 210** (los de AGENTS.md). Lee `.agents/size-exceptions.json`.
- Formato de excepciones: `{ "src/ruta/archivo.ts": { "max": 170, "reason": "...", "approvedBy": "Arquitecto", "date": "AAAA-MM-DD" } }`.
- **Falla** (código de salida 1) si: un archivo supera 130 sin excepción; supera el `max` de su excepción; supera 210 en cualquier caso.
- **Avisa** (sin fallar) si: un archivo está entre 120 y 130 ("cerca del límite"); una excepción quedó obsoleta (el archivo ya está en ≤130).
- Imprime una tabla ordenada: `ARCHIVO | LÍNEAS | LÍMITE | ESTADO`.
- Estado inicial: `src/lib/math/angles.ts` tiene 166 líneas. Ver "Decisiones": se divide o se registra una excepción aprobada.

### A2. `scripts/check-docs.mjs` (opcional, recomendado)
- Extrae las rutas y nombres de archivo entre acentos graves en `AGENTS.md`, `MEMORY.md`, `README.md` y `.agents/**/*.md`, y comprueba que existan en el repo.
- En su primera versión **solo avisa** (no falla), para no frenar el trabajo mientras se limpia la documentación. Pasa a fallar cuando el listado esté en cero.

### A3. Scripts y hook
- `package.json`: `"check:size": "node scripts/check-size.mjs"`, `"check:docs": "node scripts/check-docs.mjs"`.
- `.githooks/pre-commit`: ejecuta `pnpm run check:size && pnpm test`. Se activa con `"prepare": "git config core.hooksPath .githooks || true"` (el `|| true` evita romper en entornos sin git, como el build de Netlify).

---

## Parte B: Puerta de calidad antes de publicar

- `package.json`: `"verify": "pnpm run check && pnpm run check:size && pnpm test && pnpm run build"`.
- `netlify.toml`: `command = "pnpm run verify"`. Si algo falla, Netlify **no publica** y el sitio queda en el último deploy bueno.
- **Opcional (decisión del Arquitecto):** `.github/workflows/ci.yml` que corra `pnpm run verify` en cada push y pull request, con Node 20 y `pnpm install --frozen-lockfile`. Da el resultado en GitHub antes de llegar a `main`.
- Antes de dar por cerrada cualquier tarea, el agente corre `pnpm run verify` y reporta el resultado.

---

## Parte C: AGENTS.md, subagentes y skills

### C1. Cambios en `AGENTS.md`
1. **Alcance de los límites:** aclarar que 130 líneas aplica a **todo** archivo de `src/` (`.svelte`, `.astro`, `.ts`), y 210 es el máximo absoluto. Hoy el texto dice "componente Svelte u orquestador" en un punto y "ningún archivo" en otro.
2. **Regla de parada:** "Si para cumplir la tarea un archivo va a superar 130 líneas, **detenete y consultá al Arquitecto antes de escribirlo**, explicando el motivo. La aprobación queda registrada en `.agents/size-exceptions.json`."
3. **Cierre de tarea:** correr `pnpm run verify` y pegar el resultado.
4. **Mapa de capas actualizado:** `src/lib/math/equations/` (carpeta), `src/lib/math/fractions/`, `src/lib/pedagogical/fractions/`, `progressStore.ts`, `examGenerator.ts`, `modulesCatalog.ts`.
5. **Números calculables:** prohibido escribir a mano conteos de líneas en `MEMORY.md` o `README.md`. Se citan con la salida de `check:size`.

### C2. Acciones por archivo de agentes
| Archivo | Acción propuesta |
|---|---|
| `subagents/pedagogical_agent.md`, `geometry_math_agent.md` | **Conservar y actualizar** rutas (`equations/`, `fractions/`). Son los que tienen reglas de dominio propias. |
| `subagents/astro_core_agent.md`, `tailwind_theme_agent.md`, `svelte_ui_agent.md`, `deployment_agent.md` | **Fusionar en una sección "Convenciones técnicas" de AGENTS.md** (~25 líneas). Si se conservan, corregir: Runes vs `progressStore.ts` (store manual), `min-h-[44px]` vs botones de 36 a 38 px, "validar TypeScript" → `pnpm run verify`, "4 módulos" → 5. |
| `skills/gamification-progress-engine/SKILL.md` | **Reescribir con la API real** (`ProgressData`, `recordSuccess(mod, índice)`, `ProgressBadge`, `ProgressWidget`) o eliminar. Hoy cita `AchievementBadge`, `StarCounter`, `UserProgress`, `getState`, `recordExamCompletion`, que no existen. |
| `skills/pwa-offline-packager/SKILL.md` | **Mover a `specs/` como borrador** (≤60 líneas) hasta que la PWA exista. Es el archivo de agentes más largo (155 líneas) y describe algo no construido. |
| `skills/exercise-generator`, `latex-equation-builder`, `svg-angle-render` | Revisar contra el código en la próxima auditoría. |
| `MEMORY.md` | Reestructurar: estado, decisiones y por qué, sin números calculables. Quitar la línea del preconnect a `cdn.jsdelivr.net` (obsoleta desde el Spec 09) y la afirmación "todos los componentes ≤126 líneas" (hoy `AnglePairs.svelte` tiene 129). |

---

## Parte D: Procedimiento de auditoría

1. **Cuándo:** antes de cada merge a `main` de una unidad temática nueva, después de cada ~5 specs, y cuando cambien las reglas de los agentes.
2. **Quién:** dos modelos de **familias distintas** (por ejemplo, Opus y Gemini 3.8 Flash, o Argon si hay acceso). El modelo que escribió la mayor parte de un cambio no es el único que lo audita.
3. **Cómo:**
   1. Correr `pnpm run verify` y guardar la salida.
   2. Pegar `.agents/prompts/auditoria.md` (Pasada A) en cada auditor, con acceso de solo lectura.
   3. Guardar los informes en `.agents/auditorias/AAAA-MM-DD_<modelo>.md`.
   4. **Cruce:** lo que aparece en ambos informes es prioridad alta. Lo que aparece en uno solo se verifica con la Pasada B o a mano.
   5. **Triage del Arquitecto:** una tabla con `ID | decisión (aceptar/rechazar/posponer) | fecha | spec destino`, al final de cada informe.
   6. Los hallazgos aceptados pasan a specs numerados.
4. **Calidad mínima de un informe:** cada hallazgo con evidencia (`archivo:línea` o salida de comando), secciones "Lo que está bien" y "Lo que no pudiste revisar", y comandos ejecutados.

---

## Criterios de Aceptación
1. `pnpm run check:size` falla con un archivo temporal de 131 líneas, pasa al eliminarlo y respeta las excepciones registradas. Probarlo sin commitear el archivo temporal.
2. `pnpm run verify` pasa en limpio y **falla** si se introduce a propósito un error de tipos en un `.svelte`.
3. `netlify.toml` usa `verify`; un error en la rama de prueba impide el deploy.
4. `AGENTS.md` incorpora los 5 cambios de C1. `check:docs` no informa rutas inexistentes en `AGENTS.md`, subagentes ni skills.
5. `MEMORY.md` sin conteos de líneas escritos a mano.
6. La primera auditoría cruzada está ejecutada y triada.

## Plan de Trabajo (Mapa de Subagentes)
1. **`deployment_agent`:** scripts A1 a A3, `verify`, `netlify.toml`, CI opcional.
2. **`geometry_math_agent`:** dividir `angles.ts` si se elige esa opción (ver decisiones).
3. **`pedagogical_agent` / Arquitecto:** reescritura del skill de gamificación y limpieza de `MEMORY.md`.
4. **Cierre:** actualizar `MEMORY.md` y `README.md` (sección "Calidad y auditoría").

## Decisiones para el Arquitecto
1. **Límite para archivos `.ts` de lógica:** ¿130 para todo (recomendado, simple) o un límite distinto para lógica?
2. **`angles.ts` (166 líneas):** ¿se **divide** (mover las descripciones de clasificación a una tabla en `pedagogical/`, recomendado) o se registra una **excepción aprobada**?
3. **Subagentes:** ¿se fusionan 4 de 6 en AGENTS.md (recomendado) o se conservan?
4. **CI en GitHub:** ¿se activa además de Netlify?
5. **Quién ejecuta la auditoría y con qué frecuencia** (propuesta: dos modelos, antes de cada merge de unidad).

## Fuera de Alcance (Spec 12: arreglos de código de la auditoría)
Identidad posicional de desafíos de Pares, pregunta 3 del examen, accesibilidad (zoom, `aria` en SVG, botones de 36 a 38 px), duplicación en `equations/builders.ts`, robustez de `progressStore`, PWA.
