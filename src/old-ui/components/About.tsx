import { motion } from 'framer-motion';
import { User, MapPin, Heart, Music } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header - SEKAI style */}
        <motion.div
          className="text-center mb-16"
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
            <User className="w-4 h-4 text-[var(--color-sekai-pink)]" />
            <span className="text-sm text-[var(--color-text-secondary)] font-jp">自己紹介</span>
            <span className="text-[9px] text-[var(--color-text-muted)] font-en tracking-wider uppercase">PROFILE</span>
          </motion.div>
          
          {/* Japanese title */}
          <h2 className="font-jp text-lg text-[var(--color-sekai-pink)] tracking-wider mb-2">
            プロフィール
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-pink">About Me</span>
          </h2>
        </motion.div>

        {/* Content card */}
        <motion.div
          className="relative p-8 md:p-12 rounded-3xl sekai-card sekai-card-pink"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

          <div className="relative z-10">
            {/* Main bio */}
            <div className="mb-10">
              <motion.p
                className="text-xl md:text-2xl text-[var(--color-text-primary)] leading-relaxed mb-6 font-jp"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hey there! I'm{' '}
                <span className="text-gradient font-bold">Rodney Keilson</span>, but you might
                know me as{' '}
                <span className="text-[var(--color-sekai-pink)] font-semibold">ロデニアス (Rodenious)</span> online.
              </motion.p>

              <motion.p
                className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 font-jp"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'm a passionate developer who loves building things that make a difference.
                From machine learning models that detect toxicity in gaming communities to
                mobile apps that solve everyday problems, I enjoy tackling diverse challenges
                across the tech stack.
              </motion.p>

              <motion.p
                className="text-lg text-[var(--color-text-secondary)] leading-relaxed font-jp"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Currently sharpening my skills to create useful, impactful software. I believe
                in writing clean, maintainable code and creating user experiences that feel
                intuitive and delightful.
              </motion.p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="p-4 rounded-xl glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <MapPin className="w-5 h-5 text-[var(--color-sekai-cyan)] mb-3" />
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 font-display">Based In</h4>
                <p className="text-xs font-jp text-[var(--color-text-muted)] mb-1">インドネシア</p>
                <p className="text-sm text-[var(--color-text-secondary)] font-en">Indonesia</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Heart className="w-5 h-5 text-[var(--color-sekai-pink)] mb-3" />
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 font-display">Interests</h4>
                <p className="text-xs font-jp text-[var(--color-text-muted)] mb-1">機械学習・モバイル開発</p>
                <p className="text-sm text-[var(--color-text-secondary)] font-en">ML, Mobile Dev, Games</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Music className="w-5 h-5 text-[var(--color-sekai-purple)] mb-3" />
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 font-display">Fun Fact</h4>
                <p className="text-xs font-jp text-[var(--color-text-muted)] mb-1">プロセカ大好き！</p>
                <p className="text-sm text-[var(--color-text-secondary)] font-en">Project Sekai Enthusiast</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
