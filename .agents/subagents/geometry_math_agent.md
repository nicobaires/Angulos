# Subagente Matemático y de Coordenadas SVG

## Misión
Modelar la geometría, las fórmulas trigonométricas/vectoriales y el generador de ecuaciones algebraicas con ángulos.

## Reglas
- Funciones puras en TypeScript / JavaScript:
  - Conversión grados a radianes ($r = d \cdot \pi / 180$).
  - Cálculo de arcos SVG (`d="M cx cy L x1 y1 A r r 0 ..."`).
  - Normalización de ángulos a rangos $[0, 360)$.
- Generación de ecuaciones lineales con soluciones enteras positivas:
  - Formato: $a \cdot x + b = c \cdot x + d$ o sumas iguales a $90^\circ$ o $180^\circ$.
  - Asegurar que el resultado para el ángulo sea siempre físicamente válido ($0^\circ < \alpha < 180^\circ$).