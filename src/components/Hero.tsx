import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Sparkles } from 'lucide-react';
import { SekaiButton } from './SekaiButton';

// ============================================================================
// Hero Section - Authentic Project Sekai Aesthetic
// 
// Features:
// - Japanese + English dual-language text
// - Geometric decorative elements (hexagons, diamonds)
// - Trapezoid SEKAI buttons
// - Subtle glows and magical atmosphere
// - Clean, elegant, not flashy
// ============================================================================

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 md:py-0"
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main cyan glow - top left */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)',
            left: '5%',
            top: '10%',
          }}
        />
        {/* Purple glow - bottom right */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)',
            right: '10%',
            bottom: '15%',
          }}
        />
        {/* Pink accent - subtle */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)',
            left: '50%',
            top: '60%',
          }}
        />
        
        {/* Hexagon pattern overlay */}
        <div className="absolute inset-0 pattern-hex opacity-30" />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diamond decorations */}
        <motion.div
          className="absolute top-[15%] left-[8%] w-3 h-3 bg-[var(--color-sekai-cyan)] rotate-45 opacity-20"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[25%] right-[12%] w-2 h-2 bg-[var(--color-sekai-pink)] rotate-45 opacity-15"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-2.5 h-2.5 bg-[var(--color-sekai-purple)] rotate-45 opacity-20"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        
        {/* Thin accent lines */}
        <div 
          className="absolute top-[20%] left-0 w-32 h-[1px] opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-sekai-cyan), transparent)' }}
        />
        <div 
          className="absolute bottom-[25%] right-0 w-24 h-[1px] opacity-15"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-sekai-purple), transparent)' }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Top decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-sekai-cyan)] opacity-40" />
          <Sparkles className="w-4 h-4 text-[var(--color-sekai-cyan)] opacity-60" />
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
          <span className="text-gradient text-glow-cyan">Rodney Keilson</span>
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

        {/* SEKAI-style buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SekaiButton
            japanese="作品を見る"
            english="VIEW WORKS"
            variant="cyan"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <SekaiButton
            japanese="連絡する"
            english="CONTACT ME"
            variant="pink"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: Github, href: 'https://github.com/rodneykeilson', label: 'GitHub' },
            { icon: Mail, href: 'mailto:keilsonrodney0710@gmail.com', label: 'Email' },
            { icon: Linkedin, href: 'https://linkedin.com/in/rodneykeilson', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-1 p-4 sekai-card hover:glow-cyan transition-all duration-300"
              aria-label={label}
              whileHover={{ y: -3 }}
            >
              <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-sekai-cyan)] transition-colors" />
              <span className="text-[10px] font-en text-[var(--color-text-muted)] tracking-wider uppercase group-hover:text-[var(--color-text-secondary)]">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
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
