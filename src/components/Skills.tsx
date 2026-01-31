import { motion } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

interface SkillCategory {
  name: string;
  color: 'cyan' | 'pink' | 'purple' | 'blue';
  skills: Skill[];
}

interface Skill {
  name: string;
  icon?: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    color: 'cyan',
    skills: [
      { name: 'Python' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Kotlin' },
      { name: 'C#' },
      { name: 'C++' },
      { name: 'Dart' },
      { name: 'SQL' },
    ],
  },
  {
    name: 'Frontend',
    color: 'pink',
    skills: [
      { name: 'React' },
      { name: 'React Native' },
      { name: 'Next.js' },
      { name: 'Jetpack Compose' },
      { name: 'TailwindCSS' },
      { name: 'Framer Motion' },
      { name: 'HTML5/CSS3' },
    ],
  },
  {
    name: 'Backend & ML',
    color: 'purple',
    skills: [
      { name: 'PyTorch' },
      { name: 'HuggingFace' },
      { name: 'Express.js' },
      { name: 'Node.js' },
      { name: 'Firebase' },
      { name: 'REST APIs' },
      { name: 'Pandas' },
    ],
  },
  {
    name: 'Tools & Platforms',
    color: 'blue',
    skills: [
      { name: 'Git' },
      { name: 'Unity' },
      { name: 'Android Studio' },
      { name: 'VS Code' },
      { name: 'Figma' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
    ],
  },
];

const colorStyles = {
  cyan: {
    gradient: 'from-[var(--color-sekai-cyan)]/20 to-[var(--color-sekai-cyan)]/5',
    border: 'border-[var(--color-sekai-cyan)]/30',
    text: 'text-[var(--color-sekai-cyan)]',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,212,170,0.15)]',
    pill: 'bg-[var(--color-sekai-cyan)]/10 hover:bg-[var(--color-sekai-cyan)]/20 border-[var(--color-sekai-cyan)]/20',
  },
  pink: {
    gradient: 'from-[var(--color-sekai-pink)]/20 to-[var(--color-sekai-pink)]/5',
    border: 'border-[var(--color-sekai-pink)]/30',
    text: 'text-[var(--color-sekai-pink)]',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,107,157,0.15)]',
    pill: 'bg-[var(--color-sekai-pink)]/10 hover:bg-[var(--color-sekai-pink)]/20 border-[var(--color-sekai-pink)]/20',
  },
  purple: {
    gradient: 'from-[var(--color-sekai-purple)]/20 to-[var(--color-sekai-purple)]/5',
    border: 'border-[var(--color-sekai-purple)]/30',
    text: 'text-[var(--color-sekai-purple)]',
    glow: 'group-hover:shadow-[0_0_30px_rgba(155,93,229,0.15)]',
    pill: 'bg-[var(--color-sekai-purple)]/10 hover:bg-[var(--color-sekai-purple)]/20 border-[var(--color-sekai-purple)]/20',
  },
  blue: {
    gradient: 'from-[var(--color-sekai-blue)]/20 to-[var(--color-sekai-blue)]/5',
    border: 'border-[var(--color-sekai-blue)]/30',
    text: 'text-[var(--color-sekai-blue)]',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,180,216,0.15)]',
    pill: 'bg-[var(--color-sekai-blue)]/10 hover:bg-[var(--color-sekai-blue)]/20 border-[var(--color-sekai-blue)]/20',
  },
};

// Japanese category names
const categoryNamesJp: Record<string, string> = {
  'Languages': 'プログラミング言語',
  'Frontend': 'フロントエンド',
  'Backend & ML': 'バックエンド・機械学習',
  'Tools & Platforms': 'ツール・プラットフォーム',
};

export function Skills() {
  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
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
            <Code2 className="w-4 h-4 text-[var(--color-sekai-cyan)]" />
            <span className="text-sm text-[var(--color-text-secondary)] font-jp">技術スタック</span>
            <span className="text-[9px] text-[var(--color-text-muted)] font-en tracking-wider uppercase">TECH STACK</span>
          </motion.div>
          
          {/* Japanese title */}
          <h2 className="font-jp text-lg text-[var(--color-sekai-cyan)] tracking-wider mb-2">
            スキル・技術
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto font-jp">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const styles = colorStyles[category.color];

            return (
              <motion.div
                key={category.name}
                className="group relative p-6 rounded-2xl sekai-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {/* Category header with Japanese */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-[var(--color-bg-elevated)]`}>
                    <Sparkles className={`w-5 h-5 ${styles.text}`} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className={`text-lg font-bold font-display ${styles.text}`}>
                      {category.name}
                    </h3>
                    <span className="text-[9px] font-en tracking-wider text-[var(--color-text-muted)] uppercase">
                      {categoryNamesJp[category.name]}
                    </span>
                  </div>
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill.name}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${styles.pill} text-[var(--color-text-primary)] transition-all duration-300 cursor-default font-jp`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Additional interests */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[var(--color-text-muted)] font-jp">
            Always exploring new technologies and pushing creative boundaries.
          </p>
          <p className="text-[10px] font-en tracking-wider text-[var(--color-text-muted)] uppercase mt-1 opacity-60">
            常に新しい技術を探求し、創造性の限界に挑戦しています
          </p>
        </motion.div>
      </div>
    </section>
  );
}
