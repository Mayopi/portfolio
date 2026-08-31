<script lang="ts">
  import { onMount } from 'svelte';

  export let load: () => Promise<{ default: any }>;
  export let minHeight = '0px';

  let host: HTMLDivElement;
  let LoadedComponent: any = null;
  let loading = true;

  async function loadComponent() {
    if (!loading) return;
    loading = false;
    LoadedComponent = (await load()).default;
  }

  onMount(() => {
    if (!('IntersectionObserver' in window)) {
      void loadComponent();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        void loadComponent();
        observer.disconnect();
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );

    observer.observe(host);
    return () => observer.disconnect();
  });
</script>

<div bind:this={host} class="lazy-component" style={`min-height: ${LoadedComponent ? '0px' : minHeight}`} aria-busy={loading}>
  {#if LoadedComponent}
    <svelte:component this={LoadedComponent} />
  {:else}
    <span class="sr-only">Loading interactive section…</span>
  {/if}
</div>
