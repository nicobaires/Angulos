export interface ModuleItem {
  num: string;
  title: string;
  desc: string;
  href: string;
  color: string;
  tag: string;
  moduleId: 'clasificacion' | 'pares' | 'paralelas' | 'ecuaciones' | 'fracciones';
  total?: number;
  tagStyle?: string;
}

export const angleModules: ModuleItem[] = [
  {
    num: '1',
    title: 'Clasificación de Ángulos',
    desc: 'Agudos, rectos, obtusos, llanos y cóncavos con transportador interactivo.',
    href: '/clasificacion',
    color: 'bg-amber-500',
    tag: '0° a 360°',
    moduleId: 'clasificacion',
    total: 6
  },
  {
    num: '2',
    title: 'Pares de Ángulos',
    desc: 'Complementarios, suplementarios y opuestos por el vértice.',
    href: '/pares',
    color: 'bg-emerald-500',
    tag: 'Suma y congruencia',
    moduleId: 'pares',
    total: 4
  },
  {
    num: '3',
    title: 'Paralelas y Secante',
    desc: 'Alternos, conjugados y correspondientes con rayos interactivos.',
    href: '/paralelas',
    color: 'bg-indigo-500',
    tag: '8 ángulos clave',
    moduleId: 'paralelas',
    total: 4
  },
  {
    num: '4',
    title: 'Ecuaciones con Ángulos',
    desc: 'Resolución de problemas algebraicos paso a paso.',
    href: '/ecuaciones',
    color: 'bg-violet-500',
    tag: 'Álgebra aplicada',
    moduleId: 'ecuaciones'
  }
];

export const fractionModules: ModuleItem[] = [
  {
    num: '1',
    title: 'Pasaje de Decimal a Fracción',
    desc: 'Exactos, periódicos puros y mixtos paso a paso con fracción irreducible.',
    href: '/decimal-a-fraccion',
    color: 'bg-teal-600',
    tag: 'Exactos y Periódicos',
    moduleId: 'fracciones',
    total: 12,
    tagStyle: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
  }
];
