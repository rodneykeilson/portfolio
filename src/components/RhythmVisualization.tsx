import { useEffect, useRef, useCallback } from 'react';

// ============================================================================
// Rhythm Visualization Background - MikuMikuWorld Inspired
// Features: Perspective lanes, falling notes, hit effects with particles
// ============================================================================

interface LaneNote {
  id: number;
  lane: number;
  z: number; // depth (0 = far, 1 = near/hit)
  speed: number;
  color: { primary: string; glow: string; rgb: { r: number; g: number; b: number } };
  type: 'tap' | 'flick' | 'hold';
  width: number;
  hit: boolean;
}

interface HitEffect {
  id: number;
  x: number;
  y: number;
  lane: number;
  color: { primary: string; glow: string; rgb: { r: number; g: number; b: number } };
  type: 'tap' | 'flick';
  age: number;
  maxAge: number;
  particles: HitParticle[];
  ripples: Ripple[];
}

interface HitParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  type: 'spark' | 'streak' | 'glow' | 'star';
}

interface Ripple {
  radius: number;
  maxRadius: number;
  alpha: number;
  delay: number;
  width: number;
}

// MikuMikuWorld-inspired colors with RGB for effects
const LANE_COLORS = [
  { primary: '#4CD9FF', glow: 'rgba(76, 217, 255, 0.5)', rgb: { r: 76, g: 217, b: 255 } },   // Cyan
  { primary: '#9B5DE5', glow: 'rgba(155, 93, 229, 0.5)', rgb: { r: 155, g: 93, b: 229 } },   // Purple
  { primary: '#FF72A5', glow: 'rgba(255, 114, 165, 0.5)', rgb: { r: 255, g: 114, b: 165 } }, // Pink
  { primary: '#00B4D8', glow: 'rgba(0, 180, 216, 0.5)', rgb: { r: 0, g: 180, b: 216 } },     // Blue
  { primary: '#F72585', glow: 'rgba(247, 37, 133, 0.5)', rgb: { r: 247, g: 37, b: 133 } },   // Magenta
  { primary: '#FFF177', glow: 'rgba(255, 241, 119, 0.5)', rgb: { r: 255, g: 241, b: 119 } }, // Gold
];

// Easing functions from MikuMikuWorld
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export function RhythmVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notesRef = useRef<LaneNote[]>([]);
  const hitEffectsRef = useRef<HitEffect[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const noteIdRef = useRef(0);
  const effectIdRef = useRef(0);
  const isMobileRef = useRef(false);
  const lastFrameTimeRef = useRef(0);

  // Create hit effect with particles
  const createHitEffect = useCallback((x: number, y: number, lane: number, color: LaneNote['color'], type: 'tap' | 'flick') => {
    const particles: HitParticle[] = [];
    const ripples: Ripple[] = [];
    const isMobile = isMobileRef.current;
    
    // Particle count based on device (reduced)
    const particleMultiplier = isMobile ? 0.3 : 0.6;

    // Create radial burst particles (reduced count)
    const burstCount = Math.floor((5 + Math.random() * 2) * particleMultiplier);
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 5 + Math.random() * 20;
      particles.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.6 - 2, // Bias upward
        size: 4 + Math.random() * 6,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        type: 'spark',
      });
    }

    // Create upward spray particles (with gravity for flicks)
    const sprayCount = Math.floor((type === 'flick' ? 15 : 7) * particleMultiplier);
    for (let i = 0; i < sprayCount; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (type === 'flick' ? 1.0 : 0.6);
      const speed = type === 'flick' ? (10 + Math.random() * 25) : (5 + Math.random() * 15);
      particles.push({
        x: (Math.random() - 0.5) * 20,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        type: type === 'flick' ? 'star' : 'glow',
      });
    }

    // Create streak particles (arc spray at angles)
    if (!isMobile) {
      const streakAngles = [-0.26, 2.88]; // -15° and 165° like MikuMikuWorld
      streakAngles.forEach(baseAngle => {
        const streakCount = 3;
        for (let i = 0; i < streakCount; i++) {
          const angle = baseAngle + (Math.random() - 0.5) * 0.3;
          const speed = 8 + Math.random() * 12;
          particles.push({
            x: 0,
            y: 0,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 6 + Math.random() * 8,
            alpha: 1,
            rotation: angle,
            rotationSpeed: 0,
            type: 'streak',
          });
        }
      });
    }

    // Create expanding ripples (2-3 concentric, staggered)
    const rippleCount = isMobile ? 2 : 3;
    for (let i = 0; i < rippleCount; i++) {
      ripples.push({
        radius: 0,
        maxRadius: 80 + i * 30,
        alpha: 0.8,
        delay: i * 0.02 * 60, // Staggered start in frames
        width: 3 - i * 0.5,
      });
    }

    hitEffectsRef.current.push({
      id: effectIdRef.current++,
      x,
      y,
      lane,
      color,
      type,
      age: 0,
      maxAge: type === 'flick' ? 45 : 35, // ~0.5-0.6 seconds at 60fps
      particles,
      ripples,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for performance
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

    // Lane geometry calculation
    const getLaneGeometry = () => {
      const laneCount = 6;
      const isMobile = isMobileRef.current;
      const centerX = width / 2;
      const laneWidth = width * (isMobile ? 0.95 : 0.6);
      const topWidth = laneWidth * 0.3;
      const topY = height * 0.15;
      const bottomY = height * 0.92;
      const judgmentY = height * 0.85;

      return { laneCount, centerX, laneWidth, topWidth, topY, bottomY, judgmentY };
    };

    // Get note position at given z depth
    const getNotePosition = (lane: number, z: number) => {
      const { laneCount, centerX, laneWidth, topWidth, topY, bottomY } = getLaneGeometry();
      
      const currentWidth = topWidth + (laneWidth - topWidth) * z;
      const laneStart = centerX - currentWidth / 2;
      const singleLaneWidth = currentWidth / laneCount;
      const x = laneStart + (lane + 0.5) * singleLaneWidth;
      const y = topY + (bottomY - topY) * z;
      const scale = 0.3 + z * 0.7;
      
      return { x, y, scale, singleLaneWidth };
    };

    // Create notes periodically
    const createNote = () => {
      const lane = Math.floor(Math.random() * 6);
      const types: LaneNote['type'][] = ['tap', 'tap', 'tap', 'tap', 'flick'];
      
      notesRef.current.push({
        id: noteIdRef.current++,
        lane,
        z: 0,
        speed: 0.006 + Math.random() * 0.003,
        color: LANE_COLORS[lane],
        type: types[Math.floor(Math.random() * types.length)],
        width: 0.12,
        hit: false,
      });
    };

    // Beat interval - responsive timing
    const beatInterval = setInterval(() => {
      const maxNotes = isMobileRef.current ? 8 : 15;
      if (Math.random() > 0.35 && notesRef.current.length < maxNotes) {
        createNote();
      }
    }, isMobileRef.current ? 600 : 450);

    // Draw lanes with perspective
    const drawLanes = () => {
      const { laneCount, centerX, laneWidth, topWidth, topY, bottomY, judgmentY } = getLaneGeometry();
      const vanishX = centerX;

      // Draw lane backgrounds
      for (let i = 0; i < laneCount; i++) {
        const leftTopX = vanishX + (i / laneCount - 0.5) * topWidth;
        const rightTopX = vanishX + ((i + 1) / laneCount - 0.5) * topWidth;
        const leftBottomX = centerX + (i / laneCount - 0.5) * laneWidth;
        const rightBottomX = centerX + ((i + 1) / laneCount - 0.5) * laneWidth;

        // Lane fill gradient
        const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.4, `${LANE_COLORS[i].primary}06`);
        gradient.addColorStop(0.8, `${LANE_COLORS[i].primary}12`);
        gradient.addColorStop(1, `${LANE_COLORS[i].primary}20`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(leftTopX, topY);
        ctx.lineTo(rightTopX, topY);
        ctx.lineTo(rightBottomX, bottomY);
        ctx.lineTo(leftBottomX, bottomY);
        ctx.closePath();
        ctx.fill();

        // Lane divider lines
        ctx.strokeStyle = `${LANE_COLORS[i].primary}25`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rightTopX, topY);
        ctx.lineTo(rightBottomX, bottomY);
        ctx.stroke();
      }

      // Calculate judgment line position
      const judgmentZ = (judgmentY - topY) / (bottomY - topY);
      const judgmentWidth = topWidth + (laneWidth - topWidth) * judgmentZ;
      const judgmentLeftX = centerX - judgmentWidth / 2;
      const judgmentRightX = centerX + judgmentWidth / 2;

      // Glowing judgment line
      ctx.save();
      ctx.shadowColor = '#9B5DE5';
      ctx.shadowBlur = 25;

      const lineGradient = ctx.createLinearGradient(judgmentLeftX, 0, judgmentRightX, 0);
      lineGradient.addColorStop(0, '#4CD9FF');
      lineGradient.addColorStop(0.25, '#9B5DE5');
      lineGradient.addColorStop(0.5, '#FF72A5');
      lineGradient.addColorStop(0.75, '#9B5DE5');
      lineGradient.addColorStop(1, '#4CD9FF');

      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(judgmentLeftX, judgmentY);
      ctx.lineTo(judgmentRightX, judgmentY);
      ctx.stroke();
      ctx.restore();

      // Pulsing secondary glow
      const pulse = Math.sin(timeRef.current * 0.08) * 0.3 + 0.7;
      ctx.save();
      ctx.globalAlpha = pulse * 0.4;
      ctx.shadowColor = '#FF72A5';
      ctx.shadowBlur = 40;
      ctx.strokeStyle = '#FF72A5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(judgmentLeftX, judgmentY);
      ctx.lineTo(judgmentRightX, judgmentY);
      ctx.stroke();
      ctx.restore();
    };

    // Draw notes
    const drawNotes = () => {
      const { judgmentY, topY, bottomY } = getLaneGeometry();
      const hitZ = (judgmentY - topY) / (bottomY - topY);

      notesRef.current.forEach((note) => {
        if (note.hit) return;

        const { x, y, scale, singleLaneWidth } = getNotePosition(note.lane, note.z);
        const noteWidth = singleLaneWidth * 0.7 * scale;
        const noteHeight = noteWidth * 0.35;

        ctx.save();
        ctx.shadowColor = note.color.primary;
        ctx.shadowBlur = 15 * scale;

        // Draw note body
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, noteWidth);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.3, note.color.primary);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(x, y, noteWidth / 2, noteHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(x, y, noteWidth * 0.15, noteHeight * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flick arrow indicator
        if (note.type === 'flick') {
          const arrowY = y - noteHeight * 1.5;
          const arrowSize = noteWidth * 0.35;
          const arrowBob = Math.sin(timeRef.current * 0.3 + note.id) * 3;

          ctx.fillStyle = note.color.primary;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(x, arrowY - arrowSize + arrowBob);
          ctx.lineTo(x + arrowSize * 0.6, arrowY + arrowBob);
          ctx.lineTo(x - arrowSize * 0.6, arrowY + arrowBob);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();

        // Check for auto-hit at judgment line
        if (note.z >= hitZ && !note.hit) {
          note.hit = true;
          // Only create hit effects for tap and flick notes
          if (note.type === 'tap' || note.type === 'flick') {
            createHitEffect(x, judgmentY, note.lane, note.color, note.type);
          }
        }
      });
    };

    // Draw hit effects
    const drawHitEffects = () => {
      const { laneWidth, laneCount } = getLaneGeometry();

      hitEffectsRef.current.forEach((effect) => {
        const progress = effect.age / effect.maxAge;
        const { rgb } = effect.color;

        ctx.save();

        // Draw ripples
        effect.ripples.forEach((ripple) => {
          if (effect.age < ripple.delay) return;

          const rippleProgress = (effect.age - ripple.delay) / (effect.maxAge - ripple.delay);
          if (rippleProgress > 1) return;

          const easedProgress = easeOutCubic(rippleProgress);
          const currentRadius = ripple.maxRadius * easedProgress;
          const alpha = ripple.alpha * (1 - easeOutQuart(rippleProgress));

          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          ctx.lineWidth = ripple.width * (1 - rippleProgress * 0.5);
          ctx.shadowColor = effect.color.primary;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, currentRadius, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Draw central glow flash
        if (progress < 0.3) {
          const glowProgress = progress / 0.3;
          const glowAlpha = 1 - easeOutCubic(glowProgress);
          const glowSize = 30 + easeOutQuart(glowProgress) * 50;

          const glowGradient = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, glowSize);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`);
          glowGradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowAlpha * 0.7})`);
          glowGradient.addColorStop(1, 'transparent');

          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }

        // Draw lane flash (vertical beam)
        if (progress < 0.25) {
          const flashProgress = progress / 0.25;
          const flashAlpha = 0.5 * (1 - easeOutQuart(flashProgress));
          const flashHeight = 70 * easeOutCubic(flashProgress);
          const singleLaneWidth = laneWidth / laneCount;

          ctx.globalCompositeOperation = 'lighter';
          const flashGradient = ctx.createLinearGradient(effect.x, effect.y - flashHeight, effect.x, effect.y);
          flashGradient.addColorStop(0, 'transparent');
          flashGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${flashAlpha})`);
          flashGradient.addColorStop(1, `rgba(255, 255, 255, ${flashAlpha})`);

          ctx.fillStyle = flashGradient;
          ctx.fillRect(effect.x - singleLaneWidth * 0.3, effect.y - flashHeight, singleLaneWidth * 0.6, flashHeight);
          ctx.globalCompositeOperation = 'source-over';
        }

        // Draw particles
        const gravity = effect.type === 'flick' ? 0.5 : 0.3;
        const friction = 0.98;

        effect.particles.forEach((particle) => {
          // Update particle physics
          particle.vy += gravity;
          particle.vx *= friction;
          particle.vy *= friction;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;

          // Fade based on age
          const particleLife = 1 - progress;
          particle.alpha = particleLife * (1 - progress * 0.5);
          if (particle.alpha <= 0) return;

          const px = effect.x + particle.x;
          const py = effect.y + particle.y;

          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = particle.alpha;

          if (particle.type === 'spark') {
            // Diamond/rhombus shape
            ctx.fillStyle = effect.color.primary;
            ctx.shadowColor = effect.color.primary;
            ctx.shadowBlur = 5;
            ctx.translate(px, py);
            ctx.rotate(particle.rotation);
            ctx.beginPath();
            const s = particle.size * particleLife;
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.6, 0);
            ctx.lineTo(0, s);
            ctx.lineTo(-s * 0.6, 0);
            ctx.closePath();
            ctx.fill();
          } else if (particle.type === 'streak') {
            // Elongated streak
            ctx.fillStyle = effect.color.primary;
            ctx.shadowColor = effect.color.primary;
            ctx.shadowBlur = 8;
            ctx.translate(px, py);
            ctx.rotate(particle.rotation);
            const w = particle.size * 0.3 * particleLife;
            const h = particle.size * 2 * particleLife;
            ctx.fillRect(-w / 2, -h / 2, w, h);
          } else if (particle.type === 'glow') {
            // Circular glow
            const glowGradient = ctx.createRadialGradient(px, py, 0, px, py, particle.size * particleLife);
            glowGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha})`);
            glowGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.alpha * 0.5})`);
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(px, py, particle.size * particleLife * 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (particle.type === 'star') {
            // Twinkling star (for flicks)
            const twinkle = Math.sin(timeRef.current * 0.5 + particle.rotation * 10) * 0.3 + 0.7;
            ctx.fillStyle = effect.color.primary;
            ctx.shadowColor = effect.color.primary;
            ctx.shadowBlur = 10;
            ctx.translate(px, py);
            ctx.rotate(particle.rotation);
            const s = particle.size * particleLife * twinkle;
            // 4-point star
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
              const radius = i % 2 === 0 ? s : s * 0.3;
              const angle = (i / 8) * Math.PI * 2;
              const sx = Math.cos(angle) * radius;
              const sy = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        });

        ctx.restore();
      });
    };

    // Main animation loop with FPS limiting
    const animate = (currentTime: number) => {
      // Limit to 60fps (16.67ms between frames)
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;
      
      timeRef.current++;

      ctx.clearRect(0, 0, width, height);

      // Draw lanes
      drawLanes();

      // Update and filter notes
      notesRef.current = notesRef.current.filter((note) => {
        if (!note.hit) {
          note.z += note.speed;
          return note.z < 1.2;
        }
        return false;
      });

      // Draw notes
      drawNotes();

      // Update and filter effects
      hitEffectsRef.current = hitEffectsRef.current.filter((effect) => {
        effect.age++;
        return effect.age < effect.maxAge;
      });

      // Draw hit effects
      drawHitEffects();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(beatInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createHitEffect]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50 md:opacity-40"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
}
