import { describe, it, expect } from 'vitest';
import { generateExamDeck } from './examGenerator';
import { createSeededRng } from '../math/equations';

describe('generateExamDeck', () => {
  it('genera un examen con 5 preguntas balanceadas', () => {
    const rng = createSeededRng(42);
    const deck = generateExamDeck(rng);
    expect(deck.length).toBe(5);

    const modules = deck.map((q) => q.moduleNum);
    expect(modules).toEqual([1, 2, 3, 4, 4]);

    for (const q of deck) {
      expect(q.options.length).toBe(4);
      const correct = q.options.filter((o) => o.isCorrect);
      expect(correct.length).toBe(1);
      expect(q.prompt.length).toBeGreaterThan(10);
      expect(q.explanation.length).toBeGreaterThan(5);
    }
  });

  it('es determinista con semilla fija', () => {
    const deckA = generateExamDeck(createSeededRng(100));
    const deckB = generateExamDeck(createSeededRng(100));
    expect(deckA).toEqual(deckB);
  });

  it('no contiene opciones duplicadas ni campos de formula previa en 500 semillas', () => {
    for (let seed = 1; seed <= 500; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      for (const q of deck) {
        expect((q as any).formula).toBeUndefined();
        const labels = q.options.map((o) => o.label.trim().toLowerCase());
        const unique = new Set(labels);
        expect(unique.size).toBe(4);
      }
    }
  });

  it('cubre los 7 tipos de ángulo en Q1 y toda etiqueta correcta también aparece como distractor (sin delatar respuesta)', () => {
    const correctTypes = new Set<string>();
    const wrongTypes = new Set<string>();

    for (let seed = 1; seed <= 500; seed++) {
      const [q1] = generateExamDeck(createSeededRng(seed));
      expect(q1.options.length).toBe(4);

      for (const opt of q1.options) {
        expect(opt.label.toLowerCase()).not.toContain('ángulo');
        if (opt.isCorrect) {
          correctTypes.add(opt.label);
        } else {
          wrongTypes.add(opt.label);
        }
      }
    }

    const expected7 = ['Nulo', 'Agudo', 'Recto', 'Obtuso', 'Llano', 'Cóncavo', 'Completo'];
    expect(Array.from(correctTypes).sort()).toEqual([...expected7].sort());
    // Cada tipo que aparece como correcto debe aparecer también como incorrecto (distractor) en otras semillas
    for (const type of expected7) {
      expect(wrongTypes.has(type)).toBe(true);
    }
  });

  it('cubre los 4 casos de rectas paralelas en la Pregunta 3', () => {
    const casesCovered = new Set<string>();
    for (let seed = 1; seed <= 500; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      const q3 = deck[2];
      for (const name of ['alternos internos', 'conjugados internos', 'alternos externos', 'correspondientes']) {
        if (q3.prompt.includes(name)) casesCovered.add(name);
      }
    }
    expect(casesCovered.size).toBe(4);
  });

  it('incluye el distractor dual (suplementario/complementario) en la Pregunta 2', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      const q2 = deck[1];
      const match = q2.prompt.match(/ángulo (complementario|suplementario) de un ángulo de (\d+)°/);
      expect(match).not.toBeNull();
      if (!match) continue;

      const [, type, degStr] = match;
      const alpha = parseInt(degStr, 10);
      const dualDeg = type === 'complementario' ? 180 - alpha : 90 - alpha;

      const labels = q2.options.map((o) => o.label);
      expect(labels).toContain(`${dualDeg}°`);
    }
  });

  it('obliga a plantear la ecuación en Q5 e incluye el distractor de confusión de incógnita x', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      const q5 = deck[4];
      // Verifica que es una ecuación de adyacentes suplementarios
      expect(q5.prompt).toContain('Dos ángulos adyacentes suplementarios miden α = 2x + 20°');
      
      // Debe haber al menos una opción que corresponda al valor de x (distractor de incógnita)
      const labels = q5.options.map((o) => o.label);
      const xOpts = labels.filter((l) => ['α = 20°', 'α = 30°', 'α = 40°'].includes(l));
      expect(xOpts.length).toBeGreaterThanOrEqual(1);
    }
  });
});
