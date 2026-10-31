# Geometría de Ángulos • 2° Año Secundaria

Aplicación web didáctica, interactiva y móvil diseñada para estudiantes de **2° Año de secundaria** (13-14 años), centrada en el aprendizaje visual y la experimentación táctil de la geometría de ángulos.

---

## 🚀 Stack Tecnológico

- **Framework Web:** [Astro 5](https://astro.build/) (Generación de sitios estáticos - SSG).
- **Interactividad UI:** [Svelte 5](https://svelte.dev/) utilizando la reactividad moderna con **Runes** (`$state`, `$derived`, `$props`).
- **Diseño & Estilos:** [Tailwind CSS 3.4](https://tailwindcss.com/) con tema semántico y ergonomía táctil (zonas mínimas de 44x44 px).
- **Motor Matemático:** [KaTeX](https://katex.org/) para renderizado tipográfico seguro de fórmulas y ecuaciones.
- **Gráficos:** SVG interactivo nativo y reactivo (sin librerías pesadas de canvas).
- **Gestor de Paquetes:** `pnpm` con compatibilidad universal WebAssembly para Rollup.
- **Despliegue Continuo:** [Netlify](https://www.netlify.com/) (`netlify.toml`).

---

## 📚 Módulos de Aprendizaje

1. **[x] Módulo 1: Clasificación según Medida (`/clasificacion`)**
   - Transportador virtual interactivo de 0° a 360° con arrastre táctil y snap magnético.
   - Clasificación en vivo: nulo, agudo, recto (con indicador perpendicular), obtuso, llano, cóncavo y completo.
   - Modo desafío didáctico con retroalimentación en lenguaje escolar rioplatense.

2. **[x] Módulo 2: Pares de Ángulos (`/pares`)**
   - Ángulos complementarios ($90^\circ$) y suplementarios/adyacentes ($180^\circ$) con reparto interactivo en tiempo real.
   - Rectas secantes y ángulos opuestos por el vértice con congruencia visual pareada ($\hat{1} = \hat{3}$ y $\hat{2} = \hat{4}$).
   - Modo desafío didáctico y ficha interactiva con KaTeX.

3. **[x] Módulo 3: Paralelas cortadas por una Secante (`/paralelas`)**
   - Rotación táctil de la secante con inclinación regulable entre dos paralelas fijas ($R_1 \parallel R_2$).
   - Identificación y resaltado de los 8 sectores: alternos internos/externos, correspondientes y conjugados.
   - Ficha didáctica con fórmulas KaTeX y distinción inmediata entre pares congruentes y suplementarios.

4. **[ ] Módulo 4: Ecuaciones con Ángulos (`/ecuaciones`)**
   - Generación procedural de problemas algebraicos con soluciones enteras limpias.
   - Resolución guiada paso a paso: planteo, despeje de incógnita $x$ y valor angular final.

---

## 🏛️ Arquitectura del Proyecto

El proyecto sigue una arquitectura estricta de **Responsabilidad Única (SRP)** y **Separación de Capas (SoC)**:

```
├── .agents/                      # Sistema de especificaciones, subagentes y skills nativas
│   ├── skills/                   # Procedimientos y runbooks descubribles
│   ├── specs/                    # Especificaciones funcionales de cada módulo
│   └── subagents/                # Definiciones de roles especializados
├── src/
│   ├── components/
│   │   ├── common/               # Componentes transversales (Math.svelte, ModuleHeader.astro)
│   │   └── interactive/          # Módulos interactivos en Svelte 5
│   │       ├── classifier/       # Subcomponentes atómicos (Protractor, Controls, Card)
│   │       └── AngleClassifier.svelte # Orquestador delgado (< 120 líneas)
│   ├── layouts/
│   │   └── Layout.astro          # Contenedor responsive mobile-first
│   ├── lib/
│   │   ├── math/                 # Lógica matemática pura y tipada (angles.ts)
│   │   └── pedagogical/          # Bancos de preguntas, desafíos y pistas (classifierChallenges.ts)
│   ├── pages/                    # Enrutado estático SSG (/clasificacion, etc.)
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

# 3. Iniciar servidor de desarrollo local
pnpm run dev

# 4. Compilar para producción (validación SSG)
pnpm run build

# 5. Vista previa de la compilación
pnpm run preview
```

---

## 📱 Criterios de Accesibilidad Móvil
- Diseñado para funcionar de manera óptima en celulares pequeños (**360px a 420px de ancho**).
- Todo control interactivo o botón respeta el tamaño táctil mínimo de **44px** (`touch-manipulation`).
- Textos claros con alto contraste para proyección en pizarrón o aula escolar.

