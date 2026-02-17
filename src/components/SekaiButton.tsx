import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

/**
 * SEKAI Trapezoid Button
 * 
 * The iconic Project Sekai button style with:
 * - Trapezoid/parallelogram shape via clip-path
 * - Japanese text on top (larger)
 * - English subtitle below (smaller, uppercase)
 * - Shimmer effect on hover
 * 
 * Usage:
 * <SekaiButton 
 *   japanese="ホーム" 
 *   english="HOME"
 *   onClick={() => {}}
 * />
 */

interface SekaiButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  japanese: string;
  english: string;
  variant?: 'cyan' | 'pink' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function SekaiButton({
  japanese,
  english,
  variant = 'cyan',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: SekaiButtonProps) {
  const variantClass = variant !== 'cyan' ? `btn-sekai-${variant}` : '';
  const primaryLabel = english || japanese;
  const secondaryLabel = '';
  
  const sizeStyles = {
    sm: 'py-2 px-6 min-w-[120px]',
    md: 'py-3.5 px-9 min-w-[170px]',
    lg: 'py-4 px-12 min-w-[200px]',
  };
  
  const jpSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <motion.button
      className={`
        btn-sekai ${variantClass}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className={`btn-sekai__jp ${jpSizeStyles[size]}`}>{primaryLabel}</span>
      {secondaryLabel && <span className="btn-sekai__en">{secondaryLabel}</span>}
    </motion.button>
  );
}

/**
 * SEKAI Icon Button
 * For navigation items with icon + dual text
 */
interface SekaiIconButtonProps extends SekaiButtonProps {
  icon: React.ReactNode;
}

export function SekaiIconButton({
  japanese,
  english,
  icon,
  variant = 'cyan',
  className = '',
  ...props
}: SekaiIconButtonProps) {
  const variantClass = variant !== 'cyan' ? `btn-sekai-${variant}` : '';
  const primaryLabel = english || japanese;
  const secondaryLabel = '';

  return (
    <motion.button
      className={`
        btn-sekai ${variantClass}
        flex flex-row items-center gap-3
        py-3 px-6 min-w-[180px]
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="text-xl opacity-80">{icon}</span>
      <div className="flex flex-col items-start">
        <span className="btn-sekai__jp text-sm">{primaryLabel}</span>
        {secondaryLabel && <span className="btn-sekai__en">{secondaryLabel}</span>}
      </div>
    </motion.button>
  );
}

/**
 * Navigation Link with SEKAI styling (smaller, for nav bar)
 */
interface SekaiNavLinkProps {
  japanese: string;
  english: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SekaiNavLink({
  japanese,
  english,
  href,
  isActive = false,
  onClick,
}: SekaiNavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`
        group flex flex-col items-center gap-0.5 px-4 py-2
        transition-colors duration-300
        ${isActive ? 'text-[var(--color-sekai-cyan)]' : 'text-[var(--color-text-secondary)]'}
        hover:text-[var(--color-sekai-cyan)]
      `}
      whileHover={{ y: -2 }}
    >
      <span className="font-jp text-sm font-medium tracking-wider">
        {japanese}
      </span>
      <span className="font-en text-[9px] font-medium tracking-[0.15em] uppercase opacity-60 group-hover:opacity-80">
        {english}
      </span>
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 w-8 h-0.5 bg-[var(--color-sekai-cyan)] rounded-full"
          layoutId="navIndicator"
          style={{ x: '-50%' }}
        />
      )}
    </motion.a>
  );
}

export default SekaiButton;
