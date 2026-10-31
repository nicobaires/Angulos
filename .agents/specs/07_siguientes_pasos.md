# Spec 07: Plan Estratégico y Siguientes Pasos (Roadmap de la App)

Este documento registra los hitos estratégicos acordados con el Arquitecto Principal para continuar expandiendo la plataforma educativa en la rama `dev`.

---

## 📋 Checklist de Seguimiento

### 1. 📐 Ampliación Curricular de Ecuaciones (Módulo 4) - [COMPLETADO]
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
  - [x] `SingleVertexDiagram.svelte`: 75 líneas.
  - [x] `ParallelDiagram.svelte`: 68 líneas.
  - [x] `StepSolver.svelte`: 118 líneas ($\le 130$ líneas).
  - [x] `equations.ts`: 205 líneas ($\le 210$ líneas tope).

---

### 2. 📱 PWA Offline (Uso Escolar sin Conexión) - [PENDIENTE]
- [ ] Crear `public/manifest.webmanifest` con iconos, colores escolares y nombre de la app.
- [ ] Configurar Service Worker liviano para cachear el bundle estático (HTML, CSS, JS y KaTeX).
- [ ] Validar funcionamiento 100% offline desconectando la red en DevTools.
- [ ] Agregar banner/botón sutil de instalación: *"Instalar app en tu pantalla de inicio"*.

---

### 3. ⭐ Gamificación y Progreso Escolar Local - [PENDIENTE]
- [ ] Store reactivo en Svelte 5 con persistencia en `localStorage` (sin backend).
- [ ] Registro de desafíos completados por módulo (estrellas y medallas).
- [ ] Indicador de progreso visual en la portada (`index.astro`): ej. `4/6 Desafíos logrados ⭐`.
- [ ] Contador de racha de respuestas correctas consecutivas (`🔥`).
- [ ] Botón de *"Reiniciar progreso"* para prestar el dispositivo o reintentar.

---

### 4. 🎓 Examen Integrador Final con Certificado - [PENDIENTE]
- [ ] Crear ruta `/examen` con quiz de 5 ejercicios mixtos aleatorios (1 de clasificación, 1 de pares, 1 de paralelas, 2 de ecuaciones).
- [ ] Calificación numérica escolar sobre 10.
- [ ] Generación de diploma/certificado visual de 2° año imprimible o descargable como imagen.

---

## Reglas de Ejecución en `dev`
- **Autoridad:** El Arquitecto Principal (el usuario) valida cada etapa.
- **Merge hacia `main`:** Exclusivamente por orden explícita del Arquitecto.
- **Límites de archivo:** Estándar deseado $\le 130$ líneas. Excepciones justificadas con aprobación previa. Tope máximo absoluto de 210 líneas.
