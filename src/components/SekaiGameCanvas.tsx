/**
 * SEKAI Game Canvas - Authentic Project Sekai UI experience
 * 
 * Replicates the actual game's:
 * - Title screen with "TAP TO START"
 * - Holographic gradient backgrounds
 * - Diamond motifs and geometric decorations
 * - Floating ambient particles (triangles, circles, diamonds)
 * - Fast, snappy animations with overshoot
 * - Cyan/Pink/Purple color scheme
 */

import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import {
  SekaiUIApp,
  UILayer,
  SEKAI_COLORS,
  SekaiButton,
  animate,
  Easing,
  delay,
  createDiamond,
  createDecorativeLine,
  SPRITES,
  loadTexture,
} from '../lib/sekai-ui-engine';

type Screen = 'title' | 'home' | 'projects' | 'skills' | 'about' | 'contact';

export function SekaiGameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SekaiUIApp | null>(null);
  const [ready, setReady] = useState(false);
  const screenRef = useRef<Screen>('title');

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    async function init() {
      if (!containerRef.current || destroyed) return;

      const sekaiApp = new SekaiUIApp();
      await sekaiApp.init(containerRef.current);
      
      if (destroyed) {
        sekaiApp.destroy();
        return;
      }
      
      appRef.current = sekaiApp;

      // Preload key textures
      await Promise.all([
        loadTexture(SPRITES.kira),
        loadTexture(SPRITES.tap_to_start).catch(() => null),
      ]);

      const navigate = async (screen: Screen) => {
        if (!appRef.current || screenRef.current === screen) return;
        
        await appRef.current.transitions.diamondWipe(0.7, () => {
          screenRef.current = screen;
          buildScreen(appRef.current!, screen, navigate);
        });
      };

      buildScreen(sekaiApp, 'title', navigate);
      setReady(true);
    }

    init();

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }}
    />
  );
}

// =============================================================================
// Screen Builder
// =============================================================================
function buildScreen(app: SekaiUIApp, screen: Screen, navigate: (s: Screen) => void) {
  // Clear UI layers
  for (const [key, container] of app.layers) {
    if (key !== UILayer.BG && key !== UILayer.Transition && key !== UILayer.Particles) {
      container.removeChildren();
    }
  }

  switch (screen) {
    case 'title': buildTitleScreen(app, navigate); break;
    case 'home': buildHomeScreen(app, navigate); break;
    case 'projects': buildProjectsScreen(app, navigate); break;
    case 'skills': buildSkillsScreen(app, navigate); break;
    case 'about': buildAboutScreen(app, navigate); break;
    case 'contact': buildContactScreen(app, navigate); break;
  }
}

// =============================================================================
// Title Screen - THE iconic "TAP TO START"
// =============================================================================
async function buildTitleScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const { width, height } = app;
  const cx = width / 2;
  const cy = height / 2;

  const content = new PIXI.Container();
  ui.addChild(content);

  // Decorative diamond frame around logo
  const frameSize = Math.min(width * 0.4, 200);
  const frame = createDiamond(frameSize, SEKAI_COLORS.sekai_cyan, false);
  frame.x = cx;
  frame.y = cy - height * 0.08;
  frame.alpha = 0.15;
  content.addChild(frame);

  // Inner rotating diamond
  const innerDiamond = createDiamond(frameSize * 0.7, SEKAI_COLORS.sekai_pink, false);
  innerDiamond.x = cx;
  innerDiamond.y = cy - height * 0.08;
  innerDiamond.alpha = 0.1;
  content.addChild(innerDiamond);

  // Slow rotation animation
  const rotateCleanup = app.onTick((dt) => {
    frame.rotation += dt * 0.003;
    innerDiamond.rotation -= dt * 0.002;
  });

  // Logo container
  const logo = new PIXI.Container();
  logo.x = cx;
  logo.y = cy - height * 0.08;
  content.addChild(logo);

  // "PROJECT" text
  const projectText = new PIXI.Text({
    text: 'PROJECT',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: Math.min(width * 0.028, 14),
      fontWeight: '400',
      fill: SEKAI_COLORS.sekai_cyan,
      letterSpacing: 10,
    }
  });
  projectText.anchor.set(0.5);
  projectText.y = -65;
  logo.addChild(projectText);

  // Decorative line under PROJECT
  const projLine = createDecorativeLine(projectText.width + 40, SEKAI_COLORS.sekai_cyan);
  projLine.y = -48;
  projLine.alpha = 0.6;
  logo.addChild(projLine);

  // Main name - RODENIOUS
  const mainTitle = new PIXI.Text({
    text: 'RODENIOUS',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: Math.min(width * 0.11, 58),
      fontWeight: '700',
      fill: SEKAI_COLORS.text_white,
      letterSpacing: 3,
    }
  });
  mainTitle.anchor.set(0.5);
  logo.addChild(mainTitle);

  // Japanese subtitle
  const jpText = new PIXI.Text({
    text: 'ロデニアス',
    style: {
      fontFamily: '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
      fontSize: Math.min(width * 0.045, 22),
      fontWeight: '500',
      fill: SEKAI_COLORS.sekai_pink,
    }
  });
  jpText.anchor.set(0.5);
  jpText.y = 48;
  logo.addChild(jpText);

  // Small decorative diamonds around name
  const decor1 = createDiamond(5, SEKAI_COLORS.sekai_cyan);
  decor1.x = -mainTitle.width / 2 - 20;
  decor1.y = 0;
  logo.addChild(decor1);

  const decor2 = createDiamond(5, SEKAI_COLORS.sekai_pink);
  decor2.x = mainTitle.width / 2 + 20;
  decor2.y = 0;
  logo.addChild(decor2);

  // "TAP TO START" section
  const tapContainer = new PIXI.Container();
  tapContainer.x = cx;
  tapContainer.y = cy + height * 0.22;
  content.addChild(tapContainer);

  // Decorative lines around tap text
  const tapLine1 = createDecorativeLine(180, SEKAI_COLORS.sekai_cyan);
  tapLine1.y = -20;
  tapLine1.alpha = 0.4;
  tapContainer.addChild(tapLine1);

  const tapLine2 = createDecorativeLine(180, SEKAI_COLORS.sekai_cyan);
  tapLine2.y = 45;
  tapLine2.alpha = 0.4;
  tapContainer.addChild(tapLine2);

  // TAP TO START text
  const tapText = new PIXI.Text({
    text: 'TAP TO START',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: Math.min(width * 0.03, 15),
      fontWeight: '500',
      fill: SEKAI_COLORS.text_white,
      letterSpacing: 5,
    }
  });
  tapText.anchor.set(0.5);
  tapContainer.addChild(tapText);

  // Japanese version
  const tapJp = new PIXI.Text({
    text: 'タップしてスタート',
    style: {
      fontFamily: '"Zen Kaku Gothic New", sans-serif',
      fontSize: Math.min(width * 0.02, 11),
      fontWeight: '400',
      fill: SEKAI_COLORS.text_gray,
    }
  });
  tapJp.anchor.set(0.5);
  tapJp.y = 22;
  tapContainer.addChild(tapJp);

  // Blinking animation (like the game)
  let blinkTime = 0;
  const blinkCleanup = app.onTick((dt) => {
    blinkTime += dt * 0.03;
    // Pulse with occasional quick blink
    const cycle = blinkTime % 4;
    if (cycle > 1.5 && cycle < 1.7) {
      tapContainer.alpha = 0.25;
    } else {
      tapContainer.alpha = 0.55 + Math.sin(blinkTime * 2.5) * 0.45;
    }
  });

  // Copyright
  const copyright = new PIXI.Text({
    text: '© 2024 Rodney Keilson',
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10,
      fontWeight: '400',
      fill: SEKAI_COLORS.text_dark,
    }
  });
  copyright.anchor.set(0.5);
  copyright.x = cx;
  copyright.y = height - 30;
  content.addChild(copyright);

  // Full screen tap area
  const hitArea = new PIXI.Graphics();
  hitArea.rect(0, 0, width, height);
  hitArea.fill({ color: 0x000000, alpha: 0.001 });
  hitArea.eventMode = 'static';
  hitArea.cursor = 'pointer';
  hitArea.on('pointerdown', async () => {
    blinkCleanup();
    rotateCleanup();
    app.burstParticles(cx, cy, 15);
    await delay(100);
    navigate('home');
  });
  content.addChild(hitArea);

  // Entrance animation
  content.alpha = 0;
  logo.y -= 40;
  
  await animate(0.7, (p) => {
    content.alpha = p;
    logo.y = cy - height * 0.08 - 40 * (1 - p);
  }, Easing.outCubic);
}

// =============================================================================
// Home Screen
// =============================================================================
async function buildHomeScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const header = app.getLayer(UILayer.Header);
  const { width, height } = app;

  // Header
  const headerBar = createHeader(app, 'ホーム', 'HOME');
  header.addChild(headerBar);

  // Content
  const content = new PIXI.Container();
  content.x = width / 2;
  content.y = height * 0.32;
  ui.addChild(content);

  // Profile section
  const nameText = new PIXI.Text({
    text: 'Rodney Keilson',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: Math.min(width * 0.08, 40),
      fontWeight: '700',
      fill: SEKAI_COLORS.text_white,
    }
  });
  nameText.anchor.set(0.5);
  content.addChild(nameText);

  // Decorative line under name (with subtle pulse)
  const nameLine = createDecorativeLine(nameText.width + 60, SEKAI_COLORS.sekai_cyan);
  nameLine.y = 28;
  content.addChild(nameLine);

  // Add subtle breathing animation to the name line
  let breathTime = 0;
  const breathCleanup = app.onTick((dt) => {
    breathTime += dt * 0.02;
    nameLine.alpha = 0.8 + Math.sin(breathTime * 1.5) * 0.2;
  });

  // Role in Japanese
  const roleText = new PIXI.Text({
    text: 'クリエイター • デベロッパー',
    style: {
      fontFamily: '"Zen Kaku Gothic New", sans-serif',
      fontSize: 14,
      fontWeight: '500',
      fill: SEKAI_COLORS.sekai_cyan,
    }
  });
  roleText.anchor.set(0.5);
  roleText.y = 55;
  content.addChild(roleText);

  // Tagline
  const tagline = new PIXI.Text({
    text: 'Building digital experiences with passion',
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      fontWeight: '400',
      fill: SEKAI_COLORS.text_gray,
    }
  });
  tagline.anchor.set(0.5);
  tagline.y = 85;
  content.addChild(tagline);

  // Menu buttons
  const menuItems = [
    { text: '作品集', subtext: 'PROJECTS', screen: 'projects' as Screen, color: SEKAI_COLORS.sekai_cyan },
    { text: 'スキル', subtext: 'SKILLS', screen: 'skills' as Screen, color: SEKAI_COLORS.sekai_pink },
    { text: 'について', subtext: 'ABOUT', screen: 'about' as Screen, color: SEKAI_COLORS.sekai_purple },
    { text: '連絡先', subtext: 'CONTACT', screen: 'contact' as Screen, color: SEKAI_COLORS.holo_4 },
  ];

  const buttonW = Math.min(width * 0.38, 150);
  const buttonH = 50;
  const gap = 14;
  const gridY = height * 0.22;

  menuItems.forEach((item, i) => {
    const btn = new SekaiButton({
      text: item.text,
      subtext: item.subtext,
      width: buttonW,
      height: buttonH,
      color: item.color,
      onClick: () => {
        breathCleanup();
        app.burstParticles(width / 2 + btn.x, height * 0.32 + gridY + btn.y, 8);
        navigate(item.screen);
      },
    });
    
    const col = i % 2;
    const row = Math.floor(i / 2);
    btn.x = (col - 0.5) * (buttonW + gap);
    btn.y = gridY + row * (buttonH + gap);
    btn.alpha = 0;
    content.addChild(btn);

    // Staggered entrance
    delay(80 + i * 60).then(() => {
      const startY = btn.y + 25;
      animate(0.35, (p) => {
        btn.alpha = p;
        btn.y = startY - 25 * p + gridY + row * (buttonH + gap) - startY + 25;
      }, Easing.outBack);
    });
  });

  // Back to title - MUCH LARGER HIT AREA
  const backBtn = new PIXI.Container();
  backBtn.x = 0;
  backBtn.y = height - 55;
  backBtn.eventMode = 'static';
  backBtn.cursor = 'pointer';
  
  // Large invisible hit area
  const backHitArea = new PIXI.Graphics();
  backHitArea.rect(0, 0, 100, 50);
  backHitArea.fill({ color: 0x000000, alpha: 0.001 });
  backBtn.addChild(backHitArea);
  
  const backText = new PIXI.Text({
    text: '← TITLE',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: 11,
      fontWeight: '500',
      fill: SEKAI_COLORS.text_dark,
    }
  });
  backText.x = 24;
  backText.y = 15;
  backBtn.addChild(backText);
  backBtn.on('pointerover', () => { backText.style.fill = SEKAI_COLORS.sekai_cyan; });
  backBtn.on('pointerout', () => { backText.style.fill = SEKAI_COLORS.text_dark; });
  backBtn.on('pointerdown', () => {
    breathCleanup();
    app.burstParticles(50, height - 30, 6);
    navigate('title');
  });
  ui.addChild(backBtn);

  // Entrance animations
  content.alpha = 0;
  headerBar.alpha = 0;
  
  await Promise.all([
    animate(0.4, (p) => { headerBar.alpha = p; headerBar.y = 35 - 15 * (1 - p); }, Easing.outCubic),
    animate(0.5, (p) => { content.alpha = p; }, Easing.outCubic),
  ]);
}

// =============================================================================
// Projects Screen - Custom implementation with proper public/private handling
// =============================================================================
async function buildProjectsScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const header = app.getLayer(UILayer.Header);
  const { width, height } = app;

  const headerBar = createHeader(app, '作品集', 'PROJECTS', () => navigate('home'));
  header.addChild(headerBar);

  const content = new PIXI.Container();
  content.x = width / 2;
  content.y = height * 0.28; // Moved up slightly to fit more projects
  ui.addChild(content);

  // Project data - based on actual GitHub repos (public/private accurate)
  const projects = [
    { 
      title: 'ToxiScope', 
      desc: 'ML Toxic Comment Detection',
      tech: 'Python • PyTorch • HuggingFace',
      isPublic: true,
      color: SEKAI_COLORS.sekai_cyan 
    },
    { 
      title: 'MikuMikuWorldEX', 
      desc: 'Universal Chart Editor',
      tech: 'C++ • OpenGL • ImGui',
      isPublic: true,
      color: SEKAI_COLORS.sekai_pink 
    },
    { 
      title: 'SmuleRod', 
      desc: 'Video Downloader App',
      tech: 'Kotlin • Jetpack Compose',
      isPublic: true,
      color: SEKAI_COLORS.moremore 
    },
    { 
      title: 'Private Project #1', 
      desc: 'Rhythm Game Tools',
      tech: '',
      isPublic: false,
      color: SEKAI_COLORS.sekai_purple 
    },
    { 
      title: 'ScrapiReddit', 
      desc: 'Reddit Scraping Toolkit',
      tech: 'Python • CLI',
      isPublic: true,
      color: SEKAI_COLORS.holo_4 
    },
    { 
      title: 'Private Project #2', 
      desc: 'B2B Web Platform',
      tech: '',
      isPublic: false,
      color: SEKAI_COLORS.leoneed 
    },
  ];

  const cardW = Math.min(width * 0.42, 155);
  const cardH = 75; // Slightly smaller to fit 6 projects
  const gap = 10;

  projects.forEach((project, i) => {
    const card = new PIXI.Container();
    const col = i % 2;
    const row = Math.floor(i / 2);
    card.x = (col - 0.5) * (cardW + gap);
    card.y = row * (cardH + gap);
    
    // Card background with glass effect
    const bg = new PIXI.Graphics();
    bg.roundRect(-cardW/2, -cardH/2, cardW, cardH, 12);
    bg.fill({ color: SEKAI_COLORS.bg_card, alpha: 0.85 });
    card.addChild(bg);

    // Glass shine
    const shine = new PIXI.Graphics();
    shine.roundRect(-cardW/2 + 2, -cardH/2 + 2, cardW - 4, 20, 10);
    shine.fill({ color: 0xFFFFFF, alpha: 0.04 });
    card.addChild(shine);

    // Left accent bar
    const accent = new PIXI.Graphics();
    accent.roundRect(-cardW/2, -cardH/2, 4, cardH, 2);
    accent.fill({ color: project.color });
    card.addChild(accent);

    // Corner diamond
    const diamond = createDiamond(6, project.color);
    diamond.x = cardW/2 - 14;
    diamond.y = -cardH/2 + 14;
    diamond.alpha = 0.6;
    card.addChild(diamond);

    // Title
    const titleText = new PIXI.Text({
      text: project.title,
      style: {
        fontFamily: '"Outfit", sans-serif',
        fontSize: 15,
        fontWeight: '600',
        fill: SEKAI_COLORS.text_white,
      }
    });
    titleText.anchor.set(0, 0.5);
    titleText.x = -cardW/2 + 14;
    titleText.y = project.isPublic ? -18 : 0;
    card.addChild(titleText);

    if (project.isPublic) {
      // Description
      const descText = new PIXI.Text({
        text: project.desc,
        style: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 10,
          fontWeight: '400',
          fill: SEKAI_COLORS.text_gray,
        }
      });
      descText.anchor.set(0, 0.5);
      descText.x = -cardW/2 + 14;
      descText.y = 4;
      card.addChild(descText);

      // Tech stack
      const techText = new PIXI.Text({
        text: project.tech,
        style: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 9,
          fontWeight: '500',
          fill: project.color,
        }
      });
      techText.anchor.set(0, 0.5);
      techText.x = -cardW/2 + 14;
      techText.y = 24;
      techText.alpha = 0.8;
      card.addChild(techText);
    } else {
      // Private project indicator
      const privateText = new PIXI.Text({
        text: '🔒 Private',
        style: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 10,
          fontWeight: '400',
          fill: SEKAI_COLORS.text_dark,
        }
      });
      privateText.anchor.set(0, 0.5);
      privateText.x = -cardW/2 + 14;
      privateText.y = 18;
      card.addChild(privateText);
    }

    card.alpha = 0;
    content.addChild(card);

    // Staggered entrance
    delay(50 + i * 50).then(() => {
      const targetY = row * (cardH + gap);
      const startY = targetY + 20;
      animate(0.3, (p) => {
        card.alpha = p;
        card.y = startY + (targetY - startY) * p;
      }, Easing.outBack);
    });
  });

  headerBar.alpha = 0;
  
  await animate(0.4, (p) => {
    headerBar.alpha = p;
    headerBar.y = 35 - 15 * (1 - p);
  }, Easing.outCubic);
}

// =============================================================================
// Skills Screen - With animated skill bars
// =============================================================================
async function buildSkillsScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const header = app.getLayer(UILayer.Header);
  const { width, height } = app;

  const headerBar = createHeader(app, 'スキル', 'SKILLS', () => navigate('home'));
  header.addChild(headerBar);

  const content = new PIXI.Container();
  content.x = width / 2;
  content.y = height * 0.32;
  ui.addChild(content);

  const skills = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Vue', 'PixiJS'], level: 0.95, color: SEKAI_COLORS.sekai_cyan },
    { title: 'Backend', items: ['Node.js', 'Python', 'C#', 'Go'], level: 0.85, color: SEKAI_COLORS.sekai_pink },
    { title: 'Mobile', items: ['React Native', 'Flutter', 'Android'], level: 0.75, color: SEKAI_COLORS.sekai_purple },
    { title: 'Tools', items: ['Docker', 'Git', 'Unity', 'AWS'], level: 0.8, color: SEKAI_COLORS.holo_4 },
  ];

  const cardW = Math.min(width * 0.75, 300);
  const cardH = 55;
  const gap = 12;

  skills.forEach((skill, i) => {
    const card = new PIXI.Container();
    card.y = i * (cardH + gap) - (skills.length * (cardH + gap)) / 2 + cardH / 2;
    
    // Card background with glass effect
    const bg = new PIXI.Graphics();
    bg.roundRect(-cardW/2, -cardH/2, cardW, cardH, 12);
    bg.fill({ color: SEKAI_COLORS.bg_card, alpha: 0.85 });
    card.addChild(bg);

    // Glass shine
    const shine = new PIXI.Graphics();
    shine.roundRect(-cardW/2 + 2, -cardH/2 + 2, cardW - 4, 12, 10);
    shine.fill({ color: 0xFFFFFF, alpha: 0.04 });
    card.addChild(shine);

    // Left color bar
    const accent = new PIXI.Graphics();
    accent.roundRect(-cardW/2, -cardH/2, 4, cardH, 2);
    accent.fill({ color: skill.color });
    card.addChild(accent);

    // Title
    const titleText = new PIXI.Text({
      text: skill.title,
      style: {
        fontFamily: '"Outfit", sans-serif',
        fontSize: 14,
        fontWeight: '600',
        fill: SEKAI_COLORS.text_white,
      }
    });
    titleText.anchor.set(0, 0.5);
    titleText.x = -cardW/2 + 14;
    titleText.y = -12;
    card.addChild(titleText);

    // Items
    const itemsText = new PIXI.Text({
      text: skill.items.join(' • '),
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 10,
        fontWeight: '400',
        fill: SEKAI_COLORS.text_gray,
      }
    });
    itemsText.anchor.set(0, 0.5);
    itemsText.x = -cardW/2 + 14;
    itemsText.y = 8;
    card.addChild(itemsText);

    // Skill bar background
    const barW = cardW * 0.25;
    const barH = 6;
    const barBg = new PIXI.Graphics();
    barBg.roundRect(cardW/2 - barW - 14, -3, barW, barH, 3);
    barBg.fill({ color: SEKAI_COLORS.bg_deep, alpha: 0.8 });
    card.addChild(barBg);

    // Skill bar fill (will animate)
    const barFill = new PIXI.Graphics();
    barFill.roundRect(0, 0, barW * skill.level, barH, 3);
    barFill.fill({ color: skill.color });
    barFill.x = cardW/2 - barW - 14;
    barFill.y = -3;
    barFill.scale.x = 0;
    card.addChild(barFill);

    card.alpha = 0;
    content.addChild(card);

    // Staggered entrance with skill bar animation
    delay(50 + i * 80).then(async () => {
      const targetY = i * (cardH + gap) - (skills.length * (cardH + gap)) / 2 + cardH / 2;
      const startY = targetY + 20;
      
      await animate(0.3, (p) => {
        card.alpha = p;
        card.y = startY + (targetY - startY) * p;
      }, Easing.outBack);
      
      // Animate skill bar
      animate(0.5, (p) => {
        barFill.scale.x = p;
      }, Easing.outCubic);
    });
  });

  headerBar.alpha = 0;
  
  await animate(0.4, (p) => {
    headerBar.alpha = p;
    headerBar.y = 35 - 15 * (1 - p);
  }, Easing.outCubic);
}

// =============================================================================
// About Screen - With subtle breathing and floating elements
// =============================================================================
async function buildAboutScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const header = app.getLayer(UILayer.Header);
  const { width, height } = app;

  // Header with back button
  const headerBar = createHeader(app, 'について', 'ABOUT', () => navigate('home'));
  header.addChild(headerBar);

  // Content
  const content = new PIXI.Container();
  content.x = width / 2;
  content.y = height * 0.38;
  ui.addChild(content);

  // Decorative diamond behind text
  const bgDiamond = createDiamond(80, SEKAI_COLORS.sekai_cyan, false);
  bgDiamond.alpha = 0.06;
  bgDiamond.y = 30;
  content.addChild(bgDiamond);

  // Add subtle rotation to background diamond
  let decorTime = 0;
  app.onTick((dt) => {
    decorTime += dt * 0.005;
    bgDiamond.rotation = Math.sin(decorTime) * 0.1;
    bgDiamond.scale.set(1 + Math.sin(decorTime * 0.7) * 0.03);
  });

  const lines = [
    { text: "Hi! I'm Rodney Keilson,", style: 'name' },
    { text: "also known as ロデニアス.", style: 'jp' },
    { text: "", style: 'normal' },
    { text: "A passionate developer", style: 'normal' },
    { text: "inspired by rhythm games", style: 'normal' },
    { text: "like Project Sekai.", style: 'highlight' },
    { text: "", style: 'normal' },
    { text: "I strive to bring that same", style: 'normal' },
    { text: "polish and energy to", style: 'normal' },
    { text: "everything I create.", style: 'normal' },
  ];

  lines.forEach((line, i) => {
    const text = new PIXI.Text({
      text: line.text,
      style: {
        fontFamily: line.style === 'jp' ? '"Zen Kaku Gothic New", sans-serif' : '"Inter", sans-serif',
        fontSize: line.style === 'name' ? 16 : 14,
        fontWeight: line.style === 'name' ? '600' : '400',
        fill: line.style === 'highlight' ? SEKAI_COLORS.sekai_cyan : 
              line.style === 'jp' ? SEKAI_COLORS.sekai_pink : SEKAI_COLORS.text_gray,
      }
    });
    text.anchor.set(0.5);
    text.y = i * 26 - lines.length * 13;
    content.addChild(text);
  });

  // Decorative line at the bottom
  const bottomLine = createDecorativeLine(150, SEKAI_COLORS.sekai_pink);
  bottomLine.y = lines.length * 26 - lines.length * 13 + 30;
  bottomLine.alpha = 0.4;
  content.addChild(bottomLine);

  // Entrance
  content.alpha = 0;
  headerBar.alpha = 0;
  
  await Promise.all([
    animate(0.4, (p) => { headerBar.alpha = p; headerBar.y = 35 - 15 * (1 - p); }, Easing.outCubic),
    animate(0.5, (p) => { content.alpha = p; content.y = height * 0.38 + 20 * (1 - p); }, Easing.outCubic),
  ]);
}

// =============================================================================
// Contact Screen - With glass panel and animated decorations
// =============================================================================
async function buildContactScreen(app: SekaiUIApp, navigate: (s: Screen) => void) {
  const ui = app.getLayer(UILayer.UI);
  const header = app.getLayer(UILayer.Header);
  const { width, height } = app;

  const headerBar = createHeader(app, '連絡先', 'CONTACT', () => navigate('home'));
  header.addChild(headerBar);

  const content = new PIXI.Container();
  content.x = width / 2;
  content.y = height * 0.35;
  ui.addChild(content);

  // Glass panel background
  const panelW = Math.min(width * 0.8, 280);
  const panelH = 280;
  const panel = new PIXI.Graphics();
  panel.roundRect(-panelW/2, -30, panelW, panelH, 16);
  panel.fill({ color: SEKAI_COLORS.bg_card, alpha: 0.6 });
  panel.roundRect(-panelW/2, -30, panelW, panelH, 16);
  panel.stroke({ color: 0xFFFFFF, width: 1, alpha: 0.1 });
  content.addChild(panel);

  // Glass shine
  const panelShine = new PIXI.Graphics();
  panelShine.roundRect(-panelW/2 + 3, -27, panelW - 6, 25, 12);
  panelShine.fill({ color: 0xFFFFFF, alpha: 0.05 });
  content.addChild(panelShine);

  const title = new PIXI.Text({
    text: 'Get in Touch',
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: 24,
      fontWeight: '600',
      fill: SEKAI_COLORS.text_white,
    }
  });
  title.anchor.set(0.5);
  content.addChild(title);

  const titleLine = createDecorativeLine(title.width + 40, SEKAI_COLORS.sekai_cyan);
  titleLine.y = 20;
  content.addChild(titleLine);

  const subtitle = new PIXI.Text({
    text: 'お気軽にご連絡ください',
    style: {
      fontFamily: '"Zen Kaku Gothic New", sans-serif',
      fontSize: 12,
      fontWeight: '400',
      fill: SEKAI_COLORS.sekai_pink,
    }
  });
  subtitle.anchor.set(0.5);
  subtitle.y = 45;
  content.addChild(subtitle);

  const contacts = [
    { text: 'メール', sub: 'EMAIL', url: 'mailto:keilsonrodney0710@gmail.com', color: SEKAI_COLORS.sekai_cyan },
    { text: 'GitHub', sub: 'GITHUB', url: 'https://github.com/rodneykeilson', color: SEKAI_COLORS.sekai_purple },
    { text: 'LinkedIn', sub: 'LINKEDIN', url: 'https://linkedin.com/in/rodneykeilson', color: SEKAI_COLORS.leoneed },
  ];

  contacts.forEach((c, i) => {
    const btn = new SekaiButton({
      text: c.text,
      subtext: c.sub,
      width: 180,
      height: 48,
      color: c.color,
      style: 'outline',
      onClick: () => {
        app.burstParticles(width / 2, height * 0.35 + 85 + i * 58, 10);
        window.open(c.url, '_blank');
      },
    });
    btn.y = 85 + i * 58;
    btn.alpha = 0;
    content.addChild(btn);

    // Stagger button entrance
    delay(100 + i * 70).then(() => {
      animate(0.3, (p) => {
        btn.alpha = p;
        btn.x = (1 - p) * 30;
      }, Easing.outCubic);
    });
  });

  content.alpha = 0;
  headerBar.alpha = 0;
  
  await Promise.all([
    animate(0.4, (p) => { headerBar.alpha = p; headerBar.y = 35 - 15 * (1 - p); }, Easing.outCubic),
    animate(0.5, (p) => { content.alpha = p; }, Easing.outCubic),
  ]);
}

// =============================================================================
// Header Component
// =============================================================================
function createHeader(
  app: SekaiUIApp,
  titleJp: string,
  titleEn: string,
  onBack?: () => void
): PIXI.Container {
  const { width } = app;
  const header = new PIXI.Container();
  header.y = 35;

  // Background with subtle glass effect
  const bg = new PIXI.Graphics();
  bg.rect(0, 0, width, 55);
  bg.fill({ color: SEKAI_COLORS.bg_panel, alpha: 0.7 });
  header.addChild(bg);

  // Top subtle highlight for glass look
  const glassHighlight = new PIXI.Graphics();
  glassHighlight.rect(0, 0, width, 1);
  glassHighlight.fill({ color: 0xFFFFFF, alpha: 0.08 });
  header.addChild(glassHighlight);

  // Bottom line accent
  const line = new PIXI.Graphics();
  line.moveTo(0, 55);
  line.lineTo(width, 55);
  line.stroke({ color: SEKAI_COLORS.sekai_cyan, width: 1, alpha: 0.3 });
  header.addChild(line);

  // Back button if provided - MUCH LARGER HIT AREA
  if (onBack) {
    const back = new PIXI.Container();
    back.x = 0;
    back.y = 0;
    back.eventMode = 'static';
    back.cursor = 'pointer';
    
    // Large invisible hit area (60x55 pixels)
    const hitArea = new PIXI.Graphics();
    hitArea.rect(0, 0, 60, 55);
    hitArea.fill({ color: 0x000000, alpha: 0.001 });
    back.addChild(hitArea);
    
    // Visual arrow (small but centered in hit area)
    const arrow = new PIXI.Graphics();
    arrow.moveTo(8, 0);
    arrow.lineTo(0, 8);
    arrow.lineTo(8, 16);
    arrow.stroke({ color: SEKAI_COLORS.sekai_cyan, width: 2.5 });
    arrow.x = 20;
    arrow.y = 19;
    back.addChild(arrow);
    
    back.on('pointerover', () => { arrow.alpha = 0.6; });
    back.on('pointerout', () => { arrow.alpha = 1; });
    back.on('pointerdown', () => {
      app.burstParticles(30, 35 + 27, 8);
      onBack();
    });
    header.addChild(back);
  }

  // Title
  const title = new PIXI.Text({
    text: titleJp,
    style: {
      fontFamily: '"Zen Kaku Gothic New", sans-serif',
      fontSize: 18,
      fontWeight: '600',
      fill: SEKAI_COLORS.text_white,
    }
  });
  title.anchor.set(0.5, 0.5);
  title.x = width / 2;
  title.y = 22;
  header.addChild(title);

  // English subtitle
  const sub = new PIXI.Text({
    text: titleEn,
    style: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: 9,
      fontWeight: '500',
      fill: SEKAI_COLORS.sekai_cyan,
      letterSpacing: 2,
    }
  });
  sub.anchor.set(0.5, 0.5);
  sub.x = width / 2;
  sub.y = 42;
  header.addChild(sub);

  return header;
}

export default SekaiGameCanvas;
