import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, Mail, Linkedin, ChevronDown, Music, Code, Sparkles } from 'lucide-react';
import { useRef, useCallback } from 'react';

// ============================================================================
// Hero Section - Clean, Professional, Rhythm-Inspired
// Features: Parallax effects, glitch text, floating icons, mobile responsive
// ============================================================================

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring physics for parallax
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Parallax transforms - subtle for elegance
  const bgX = useTransform(smoothX, [0, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [0, 1], [-10, 10]);
  const fgX = useTransform(smoothX, [0, 1], [-30, 30]);
  const fgY = useTransform(smoothY, [0, 1], [-20, 20]);

  // Handle mouse movement for parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 md:py-0"
      onMouseMove={handleMouseMove}
    >
      {/* Deep background layer - animated gradient orbs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        {/* Gradient mesh - responsive sizing */}
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full opacity-20 md:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)',
            left: '-10%',
            top: '-15%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full opacity-15 md:opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)',
            right: '-5%',
            top: '5%',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full opacity-15 md:opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)',
            left: '20%',
            bottom: '-5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Foreground content layer */}
      <motion.div 
        className="relative z-20 text-center max-w-4xl mx-auto w-full"
        style={{ x: fgX, y: fgY }}
      >
        {/* Floating icons - hidden on small mobile */}
        <div className="absolute -top-16 md:-top-20 left-0 right-0 hidden sm:flex justify-center gap-12 md:gap-20 opacity-40 md:opacity-50">
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Music className="w-6 h-6 md:w-8 md:h-8 text-sekai-cyan" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Code className="w-6 h-6 md:w-8 md:h-8 text-sekai-purple" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-sekai-pink" />
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          className="w-20 md:w-32 h-1 mx-auto mb-6 md:mb-8 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ maxWidth: 128 }}
        >
          <motion.div
            className="w-full h-full bg-gradient-sekai"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="text-sekai-cyan text-xs md:text-sm lg:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 font-medium flex items-center justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="w-4 md:w-8 h-px bg-sekai-cyan" />
          <span className="whitespace-nowrap">Creator • Developer • Artist</span>
          <span className="w-4 md:w-8 h-px bg-sekai-cyan" />
        </motion.div>

        {/* Name with glitch effect on hover */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 md:mb-4 relative group cursor-default"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="relative inline-block">
            <span className="text-gradient relative z-10">Rodney Keilson</span>
            {/* Glitch layers - desktop only for performance */}
            <span 
              className="absolute inset-0 text-sekai-cyan opacity-0 group-hover:opacity-70 transition-opacity hidden md:block"
              style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-2px, 0)' }}
              aria-hidden="true"
            >
              Rodney Keilson
            </span>
            <span 
              className="absolute inset-0 text-sekai-pink opacity-0 group-hover:opacity-70 transition-opacity hidden md:block"
              style={{ clipPath: 'inset(40% 0 30% 0)', transform: 'translate(2px, 0)' }}
              aria-hidden="true"
            >
              Rodney Keilson
            </span>
          </span>
        </motion.h1>

        {/* Alias with special styling */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 flex items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-text-secondary text-lg md:text-2xl">aka</span>
          <motion.span 
            className="relative px-3 md:px-4 py-1"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10 text-sekai-pink font-bold">Rodenious</span>
            <motion.span
              className="absolute inset-0 rounded-lg opacity-20"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #9B5DE5)' }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.span>
        </motion.p>

        {/* Description with highlighted keywords */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Crafting digital experiences at the intersection of{' '}
          <motion.span 
            className="inline-block text-sekai-cyan font-semibold cursor-pointer"
            whileHover={{ scale: 1.1, textShadow: '0 0 20px #00D4AA' }}
          >
            technology
          </motion.span>,{' '}
          <motion.span 
            className="inline-block text-sekai-purple font-semibold cursor-pointer"
            whileHover={{ scale: 1.1, textShadow: '0 0 20px #9B5DE5' }}
          >
            creativity
          </motion.span>, and{' '}
          <motion.span 
            className="inline-block text-sekai-pink font-semibold cursor-pointer"
            whileHover={{ scale: 1.1, textShadow: '0 0 20px #FF6B9D' }}
          >
            passion
          </motion.span>.
        </motion.p>

        {/* Social links with creative hover */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            { icon: Github, href: 'https://github.com/rodneykeilson', color: 'cyan', label: 'GitHub' },
            { icon: Mail, href: 'mailto:keilsonrodney0710@gmail.com', color: 'pink', label: 'Email' },
            { icon: Linkedin, href: 'https://linkedin.com/in/rodneykeilson', color: 'purple', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, color, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative p-3 md:p-4 rounded-xl md:rounded-2xl glass border border-white/5"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className={`w-5 h-5 md:w-6 md:h-6 text-text-secondary group-hover:text-sekai-${color} transition-colors duration-300`} />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ 
                  background: color === 'cyan' ? 'radial-gradient(circle, rgba(0, 212, 170, 0.3), transparent)' :
                             color === 'pink' ? 'radial-gradient(circle, rgba(255, 107, 157, 0.3), transparent)' :
                             'radial-gradient(circle, rgba(155, 93, 229, 0.3), transparent)',
                  filter: 'blur(10px)',
                }}
              />
              
              {/* Label - hidden on mobile */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 font-semibold rounded-full overflow-hidden text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-sekai"
              animate={{ 
                background: [
                  'linear-gradient(135deg, #00D4AA, #9B5DE5, #FF6B9D)',
                  'linear-gradient(135deg, #FF6B9D, #00D4AA, #9B5DE5)',
                  'linear-gradient(135deg, #9B5DE5, #FF6B9D, #00D4AA)',
                  'linear-gradient(135deg, #00D4AA, #9B5DE5, #FF6B9D)',
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
            
            <span className="relative text-bg-primary z-10 font-bold">Explore My Work</span>
            <ChevronDown className="relative w-4 h-4 md:w-5 md:h-5 text-bg-primary z-10 group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-sekai-cyan"
            animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
