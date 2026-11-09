<script lang="ts">
  import {
    type DecimalParts, type DecimalType,
    convertExactToFraction, convertPurePeriodicToFraction, convertMixedPeriodicToFraction
  } from '../../../lib/math/fractions';
  import ModuleSplit from '../../common/ModuleSplit.svelte';
  import DecimalVisualizer from './DecimalVisualizer.svelte';
  import ConversionSteps from './ConversionSteps.svelte';
  import DecimalControls from './DecimalControls.svelte';

  let currentType = $state<DecimalType>('exact');
  let currentParts = $state<DecimalParts>({ whole: 0, nonPeriodic: '75', periodic: '' });

  const conversion = $derived.by(() => {
    if (currentType === 'exact') {
      return convertExactToFraction(currentParts.whole, currentParts.nonPeriodic || '0');
    }
    if (currentType === 'pure_periodic') {
      return convertPurePeriodicToFraction(currentParts.whole, currentParts.periodic || '3');
    }
    return convertMixedPeriodicToFraction(
      currentParts.whole,
      currentParts.nonPeriodic || '1',
      currentParts.periodic || '6'
    );
  });

  function handleTypeChange(newType: DecimalType) {
    currentType = newType;
    if (newType === 'exact') currentParts = { whole: 0, nonPeriodic: '75', periodic: '' };
    else if (newType === 'pure_periodic') currentParts = { whole: 1, nonPeriodic: '', periodic: '6' };
    else currentParts = { whole: 1, nonPeriodic: '2', periodic: '3' };
  }
</script>

<ModuleSplit>
  {#snippet visual()}
    <div class="space-y-4 p-4">
      <DecimalVisualizer type={currentType} parts={currentParts} latexDisplay={conversion.latexDisplay} />
      <ConversionSteps {conversion} />
    </div>
  {/snippet}

  {#snippet panel()}
    <div class="space-y-4 p-4">
      <DecimalControls
        type={currentType}
        parts={currentParts}
        ontypechange={handleTypeChange}
        onpartschange={(newParts) => (currentParts = newParts)}
      />
    </div>
  {/snippet}
</ModuleSplit>
