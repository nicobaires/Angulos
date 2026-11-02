# Spec 09: KaTeX local, Examen sin sesgos y Metadatos fuera de `lib/math`

## Objetivo
Tres mejoras chicas e independientes, ordenadas por prioridad. Cada parte es un commit (o PR) propio y se puede aprobar por separado.

- **Parte A:** que las fórmulas no dependan de un CDN (requisito de la PWA offline del Spec 07).
- **Parte B:** que el examen no se pueda aprobar adivinando por las opciones.
- **Parte C:** sacar la presentación (colores y clases de Tailwind) de `src/lib/math/angles.ts`.

Rama sugerida: `chore/spec-09` desde `dev`. **No hay merge a `main`** salvo orden explícita del Arquitecto (AGENTS.md).

---

## Parte A: KaTeX empaquetado con la app

### Diagnóstico
`Layout.astro` carga el CSS de KaTeX desde `cdn.jsdelivr.net`. Si el CDN no responde (red escolar con filtros, sin conexión, CDN caído), KaTeX igual genera el HTML, pero sin su CSS las fórmulas se ven **duplicadas y rotas** (por ejemplo `2x + 66°2x+66∘`). KaTeX ya es dependencia directa del proyecto (`Math.svelte` importa `katex`), así que el CSS y las fuentes ya están en `node_modules/katex/dist/`.

### Cambios
1. Quitar de `Layout.astro` el `<link>` al CDN.
2. Importar el CSS desde el paquete: `import 'katex/dist/katex.min.css';` en el frontmatter de `Layout.astro` (junto a `global.css`). Vite empaqueta el CSS y copia las fuentes a `dist/`.
3. Verificar que las fuentes se sirven desde el propio dominio (`/_astro/KaTeX_*.woff2`). Para no cargar formatos de más, se puede limitar a `woff2` si la lista de navegadores objetivo lo permite (decisión del Arquitecto).
4. Quitar la referencia al CDN de cualquier otro lugar (`grep -rn jsdelivr src public`).

### Criterios de aceptación
- `grep -rn "jsdelivr" src public dist` no devuelve resultados.
- Con la red externa bloqueada (DevTools > Network > bloquear dominio, o sin internet con `pnpm preview`), las fórmulas se ven bien en las 5 páginas y en `/examen`.
- Sin diferencias visuales respecto de hoy en mobile (360 px) ni escritorio (1280 px), en claro y oscuro.
- El peso del CSS y las fuentes se anota en `MEMORY.md` (referencia para el presupuesto de la PWA).

---

## Parte B: Examen sin sesgos de opciones

### Diagnóstico
En `examGenerator.ts`, la pregunta 1 arma las opciones incorrectas con `pool.filter(...).slice(0, 3)`. Como "Cóncavo" es el último del pool, **solo aparece cuando es la respuesta correcta**: si el alumno la ve entre las opciones, sabe que es esa. Nulo y Completo nunca aparecen. Los distractores de las preguntas 4 y 5 son desplazamientos arbitrarios (`x+3`, `x-4`), y la pregunta 5 ya da el valor de `x`, así que no hay ecuación que despejar.

### Cambios
1. **Pregunta 1:** sortear los 3 distractores del pool completo con el `rng` inyectado (`shuffle` del pool, filtrar el correcto, tomar 3). Ampliar la lista de ángulos a los 7 tipos: agregar nulo (0°) y completo (360°). Con 7 tipos, nunca se pregunta uno que no pueda resolverse con un transportador de 0° a 360°.
2. **Pregunta 3:** pasar de 2 casos a 4 (alternos internos, conjugados internos, alternos externos, correspondientes), con distractores que incluyan la relación equivocada más típica de cada uno.
3. **Pregunta 4:** los distractores salen de errores típicos, no de desplazamientos arbitrarios. Ejemplos: no cambiar el signo al trasponer, sumar en vez de restar, o confundir `x` con la amplitud del ángulo. Cada distractor se genera con una función con nombre (`errorSignoTrasposicion`, etc.) para que el test pueda comprobar que existe.
4. **Pregunta 5:** reemplazarla por una ecuación de **suplementarios o complementarios con despeje** (`(2x + 10°) + (x + 20°) = 180°`, ¿cuánto mide el mayor?). Debe obligar a plantear y resolver, y tiene que seguir reutilizando los generadores de `lib/math/equations/` (sin duplicar lógica).
5. La explicación de cada pregunta sigue indicando el error típico ("Atención: ...").

### Test que protege el examen (se escribe primero)
En `examGenerator.test.ts`, con 500 semillas:
- Toda etiqueta que aparece como respuesta correcta en la pregunta 1 también aparece como incorrecta en otras semillas (ninguna etiqueta delata la respuesta).
- La pregunta 1 cubre los 7 tipos de ángulo como respuesta correcta.
- La pregunta 3 cubre los 4 casos.
- Ninguna pregunta tiene opciones duplicadas ni más de una correcta (ya existe; se mantiene).
- El examen sigue siendo determinista con semilla fija.

### Texto del diploma (decisión del Arquitecto)
El certificado dice "Certificado de Aprobación" y "Acreditación 2° Año", lo que puede parecer una acreditación oficial. Proponer `Certificado de Práctica` y `Completaste el examen de práctica de Geometría de Ángulos`. El nombre del alumno sigue sin guardarse (solo estado del componente).

---

## Parte C: Metadatos de presentación fuera de `lib/math`

### Diagnóstico
`src/lib/math/angles.ts` (198 líneas, tope 210) incluye en `getAngleClassification` datos de presentación: `colorName`, `colorHex`, `bgClass` y `badgeClass` (clases de Tailwind). AGENTS.md define `lib/math/` como lógica pura sin marcado ni estilos. Fuera de esa archivo, la información se consume en `AngleCard.svelte` (`badgeClass`, `colorName`), en `Protractor.svelte` (`colorHex`) y en `AngleClassifier.svelte`; `examGenerator.ts` solo usa `name`. `bgClass` no parece usarse fuera de `angles.ts` (verificar).

### Cambios
1. En `lib/math/angles.ts`, `getAngleClassification` devuelve solo lo geométrico: `type`, `name`, `description`.
2. Nuevo archivo `src/lib/pedagogical/angleStyles.ts` (~50 líneas): una tabla `ANGLE_STYLES: Record<AngleClassification, { colorName; colorHex; badgeClass }>` y `getAngleStyle(type)`. Si `bgClass` no se usa, se elimina.
3. `AngleClassifier.svelte` deriva `style = getAngleStyle(info.type)` y se lo pasa a `AngleCard` y `Protractor`. Los colores son los mismos de hoy.
4. `angles.ts` baja de ~198 a ~120 líneas.
5. Test nuevo: toda clasificación tiene un estilo definido y `colorHex` es un color hexadecimal válido.

### Criterios de aceptación
- Sin cambios visuales en el módulo 1 (transportador, tarjeta, colores) en claro y oscuro.
- `lib/math/` no contiene clases de Tailwind ni colores.

---

## Criterios Globales
1. `pnpm test`, `pnpm run check` y `pnpm run build` pasan sin errores.
2. Ningún archivo nuevo supera 130 líneas.
3. Vista mobile y escritorio sin regresiones.
4. `MEMORY.md` y `README.md` actualizados al cerrar cada parte.

## Plan de Trabajo (Mapa de Subagentes)
1. **`deployment_agent`:** Parte A (import de KaTeX, prueba con red bloqueada, medición de peso).
2. **`pedagogical_agent`:** Parte B (test primero, luego generadores, textos del diploma).
3. **`geometry_math_agent`:** Parte C, extracción de la tabla de estilos.
4. **`svelte_ui_agent`:** ajuste de `AngleClassifier`, `AngleCard` y `Protractor` en la Parte C.
5. **Cierre:** actualizar `MEMORY.md` y marcar el Spec 09 en el roadmap del Spec 07.

## Fuera de Alcance (candidatos a Spec 10)
- PWA offline (Spec 07, ítem 4): arranca cuando la Parte A esté aprobada, porque cachea el CSS y las fuentes locales.
- Migrar `progressStore.ts` a un módulo `.svelte.ts` con Runes y revisar el manejo de errores de `localStorage`.
- Quitar `maximum-scale=1` y `user-scalable=no` del `<meta viewport>` (accesibilidad): afecta a mobile, requiere decisión explícita.
