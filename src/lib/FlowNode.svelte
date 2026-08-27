<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';

  export let data: { label: string; state: string; input?: boolean; output?: boolean };
</script>

<div class="flow-node-card">
  {#if data.input}<Handle type="target" position={Position.Left} />{/if}
  <div>{data.label}</div>
  <span>{data.state}</span>
  {#if data.output}<Handle type="source" position={Position.Right} />{/if}
</div>
