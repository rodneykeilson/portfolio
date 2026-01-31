import { motion } from 'framer-motion';

// ============================================================================
// SEKAI Ambient Effects
// 
// Holographic overlays, light rays, and atmospheric effects
// inspired by the actual Project Sekai UI
// ============================================================================

const BASE = import.meta.env.BASE_URL || '/';

// Holographic gradient overlay that subtly shifts
export function HolographicOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '10%', '-20%'],
          y: ['-10%', '20%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['20%', '-10%', '20%'],
          y: ['60%', '40%', '60%'],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          left: '40%',
          top: '30%',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['0%', '-20%', '0%'],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
      />
    </div>
  );
}

// Light rays effect (like from Project Sekai menu screens)
export function LightRays() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Top-left rays */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[800px]"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.03) 0%, transparent 60%)',
          transform: 'rotate(-15deg)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Top-right rays */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[400px] h-[600px]"
        style={{
          background: 'linear-gradient(-135deg, rgba(255, 107, 157, 0.02) 0%, transparent 60%)',
          transform: 'rotate(15deg)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </div>
  );
}

// Diagonal scan line effect (like SEKAI loading screens)
export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {/* Repeating thin diagonal lines */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 50px,
            rgba(0, 212, 170, 0.5) 50px,
            rgba(0, 212, 170, 0.5) 51px
          )`,
        }}
      />
      
      {/* Animated scan line */}
      <motion.div
        className="absolute h-[2px] w-[200%]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.15), transparent)',
          top: '50%',
          left: '-50%',
          transform: 'rotate(-45deg)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Corner decorations using SEKAI sprites
export function CornerDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Top-left corner */}
      <div className="absolute top-6 left-6">
        <div className="w-12 h-12 relative">
          <motion.div 
            className="absolute inset-0 border-l-2 border-t-2 border-[var(--color-sekai-cyan)] opacity-40"
            style={{ borderRadius: '8px 0 0 0' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.img
            src={`${BASE}sekai-sprites/misc/img_triangle_wh.png`}
            alt=""
            className="absolute top-0 left-0 w-4 h-4 opacity-30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
      
      {/* Bottom-right corner */}
      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-12 relative">
          <motion.div 
            className="absolute inset-0 border-r-2 border-b-2 border-[var(--color-sekai-pink)] opacity-40"
            style={{ borderRadius: '0 0 8px 0' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
          <motion.img
            src={`${BASE}sekai-sprites/misc/img_triangle_wh.png`}
            alt=""
            className="absolute bottom-0 right-0 w-4 h-4 opacity-30 rotate-180"
            animate={{ rotate: [180, -180] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
      
      {/* Diamond accents */}
      <motion.div
        className="absolute top-1/4 right-8 w-2 h-2 rotate-45 border border-[var(--color-sekai-cyan)] opacity-20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-8 w-2 h-2 rotate-45 border border-[var(--color-sekai-pink)] opacity-20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}

// Combine all ambient effects
export function SekaiAmbientEffects() {
  return (
    <>
      <HolographicOverlay />
      <LightRays />
      <ScanLines />
      <CornerDecorations />
    </>
  );
}
