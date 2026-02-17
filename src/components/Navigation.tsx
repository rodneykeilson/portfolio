import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Navigation items (SEKAI style)
const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', '')).filter(Boolean);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
      if (window.scrollY < 200) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
              isScrolled ? 'glass-dark' : ''
            }`}
          >
            {/* Logo with Japanese flair */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-[var(--color-sekai-cyan)]/10 border border-[var(--color-sekai-cyan)]/30 flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-[var(--color-sekai-cyan)] text-lg relative z-10">R</span>
                {/* L-corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-sekai-cyan)] opacity-50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-sekai-cyan)] opacity-50" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-sekai-cyan)] transition-colors hidden sm:block">
                  Rodenious
                </span>
                <span className="text-[8px] font-en tracking-[0.15em] text-[var(--color-text-muted)] uppercase hidden sm:block">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = (item.href === '#' && activeSection === '') || 
                                 item.href === `#${activeSection}`;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group relative flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'text-[var(--color-sekai-cyan)]' 
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    } hover:bg-white/5`}
                  >
                    <span className="font-display text-sm font-medium tracking-wide uppercase">
                      {item.name}
                    </span>
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-[var(--color-sekai-cyan)] rounded-full"
                        layoutId="navActiveIndicator"
                        style={{ x: '-50%' }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors border border-[var(--color-glass-border)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[var(--color-bg-void)]/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content - SEKAI card style */}
            <motion.div
              className="absolute top-24 left-4 right-4 p-6 rounded-2xl sekai-card"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = (item.href === '#' && activeSection === '') || 
                                   item.href === `#${activeSection}`;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-[var(--color-sekai-cyan)]/10 border border-[var(--color-sekai-cyan)]/30' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex flex-col">
                        <span className={`font-display text-lg font-medium uppercase tracking-wide ${isActive ? 'text-[var(--color-sekai-cyan)]' : 'text-[var(--color-text-primary)]'}`}>
                          {item.name}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-[var(--color-sekai-cyan)] rotate-45" />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
