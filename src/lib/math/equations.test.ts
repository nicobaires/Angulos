import { describe, it, expect } from 'vitest';
import {
  createSeededRng,
  generateOppositeEquationProblem,
  generateSupplementaryEquationProblem,
  generateComplementaryEquationProblem,
  generateAlternateInteriorEquationProblem,
  generateConsecutiveInteriorEquationProblem,
  generateRandomProblem
} from './equations';

const RUNS = 300;

describe('generateOppositeEquationProblem', () => {
  it('produce ángulos opuestos iguales y consistentes', () => {
    const rng = createSeededRng(1);
    for (let i = 0; i < RUNS; i++) {
      const p = generateOppositeEquationProblem(rng);
      expect(p.alphaSolution).toBe(p.betaSolution);
      expect(p.relationType).toBe('igualdad');
      expect(p.xSolution).toBeGreaterThan(0);
      expect(p.alphaSolution).toBeGreaterThan(0);
    }
  });
});

describe('generateSupplementaryEquationProblem', () => {
  it('produce ángulos que suman exactamente 180°', () => {
    const rng = createSeededRng(2);
    for (let i = 0; i < RUNS; i++) {
      const p = generateSupplementaryEquationProblem(rng);
      expect(p.alphaSolution + p.betaSolution).toBe(180);
      expect(p.relationType).toBe('suma180');
      expect(p.alphaSolution).toBeGreaterThan(0);
      expect(p.betaSolution).toBeGreaterThan(0);
    }
  });
});

describe('generateComplementaryEquationProblem', () => {
  it('produce ángulos que suman exactamente 90°', () => {
    const rng = createSeededRng(3);
    for (let i = 0; i < RUNS; i++) {
      const p = generateComplementaryEquationProblem(rng);
      expect(p.alphaSolution + p.betaSolution).toBe(90);
      expect(p.relationType).toBe('suma90');
      expect(p.xSolution).toBeGreaterThan(0);
      expect(p.alphaSolution).toBeGreaterThan(0);
      expect(p.betaSolution).toBeGreaterThan(0);
    }
  });
});

describe('generateAlternateInteriorEquationProblem', () => {
  it('produce alternos internos iguales', () => {
    const rng = createSeededRng(4);
    for (let i = 0; i < RUNS; i++) {
      const p = generateAlternateInteriorEquationProblem(rng);
      expect(p.alphaSolution).toBe(p.betaSolution);
      expect(p.relationType).toBe('igualdad');
      expect(p.type).toBe('paralelas_alternos');
      expect(p.xSolution).toBeGreaterThan(0);
    }
  });
});

describe('generateConsecutiveInteriorEquationProblem', () => {
  it('produce conjugados internos que suman 180°', () => {
    const rng = createSeededRng(5);
    for (let i = 0; i < RUNS; i++) {
      const p = generateConsecutiveInteriorEquationProblem(rng);
      expect(p.alphaSolution + p.betaSolution).toBe(180);
      expect(p.relationType).toBe('suma180');
      expect(p.type).toBe('paralelas_conjugados');
    }
  });
});

describe('generateRandomProblem y reproducibilidad', () => {
  it('cubre todas las 5 variantes y reproduce con semilla idéntica', () => {
    const a = generateRandomProblem(createSeededRng(2024));
    const b = generateRandomProblem(createSeededRng(2024));
    expect(a).toEqual(b);

    const types = new Set<string>();
    const rng = createSeededRng(99);
    for (let i = 0; i < 200; i++) {
      types.add(generateRandomProblem(rng).type);
    }
    expect(types.size).toBe(5);
  });
});
