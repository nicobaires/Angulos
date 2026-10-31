import { describe, it, expect } from 'vitest';
import {
  generatePairsChallengesDeck,
  createComplementChallenge,
  createSupplementChallenge,
  createOppositeChallenge,
  PAIRS_CHALLENGES
} from './pairsChallenges';
import { getShuffledClassifierIndices, CLASSIFIER_CHALLENGES } from './classifierChallenges';

describe('Pedagogical Challenges', () => {
  it('shuffle classifier indices covers all 6 challenges without duplicates', () => {
    const indices = getShuffledClassifierIndices();
    expect(indices.length).toBe(6);
    expect(new Set(indices).size).toBe(6);
    indices.forEach(idx => {
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(CLASSIFIER_CHALLENGES.length);
    });
  });

  it('default PAIRS_CHALLENGES contains 4 valid challenges', () => {
    expect(PAIRS_CHALLENGES.length).toBe(4);
    expect(PAIRS_CHALLENGES[0].targetAlpha + PAIRS_CHALLENGES[0].givenAngle).toBe(90);
    expect(PAIRS_CHALLENGES[2].targetAlpha + PAIRS_CHALLENGES[2].givenAngle).toBe(180);
    expect(PAIRS_CHALLENGES[3].targetAlpha + PAIRS_CHALLENGES[3].givenAngle).toBe(180);
  });

  it('generatePairsChallengesDeck generates 4 valid, clean challenges across 100 runs', () => {
    for (let i = 0; i < 100; i++) {
      const deck = generatePairsChallengesDeck();
      expect(deck.length).toBe(4);
      expect(new Set(deck.map(d => d.id)).size).toBe(4);

      for (const ch of deck) {
        expect(Number.isInteger(ch.targetAlpha)).toBe(true);
        expect(Number.isInteger(ch.givenAngle)).toBe(true);
        expect(ch.targetAlpha).toBeGreaterThan(0);

        if (ch.type === 'complementarios') {
          expect(ch.targetAlpha + ch.givenAngle).toBe(90);
        } else {
          expect(ch.targetAlpha + ch.givenAngle).toBe(180);
        }
      }
    }
  });

  it('createComplementChallenge creates exact complement', () => {
    const ch = createComplementChallenge(40);
    expect(ch.targetAlpha).toBe(50);
    expect(ch.givenAngle).toBe(40);
    expect(ch.prompt).toContain('40°');
  });

  it('createSupplementChallenge creates exact supplement', () => {
    const ch = createSupplementChallenge(75);
    expect(ch.targetAlpha).toBe(105);
    expect(ch.givenAngle).toBe(75);
    expect(ch.prompt).toContain('75°');
  });

  it('createOppositeChallenge creates exact vertical opposites from adjacent', () => {
    const ch = createOppositeChallenge(130);
    expect(ch.targetAlpha).toBe(50);
    expect(ch.givenAngle).toBe(130);
    expect(ch.prompt).toContain('130°');
  });
});

