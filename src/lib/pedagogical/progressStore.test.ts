import { describe, it, expect, beforeEach } from 'vitest';
import { progressStore } from './progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    progressStore.resetProgress();
  });

  it('inicia con estado limpio', () => {
    expect(progressStore.state.stars).toBe(0);
    expect(progressStore.state.streak).toBe(0);
    expect(progressStore.state.bestStreak).toBe(0);
  });

  it('suma estrellas y actualiza racha al registrar éxito', () => {
    progressStore.recordSuccess('clasificacion', 0);
    expect(progressStore.state.stars).toBe(1);
    expect(progressStore.state.streak).toBe(1);
    expect(progressStore.state.bestStreak).toBe(1);
    expect(progressStore.state.achievements['primer_paso']).toBeDefined();

    progressStore.recordSuccess('clasificacion', 1);
    progressStore.recordSuccess('clasificacion', 2);
    expect(progressStore.state.stars).toBe(3);
    expect(progressStore.state.streak).toBe(3);
    expect(progressStore.state.bestStreak).toBe(3);
    expect(progressStore.state.achievements['racha_3']).toBeDefined();
  });

  it('reinicia racha en error sin perder estrellas ni mejor racha', () => {
    progressStore.recordSuccess('pares', 0);
    progressStore.recordSuccess('pares', 1);
    expect(progressStore.state.streak).toBe(2);

    progressStore.recordFailure();
    expect(progressStore.state.streak).toBe(0);
    expect(progressStore.state.stars).toBe(2);
    expect(progressStore.state.bestStreak).toBe(2);
  });

  it('desbloquea medallas al completar módulos', () => {
    for (let i = 0; i < 6; i++) {
      progressStore.recordSuccess('clasificacion', i);
    }
    expect(progressStore.state.achievements['maestro_clasificacion']).toBeDefined();
    expect(progressStore.state.achievements['racha_5']).toBeDefined();

    for (let i = 0; i < 3; i++) {
      progressStore.recordSuccess('ecuaciones');
    }
    expect(progressStore.state.achievements['experto_algebra']).toBeDefined();
  });

  it('permite reiniciar todo el progreso con resetProgress', () => {
    progressStore.recordSuccess('paralelas', 0);
    progressStore.resetProgress();
    expect(progressStore.state.stars).toBe(0);
    expect(progressStore.state.streak).toBe(0);
    expect(Object.keys(progressStore.state.achievements).length).toBe(0);
  });
});
