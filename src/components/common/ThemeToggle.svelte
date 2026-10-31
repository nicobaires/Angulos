<script lang="ts">
  import { onMount } from 'svelte';

  let isDark = $state<boolean>(false);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

<button
  onclick={toggleTheme}
  class="inline-flex items-center justify-center p-2 rounded-xl text-sm border transition active:scale-90 touch-manipulation min-h-[44px] min-w-[44px] bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-amber-400"
  aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
  title={isDark ? 'Modo claro' : 'Modo oscuro'}
>
  {#if isDark}
    <span class="text-base select-none">☀️</span>
  {:else}
    <span class="text-base select-none">🌙</span>
  {/if}
</button>
