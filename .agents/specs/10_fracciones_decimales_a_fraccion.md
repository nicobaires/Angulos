# Spec 10: Fracciones • Módulo 1: Pasaje de Decimales a Fracción

## 1. Contexto Curricular y Objetivos Didácticos (2° Año Secundaria)
El aprendizaje de los **Números Racionales ($\mathbb{Q}$)** comienza con la equivalencia entre expresiones decimales y fracciones. Los estudiantes deben identificar la naturaleza de la cifra decimal y aplicar el algoritmo de pasaje a fracción irreducible sin depender de calculadoras.

El módulo aborda los **3 tipos de expresiones decimales**:
1. **Decimales Exactos (Finitos):** ej. $0,75 = \frac{75}{100} = \frac{3}{4}$; $2,5 = \frac{25}{10} = \frac{5}{2}$.
   - *Regla escolar:* Numerador = número sin coma. Denominador = 1 seguido de tantos ceros como lugares decimales.
2. **Decimales Periódicos Puros:** ej. $0,\widehat{3} = \frac{3}{9} = \frac{1}{3}$; $1,\widehat{6} = \frac{16 - 1}{9} = \frac{15}{9} = \frac{5}{3}$; $0,\widehat{45} = \frac{45}{99} = \frac{5}{11}$.
   - *Regla escolar:* Numerador = número completo sin coma menos la parte entera. Denominador = tantos nueves como cifras tenga el período.
3. **Decimales Periódicos Mixtos:** ej. $0,1\widehat{6} = \frac{16 - 1}{90} = \frac{15}{90} = \frac{1}{6}$; $1,2\widehat{3} = \frac{123 - 12}{90} = \frac{111}{90} = \frac{37}{30}$; $0,0\widehat{8} = \frac{8}{90} = \frac{4}{45}$.
   - *Regla escolar:* Numerador = número completo sin coma menos la parte no periódica (entero + anteperíodo). Denominador = tantos nueves como cifras periódicas, seguidos de tantos ceros como cifras decimales no periódicas (anteperíodo).
4. **Simplificación a Fracción Irreducible:**
   - Cálculo del Máximo Común Divisor ($\text{mcd}$) paso a paso para arribar a la fracción irreducible $\frac{a}{b}$.

---

## 2. Principios Arquitectónicos (Estándar AGENTS.md)
- **Límite Estricto de Líneas:** Todo archivo nuevo debe mantenerse en el estándar deseado $\le 130$ líneas (techo absoluto e inviolable: 210 líneas).
- **Separación de Capas (SoC):**
  - `src/lib/math/fractions/`: Funciones matemáticas puras (MCD, simplificación, cálculo de conversión paso a paso, generadores deterministas). Cero HTML ni clases de estilos.
  - `src/lib/pedagogical/fractions/`: Banco tipado de ejercicios, pistas y explicaciones escolares rioplatenses.
  - `src/components/interactive/fractions/`: Subcomponentes UI atómicos (Visualizador con arco, Selector de tipo, Desarrollo paso a paso KaTeX, Modo Desafío).
  - `DecimalToFraction.svelte`: Orquestador delgado ($\le 120$ líneas).
  - `src/pages/decimal-a-fraccion.astro`: Página SSG que carga la isla de Svelte y mantiene soporte de Modo Oscuro y Layout global.
- **Gamificación Local Integrada:** Conexión con `progressStore.ts` para sumar estrellas con deduplicación justa (`recordSuccess('fracciones_decimal', id)`).

---

## 3. Especificación de Componentes y Capas

### A. Capa Matemática (`src/lib/math/fractions/`)
1. `gcd.ts` (~35 líneas):
   - `gcd(a: number, b: number): number` (Algoritmo de Euclides).
   - `simplifyFraction(num: number, den: number): { num: number; den: number; gcd: number }`.
2. `types.ts` (~40 líneas):
   - `DecimalType`: `'exact' | 'pure_periodic' | 'mixed_periodic'`.
   - `DecimalInput`: `{ whole: number; nonPeriodic?: string; periodic?: string }`.
   - `ConversionResult`: desgloses en string para KaTeX, resta del numerador, ceros/nueves del denominador, fracción inicial y fracción simplificada.
3. `conversion.ts` (~90 líneas):
   - `convertExactToFraction(whole: number, decimals: string): ConversionResult`.
   - `convertPurePeriodicToFraction(whole: number, period: string): ConversionResult`.
   - `convertMixedPeriodicToFraction(whole: number, nonPeriodic: string, period: string): ConversionResult`.
4. `index.ts` (~25 líneas): Reexporta la API pública.

### B. Capa Pedagógica (`src/lib/pedagogical/fractions/`)
1. `decimalChallenges.ts` (~90 líneas):
   - Banco de 12 ejercicios graduales representativos (4 exactos, 4 periódicos puros, 4 periódicos mixtos).
   - Generador determinista con RNG para modo infinito.
   - Pistas didácticas contextuales ("Recordá: por cada cifra bajo el arquito va un 9 en el denominador").

### C. Componentes UI Atómicos (`src/components/interactive/fractions/`)
1. `DecimalVisualizer.svelte` (~70 líneas):
   - Representación gráfica con código de color semántico:
     - Parte entera (Azul/Índigo)
     - Anteperíodo (Ámbar)
     - Período bajo arquito $\widehat{\dots}$ (Rosa/Violeta)
2. `ConversionSteps.svelte` (~95 líneas):
   - Explicación KaTeX desglosada paso a paso:
     1. Regla mnemotécnica.
     2. Numerador (número sin coma menos parte no periódica).
     3. Denominador (nueves y ceros justificados).
     4. Fracción previa $\to$ Simplificación por MCD $\to$ Fracción irreducible en caja destacada.
3. `DecimalControls.svelte` (~90 líneas):
   - Selector de pestañas: Exacto / Periódico Puro / Periódico Mixto.
   - Sliders o botones de preset con ejemplos típicos de 2° año ($0,5$; $0,75$; $0,\widehat{3}$; $1,\widehat{6}$; $0,1\widehat{6}$; etc.).
   - Input numérico manual sincronizado.
4. `FractionChallenge.svelte` (~110 líneas):
   - Tarjeta de desafío con input para numerador y denominador, botón explícito de **Confirmar respuesta**, deduplicación justa de estrellas y feedback formativo.
5. `DecimalToFraction.svelte` (~115 líneas):
   - Orquestador del módulo en dos columnas con `ModuleSplit.svelte`.

---

## 4. Criterios de Aceptación
1. **Precisión Matemática:** Toda conversión matemática arroja fracciones simplificadas exactas y verificadas mediante tests en Vitest.
2. **Visualización KaTeX:** Notación periódica correcta con arquito superior $\widehat{\dots}$ tanto en modo claro como en modo oscuro.
3. **Ergonomía Táctil:** Botones con zona de impacto mínima de 44x44 px y teclado numérico móvil amigable (`inputmode="numeric"`).
4. **Métricas de Código:** Ningún archivo supera las 130 líneas.
5. **Calidad:** 100% de tests unitarios pasando, 0 errores en `astro check` y compilación en `astro build`.
