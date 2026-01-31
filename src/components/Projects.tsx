import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Layers, Smartphone, Globe, Gamepad2, Bot, Lock, Sparkles } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  category: 'ml' | 'mobile' | 'web' | 'game' | 'tool';
  featured?: boolean;
  color: 'cyan' | 'pink' | 'purple';
}

interface PrivateProject {
  title: string;
  description: string;
  category: 'ml' | 'mobile' | 'web' | 'game' | 'tool';
  color: 'cyan' | 'pink' | 'purple';
}

const projects: Project[] = [
  {
    title: 'ToxiScope',
    description: 'Multilabel Toxic Comment Detection',
    longDescription: 'Efficient Transformer-Based Multilabel Toxic Comment Detection for Gaming Communities. Features BERT-tiny fine-tuned with Focal Loss for CPU inference achieving 0.817 Macro-F1.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'React Native', 'TypeScript'],
    github: 'https://github.com/rodneykeilson/ToxiScope',
    category: 'ml',
    featured: true,
    color: 'cyan',
  },
  {
    title: 'SmuleRod',
    description: 'Smule Video Downloader for Android',
    longDescription: 'A minimalist, WCAG AAA compliant Android app to download Smule videos with built-in player, WebView-based extraction to bypass Cloudflare protection.',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Media3', 'OkHttp'],
    github: 'https://github.com/rodneykeilson/SmuleRod',
    category: 'mobile',
    featured: true,
    color: 'pink',
  },
  {
    title: 'MikuMikuWorldEX',
    description: 'Universal Chart Editor Fork',
    longDescription: 'Extended fork of MikuMikuWorld4CC, a universal rhythm game chart editor. Features enhanced preview system with official in-game particle effects.',
    tech: ['C++', 'OpenGL', 'ImGui', 'GLFW'],
    github: 'https://github.com/rodneykeilson/MikuMikuWorldEX',
    category: 'tool',
    featured: true,
    color: 'purple',
  },
  {
    title: 'ScrapiReddit',
    description: 'Zero-Auth Reddit Scraping Toolkit',
    longDescription: 'Complete Reddit scraper without API keys. Features pagination, comment harvesting, media archiving, and CSV exports with resilient caching.',
    tech: ['Python', 'Requests', 'TOML', 'CLI'],
    github: 'https://github.com/rodneykeilson/ScrapiReddit',
    category: 'tool',
    color: 'cyan',
  },
  {
    title: 'Commulyzer',
    description: 'Community Discussion Analyzer',
    longDescription: 'Collects Reddit community discussions, normalizes raw data, and produces rule-based toxicity labels for downstream ML analysis.',
    tech: ['Python', 'Pandas', 'Regex', 'Data Pipeline'],
    github: 'https://github.com/rodneykeilson/Commulyzer',
    category: 'tool',
    color: 'pink',
  },
  {
    title: 'Plagiarism Split Checker',
    description: 'Smart Document Plagiarism Analysis',
    longDescription: 'React app that splits large documents into manageable chunks for plagiarism checking with weighted average calculations.',
    tech: ['React', 'TypeScript', 'PDF.js', 'TailwindCSS'],
    github: 'https://github.com/rodneykeilson/plagiarism-split-checker',
    category: 'web',
    color: 'purple',
  },
  {
    title: 'EverdrivenDays',
    description: 'Unity Game Project',
    longDescription: 'A small project made with the purpose of familiarizing oneself with Unity game development.',
    tech: ['Unity', 'C#', 'Game Development'],
    github: 'https://github.com/rodneykeilson/EverdrivenDays',
    category: 'game',
    color: 'cyan',
  },
];

// Private projects - showcased without revealing names
const privateProjects: PrivateProject[] = [
  {
    title: 'Private Project #1',
    description: 'Rhythm game utilities and tools suite with real-time data integration',
    category: 'tool',
    color: 'cyan',
  },
  {
    title: 'Private Project #2',
    description: 'Full-stack B2B company website with product catalog and admin dashboard',
    category: 'web',
    color: 'pink',
  },
  {
    title: 'Private Project #3',
    description: 'Interactive browser-based game with multiplayer support',
    category: 'game',
    color: 'purple',
  },
  {
    title: 'Private Project #4',
    description: 'Autonomous AI character battles designed for short-form content creation',
    category: 'game',
    color: 'cyan',
  },
  {
    title: 'Private Project #5',
    description: 'Personal automation and AI-powered assistant project',
    category: 'ml',
    color: 'pink',
  },
  {
    title: 'Private Project #6',
    description: 'Specialized data extraction tools for game assets and metadata',
    category: 'tool',
    color: 'purple',
  },
];

const categoryIcons = {
  ml: Bot,
  mobile: Smartphone,
  web: Globe,
  game: Gamepad2,
  tool: Layers,
};

const categoryLabels = {
  ml: 'Machine Learning',
  mobile: 'Mobile',
  web: 'Web',
  game: 'Game',
  tool: 'Tool',
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
        {/* Section header - SEKAI style with Japanese */}
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
            <span className="text-sm text-[var(--color-text-secondary)] font-jp">注目作品</span>
            <span className="text-[9px] text-[var(--color-text-muted)] font-en tracking-wider uppercase">FEATURED</span>
          </motion.div>
          
          {/* Japanese title */}
          <h2 className="font-jp text-lg text-[var(--color-sekai-cyan)] tracking-wider mb-2">
            プロジェクト
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto font-jp">
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
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <IconComponent className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-gradient transition-all truncate font-display">
                      {project.title}
                    </h4>
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

        {/* Private Projects Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Lock className="w-4 h-4 text-[var(--color-sekai-purple)]" />
              <span className="text-sm text-[var(--color-text-secondary)] font-jp">非公開作品</span>
              <span className="text-[9px] text-[var(--color-text-muted)] font-en tracking-wider uppercase">PRIVATE</span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 font-display">
              <span className="text-gradient">Behind the Scenes</span>
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              A glimpse into proprietary projects and client work. Details are kept confidential, but here's what I've been building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {privateProjects.map((project, index) => {
              const IconComponent = categoryIcons[project.category];
              const colors = colorClasses[project.color];

              return (
                <motion.div
                  key={project.title}
                  className="group relative p-5 rounded-xl sekai-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colors.bg} flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[var(--color-text-primary)] truncate font-display">
                          {project.title}
                        </h4>
                        <Lock className="w-3 h-3 text-[var(--color-text-muted)] flex-shrink-0" />
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-[var(--color-text-muted)] text-sm mt-8 font-jp">
            <Sparkles className="w-4 h-4 inline-block mr-1 text-[var(--color-sekai-yellow)]" />
            Interested in similar work? <a href="#contact" className="text-[var(--color-sekai-cyan)] hover:underline">Let's talk</a>
          </p>
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
            <span className="font-jp">すべて見る</span>
            <span className="text-[9px] font-en tracking-wider uppercase opacity-70">VIEW ALL</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
