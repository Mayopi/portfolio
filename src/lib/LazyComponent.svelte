<script lang="ts">
  import { onMount } from 'svelte';

  export let load: () => Promise<{ default: any }>;
  export let minHeight = '0px';

  let host: HTMLDivElement;
  let LoadedComponent: any = null;
  let loading = true;
  let loadError = false;

  async function loadComponent() {
    if (!loading) return;
    loading = false;
    try {
      LoadedComponent = (await load()).default;
    } catch {
      loadError = true;
    }
  }

  onMount(() => {
    const checkVisibility = () => {
      if (host.getBoundingClientRect().top < window.innerHeight + 240) void loadComponent();
    };

    let observer: IntersectionObserver | undefined;
    if (!('IntersectionObserver' in window)) void loadComponent();
    else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          void loadComponent();
          observer?.disconnect();
        },
        { rootMargin: '240px 0px', threshold: 0.01 }
      );

      observer.observe(host);
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', checkVisibility);
    };
  });
</script>

<div bind:this={host} class="lazy-component" style={`min-height: ${LoadedComponent ? '0px' : minHeight}`} aria-busy={loading}>
  {#if LoadedComponent}
    <svelte:component this={LoadedComponent} />
  {:else if loadError}
    <div class="lazy-error">// interactive module unavailable</div>
  {:else}
    <span class="sr-only">Loading interactive section…</span>
  {/if}
</div>
