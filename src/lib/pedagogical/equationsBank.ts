export interface StepGuide {
  step: 1 | 2 | 3;
  instruction: string;
  hint: string;
}

export const STEP_GUIDES: Record<1 | 2 | 3, StepGuide> = {
  1: {
    step: 1,
    instruction: 'Paso 1: Planteá la relación geométrica correcta.',
    hint: 'Mirá la figura: si los ángulos están enfrentados son iguales (opuestos). Si forman una recta continua, suman 180° (adyacentes).'
  },
  2: {
    step: 2,
    instruction: 'Paso 2: Despejá la incógnita x.',
    hint: 'Agrupá los términos con x a la izquierda y los números a la derecha, recordando cambiar el signo al pasar de miembro.'
  },
  3: {
    step: 3,
    instruction: 'Paso 3: Calculá el valor numérico final del ángulo en grados.',
    hint: 'Reemplazá el valor de x obtenido en la fórmula original de alfa para obtener la amplitud real.'
  }
};

export const COMMON_ALGEBRA_TIPS = [
  'Acordate de cambiar el signo al pasar un término al otro lado del signo igual.',
  'La incógnita "x" es solo una variable auxiliar: no te olvides de reemplazarla para hallar el ángulo real en grados.',
  'En ángulos físicos geométricos, el resultado final siempre tiene que dar positivo y menor a 180°.'
];

