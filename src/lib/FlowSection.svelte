<script lang="ts">
  import { onMount } from 'svelte';
  import { Background, BackgroundVariant, SvelteFlow, type Edge, type Node } from '@xyflow/svelte';
  import FlowNode from './FlowNode.svelte';
  import '@xyflow/svelte/dist/style.css';

  let canvas: HTMLDivElement;
  let active = false;

  const nodeTypes = { terminal: FlowNode };
  const nodes: Node[] = [
    {
      id: 'cazh',
      type: 'terminal',
      position: { x: 120, y: 120 },
      data: {
        role: 'Frontend Developer',
        company: 'Cazh',
        period: 'Jul 2024 - present',
        arrangement: 'contract',
        location: 'Purwokerto',
        skills: 'JavaScript · React.js · +2 skills',
        output: true
      }
    },
    {
      id: 'affandra',
      type: 'terminal',
      position: { x: 620, y: 120 },
      data: {
        role: 'Insinyur Full Stack',
        company: 'Affandra Solusi Teknologi',
        period: 'Jan 2023 - present',
        arrangement: 'part-time',
        location: 'remote · Ajibarang',
        skills: 'JavaScript · React.js · +2 skills',
        input: true
      }
    }
  ];

  const edges: Edge[] = [
    { id: 'career-path', source: 'cazh', target: 'affandra', type: 'smoothstep', animated: true }
  ];

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      active = true;
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      active = true;
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(canvas);
    return () => observer.disconnect();
  });
</script>

<fieldset class="flow-terminal">
  <legend class="flow-bar"><span>$ experience --timeline</span><span class="flow-status"><span class="status-dot"></span>2 roles</span></legend>
  <div bind:this={canvas} class:flow-active={active} class="flow-canvas">
    <SvelteFlow {nodes} {edges} {nodeTypes} fitView={true} fitViewOptions={{ padding: 0.15 }} nodesDraggable={false} nodesConnectable={false} panOnDrag={false} panOnScroll={false} zoomOnScroll={false} zoomOnPinch={false} preventScrolling={false}>
      <Background variant={BackgroundVariant.Dots} gap={22} size={1} />
    </SvelteFlow>
  </div>
  <div class="flow-footer"><span>// career path · latest role → previous role</span><span class="flow-key"><i></i> active route</span></div>
</fieldset>
