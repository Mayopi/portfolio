<script lang="ts">
  import { navItems } from './content';
  let menuOpen = false;
</script>

<header class="site-header" aria-label="Primary navigation">
  <a class="brand" href="#top" aria-label="eri@portfolio home"><span class="brand-mark">$</span><span>eri@portfolio</span></a>
  <button class="menu-toggle" type="button" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>{menuOpen ? 'close' : 'menu'}</button>
  <nav class:open={menuOpen}>
    {#each navItems as item, index}
      <a href={item.href} onclick={() => (menuOpen = false)}><span class="nav-index">0{index + 1}</span>{item.label}</a>
    {/each}
  </nav>
</header>
