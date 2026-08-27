export const navItems = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'github', href: '#github' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' }
];

export const projects = [
  {
    number: '01',
    title: 'portfolio.os',
    description: 'A terminal-native portfolio system built around clarity, motion, and useful details.',
    tags: ['svelte', 'typescript', 'design'],
    status: 'current',
    href: '#top'
  },
  {
    number: '02',
    title: 'guitar.lab',
    description: 'A rotating ASCII instrument for learning, unwinding, and making space for music.',
    tags: ['ascii', 'svelte', 'creative'],
    status: 'rotating',
    href: '#guitar'
  },
  {
    number: '03',
    title: 'open-source.trail',
    description: 'Small tools and experiments that turn curiosity into something other people can use.',
    tags: ['github', 'tools', 'learning'],
    status: 'ongoing',
    href: 'https://github.com/mayopi'
  }
];

export const stack = [
  { name: 'Svelte / SvelteKit', level: 'shipping' },
  { name: 'TypeScript', level: 'shipping' },
  { name: 'React / Next.js', level: 'familiar' },
  { name: 'Three.js / WebGL', level: 'experimenting' },
  { name: 'GitHub API', level: 'daily driver' },
  { name: 'Figma / UI systems', level: 'crafting' }
];

export const commands = ['help', 'about', 'work', 'github', 'stack', 'contact', 'clear'];
