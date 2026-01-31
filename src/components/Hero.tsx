import { motion } from 'framer-motion';
import { Github, Mail, Linkedin } from 'lucide-react';
import { useSparkleEffect } from '../hooks/useSparkleEffect';

// ============================================================================
// Hero Section - AUTHENTIC Project Sekai UI
// 
// Using REAL extracted sprites from the game:
// - tex_logo_projectSEKAI_back.png - Logo background
// - btn_round_h80_*.png - Actual SEKAI buttons
// - frame_select_r16_*.png - Card frames
// - eff_*_150.png - Particle effects
// - Authentic color scheme and layout
// ============================================================================

// Base URL for assets (handles GitHub Pages deployment path)
const BASE = import.meta.env.BASE_URL;

// SEKAI-style button using actual game sprites
function SekaiRealButton({ 
  japanese, 
  english, 
  variant = 'cyan',
  onClick 
}: { 
  japanese: string; 
  english: string; 
  variant?: 'cyan' | 'pink' | 'green';
  onClick?: () => void;
}) {
  const { triggerBurst, BurstContainer } = useSparkleEffect();
  
  const glowColors = {
    cyan: 'rgba(0, 212, 170, 0.4)',
    pink: 'rgba(255, 107, 157, 0.4)',
    green: 'rgba(136, 221, 68, 0.4)',
  };

  const gradients = {
    cyan: 'linear-gradient(135deg, #00D4AA 0%, #00A88A 100%)',
    pink: 'linear-gradient(135deg, #FF6B9D 0%, #E0547A 100%)',
    green: 'linear-gradient(135deg, #88DD44 0%, #66BB33 100%)',
  };

  const handleClick = (e: React.MouseEvent) => {
    triggerBurst(e.clientX, e.clientY, 12);
    onClick?.();
  };

  return (
    <>
      {BurstContainer}
      <motion.button
        onClick={handleClick}
        className="relative group cursor-pointer btn-magic"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Button background using SEKAI gradient */}
        <div 
          className="relative px-8 py-4 rounded-full overflow-hidden"
          style={{
            background: gradients[variant],
            boxShadow: `0 4px 20px ${glowColors[variant]}`,
          }}
        >
          {/* Inner glow overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
          
          {/* Button frame overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${BASE}sekai-sprites/frames/frame_select_r16_wh.png)`,
              backgroundSize: '100% 100%',
            }}
          />

          {/* Text content */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-jp text-white text-base font-medium tracking-wide">
              {japanese}
            </span>
            <span className="font-en text-white/80 text-[10px] tracking-[0.15em] uppercase">
              {english}
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 30px ${glowColors[variant]}`,
          }}
        />
      </motion.button>
    </>
  );
}

// SEKAI-style social link using actual game sprites
function SekaiSocialLink({
  icon: Icon,
  href,
  label
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="relative group cursor-pointer"
      whileHover={{ y: -3 }}
      aria-label={label}
    >
      {/* Card background with SEKAI frame */}
      <div 
        className="relative p-4 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(20, 20, 32, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Corner accents using actual SEKAI sprites */}
        <img 
          src={`${BASE}sekai-sprites/misc/img_triangle_wh.png`}
          alt="" 
          className="absolute top-0 left-0 w-3 h-3 opacity-20"
        />
        <img 
          src={`${BASE}sekai-sprites/misc/img_triangle_wh.png`}
          alt="" 
          className="absolute bottom-0 right-0 w-3 h-3 opacity-20 rotate-180"
        />

        {/* Icon and label */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-sekai-cyan)] transition-colors" />
          <span className="text-[10px] font-en text-[var(--color-text-muted)] tracking-wider uppercase group-hover:text-[var(--color-text-secondary)] transition-colors">
            {label}
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)',
        }}
      />
    </motion.a>
  );
}

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 md:py-0"
    >
      {/* Background with authentic SEKAI texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main SEKAI cyan glow - authentic game color */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-[150px]"
          style={{
            background: 'radial-gradient(circle, #00D9B0 0%, transparent 70%)',
            left: '10%',
            top: '0%',
          }}
        />
        {/* Purple accent glow */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)',
            right: '5%',
            bottom: '10%',
          }}
        />
        {/* Pink accent - subtle */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #FF4D88 0%, transparent 70%)',
            left: '40%',
            top: '50%',
          }}
        />

        {/* Actual SEKAI texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BASE}sekai-sprites/misc/tex_sekai_common_v2_01.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Floating decorative elements using real sprites */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating sparkle effects */}
        <motion.img
          src={`${BASE}sekai-sprites/misc/eff_0_150.png`}
          alt=""
          className="absolute top-[15%] left-[10%] w-8 h-8 opacity-40"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={`${BASE}sekai-sprites/misc/eff_1_150.png`}
          alt=""
          className="absolute top-[20%] right-[15%] w-6 h-6 opacity-30"
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.img
          src={`${BASE}sekai-sprites/misc/eff_8_150.png`}
          alt=""
          className="absolute bottom-[25%] left-[20%] w-6 h-6 opacity-30"
          animate={{ opacity: [0.2, 0.4, 0.2], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src={`${BASE}sekai-sprites/misc/eff_9_150.png`}
          alt=""
          className="absolute bottom-[30%] right-[10%] w-8 h-8 opacity-25"
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Corner decorations using SEKAI sprites */}
        <img 
          src={`${BASE}sekai-sprites/misc/img_kira_lyw.png`}
          alt="" 
          className="absolute top-[10%] right-[5%] w-12 h-12 opacity-20"
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Top decorative element using SEKAI sprite */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-sekai-cyan)] opacity-40" />
          <motion.img
            src={`${BASE}sekai-sprites/icons/icon_crystal.png`}
            alt=""
            className="w-5 h-5 opacity-60"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-sekai-cyan)] opacity-40" />
        </div>

        {/* Japanese tagline */}
        <motion.p 
          className="font-jp text-[var(--color-sekai-cyan)] text-base md:text-lg tracking-[0.2em] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          クリエイター • 開発者 • アーティスト
        </motion.p>
        
        {/* English subtitle */}
        <motion.p 
          className="font-en text-[var(--color-text-muted)] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Creator • Developer • Artist
        </motion.p>

        {/* Name - Large display */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span 
            className="bg-gradient-to-r from-[var(--color-sekai-cyan)] via-[var(--color-sekai-pink)] to-[var(--color-sekai-purple)] bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 40px rgba(0, 212, 170, 0.3)',
            }}
          >
            Rodney Keilson
          </span>
        </motion.h1>

        {/* Alias with Japanese */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)]">
            aka <span className="text-[var(--color-sekai-pink)] font-jp font-semibold">ロデニアス</span>
          </p>
          <p className="text-sm text-[var(--color-text-muted)] font-en tracking-wider mt-1">
            RODENIOUS
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-12 leading-relaxed font-jp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Crafting digital experiences at the intersection of 
          <span className="text-[var(--color-sekai-cyan)]"> technology</span>, 
          <span className="text-[var(--color-sekai-pink)]"> creativity</span>, and 
          <span className="text-[var(--color-sekai-purple)]"> passion</span>.
        </motion.p>

        {/* SEKAI-style buttons using real assets */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SekaiRealButton
            japanese="作品を見る"
            english="VIEW WORKS"
            variant="cyan"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <SekaiRealButton
            japanese="連絡する"
            english="CONTACT ME"
            variant="pink"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </motion.div>

        {/* Social links with SEKAI styling */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SekaiSocialLink icon={Github} href="https://github.com/rodneykeilson" label="GitHub" />
          <SekaiSocialLink icon={Mail} href="mailto:keilsonrodney0710@gmail.com" label="Email" />
          <SekaiSocialLink icon={Linkedin} href="https://linkedin.com/in/rodneykeilson" label="LinkedIn" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator with SEKAI styling */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] font-en tracking-[0.2em] text-[var(--color-text-muted)] uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[var(--color-text-muted)]/30 flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div 
            className="w-0.5 h-2 rounded-full bg-[var(--color-sekai-cyan)]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
