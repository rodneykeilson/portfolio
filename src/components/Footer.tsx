import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-sekai flex items-center justify-center font-bold text-bg-primary">
              R
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-text-primary">Rodenious</p>
              <p className="text-sm text-text-muted">
                © {currentYear} Rodney Keilson
              </p>
            </div>
          </div>

          {/* Made with love */}
          <motion.p
            className="flex items-center gap-2 text-sm text-text-muted"
            whileHover={{ scale: 1.05 }}
          >
            Made with{' '}
            <Heart className="w-4 h-4 text-sekai-pink fill-sekai-pink" /> and
            lots of code
          </motion.p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rodneykeilson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-sekai-cyan hover:bg-white/5 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rodneykeilson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-sekai-purple hover:bg-white/5 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:keilsonrodney0710@gmail.com"
              className="p-2 rounded-lg text-text-muted hover:text-sekai-pink hover:bg-white/5 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
