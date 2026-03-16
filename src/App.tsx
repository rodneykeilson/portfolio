import { Github, Code, Database } from 'lucide-react';
import { projects, privateProjects, categoryLabels } from './data/projects';

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#ff4f9a] selection:text-white pb-8">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0b0b0f]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-bold text-xl tracking-tight hover:text-[#ff4f9a] transition-colors">
            RK<span className="text-[#ff4f9a]">.</span>
          </a>
          <div className="flex gap-6 text-sm font-medium tracking-wide">
            <a href="#projects" className="text-[#a1a1aa] hover:text-[#ffb6d5] transition-colors">Projects</a>
            <a href="#about" className="text-[#a1a1aa] hover:text-[#ffb6d5] transition-colors">About</a>
            <a href="#contact" className="text-[#a1a1aa] hover:text-[#ffb6d5] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col justify-center min-h-[70vh]">
        <p className="text-[#ff4f9a] font-medium tracking-wide mb-4 text-sm font-mono">Hi, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Rodney Keilson.<br />
          <span className="text-[#a1a1aa]">I build digital experiences.</span>
        </h1>
        <p className="max-w-2xl text-[#a1a1aa] text-lg leading-relaxed mb-10">
          I'm a software engineer specializing in building sophisticated, scalable solutions 
          with a focus on modern web technologies and performance. Passionate about 
          creative problem-solving through clean, precise code.
        </p>
        <div className="flex items-center gap-4">
          <a href="#projects" className="bg-[#ff4f9a] text-white px-6 py-3 rounded-md font-medium hover:bg-[#ffb6d5] hover:text-[#0b0b0f] transition-colors">
            Check out my work!
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-[#000000]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-[#ff4f9a] font-mono text-xl">01.</span> Featured Projects
            <div className="h-px bg-gray-800 flex-1 ml-4" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-[#16161a] border border-gray-800 p-6 rounded-lg hover:border-[#ffb6d5]/50 transition-colors group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#ff4f9a] text-xs font-mono uppercase tracking-wider">
                    {categoryLabels[project.category as keyof typeof categoryLabels] || 'Project'}
                  </span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#ff4f9a] transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ffb6d5] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm mb-6 flex-1 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs text-gray-400 font-mono tracking-tight">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mt-24 mb-8 flex items-center gap-4">
            Other Noteworthy Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateProjects.map((project, idx) => (
              <div key={idx} className="bg-[#0b0b0f] border border-gray-800 p-6 rounded-lg opacity-80 hover:opacity-100 transition-opacity flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[#ff4f9a] text-xs font-mono uppercase tracking-wider">
                    {categoryLabels[project.category as keyof typeof categoryLabels] || 'Confidential'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm flex-1">
                  {project.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About & Skills */}
      <section id="about" className="py-24 px-6 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-[#ff4f9a] font-mono text-xl">02.</span> About Me
              <div className="h-px bg-gray-800 flex-1 ml-4 lg:hidden" />
            </h2>
            <div className="space-y-4 text-[#a1a1aa] leading-relaxed text-lg">
              <p>
                Hello! I'm Rodney, a Software Engineer heavily focused on creating
                efficient, reliable, and immersive digital experiences. My journey 
                began with a deep curiosity for how things work under the hood, 
                eventually leading me to dive head-first into modern full-stack development, 
                mobile apps, and machine learning infrastructure.
              </p>
              <p>
                I thrive in environments that challenge me to solve complex problems 
                while maintaining a clean, scalable architecture and pixel-perfect design.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0b0b0f] mb-8 select-none hidden lg:block">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
               <div className="border border-gray-800 bg-[#16161a] p-5 rounded-md hover:border-[#ff4f9a]/30 transition-colors">
                 <Code className="w-6 h-6 text-[#ff4f9a] mb-3" />
                 <h4 className="text-white font-semibold mb-2">Frontend</h4>
                 <ul className="text-sm font-mono text-[#a1a1aa] space-y-1">
                    <li>React & React Native</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Jetpack Compose</li>
                 </ul>
               </div>
               <div className="border border-gray-800 bg-[#16161a] p-5 rounded-md hover:border-[#ff4f9a]/30 transition-colors">
                 <Database className="w-6 h-6 text-[#ff4f9a] mb-3" />
                 <h4 className="text-white font-semibold mb-2">Backend & ML</h4>
                 <ul className="text-sm font-mono text-[#a1a1aa] space-y-1">
                    <li>Python</li>
                    <li>Node.js</li>
                    <li>PyTorch</li>
                    <li>PostgreSQL</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-[#000000] text-center border-t border-gray-900 border-b border-b-gray-900">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <p className="text-[#ff4f9a] font-mono mb-4 text-sm">03. What's Next?</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h3>
          <p className="text-[#a1a1aa] mb-10 leading-relaxed text-lg">
            I'm currently looking for new opportunities and my inbox is always open. 
            Whether you have a question, an opportunity, or just want to engineer something cool — I'll try my best to get back to you!
          </p>
          <a href="mailto:keilsonrodney0710@gmail.com" className="inline-block border border-[#ff4f9a] text-[#ff4f9a] hover:bg-[#ff4f9a]/10 px-8 py-4 rounded-md transition-colors font-medium tracking-wide">
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0b0b0f] text-center">
        <p className="text-[#a1a1aa] font-mono text-sm group">
          <a href="https://github.com/rodneykeilson" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4f9a] transition-colors">
            Designed & Built by Rodney Keilson
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
