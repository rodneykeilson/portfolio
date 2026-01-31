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
    gradient: 'from-sekai-cyan/20 to-sekai-cyan/5',
    border: 'border-sekai-cyan/30',
    text: 'text-sekai-cyan',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,212,170,0.15)]',
    pill: 'bg-sekai-cyan/10 hover:bg-sekai-cyan/20 border-sekai-cyan/20',
  },
  pink: {
    gradient: 'from-sekai-pink/20 to-sekai-pink/5',
    border: 'border-sekai-pink/30',
    text: 'text-sekai-pink',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,107,157,0.15)]',
    pill: 'bg-sekai-pink/10 hover:bg-sekai-pink/20 border-sekai-pink/20',
  },
  purple: {
    gradient: 'from-sekai-purple/20 to-sekai-purple/5',
    border: 'border-sekai-purple/30',
    text: 'text-sekai-purple',
    glow: 'group-hover:shadow-[0_0_30px_rgba(155,93,229,0.15)]',
    pill: 'bg-sekai-purple/10 hover:bg-sekai-purple/20 border-sekai-purple/20',
  },
  blue: {
    gradient: 'from-sekai-blue/20 to-sekai-blue/5',
    border: 'border-sekai-blue/30',
    text: 'text-sekai-blue',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,180,216,0.15)]',
    pill: 'bg-sekai-blue/10 hover:bg-sekai-blue/20 border-sekai-blue/20',
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)',
            left: '-15%',
            top: '20%',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)',
            right: '-10%',
            bottom: '10%',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
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
            <Code2 className="w-4 h-4 text-sekai-cyan" />
            <span className="text-sm text-text-secondary">Technical Arsenal</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
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
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${styles.gradient} border ${styles.border} transition-all duration-500 ${styles.glow}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-bg-elevated`}>
                    <Sparkles className={`w-5 h-5 ${styles.text}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${styles.text}`}>
                    {category.name}
                  </h3>
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill.name}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${styles.pill} text-text-primary transition-all duration-300 cursor-default`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative element */}
                <div
                  className="absolute -top-1 -right-1 w-16 h-16 opacity-20 blur-xl"
                  style={{
                    background:
                      category.color === 'cyan'
                        ? '#00D4AA'
                        : category.color === 'pink'
                        ? '#FF6B9D'
                        : category.color === 'purple'
                        ? '#9B5DE5'
                        : '#00B4D8',
                  }}
                />
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
          <p className="text-text-muted">
            Always exploring new technologies and pushing creative boundaries.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
