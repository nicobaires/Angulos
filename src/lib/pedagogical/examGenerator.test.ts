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

  it('normaliza las opciones de Q1 sin prefijo "Ángulo" ni duplicados', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const [q1] = generateExamDeck(createSeededRng(seed));
      expect(q1.options.length).toBe(4);

      const labels = q1.options.map((o) => o.label);
      // Ninguna etiqueta debe contener "Ángulo"
      for (const label of labels) {
        expect(label.toLowerCase()).not.toContain('ángulo');
      }

      // No debe haber opciones duplicadas (e.g. "Obtuso" y "Obtuso")
      const uniqueLabels = new Set(labels.map((l) => l.toLowerCase()));
      expect(uniqueLabels.size).toBe(4);
    }
  });

  it('no contiene opciones duplicadas ni campos de formula previa en ninguna pregunta', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      for (const q of deck) {
        expect((q as any).formula).toBeUndefined();
        const labels = q.options.map((o) => o.label.trim().toLowerCase());
        const unique = new Set(labels);
        expect(unique.size).toBe(4);
      }
    }
  });

  it('incluye el distractor dual (suplementario/complementario) en la Pregunta 2', () => {
    for (let seed = 1; seed <= 30; seed++) {
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

  it('incluye el distractor de confusión de incógnita x en la Pregunta 5', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const deck = generateExamDeck(createSeededRng(seed));
      const q5 = deck[4];
      const match = q5.prompt.match(/x = (\d+)/);
      expect(match).not.toBeNull();
      if (!match) continue;

      const xVal = match[1];
      const labels = q5.options.map((o) => o.label);
      expect(labels).toContain(`α = ${xVal}°`);
    }
  });
});

