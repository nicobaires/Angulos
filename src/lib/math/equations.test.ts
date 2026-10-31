import { describe, it, expect } from 'vitest';
import {
  createSeededRng,
  generateOppositeEquationProblem,
  generateSupplementaryEquationProblem,
  generateRandomProblem
} from './equations';

const RUNS = 500;

describe('generateOppositeEquationProblem', () => {
  it('produce ángulos opuestos iguales y coherentes con la ecuación', () => {
    const rng = createSeededRng(1);
    for (let i = 0; i < RUNS; i++) {
      const p = generateOppositeEquationProblem(rng);
      expect(p.alphaSolution).toBe(p.a * p.xSolution + p.b);
      expect(p.betaSolution).toBe(p.c * p.xSolution + p.d);
      expect(p.alphaSolution).toBe(p.betaSolution);
      expect(p.relationType).toBe('igualdad');
    }
  });

  it('x es entero positivo y los ángulos son válidos (0° < ángulo < 180°)', () => {
    const rng = createSeededRng(2);
    for (let i = 0; i < RUNS; i++) {
      const p = generateOppositeEquationProblem(rng);
      expect(Number.isInteger(p.xSolution)).toBe(true);
      expect(p.xSolution).toBeGreaterThan(0);
      expect(p.alphaSolution).toBeGreaterThan(0);
      expect(p.alphaSolution).toBeLessThan(180);
    }
  });
});

describe('generateSupplementaryEquationProblem', () => {
  it('produce ángulos que suman exactamente 180°', () => {
    const rng = createSeededRng(3);
    for (let i = 0; i < RUNS; i++) {
      const p = generateSupplementaryEquationProblem(rng);
      expect(p.alphaSolution).toBe(p.a * p.xSolution + p.b);
      expect(p.betaSolution).toBe(p.c * p.xSolution + p.d);
      expect(p.alphaSolution + p.betaSolution).toBe(180);
      expect(p.relationType).toBe('suma180');
    }
  });

  it('x es entero y ambos ángulos son positivos', () => {
    const rng = createSeededRng(4);
    for (let i = 0; i < RUNS; i++) {
      const p = generateSupplementaryEquationProblem(rng);
      expect(Number.isInteger(p.xSolution)).toBe(true);
      expect(p.alphaSolution).toBeGreaterThan(0);
      expect(p.betaSolution).toBeGreaterThan(0);
    }
  });
});

describe('desarrollo paso a paso', () => {
  it('la última línea informa x, α y β correctos', () => {
    const rng = createSeededRng(5);
    for (let i = 0; i < 100; i++) {
      const p = generateRandomProblem(rng);
      const last = p.steps[p.steps.length - 1];
      expect(last).toContain(`x = ${p.xSolution}`);
      expect(last).toContain(`\\alpha = ${p.alphaSolution}^\\circ`);
      expect(last).toContain(`\\beta = ${p.betaSolution}^\\circ`);
    }
  });
});

describe('reproducibilidad', () => {
  it('la misma semilla genera el mismo ejercicio (clave para el SSR)', () => {
    const a = generateRandomProblem(createSeededRng(2024));
    const b = generateRandomProblem(createSeededRng(2024));
    expect(a).toEqual(b);
  });

  it('semillas distintas generan ids distintos', () => {
    const ids = new Set(
      Array.from({ length: 50 }, (_, i) => generateRandomProblem(createSeededRng(i)).id)
    );
    expect(ids.size).toBeGreaterThan(40);
  });
});
