// Design System Tokens
export const tokens = {
  // Color Palette
  colors: {
    brand: {
      primary: 'hsl(15 75% 55%)',      // Terra cotta
      primaryLight: 'hsl(15 85% 65%)', // Lighter terra cotta
      primaryDark: 'hsl(15 65% 45%)',  // Darker terra cotta
      accent: 'hsl(40 95% 60%)',       // Warm amber
      accentLight: 'hsl(40 100% 70%)',
      accentDark: 'hsl(40 85% 50%)'
    },
    status: {
      success: 'hsl(140 75% 45%)',     // Fresh green
      warning: 'hsl(40 95% 60%)',      // Warm orange
      error: 'hsl(0 75% 55%)',         // Warm red
      info: 'hsl(210 75% 55%)'         // Blue
    },
    neutral: {
      50: 'hsl(45 25% 97%)',
      100: 'hsl(45 20% 94%)',
      200: 'hsl(45 15% 88%)',
      300: 'hsl(45 15% 82%)',
      400: 'hsl(25 15% 65%)',
      500: 'hsl(25 15% 45%)',
      600: 'hsl(25 20% 35%)',
      700: 'hsl(25 25% 25%)',
      800: 'hsl(25 25% 15%)',
      900: 'hsl(25 25% 8%)'
    }
  },

  // Typography Scale (in rem)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px - body text
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px - headings
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px - hero text
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
  },

  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  },

  // Spacing Scale (in rem)
  spacing: {
    '0.5': '0.125rem', // 2px
    '1': '0.25rem',    // 4px
    '1.5': '0.375rem', // 6px
    '2': '0.5rem',     // 8px
    '2.5': '0.625rem', // 10px
    '3': '0.75rem',    // 12px
    '3.5': '0.875rem', // 14px
    '4': '1rem',       // 16px - base
    '5': '1.25rem',    // 20px
    '6': '1.5rem',     // 24px
    '7': '1.75rem',    // 28px
    '8': '2rem',       // 32px
    '10': '2.5rem',    // 40px
    '12': '3rem',      // 48px
    '16': '4rem',      // 64px
    '20': '5rem',      // 80px
    '24': '6rem'       // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px - cards
    '3xl': '3rem',    // 48px
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px hsl(25 25% 15% / 0.05)',
    DEFAULT: '0 4px 12px hsl(25 25% 15% / 0.1)',
    md: '0 4px 12px hsl(25 25% 15% / 0.1)',
    lg: '0 12px 24px hsl(25 25% 15% / 0.15)',
    xl: '0 20px 40px hsl(25 25% 15% / 0.2)',
    brand: '0 8px 24px hsl(15 75% 55% / 0.25)',
    glow: '0 0 40px hsl(15 85% 65% / 0.4)'
  },

  // Animation Durations (in ms)
  animation: {
    fast: '120ms',
    normal: '180ms',
    slow: '300ms'
  },

  // Transition Timing Functions
  timing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-Index Scale
  zIndex: {
    base: '0',
    raised: '10',
    dropdown: '1000',
    sticky: '1020',
    overlay: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
    max: '9999'
  }
} as const;

// Type helpers
export type ColorTokens = typeof tokens.colors;
export type FontSizeTokens = typeof tokens.fontSize;
export type SpacingTokens = typeof tokens.spacing;
export type BorderRadiusTokens = typeof tokens.borderRadius;