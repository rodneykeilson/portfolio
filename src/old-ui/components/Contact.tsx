import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { SekaiButton } from './SekaiButton';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">

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
            <Send className="w-4 h-4 text-[var(--color-sekai-purple)]" />
            <span className="text-sm text-[var(--color-text-secondary)] font-display tracking-wide uppercase">Contact</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto font-en">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.a
            href="mailto:keilsonrodney0710@gmail.com"
            className="group p-6 rounded-2xl sekai-card text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[var(--color-sekai-cyan)]/10 flex items-center justify-center">
              <Mail className="w-7 h-7 text-[var(--color-sekai-cyan)]" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-1 font-display">Email</h3>
            <p className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-sekai-cyan)] transition-colors font-en">
              keilsonrodney0710@gmail.com
            </p>
          </motion.a>

          <motion.a
            href="https://github.com/rodneykeilson"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl sekai-card sekai-card-pink text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[var(--color-sekai-pink)]/10 flex items-center justify-center">
              <Github className="w-7 h-7 text-[var(--color-sekai-pink)]" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-1 font-display">GitHub</h3>
            <p className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-sekai-pink)] transition-colors flex items-center justify-center gap-1 font-en">
              @rodneykeilson <ArrowUpRight className="w-3 h-3" />
            </p>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/rodneykeilson"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl sekai-card sekai-card-purple text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[var(--color-sekai-purple)]/10 flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-[var(--color-sekai-purple)]" />
            </div>
            <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-1 font-display">LinkedIn</h3>
            <p className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-sekai-purple)] transition-colors flex items-center justify-center gap-1 font-en">
              Connect with me <ArrowUpRight className="w-3 h-3" />
            </p>
          </motion.a>
        </div>

        {/* CTA - SEKAI button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SekaiButton
            japanese="Send Message"
            english=""
            variant="purple"
            onClick={() => window.location.href = 'mailto:keilsonrodney0710@gmail.com'}
          />
        </motion.div>
      </div>
    </section>
  );
}
