import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const BASE = import.meta.env.BASE_URL || '/';

// SEKAI sparkle sprites for burst effects
const SPARKLE_SPRITES = [
  `${BASE}sekai-sprites/misc/eff_kira_h100_wh.png`,
  `${BASE}sekai-sprites/misc/eff_kira_h20_wh.png`,
  `${BASE}sekai-sprites/misc/eff_0_150.png`,
  `${BASE}sekai-sprites/misc/eff_1_150.png`,
  `${BASE}sekai-sprites/misc/eff_2_150.png`,
  `${BASE}sekai-sprites/misc/eff_3_150.png`,
];

interface SparklePoint {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  sprite: string;
  rotation: number;
}

let sparkleIdCounter = 0;

// Interactive sparkle burst for click/hover effects
export function useSparkleEffect() {
  const [bursts, setBursts] = useState<SparklePoint[]>([]);

  const triggerBurst = useCallback((clientX: number, clientY: number, count = 8) => {
    const newBursts: SparklePoint[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const speed = 50 + Math.random() * 100;
      
      newBursts.push({
        id: sparkleIdCounter++,
        x: clientX,
        y: clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 12 + Math.random() * 20,
        sprite: SPARKLE_SPRITES[Math.floor(Math.random() * SPARKLE_SPRITES.length)],
        rotation: Math.random() * 360,
      });
    }
    
    setBursts(prev => [...prev, ...newBursts]);
    
    // Clean up after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => !newBursts.includes(b)));
    }, 1000);
  }, []);

  const BurstContainer = (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 100 }}>
      <AnimatePresence>
        {bursts.map(burst => (
          <motion.img
            key={burst.id}
            src={burst.sprite}
            alt=""
            className="absolute"
            style={{
              width: burst.size,
              height: burst.size,
              filter: 'drop-shadow(0 0 6px rgba(0, 212, 170, 0.8))',
            }}
            initial={{ 
              x: burst.x - burst.size / 2,
              y: burst.y - burst.size / 2,
              opacity: 1, 
              scale: 0,
              rotate: burst.rotation,
            }}
            animate={{ 
              x: burst.x + burst.vx - burst.size / 2,
              y: burst.y + burst.vy - burst.size / 2,
              opacity: 0,
              scale: [0, 1.5, 1, 0.5],
              rotate: burst.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { triggerBurst, BurstContainer };
}
