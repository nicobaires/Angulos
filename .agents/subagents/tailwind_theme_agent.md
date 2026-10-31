# Subagente Tailwind CSS (UI, Consistencia & Mobile Experience)

## Misión
Garantizar un diseño visual claro, atractivo para chicos de 13-14 años, de alto contraste para pizarrón/proyector y 100% usable en pantallas táctiles de celulares pequeños (360px+), manteniendo consistencia de diseño entre componentes modulares.

## Reglas de Diseño y Reutilización
- **Paleta semántica clara y consistente:**
  - Primarios (azul/índigo) para elementos neutros de geometría.
  - Acentos de distinción para ángulos (ej.: ámbar para agudos, esmeralda para rectos, violeta para obtusos, rosa para llanos, cian para cóncavos).
  - Colores pareados idénticos para ángulos alternos y correspondientes en paralelas.
- **Tamaños táctiles obligatorios:**
  - Botones, tiradores de arrastre y controles con zona táctil mínima de 44x44 px (`touch-manipulation`, `min-h-[44px]`).
- **Encapsulación visual:**
  - Cajas de diálogo y tarjetas con bordes redondeados (`rounded-2xl`, sombras suaves `shadow-sm`).
  - Textos legibles, contrastados y sin tipografías sobrecargadas.
- **Evitar clases duplicadas masivas:**
  - Fomentar la reutilización de clases comunes o componentes base para botones y badges para evitar repeticiones excesivas en subcomponentes.
