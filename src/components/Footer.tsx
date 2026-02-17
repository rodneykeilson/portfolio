import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-[var(--color-glass-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-xl bg-[var(--color-sekai-cyan)]/10 border border-[var(--color-sekai-cyan)]/30 flex items-center justify-center">
              <span className="font-display font-bold text-[var(--color-sekai-cyan)]">R</span>
              {/* L-corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-sekai-cyan)] opacity-50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-sekai-cyan)] opacity-50" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-[var(--color-text-primary)] font-display">Rodenious</p>
              <p className="text-xs text-[var(--color-text-muted)] font-en">
                © {currentYear} Rodney Keilson
              </p>
            </div>
          </div>

          {/* Made with love */}
          <div className="flex flex-col items-center gap-1">
            <p className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-en">
              Made with{' '}
              <Heart className="w-4 h-4 text-[var(--color-sekai-pink)] fill-[var(--color-sekai-pink)]" /> and
              lots of code
            </p>
            <p className="text-[9px] text-[var(--color-text-muted)] font-en tracking-wider uppercase opacity-60">
              Crafted with care
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rodneykeilson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-sekai-cyan)] hover:bg-white/5 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rodneykeilson"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-sekai-purple)] hover:bg-white/5 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:keilsonrodney0710@gmail.com"
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-sekai-pink)] hover:bg-white/5 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
