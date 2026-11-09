<script lang="ts">
  interface Props {
    num: string;
    den: string;
    disabled?: boolean;
  }

  let { num = $bindable(''), den = $bindable(''), disabled = false }: Props = $props();
</script>

<div class="flex flex-col items-center gap-1">
  <input
    type="text"
    inputmode="numeric"
    pattern="[0-9]*"
    aria-label="Numerador"
    placeholder="Num"
    bind:value={num}
    {disabled}
    class="w-20 p-2 text-center text-sm font-black bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
  />
  <div class="w-20 h-0.5 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
  <input
    type="text"
    inputmode="numeric"
    pattern="[0-9]*"
    aria-label="Denominador"
    placeholder="Den"
    bind:value={den}
    {disabled}
    class="w-20 p-2 text-center text-sm font-black bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
  />
</div>
