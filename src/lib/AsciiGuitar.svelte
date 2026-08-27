<script lang="ts">
  import { onMount } from 'svelte';

  type Point = { x: number; y: number; z: number; level: number; phase: number };

  const source = `                      ▒▒▒▒
                    ▓▓▒▒▒▒░░
                  ▓▓▒▒▒▒▒▒
                  ██▒▒▒▒░░
                  ▓▓▒▒▒▒░░
                ▒▒▒▒▒▒▒▒▒▒
                ██▒▒▒▒▒▒▒▒
                ██▒▒▒▒▒▒▒▒
                ██▒▒▒▒▒▒▒▒
                ░░▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒██▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒██▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒██▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▒▒██▒▒
                  ▒▒▒▒▒▒
                  ▒▒▒▒▒▒
                  ▓▓▒▒▓▓
      ░░          ▒▒██▒▒
    ▓▓▓▓▓▓        ▒▒▒▒▒▒
    ▓▓▓▓▓▓        ▒▒██▒▒
    ▓▓▓▓▓▓▓▓      ▒▒▒▒▒▒          ▓▓
      ▓▓▓▓▓▓▓▓▓▓▒▒▒▒██▒▒        ▓▓░░▒▒
      ▓▓▓▓▓▓▓▓▓▓░░▒▒▒▒▒▒▓▓      ▓▓░░▓▓
        ▓▓▓▓▓▓▓▓░░▒▒██▒▒▒▒░░▒▒░░▒▒░░▓▓
        ▓▓▓▓▓▓▓▓░░▒▒▒▒▒▒░░░░░░░░░░░░▓▓
        ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░▓▓
        ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░▓▓
        ▓▓▓▓▓▓▓▓░░▒▒▒▒▒▒░░░░░░░░▓▓
        ▓▓▓▓▓▓▒▒░░      ░░░░░░░░▒▒▒▒
        ▓▓▓▓▓▓░░░░▒▒▒▒▒▒░░░░░░░░░░▓▓
      ▓▓▓▓▓▓▓▓░░░░▒▒▒▒▒▒░░░░░░░░░░░░▓▓
      ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓▓
    ▒▒▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓
  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓░░▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`;

  const sourceLines = source.split('\n');
  const sourceWidth = Math.max(...sourceLines.map((line) => line.length));
  const sourceHeight = sourceLines.length;
  const rows = 54;
  const points: Point[] = [];
  let canvas: HTMLPreElement;
  let counter: HTMLSpanElement;
  let reducedMotion = false;

  function levelFor(character: string) {
    if (character === '▓' || character === '█') return 2;
    if (character === '▒') return 1;
    return 0;
  }

  sourceLines.forEach((line, row) => {
    [...line.padEnd(sourceWidth)].forEach((character, column) => {
      if (character === ' ') return;

      const x = (column - sourceWidth / 2) / (sourceWidth / 2);
      const y = (sourceHeight / 2 - row) / (sourceHeight / 2);
      const level = levelFor(character);
      const isBody = row > sourceHeight * 0.53;
      const depth = isBody ? 0.17 : 0.055;
      const phase = ((((row * 29 + column * 17) % 23) - 11) / 11) * 0.035;

      [-1, -0.5, 0, 0.5, 1].forEach((layer) => {
        points.push({
          x,
          y,
          z: depth * layer,
          level: Math.max(0, level - (layer < 0 ? 1 : 0)),
          phase
        });
      });
    });
  });

  function flush(run: string, className: string | null) {
    if (!run) return '';
    return className ? `<span class="${className}">${run}</span>` : run;
  }

  onMount(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = media.matches;
    let columns = sourceWidth + 10;
    let angle = 0;
    let lastTime = 0;
    let visible = true;
    let animationFrame = 0;

    function layout() {
      const fontSize = Number.parseFloat(getComputedStyle(canvas).fontSize) || 8;
      const characterWidth = fontSize * 0.61;
      columns = Math.max(sourceWidth + 6, Math.floor(canvas.clientWidth / characterWidth));
    }

    function render() {
      const centerX = columns / 2;
      const centerY = rows / 2;
      const radiusX = Math.min(columns * 0.46, sourceWidth * 0.58);
      const radiusY = rows * 0.47;
      const glyphs = new Array<string>(columns * rows);
      const classes = new Array<string | null>(columns * rows);
      const depths = new Float32Array(columns * rows);
      depths.fill(-Infinity);

      for (const point of points) {
        const localAngle = angle + point.phase * Math.sin(angle * 2 + point.y * 4);
        const cosine = Math.cos(localAngle);
        const sine = Math.sin(localAngle);
        const rotatedX = point.x * cosine + point.z * sine;
        const rotatedZ = -point.x * sine + point.z * cosine;
        const gridX = Math.round(centerX + rotatedX * radiusX);
        const gridY = Math.round(centerY - point.y * radiusY);

        if (gridX < 0 || gridX >= columns || gridY < 0 || gridY >= rows) continue;

        const cell = gridY * columns + gridX;
        if (rotatedZ <= depths[cell]) continue;

        const lightShift = rotatedZ > 0.12 ? 0 : rotatedZ < -0.12 ? -1 : 0;
        const level = Math.max(0, Math.min(2, point.level + lightShift));
        glyphs[cell] = level === 2 ? '#' : level === 1 ? '+' : '.';
        classes[cell] = level === 2 ? 'tone-highlight' : level === 1 ? 'tone-mid' : 'tone-shadow';
        depths[cell] = rotatedZ;
      }

      let output = '';
      for (let row = 0; row < rows; row += 1) {
        let run = '';
        let runClass: string | null = null;

        for (let column = 0; column < columns; column += 1) {
          const cell = row * columns + column;
          const glyph = glyphs[cell] || ' ';
          const glyphClass = glyph === ' ' ? null : classes[cell];

          if (glyphClass === runClass) run += glyph;
          else {
            output += flush(run, runClass);
            run = glyph;
            runClass = glyphClass;
          }
        }

        output += `${flush(run, runClass)}\n`;
      }

      canvas.innerHTML = output;
      counter.textContent = `[rot ${Math.round(((angle % (Math.PI * 2)) / (Math.PI * 2)) * 360).toString().padStart(3, '0')}°]`;
    }

    function animate(time: number) {
      if (!lastTime) lastTime = time;
      const delta = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;
      angle += 0.46 * delta;
      if (visible) render();
      animationFrame = requestAnimationFrame(animate);
    }

    layout();
    render();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { rootMargin: '120px' });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      layout();
      render();
    });
    resizeObserver.observe(canvas);

    if (!reducedMotion) animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });
</script>

<div class="guitar-terminal" id="guitar" aria-label="Rotating shaded ASCII guitar">
  <div class="guitar-terminal-bar">
    <span>$ ./guitar --rotate --shaded</span>
    <span bind:this={counter}>[rot 000°]</span>
  </div>
  <pre bind:this={canvas} class="ascii-guitar" aria-hidden="true"></pre>
  <div class="guitar-terminal-footer">
    <span><span class="status-dot"></span>{reducedMotion ? 'static mode' : 'rotation stream active'}</span>
    <span class="shade-key"><i class="tone-highlight">#</i><i class="tone-mid">+</i><i class="tone-shadow">.</i></span>
  </div>
  <span class="sr-only">Detailed shaded ASCII electric guitar. Rotation respects reduced-motion settings.</span>
</div>
