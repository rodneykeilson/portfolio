/**
 * SEKAI UI Engine - Authentic Project Sekai visual style
 * 
 * Key visual elements from the actual game:
 * - Holographic/iridescent gradients with subtle animation
 * - Diamond/rhombus motifs everywhere
 * - Neon glows with bloom effects
 * - Fast, snappy DOTween animations with overshoot
 * - Sparkle/kira particles on every interaction
 * - Geometric patterns, lines, and decorations
 * - Cyan, pink, purple color scheme
 */

import * as PIXI from 'pixi.js';

// =============================================================================
// SEKAI Color Palette (extracted from actual game)
// =============================================================================
export const SEKAI_COLORS = {
  // Primary brand - THE Project Sekai colors
  sekai_cyan: 0x00CCC0,
  sekai_pink: 0xFF77A8,
  sekai_purple: 0xBB88FF,
  sekai_yellow: 0xFFDD44,
  sekai_white: 0xFFFFFF,
  
  // UI Background layers
  bg_deep: 0x0D0D15,
  bg_dark: 0x12121C,
  bg_panel: 0x1A1A28,
  bg_card: 0x222235,
  
  // Gradient colors for holographic effects
  holo_1: 0x00E5CC,
  holo_2: 0xFF88BB,
  holo_3: 0xAA88FF,
  holo_4: 0xFFDD66,
  
  // Unit theme colors
  virtualSinger: 0x33CCBB,
  leoneed: 0x4499EE,
  moremore: 0x88DD44,
  vivid: 0xEE6666,
  wonderlands: 0xFFAA00,
  nightcode: 0x8844CC,
  
  // Text
  text_white: 0xFFFFFF,
  text_gray: 0xAAB0C0,
  text_dark: 0x606080,
} as const;

// =============================================================================
// Asset paths - Using actual extracted Project Sekai sprites
// =============================================================================
const BASE = import.meta.env.BASE_URL || '/';
export const SPRITES = {
  // Kira/sparkle effects
  kira: `${BASE}sekai-sprites/misc/eff_kira_h100_wh.png`,
  kira_small: `${BASE}sekai-sprites/misc/eff_kira_h20_wh.png`,
  kira_glow: `${BASE}sekai-sprites/misc/eff_kira_glow_h24_wh_yw.png`,
  // Numbered sparkle sprites
  sparkle_0: `${BASE}sekai-sprites/misc/eff_0_150.png`,
  sparkle_1: `${BASE}sekai-sprites/misc/eff_1_150.png`,
  sparkle_2: `${BASE}sekai-sprites/misc/eff_2_150.png`,
  sparkle_3: `${BASE}sekai-sprites/misc/eff_3_150.png`,
  sparkle_4: `${BASE}sekai-sprites/misc/eff_4_150.png`,
  sparkle_5: `${BASE}sekai-sprites/misc/eff_5_150.png`,
  // UI text sprites
  tap_to_start: `${BASE}sekai-sprites/misc/txt_tapToStart.png`,
  // Transition textures
  transition_01: `${BASE}sekai-sprites/misc/tex_transition_01.png`,
  // Backgrounds
  bg_sekai: `${BASE}sekai-sprites/backgrounds/bg_sekai.png`,
  bg_common: `${BASE}sekai-sprites/backgrounds/bg_common.png`,
  // Geometric elements
  triangle: `${BASE}sekai-sprites/misc/img_triangle_wh.png`,
  triangle_single: `${BASE}sekai-sprites/misc/img_triangleSingle_wh.png`,
  // Score ranks
  score_s: `${BASE}sekai-sprites/misc/score_S.png`,
  full_combo: `${BASE}sekai-sprites/misc/FullCombo.png`,
  all_perfect: `${BASE}sekai-sprites/misc/AllPerfect.png`,
} as const;

// =============================================================================
// Layer System
// =============================================================================
export const UILayer = {
  BG: 0,
  BGEffect: 5,
  UI: 20,
  Header: 30,
  Particles: 60,
  Overlay: 70,
  Transition: 100,
} as const;

export type UILayerValue = typeof UILayer[keyof typeof UILayer];

// =============================================================================
// Animation System (DOTween-style)
// =============================================================================
export const Easing = {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t),
  inOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => (--t) * t * t + 1,
  inOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  outQuart: (t: number) => 1 - (--t) * t * t * t,
  outQuint: (t: number) => 1 + (--t) * t * t * t * t,
  outBack: (t: number) => {
    const c = 1.70158;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  },
  inBack: (t: number) => {
    const c = 1.70158;
    return (c + 1) * t * t * t - c * t * t;
  },
  outElastic: (t: number) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
  },
} as const;

export function animate(
  duration: number,
  onUpdate: (progress: number) => void,
  easing: (t: number) => number = Easing.outCubic,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const durationMs = duration * 1000;
    
    function tick() {
      const elapsed = performance.now() - start;
      const raw = Math.min(elapsed / durationMs, 1);
      onUpdate(easing(raw));
      if (raw < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

export const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// =============================================================================
// Texture cache
// =============================================================================
const textureCache = new Map<string, PIXI.Texture>();

export async function loadTexture(path: string): Promise<PIXI.Texture> {
  if (textureCache.has(path)) return textureCache.get(path)!;
  try {
    const texture = await PIXI.Assets.load(path);
    textureCache.set(path, texture);
    return texture;
  } catch {
    return PIXI.Texture.EMPTY;
  }
}

// =============================================================================
// SEKAI Sparkle/Kira Particle System
// =============================================================================
// =============================================================================
// Floating Ambient Particles (like SEKAI loading screen)
// Triangles, circles, and diamonds that drift peacefully
// =============================================================================
interface FloatingParticle {
  sprite: PIXI.Graphics;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;       // For sine wave motion
  phaseSpeed: number;
  amplitude: number;   // Horizontal drift amplitude
  rotation: number;
  rotationSpeed: number;
  scale: number;
  baseAlpha: number;
  type: 'triangle' | 'circle' | 'diamond';
}

interface BurstParticle {
  sprite: PIXI.Graphics;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
}

export class AmbientParticles {
  private container: PIXI.Container;
  private floaters: FloatingParticle[] = [];
  private bursts: BurstParticle[] = [];
  private colors = [
    SEKAI_COLORS.sekai_cyan,
    SEKAI_COLORS.sekai_pink,
    SEKAI_COLORS.sekai_purple,
    SEKAI_COLORS.holo_4,
  ];
  private time = 0;
  
  constructor(container: PIXI.Container) {
    this.container = container;
  }
  
  // Create floating particles that drift around the screen
  initFloaters(width: number, height: number, count: number = 25) {
    // Clear existing
    for (const f of this.floaters) {
      this.container.removeChild(f.sprite);
      f.sprite.destroy();
    }
    this.floaters = [];
    
    for (let i = 0; i < count; i++) {
      const types: ('triangle' | 'circle' | 'diamond')[] = ['triangle', 'circle', 'diamond'];
      const type = types[Math.floor(Math.random() * types.length)];
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const size = 4 + Math.random() * 12;
      const alpha = 0.06 + Math.random() * 0.12;
      
      const sprite = this.createShape(type, size, color, alpha);
      const x = Math.random() * width;
      const y = Math.random() * height;
      sprite.x = x;
      sprite.y = y;
      
      this.container.addChild(sprite);
      
      this.floaters.push({
        sprite,
        baseX: x,
        baseY: y,
        x, y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.1 - Math.random() * 0.2, // Gentle upward drift
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.01,
        amplitude: 20 + Math.random() * 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        scale: 0.5 + Math.random() * 0.5,
        baseAlpha: alpha,
        type,
      });
    }
  }
  
  private createShape(type: 'triangle' | 'circle' | 'diamond', size: number, color: number, alpha: number): PIXI.Graphics {
    const g = new PIXI.Graphics();
    
    if (type === 'triangle') {
      g.moveTo(0, -size);
      g.lineTo(size * 0.866, size * 0.5);
      g.lineTo(-size * 0.866, size * 0.5);
      g.closePath();
      g.stroke({ color, width: 1.5, alpha });
    } else if (type === 'circle') {
      g.circle(0, 0, size);
      g.stroke({ color, width: 1.5, alpha });
    } else {
      g.moveTo(0, -size);
      g.lineTo(size, 0);
      g.lineTo(0, size);
      g.lineTo(-size, 0);
      g.closePath();
      g.stroke({ color, width: 1.5, alpha });
    }
    
    return g;
  }
  
  // Burst of sparkles for interactions
  burst(x: number, y: number, count: number = 12) {
    for (let i = 0; i < count; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const size = 3 + Math.random() * 8;
      
      const sprite = new PIXI.Graphics();
      // Four-pointed star (kira shape)
      sprite.moveTo(0, -size);
      sprite.lineTo(size * 0.2, -size * 0.2);
      sprite.lineTo(size, 0);
      sprite.lineTo(size * 0.2, size * 0.2);
      sprite.lineTo(0, size);
      sprite.lineTo(-size * 0.2, size * 0.2);
      sprite.lineTo(-size, 0);
      sprite.lineTo(-size * 0.2, -size * 0.2);
      sprite.closePath();
      sprite.fill({ color, alpha: 0.9 });
      // White core
      const inner = size * 0.3;
      sprite.circle(0, 0, inner);
      sprite.fill({ color: 0xFFFFFF, alpha: 0.8 });
      
      sprite.x = x;
      sprite.y = y;
      this.container.addChild(sprite);
      
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.3;
      const speed = 4 + Math.random() * 6;
      
      this.bursts.push({
        sprite,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        maxLife: 0.35 + Math.random() * 0.2,
        scale: 1,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      });
    }
  }
  
  // Sprite-based kira burst using actual Project Sekai textures
  async spriteBurst(x: number, y: number, count: number = 8) {
    const spriteUrls = [
      SPRITES.kira,
      SPRITES.kira_small,
      SPRITES.sparkle_0,
      SPRITES.sparkle_1,
      SPRITES.sparkle_2,
    ];
    
    for (let i = 0; i < count; i++) {
      try {
        const url = spriteUrls[Math.floor(Math.random() * spriteUrls.length)];
        const texture = await loadTexture(url);
        if (texture === PIXI.Texture.EMPTY) continue;
        
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.x = x;
        sprite.y = y;
        sprite.scale.set(0.15 + Math.random() * 0.2);
        sprite.alpha = 0.9;
        sprite.blendMode = 'add';
        this.container.addChild(sprite);
        
        const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
        const speed = 3 + Math.random() * 5;
        
        // Animate sprite burst
        const startX = x, startY = y;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 2;
        
        animate(0.6, (p) => {
          sprite.x = startX + vx * p * 30;
          sprite.y = startY + vy * p * 30 + p * p * 40; // gravity
          sprite.alpha = 0.9 * (1 - p);
          sprite.scale.set((0.15 + Math.random() * 0.2) * (1 + p * 0.5));
          sprite.rotation = p * Math.PI * 2;
        }, Easing.outQuad).then(() => {
          this.container.removeChild(sprite);
          sprite.destroy();
        });
      } catch {
        // Fallback to graphics burst if texture fails
        this.burst(x, y, 1);
      }
    }
  }
  
  update(dt: number, width: number, height: number) {
    this.time += dt;
    
    // Update floating particles
    for (const f of this.floaters) {
      f.phase += f.phaseSpeed;
      f.baseY += f.vy;
      f.baseX += f.vx;
      
      // Sine wave horizontal motion
      f.x = f.baseX + Math.sin(f.phase) * f.amplitude;
      f.y = f.baseY + Math.cos(f.phase * 0.7) * (f.amplitude * 0.3);
      
      f.rotation += f.rotationSpeed;
      
      // Gentle alpha pulsing
      f.sprite.alpha = f.baseAlpha * (0.7 + Math.sin(f.phase * 2) * 0.3);
      
      // Wrap around screen
      if (f.baseY < -50) {
        f.baseY = height + 50;
        f.baseX = Math.random() * width;
      }
      if (f.baseX < -50) f.baseX = width + 50;
      if (f.baseX > width + 50) f.baseX = -50;
      
      f.sprite.x = f.x;
      f.sprite.y = f.y;
      f.sprite.rotation = f.rotation;
    }
    
    // Update burst particles
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const p = this.bursts[i];
      p.life -= dt / p.maxLife;
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // Gravity
      p.vx *= 0.98; // Friction
      p.rotation += p.rotationSpeed;
      
      // Fade out
      p.sprite.alpha = Math.max(0, p.life);
      p.scale = 0.3 + p.life * 0.7;
      
      p.sprite.x = p.x;
      p.sprite.y = p.y;
      p.sprite.rotation = p.rotation;
      p.sprite.scale.set(p.scale);
      
      if (p.life <= 0) {
        this.container.removeChild(p.sprite);
        p.sprite.destroy();
        this.bursts.splice(i, 1);
      }
    }
  }
  
  destroy() {
    for (const f of this.floaters) {
      this.container.removeChild(f.sprite);
      f.sprite.destroy();
    }
    for (const p of this.bursts) {
      this.container.removeChild(p.sprite);
      p.sprite.destroy();
    }
    this.floaters = [];
    this.bursts = [];
  }
}

// =============================================================================
// Holographic Gradient Background with animated orbs
// =============================================================================
export class HoloBackground {
  private container: PIXI.Container;
  private overlayContainer: PIXI.Container | null = null;
  private gradients: { g: PIXI.Graphics; baseAlpha: number; speed: number; offset: number }[] = [];
  private lines: PIXI.Container | null = null;
  private cornerDecorations: PIXI.Container | null = null;
  private time = 0;
  
  constructor(container: PIXI.Container, width: number, height: number, overlayContainer?: PIXI.Container) {
    this.container = container;
    this.overlayContainer = overlayContainer || null;
    this.create(width, height);
  }
  
  private create(width: number, height: number) {
    // Deep base
    const base = new PIXI.Graphics();
    base.rect(0, 0, width, height);
    base.fill({ color: SEKAI_COLORS.bg_deep });
    this.container.addChild(base);
    
    // Gradient orbs with glow
    const orbs = [
      { color: SEKAI_COLORS.holo_1, x: 0.12, y: 0.18, size: 0.7, alpha: 0.07, speed: 1 },
      { color: SEKAI_COLORS.holo_2, x: 0.88, y: 0.78, size: 0.55, alpha: 0.055, speed: 0.8 },
      { color: SEKAI_COLORS.holo_3, x: 0.55, y: 0.35, size: 0.45, alpha: 0.045, speed: 1.2 },
      { color: SEKAI_COLORS.holo_4, x: 0.75, y: 0.12, size: 0.3, alpha: 0.035, speed: 0.9 },
      { color: SEKAI_COLORS.sekai_pink, x: 0.25, y: 0.85, size: 0.35, alpha: 0.04, speed: 1.1 },
    ];
    
    this.gradients = [];
    for (const cfg of orbs) {
      const g = new PIXI.Graphics();
      const radius = Math.min(width, height) * cfg.size;
      g.circle(0, 0, radius);
      g.fill({ color: cfg.color, alpha: cfg.alpha });
      g.x = width * cfg.x;
      g.y = height * cfg.y;
      g.blendMode = 'add';
      this.container.addChild(g);
      this.gradients.push({ g, baseAlpha: cfg.alpha, speed: cfg.speed, offset: Math.random() * 10 });
    }
    
    // Diagonal lines pattern
    this.lines = new PIXI.Container();
    this.lines.alpha = 0.025;
    const spacing = 50;
    const line = new PIXI.Graphics();
    for (let i = -height; i < width + height; i += spacing) {
      line.moveTo(i, 0);
      line.lineTo(i + height, height);
    }
    line.stroke({ color: SEKAI_COLORS.sekai_cyan, width: 1 });
    this.lines.addChild(line);
    this.container.addChild(this.lines);
    
    // Corner decorations (in overlay layer to avoid clipping)
    this.addCornerDecorations(width, height);
  }
  
  private addCornerDecorations(width: number, height: number) {
    // Use overlay container if provided, otherwise use main container
    const target = this.overlayContainer || this.container;
    
    // Clear existing corner decorations
    if (this.cornerDecorations) {
      target.removeChild(this.cornerDecorations);
      this.cornerDecorations.destroy();
    }
    
    this.cornerDecorations = new PIXI.Container();
    
    // Top-left corner accent
    const tl = new PIXI.Graphics();
    tl.moveTo(0, 60);
    tl.lineTo(0, 0);
    tl.lineTo(60, 0);
    tl.stroke({ color: SEKAI_COLORS.sekai_cyan, width: 2, alpha: 0.35 });
    tl.circle(0, 0, 4);
    tl.fill({ color: SEKAI_COLORS.sekai_cyan, alpha: 0.6 });
    tl.x = 20;
    tl.y = 20;
    this.cornerDecorations.addChild(tl);
    
    // Bottom-right corner
    const br = new PIXI.Graphics();
    br.moveTo(0, -60);
    br.lineTo(0, 0);
    br.lineTo(-60, 0);
    br.stroke({ color: SEKAI_COLORS.sekai_pink, width: 2, alpha: 0.35 });
    br.circle(0, 0, 4);
    br.fill({ color: SEKAI_COLORS.sekai_pink, alpha: 0.6 });
    br.x = width - 20;
    br.y = height - 20;
    this.cornerDecorations.addChild(br);
    
    // Additional small corner diamonds for extra polish
    const tlDiamond = new PIXI.Graphics();
    tlDiamond.moveTo(0, -5);
    tlDiamond.lineTo(5, 0);
    tlDiamond.lineTo(0, 5);
    tlDiamond.lineTo(-5, 0);
    tlDiamond.closePath();
    tlDiamond.fill({ color: SEKAI_COLORS.sekai_cyan, alpha: 0.3 });
    tlDiamond.x = 85;
    tlDiamond.y = 20;
    this.cornerDecorations.addChild(tlDiamond);
    
    const brDiamond = new PIXI.Graphics();
    brDiamond.moveTo(0, -5);
    brDiamond.lineTo(5, 0);
    brDiamond.lineTo(0, 5);
    brDiamond.lineTo(-5, 0);
    brDiamond.closePath();
    brDiamond.fill({ color: SEKAI_COLORS.sekai_pink, alpha: 0.3 });
    brDiamond.x = width - 85;
    brDiamond.y = height - 20;
    this.cornerDecorations.addChild(brDiamond);
    
    target.addChild(this.cornerDecorations);
  }
  
  update(dt: number) {
    this.time += dt * 0.015;
    for (const { g, baseAlpha, speed, offset } of this.gradients) {
      g.alpha = baseAlpha + Math.sin(this.time * speed + offset) * (baseAlpha * 0.35);
      g.scale.set(1 + Math.sin(this.time * speed * 0.7 + offset + 1) * 0.04);
    }
  }
  
  resize(width: number, height: number) {
    this.container.removeChildren();
    if (this.overlayContainer && this.cornerDecorations) {
      this.overlayContainer.removeChild(this.cornerDecorations);
    }
    this.cornerDecorations = null;
    this.gradients = [];
    this.create(width, height);
  }
  
  setOverlayContainer(overlay: PIXI.Container) {
    this.overlayContainer = overlay;
  }
}

// =============================================================================
// Diamond shape helper
// =============================================================================
export function createDiamond(size: number, color: number, filled = true): PIXI.Graphics {
  const g = new PIXI.Graphics();
  g.moveTo(0, -size);
  g.lineTo(size, 0);
  g.lineTo(0, size);
  g.lineTo(-size, 0);
  g.closePath();
  if (filled) g.fill({ color, alpha: 0.8 });
  else g.stroke({ color, width: 2, alpha: 0.8 });
  return g;
}

// =============================================================================
// Decorative line with end diamonds
// =============================================================================
export function createDecorativeLine(width: number, color: number): PIXI.Container {
  const c = new PIXI.Container();
  
  const line = new PIXI.Graphics();
  line.moveTo(-width/2, 0);
  line.lineTo(width/2, 0);
  line.stroke({ color, width: 1, alpha: 0.4 });
  c.addChild(line);
  
  const d1 = createDiamond(4, color);
  d1.x = -width/2;
  c.addChild(d1);
  
  const d2 = createDiamond(4, color);
  d2.x = width/2;
  c.addChild(d2);
  
  return c;
}

// =============================================================================
// SEKAI-style Button
// =============================================================================
export interface SekaiButtonConfig {
  text: string;
  subtext?: string;
  width?: number;
  height?: number;
  color?: number;
  style?: 'solid' | 'outline' | 'glass';
  onClick?: () => void;
}

export class SekaiButton extends PIXI.Container {
  private config: SekaiButtonConfig;
  private bg!: PIXI.Graphics;
  private glow!: PIXI.Graphics;
  private isHovered = false;
  private isPressed = false;
  
  constructor(config: SekaiButtonConfig) {
    super();
    this.config = config;
    
    const w = config.width ?? 200;
    const h = config.height ?? 52;
    const color = config.color ?? SEKAI_COLORS.sekai_cyan;
    const radius = h / 2;
    const style = config.style ?? 'solid';
    
    // Outer glow
    this.glow = new PIXI.Graphics();
    this.glow.roundRect(-w/2 - 5, -h/2 - 5, w + 10, h + 10, radius + 5);
    this.glow.fill({ color, alpha: 0 });
    this.addChild(this.glow);
    
    // Main bg
    this.bg = new PIXI.Graphics();
    if (style === 'outline') {
      this.bg.roundRect(-w/2, -h/2, w, h, radius);
      this.bg.fill({ color: SEKAI_COLORS.bg_panel, alpha: 0.7 });
      this.bg.roundRect(-w/2, -h/2, w, h, radius);
      this.bg.stroke({ color, width: 2, alpha: 0.9 });
    } else if (style === 'glass') {
      this.bg.roundRect(-w/2, -h/2, w, h, radius);
      this.bg.fill({ color: 0xFFFFFF, alpha: 0.08 });
      this.bg.roundRect(-w/2, -h/2, w, h, radius);
      this.bg.stroke({ color: 0xFFFFFF, width: 1, alpha: 0.25 });
    } else {
      this.bg.roundRect(-w/2, -h/2, w, h, radius);
      this.bg.fill({ color, alpha: 0.92 });
    }
    this.addChild(this.bg);
    
    // Shine highlight
    const shine = new PIXI.Graphics();
    shine.roundRect(-w/2 + 3, -h/2 + 2, w - 6, h * 0.35, radius - 2);
    shine.fill({ color: 0xFFFFFF, alpha: style === 'solid' ? 0.18 : 0.06 });
    this.addChild(shine);
    
    // Text
    const hasSubtext = !!config.subtext;
    const mainText = new PIXI.Text({
      text: config.text,
      style: {
        fontFamily: '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
        fontSize: hasSubtext ? 16 : 17,
        fontWeight: '600',
        fill: style === 'solid' ? 0xFFFFFF : color,
      }
    });
    mainText.anchor.set(0.5);
    mainText.y = hasSubtext ? -6 : 0;
    this.addChild(mainText);
    
    if (hasSubtext) {
      const sub = new PIXI.Text({
        text: config.subtext!,
        style: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: 9,
          fontWeight: '500',
          fill: style === 'solid' ? 0xFFFFFF : color,
          letterSpacing: 2,
        }
      });
      sub.anchor.set(0.5);
      sub.y = 9;
      sub.alpha = 0.75;
      this.addChild(sub);
    }
    
    this.eventMode = 'static';
    this.cursor = 'pointer';
    
    this.on('pointerover', this.onOver);
    this.on('pointerout', this.onOut);
    this.on('pointerdown', this.onDown);
    this.on('pointerup', this.onUp);
    this.on('pointerupoutside', this.onUp);
  }
  
  private onOver = () => {
    this.isHovered = true;
    animate(0.1, p => {
      this.scale.set(1 + 0.05 * p);
      this.glow.alpha = 0.3 * p;
    }, Easing.outQuad);
  };
  
  private onOut = () => {
    this.isHovered = false;
    animate(0.12, p => {
      this.scale.set(1.05 - 0.05 * p);
      this.glow.alpha = 0.3 * (1 - p);
    }, Easing.outQuad);
  };
  
  private onDown = () => {
    this.isPressed = true;
    animate(0.04, p => {
      this.scale.set(1.05 - 0.12 * p);
    }, Easing.outQuad);
  };
  
  private onUp = () => {
    if (!this.isPressed) return;
    this.isPressed = false;
    const target = this.isHovered ? 1.05 : 1;
    animate(0.15, p => {
      this.scale.set(0.93 + (target - 0.93) * p);
    }, Easing.outBack);
    if (this.isHovered) this.config.onClick?.();
  };
}

// =============================================================================
// Transition System
// =============================================================================
export class SekaiTransitions {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private isActive = false;
  
  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.zIndex = UILayer.Transition;
    this.container.visible = false;
    app.stage.addChild(this.container);
  }
  
  async diamondWipe(duration: number, onMidpoint?: () => void): Promise<void> {
    if (this.isActive) return;
    this.isActive = true;
    
    const { width, height } = this.app.screen;
    this.container.removeChildren();
    this.container.visible = true;
    
    const cover = new PIXI.Graphics();
    const diamonds: { x: number; y: number; dist: number }[] = [];
    
    const size = 100;
    const cols = Math.ceil(width / size) + 2;
    const rows = Math.ceil(height / (size * 0.7)) + 2;
    const cx = width / 2, cy = height / 2;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * size + (r % 2) * (size / 2) - size;
        const y = r * size * 0.7 - size;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        diamonds.push({ x, y, dist });
      }
    }
    
    const maxDist = Math.max(...diamonds.map(d => d.dist));
    this.container.addChild(cover);
    
    // Phase 1: diamonds expand
    await animate(duration * 0.4, (p) => {
      cover.clear();
      for (const d of diamonds) {
        const delay = (d.dist / maxDist) * 0.4;
        const progress = Math.max(0, Math.min(1, (p - delay) / 0.6));
        if (progress > 0) {
          const s = size * 0.65 * Easing.outQuad(progress);
          cover.moveTo(d.x, d.y - s);
          cover.lineTo(d.x + s * 0.7, d.y);
          cover.lineTo(d.x, d.y + s);
          cover.lineTo(d.x - s * 0.7, d.y);
          cover.closePath();
        }
      }
      cover.fill({ color: SEKAI_COLORS.bg_deep });
    }, Easing.linear);
    
    cover.clear();
    cover.rect(0, 0, width, height);
    cover.fill({ color: SEKAI_COLORS.bg_deep });
    
    // Flash glow
    const glow = new PIXI.Graphics();
    glow.rect(0, 0, width, height);
    glow.fill({ color: SEKAI_COLORS.sekai_cyan, alpha: 0 });
    this.container.addChild(glow);
    
    await animate(0.08, p => { glow.alpha = 0.15 * p; }, Easing.linear);
    
    onMidpoint?.();
    await delay(60);
    
    // Phase 2: fade out
    await animate(duration * 0.45, (p) => {
      cover.alpha = 1 - p;
      glow.alpha = 0.15 * (1 - p);
    }, Easing.outCubic);
    
    this.container.visible = false;
    this.isActive = false;
  }
  
  async slide(duration: number, direction: 'left' | 'right' = 'right', onMidpoint?: () => void): Promise<void> {
    if (this.isActive) return;
    this.isActive = true;
    
    const { width, height } = this.app.screen;
    this.container.removeChildren();
    this.container.visible = true;
    
    const dir = direction === 'left' ? -1 : 1;
    
    const cover = new PIXI.Graphics();
    cover.rect(0, 0, width, height);
    cover.fill({ color: SEKAI_COLORS.bg_deep });
    cover.x = -width * dir;
    this.container.addChild(cover);
    
    const edge = new PIXI.Graphics();
    edge.rect(0, 0, 50, height);
    edge.fill({ color: SEKAI_COLORS.sekai_cyan, alpha: 0.5 });
    this.container.addChild(edge);
    
    await animate(duration * 0.4, (p) => {
      cover.x = -width * dir * (1 - p);
      edge.x = cover.x + (dir > 0 ? width - 50 : 0);
      edge.alpha = 0.5 * (1 - p * 0.5);
    }, Easing.inOutCubic);
    
    onMidpoint?.();
    await delay(40);
    
    await animate(duration * 0.4, (p) => {
      cover.x = width * dir * p;
      edge.x = cover.x + (dir > 0 ? -50 : width);
      edge.alpha = 0.5 * p;
    }, Easing.inOutCubic);
    
    this.container.visible = false;
    this.isActive = false;
  }
}

// =============================================================================
// Main SEKAI UI Application
// =============================================================================
export class SekaiUIApp {
  public app!: PIXI.Application;
  public layers = new Map<UILayerValue, PIXI.Container>();
  public particles!: AmbientParticles;
  public transitions!: SekaiTransitions;
  public holoBackground!: HoloBackground;
  private resizeObserver?: ResizeObserver;
  private tickerCallbacks: ((dt: number) => void)[] = [];
  
  async init(container: HTMLElement): Promise<void> {
    this.app = new PIXI.Application();
    
    await this.app.init({
      background: SEKAI_COLORS.bg_deep,
      resizeTo: container,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true,
    });
    
    container.appendChild(this.app.canvas as HTMLCanvasElement);
    
    for (const layer of Object.values(UILayer)) {
      const c = new PIXI.Container();
      c.zIndex = layer;
      this.layers.set(layer, c);
      this.app.stage.addChild(c);
    }
    this.app.stage.sortableChildren = true;
    
    this.holoBackground = new HoloBackground(
      this.getLayer(UILayer.BG),
      this.app.screen.width,
      this.app.screen.height,
      this.getLayer(UILayer.Overlay)
    );
    
    this.particles = new AmbientParticles(this.getLayer(UILayer.Particles));
    this.particles.initFloaters(this.app.screen.width, this.app.screen.height, 30);
    this.transitions = new SekaiTransitions(this.app);
    
    this.app.ticker.add((ticker) => {
      const dt = ticker.deltaTime / 60;
      this.particles.update(dt, this.width, this.height);
      this.holoBackground.update(dt);
      for (const cb of this.tickerCallbacks) cb(dt);
    });
    
    this.resizeObserver = new ResizeObserver(() => {
      this.app.resize();
      this.holoBackground.resize(this.width, this.height);
      this.particles.initFloaters(this.width, this.height, 30);
    });
    this.resizeObserver.observe(container);
  }
  
  getLayer(layer: UILayerValue): PIXI.Container {
    return this.layers.get(layer) ?? this.app.stage;
  }
  
  get width() { return this.app.screen.width; }
  get height() { return this.app.screen.height; }
  
  onTick(cb: (dt: number) => void) {
    this.tickerCallbacks.push(cb);
    return () => {
      const i = this.tickerCallbacks.indexOf(cb);
      if (i >= 0) this.tickerCallbacks.splice(i, 1);
    };
  }
  
  burstParticles(x: number, y: number, count = 12) {
    this.particles.burst(x, y, count);
  }
  
  // Use actual kira sprites for burst effects
  async spriteBurst(x: number, y: number, count = 8) {
    await this.particles.spriteBurst(x, y, count);
  }
  
  destroy() {
    this.resizeObserver?.disconnect();
    this.particles.destroy();
    this.app.destroy(true, { children: true });
  }
}
