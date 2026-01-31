import { ParticleCanvas } from './components/ParticleCanvas';
import { RhythmVisualization } from './components/RhythmVisualization';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* Background rhythm lane visualization */}
      <RhythmVisualization />
      
      {/* Particle effect layer */}
      <ParticleCanvas />

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
    </div>
  );
}

export default App;
