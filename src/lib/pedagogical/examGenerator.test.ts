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
});

