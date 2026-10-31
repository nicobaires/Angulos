# Spec 07: Plan Estratégico y Siguientes Pasos (Roadmap de la App)

Este documento registra los hitos estratégicos acordados con el Arquitecto Principal para continuar expandiendo la plataforma educativa en la rama `dev`.

---

## 📋 Checklist de Seguimiento y Estado

### 1. 📐 Ampliación Curricular de Ecuaciones (Módulo 4) - [COMPLETADO ✅]
- [x] **Variante 1 - Ángulos Complementarios:**
  - [x] Generador procedural `generateComplementaryEquationProblem` ($\alpha + \beta = 90^\circ$).
  - [x] Representación visual en `SingleVertexDiagram.svelte` (ángulo recto con rayo divisor y símbolo de 90°).
  - [x] Desarrollo guiado en 3 pasos en `StepSolver.svelte` con opción de suma de 90° y feedback contextual.
  - [x] Pruebas unitarias de soluciones enteras y positivas en `equations.test.ts`.
- [x] **Variante 2 - Paralelas y Secante con Ecuaciones (Alternos Internos):**
  - [x] Generador procedural `generateAlternateInteriorEquationProblem` ($\alpha = \beta$).
  - [x] Diagrama SVG en `ParallelDiagram.svelte` con dos paralelas $R_1, R_2$ y secante destacando alternos internos.
  - [x] Pasos analíticos y feedback completo ($\text{Rta: } x, \alpha, \beta$).
- [x] **Variante 3 - Paralelas y Secante con Ecuaciones (Conjugados Internos):**
  - [x] Generador procedural `generateConsecutiveInteriorEquationProblem` ($\alpha + \beta = 180^\circ$).
  - [x] Diagrama SVG en `ParallelDiagram.svelte` destacando conjugados internos (del mismo lado interno).
  - [x] Pasos analíticos y comprobación algebraica completa.
- [x] **Arquitectura Modular y Límites de Tamaño:**
  - [x] `EquationDiagram.svelte`: orquestador de 36 líneas.
  - [x] `SingleVertexDiagram.svelte`: 76 líneas.
  - [x] `ParallelDiagram.svelte`: 69 líneas.
  - [x] `StepSolver.svelte`: 124 líneas ($\le 130$ líneas).
  - [x] `equations.ts`: 205 líneas ($\le 210$ líneas tope).

---

### 2. ⭐ Gamificación y Progreso Escolar Local - [COMPLETADO ✅]
- [x] **Store de Progreso Local (`progressStore.ts`):**
  - [x] Estado reactivo con suscriptores Svelte y persistencia en `localStorage`.
  - [x] Contador de estrellas (`⭐`), racha activa (`🔥`) y mejor racha histórica (`⚡`).
  - [x] Vitrina de 7 medallas escolares con desbloqueo automático.
  - [x] Botón seguro de reinicio de progreso escolar para préstamo del dispositivo en el aula.
  - [x] Suite de pruebas unitarias (`progressStore.test.ts`) con 5/5 tests pasando.
- [x] **Integración Visual en la App:**
  - [x] `ProgressWidget.svelte` (97 líneas) en la barra superior de todos los módulos y la portada.
  - [x] Modal interactivo con desglose de estadísticas, medallas y confirmación de reseteo.
  - [x] `ProgressBadge.svelte` (29 líneas) con indicador dinámico de avance en las 4 tarjetas de la portada.
  - [x] Banners de recompensa `⭐ +1 Estrella conseguida` en cada módulo al acertar un desafío.
  - [x] Registro de errores pedagógicos sin pérdida de estrellas acumuladas.

---

### 3. 🎓 Examen Integrador Final con Certificado - [COMPLETADO ✅]
- [x] **Generador Procedural de Examen (`examGenerator.ts` - 99 líneas):**
  - [x] 5 preguntas balanceadas de opción múltiple representando los 4 módulos temáticos.
  - [x] Algoritmo de barajado y selección aleatoria con soporte determinista para SSR.
  - [x] Suite de tests unitarios en Vitest (`examGenerator.test.ts`) con 2/2 tests pasando.
- [x] **Flujo Interactivo y Calificación (`ExamQuiz.svelte` - 107 líneas):**
  - [x] Preguntas con insignias de módulo, fórmulas KaTeX y 4 opciones accesibles.
  - [x] Calificación automática sobre 10 puntos (escala escolar argentina).
  - [x] Explicación pedagógica desplegada al confirmar cada respuesta.
- [x] **Diploma Escolar Imprimible (`ExamCertificate.svelte` - 89 líneas):**
  - [x] Campo editable para ingresar nombre y apellido del estudiante.
  - [x] Nivel de logro académico (Sobresaliente, Distinguido, Aprobado o A seguir practicando).
  - [x] Formato estético con marco escolar, fecha automática y sello simbólico.
  - [x] Botón de impresión/exportación directa (`window.print()`) optimizado para papel o PDF.
- [x] **Página y Enlace en Portada:**
  - [x] Ruta `/examen` (`examen.astro`) con layout unificado y header accesible.
  - [x] Tarjeta destacada del examen final agregada en la portada principal (`index.astro`).

---

### 4. 📱 PWA Offline (Uso Escolar sin Conexión) - [SIGUIENTE PASO ⏳]
*(Reservado para el cierre por indicación expresa del Arquitecto)*
- [ ] Crear `public/manifest.webmanifest` con iconos, colores escolares y nombre de la app.
- [ ] Configurar Service Worker liviano para cachear el bundle estático (HTML, CSS, JS y KaTeX).
- [ ] Validar funcionamiento 100% offline desconectando la red en DevTools.
- [ ] Agregar banner/botón sutil de instalación: *"Instalar app en tu pantalla de inicio"*.

---

## Reglas de Gobernanza en `dev`
- **Autoridad:** El Arquitecto Principal (el usuario) valida cada etapa.
- **Merge hacia `main`:** Exclusivamente por orden explícita del Arquitecto.
- **Límites de archivo:** Estándar deseado $\le 130$ líneas. Excepciones justificadas con aprobación previa. Tope máximo absoluto de 210 líneas.
