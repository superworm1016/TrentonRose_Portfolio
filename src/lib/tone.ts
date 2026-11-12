// Tailwind needs literal class names at build time, so each color token
// gets its classes spelled out here instead of being built with template strings.
export type Tone = {
  text: string;
  bg: string;
  soft: string;
  border: string;
  glow: string;
};

export const tones: Record<string, Tone> = {
  accent: {
    text: 'text-accent',
    bg: 'bg-accent',
    soft: 'bg-accent/10',
    border: 'border-accent/30',
    glow: 'from-accent/25 via-accent/5 to-transparent',
  },
  cyan: {
    text: 'text-cyan',
    bg: 'bg-cyan',
    soft: 'bg-cyan/10',
    border: 'border-cyan/30',
    glow: 'from-cyan/25 via-cyan/5 to-transparent',
  },
  purple: {
    text: 'text-purple',
    bg: 'bg-purple',
    soft: 'bg-purple/10',
    border: 'border-purple/30',
    glow: 'from-purple/25 via-purple/5 to-transparent',
  },
  green: {
    text: 'text-green',
    bg: 'bg-green',
    soft: 'bg-green/10',
    border: 'border-green/30',
    glow: 'from-green/25 via-green/5 to-transparent',
  },
  orange: {
    text: 'text-orange',
    bg: 'bg-orange',
    soft: 'bg-orange/10',
    border: 'border-orange/30',
    glow: 'from-orange/25 via-orange/5 to-transparent',
  },
  pink: {
    text: 'text-pink',
    bg: 'bg-pink',
    soft: 'bg-pink/10',
    border: 'border-pink/30',
    glow: 'from-pink/25 via-pink/5 to-transparent',
  },
};

export const tone = (name: string): Tone => tones[name] ?? tones.accent;
