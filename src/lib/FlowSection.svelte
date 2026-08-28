<script lang="ts">
  import { onMount } from 'svelte';
  import { Background, BackgroundVariant, SvelteFlow, type Edge, type Node } from '@xyflow/svelte';
  import FlowNode from './FlowNode.svelte';
  import '@xyflow/svelte/dist/style.css';

  let canvas: HTMLDivElement;
  let active = false;

  const nodeTypes = { terminal: FlowNode };
  const nodes: Node[] = [
    { id: 'a', type: 'terminal', position: { x: 20, y: 155 }, data: { label: 'NODE_A', state: '[input]', output: true } },
    { id: 'b', type: 'terminal', position: { x: 245, y: 50 }, data: { label: 'NODE_B', state: '[parse]', input: true, output: true } },
    { id: 'c', type: 'terminal', position: { x: 470, y: 260 }, data: { label: 'NODE_C', state: '[transform]', input: true, output: true } },
    { id: 'd', type: 'terminal', position: { x: 695, y: 50 }, data: { label: 'NODE_D', state: '[validate]', input: true, output: true } },
    { id: 'e', type: 'terminal', position: { x: 920, y: 260 }, data: { label: 'NODE_E', state: '[output]', input: true } }
  ];

  const edges: Edge[] = [
    { id: 'a-b', source: 'a', target: 'b', type: 'smoothstep', animated: true },
    { id: 'b-c', source: 'b', target: 'c', type: 'smoothstep', animated: true },
    { id: 'c-d', source: 'c', target: 'd', type: 'smoothstep', animated: true },
    { id: 'd-e', source: 'd', target: 'e', type: 'smoothstep', animated: true }
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
  <legend class="flow-bar"><span>$ flow render --route=placeholder</span><span class="flow-status"><span class="status-dot"></span>streaming</span></legend>
  <div bind:this={canvas} class:flow-active={active} class="flow-canvas">
    <SvelteFlow {nodes} {edges} {nodeTypes} fitView={true} fitViewOptions={{ padding: 0.15 }} nodesDraggable={false} nodesConnectable={false} panOnDrag={false} panOnScroll={false} zoomOnScroll={false} zoomOnPinch={false} preventScrolling={false}>
      <Background variant={BackgroundVariant.Dots} gap={22} size={1} />
    </SvelteFlow>
  </div>
  <div class="flow-footer"><span>// placeholder pipeline · replace with real project relationships</span><span class="flow-key"><i></i> active route</span></div>
</fieldset>
