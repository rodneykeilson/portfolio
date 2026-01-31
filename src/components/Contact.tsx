import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-full opacity-5"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, #9B5DE5 50%, transparent 100%)',
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
            <Send className="w-4 h-4 text-sekai-purple" />
            <span className="text-sm text-text-secondary">Let's Connect</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.a
            href="mailto:keilsonrodney0710@gmail.com"
            className="group p-6 rounded-2xl glass border border-white/5 hover:border-sekai-cyan/50 transition-all duration-500 hover:glow-cyan text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-sekai-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-7 h-7 text-sekai-cyan" />
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2">Email</h3>
            <p className="text-sm text-text-muted group-hover:text-sekai-cyan transition-colors">
              keilsonrodney0710@gmail.com
            </p>
          </motion.a>

          <motion.a
            href="https://github.com/rodneykeilson"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl glass border border-white/5 hover:border-sekai-pink/50 transition-all duration-500 hover:glow-pink text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-sekai-pink/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Github className="w-7 h-7 text-sekai-pink" />
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2">GitHub</h3>
            <p className="text-sm text-text-muted group-hover:text-sekai-pink transition-colors flex items-center justify-center gap-1">
              @rodneykeilson <ArrowUpRight className="w-3 h-3" />
            </p>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/rodneykeilson"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl glass border border-white/5 hover:border-sekai-purple/50 transition-all duration-500 hover:glow-purple text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-sekai-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-7 h-7 text-sekai-purple" />
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2">LinkedIn</h3>
            <p className="text-sm text-text-muted group-hover:text-sekai-purple transition-colors flex items-center justify-center gap-1">
              Connect with me <ArrowUpRight className="w-3 h-3" />
            </p>
          </motion.a>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:keilsonrodney0710@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-sekai text-bg-primary font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Send Me a Message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
