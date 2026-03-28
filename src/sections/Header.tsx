import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Github, Twitter, Linkedin } from 'lucide-react';
import gsap from 'gsap';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header = ({ onSearchClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo(navRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.1, delay: 0.4 }
      );

      gsap.fromTo(actionsRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.1, delay: 0.6 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo ${
          isScrolled
            ? 'glass-header py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link
              to="/"
              className="font-mono text-xl font-bold tracking-tight hover:text-tech-cyan transition-colors flex items-center gap-2"
            >
              <span className="text-tech-cyan">&lt;</span>
              ALEX
              <span className="text-tech-cyan">/&gt;</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8">
            {[
              { name: 'Blog', path: '/tags' },
              { name: 'Projects', path: '/projects' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="font-mono text-sm hover:text-tech-cyan transition-colors underline-animation"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div ref={actionsRef} className="flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-4 py-2 bg-tech-surface border border-tech-border rounded-lg hover:border-tech-cyan transition-colors group"
            >
              <Search className="w-4 h-4 text-gray-400 group-hover:text-tech-cyan transition-colors" />
              <span className="hidden sm:inline text-sm text-gray-400">Search</span>
              <kbd className="hidden lg:inline-flex px-2 py-0.5 bg-tech-surfaceLight rounded text-xs text-gray-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-tech-surface transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-tech-surface transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-tech-surface transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
