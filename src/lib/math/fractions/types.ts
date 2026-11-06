export type DecimalType = 'exact' | 'pure_periodic' | 'mixed_periodic';

export interface DecimalParts {
  whole: number;
  nonPeriodic: string;
  periodic: string;
}

export interface SimplifiedFraction {
  num: number;
  den: number;
  gcd: number;
}

export interface ConversionResult {
  type: DecimalType;
  parts: DecimalParts;
  latexDisplay: string;
  ruleTitle: string;
  ruleDescription: string;
  numeratorCalculation: string;
  denominatorCalculation: string;
  rawNumerator: number;
  rawDenominator: number;
  rawLatex: string;
  simplified: SimplifiedFraction;
  simplifiedLatex: string;
}
