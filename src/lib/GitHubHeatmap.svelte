<script lang="ts">
  import { onMount } from 'svelte';

  type Contribution = {
    date: string;
    count: number;
    level: number;
  };

  type ContributionResponse = {
    total: { lastYear: number };
    contributions: Contribution[];
  };

  export let username = 'mayopi';

  let cells: Array<Contribution | null> = Array.from({ length: 371 }, () => null);
  let total = 0;
  let activeDays = 0;
  let bestDay: Contribution | null = null;
  let weekCount = 53;
  let state: 'loading' | 'ready' | 'error' = 'loading';

  onMount(() => {
    const controller = new AbortController();

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) throw new Error('contribution request failed');
        return response.json() as Promise<ContributionResponse>;
      })
      .then((data) => {
        const contributions = data.contributions ?? [];
        const firstDay = contributions[0]
          ? new Date(`${contributions[0].date}T00:00:00Z`).getUTCDay()
          : 0;

        cells = [
          ...Array.from({ length: firstDay }, () => null),
          ...contributions
        ];
        weekCount = Math.ceil(cells.length / 7);
        total = data.total?.lastYear ?? contributions.reduce((sum, day) => sum + day.count, 0);
        activeDays = contributions.filter((day) => day.count > 0).length;
        bestDay = contributions.reduce<Contribution | null>(
          (best, day) => (!best || day.count > best.count ? day : best),
          null
        );
        state = 'ready';
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        state = 'error';
      });

    return () => controller.abort();
  });
</script>

<fieldset class="heatmap-terminal" class:heatmap-loading={state === 'loading'}>
  <legend class="heatmap-bar">
    <span>$ gh activity @{username} --range=1y</span>
    <span class:heatmap-error={state === 'error'}>{state === 'loading' ? '[sync]' : state === 'ready' ? '[ok]' : '[warn]'}</span>
  </legend>

  <div class="heatmap-scroll">
    <div class="heatmap-layout">
      <div class="heatmap-days" aria-hidden="true"><span>mon</span><span>wed</span><span>fri</span></div>
      <div class="heatmap-grid" style={`--week-count: ${weekCount}`} role="img" aria-label={`${total.toLocaleString()} GitHub contributions by ${username} in the last year`}>
        {#each cells as day, index}
          <span
            class:heatmap-cell={true}
            class:heatmap-placeholder={!day}
            class:level-0={day?.level === 0}
            class:level-1={day?.level === 1}
            class:level-2={day?.level === 2}
            class:level-3={day?.level === 3}
            class:level-4={day?.level === 4}
            class:cell-loaded={state === 'ready'}
            style={`--cell-delay: ${Math.min(index * 3, 900)}ms`}
            title={day ? `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}` : undefined}
          ></span>
        {/each}
      </div>
    </div>
  </div>

  <div class="heatmap-stats">
    {#if state === 'ready'}
      <span><b>{total.toLocaleString()}</b> contributions</span>
      <span><b>{activeDays}</b> active days</span>
      <span><b>{bestDay?.count ?? 0}</b> best day</span>
    {:else if state === 'error'}
      <span>// live contribution feed unavailable</span>
    {:else}
      <span>// fetching contribution graph...</span>
    {/if}
    <span class="heatmap-legend" aria-label="Contribution intensity"><i></i><i></i><i></i><i></i><i></i></span>
  </div>
</fieldset>
