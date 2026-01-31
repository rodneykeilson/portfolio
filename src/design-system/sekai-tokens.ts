/**
 * Project Sekai: Colorful Stage Design System
 * ===========================================
 * Comprehensive TypeScript design tokens for recreating 
 * the authentic Project Sekai UI aesthetic
 * 
 * Based on analysis of:
 * - TopMenuAtlas (trapezoid buttons, menu layouts)
 * - CommonAtlas (UI elements, icons)
 * - FrameAtlas (borders, corner accents)
 * - HeaderTitleAtlas (section headers)
 * - Official game visual language
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ColorToken {
  hex: string;
  rgb: string;
  hsl?: string;
  description?: string;
  usage?: string;
}

export interface FontFamily {
  name: string;
  css: string;
  googleFontsUrl?: string;
  webAlternatives?: string[];
  fallback?: string;
}

export interface FontSize {
  size: string;
  px: string;
  use: string;
}

export interface Animation {
  keyframes: Record<string, Record<string, string | number>>;
  duration: string;
  easing: string;
  css?: string;
}

export interface GlowEffect {
  subtle: string;
  medium: string;
  strong: string;
  intense?: string;
}

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Brand Colors - The SEKAI Signature Palette
  brand: {
    cyan: {
      DEFAULT: '#00D4AA',
      50: '#E6FFF8',
      100: '#B3FFE9',
      200: '#80FFD9',
      300: '#4DFFCA',
      400: '#1AFFBA',
      500: '#00D4AA',
      600: '#00A888',
      700: '#007C66',
      800: '#005044',
      900: '#002422',
      glow: '#00FFD0',
    },
    pink: {
      DEFAULT: '#FF6B9D',
      50: '#FFF0F5',
      100: '#FFD6E4',
      200: '#FFADC8',
      300: '#FF85AC',
      400: '#FF6B9D',
      500: '#FF4D88',
      600: '#E6336E',
      700: '#B82658',
      800: '#8A1C42',
      900: '#5C122C',
      glow: '#FF4D88',
    },
    purple: {
      DEFAULT: '#9B5DE5',
      50: '#F5F0FF',
      100: '#E5D6FF',
      200: '#CBADFF',
      300: '#B185FF',
      400: '#9B5DE5',
      500: '#8040D0',
      600: '#6630A6',
      700: '#4D247D',
      800: '#331853',
      900: '#1A0C2A',
      glow: '#B47EEF',
    },
    blue: {
      DEFAULT: '#00B4D8',
      light: '#33C9E8',
      dark: '#008CAA',
      glow: '#00E5FF',
    },
    yellow: {
      DEFAULT: '#FFD93D',
      light: '#FFE566',
      dark: '#E6C235',
      glow: '#FFEC80',
    },
    orange: {
      DEFAULT: '#FF8C42',
      light: '#FFA366',
      dark: '#E67330',
    },
  },

  // Unit Colors - Each group's signature colors
  units: {
    leoneed: {
      primary: '#4A6EE0',
      secondary: '#2D4A9E',
      light: '#6B8BE8',
      dark: '#1E3580',
      name: 'School Blue',
      japanese: 'レオニ',
    },
    moreMoreJump: {
      primary: '#88DD44',
      secondary: '#5FB030',
      light: '#A3E866',
      dark: '#4A9022',
      name: 'Bright Green',
      japanese: 'モモジャン',
    },
    vividBadSquad: {
      primary: '#EE6666',
      secondary: '#CC3333',
      light: '#F28888',
      dark: '#AA2222',
      name: 'Vivid Red',
      japanese: 'ビビバス',
    },
    wonderlandsShowtime: {
      primary: '#FFCC11',
      secondary: '#E6A800',
      light: '#FFD744',
      dark: '#CC9900',
      name: 'Pop Yellow',
      japanese: 'ワンダショ',
    },
    nightcord: {
      primary: '#884499',
      secondary: '#663377',
      light: '#AA66BB',
      dark: '#552266',
      name: 'Dark Purple',
      japanese: 'ニーゴ',
    },
    virtualSingers: {
      primary: '#33CCBB',
      secondary: '#22AA99',
      light: '#55DDC9',
      dark: '#118877',
      name: 'Virtual Teal',
      japanese: 'バチャシン',
    },
  },

  // Background Layers - The void aesthetic
  background: {
    void: '#050508',        // Deepest black-blue
    primary: '#0A0A12',     // Main background
    secondary: '#0F0F1A',   // Slightly elevated
    card: '#141420',        // Card backgrounds
    elevated: '#1A1A2E',    // Modals, dropdowns
    hover: '#1E1E35',       // Hover states
    active: '#252540',      // Active/pressed states
  },

  // Glass/Transparency
  glass: {
    background: 'rgba(20, 20, 32, 0.7)',
    backgroundLight: 'rgba(26, 26, 46, 0.5)',
    backgroundDark: 'rgba(15, 15, 26, 0.85)',
    border: 'rgba(255, 255, 255, 0.06)',
    borderHover: 'rgba(255, 255, 255, 0.12)',
    borderActive: 'rgba(0, 212, 170, 0.3)',
  },

  // Text Hierarchy
  text: {
    primary: '#F5F5FF',     // Main text - slight blue tint
    secondary: '#A0A0B8',   // Secondary text
    muted: '#606080',       // Muted/placeholder
    disabled: '#404055',    // Disabled text
    inverse: '#0A0A12',     // Text on light backgrounds
    accent: '#00D4AA',      // Accent text
  },

  // Semantic Colors
  semantic: {
    success: '#00D4AA',
    warning: '#FFD93D',
    error: '#FF4757',
    info: '#00B4D8',
  },
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  // Background Gradients
  sekaiVoid: 'radial-gradient(ellipse at center, #0F0F1A 0%, #050508 70%)',
  sekaiVoidDeep: 'radial-gradient(ellipse at center, #0A0A12 0%, #030305 100%)',
  
  // Glow Overlays
  cyanGlow: 'radial-gradient(ellipse at 30% 20%, rgba(0, 212, 170, 0.15) 0%, transparent 50%)',
  pinkGlow: 'radial-gradient(ellipse at 70% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 50%)',
  purpleGlow: 'radial-gradient(ellipse at 50% 50%, rgba(155, 93, 229, 0.1) 0%, transparent 60%)',
  multiGlow: 'radial-gradient(ellipse at 30% 20%, rgba(0, 212, 170, 0.12) 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(255, 107, 157, 0.08) 0%, transparent 40%)',
  
  // Button Gradients
  cyanAccent: 'linear-gradient(135deg, #00D4AA 0%, #00A888 100%)',
  cyanAccentHover: 'linear-gradient(135deg, #33E5C4 0%, #00D4AA 100%)',
  pinkPurple: 'linear-gradient(135deg, #FF6B9D 0%, #9B5DE5 100%)',
  
  // Card/Surface Gradients
  cardShine: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
  cardAccent: 'linear-gradient(90deg, rgba(0, 212, 170, 0.08) 0%, rgba(20, 20, 32, 0.7) 30%)',
  
  // Decorative
  headerLine: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 170, 0.3) 20%, rgba(0, 212, 170, 0.3) 80%, transparent 100%)',
  accentLine: 'linear-gradient(90deg, #00D4AA 0%, transparent 100%)',
  rainbowSubtle: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(0, 180, 216, 0.2) 33%, rgba(155, 93, 229, 0.2) 66%, rgba(255, 107, 157, 0.2) 100%)',
  
  // Text Gradients
  textGradient: 'linear-gradient(135deg, #00D4AA 0%, #00B4D8 50%, #9B5DE5 100%)',
  textGradientPink: 'linear-gradient(135deg, #FF6B9D 0%, #9B5DE5 100%)',
} as const;

// ============================================================================
// SHADOWS & GLOWS
// ============================================================================

export const shadows = {
  // Standard Shadows
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  base: '0 2px 4px rgba(0, 0, 0, 0.4)',
  md: '0 4px 8px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.6)',
  '2xl': '0 24px 48px rgba(0, 0, 0, 0.7)',

  // Glow Effects
  glowCyan: {
    subtle: '0 0 20px rgba(0, 212, 170, 0.15)',
    medium: '0 0 30px rgba(0, 212, 170, 0.25)',
    strong: '0 0 40px rgba(0, 212, 170, 0.4)',
    intense: '0 0 60px rgba(0, 212, 170, 0.5), 0 0 100px rgba(0, 212, 170, 0.2)',
  },
  glowPink: {
    subtle: '0 0 20px rgba(255, 107, 157, 0.15)',
    medium: '0 0 30px rgba(255, 107, 157, 0.25)',
    strong: '0 0 40px rgba(255, 107, 157, 0.4)',
  },
  glowPurple: {
    subtle: '0 0 20px rgba(155, 93, 229, 0.15)',
    medium: '0 0 30px rgba(155, 93, 229, 0.25)',
    strong: '0 0 40px rgba(155, 93, 229, 0.4)',
  },
  glowMulti: '0 0 20px rgba(0, 212, 170, 0.2), 0 0 40px rgba(155, 93, 229, 0.1), 0 0 60px rgba(255, 107, 157, 0.1)',

  // Inset Effects
  insetSubtle: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  insetBorder: 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    // Primary - Japanese Gothic (FOT-Rodin style)
    primary: "'Zen Kaku Gothic New', 'M PLUS 1p', 'Noto Sans JP', system-ui, sans-serif",
    
    // Display - Geometric for impact headings
    display: "'Outfit', 'Exo 2', system-ui, sans-serif",
    
    // English - Clean sans for English labels
    english: "'Inter', 'Outfit', system-ui, sans-serif",
    
    // Mono - For code/numbers
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSize: {
    xs: ['0.625rem', { lineHeight: '1rem' }],      // 10px
    sm: ['0.75rem', { lineHeight: '1.25rem' }],    // 12px
    base: ['0.875rem', { lineHeight: '1.5rem' }],  // 14px
    md: ['1rem', { lineHeight: '1.5rem' }],        // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
    '3xl': ['2rem', { lineHeight: '2.5rem' }],     // 32px
    '4xl': ['2.5rem', { lineHeight: '3rem' }],     // 40px
    '5xl': ['3rem', { lineHeight: '3.5rem' }],     // 48px
    '6xl': ['4rem', { lineHeight: '4.5rem' }],     // 64px
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    japanese: '0.05em',  // Standard for Japanese text
    english: '0.1em',    // Wider for small English labels
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Text Style Presets
  textStyles: {
    // Hero/Display
    hero: {
      fontFamily: "'Outfit', system-ui, sans-serif",
      fontSize: '4rem',
      fontWeight: '800',
      letterSpacing: '-0.02em',
      lineHeight: '1.1',
    },
    
    // Section Headers
    sectionHeader: {
      fontFamily: "'Outfit', system-ui, sans-serif",
      fontSize: '2rem',
      fontWeight: '700',
      letterSpacing: '0',
      lineHeight: '1.25',
    },
    
    // Card Titles
    cardTitle: {
      fontFamily: "'Zen Kaku Gothic New', system-ui, sans-serif",
      fontSize: '1.25rem',
      fontWeight: '700',
      letterSpacing: '0.02em',
    },
    
    // Button - Japanese Primary
    buttonJapanese: {
      fontFamily: "'Zen Kaku Gothic New', system-ui, sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      letterSpacing: '0.05em',
    },
    
    // Button - English Subtitle
    buttonEnglish: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.5625rem', // 9px
      fontWeight: '500',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
    },
    
    // Body Text
    body: {
      fontFamily: "'Zen Kaku Gothic New', system-ui, sans-serif",
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
    
    // Caption/Small
    caption: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.75rem',
      fontWeight: '400',
      letterSpacing: '0.02em',
    },
  },

  // Google Fonts Import URLs
  googleFontsImport: `
    @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=M+PLUS+1p:wght@300;400;500;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
  `,
} as const;

// ============================================================================
// SPACING & SIZING
// ============================================================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
  // Special shapes
  trapezoidLeft: '8px 24px 24px 8px',
  trapezoidRight: '24px 8px 8px 24px',
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  timing: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '1000ms',
  },

  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    sekai: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Signature smooth
  },

  keyframes: {
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    fadeInUp: {
      from: { opacity: '0', transform: 'translateY(20px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    fadeInDown: {
      from: { opacity: '0', transform: 'translateY(-20px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    slideInRight: {
      from: { opacity: '0', transform: 'translateX(30px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
    slideInLeft: {
      from: { opacity: '0', transform: 'translateX(-30px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
    scaleIn: {
      from: { opacity: '0', transform: 'scale(0.9)' },
      to: { opacity: '1', transform: 'scale(1)' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    glow: {
      '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)' },
      '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.4)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    borderGlow: {
      '0%, 100%': { borderColor: 'rgba(0, 212, 170, 0.3)' },
      '50%': { borderColor: 'rgba(0, 212, 170, 0.6)' },
    },
  },

  // Pre-built animation strings
  presets: {
    cardEnter: 'fadeInUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    buttonHover: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
    menuSlide: 'slideInRight 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    modalEnter: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    loadingPulse: 'pulse 2s ease-in-out infinite',
    glowPulse: 'glow 3s ease-in-out infinite',
    floating: 'float 6s ease-in-out infinite',
  },
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  default: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
  fast: 'all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)',
  slow: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
  spring: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  color: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
  transform: 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
  opacity: 'opacity 0.25s ease',
  glow: 'box-shadow 0.3s ease',
} as const;

// ============================================================================
// GEOMETRIC PATTERNS
// ============================================================================

export const patterns = {
  // Clip paths for shapes
  clipPaths: {
    hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    rhombus: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    trapezoidLeft: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
    trapezoidRight: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
    parallelogramLeft: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
    chevronRight: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)',
  },

  // Background patterns (CSS)
  diagonalStripes: `repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 212, 170, 0.03) 10px,
    rgba(0, 212, 170, 0.03) 20px
  )`,

  hexGrid: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='%2300D4AA' fill-opacity='0.03'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9z'/%3E%3C/g%3E%3C/svg%3E")`,

  dots: `radial-gradient(circle, rgba(0, 212, 170, 0.1) 1px, transparent 1px)`,
  dotsSize: '20px 20px',
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const components = {
  // Button Variants
  button: {
    primary: {
      background: gradients.cyanAccent,
      backgroundHover: gradients.cyanAccentHover,
      color: colors.background.primary,
      border: 'none',
      boxShadow: '0 4px 16px rgba(0, 212, 170, 0.3)',
      boxShadowHover: '0 6px 24px rgba(0, 212, 170, 0.4)',
    },
    secondary: {
      background: 'rgba(20, 20, 32, 0.8)',
      backgroundHover: 'rgba(30, 30, 50, 0.9)',
      color: colors.text.primary,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderHover: '1px solid rgba(0, 212, 170, 0.3)',
    },
    ghost: {
      background: 'transparent',
      backgroundHover: 'rgba(0, 212, 170, 0.1)',
      color: colors.brand.cyan.DEFAULT,
      border: '1px solid rgba(0, 212, 170, 0.3)',
      borderHover: '1px solid rgba(0, 212, 170, 0.5)',
    },
    menu: {
      background: 'rgba(15, 15, 26, 0.85)',
      backgroundHover: 'rgba(0, 212, 170, 0.15)',
      color: colors.text.primary,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderHover: '1px solid rgba(0, 212, 170, 0.4)',
      transform: 'skewX(-5deg)',
    },
  },

  // Card Styles
  card: {
    base: {
      background: colors.glass.background,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${colors.glass.border}`,
      borderRadius: borderRadius.md,
      boxShadow: shadows.md,
    },
    elevated: {
      background: 'rgba(26, 26, 46, 0.8)',
      boxShadow: shadows.lg,
    },
    accent: {
      borderLeft: `3px solid ${colors.brand.cyan.DEFAULT}`,
      background: gradients.cardAccent,
    },
    glowing: {
      border: `1px solid ${colors.glass.borderActive}`,
      boxShadow: shadows.glowCyan.subtle,
    },
  },

  // Glass Morphism
  glass: {
    default: {
      background: colors.glass.background,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: `1px solid ${colors.glass.border}`,
    },
    strong: {
      background: colors.glass.backgroundDark,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${colors.glass.borderHover}`,
    },
  },

  // Input Fields
  input: {
    base: {
      background: 'rgba(15, 15, 26, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: borderRadius.base,
      color: colors.text.primary,
      fontSize: typography.fontSize.base[0],
    },
    focus: {
      border: `1px solid rgba(0, 212, 170, 0.5)`,
      boxShadow: '0 0 0 3px rgba(0, 212, 170, 0.1)',
    },
    error: {
      border: '1px solid rgba(255, 71, 87, 0.5)',
      boxShadow: '0 0 0 3px rgba(255, 71, 87, 0.1)',
    },
  },

  // Modal/Dialog
  modal: {
    overlay: {
      background: 'rgba(5, 5, 8, 0.85)',
      backdropFilter: 'blur(8px)',
    },
    content: {
      background: 'rgba(20, 20, 32, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: borderRadius.lg,
      boxShadow: shadows['2xl'],
    },
  },

  // Badge/Tag
  badge: {
    default: {
      background: 'rgba(0, 212, 170, 0.2)',
      color: colors.brand.cyan.DEFAULT,
      border: `1px solid rgba(0, 212, 170, 0.3)`,
      borderRadius: borderRadius.sm,
      fontSize: typography.fontSize.sm[0],
      fontWeight: typography.fontWeight.semibold,
    },
  },
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
  overlay: 80,
  max: 100,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// CSS CUSTOM PROPERTIES (for :root)
// ============================================================================

export const cssVariables = `
:root {
  /* Brand Colors */
  --sekai-cyan: #00D4AA;
  --sekai-cyan-light: #33E5C4;
  --sekai-cyan-dark: #00A888;
  --sekai-cyan-glow: #00FFD0;
  --sekai-pink: #FF6B9D;
  --sekai-pink-glow: #FF4D88;
  --sekai-purple: #9B5DE5;
  --sekai-purple-glow: #B47EEF;
  --sekai-blue: #00B4D8;
  --sekai-yellow: #FFD93D;

  /* Backgrounds */
  --bg-void: #050508;
  --bg-primary: #0A0A12;
  --bg-secondary: #0F0F1A;
  --bg-card: #141420;
  --bg-elevated: #1A1A2E;
  --bg-hover: #1E1E35;

  /* Glass */
  --glass-bg: rgba(20, 20, 32, 0.7);
  --glass-bg-strong: rgba(15, 15, 26, 0.85);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-border-hover: rgba(255, 255, 255, 0.12);
  --glass-border-active: rgba(0, 212, 170, 0.3);

  /* Text */
  --text-primary: #F5F5FF;
  --text-secondary: #A0A0B8;
  --text-muted: #606080;
  --text-disabled: #404055;

  /* Shadows & Glows */
  --glow-cyan-subtle: 0 0 20px rgba(0, 212, 170, 0.15);
  --glow-cyan-medium: 0 0 30px rgba(0, 212, 170, 0.25);
  --glow-cyan-strong: 0 0 40px rgba(0, 212, 170, 0.4);

  /* Fonts */
  --font-primary: 'Zen Kaku Gothic New', 'M PLUS 1p', 'Noto Sans JP', system-ui, sans-serif;
  --font-display: 'Outfit', 'Exo 2', system-ui, sans-serif;
  --font-english: 'Inter', 'Outfit', system-ui, sans-serif;

  /* Transitions */
  --transition-default: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  --transition-fast: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  --easing-sekai: cubic-bezier(0.25, 0.1, 0.25, 1);
  --easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Radii */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
`;

// ============================================================================
// PARTICLE SYSTEM CONFIG
// ============================================================================

export const particles = {
  floating: {
    count: 30,
    sizeRange: [2, 6],
    opacityRange: [0.1, 0.4],
    color: colors.brand.cyan.DEFAULT,
    speedRange: [0.2, 0.8],
    direction: 'upward' as const,
    blur: '1px',
  },
  stars: {
    count: 50,
    sizeRange: [1, 3],
    opacityRange: [0.2, 0.8],
    twinkle: true,
    twinkleDuration: '3s',
  },
  hexagons: {
    count: 15,
    sizeRange: [10, 30],
    opacity: 0.1,
    rotation: true,
    color: colors.brand.cyan.DEFAULT,
  },
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export const sekaiDesignSystem = {
  colors,
  gradients,
  shadows,
  typography,
  spacing,
  borderRadius,
  animations,
  transitions,
  patterns,
  components,
  zIndex,
  breakpoints,
  cssVariables,
  particles,
} as const;

export default sekaiDesignSystem;
