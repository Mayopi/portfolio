<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  export let project: {
    number: string;
    title: string;
    description: string;
    tags: string[];
    status: string;
    href: string;
  };
</script>

<article class="project-card">
  <div class="project-card-top"><span class="project-number">{project.number}</span><span class="status"><span class="status-dot"></span>{project.status}</span></div>
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <div class="tag-row" aria-label="Technologies">{#each project.tags as tag}<span>#{tag}</span>{/each}</div>
  <a class="text-link" href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">inspect <ArrowUpRight size={13} strokeWidth={1.8} /></a>
</article>
