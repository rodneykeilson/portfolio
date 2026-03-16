import { useEffect, useRef } from 'react';

// ============================================================================
// Ambient Rhythm Bars - Subtle Background Decoration
// 
// Design Philosophy:
// - Very subtle vertical bars that gently pulse
// - Creates depth without being distracting
// - Evokes rhythm game feel without being overwhelming
// - Clean, minimal, magical atmosphere
// ============================================================================

interface RhythmBar {
  x: number;
  height: number;
  targetHeight: number;
  speed: number;
  opacity: number;
  hue: number; // For subtle color variation
}

export function RhythmVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barsRef = useRef<RhythmBar[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const initBars = () => {
      const isMobile = window.innerWidth < 768;
      const barCount = isMobile ? 8 : 16;
      const bars: RhythmBar[] = [];
      
      for (let i = 0; i < barCount; i++) {
        bars.push({
          x: (i / barCount) * width + (width / barCount / 2),
          height: 20 + Math.random() * 40,
          targetHeight: 20 + Math.random() * 60,
          speed: 0.02 + Math.random() * 0.02,
          opacity: 0.03 + Math.random() * 0.04,
          hue: 170 + Math.random() * 20, // Cyan-ish range (170-190)
        });
      }
      
      barsRef.current = bars;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBars();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (currentTime: number) => {
      // Limit to 30 FPS for subtle animation
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;
      timeRef.current++;

      ctx.clearRect(0, 0, width, height);

      const bars = barsRef.current;
      const barWidth = width / bars.length * 0.15; // Thin bars

      bars.forEach((bar, i) => {
        // Smoothly interpolate to target height
        bar.height += (bar.targetHeight - bar.height) * bar.speed;
        
        // Set new target when close
        if (Math.abs(bar.height - bar.targetHeight) < 1) {
          bar.targetHeight = 15 + Math.random() * 50;
        }

        // Subtle opacity pulsing synchronized with "beat"
        const beatPhase = Math.sin(timeRef.current * 0.03 + i * 0.5);
        const currentOpacity = bar.opacity * (0.7 + beatPhase * 0.3);

        // Draw bar from bottom center
        const barX = bar.x - barWidth / 2;
        const barY = height - bar.height;

        // Create subtle gradient
        const gradient = ctx.createLinearGradient(barX, barY, barX, height);
        gradient.addColorStop(0, `hsla(${bar.hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.3, `hsla(${bar.hue}, 80%, 60%, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${bar.hue}, 80%, 60%, ${currentOpacity})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(barX, barY, barWidth, bar.height);

        // Subtle glow at the tip
        const glowGradient = ctx.createRadialGradient(
          bar.x, barY, 0,
          bar.x, barY, barWidth * 2
        );
        glowGradient.addColorStop(0, `hsla(${bar.hue}, 80%, 70%, ${currentOpacity * 0.6})`);
        glowGradient.addColorStop(1, `hsla(${bar.hue}, 80%, 70%, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(bar.x, barY, barWidth * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw very subtle horizontal scan line (moving slowly)
      const scanY = (timeRef.current * 0.5) % height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGradient.addColorStop(0, 'rgba(0, 212, 170, 0)');
      scanGradient.addColorStop(0.5, 'rgba(0, 212, 170, 0.03)');
      scanGradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
      
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 2, width, 4);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}
