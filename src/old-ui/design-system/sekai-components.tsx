/**
 * Project Sekai UI Components
 * ===========================
 * React components implementing the authentic SEKAI aesthetic
 */

import React, { useMemo } from 'react';
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  className = '',
  children,
  ...props
}) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`btn btn-${variant} ${sizes[size]} ${glow ? 'animate-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// SEKAI-style dual-language button (Japanese + English)
interface SekaiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  japanese: string;
  english: string;
  skew?: boolean;
  accentColor?: 'cyan' | 'pink' | 'purple';
}

export const SekaiButton: React.FC<SekaiButtonProps> = ({
  japanese,
  english,
  skew = false,
  accentColor = 'cyan',
  className = '',
  ...props
}) => {
  const accentStyles = {
    cyan: 'hover:border-sekai-cyan hover:text-sekai-cyan',
    pink: 'hover:border-sekai-pink hover:text-sekai-pink',
    purple: 'hover:border-sekai-purple hover:text-sekai-purple',
  };

  return (
    <button
      className={`
        flex flex-col items-center gap-0.5
        px-8 py-3 min-w-[160px]
        bg-[rgba(15,15,26,0.85)]
        border border-white/[0.08]
        transition-all duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${skew ? 'skew-x-[-5deg]' : ''}
        [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]
        ${accentStyles[accentColor]}
        hover:bg-[rgba(0,212,170,0.15)]
        hover:shadow-[0_0_20px_rgba(0,212,170,0.15)]
        ${className}
      `}
      {...props}
    >
      <span 
        className={`
          font-primary font-bold text-base tracking-wider text-white
          ${skew ? 'skew-x-[5deg]' : ''}
        `}
      >
        {japanese}
      </span>
      <span 
        className={`
          font-english font-medium text-[9px] tracking-[0.15em] uppercase text-white/60
          ${skew ? 'skew-x-[5deg]' : ''}
        `}
      >
        {english}
      </span>
    </button>
  );
};

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface CardProps {
  variant?: 'default' | 'elevated' | 'accent' | 'glow';
  accentColor?: 'cyan' | 'pink' | 'purple';
  corners?: boolean;
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  accentColor = 'cyan',
  corners = false,
  className = '',
  children,
}) => {
  const variantStyles = {
    default: 'glass',
    elevated: 'glass bg-[rgba(26,26,46,0.8)] shadow-lg',
    accent: 'glass border-l-[3px]',
    glow: 'glass border-sekai-cyan/30 shadow-[0_0_20px_rgba(0,212,170,0.15)]',
  };

  const accentBorderColors = {
    cyan: 'border-l-sekai-cyan bg-gradient-to-r from-sekai-cyan/[0.08]',
    pink: 'border-l-sekai-pink bg-gradient-to-r from-sekai-pink/[0.08]',
    purple: 'border-l-sekai-purple bg-gradient-to-r from-sekai-purple/[0.08]',
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${variant === 'accent' ? accentBorderColors[accentColor] : ''}
        rounded-xl p-6
        transition-all duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        hover:-translate-y-0.5 hover:border-white/10
        ${corners ? 'relative' : ''}
        ${className}
      `}
    >
      {corners && (
        <>
          {/* L-shaped corner accents */}
          <div className="absolute -top-px -left-px w-5 h-5 border-l-2 border-t-2 border-sekai-cyan" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-r-2 border-b-2 border-sekai-cyan" />
        </>
      )}
      {children}
    </div>
  );
};

// ============================================================================
// TEXT COMPONENTS
// ============================================================================

interface GradientTextProps {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  gradient?: 'default' | 'pink';
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

export const GradientText: React.FC<GradientTextProps> = ({
  as: Component = 'span',
  gradient = 'default',
  glow = false,
  className = '',
  children,
}) => {
  const gradients = {
    default: 'bg-gradient-to-r from-sekai-cyan via-sekai-blue to-sekai-purple',
    pink: 'bg-gradient-to-r from-sekai-pink to-sekai-purple',
  };

  return (
    <Component
      className={`
        ${gradients[gradient]}
        bg-clip-text text-transparent
        ${glow ? 'drop-shadow-[0_0_20px_rgba(0,212,170,0.5)]' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// BADGE COMPONENTS
// ============================================================================

interface BadgeProps {
  color?: 'cyan' | 'pink' | 'purple';
  outline?: boolean;
  className?: string;
  children: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'cyan',
  outline = false,
  className = '',
  children,
}) => {
  const colors = {
    cyan: outline
      ? 'border-sekai-cyan text-sekai-cyan'
      : 'bg-sekai-cyan/20 border-sekai-cyan/30 text-sekai-cyan',
    pink: outline
      ? 'border-sekai-pink text-sekai-pink'
      : 'bg-sekai-pink/20 border-sekai-pink/30 text-sekai-pink',
    purple: outline
      ? 'border-sekai-purple text-sekai-purple'
      : 'bg-sekai-purple/20 border-sekai-purple/30 text-sekai-purple',
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-xs font-semibold
        rounded
        border
        ${colors[color]}
        ${outline ? 'bg-transparent' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  errorMessage,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        className={`
          w-full px-4 py-3
          bg-[rgba(15,15,26,0.8)]
          border rounded-lg
          text-white/90 text-sm
          font-primary
          placeholder:text-white/30
          transition-all duration-200
          outline-none
          ${error
            ? 'border-red-500/50 focus:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]'
            : 'border-white/10 hover:border-white/20 focus:border-sekai-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,212,170,0.1)]'
          }
          ${className}
        `}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

export const HeaderLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`
      h-0.5 w-full
      bg-gradient-to-r from-transparent via-sekai-cyan/30 to-transparent
      ${className}
    `}
  />
);

export const AccentLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`
      h-0.5 w-16
      bg-gradient-to-r from-sekai-cyan to-transparent
      rounded
      ${className}
    `}
  />
);

export const Divider: React.FC<{ glow?: boolean; className?: string }> = ({
  glow = false,
  className = '',
}) => (
  <div
    className={`
      h-px w-full my-6
      ${glow
        ? 'bg-gradient-to-r from-transparent via-sekai-cyan/30 to-transparent'
        : 'bg-white/10'
      }
      ${className}
    `}
  />
);

// ============================================================================
// SECTION HEADER
// ============================================================================

interface SectionHeaderProps {
  japanese: string;
  english: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  japanese,
  english,
  className = '',
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex items-center gap-4">
      <h2 className="font-display font-bold text-3xl text-white">
        {japanese}
      </h2>
      <span className="font-english text-xs tracking-[0.2em] uppercase text-sekai-cyan">
        {english}
      </span>
    </div>
    <HeaderLine />
  </div>
);

// ============================================================================
// FLOATING PARTICLES BACKGROUND
// ============================================================================

interface ParticleProps {
  count?: number;
}

// Seeded random for deterministic particle generation
function seededRandom(seed: number): number {
  return Math.abs(Math.sin(seed * 9999.1234) * 10000) % 1;
}

export const FloatingParticles: React.FC<ParticleProps> = ({ count = 20 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: seededRandom(i * 1.1) * 4 + 2,
      left: seededRandom(i * 2.2) * 100,
      delay: seededRandom(i * 3.3) * 20,
      duration: seededRandom(i * 4.4) * 10 + 15,
      opacity: seededRandom(i * 5.5) * 0.3 + 0.1,
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-sekai-cyan blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            opacity: particle.opacity,
            animation: `sekai-particle-float ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// HEXAGON DECORATION
// ============================================================================

interface HexagonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'pink' | 'purple';
  filled?: boolean;
  className?: string;
}

export const Hexagon: React.FC<HexagonProps> = ({
  size = 'md',
  color = 'cyan',
  filled = false,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-9',
    md: 'w-16 h-[72px]',
    lg: 'w-24 h-[108px]',
  };

  const colors = {
    cyan: filled ? 'bg-sekai-cyan/20' : 'border-sekai-cyan/30',
    pink: filled ? 'bg-sekai-pink/20' : 'border-sekai-pink/30',
    purple: filled ? 'bg-sekai-purple/20' : 'border-sekai-purple/30',
  };

  return (
    <div
      className={`
        ${sizes[size]}
        ${colors[color]}
        ${!filled ? 'border' : ''}
        [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
        ${className}
      `}
    />
  );
};

// ============================================================================
// GLASS CONTAINER
// ============================================================================

interface GlassContainerProps {
  intensity?: 'light' | 'default' | 'dark';
  className?: string;
  children: ReactNode;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  intensity = 'default',
  className = '',
  children,
}) => {
  const intensities = {
    light: 'bg-white/5 backdrop-blur-sm',
    default: 'bg-[rgba(20,20,32,0.7)] backdrop-blur-xl',
    dark: 'bg-[rgba(15,15,26,0.85)] backdrop-blur-2xl',
  };

  return (
    <div
      className={`
        ${intensities[intensity]}
        border border-white/[0.06]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ============================================================================
// MODAL/DIALOG
// ============================================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[rgba(5,5,8,0.85)] backdrop-blur-lg z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div
          className="
            bg-[rgba(20,20,32,0.95)]
            border border-white/10
            rounded-2xl
            shadow-2xl
            p-8 max-w-lg w-full
            pointer-events-auto
            animate-scale-in
          "
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                {title}
              </h3>
              <Divider glow className="!my-4" />
            </>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

// ============================================================================
// NAVIGATION ITEM
// ============================================================================

interface NavItemProps {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({
  active = false,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2
      font-primary font-medium
      transition-colors duration-200
      ${active ? 'text-sekai-cyan' : 'text-white/60 hover:text-sekai-cyan'}
    `}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-sekai-cyan shadow-[0_0_10px_var(--sekai-cyan)]" />
    )}
  </button>
);

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Button,
  SekaiButton,
  Card,
  GradientText,
  Badge,
  Input,
  HeaderLine,
  AccentLine,
  Divider,
  SectionHeader,
  FloatingParticles,
  Hexagon,
  GlassContainer,
  Modal,
  NavItem,
};
