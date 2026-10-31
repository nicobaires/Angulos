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

### 3. 🎓 Examen Integrador Final con Certificado - [PRÓXIMO PASO ⏳]
- [ ] Crear ruta `/examen` accesible desde la portada con quiz de 5 ejercicios mixtos aleatorios:
  - 1 ejercicio de clasificación con transportador.
  - 1 ejercicio de pares de ángulos.
  - 1 ejercicio de paralelas y secante.
  - 2 ejercicios de ecuaciones con ángulos.
- [ ] Calificación escolar numérica sobre 10 (con escala argentina: 1-10, aprobado $\ge 6$).
- [ ] Generación de diploma/certificado imprimible y descargable con nombre del alumno y fecha.
- [ ] Integración con el sistema de medallas (`🎖️ Graduado de Geometría 2°`).

---

### 4. 📱 PWA Offline (Uso Escolar sin Conexión) - [RESERVADO PARA EL FINAL 📌]
*(Postergado para el cierre por indicación expresa del Arquitecto)*
- [ ] Crear `public/manifest.webmanifest` con iconos, colores escolares y nombre de la app.
- [ ] Configurar Service Worker liviano para cachear el bundle estático (HTML, CSS, JS y KaTeX).
- [ ] Validar funcionamiento 100% offline desconectando la red en DevTools.
- [ ] Agregar banner/botón sutil de instalación: *"Instalar app en tu pantalla de inicio"*.

---

## Reglas de Gobernanza en `dev`
- **Autoridad:** El Arquitecto Principal (el usuario) valida cada etapa.
- **Merge hacia `main`:** Exclusivamente por orden explícita del Arquitecto.
- **Límites de archivo:** Estándar deseado $\le 130$ líneas. Excepciones justificadas con aprobación previa. Tope máximo absoluto de 210 líneas.
