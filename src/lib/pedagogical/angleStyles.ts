import type { AngleClassification } from '../math/angles';

export interface AngleStyle {
  colorName: string;
  colorHex: string;
  badgeClass: string;
}

export const ANGLE_STYLES: Record<AngleClassification, AngleStyle> = {
  nulo: {
    colorName: 'Gris',
    colorHex: '#64748b',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
  },
  agudo: {
    colorName: 'Ámbar',
    colorHex: '#f59e0b',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
  },
  recto: {
    colorName: 'Esmeralda',
    colorHex: '#10b981',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
  },
  obtuso: {
    colorName: 'Violeta',
    colorHex: '#8b5cf6',
    badgeClass: 'bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/60'
  },
  llano: {
    colorName: 'Rosa',
    colorHex: '#ec4899',
    badgeClass: 'bg-pink-50 text-pink-800 border-pink-300 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/60'
  },
  concavo: {
    colorName: 'Cian',
    colorHex: '#06b6d4',
    badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-300 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60'
  },
  completo: {
    colorName: 'Azul',
    colorHex: '#2563eb',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60'
  }
};

export function getAngleStyle(type: AngleClassification): AngleStyle {
  return ANGLE_STYLES[type];
}

