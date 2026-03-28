import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './App.css';

// Pages
import Home from './pages/Home';
import Article from './pages/Article';
import Projects from './pages/Projects';
import Tags from './pages/Tags';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Components
import ReadingProgress from './components/ReadingProgress';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll with faster, more responsive settings
    lenisRef.current = new Lenis({
      duration: 0.6, // Reduced from 1.2 for faster response
      easing: (t) => t, // Linear easing for more direct feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Reduced from 2 for less sensitivity
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-tech-bg">
        {/* Reading Progress Bar */}
        <ReadingProgress />

        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tag" element={<Tags />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
