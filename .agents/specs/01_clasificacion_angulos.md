# Spec 01: Clasificación de Ángulos

- **Componente:** `src/components/interactive/AngleClassifier.svelte`
- **Mecánica:**
  - Slider interactivo de 0° a 360° o rayo móvil mediante arrastre.
  - El transportador virtual actualiza el ángulo en vivo.
  - Indicador dinámico que cambia de etiqueta según el rango:
    - Agudo ($0^\circ < \alpha < 90^\circ$)
    - Recto ($\alpha = 90^\circ$)
    - Obtuso ($90^\circ < \alpha < 180^\circ$)
    - Llano ($\alpha = 180^\circ$)
    - Cóncavo ($180^\circ < \alpha < 360^\circ$)
    - Completo ($\alpha = 360^\circ$)