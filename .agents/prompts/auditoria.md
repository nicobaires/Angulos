# Prompt de Auditoría (reutilizable con cualquier modelo)

**Uso:** pegá este prompt completo en el modelo auditor, con acceso al repo en **modo solo lectura** y permiso para ejecutar comandos de verificación. El auditor no edita archivos, no hace commits ni push.
**Salida:** guardá la respuesta en `.agents/auditorias/AAAA-MM-DD_<modelo>.md`.
**Recomendación:** corré el mismo prompt con **dos modelos de familias distintas** y cruzá los resultados con la Pasada B (al final).

---

## PASADA A: AUDITORÍA

### Rol
Sos un auditor técnico independiente. El proyecto es una app web educativa de matemática para 2° año de secundaria (Argentina), usada por chicos de 13 a 14 años desde el celular. Stack: Astro 5, Svelte 5 (Runes), Tailwind 3, KaTeX, TypeScript, Vitest, pnpm, despliegue en Netlify. Fue construido sobre todo con agentes de IA, dirigidos por un desarrollador aficionado (el "Arquitecto"). **No escribiste este código.** Tu trabajo es encontrar problemas reales, no elogiar ni reescribir.

### Reglas de la auditoría
1. **Solo lectura.** No modifiques archivos, no hagas commits ni push. Podés crear archivos temporales fuera del repo.
2. **Evidencia o no existe.** Cada hallazgo cita `archivo:línea` y, si se puede, el comando que lo comprueba. Sin evidencia va a "Sospechas".
3. **Separá hechos de opiniones.** Hecho = lo verificaste leyendo o ejecutando. Opinión = criterio de diseño. Marcalos.
4. **Ejecutá antes de opinar** (ver "Comandos").
5. **No inventes.** Si no viste un archivo o una función, decí "no verificado". No supongas que algo funciona porque los tests pasan.
6. **Sé directo.** No suavices la severidad para agradar. Si un área no tiene problemas, decilo en una línea.
7. **Correcciones mínimas.** Proponé el cambio más chico que resuelve el problema, no rediseños.
8. No repitas problemas ya listados en informes anteriores de `.agents/auditorias/`: marcá si siguen abiertos.

### Contexto (leé primero, en este orden)
`AGENTS.md` → `MEMORY.md` → `README.md` → `.agents/subagents/*` → `.agents/skills/*/SKILL.md` → `.agents/specs/*` → informes previos en `.agents/auditorias/`.

Reglas declaradas que tenés que contrastar con el código real: tope de ~130 líneas por componente (máximo absoluto 210), capas separadas (`src/lib/math/` puro, `src/lib/pedagogical/` contenidos, componentes atómicos), Runes en Svelte, zonas táctiles de 44 px, mobile-first (360 px), merges a `main` solo con orden explícita.

### Qué auditar
- **A. Correctitud:** bugs funcionales, matemática incorrecta, estado que se pierde o se acredita mal (progreso, estrellas, deduplicación de desafíos), hidratación SSR/cliente (`Math.random` o fechas en estado inicial), manejo de entradas del usuario.
- **B. Cumplimiento de reglas del proyecto:** tamaño de archivos, separación de capas, Runes, 44 px, SRP. Medí, no estimes.
- **C. Tests:** qué protegen y qué no. Buscá lógica sin test, tests que no pueden fallar y ausencia de pruebas de UI o de punta a punta.
- **D. Accesibilidad y mobile:** zoom, roles y etiquetas de SVG interactivos, contraste, teclado, tamaños táctiles.
- **E. Seguridad y privacidad (usuarios menores):** `{@html}`, `localStorage`, datos personales, cabeceras HTTP, dependencias.
- **F. Build, despliegue y CI:** qué verifica realmente el despliegue antes de publicar.
- **G. Agentes y documentación:** contrastá **cada afirmación** de `AGENTS.md`, subagentes, skills, `MEMORY.md` y `README.md` con el repo (rutas, nombres de funciones, números de líneas, estados). Detectá contradicciones entre reglas y código, agentes o skills sin uso, documentación especulativa de cosas no construidas y el costo de mantener documentos a mano.
- **H. Pedagogía (si podés):** errores conceptuales, notación, distractores que delatan la respuesta, ejercicios con poca variedad.

### Comandos de verificación (ejecutalos)
```bash
pnpm install
pnpm test
pnpm run check            # astro check (+ svelte-check si está en el script)
pnpm run build
pnpm dlx svelte-check@4 --tsconfig ./tsconfig.json --threshold warning   # si check no lo incluye
find src \( -name '*.svelte' -o -name '*.ts' -o -name '*.astro' \) -not -name '*.test.ts' | xargs wc -l | sort -rn | head -25
grep -rnE "Math\.random|catch\s*\{\s*\}|@ts-ignore|: any\b|console\.(log|warn)|TODO|FIXME" src
grep -rn "@html" src
cat netlify.toml; ls .github .github/workflows 2>/dev/null
pnpm run check:size && pnpm run check:docs   # si existen (Spec 11)
```

### Severidad
- **Alta:** el alumno obtiene un resultado incorrecto, no puede completar una acción o pierde progreso; o hay riesgo de privacidad.
- **Media:** degrada la experiencia, la accesibilidad o la mantenibilidad, o permite regresiones sin detección.
- **Baja:** pulido, consistencia, deuda menor.
- **Info:** pregunta o dato para que decida el Arquitecto.

### Formato de salida (obligatorio)
1. **Resumen** (máx. 5 líneas): veredicto y los 3 riesgos principales.
2. **Tabla de hallazgos:** `ID | Sev | Hecho/Opinión | Evidencia (archivo:línea o comando) | Impacto | Corrección mínima | Esfuerzo (S/M/L)`.
3. **Sospechas no verificadas.**
4. **Lo que está bien** (máx. 6 puntos, con evidencia).
5. **Lo que no pudiste revisar.**
6. **Orden de trabajo sugerido** (máx. 7 ítems).
7. **Metadatos:** modelo usado, commit auditado (`git rev-parse --short HEAD`), comandos ejecutados y su resultado.

Extensión: máximo ~1200 palabras fuera de la tabla.

---

## PASADA B: VERIFICACIÓN CRUZADA (para el segundo modelo)

Recibís el informe de otro auditor (adjunto) y el repo en solo lectura. **No te dejes anclar por sus conclusiones.**

1. Para cada hallazgo, intentá **reproducirlo o refutarlo** con comandos o lectura de código. Respondé: `CONFIRMADO` / `REFUTADO` / `NO CONCLUYENTE`, con tu evidencia (`archivo:línea` o salida de comando) y, si cambiaría, la severidad que le darías.
2. Listá **hallazgos nuevos** que el otro auditor no vio, con el mismo formato que la Pasada A.
3. Señalá cualquier afirmación del informe que no esté respaldada por evidencia.
4. Cerrá con una tabla: `ID | Veredicto | Tu severidad | Comentario`.
