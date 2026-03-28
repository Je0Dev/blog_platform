import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalHero from '../components/TerminalHero';
import { ChevronDown, Code2, Terminal, Cpu, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.6 }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.1, delay: 0.9 }
      );

      // Floating icons animation
      const icons = floatingIconsRef.current?.querySelectorAll('.floating-icon');
      icons?.forEach((icon, index) => {
        gsap.to(icon, {
          y: '+=15',
          duration: 2 + index * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Articles', value: '50+', icon: Code2 },
    { label: 'Technologies', value: '12', icon: Cpu },
    { label: 'Readers', value: '10K+', icon: Sparkles },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-tech-bg overflow-hidden grid-pattern"
    >
      {/* Floating decorative icons */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-icon absolute top-[20%] left-[10%] text-tech-cyan/20">
          <Terminal className="w-12 h-12" />
        </div>
        <div className="floating-icon absolute top-[30%] right-[15%] text-tech-pink/20">
          <Code2 className="w-16 h-16" />
        </div>
        <div className="floating-icon absolute bottom-[25%] left-[20%] text-tech-purple/20">
          <Cpu className="w-10 h-10" />
        </div>
        <div className="floating-icon absolute bottom-[35%] right-[10%] text-tech-green/20">
          <Sparkles className="w-14 h-14" />
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 lg:px-12 pt-24">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tech-surface border border-tech-border rounded-full mb-8">
            <span className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
            <span className="text-sm text-gray-400 font-mono">Available for freelance</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-oswald text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6"
          >
            <span className="text-white">Building</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan via-tech-purple to-tech-pink">
              {' '}the future
            </span>
            <br />
            <span className="text-white">with code</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Full-stack developer sharing insights on modern web technologies, 
            system design, and the art of writing clean, scalable code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              to="/tags"
              className="px-8 py-4 bg-tech-cyan text-black font-mono font-semibold rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Read the Blog
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-tech-border text-white font-mono rounded-lg hover:border-tech-cyan hover:text-tech-cyan transition-all duration-300"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Terminal */}
        <TerminalHero />

        {/* Stats */}
        <div 
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-8 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-tech-cyan" />
                <span className="font-oswald text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-tech-cyan animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
