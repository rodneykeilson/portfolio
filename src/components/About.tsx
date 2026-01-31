import { motion } from 'framer-motion';
import { User, MapPin, Heart, Music } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
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
            <User className="w-4 h-4 text-sekai-pink" />
            <span className="text-sm text-text-secondary">Get to Know Me</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
        </motion.div>

        {/* Content card */}
        <motion.div
          className="relative p-8 md:p-12 rounded-3xl glass border border-white/5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sekai-cyan via-sekai-purple to-sekai-pink opacity-10 blur-xl" />

          <div className="relative z-10">
            {/* Main bio */}
            <div className="mb-10">
              <motion.p
                className="text-xl md:text-2xl text-text-primary leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hey there! I'm{' '}
                <span className="text-gradient font-bold">Rodney Keilson</span>, but you might
                know me as{' '}
                <span className="text-sekai-pink font-semibold">Rodenious</span> online.
              </motion.p>

              <motion.p
                className="text-lg text-text-secondary leading-relaxed mb-6"
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
                className="text-lg text-text-secondary leading-relaxed"
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
                className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <MapPin className="w-5 h-5 text-sekai-cyan mb-3" />
                <h4 className="font-semibold text-text-primary mb-1">Based In</h4>
                <p className="text-sm text-text-muted">Indonesia</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ y: -4 }}
              >
                <Heart className="w-5 h-5 text-sekai-pink mb-3" />
                <h4 className="font-semibold text-text-primary mb-1">Interests</h4>
                <p className="text-sm text-text-muted">ML, Mobile Dev, Games</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileHover={{ y: -4 }}
              >
                <Music className="w-5 h-5 text-sekai-purple mb-3" />
                <h4 className="font-semibold text-text-primary mb-1">Fun Fact</h4>
                <p className="text-sm text-text-muted">Project Sekai Enthusiast</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
