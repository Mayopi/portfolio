<script lang="ts">
  import { onMount } from 'svelte';
  import CommandPrompt from '$lib/CommandPrompt.svelte';
  import { projects, stack } from '$lib/content';
  import ProjectCard from '$lib/ProjectCard.svelte';
  import TerminalHeader from '$lib/TerminalHeader.svelte';

  let profile: { avatar_url: string; public_repos: number; followers: number } | null = null;
  let profileState = 'loading github profile...';

  onMount(async () => {
    try {
      const response = await fetch('https://api.github.com/users/mayopi');
      if (!response.ok) throw new Error('request failed');
      profile = await response.json();
      profileState = 'github api connected';
    } catch {
      profileState = 'github api unavailable · static mode';
    }
  });
</script>

<svelte:head>
  <title>Eri — frontend developer</title>
  <meta name="description" content="Eri's terminal-native portfolio: frontend development, experiments, and open source." />
</svelte:head>

<svelte:window onkeydown={(event) => {
  if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
    event.preventDefault();
    document.getElementById('command-input')?.focus();
  }
}} />

<div class="app-shell" id="top">
  <TerminalHeader />

  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="boot-log" aria-label="Portfolio boot log">
        <div><span class="prompt-symbol">$</span> ./eri --init --today</div>
        <div><span class="ok">[ok]</span> identity module loaded</div>
        <div><span class="ok">[ok]</span> frontend systems online</div>
        <div><span class="ok">[ok]</span> curiosity engine running</div>
        <div><span class="ok">[ok]</span> portfolio mounted</div>
      </div>

      <div class="hero-layout">
        <div class="hero-copy">
          <pre class="ascii-mark" aria-label="ERI">  ███████╗██████╗ ██╗
  ██╔════╝██╔══██╗██║
  █████╗  ██████╔╝██║
  ██╔══╝  ██╔══██╗██║
  ███████╗██║  ██║██║
  ╚══════╝╚═╝  ╚═╝╚═╝</pre>
          <h1 id="hero-title"><span>a frontend developer</span><br />who likes making<br />things feel obvious.</h1>
          <p class="hero-comment">// interfaces, experiments, and small useful tools<br />// built with care from banyumas, indonesia</p>
          <div class="hero-actions"><a class="button button-primary" href="#work">$ ls ./work →</a><a class="button button-quiet" href="#contact">$ ./connect →</a></div>
        </div>

        <aside class="hero-status terminal-panel" aria-label="System status">
          <div class="panel-title"><span>eri@portfolio:~ / status</span><span class="panel-dots">•••</span></div>
          <div class="avatar-row">
            {#if profile}<img src={profile.avatar_url} alt="Eri GitHub avatar" />{:else}<div class="avatar-placeholder">E</div>{/if}
            <div><strong>eri / mayopi</strong><span class="muted">frontend developer</span></div>
          </div>
          <div class="status-list">
            <div><span>status</span><strong class="green-text"><span class="status-dot"></span> available</strong></div>
            <div><span>based_in</span><strong>banyumas, id</strong></div>
            <div><span>focus</span><strong>web · mobile · ui</strong></div>
            <div><span>uptime</span><strong>since 2023</strong></div>
          </div>
          <div class="api-status"><span class="status-dot"></span>{profileState}</div>
        </aside>
      </div>
    </section>

    <section class="section section-grid" id="about" aria-labelledby="about-title">
      <div class="section-label"><span>01</span><span>./about</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol">$</span><h2 id="about-title">cat about.txt</h2></div>
        <div class="about-grid">
          <p class="large-copy">I turn fuzzy problems into interfaces that feel obvious. My work lives between engineering and design: structure first, then enough personality to make people care.</p>
          <div class="about-notes"><p><span class="note-key">// currently</span><br />Learning in public, shipping small, looking for meaningful problems to solve with good people.</p><p><span class="note-key">// outside the terminal</span><br />Usually holding a guitar, reading about technology, or finding a quieter corner of the internet.</p></div>
        </div>
      </div>
    </section>

    <section class="section" id="work" aria-labelledby="work-title">
      <div class="section-label"><span>02</span><span>./work</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol">$</span><h2 id="work-title">ls -la ./selected-work</h2></div>
        <div class="project-grid">{#each projects as project}<ProjectCard {project} />{/each}</div>
      </div>
    </section>

    <section class="section section-grid" id="stack" aria-labelledby="stack-title">
      <div class="section-label"><span>03</span><span>./stack</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol">$</span><h2 id="stack-title">cat stack.json</h2></div>
        <div class="stack-table" role="list">{#each stack as item, index}<div class="stack-row" role="listitem"><span class="stack-index">0{index + 1}</span><strong>{item.name}</strong><span class="stack-level">{item.level}</span></div>{/each}</div>
      </div>
    </section>

    <section class="section contact-section" id="contact" aria-labelledby="contact-title">
      <div class="section-label"><span>04</span><span>./contact</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol">$</span><h2 id="contact-title">open connection</h2></div>
        <div class="contact-content"><div><p class="large-copy">Have a problem worth solving?</p><p class="muted">Open a connection through GitHub. I usually reply within a day.</p></div><a class="email-link" href="https://github.com/mayopi" target="_blank" rel="noreferrer">github.com/mayopi <span>↗</span></a></div>
      </div>
    </section>

    <CommandPrompt />
  </main>

  <footer><span>© {new Date().getFullYear()} eri / mayopi</span><span>built with svelte<span class="green-text">_</span></span><span>press <kbd>/</kbd> to focus terminal</span></footer>
</div>
