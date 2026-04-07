import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import Header from './sections/Header';
import Footer from './sections/Footer';
import ReadingProgress from './components/ReadingProgress';
import BackToTop from './components/BackToTop';
import MobileMenu from './components/MobileMenu';
import Lightbox from './components/Lightbox';
import KeyboardShortcuts from './components/KeyboardShortcuts';

import Home from './pages/Home';
import Article from './pages/Article';
import Projects from './pages/Projects';
import Tags from './pages/Tags';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '', caption: '' });

  useEffect(() => {
    const handleOpenLightbox = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLightbox({ isOpen: true, src: detail.src, alt: detail.alt, caption: detail.caption || '' });
    };
    window.addEventListener('openLightbox', handleOpenLightbox);
    return () => window.removeEventListener('openLightbox', handleOpenLightbox);
  }, []);

  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'g' && !e.ctrlKey && !e.metaKey) {
        const timeout = setTimeout(() => {
          window.removeEventListener('keyup', handleGKey);
        }, 500);
        
        const handleGKey = (e: KeyboardEvent) => {
          clearTimeout(timeout);
          if (e.key === 'h') {
            window.location.href = '/';
          } else if (e.key === 't') {
            window.location.href = '/tags';
          } else if (e.key === 'p') {
            window.location.href = '/projects';
          } else if (e.key === 'a') {
            window.location.href = '/about';
          }
        };
        
        window.addEventListener('keyup', handleGKey);
      }
    };
    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, []);

  return (
    <Router>
      <ReadingProgress />
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <BackToTop />
      <KeyboardShortcuts />
      <div className="min-h-screen bg-deep-olive">
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
      <Footer />
      <Lightbox 
        isOpen={lightbox.isOpen} 
        src={lightbox.src} 
        alt={lightbox.alt} 
        caption={lightbox.caption}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
      />
    </Router>
  );
}

export default App;
