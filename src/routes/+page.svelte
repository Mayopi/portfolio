<script lang="ts">
  import { onMount } from 'svelte';
  import AsciiGuitar from '$lib/AsciiGuitar.svelte';
  import CommandPrompt from '$lib/CommandPrompt.svelte';
  import GitHubHeatmap from '$lib/GitHubHeatmap.svelte';
  import FlowSection from '$lib/FlowSection.svelte';
  import { projects, stack } from '$lib/content';
  import ProjectCard from '$lib/ProjectCard.svelte';
  import TerminalHeader from '$lib/TerminalHeader.svelte';
  import { Activity, ArrowRight, ArrowUpRight, GitFork, Terminal } from '@lucide/svelte';
  import Typewriter from 'svelte-typewriter';

  let profile: { avatar_url: string; public_repos: number; followers: number } | null = null;
  let profileState = 'loading github profile...';
  let reduceMotion = false;

  function scrollReveal(node: HTMLElement) {
    node.classList.add('scroll-reveal');
    const pieces = [...node.querySelectorAll<HTMLElement>('.section-label, .section-heading, .section-body > *')];

    pieces.forEach((piece, index) => {
      piece.classList.add('reveal-piece');
      piece.style.setProperty('--reveal-delay', `${Math.min(index * 80, 480)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return { destroy() {} };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      node.classList.add('is-visible');
      observer.disconnect();
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  onMount(async () => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
          <div><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span> ./eri --init --today<span class="terminal-cursor" aria-hidden="true"></span></div>
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
          {#if reduceMotion}
            <h1 id="hero-title" aria-label="a frontend developer who likes making things feel obvious"><span>a frontend developer</span><br />who likes making<br />things feel obvious.</h1>
          {:else}
            <Typewriter element="h1" mode="loop" interval={42} unwriteInterval={24} wordInterval={1800} cursor={true}><span id="hero-title" data-static>a frontend developer</span><span>who likes making
things feel obvious.</span><span>who likes building
useful things.</span><span>who likes removing
friction.</span></Typewriter>
          {/if}
          <p class="hero-comment">// interfaces, experiments, and small useful tools<br />// built with care from banyumas, indonesia</p>
          <div class="hero-actions"><a class="button button-primary" href="#work">$ ls ./work <ArrowRight size={14} strokeWidth={1.8} /></a><a class="button button-quiet" href="#contact">$ ./connect <ArrowRight size={14} strokeWidth={1.8} /></a></div>
        </div>

        <fieldset class="hero-status terminal-panel" aria-label="System status">
          <legend class="panel-title"><span>eri@portfolio:~ / status</span><span class="panel-dots">•••</span></legend>
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
        </fieldset>
      </div>
    </section>

    <section use:scrollReveal class="section section-grid theme-copilot" id="about" aria-labelledby="about-title">
      <div class="section-label"><span>01</span><span>./about</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span><h2 id="about-title">cat README.md</h2></div>
        <div class="about-grid">
          <div><p class="md-heading">## about</p><p class="large-copy">I turn fuzzy problems into interfaces that feel obvious. My work lives between engineering and design: structure first, then enough personality to make people care.</p><p class="md-quote">&gt; clarity is a feature.</p></div>
          <div class="about-notes"><p><span class="note-key">### currently</span><br /><span class="md-bullet">-</span> Learning in public, shipping small, looking for meaningful problems to solve with good people.</p><p><span class="note-key">### outside the terminal</span><br /><span class="md-bullet">-</span> Usually holding a guitar, reading about technology, or finding a quieter corner of the internet.</p></div>
        </div>
      </div>
    </section>

    <section use:scrollReveal class="section theme-security" id="work" aria-labelledby="work-title">
      <div class="section-label"><span>02</span><span>./work</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span><h2 id="work-title">ls -la ./selected-work</h2></div>
        <div class="guitar-feature"><AsciiGuitar /><div class="guitar-copy"><span class="feature-label">// hobby process</span><p class="large-copy">When screen time gets loud, I pick up a guitar. This one now lives in the terminal.</p><p class="muted">No canvas. No heavy asset. Just text frames, a timer, and a little rhythm.</p></div></div>
        <div class="project-grid">{#each projects as project}<ProjectCard {project} />{/each}</div>
      </div>
    </section>

    <section use:scrollReveal class="section flow-section theme-copilot" id="flow" aria-labelledby="flow-title">
      <div class="section-label"><span>03</span><span>./flow</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span><h2 id="flow-title">flow render --placeholder</h2></div>
        <FlowSection />
      </div>
    </section>

    <section use:scrollReveal class="section github-section" id="github" aria-labelledby="github-title">
      <div class="section-label"><span>04</span><span>./github</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Activity size={14} strokeWidth={1.8} /></span><h2 id="github-title">gh activity --last-year</h2></div>
        <GitHubHeatmap username="mayopi" />
      </div>
    </section>

    <section use:scrollReveal class="section section-grid" id="stack" aria-labelledby="stack-title">
      <div class="section-label"><span>05</span><span>./stack</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span><h2 id="stack-title">cat stack.json</h2></div>
        <div class="stack-table" role="list">{#each stack as item, index}<div class="stack-row" role="listitem"><span class="stack-index">0{index + 1}</span><strong>{item.name}</strong><span class="stack-level">{item.level}</span></div>{/each}</div>
      </div>
    </section>

    <section use:scrollReveal class="section contact-section" id="contact" aria-labelledby="contact-title">
      <div class="section-label"><span>06</span><span>./contact</span></div>
      <div class="section-body">
        <div class="section-heading"><span class="prompt-symbol"><Terminal size={14} strokeWidth={1.8} /></span><h2 id="contact-title">open connection</h2></div>
        <div class="contact-content"><div><p class="md-heading">## get-in-touch</p><p class="large-copy">Have a problem worth solving?</p><p class="muted">Open a connection through GitHub. I usually reply within a day.</p></div><a class="email-link" href="https://github.com/mayopi" target="_blank" rel="noreferrer"><GitFork size={16} strokeWidth={1.8} /> github.com/mayopi <ArrowUpRight size={14} strokeWidth={1.8} /></a></div>
      </div>
    </section>

    <CommandPrompt />
  </main>

  <footer><span>© {new Date().getFullYear()} eri / mayopi</span><span>built with svelte<span class="green-text">_</span></span><span>press <kbd>/</kbd> to focus terminal</span></footer>
</div>
