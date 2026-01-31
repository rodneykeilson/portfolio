import { useEffect, useRef, useCallback } from 'react';

// ============================================================================
// Project Sekai-Inspired Particle System
// Authentic cursor trail effects with:
// - Fast size pop with overshoot (easeOutBack)
// - Oscillating alpha sparkle effect
// - Velocity damping for natural slowdown
// - Layered particles with staggered timing
// ============================================================================

interface CursorParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  age: number;
  maxAge: number;
  color: { r: number; g: number; b: number };
  colorEnd: { r: number; g: number; b: number };
  type: 'trail' | 'glow' | 'sparkle' | 'ring' | 'star';
  rotation: number;
  rotationSpeed: number;
  dampen: number;
  twinklePhase: number;
  layer: number;
}

interface TapEffect {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  color: { r: number; g: number; b: number };
  ripples: { delay: number; maxRadius: number }[];
  particles: CursorParticle[];
}

// Project Sekai color palette
const COLORS = {
  cyan: { r: 75, g: 206, b: 255 },      // #4BCEFF
  gold: { r: 255, g: 241, b: 119 },     // #FFF177
  pink: { r: 255, g: 114, b: 165 },     // #FF72A5
  green: { r: 112, g: 255, b: 153 },    // #70FF99
  purple: { r: 155, g: 93, b: 229 },    // #9B5DE5
  white: { r: 255, g: 255, b: 255 },
};

const trailColors = [COLORS.cyan, COLORS.pink, COLORS.purple, COLORS.gold, COLORS.green];

// Easing functions
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

// Oscillating alpha for sparkle effect (from Project Sekai)
const getSparkleAlpha = (progress: number): number => {
  if (progress < 0.05) return progress / 0.05;
  if (progress < 0.35) return 1;
  if (progress < 0.42) return 1 - (progress - 0.35) * 7;
  if (progress < 0.50) return 0.5;
  if (progress < 0.60) return 0.5 + Math.sin((progress - 0.5) * Math.PI * 10) * 0.3;
  if (progress < 0.70) return 0.62 - (progress - 0.60) * 6.2;
  if (progress < 0.80) return Math.sin((progress - 0.70) * Math.PI * 10) * 0.3;
  return Math.max(0, 0.3 * (1 - (progress - 0.80) / 0.20));
};

// Smooth alpha fade (for glow layers)
const getSmoothAlpha = (progress: number): number => {
  if (progress < 0.05) return progress / 0.05;
  if (progress < 0.15) return 1;
  return Math.max(0, 1 - (progress - 0.15) / 0.85);
};

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<CursorParticle[]>([]);
  const tapEffectsRef = useRef<TapEffect[]>([]);
  const mouseRef = useRef({ 
    x: 0, y: 0, 
    lastX: 0, lastY: 0, 
    speed: 0,
    trail: [] as { x: number; y: number; time: number }[],
    lastEmit: 0,
    colorIndex: 0
  });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);

  // Create trail particle with Project Sekai-style parameters
  const createTrailParticle = useCallback((
    x: number, 
    y: number, 
    vx: number, 
    vy: number,
    color: { r: number; g: number; b: number },
    type: CursorParticle['type'] = 'trail',
    layer: number = 0
  ): CursorParticle => {
    const angle = Math.random() * Math.PI * 2;
    const spreadSpeed = type === 'sparkle' ? (2 + Math.random() * 8) : (1 + Math.random() * 3);
    
    return {
      x,
      y,
      vx: vx * 0.3 + Math.cos(angle) * spreadSpeed,
      vy: vy * 0.3 + Math.sin(angle) * spreadSpeed,
      baseSize: type === 'glow' ? (15 + Math.random() * 10) : 
                type === 'sparkle' ? (2 + Math.random() * 3) :
                type === 'ring' ? 8 :
                (3 + Math.random() * 4),
      age: 0,
      maxAge: type === 'glow' ? 25 : 
              type === 'ring' ? 30 :
              (30 + Math.random() * 15),
      color,
      colorEnd: COLORS.white,
      type,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      dampen: type === 'glow' ? 0.8 : 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      layer,
    };
  }, []);

  // Create tap effect with layered particles
  const createTapEffect = useCallback((x: number, y: number) => {
    const color = trailColors[mouseRef.current.colorIndex % trailColors.length];
    mouseRef.current.colorIndex++;
    
    const effect: TapEffect = {
      x,
      y,
      age: 0,
      maxAge: 35,
      color,
      ripples: [
        { delay: 0, maxRadius: 60 },
        { delay: 3, maxRadius: 80 },
        { delay: 6, maxRadius: 100 },
      ],
      particles: [],
    };

    // Layer 1: Central glow (large, soft)
    effect.particles.push(createTrailParticle(x, y, 0, 0, color, 'glow', 0));
    
    // Layer 2: Burst particles (7-12 particles)
    const burstCount = isMobileRef.current ? 5 : (7 + Math.floor(Math.random() * 5));
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 5 + Math.random() * 15;
      const p = createTrailParticle(x, y, 0, 0, color, 'sparkle', 1);
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed - 2;
      effect.particles.push(p);
    }

    // Layer 3: Secondary burst with delay
    if (!isMobileRef.current) {
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
          const speed = 3 + Math.random() * 8;
          const p = createTrailParticle(x, y, 0, 0, color, 'trail', 2);
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          particlesRef.current.push(p);
        }
      }, 60);
    }

    tapEffectsRef.current.push(effect);
  }, [createTrailParticle]);

  // Create cursor trail particles
  const emitTrailParticles = useCallback((x: number, y: number, vx: number, vy: number, speed: number) => {
    const color = trailColors[mouseRef.current.colorIndex % trailColors.length];
    
    // Emit rate based on speed (faster = more particles)
    const emitCount = Math.min(3, Math.floor(speed / 15) + 1);
    
    for (let i = 0; i < emitCount; i++) {
      // Main trail particle
      particlesRef.current.push(createTrailParticle(x, y, vx, vy, color, 'trail', 0));
      
      // Add occasional sparkle
      if (Math.random() > 0.6 && !isMobileRef.current) {
        particlesRef.current.push(createTrailParticle(x, y, vx, vy, color, 'sparkle', 1));
      }
      
      // Add glow for high speed
      if (speed > 30 && Math.random() > 0.7) {
        particlesRef.current.push(createTrailParticle(x, y, vx * 0.5, vy * 0.5, color, 'glow', 0));
      }
    }
    
    // Rotate color for next emission
    if (Math.random() > 0.9) {
      mouseRef.current.colorIndex++;
    }
  }, [createTrailParticle]);

  // Draw particle with Project Sekai style
  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D, 
    p: CursorParticle
  ) => {
    const progress = p.age / p.maxAge;
    
    // Size with easeOutBack for that satisfying pop
    const sizeProgress = Math.min(progress * 4, 1);
    const sizeScale = easeOutBack(sizeProgress) * (1 - easeOutQuart(progress) * 0.3);
    const size = p.baseSize * sizeScale;
    
    // Alpha based on particle type
    let alpha: number;
    if (p.type === 'sparkle') {
      alpha = getSparkleAlpha(progress);
    } else if (p.type === 'glow') {
      alpha = getSmoothAlpha(progress) * 0.6;
    } else if (p.type === 'ring') {
      alpha = getSmoothAlpha(progress) * 0.8;
    } else {
      alpha = getSmoothAlpha(progress);
    }
    
    if (alpha <= 0 || size <= 0) return;
    
    // Color lerp
    const colorProgress = easeOutCubic(progress);
    const r = Math.round(lerp(p.color.r, p.colorEnd.r, colorProgress * 0.3));
    const g = Math.round(lerp(p.color.g, p.colorEnd.g, colorProgress * 0.3));
    const b = Math.round(lerp(p.color.b, p.colorEnd.b, colorProgress * 0.3));
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    if (p.type === 'glow') {
      // Soft radial glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 'ring') {
      // Expanding ring
      const ringProgress = easeOutCubic(progress);
      const ringRadius = size + ringProgress * 40;
      const ringAlpha = alpha * (1 - ringProgress);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringAlpha})`;
      ctx.lineWidth = 2 * (1 - progress);
      ctx.beginPath();
      ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (p.type === 'sparkle') {
      // 4-point star sparkle
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const radius = i % 2 === 0 ? size * 1.5 : size * 0.4;
        const angle = (i / 8) * Math.PI * 2;
        const sx = Math.cos(angle) * radius;
        const sy = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Trail particle - soft circle with gradient
      ctx.translate(p.x, p.y);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${alpha * 0.9})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright core
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }, []);

  // Draw tap effect with ripples
  const drawTapEffect = useCallback((
    ctx: CanvasRenderingContext2D,
    effect: TapEffect
  ) => {
    const progress = effect.age / effect.maxAge;
    const { r, g, b } = effect.color;
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    // Draw ripples
    effect.ripples.forEach((ripple) => {
      if (effect.age < ripple.delay) return;
      
      const rippleAge = effect.age - ripple.delay;
      const rippleProgress = rippleAge / (effect.maxAge - ripple.delay);
      if (rippleProgress > 1) return;
      
      const radius = easeOutCubic(rippleProgress) * ripple.maxRadius;
      const alpha = (1 - easeOutQuart(rippleProgress)) * 0.6;
      
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.lineWidth = 3 * (1 - rippleProgress);
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    });
    
    // Central flash
    if (progress < 0.2) {
      const flashProgress = progress / 0.2;
      const flashSize = 30 + easeOutCubic(flashProgress) * 30;
      const flashAlpha = (1 - easeOutQuart(flashProgress)) * 0.8;
      
      const gradient = ctx.createRadialGradient(
        effect.x, effect.y, 0,
        effect.x, effect.y, flashSize
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
      gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${flashAlpha * 0.6})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, flashSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
    
    // Draw effect particles
    effect.particles.forEach(p => {
      // Update particle
      p.vx *= Math.pow(1 - p.dampen, 1/60);
      p.vy *= Math.pow(1 - p.dampen, 1/60);
      p.vy += 0.1; // Slight gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.age++;
      
      if (p.age < p.maxAge) {
        drawParticle(ctx, p);
      }
    });
  }, [drawParticle]);

  // Ambient floating stars
  const createAmbientStar = useCallback((width: number, height: number) => {
    const color = trailColors[Math.floor(Math.random() * trailColors.length)];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.1,
      baseSize: 3 + Math.random() * 5,
      age: Math.random() * 200, // Start at random age
      maxAge: 250 + Math.random() * 150,
      color,
      colorEnd: color,
      type: 'star' as const,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      dampen: 0,
      twinklePhase: Math.random() * Math.PI * 2,
      layer: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      isMobileRef.current = width < 768;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize ambient stars
    const starCount = isMobileRef.current ? 15 : 35;
    for (let i = 0; i < starCount; i++) {
      particlesRef.current.push(createAmbientStar(width, height));
    }

    // Mouse/touch movement handler
    const handlePointerMove = (clientX: number, clientY: number) => {
      const { x: lastX, y: lastY, lastEmit } = mouseRef.current;
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const speed = Math.hypot(dx, dy);
      
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      mouseRef.current.speed = speed;
      
      // Store trail for smooth interpolation
      mouseRef.current.trail.push({ x: clientX, y: clientY, time: Date.now() });
      if (mouseRef.current.trail.length > 10) {
        mouseRef.current.trail.shift();
      }
      
      // Emit particles based on speed and time
      const now = Date.now();
      const timeSinceEmit = now - lastEmit;
      const emitInterval = Math.max(16, 50 - speed); // Faster movement = faster emission
      
      if (speed > 3 && timeSinceEmit > emitInterval) {
        emitTrailParticles(clientX, clientY, dx * 0.5, dy * 0.5, speed);
        mouseRef.current.lastEmit = now;
      }
      
      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      createTapEffect(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createTapEffect(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Animation loop
    const animate = () => {
      timeRef.current++;
      
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        // Physics update
        if (p.type !== 'star') {
          p.vx *= Math.pow(1 - p.dampen, 1/60);
          p.vy *= Math.pow(1 - p.dampen, 1/60);
          p.vy += p.type === 'sparkle' ? 0.15 : 0.05;
        }
        
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.age++;
        
        // Wrap stars around screen
        if (p.type === 'star') {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }
        
        // Draw with twinkle for stars
        if (p.type === 'star') {
          const twinkle = Math.sin(timeRef.current * 0.08 + p.twinklePhase) * 0.4 + 0.6;
          const starProgress = (p.age % p.maxAge) / p.maxAge;
          const fadeIn = Math.min(starProgress * 5, 1);
          const fadeOut = starProgress > 0.8 ? 1 - (starProgress - 0.8) / 0.2 : 1;
          
          const alpha = twinkle * fadeIn * fadeOut * 0.7;
          const size = p.baseSize * (0.8 + twinkle * 0.2);
          
          if (alpha > 0) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.7})`);
            gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
              const radius = i % 2 === 0 ? size : size * 0.3;
              const angle = (i / 8) * Math.PI * 2;
              const sx = Math.cos(angle) * radius;
              const sy = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
        } else {
          drawParticle(ctx, p);
        }
        
        // Keep particle alive check
        const alive = p.age < p.maxAge &&
          p.y < height + 100 &&
          p.y > -100 &&
          p.x > -100 &&
          p.x < width + 100;
        
        return alive || p.type === 'star';
      });

      // Respawn stars
      const maxStars = isMobileRef.current ? 15 : 35;
      const currentStars = particlesRef.current.filter(p => p.type === 'star').length;
      if (currentStars < maxStars && Math.random() > 0.97) {
        const star = createAmbientStar(width, height);
        star.y = -20;
        particlesRef.current.push(star);
      }

      // Update and draw tap effects
      tapEffectsRef.current = tapEffectsRef.current.filter((effect) => {
        effect.age++;
        drawTapEffect(ctx, effect);
        return effect.age < effect.maxAge;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createTrailParticle, createTapEffect, emitTrailParticles, drawParticle, drawTapEffect, createAmbientStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
}
