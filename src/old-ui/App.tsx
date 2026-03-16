import { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { RhythmVisualization } from './components/RhythmVisualization';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SekaiGameMode } from './components/SekaiGameMode';
import { SekaiSparkles, FloatingKira } from './components/SekaiSparkles';
import { SekaiAmbientEffects } from './components/SekaiAmbientEffects';

function App() {
  const [useGameMode, setUseGameMode] = useState(true);

  // Game mode - React + Framer Motion SEKAI experience
  if (useGameMode) {
    return (
      <>
        <SekaiGameMode />
        <button
          onClick={() => setUseGameMode(false)}
          className="fixed bottom-4 right-4 z-[200] px-4 py-2 bg-[#00D4AA]/20 border border-[#00D4AA]/50 rounded-full text-xs text-[#00D4AA] hover:bg-[#00D4AA]/30 transition-colors backdrop-blur-sm"
        >
          Classic Mode
        </button>
      </>
    );
  }

  // Classic mode - traditional scroll portfolio with enhanced effects
  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* Ambient effects layer - holographic overlays, light rays */}
      <SekaiAmbientEffects />
      
      {/* Background rhythm lane visualization */}
      <RhythmVisualization />
      
      {/* Particle effect layer */}
      <ParticleCanvas />
      
      {/* Floating kira sparkles */}
      <FloatingKira />
      
      {/* Random sparkle bursts */}
      <SekaiSparkles />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-20">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mode toggle button */}
      <button
        onClick={() => setUseGameMode(true)}
        className="fixed bottom-4 right-4 z-[200] px-4 py-2 bg-[#00D4AA]/20 border border-[#00D4AA]/50 rounded-full text-xs text-[#00D4AA] hover:bg-[#00D4AA]/30 transition-colors"
      >
        Game Mode
      </button>
    </div>
  );
}

export default App;
