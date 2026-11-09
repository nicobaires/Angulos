import { describe, it, expect, beforeEach } from 'vitest';
import { progressStore } from './progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    progressStore.resetProgress();
  });

  it('inicia con estado limpio', () => {
    expect(progressStore.state.stars).toBe(0);
    expect(progressStore.state.streak).toBe(0);
  });

  it('suma estrella y racha solo la primera vez que se resuelve un desafío', () => {
    const res1 = progressStore.recordSuccess('clasificacion', 0);
    expect(res1.newStar).toBe(true);
    expect(progressStore.state.stars).toBe(1);
    expect(progressStore.state.streak).toBe(1);

    // Repetir el mismo desafío es neutro
    const res2 = progressStore.recordSuccess('clasificacion', 0);
    expect(res2.newStar).toBe(false);
    expect(progressStore.state.stars).toBe(1);
    expect(progressStore.state.streak).toBe(1);

    // Resolver uno nuevo suma estrella y racha
    const res3 = progressStore.recordSuccess('clasificacion', 1);
    expect(res3.newStar).toBe(true);
    expect(progressStore.state.stars).toBe(2);
    expect(progressStore.state.streak).toBe(2);
  });

  it('reinicia racha en error sin perder estrellas ni mejor racha', () => {
    progressStore.recordSuccess('pares', 0);
    progressStore.recordSuccess('pares', 1);
    expect(progressStore.state.streak).toBe(2);

    progressStore.recordFailure();
    expect(progressStore.state.streak).toBe(0);
    expect(progressStore.state.stars).toBe(2);
  });

  it('ecuaciones otorga estrellas y racha de forma procedural siempre', () => {
    const res1 = progressStore.recordSuccess('ecuaciones');
    const res2 = progressStore.recordSuccess('ecuaciones');
    expect(res1.newStar).toBe(true);
    expect(res2.newStar).toBe(true);
    expect(progressStore.state.stars).toBe(2);
    expect(progressStore.state.streak).toBe(2);
  });

  it('desbloquea medallas escolares al completar los desafíos únicos', () => {
    for (let i = 0; i < 6; i++) {
      progressStore.recordSuccess('clasificacion', i);
    }
    expect(progressStore.state.achievements['maestro_clasificacion']).toBeDefined();
    expect(progressStore.state.achievements['racha_5']).toBeDefined();
  });

  it('fracciones: otorga estrella la primera vez y no al repetir el mismo desafío', () => {
    const first = progressStore.recordSuccess('fracciones', 3);
    expect(first.newStar).toBe(true);
    expect(progressStore.state.stars).toBe(1);
    expect(progressStore.state.streak).toBe(1);
    expect(progressStore.state.modules.fracciones).toEqual([3]);

    const repeat = progressStore.recordSuccess('fracciones', 3);
    expect(repeat.newStar).toBe(false);
    expect(progressStore.state.stars).toBe(1);
    expect(progressStore.state.streak).toBe(1);
  });

  it('fracciones: desbloquea "Poder Racional" al resolver 4 desafíos distintos', () => {
    for (let i = 0; i < 3; i++) progressStore.recordSuccess('fracciones', i);
    expect(progressStore.state.achievements['maestro_fracciones']).toBeUndefined();
    progressStore.recordSuccess('fracciones', 3);
    expect(progressStore.state.achievements['maestro_fracciones']).toBeDefined();
  });
});
