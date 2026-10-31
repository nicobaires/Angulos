# Spec 08: Refactor de `equations.ts` y Regla de Estrellas

## Objetivo
Dos mejoras chicas, de comportamiento externo casi idéntico, antes de empezar el Spec 07 (examen y certificado):

- **Parte A:** bajar `equations.ts` (205 líneas, a 5 del tope absoluto) a archivos chicos, sin cambiar lo que ve el alumno ni los ejercicios que genera.
- **Parte B:** que las estrellas premien resolver desafíos nuevos, no repetir el mismo.

Rama sugerida: `refactor/equations-y-estrellas`, creada desde `dev`. **No hay merge a `main`** salvo orden explícita del Arquitecto (AGENTS.md).

---

## Parte A: Refactor de `src/lib/math/equations.ts`

### Diagnóstico
Los 5 generadores repiten la misma receta y solo cambian datos:

| Tipo | Relación | Rango de x | Total | Particularidad |
|---|---|---|---|---|
| opuestos | igualdad | 12–19 | n/a | `b` entre 5 y 19 |
| alternos internos | igualdad | 10–16 | n/a | `b` entre 8 y 19; `diagramAngle` acotado |
| suplementarios | suma | 10–17 | 180 | |
| conjugados internos | suma | 10–17 | 180 | |
| complementarios | suma | 6–11 | 90 | |

Hay dos recetas reales (igualdad y suma). Lo demás es una tabla de configuración.

### Diseño propuesto
`equations.ts` pasa a ser una carpeta `src/lib/math/equations/`. Los imports existentes (`../../lib/math/equations`) siguen funcionando porque resuelven a `index.ts`.

- `types.ts` (~45 líneas): `EquationProblem`, tipos de relación, `Rng`, `createSeededRng`.
- `steps.ts` (~50 líneas): `formatSigned`, `buildEqualitySteps`, `buildSumSteps` (hoy ya existen).
- `catalog.ts` (~60 líneas): tabla `PROBLEM_SPECS` con id, título, regla textual, rangos, total, peso del sorteo y regla de `diagramAngle`.
- `builders.ts` (~70 líneas): `buildEqualityProblem(spec, rng)` y `buildSumProblem(spec, rng)`.
- `index.ts` (~40 líneas): reexporta la API pública y define `generateRandomProblem` leyendo los pesos del catálogo.

### Contrato que no puede cambiar
- Se mantienen los mismos nombres exportados: `generateOppositeEquationProblem`, `generateSupplementaryEquationProblem`, `generateComplementaryEquationProblem`, `generateAlternateInteriorEquationProblem`, `generateConsecutiveInteriorEquationProblem`, `generateRandomProblem`, `createSeededRng` y los tipos.
- **El orden de las llamadas a `rng()` no cambia.** Con la misma semilla, el refactor tiene que producir exactamente los mismos ejercicios que hoy (incluido el `id`).
- Los pesos del sorteo se mantienen: 22 % complementarios, 22 % alternos, 22 % conjugados, 17 % opuestos, 17 % suplementarios.
- Ningún componente `.svelte` se modifica en esta parte.

### Red de seguridad (se hace primero)
1. **Antes de tocar código:** agregar un test de regresión que, para cada generador y 20 semillas, compare la salida completa con un snapshot (`toMatchSnapshot` o JSON en línea). Se commitea con el código actual.
2. Refactorizar. El snapshot debe pasar **sin regenerarse**. Si hay que regenerarlo, el refactor cambió comportamiento y no se acepta.
3. Restaurar invariantes que los tests de `dev` perdieron respecto de la primera versión: `alphaSolution === a·x + b`, `betaSolution === c·x + d`, `x` entero, y que la última línea de `steps` contenga `x`, `α` y `β` correctos.

---

## Parte B: Regla de Estrellas

### Diagnóstico
`progressStore.recordSuccess` suma una estrella en cada acierto. Solo deduplica la lista de desafíos completados. Un alumno puede repetir el mismo desafío del banco fijo y seguir subiendo estrellas, racha y medallas (`racha_5`, por ejemplo).

### Regla propuesta (a validar por el Arquitecto)
- **Desafío del banco fijo** (clasificación, pares, paralelas): la estrella se otorga **solo la primera vez** que se resuelve ese desafío.
- **Repetir un desafío ya resuelto:** no suma estrella ni avanza la racha, **pero tampoco la corta**. Es neutro. El feedback pedagógico se muestra igual.
- **Ecuaciones:** cada problema es nuevo (generado), así que sigue sumando siempre.
- **Error:** igual que hoy: corta la racha y no resta estrellas.

### Cambios
- `progressStore.ts`: `recordSuccess` devuelve `{ newStar: boolean }`. No cambia la clave de almacenamiento (`angulos_progreso_v1`) ni el formato guardado: no hace falta migración.
- Los 4 módulos usan el valor devuelto: si `newStar` es `true`, muestran el banner `⭐ +1 Estrella conseguida`; si es `false`, muestran `✔️ Ya lo habías resuelto`.
- Tests nuevos en `progressStore.test.ts`: repetir un desafío no suma estrellas ni racha; repetir no corta la racha; un error después de repetir sí la corta; ecuaciones suma siempre.

### Verificación previa obligatoria
`main` aleatorizó los módulos 1 y 2, y `dev` ya lo incluye. Antes de implementar, el `svelte_ui_agent` debe comprobar qué representa hoy `currentStep` en `AngleClassifier.svelte` y `AnglePairs.svelte` (¿índice del banco o posición dentro de un sorteo?). La deduplicación solo es válida si identifica de forma estable al desafío. Si no lo es, hay que cambiar el identificador **antes** de aplicar la regla.

---

## Decisiones para el Arquitecto
1. ¿Repetir un desafío es **neutro** para la racha (recomendado) o cuenta como acierto de racha pero sin estrella?
2. ¿Querés que repetir muestre `✔️ Ya lo habías resuelto` o preferís no mostrar banner?

## Criterios de Aceptación
1. `pnpm test`, `pnpm run check` y `pnpm run build` pasan sin errores.
2. El snapshot de la Parte A pasa sin regenerarse.
3. Ningún archivo nuevo supera 130 líneas; `equations/` queda sin ningún archivo sobre ~80.
4. En el navegador: resolver dos veces el mismo desafío del banco da una sola estrella.
5. Vista mobile y escritorio sin cambios visuales (salvo el texto del banner al repetir).

## Plan de Trabajo (Mapa de Subagentes)
1. **`geometry_math_agent`:** snapshot de regresión y refactor de `equations/` (Parte A).
2. **`pedagogical_agent`:** regla de estrellas, textos de banners y tests del store (Parte B).
3. **`svelte_ui_agent`:** auditoría de `currentStep` y uso del valor devuelto en los 4 módulos.
4. **`deployment_agent`:** test, check, build y revisión manual mobile y escritorio.
5. **Cierre:** actualizar `MEMORY.md` y marcar el Spec 08 en el roadmap del Spec 07.

## Fuera de Alcance (candidatos a Spec 09)
- Migrar `progressStore.ts` a un módulo `.svelte.ts` con Runes (`$state`), alineado con el resto del proyecto.
- Reemplazar el `catch {}` vacío de `localStorage` por un manejo explícito.
- Examen integrador y certificado (Spec 07, ítem 3).
