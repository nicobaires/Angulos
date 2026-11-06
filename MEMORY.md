# MEMORY.md - Estado del Proyecto

## Estado Actual
- **Fase:** Unidad 1 (Geometría de Ángulos) completa con 4 módulos y Examen Integrador con diploma. Unidad 2 (Números Racionales y Fracciones) inaugurada con Módulo 1 (Pasaje de Decimal a Fracción: exactos, periódicos puros y mixtos con paso a paso y desafíos interactivos gamificados). Suite de 56 tests unitarios en Vitest pasando al 100%, build de Astro estático impecable y catálogo de 5 AGY Skills.
- **Rama Activa:** `feature/fracciones-decimales` (Gobernanza estricta: merge a `main` o `dev` solo con orden explícita del Arquitecto Principal).
- **Stack seleccionado:** Astro 5, Svelte 5 (Runes), Tailwind CSS (darkMode: 'class'), KaTeX (empaquetado localmente), Vitest, pnpm, Netlify.

## Módulos de Aprendizaje
### Unidad 1: Geometría de Ángulos
- [x] Módulo 1: Clasificación según medida (.agents/specs/01_clasificacion_angulos.md)
- [x] Módulo 2: Pares de ángulos (.agents/specs/02_pares_angulos.md)
- [x] Módulo 3: Paralelas cortadas por una secante (.agents/specs/03_paralelas_secante.md)
- [x] Módulo 4: Ecuaciones con ángulos (.agents/specs/04_ecuaciones_angulos.md)
  - [x] Variante opuestos por el vértice ($\alpha = \beta$)
  - [x] Variante adyacentes suplementarios ($\alpha + \beta = 180^\circ$)
  - [x] Variante complementarios con símbolo de 90° ($\alpha + \beta = 90^\circ$)
  - [x] Variante paralelas con alternos internos ($\alpha = \beta$)
  - [x] Variante paralelas con conjugados internos ($\alpha + \beta = 180^\circ$)
- [x] Examen Integrador Final y Diploma escolar imprimible (`/examen`)

### Unidad 2: Números Racionales y Fracciones
- [x] Módulo 1: Pasaje de Decimal a Fracción (.agents/specs/10_fracciones_decimales_a_fraccion.md)
  - [x] Números decimales exactos / finitos ($10^k$ en denominador)
  - [x] Números periódicos puros ($\widehat{\dots}$ con nueves en denominador)
  - [x] Números periódicos mixtos (anteperíodo y período con nueves seguidos de ceros)
  - [x] Algoritmo euclidiano de MCD y simplificación a fracción irreducible
  - [x] Visualizador semántico con desglose visual por colores y arco KaTeX
  - [x] Explicación paso a paso de la regla escolar argentina con sustracción
  - [x] Modo Desafío interactivo con 12 retos equilibrados y gamificación (estrellas y racha)
- [x] Soporte Global: Modo Oscuro con persistencia en localStorage y switch accesible en encabezados.
- [x] Gamificación y Progreso Escolar Local: Store con suscriptores (`progressStore.ts`), persistencia en `localStorage`, contador de estrellas (`⭐`), racha (`🔥`), vitrina de 7 medallas escolares (`ProgressWidget.svelte`) y badges de avance en la portada (`ProgressBadge.svelte`).
- [x] Deduplicación Justa de Estrellas (Spec 08): Primer éxito otorga estrella y racha; reintentos de retos ya superados son pedagógicamente neutrales (`✔️ Desafío ya completado`); retos de ecuaciones y exámenes siempre otorgan estrellas.
- [x] Examen Integrador Final y Diploma: Ruta `/examen` (`examen.astro`), generador procedural (`examGenerator.ts`), quiz dinámico de 5 preguntas (`ExamQuiz.svelte`), diploma escolar con calificación 1-10 y botón de impresión optimizado para papel o PDF (`ExamCertificate.svelte`). Corrección pedagógica y psicométrica (Spec 09): normalización estricta de opciones en Q1 con sorteo de distractores sobre los 7 tipos de ángulo, 4 casos en Q3 de paralelas, despeje de ecuación en Q5 y certificado de práctica.
- [x] Desacople de Presentación (Spec 09): `angles.ts` reducido a 166 líneas de matemáticas puras sin clases de Tailwind ni colores; extracción a `src/lib/pedagogical/angleStyles.ts`.
- [x] KaTeX 100% Local (Spec 09): Empaquetado de CSS y fuentes tipográficas WOFF2 en el bundle local; eliminación de dependencias de `cdn.jsdelivr.net`.
- [x] Refinamiento Didáctico: Correcciones de desafíos, botón de confirmación y coherencia espacial de respuestas (.agents/specs/05_correcciones_desafios.md).
- [x] Testing y Calidad: Vitest con 47 tests unitarios y de snapshot en `angles.test.ts`, `angleStyles.test.ts`, `pairsChallenges.test.ts`, `equations.test.ts`, `equationsSnapshot.test.ts`, `progressStore.test.ts` y `examGenerator.test.ts`, PRNG mulberry32 inyectable y prevención de mismatch de hidratación en SSG.
- [x] Catálogo de Skills AGY (.agents/skills/): 5 skills nativas documentadas (`exercise-generator`, `gamification-progress-engine`, `pwa-offline-packager`, `latex-equation-builder`, `svg-angle-render`).
- [x] Vista de Escritorio: Adaptación aditiva a 2 columnas para pantallas grandes (`lg:`, $\ge 1024\text{ px}$) con `ModuleSplit.svelte`, escalado visual a 480px y cero regresión mobile (.agents/specs/06_vista_escritorio.md).
- [x] Despliegue en Netlify: Publicado y operativo en producción en https://angulos2.netlify.app/
- [x] Modo Desafío Dinámico y Entrada Manual: Aleatorización de preguntas en Módulo 1 y Módulo 2 (valores variados en complementarios, suplementarios y opuestos), gráficos ciegos en desafíos (ocultamiento de la medida dada en la consigna) e inputs numéricos manuales por teclado sincronizados en Módulos 1, 2 y 3.
- [x] Gestión de Ramas y Gobernanza (`AGENTS.md`): Establecido que el usuario es el Arquitecto Principal. Creación de la rama `dev` para futuros desarrollos. La integración (merge) hacia `main` queda reservada estrictamente a la orden explícita del Arquitecto.
- [x] Límite de Líneas Flexible con Justificación: Estándar deseado fijado en $\le 130$ líneas. Excepciones justificadas y aprobadas por el Arquitecto con un tope máximo absoluto e inviolable de 210 líneas.

## Registro de Decisiones Técnicas
- **Spec 10: Pasaje de Números Decimales a Fracción (Unidad 2):**
  - Se estructuró la nueva unidad temática curricular de Números Racionales $\mathbb{Q}$ para 2° año.
  - *Capa Matemática (`src/lib/math/fractions/`):*
    - `types.ts` (28 líneas): interfaces para tipos decimales (`exact`, `pure_periodic`, `mixed_periodic`), partes componentes y resultados de conversión.
    - `gcd.ts` (34 líneas): algoritmo de Euclides para MCD y reducción a fracciones irreducibles.
    - `conversion.ts` (73 líneas): implementación de los 3 algoritmos de conversión escolar argentina con cálculo de numerador, denominador, simplificación paso a paso y validación de entradas.
    - `conversion.test.ts` (89 líneas): 6 pruebas completas en Vitest cubriendo exactos ($0{,}75$, $1{,}25$), periódicos puros ($0{,}\widehat{3}$, $1{,}\widehat{6}$) y periódicos mixtos ($0{,}1\widehat{6}$, $1{,}2\widehat{3}$).
  - *Capa Pedagógica (`src/lib/pedagogical/fractions/`):*
    - `decimalChallenges.ts` (98 líneas): banco de 12 desafíos representativos con 4 de cada tipo, pistas pedagógicas y barajado Fisher-Yates.
    - `decimalChallenges.test.ts` (34 líneas): 3 tests verificando integridad del banco, soluciones irreducibles y barajado.
  - *Capa UI Atómica (`src/components/interactive/fractions/`):*
    - `DecimalVisualizer.svelte` (46 líneas): desglose semántico por colores del número decimal (azul para enteros, ámbar para no periódicos, rosa para períodos con arco KaTeX $\widehat{\dots}$).
    - `ConversionSteps.svelte` (59 líneas): desarrollo algebraico KaTeX paso a paso mostrando regla nemotécnica, resta en numerador, composición del denominador y simplificación por MCD.
    - `DecimalControls.svelte` (112 líneas): pestañas de selección de tipo, presets escolares y cajas de texto numéricas accesibles.
    - `FractionChallenge.svelte` (118 líneas): modo desafío con casillas de numerador y denominador, botón explícito de confirmación, pistas y entrega justa de estrellas.
  - *Orquestador y Ruta:*
    - `DecimalToFraction.svelte` (120 líneas): orquestador delgado con soporte para desktop split de 2 columnas (`ModuleSplit.svelte`).
    - `src/pages/decimal-a-fraccion.astro` (37 líneas): ruta estática SSG con layout, toggle de tema y guía de estudio.
    - `src/pages/index.astro` (164 líneas): actualización del home con la sección Unidad 2 y badge interactivo de progreso.
  - Todos los archivos respetan la regla $\le 130$ líneas (y con tope absoluto inferior a 165 líneas para páginas/layouts).
- **Refactorización Modular de Ecuaciones y Snapshot Testing (Spec 08):** `src/lib/math/equations.ts` (que tenía 205 líneas) fue dividido limpiamente en la carpeta `src/lib/math/equations/` (`types.ts`, `steps.ts`, `builders.ts`, `index.ts`), manteniendo todos los archivos bajo las 130 líneas. Se añadió `equationsSnapshot.test.ts` con 20 semillas de control para garantizar idéntico output algebraico y cero regresión.
- **Spec 09: KaTeX Local, Examen sin Sesgos y Separación de Capas:**
  - *Parte A:* Se reemplazó el `<link>` a `cdn.jsdelivr.net` por `import 'katex/dist/katex.min.css'` en `Layout.astro`. Vite empaqueta el CSS y copia las tipografías WOFF2 directamente a `dist/_astro/`, garantizando funcionamiento 100% offline y preparando el terreno para la PWA.
  - *Parte B:* Se corrigió el sesgo de Q1 en `examGenerator.ts`: se eliminó el `.slice(0, 3)` estático y se reemplazó por un sorteo aleatorio con RNG de los distractores entre los 7 tipos curriculares (incluyendo Nulo 0° y Completo 360°), protegiéndolo con tests sobre 500 semillas donde ningún distractor delata la respuesta. Se ampliaron a 4 los casos de paralelas en Q3, se estructuró una ecuación con despeje real en Q5 y se ajustó el diploma como "Certificado de Práctica".
  - *Parte C:* Se extrajeron los metadatos visuales de Tailwind (`badgeClass`, `colorHex`, `colorName`) de `src/lib/math/angles.ts` a `src/lib/pedagogical/angleStyles.ts`, reduciendo `angles.ts` a 166 líneas de lógica matemática pura sin estilos y agregando suite de tests `angleStyles.test.ts`.
- **Skills Nativas Especializadas (.agents/skills/):**
  - `exercise-generator`: Actualizado con los 5 generadores algebraicos, distribución ponderada, inyección de PRNG determinista para SSG y protocolo de testing con snapshots.
  - `gamification-progress-engine`: Documenta la arquitectura de `progressStore.ts`, patrón reactivo por suscripción, deduplicación justa, lista de insignias y SSR safety.
  - `pwa-offline-packager`: Guía paso a paso para convertir la app en una PWA 100% offline (Service Worker, Web App Manifest y caché de assets estáticos y KaTeX).
- **Examen Integrador y Certificado (Hito 3 & Correcciones Pedagógicas):** Generador `examGenerator.ts` (128 líneas) con 5 preguntas balanceadas de los 4 módulos temáticos. `ExamQuiz.svelte` (102 líneas) con retroalimentación explicativa y cálculo de nota 1-10. Se normalizaron las opciones de Q1 (sin prefijo "Ángulo"), se eliminó el cuadro de fórmula previa en Q2, Q4 y Q5, y se incorporaron distractores conceptuales diagnósticos: en Q2 se evalúa la relación dual complementario/suplementario (si pide complementario de 51° ofrece 129° como distractor de ángulo llano), congruencia de medida y error de decena en la resta; en Q5 se ofrece el valor de la incógnita x como trampa de confusión conceptual. `ExamCertificate.svelte` (89 líneas) con diseño ceremonial imprimible.
- **Gamificación y Progreso Escolar Local (Hito 2 y Spec 08):** Store `progressStore.ts` (128 líneas) con patrón de suscriptores y persistencia local sin servidor. Cada desafío nuevo superado otorga 1 estrella (`⭐`) e incrementa la racha (`🔥`). Retos ya resueltos previamente muestran éxito sin sumar estrellas repetidas (neutral). Desbloqueo automático de 7 medallas escolares. Modal `ProgressWidget.svelte` (97 líneas) y badges `ProgressBadge.svelte` (29 líneas).
- **Nuevas Variantes Curriculares de Módulo 4 (Spec 07):**
  - Se agregaron 3 nuevos generadores algebraicos en `equations.ts`: `generateComplementaryEquationProblem` ($\alpha + \beta = 90^\circ$), `generateAlternateInteriorEquationProblem` ($\alpha = \beta$), y `generateConsecutiveInteriorEquationProblem` ($\alpha + \beta = 180^\circ$).
  - Se modularizó la renderización visual en SVG: `SingleVertexDiagram.svelte` (76 líneas, gestiona opuestos, suplementarios y complementarios con símbolo de 90°) y `ParallelDiagram.svelte` (69 líneas, gestiona paralelas cortadas por secante destacando alternos o conjugados según corresponda).
  - El orquestador `EquationDiagram.svelte` quedó en 36 líneas y `StepSolver.svelte` en 124 líneas ($\le 130$ líneas), incorporando la 3ra relación geométrica ($\alpha + \beta = 90^\circ$) y retroalimentación pedagógica contextual.
- **Desafíos Aleatorios y Procedurales (Módulo 1 y 2):** En Módulo 1 se implementó un barajado Fisher-Yates de los 6 tipos de ángulos. En Módulo 2 se creó un generador procedural (`generatePairsChallengesDeck`) con pools de ángulos limpios ($20^\circ$ a $150^\circ$) para complementarios, suplementarios y opuestos por el vértice, con selección aleatoria por partida.
- **Gráficos Ciegos en Desafíos (Módulo 2):** Para evitar regalar la respuesta o permitir que el alumno busque números coincidentes sin pensar, `AdjacentCanvas.svelte` y `OppositeCanvas.svelte` ocultan la medida en grados del ángulo dado en la consigna durante los desafíos (`hideBetaDegrees` y `hideAdjacentDegrees`), mostrando únicamente los símbolos algebraicos ($\beta$, $\hat{2}$, $\hat{4}$). `PairsCard.svelte` oculta la sustitución numérica en tiempo real durante los desafíos.
- **Entrada Manual de Grados por Teclado:** Se incorporaron inputs numéricos accesibles (`type="number"`, `inputmode="numeric"`) en `AngleControls.svelte`, `PairsControls.svelte` y `TransversalControls.svelte`. Funcionan en sincronización bidireccional con los sliders y el arrastre directo, facilitando la exactitud tanto en móviles como en PC sin frustración motriz.
- **Despliegue Continuo en Netlify:** Archivo `netlify.toml` endurecido con `NODE_VERSION = "20"`, `PNPM_FLAGS = "--frozen-lockfile"` y cabeceras de caché inmutable para `/_astro/*`. Inclusión de `public/favicon.svg` y `src/pages/404.astro` para eliminar errores 404 en navegadores y crawlers. Preconnect de `cdn.jsdelivr.net` en `Layout.astro` para carga instantánea de tipografías KaTeX. Sitio en producción: https://angulos2.netlify.app/
- **Modularidad Estricta (SRP):** Límite estándar deseado de $\le 130$ líneas por componente. Todos los componentes Svelte del proyecto tienen $\le 126$ líneas actualmente.
