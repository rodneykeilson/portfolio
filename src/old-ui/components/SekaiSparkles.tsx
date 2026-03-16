import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// ============================================================================
// SEKAI Magical Sparkles
// 
// Uses actual extracted sprites from Project Sekai for authentic effects:
// - eff_kira_h100_wh.png - Main sparkle/kira effect
// - eff_0-9_150.png - Various sparkle animations
// - Burst effects on interactions
// ============================================================================

const BASE = import.meta.env.BASE_URL || '/';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  sprite: string;
  rotation: number;
  duration: number;
  delay: number;
}

// SEKAI sparkle sprites
const SPARKLE_SPRITES = [
  `${BASE}sekai-sprites/misc/eff_kira_h100_wh.png`,
  `${BASE}sekai-sprites/misc/eff_kira_h20_wh.png`,
  `${BASE}sekai-sprites/misc/eff_0_150.png`,
  `${BASE}sekai-sprites/misc/eff_1_150.png`,
  `${BASE}sekai-sprites/misc/eff_2_150.png`,
  `${BASE}sekai-sprites/misc/eff_3_150.png`,
  `${BASE}sekai-sprites/misc/eff_4_150.png`,
  `${BASE}sekai-sprites/misc/eff_5_150.png`,
  `${BASE}sekai-sprites/misc/eff_6_150.png`,
  `${BASE}sekai-sprites/misc/eff_7_150.png`,
  `${BASE}sekai-sprites/misc/eff_8_150.png`,
  `${BASE}sekai-sprites/misc/eff_9_150.png`,
];

let sparkleIdCounter = 0;

export function SekaiSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Generate random sparkles that appear and fade
  useEffect(() => {
    const createSparkle = () => {
      const sparkle: Sparkle = {
        id: sparkleIdCounter++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 32,
        sprite: SPARKLE_SPRITES[Math.floor(Math.random() * SPARKLE_SPRITES.length)],
        rotation: Math.random() * 360,
        duration: 2 + Math.random() * 3,
        delay: 0,
      };
      return sparkle;
    };

    // Initial sparkles - reduced for performance
    const initial = Array.from({ length: 4 }, createSparkle);
    setSparkles(initial);

    // Add new sparkles periodically - slower for performance
    const interval = setInterval(() => {
      setSparkles(prev => {
        // Keep fewer sparkles for performance
        const filtered = prev.filter((_, i) => i > prev.length - 8);
        return [...filtered, createSparkle()];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 8 }}>
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.img
            key={sparkle.id}
            src={sparkle.sprite}
            alt=""
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size,
              filter: 'drop-shadow(0 0 8px rgba(0, 212, 170, 0.5))',
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: sparkle.rotation 
            }}
            animate={{ 
              opacity: [0, 0.8, 0.6, 0],
              scale: [0, 1.2, 1, 0.8],
              rotate: sparkle.rotation + 180,
              y: [-10, -30],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: sparkle.duration,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Generate particles with stable random values (seeded by index)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Floating kira particles for magical atmosphere
export function FloatingKira() {
  // Generate particles with deterministic random values - reduced for performance
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1.1) * 100,
    xDrift: (seededRandom(i * 2.3) - 0.5) * 100,
    delay: seededRandom(i * 3.7) * 5,
    duration: 8 + seededRandom(i * 4.9) * 6,
    size: 8 + seededRandom(i * 5.3) * 16,
    sprite: SPARKLE_SPRITES[Math.floor(seededRandom(i * 6.1) * 4)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 6 }}>
      {particles.map(particle => (
        <motion.img
          key={particle.id}
          src={particle.sprite}
          alt=""
          className="absolute"
          style={{
            left: `${particle.x}%`,
            bottom: '-5%',
            width: particle.size,
            height: particle.size,
            opacity: 0.4,
            filter: 'drop-shadow(0 0 4px rgba(255, 107, 157, 0.4))',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, particle.xDrift],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
