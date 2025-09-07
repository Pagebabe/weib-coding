// Design tokens for a consistent UI across DE/EN/TH
export type ColorName = 'primary'|'text'|'muted'|'background'|'cardBorder';

export const DesignTokens = {
  colors: {
    primary: '#1e40af', // blue-600
    text: '#111827',
    muted: '#6b7280',
    background: '#ffffff',
    cardBorder: '#e5e7eb'
  } as const,
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
    headingScale: '700 1.25rem',
    bodyScale: '400 1rem'
  } as const,
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  } as const,
  radii: {
    sm: '6px',
    md: '12px',
    lg: '16px'
  } as const
};

export type DesignType = typeof DesignTokens;


