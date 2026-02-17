/**
 * SEKAI Game Mode - React + Framer Motion implementation
 * 
 * A magical, Project Sekai-inspired portfolio experience
 * that matches the content of classic mode but with game-style UI
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Lock, ChevronLeft, Mail, Linkedin, Sparkles } from 'lucide-react';
import { projects, privateProjects, categoryLabels } from '../data/projects';

type Screen = 'title' | 'home' | 'projects' | 'skills' | 'about' | 'contact';

const BASE = import.meta.env.BASE_URL || '/';

// Pre-generate particle data outside component to avoid re-renders (reduced for performance)
const PARTICLE_DATA = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: (i * 12 + 5) % 100,
  delay: (i * 0.5) % 5,
  duration: 12 + (i % 6),
  size: 5 + (i % 6),
  type: ['diamond', 'circle', 'star'][i % 3] as 'diamond' | 'circle' | 'star',
  color: ['#00CCC0', '#FF77A8', '#BB88FF', '#FFDD44'][i % 4],
}));

// Sparkle trail effect (reduced for performance)
const SPARKLE_POSITIONS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: (i * 8.3 + 5) % 100,
  y: (i * 7.1 + 10) % 100,
  delay: i * 0.4,
  scale: 0.5 + (i % 4) * 0.2,
}));

// Sparkle component for effects
function Sparkle({ delay = 0, x, y, scale = 1 }: { delay?: number; x: number; y: number; scale?: number }) {
  return (
    <motion.img
      src={`${BASE}sekai-sprites/misc/eff_kira_h100_wh.png`}
      alt=""
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: 24 * scale, height: 24 * scale }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0, 0.9, 0],
        scale: [0.3, 1.2 * scale, 0.5],
        rotate: [0, 180],
        y: [0, -30]
      }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 2 }}
    />
  );
}

// Floating particles background with more magic
function FloatingParticles() {
  const particles = useMemo(() => PARTICLE_DATA, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute ${p.type === 'diamond' ? 'rotate-45' : ''}`}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            border: p.type === 'star' ? 'none' : `1.5px solid ${p.color}`,
            background: p.type === 'star' ? p.color : 'transparent',
            borderRadius: p.type === 'circle' ? '50%' : p.type === 'star' ? '50%' : '2px',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}40`,
          }}
          animate={{
            y: [window.innerHeight + 50, -50],
            x: [0, Math.sin(p.id) * 60],
            rotate: p.type === 'diamond' ? [45, 405] : [0, 360],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Ambient sparkles - only render some for performance */}
      {SPARKLE_POSITIONS.slice(0, 4).map(s => (
        <Sparkle key={`sparkle-${s.id}`} x={s.x} y={s.y} delay={s.delay} scale={s.scale} />
      ))}
    </div>
  );
}

// Holographic gradient background with enhanced magic (optimized for performance)
function HolographicBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#0A0A12' }}>
      {/* Main cyan glow orb - simplified animation */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 60%)',
          left: '0%',
          top: '5%',
          filter: 'blur(80px)',
        }}
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Pink glow orb - simplified animation */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 119, 168, 0.12) 0%, transparent 60%)',
          right: '5%',
          bottom: '15%',
          filter: 'blur(70px)',
        }}
        animate={{ 
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      
      {/* Purple accent orb - static for performance */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(187, 136, 255, 0.1) 0%, transparent 60%)',
          left: '45%',
          top: '35%',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Diagonal lines overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(0, 204, 192, 0.5) 40px,
            rgba(0, 204, 192, 0.5) 41px
          )`,
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

// Diamond decoration component
function Diamond({ size = 8, color = '#00CCC0', filled = true, className = '' }: { 
  size?: number; 
  color?: string; 
  filled?: boolean;
  className?: string;
}) {
  return (
    <div 
      className={`rotate-45 ${className}`}
      style={{
        width: size,
        height: size,
        background: filled ? color : 'transparent',
        border: filled ? 'none' : `2px solid ${color}`,
        opacity: 0.8,
      }}
    />
  );
}

// SEKAI-style premium button with circular glow
function SekaiBtn({ 
  children, 
  onClick, 
  color = '#00CCC0',
  variant = 'solid',
  className = '',
  jp,
  en,
}: { 
  children?: React.ReactNode;
  onClick?: () => void;
  color?: string;
  variant?: 'solid' | 'outline' | 'glass';
  className?: string;
  jp?: string;
  en?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Darken color for gradient
  const darkColor = color.replace(/^#/, '');
  const r = Math.max(0, parseInt(darkColor.slice(0, 2), 16) - 40);
  const g = Math.max(0, parseInt(darkColor.slice(2, 4), 16) - 40);
  const b = Math.max(0, parseInt(darkColor.slice(4, 6), 16) - 40);
  const darkerColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group cursor-pointer ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow - CIRCULAR to match button shape */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.3,
        }}
        animate={{
          scale: isHovered ? [1, 1.2, 1.1] : 1,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Button background - glass/transparent */}
      <div 
        className="relative px-6 py-4 rounded-full overflow-hidden backdrop-blur-md"
        style={{
          background: variant === 'solid' 
            ? `linear-gradient(135deg, ${color}60 0%, ${darkerColor}50 100%)`
            : variant === 'glass' 
            ? 'rgba(255,255,255,0.08)' 
            : 'transparent',
          border: variant === 'outline' ? `2px solid ${color}60` : 
                  variant === 'glass' ? '1px solid rgba(255,255,255,0.15)' : `1px solid ${color}30`,
          boxShadow: variant === 'solid' ? `0 4px 20px ${color}40, inset 0 1px 0 rgba(255,255,255,0.15)` : 'none',
        }}
      >
        {/* Inner shine overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%)',
          }}
        />
        
        {/* Animated inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}40 0%, transparent 60%)`,
          }}
          animate={{
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-center">
          {jp && en ? (
            <>
              <span 
                className="font-display text-sm md:text-base font-semibold tracking-[0.12em] uppercase"
                style={{ 
                  color: variant === 'solid' ? '#fff' : color,
                  textShadow: variant === 'solid' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {en}
              </span>
            </>
          ) : (
            <span style={{ color: variant === 'solid' ? '#fff' : color }}>{children}</span>
          )}
        </div>
      </div>

      {/* Sparkle effect on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </>
      )}
    </motion.button>
  );
}

// Title Screen - Click anywhere to start
function TitleScreen({ onStart }: { onStart: () => void }) {
  const [sparkles] = useState(() => 
    Array.from({ length: 6 }, (_, i) => ({ 
      id: i, 
      x: 20 + (i * 12) % 60, 
      y: 30 + (i * 8) % 40,
      scale: 0.7 + (i % 2) * 0.4,
    }))
  );

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center z-10 cursor-pointer"
      onClick={onStart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Pulsing background glow - simplified */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,204,192,0.1) 0%, transparent 60%)',
        }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Decorative rotating diamonds - reduced to 2 */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 240, height: 240 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <Diamond size={240} color="#00CCC0" filled={false} className="absolute inset-0 opacity-12" />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 160, height: 160 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <Diamond size={160} color="#FF77A8" filled={false} className="absolute inset-0 opacity-10" />
      </motion.div>

      {/* Sparkles across screen */}
      {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} delay={s.id * 0.4} scale={s.scale} />)}

      {/* Logo with glow - simplified */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >        
        <motion.div
          className="text-xs tracking-[0.5em] text-[#00CCC0] mb-3"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          PROJECT
        </motion.div>
        <h1 
          className="text-5xl md:text-8xl font-bold text-white tracking-wider font-display relative"
          style={{ 
            textShadow: '0 0 30px rgba(0,204,192,0.3)',
          }}
        >
          RODENIOUS
        </h1>
        <motion.div 
          className="text-sm md:text-base text-[#FF77A8] font-display tracking-[0.2em] uppercase mt-4"
          style={{ textShadow: '0 0 15px rgba(255,119,168,0.3)' }}
        >
          CREATIVE PORTFOLIO
        </motion.div>
        
        {/* Decorative line */}
        <motion.div 
          className="flex items-center justify-center gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Diamond size={6} color="#00CCC0" />
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#00CCC0] to-transparent" />
          <Diamond size={8} color="#FF77A8" />
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FF77A8] to-transparent" />
          <Diamond size={6} color="#BB88FF" />
        </motion.div>
      </motion.div>

      {/* TAP TO START - animated pulse */}
      <motion.div
        className="absolute bottom-[22%] text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="text-sm tracking-[0.3em] text-white mb-1"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          >
            TAP ANYWHERE TO START
          </div>
          <div className="text-xs text-gray-400 font-en tracking-[0.2em] uppercase">Interactive Experience</div>
        </motion.div>
        
        {/* Animated chevrons */}
        <motion.div
          className="flex flex-col items-center mt-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 border-b border-r border-white/30 rotate-45" />
          <div className="w-2 h-2 border-b border-r border-white/20 rotate-45 -mt-1" />
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <div className="absolute bottom-8 text-xs text-gray-600">
        © 2026 Rodney Keilson
      </div>
    </motion.div>
  );
}

// Home Screen with premium magical effects
function HomeScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const menuItems = [
    { en: 'PROJECTS', screen: 'projects' as Screen, color: '#00CCC0', icon: '◈' },
    { en: 'SKILLS', screen: 'skills' as Screen, color: '#FF77A8', icon: '✦' },
    { en: 'ABOUT', screen: 'about' as Screen, color: '#BB88FF', icon: '◇' },
    { en: 'CONTACT', screen: 'contact' as Screen, color: '#FFDD44', icon: '✧' },
  ];

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center pt-16 md:pt-20 z-10 px-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <Header title="Home" subtitle="HOME" />

      {/* Profile section with glow */}
      <motion.div 
        className="text-center mt-6 md:mt-10 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute -inset-10 blur-3xl rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,204,192,0.15) 0%, transparent 70%)' }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white font-display relative"
          style={{ textShadow: '0 0 40px rgba(0,204,192,0.3)' }}
        >
          Rodney Keilson
        </motion.h2>
        
        {/* Animated divider line */}
        <motion.div 
          className="flex items-center justify-center gap-2 mt-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div 
            className="w-12 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #00CCC0)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Diamond size={6} color="#00CCC0" />
          <Diamond size={8} color="#FF77A8" />
          <Diamond size={6} color="#BB88FF" />
          <motion.div 
            className="w-12 h-0.5"
            style={{ background: 'linear-gradient(90deg, #BB88FF, transparent)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.p 
          className="text-[#00CCC0] font-display mt-4 text-sm tracking-[0.18em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Creator • Developer
        </motion.p>
        <motion.p 
          className="text-gray-400 text-sm mt-2 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Building digital experiences with passion and precision
        </motion.p>
      </motion.div>

      {/* Menu Grid - Premium Buttons */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mt-8 md:mt-10 max-w-sm w-full pb-20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={item.en}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <SekaiBtn
              onClick={() => navigate(item.screen)}
              color={item.color}
              jp={item.en}
              en={item.en}
              className="w-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Back to title */}
      <motion.button
        onClick={() => navigate('title' as Screen)}
        className="absolute bottom-6 left-6 text-xs text-gray-500 hover:text-[#00CCC0] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ← TITLE
      </motion.button>
    </motion.div>
  );
}

// Header component
function Header({ title, subtitle, onBack }: { title: string; subtitle: string; onBack?: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-[#1A1A28]/80 backdrop-blur-sm border-b border-[#00CCC0]/20">
      <div className="flex items-center justify-center h-14 relative">
        {onBack && (
          <motion.button
            onClick={onBack}
            className="absolute left-4 text-[#00CCC0] p-2"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
        <div className="text-center">
          <div className="text-base font-semibold tracking-[0.08em] uppercase text-white font-display">{title}</div>
          <div className="text-[9px] tracking-widest text-[#00CCC0]">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

// Projects Screen
function ProjectsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  const colorMap = { cyan: '#00CCC0', pink: '#FF77A8', purple: '#BB88FF' };

  return (
    <motion.div 
      className="fixed inset-0 z-10 overflow-y-auto pt-16 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="Projects" subtitle="PROJECTS" onBack={() => navigate('home')} />

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Featured Projects */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#FFDD44]" />
            <span className="text-sm text-gray-400">Featured</span>
          </div>
          
          <div className="space-y-4">
            {featuredProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-[#222235]/80 border border-white/10 hover:border-white/30 transition-all group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                style={{ borderLeftColor: colorMap[project.color], borderLeftWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-white font-display">{project.title}</h3>
                      <Diamond size={6} color={colorMap[project.color]} />
                      <span 
                        className="text-[9px] px-2 py-0.5 rounded-full tracking-wider"
                        style={{ background: `${colorMap[project.color]}20`, color: colorMap[project.color] }}
                      >
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{project.longDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map(t => (
                        <span 
                          key={t} 
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: `${colorMap[project.color]}20`, color: colorMap[project.color] }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Github size={20} className="text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-4">Other Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#222235]/60 border border-white/5 hover:border-white/20 transition-all group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${colorMap[project.color]}20` }}
                >
                  <Diamond size={8} color={colorMap[project.color]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium text-white truncate">{project.title}</h4>
                    <span 
                      className="text-[8px] px-1.5 py-0.5 rounded-full tracking-wider flex-shrink-0"
                      style={{ background: `${colorMap[project.color]}20`, color: colorMap[project.color] }}
                    >
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{project.description}</p>
                </div>
                <ExternalLink size={14} className="text-gray-500 group-hover:text-[#00CCC0] transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Private Projects */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#BB88FF]" />
            <span className="text-sm text-gray-400 font-display tracking-wide uppercase">Private Work</span>
            <span className="text-[9px] text-gray-500 tracking-widest">PRIVATE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {privateProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="p-3 rounded-lg bg-[#222235]/40 border border-white/5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Lock size={12} className="text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-400">{project.title}</h4>
                </div>
                <p className="text-xs text-gray-500">{project.description}</p>
                <span 
                  className="inline-block text-[9px] mt-2 px-2 py-0.5 rounded-full"
                  style={{ background: `${colorMap[project.color]}15`, color: colorMap[project.color] }}
                >
                  {categoryLabels[project.category]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all on GitHub */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="https://github.com/rodneykeilson?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#00CCC0] hover:text-white transition-colors"
          >
            <Github size={16} />
            <span className="font-display tracking-wide uppercase">View All Repositories</span>
            <span className="text-[9px] tracking-widest opacity-70">VIEW ALL</span>
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Skills Screen
function SkillsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const skills = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Vue', 'Next.js', 'TailwindCSS'], level: 95, color: '#00CCC0' },
    { title: 'Backend', items: ['Node.js', 'Python', 'C#', 'Go', 'PostgreSQL'], level: 85, color: '#FF77A8' },
    { title: 'Mobile', items: ['React Native', 'Flutter', 'Kotlin', 'Android'], level: 75, color: '#BB88FF' },
    { title: 'Tools', items: ['Docker', 'Git', 'Unity', 'AWS', 'Linux'], level: 80, color: '#FFDD44' },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-10 overflow-y-auto pt-16 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="Skills" subtitle="SKILLS" onBack={() => navigate('home')} />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              className="p-4 rounded-xl bg-[#222235]/80 border border-white/10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                <span className="text-sm" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-[#1A1A28] mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span 
                    key={item}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// About Screen  
function AboutScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const lines = [
    { text: "Hi! I'm Rodney Keilson,", highlight: true },
    { text: "also known as Rodenious.", jp: true },
    { text: "" },
    { text: "A passionate developer" },
    { text: "inspired by rhythm games" },
    { text: "like Project Sekai.", color: '#00CCC0' },
    { text: "" },
    { text: "I strive to bring that same" },
    { text: "polish and energy to" },
    { text: "everything I create." },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="About" subtitle="ABOUT" onBack={() => navigate('home')} />

      {/* Decorative diamond */}
      <motion.div
        className="absolute opacity-10"
        animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Diamond size={250} color="#BB88FF" filled={false} />
      </motion.div>

      <motion.div 
        className="text-center relative z-10 max-w-md"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`text-base md:text-lg mb-1 ${
              line.highlight ? 'text-white font-semibold' : 
                line.jp ? 'text-[#FF77A8] font-display uppercase tracking-[0.1em]' : 
              line.color ? '' : 'text-gray-400'
            }`}
            style={line.color ? { color: line.color } : undefined}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            {line.text || '\u00A0'}
          </motion.p>
        ))}
      </motion.div>

      {/* Decorative line */}
      <motion.div 
        className="mt-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Diamond size={6} color="#FF77A8" />
        <div className="w-32 h-0.5 bg-gradient-to-r from-[#FF77A8] to-transparent" />
        <div className="w-32 h-0.5 bg-gradient-to-l from-[#FF77A8] to-transparent" />
        <Diamond size={6} color="#FF77A8" />
      </motion.div>
    </motion.div>
  );
}

// Contact Screen
function ContactScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const contacts = [
    { label: 'Email', en: 'EMAIL', icon: Mail, url: 'mailto:keilsonrodney0710@gmail.com', color: '#00CCC0' },
    { label: 'GitHub', en: 'GITHUB', icon: Github, url: 'https://github.com/rodneykeilson', color: '#BB88FF' },
    { label: 'LinkedIn', en: 'LINKEDIN', icon: Linkedin, url: 'https://linkedin.com/in/rodneykeilson', color: '#4499EE' },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="Contact" subtitle="CONTACT" onBack={() => navigate('home')} />

      <motion.div 
        className="w-full max-w-sm bg-[#222235]/60 rounded-2xl p-6 border border-white/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-1">Get in Touch</h2>
        <p className="text-sm text-[#FF77A8] text-center font-en mb-6">Feel free to reach out anytime.</p>

        <div className="space-y-3">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.en}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border transition-all"
              style={{ 
                borderColor: `${contact.color}50`,
                background: `${contact.color}10`,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <contact.icon size={20} style={{ color: contact.color }} />
              <div className="flex-1">
                <div className="text-white font-en">{contact.label}</div>
                <div className="text-[9px] tracking-widest text-gray-500">{contact.en}</div>
              </div>
              <ExternalLink size={14} className="text-gray-500" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Game Mode Component
export function SekaiGameMode() {
  const [screen, setScreen] = useState<Screen>('title');
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useCallback((newScreen: Screen) => {
    if (transitioning || newScreen === screen) return;
    setTransitioning(true);
    
    // Simple fade transition
    setTimeout(() => {
      setScreen(newScreen);
      setTransitioning(false);
    }, 200);
  }, [screen, transitioning]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <HolographicBackground />
      <FloatingParticles />
      
      <AnimatePresence mode="wait">
        {screen === 'title' && <TitleScreen key="title" onStart={() => navigate('home')} />}
        {screen === 'home' && <HomeScreen key="home" navigate={navigate} />}
        {screen === 'projects' && <ProjectsScreen key="projects" navigate={navigate} />}
        {screen === 'skills' && <SkillsScreen key="skills" navigate={navigate} />}
        {screen === 'about' && <AboutScreen key="about" navigate={navigate} />}
        {screen === 'contact' && <ContactScreen key="contact" navigate={navigate} />}
      </AnimatePresence>
    </div>
  );
}

export default SekaiGameMode;
