export const theme = {
  developer: {
    foreground: '#98FF98',
    background: '#0A0A0A',
    accent: '#00CED1',
    muted: '#1A1A1A',
    border: '#2D2D2D',
    card: '#141414',
    cardHover: '#1F1F1F',
  },
  leadership: {
    foreground: '#1E293B',
    background: '#FAF9F6',
    accent: '#D97706',
    muted: '#E5E5E5',
    border: '#D4D4D4',
    card: '#FFFFFF',
    cardHover: '#F5F5F5',
  },
} as const;

export type ThemeKey = keyof typeof theme;

export function getThemeVars(persona: ThemeKey) {
  return theme[persona];
}