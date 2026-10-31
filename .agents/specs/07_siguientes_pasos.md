# Spec 07: Plan Estratégico y Siguientes Pasos (Roadmap de la App)

Este documento registra los hitos estratégicos acordados con el Arquitecto Principal para continuar expandiendo la plataforma educativa en la rama `dev`.

---

## 📋 Checklist de Seguimiento

### 1. 📐 Ampliación Curricular de Ecuaciones (Módulo 4) - [EN PROGRESO]
- [ ] **Variante 1 - Ángulos Complementarios:**
  - [ ] Generador procedural `generateComplementaryEquationProblem` ($\alpha + \beta = 90^\circ$).
  - [ ] Representación visual en `EquationDiagram.svelte` (ángulo recto con rayo divisor).
  - [ ] Desarrollo guiado en 3 pasos en `StepSolver.svelte` adaptado a $90^\circ$.
  - [ ] Pruebas unitarias de soluciones enteras y positivas en `equations.test.ts`.
- [ ] **Variante 2 - Paralelas y Secante con Ecuaciones (Alternos Internos):**
  - [ ] Generador procedural `generateAlternateInteriorEquationProblem` ($\alpha = \beta$).
  - [ ] Diagrama SVG con las dos paralelas y secante destacando los ángulos cruzados.
  - [ ] Pasos analíticos y feedback completo ($\text{Rta: } x, \alpha, \beta$).
- [ ] **Variante 3 - Paralelas y Secante con Ecuaciones (Conjugados Internos):**
  - [ ] Generador procedural `generateConsecutiveInteriorEquationProblem` ($\alpha + \beta = 180^\circ$).
  - [ ] Diagrama SVG destacando los ángulos interiores del mismo lado.
- [ ] **Selector de Categoría o Rotación en Módulo 4:**
  - [ ] Filtro/pestañas de categoría (Todos, Pares, Paralelas) o rotación aleatoria fluida.

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
