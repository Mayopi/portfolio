<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';

  export let data: {
    role: string;
    company: string;
    period: string;
    arrangement: string;
    location: string;
    skills: string;
    input?: boolean;
    output?: boolean;
  };
</script>

<div class="flow-node-card">
  {#if data.input}<Handle type="target" position={Position.Left} />{/if}
  <div class="flow-node-role">{data.role}</div>
  <span class="flow-node-company">{data.company}</span>
  <small>{data.period}</small>
  <small>{data.arrangement} · {data.location}</small>
  <em>{data.skills}</em>
  {#if data.output}<Handle type="source" position={Position.Right} />{/if}
</div>
