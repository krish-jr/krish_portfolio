import React, { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import Loader from './components/Loader/Loader';
import ShaderBackground from './components/Canvas3D/ShaderBackground';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import CurrentLearning from './components/CurrentLearning/CurrentLearning';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root>
      {/* Premium Loader Screen */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Main Content Reveal */}
      {!isLoading && (
        <>
          {/* Floating Glassy & Liquidglass Navbar */}
          <Navbar />

          {/* Global Premium Overlays */}
          <div className="noise-overlay"></div>
          <div className="grid-overlay"></div>
          <div className="radial-glow glow-1"></div>
          <div className="radial-glow glow-2"></div>

          {/* Interactive Sections */}
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <CurrentLearning />
          <Contact />
          <Footer />
        </>
      )}
    </ReactLenis>
  );
}

export default App;
