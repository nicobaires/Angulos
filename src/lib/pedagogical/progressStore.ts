export interface ModuleProgress {
  clasificacion: number[];
  pares: number[];
  paralelas: number[];
  ecuaciones: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'primer_paso', title: 'Primer Paso', description: 'Resolvé tu primer desafío', icon: '🎯' },
  { id: 'racha_3', title: '¡En Llamas!', description: '3 aciertos consecutivos', icon: '🔥' },
  { id: 'racha_5', title: 'Mente Imparable', description: '5 aciertos consecutivos', icon: '⚡' },
  { id: 'maestro_clasificacion', title: 'Explorador', description: 'Completá los 6 desafíos de Clasificación', icon: '🧭' },
  { id: 'maestro_pares', title: 'Dúo Geométrico', description: 'Completá los 4 desafíos de Pares', icon: '👥' },
  { id: 'maestro_paralelas', title: 'Secante Ninja', description: 'Completá los 4 desafíos de Paralelas', icon: '🛤️' },
  { id: 'experto_algebra', title: 'Mente Algebraica', description: 'Resolvé 3 ecuaciones con ángulos', icon: '🧮' }
];

export interface ProgressData {
  stars: number;
  streak: number;
  bestStreak: number;
  modules: ModuleProgress;
  achievements: Record<string, number>;
}

const STORAGE_KEY = 'angulos_progreso_v1';

export function getDefaultProgress(): ProgressData {
  return {
    stars: 0, streak: 0, bestStreak: 0,
    modules: { clasificacion: [], pares: [], paralelas: [], ecuaciones: 0 },
    achievements: {}
  };
}

function loadFromStorage(): ProgressData {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const p = JSON.parse(raw);
    return { ...getDefaultProgress(), ...p, modules: { ...getDefaultProgress().modules, ...(p.modules || {}) } };
  } catch {
    return getDefaultProgress();
  }
}

function saveToStorage(data: ProgressData) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export class ProgressStore {
  private data: ProgressData = getDefaultProgress();
  private listeners: Set<(data: ProgressData) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') this.data = loadFromStorage();
  }

  get state(): ProgressData { return this.data; }

  subscribe(run: (value: ProgressData) => void) {
    run(this.data);
    this.listeners.add(run);
    return () => { this.listeners.delete(run); };
  }

  private notify() {
    for (const listener of this.listeners) listener(this.data);
  }

  private checkAchievements() {
    const s = this.data, now = Date.now();
    const unlock = (id: string) => { if (!s.achievements[id]) s.achievements[id] = now; };
    if (s.stars >= 1) unlock('primer_paso');
    if (s.streak >= 3 || s.bestStreak >= 3) unlock('racha_3');
    if (s.streak >= 5 || s.bestStreak >= 5) unlock('racha_5');
    if (s.modules.clasificacion.length >= 6) unlock('maestro_clasificacion');
    if (s.modules.pares.length >= 4) unlock('maestro_pares');
    if (s.modules.paralelas.length >= 4) unlock('maestro_paralelas');
    if (s.modules.ecuaciones >= 3) unlock('experto_algebra');
  }

  recordSuccess(mod: 'clasificacion' | 'pares' | 'paralelas' | 'ecuaciones', challengeIndex?: number): { newStar: boolean } {
    let newStar = false;
    if (mod === 'ecuaciones') {
      newStar = true;
      this.data.stars += 1;
      this.data.streak += 1;
      this.data.modules.ecuaciones += 1;
    } else if (typeof challengeIndex === 'number') {
      const list = this.data.modules[mod];
      if (!list.includes(challengeIndex)) {
        list.push(challengeIndex);
        this.data.stars += 1;
        this.data.streak += 1;
        newStar = true;
      }
    }
    if (this.data.streak > this.data.bestStreak) this.data.bestStreak = this.data.streak;
    if (newStar) this.checkAchievements();
    saveToStorage(this.data);
    this.notify();
    return { newStar };
  }

  recordFailure() {
    this.data.streak = 0;
    saveToStorage(this.data);
    this.notify();
  }

  resetProgress() {
    this.data = getDefaultProgress();
    saveToStorage(this.data);
    this.notify();
  }
}

export const progressStore = new ProgressStore();
