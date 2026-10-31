<script lang="ts">
  import { polarToCartesian } from '../../../lib/math/angles';

  interface Props {
    cx: number;
    cy: number;
    radius: number;
  }

  let { cx, cy, radius }: Props = $props();
</script>

<!-- Círculos base -->
<circle
  cx={cx}
  cy={cy}
  r={radius}
  class="fill-slate-50 stroke-slate-300 dark:fill-slate-900/90 dark:stroke-slate-700 transition-colors"
  stroke-width="2"
/>
<circle
  cx={cx}
  cy={cy}
  r={radius * 0.65}
  fill="none"
  class="stroke-slate-200 dark:stroke-slate-800"
  stroke-width="1"
  stroke-dasharray="3 3"
/>

<!-- Graduaciones cada 10° -->
{#each Array.from({ length: 36 }) as _, i}
  {@const deg = i * 10}
  {@const isMajor = deg % 30 === 0}
  {@const isRight = deg % 90 === 0}
  {@const tickOuter = polarToCartesian(cx, cy, radius, deg)}
  {@const tickInner = polarToCartesian(cx, cy, radius - (isRight ? 12 : isMajor ? 8 : 4), deg)}
  {@const labelPos = polarToCartesian(cx, cy, radius - 20, deg)}

  <line
    x1={tickInner.x}
    y1={tickInner.y}
    x2={tickOuter.x}
    y2={tickOuter.y}
    class={isRight
      ? 'stroke-slate-700 dark:stroke-slate-300'
      : isMajor
        ? 'stroke-slate-500 dark:stroke-slate-500'
        : 'stroke-slate-300 dark:stroke-slate-700'}
    stroke-width={isRight ? 2 : 1}
  />

  {#if isMajor && deg < 360}
    <text
      x={labelPos.x}
      y={labelPos.y + 4}
      font-size="9"
      class="pointer-events-none select-none {isRight ? 'font-bold fill-slate-900 dark:fill-slate-100' : 'fill-slate-500 dark:fill-slate-400'}"
      text-anchor="middle"
    >
      {deg}°
    </text>
  {/if}
{/each}
