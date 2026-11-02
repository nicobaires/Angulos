# Geometría de Ángulos • 2° Año Secundaria

Aplicación web didáctica, interactiva y móvil diseñada para estudiantes de **2° Año de secundaria** (13-14 años), centrada en el aprendizaje visual y la experimentación táctil de la geometría de ángulos.

🌐 **Sitio web en producción:** [https://angulos2.netlify.app/](https://angulos2.netlify.app/)

---

## 🚀 Stack Tecnológico

- **Framework Web:** [Astro 5](https://astro.build/) (Generación de sitios estáticos - SSG).
- **Interactividad UI:** [Svelte 5](https://svelte.dev/) utilizando la reactividad moderna con **Runes** (`$state`, `$derived`, `$props`).
- **Diseño & Estilos:** [Tailwind CSS 3.4](https://tailwindcss.com/) con tema semántico y ergonomía táctil (zonas mínimas de 44x44 px).
- **Modo Oscuro:** Soporte integral de tema Claro/Oscuro con persistencia en `localStorage`, script anti-FOUC y canvas SVG estilizados en modo blueprint/pizarrón técnico.
- **Gamificación Local:** Sistema de estrellas (`⭐`), racha activa (`🔥`), vitrina de 7 medallas escolares con deduplicación justa y modal de progreso.
- **Motor Matemático:** [KaTeX](https://katex.org/) para renderizado tipográfico seguro de fórmulas y ecuaciones.
- **Testing Unitario:** [Vitest](https://vitest.dev/) con 44 tests automatizados de congruencia, normalización, regresión con snapshots y generación procedural de exámenes y ecuaciones.
- **Gráficos:** SVG interactivo nativo y reactivo (sin librerías pesadas de canvas).
- **Gestor de Paquetes:** `pnpm` con compatibilidad universal WebAssembly para Rollup.
- **Despliegue Continuo:** [Netlify](https://www.netlify.com/) → [https://angulos2.netlify.app/](https://angulos2.netlify.app/)

---

## 📚 Módulos de Aprendizaje

1. **[x] Módulo 1: Clasificación según Medida (`/clasificacion`)**
   - Inicio por defecto en **0°**.
   - Transportador virtual interactivo de 0° a 360° con arrastre táctil y snap magnético.
   - Clasificación en vivo: nulo, agudo, recto (con indicador perpendicular), obtuso, llano, cóncavo y completo.
   - Modo desafío con orden aleatorio barajado, botón explícito de **Confirmar respuesta** y retroalimentación rioplatense.
   - Input numérico manual sincronizado por teclado y deduplicación justa de estrellas.

2. **[x] Módulo 2: Pares de Ángulos (`/pares`)**
   - Ángulos complementarios ($90^\circ$) y suplementarios/adyacentes ($180^\circ$) con reparto interactivo en tiempo real.
   - Rectas secantes y ángulos opuestos por el vértice con congruencia visual pareada ($\hat{1} = \hat{3}$ y $\hat{2} = \hat{4}$).
   - Desafíos generados proceduralmente con variedad de medidas y gráfico ciego (sin revelar el ángulo dado en la consigna).
   - Input numérico manual sincronizado por teclado.

3. **[x] Módulo 3: Paralelas cortadas por una Secante (`/paralelas`)**
   - Estado inicial neutral (sin botones seleccionados por defecto).
   - Rotación táctil de la secante con inclinación regulable entre dos paralelas fijas ($R_1 \parallel R_2$).
   - Identificación y resaltado de los 8 sectores: alternos internos/externos, correspondientes y conjugados.
   - Ficha didáctica con fórmulas KaTeX y desafíos deductivos con confirmación.
   - Input numérico manual sincronizado por teclado.

4. **[x] Módulo 4: Ecuaciones con Ángulos (`/ecuaciones`)**
   - Generación procedural de 5 tipos de problemas algebraicos con soluciones enteras y limpias:
     1. Opuestos por el vértice ($\alpha = \beta$)
     2. Adyacentes suplementarios ($\alpha + \beta = 180^\circ$)
     3. Complementarios con símbolo de 90° ($\alpha + \beta = 90^\circ$)
     4. Paralelas y secante: Alternos internos ($\alpha = \beta$)
     5. Paralelas y secante: Conjugados internos ($\alpha + \beta = 180^\circ$)
   - Diagrama SVG modularizado (`SingleVertexDiagram` y `ParallelDiagram`) alineado con las expresiones algebraicas.
   - Prevención de desajuste de hidratación SSG mediante render determinista inicial y sorteo en `onMount`.
   - Resolución guiada en 3 pasos con 3 opciones geométricas ($\alpha = \beta$, $\alpha + \beta = 180^\circ$, $\alpha + \beta = 90^\circ$).
   - Respuesta final completa y explícita ($\text{Rta: } x, \alpha, \beta$) tanto en el banner de éxito como en el desarrollo analítico paso a paso.

5. **[x] Examen Integrador Final y Diploma (`/examen`)**
   - 5 preguntas aleatorias y balanceadas que integran los 4 módulos temáticos.
   - Distractores pedagógicos diagnósticos (relación dual complementario/suplementario, congruencia y error de incógnita en ecuaciones).
   - Calificación escolar automática sobre 10 puntos (escala argentina).
   - Diploma ceremonial de aprobación imprimible y descargable vía navegador (`window.print()`).

---

## 🏛️ Arquitectura del Proyecto

El proyecto sigue una arquitectura estricta de **Responsabilidad Única (SRP)** y **Separación de Capas (SoC)** (estándar deseado $\le 130$ líneas por archivo; tope absoluto 210 líneas):

```
├── .agents/                      # Sistema de especificaciones, subagentes y skills nativas
│   ├── skills/                   # Procedimientos y runbooks descubribles
│   │   ├── exercise-generator/       # Generación procedural de 5 variantes algebraicas
│   │   ├── gamification-progress-engine/ # Motor de progreso, medallas y deduplicación justa
│   │   ├── pwa-offline-packager/     # Estrategia de PWA offline y Service Worker
│   │   ├── latex-equation-builder/   # Render KaTeX seguro en Svelte 5
│   │   └── svg-angle-render/         # Trigonometría, arcos SVG y normalización
│   ├── specs/                    # Especificaciones funcionales de cada módulo (01 al 08)
│   └── subagents/                # Definiciones de roles especializados
├── src/
│   ├── components/
│   │   ├── common/               # Componentes transversales (Math, ModuleSplit, ProgressWidget, ThemeToggle)
│   │   └── interactive/          # Módulos interactivos en Svelte 5
│   │       ├── classifier/       # Subcomponentes atómicos (Protractor, ProtractorTicks, Controls, Card)
│   │       ├── pairs/            # Subcomponentes atómicos (AdjacentCanvas, OppositeCanvas, Tabs, Card)
│   │       ├── transversal/      # Subcomponentes atómicos (TransversalCanvas, Controls, Card)
│   │       ├── equations/        # Subcomponentes atómicos (SingleVertexDiagram, ParallelDiagram, StepSolver, Feedback)
│   │       ├── exam/             # Subcomponentes del examen (ExamQuiz, ExamCertificate)
│   │       ├── ExamRunner.svelte # Orquestador del examen (58 líneas)
│   │       └── AngleClassifier.svelte # Orquestadores delgados (< 130 líneas)
│   ├── layouts/
│   │   └── Layout.astro          # Contenedor responsive mobile-first con anti-FOUC y footer global
│   ├── lib/
│   │   ├── math/                 # Lógica matemática pura y tipada
│   │   │   ├── equations/        # Módulo modularizado de ecuaciones (builders, steps, types, index)
│   │   │   ├── angles.test.ts    # Tests unitarios Vitest
│   │   │   └── equationsSnapshot.test.ts # Tests de regresión con snapshot
│   │   └── pedagogical/          # Bancos de preguntas, progreso local y generador de exámenes
│   ├── pages/                    # Enrutado estático SSG (/clasificacion, /pares, /paralelas, /ecuaciones, /examen, 404)
│   └── styles/                   # Configuración y directivas CSS globales
├── AGENTS.md                     # Regla arquitectónica del sistema multi-agente
├── MEMORY.md                     # Bitácora de decisiones técnicas y avance
├── README.md                     # Documentación general del repositorio
├── netlify.toml                  # Configuración para despliegue en Netlify
└── package.json                  # Dependencias y scripts
```

---

## 🛠️ Instalación y Desarrollo Local

### Requisitos Previos
- Node.js v20+ o v22+
- `pnpm` v9+

### Pasos
```bash
# 1. Clonar repositorio
git clone <url-del-repo>
cd Angulos

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm run dev

# 4. Ejecutar tests unitarios
pnpm test

# 5. Build de producción
pnpm run build
```
