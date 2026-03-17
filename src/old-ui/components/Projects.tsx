import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Layers, Smartphone, Globe, Gamepad2, Bot, Sparkles } from 'lucide-react';
import { projects, categoryLabels } from '../data/projects';

const categoryIcons = {
  ml: Bot,
  mobile: Smartphone,
  web: Globe,
  game: Gamepad2,
  tool: Layers,
};

const colorClasses = {
  cyan: {
    border: 'hover:border-[var(--color-sekai-cyan)]/50',
    glow: 'group-hover:glow-cyan',
    text: 'text-[var(--color-sekai-cyan)]',
    bg: 'bg-[var(--color-sekai-cyan)]/10',
    borderColor: 'var(--color-sekai-cyan)',
  },
  pink: {
    border: 'hover:border-[var(--color-sekai-pink)]/50',
    glow: 'group-hover:glow-pink',
    text: 'text-[var(--color-sekai-pink)]',
    bg: 'bg-[var(--color-sekai-pink)]/10',
    borderColor: 'var(--color-sekai-pink)',
  },
  purple: {
    border: 'hover:border-[var(--color-sekai-purple)]/50',
    glow: 'group-hover:glow-purple',
    text: 'text-[var(--color-sekai-purple)]',
    bg: 'bg-[var(--color-sekai-purple)]/10',
    borderColor: 'var(--color-sekai-purple)',
  },
};

function ProjectScreenshotShowcase({
  screenshots,
  projectTitle,
  accentClass,
  compact = false,
}: {
  screenshots: string[];
  projectTitle: string;
  accentClass: string;
  compact?: boolean;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || screenshots.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % screenshots.length);
    }, 1200);

    return () => window.clearInterval(interval);
  }, [isHovered, screenshots.length]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 ${compact ? 'h-20 w-28' : 'h-44 w-full'} mb-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={`${projectTitle}-${activeSlide}`}
          src={screenshots[activeSlide]}
          alt={`${projectTitle} preview ${activeSlide + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <motion.div
        className={`absolute top-2 right-2 w-2 h-2 rotate-45 ${accentClass}`}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-[10px] font-en tracking-wider uppercase text-white/85">Preview</span>
        <div className="flex items-center gap-1">
          {screenshots.map((_, index) => (
            <span
              key={`${projectTitle}-dot-${index}`}
              className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 px-4 relative">
      {/* Section background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)',
            right: '-20%',
            top: '10%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header - SEKAI style */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-[var(--color-sekai-yellow)]" />
            <span className="text-sm text-[var(--color-text-secondary)] font-display tracking-wide uppercase">Featured Work</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto font-en">
            A collection of my work spanning machine learning, mobile development, web applications, and creative tools.
          </p>
        </motion.div>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => {
            const IconComponent = categoryIcons[project.category];
            const colors = colorClasses[project.color];

            return (
              <motion.article
                key={project.title}
                className="group relative p-6 rounded-2xl sekai-card hover-lift kira-corners"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Sparkle decoration on hover */}
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className={`w-4 h-4 ${colors.text}`} />
                </motion.div>

                <ProjectScreenshotShowcase
                  screenshots={project.screenshots}
                  projectTitle={project.title}
                  accentClass={colors.bg}
                />

                {/* Category badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} mb-4`}>
                  <IconComponent className={`w-3.5 h-3.5 ${colors.text}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>
                    {categoryLabels[project.category]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-gradient transition-all duration-300 font-display">
                  {project.title}
                </h3>

                {/* Short description */}
                <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                  {project.description}
                </p>

                {/* Long description */}
                <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed">
                  {project.longDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-glass-border)] hover:border-[var(--color-sekai-cyan)]/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline transition-colors`}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  style={{
                    background: `radial-gradient(circle at top right, ${
                      project.color === 'cyan' ? '#00D4AA' : project.color === 'pink' ? '#FF6B9D' : '#9B5DE5'
                    }, transparent 70%)`,
                  }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Other projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center font-display">
            <span className="text-[var(--color-text-secondary)]">More</span>{' '}
            <span className="text-gradient">Projects</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => {
              const IconComponent = categoryIcons[project.category];
              const colors = colorClasses[project.color];

              return (
                <motion.a
                  key={project.title}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[var(--color-glass-border-hover)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectScreenshotShowcase
                    screenshots={project.screenshots}
                    projectTitle={project.title}
                    accentClass={colors.bg}
                    compact
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-gradient transition-all truncate font-display">
                        {project.title}
                      </h4>
                      <IconComponent className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] truncate">
                      {project.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors flex-shrink-0" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* View all on GitHub - SEKAI button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://github.com/rodneykeilson?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            <span className="font-display tracking-wide uppercase">View All Repositories</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
