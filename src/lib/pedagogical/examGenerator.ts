import { type Rng } from '../math/equations';
import { getAngleClassification } from '../math/angles';

export interface ExamOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: string;
  moduleNum: 1 | 2 | 3 | 4;
  moduleName: string;
  title: string;
  prompt: string;
  options: ExamOption[];
  explanation: string;
}

function shuffle<T>(arr: T[], rng: Rng): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function generateQ1(rng: Rng): ExamQuestion {
  const angles = [0, 35, 90, 125, 180, 240, 360];
  const deg = angles[Math.floor(rng() * angles.length)];
  const rawName = getAngleClassification(deg).name;
  const correct = rawName.replace(/^Ángulo\s+/i, '');
  const pool = ['Nulo', 'Agudo', 'Recto', 'Obtuso', 'Llano', 'Cóncavo', 'Completo'];
  const wrongs = shuffle(pool.filter((n) => n.toLowerCase() !== correct.toLowerCase()), rng).slice(0, 3);
  return {
    id: 'q1', moduleNum: 1, moduleName: 'Clasificación', title: 'Clasificación según medida',
    prompt: `Un ángulo cuya amplitud es de ${deg}° se clasifica como:`,
    options: shuffle([{ id: 'c', label: correct, isCorrect: true }, ...wrongs.map((w, i) => ({ id: `w${i}`, label: w, isCorrect: false }))], rng),
    explanation: `Un ángulo de ${deg}° es ${correct.toLowerCase()}.`
  };
}

function generateQ2(rng: Rng): ExamQuestion {
  const isComp = rng() > 0.5;
  const alpha = 25 + Math.floor(rng() * 51);
  const target = isComp ? 90 - alpha : 180 - alpha;
  const dualTarget = isComp ? 180 - alpha : 90 - alpha;
  const total = isComp ? 90 : 180;
  const candidates = [dualTarget, alpha, target > 20 ? target - 10 : target + 10, target + 15, Math.abs(target - 15)];
  const wrongs: number[] = [];
  for (const c of candidates) {
    if (c !== target && c > 0 && !wrongs.includes(c)) {
      wrongs.push(c);
      if (wrongs.length === 3) break;
    }
  }
  return {
    id: 'q2', moduleNum: 2, moduleName: 'Pares', title: 'Cálculo de pares angulares',
    prompt: `El ángulo ${isComp ? 'complementario' : 'suplementario'} de un ángulo de ${alpha}° mide:`,
    options: shuffle([{ id: 'c', label: `${target}°`, isCorrect: true }, ...wrongs.map((w, i) => ({ id: `w${i}`, label: `${w}°`, isCorrect: false }))], rng),
    explanation: `Al ser ${isComp ? 'complementarios deben sumar 90°' : 'suplementarios deben sumar 180°'}: ${total}° - ${alpha}° = ${target}°. (Atención: ${dualTarget}° sería su ${isComp ? 'suplementario' : 'complementario'}).`
  };
}

function generateQ3(rng: Rng): ExamQuestion {
  const cases = [
    { name: 'alternos internos', rel: 'Son iguales (congruentes)', exp: 'Están a distinto lado de la secante entre paralelas: son iguales.' },
    { name: 'conjugados internos', rel: 'Suman 180° (suplementarios)', exp: 'Están al mismo lado de la secante entre paralelas: suman 180°.' },
    { name: 'alternos externos', rel: 'Son iguales (congruentes)', exp: 'Están a distinto lado de la secante en la zona exterior: son iguales.' },
    { name: 'correspondientes', rel: 'Son iguales (congruentes)', exp: 'Ocupan la misma posición relativa en cada intersección: son iguales.' }
  ];
  const item = cases[Math.floor(rng() * cases.length)];
  const poolWrongs = item.rel.includes('iguales')
    ? ['Suman 180° (suplementarios)', 'Suman 90°', 'No guardan relación']
    : ['Son iguales (congruentes)', 'Suman 90°', 'Suman 360°'];
  return {
    id: 'q3', moduleNum: 3, moduleName: 'Paralelas', title: 'Propiedad geométrica entre paralelas',
    prompt: `Entre dos rectas paralelas cortadas por una secante, los ángulos ${item.name}:`,
    options: shuffle([{ id: 'c', label: item.rel, isCorrect: true }, ...poolWrongs.map((w, i) => ({ id: `w${i}`, label: w, isCorrect: false }))], rng),
    explanation: item.exp
  };
}

function generateQ4(rng: Rng): ExamQuestion {
  const x = 12 + Math.floor(rng() * 6);
  const d = 15 + 2 * x;
  const errSigno = Math.round((d + 15) / 2);
  const errSup = Math.max(2, Math.round((180 - 15 - d) / 4));
  const candidates = [errSigno, 3 * x + 15, errSup, x + 4, x - 3];
  const wrongs: number[] = [];
  for (const c of candidates) {
    if (c !== x && c > 0 && !wrongs.includes(c)) {
      wrongs.push(c);
      if (wrongs.length === 3) break;
    }
  }
  return {
    id: 'q4', moduleNum: 4, moduleName: 'Ecuaciones', title: 'Despeje algebraico de opuestos',
    prompt: `Si dos ángulos opuestos por el vértice son α = 3x + 15° y β = x + ${d}°, ¿cuánto vale x?`,
    options: shuffle([{ id: 'c', label: `x = ${x}`, isCorrect: true }, ...wrongs.map((w, i) => ({ id: `w${i}`, label: `x = ${w}`, isCorrect: false }))], rng),
    explanation: `Al ser opuestos por el vértice son iguales: 3x + 15° = x + ${d}° => 2x = ${d - 15} => x = ${x}.`
  };
}

function generateQ5(rng: Rng): ExamQuestion {
  const x = 20 + 10 * Math.floor(rng() * 3); // 20, 30 o 40
  const cBeta = 180 - 3 * x - 20; // asegura (2x + 20) + (x + cBeta) = 180
  const alphaVal = 2 * x + 20;
  const betaVal = x + cBeta;
  const candidates = [x, betaVal, alphaVal - 10, alphaVal + 10];
  const wrongs: number[] = [];
  for (const c of candidates) {
    if (c !== alphaVal && c > 0 && !wrongs.includes(c)) {
      wrongs.push(c);
      if (wrongs.length === 3) break;
    }
  }
  return {
    id: 'q5', moduleNum: 4, moduleName: 'Ecuaciones', title: 'Amplitud de ángulo suplementario',
    prompt: `Dos ángulos adyacentes suplementarios miden α = 2x + 20° y β = x + ${cBeta}°. ¿Cuánto mide α?`,
    options: shuffle([{ id: 'c', label: `α = ${alphaVal}°`, isCorrect: true }, ...wrongs.map((w, i) => ({ id: `w${i}`, label: `α = ${w}°`, isCorrect: false }))], rng),
    explanation: `Suman 180°: (2x + 20°) + (x + ${cBeta}°) = 180° => 3x + ${20 + cBeta}° = 180° => 3x = ${180 - 20 - cBeta} => x = ${x}. Luego α = 2(${x}) + 20° = ${alphaVal}°. (Atención: x = ${x} es la incógnita, no la amplitud).`
  };
}

export function generateExamDeck(rng: Rng = Math.random): ExamQuestion[] {
  return [generateQ1(rng), generateQ2(rng), generateQ3(rng), generateQ4(rng), generateQ5(rng)];
}
