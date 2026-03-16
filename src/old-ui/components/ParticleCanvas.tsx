import { useEffect, useRef, useCallback } from 'react';

// ============================================================================
// SEKAI Magical Particles
// 
// Authentic Project Sekai aesthetic:
// - Hexagons, diamonds, stars, and soft dots
// - Gentle floating with subtle rotation
// - Cyan, pink, purple accent colors
// - Magical, ethereal atmosphere
// ============================================================================

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
  color: string;
  rgb: { r: number; g: number; b: number };
  type: 'dot' | 'diamond' | 'hexagon' | 'star' | 'line';
  rotation: number;
  rotationSpeed: number;
}

// SEKAI color palette for particles
const PARTICLE_COLORS = [
  { color: 'rgba(255, 255, 255, 0.8)', rgb: { r: 255, g: 255, b: 255 } },  // White (common)
  { color: 'rgba(0, 212, 170, 0.7)', rgb: { r: 0, g: 212, b: 170 } },      // Sekai cyan (signature)
  { color: 'rgba(155, 93, 229, 0.5)', rgb: { r: 155, g: 93, b: 229 } },    // Sekai purple
  { color: 'rgba(255, 107, 157, 0.5)', rgb: { r: 255, g: 107, b: 157 } },  // Sekai pink
  { color: 'rgba(0, 180, 216, 0.5)', rgb: { r: 0, g: 180, b: 216 } },      // Sekai blue
];

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FloatingParticle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef(0);
  const isMobileRef = useRef(false);

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    isMobileRef.current = isMobile;
    
    // More particles for a magical feel
    const count = isMobile ? 25 : 50;
    const particles: FloatingParticle[] = [];

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      // Distribution: 35% dots, 25% diamonds, 20% hexagons, 15% stars, 5% lines
      let type: FloatingParticle['type'];
      if (typeRand > 0.95) type = 'line';
      else if (typeRand > 0.80) type = 'star';
      else if (typeRand > 0.60) type = 'hexagon';
      else if (typeRand > 0.35) type = 'diamond';
      else type = 'dot';
      
      // Color distribution: 40% white, 30% cyan, 15% purple, 10% pink, 5% blue
      const colorRand = Math.random();
      let colorIndex: number;
      if (colorRand > 0.60) colorIndex = 0; // white
      else if (colorRand > 0.30) colorIndex = 1; // cyan
      else if (colorRand > 0.15) colorIndex = 2; // purple
      else if (colorRand > 0.05) colorIndex = 3; // pink
      else colorIndex = 4; // blue
      
      const colorData = PARTICLE_COLORS[colorIndex];
      
      // Size based on type
      let size: number;
      if (type === 'hexagon') size = 4 + Math.random() * 6;
      else if (type === 'star') size = 3 + Math.random() * 5;
      else if (type === 'diamond') size = 3 + Math.random() * 4;
      else if (type === 'line') size = 10 + Math.random() * 15;
      else size = 2 + Math.random() * 3;
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.1, // Slight upward bias
        size,
        opacity: 0,
        opacityTarget: 0.15 + Math.random() * 0.35,
        opacitySpeed: 0.001 + Math.random() * 0.003,
        color: colorData.color,
        rgb: colorData.rgb,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = (timestamp: number) => {
      // Limit to 30 FPS for performance
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = timestamp;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach(p => {
        // Gentle opacity pulsing
        if (Math.abs(p.opacity - p.opacityTarget) < 0.01) {
          p.opacityTarget = 0.1 + Math.random() * 0.25;
        }
        p.opacity += (p.opacityTarget - p.opacity) * p.opacitySpeed * 16;

        // Very subtle mouse influence
        if (mouse.x > 0 && !isMobileRef.current) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120 && dist > 0) {
            // Gentle push away from cursor
            const force = (1 - dist / 120) * 0.008;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        // Apply velocity with strong damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.rotation += p.rotationSpeed;

        // Wrap around screen edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Draw particle based on type
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        const { r, g, b } = p.rgb;

        if (p.type === 'dot') {
          // Simple glowing dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
          ctx.fill();
          
          // Subtle outer glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'diamond') {
          // Diamond/rhombus shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
          ctx.fill();
          
          // Diamond glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'hexagon') {
          // Hexagon - iconic SEKAI shape
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const x = Math.cos(angle) * p.size;
            const y = Math.sin(angle) * p.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
          ctx.fill();
        } else if (p.type === 'star') {
          // 4-pointed star
          ctx.beginPath();
          const outerR = p.size;
          const innerR = p.size * 0.3;
          for (let i = 0; i < 8; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const angle = (Math.PI / 4) * i - Math.PI / 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.fill();
          
          // Star glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.5);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'line') {
          // Thin line
          ctx.beginPath();
          ctx.moveTo(-p.size / 2, 0);
          ctx.lineTo(p.size / 2, 0);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 5,
        opacity: 0.7,
      }}
      aria-hidden="true"
    />
  );
}
