import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Heart,
  Code2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/tags' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  const techStack = [
    { name: 'React', url: 'https://react.dev' },
    { name: 'TypeScript', url: 'https://typescriptlang.org' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'Vite', url: 'https://vitejs.dev' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@alex.dev', label: 'Email' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-tech-surface border-t border-tech-border"
    >
      <div ref={contentRef} className="px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-mono text-2xl font-bold mb-4 flex items-center gap-2 hover:text-tech-cyan transition-colors"
            >
              <span className="text-tech-cyan">&lt;</span>
              ALEX
              <span className="text-tech-cyan">/&gt;</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Full-stack developer passionate about building scalable applications 
              and sharing knowledge with the developer community.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-tech-surfaceLight border border-tech-border flex items-center justify-center hover:border-tech-cyan hover:text-tech-cyan transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-oswald text-lg font-semibold mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-400 hover:text-tech-cyan transition-colors text-left font-mono text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-oswald text-lg font-semibold mb-4 uppercase tracking-wider">
              Built With
            </h4>
            <nav className="flex flex-col gap-3">
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-tech-cyan transition-colors text-sm flex items-center gap-1 group"
                >
                  {tech.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-tech-border mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © {new Date().getFullYear()} Built with 
            <Heart className="w-4 h-4 text-tech-pink fill-tech-pink" />
            and
            <Code2 className="w-4 h-4 text-tech-cyan" />
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-gray-500 hover:text-tech-cyan transition-colors font-mono"
          >
            ↑ Back to top
          </button>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="font-mono text-[15vw] font-bold whitespace-nowrap leading-none text-white">
          &lt;ALEX.DEV/&gt;
        </div>
      </div>
    </footer>
  );
};

export default Footer;
