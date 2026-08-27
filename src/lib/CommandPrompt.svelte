<script lang="ts">
  import { commands } from './content';

  let command = '';
  let response = 'type help to see available commands';

  function runCommand() {
    const value = command.trim().toLowerCase();
    if (value === 'clear') response = '';
    else if (commands.includes(value)) {
      response = value === 'help' ? 'available: about · work · github · stack · contact · clear' : `routing to /${value} ...`;
      if (value !== 'help') document.getElementById(value)?.scrollIntoView({ behavior: 'smooth' });
    } else if (value) response = `command not found: ${value}`;
    command = '';
  }
</script>

<div class="command-console" aria-label="Interactive terminal">
  <div class="console-output"><span class="prompt-symbol">↳</span> {response}</div>
  <form onsubmit={(event) => { event.preventDefault(); runCommand(); }}>
    <label for="command-input"><span class="prompt-label">eri@portfolio:~$</span></label>
    <input bind:value={command} id="command-input" autocomplete="off" spellcheck="false" aria-label="Enter terminal command" placeholder="try 'help'" />
  </form>
</div>
