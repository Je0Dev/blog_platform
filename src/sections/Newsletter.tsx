import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Zap, Mail, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  const benefits = [
    { icon: Zap, text: 'Weekly tech insights' },
    { icon: Mail, text: 'No spam, ever' },
    { icon: Bell, text: 'Early access to content' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-tech-bg py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tech-cyan/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-tech-purple/10 rounded-full blur-[120px]" />
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 px-6 lg:px-12 max-w-4xl mx-auto text-center"
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-tech-cyan/20 to-tech-purple/20 border border-tech-cyan/30 mb-8">
          <Mail className="w-8 h-8 text-tech-cyan" />
        </div>

        {/* Heading */}
        <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-tech-purple">Newsletter</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Get weekly insights on modern web development, system design, 
          and emerging technologies delivered to your inbox.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-2 text-sm text-gray-400">
              <benefit.icon className="w-4 h-4 text-tech-cyan" />
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@example.com"
              className="w-full px-6 py-4 bg-tech-surface border border-tech-border rounded-xl text-white placeholder:text-gray-500 font-mono focus:outline-none focus:border-tech-cyan focus:shadow-glow transition-all"
              disabled={isSubmitted || isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted || isLoading || !email}
            className={`group flex items-center gap-2 px-8 py-4 rounded-xl font-mono font-semibold transition-all duration-300 min-w-[160px] justify-center ${
              isSubmitted
                ? 'bg-tech-green text-black'
                : isLoading
                ? 'bg-tech-surface border border-tech-border text-gray-400 cursor-wait'
                : 'bg-tech-cyan text-black hover:shadow-glow hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : isSubmitted ? (
              <>
                <Check className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Subscriber count */}
        <p className="text-sm text-gray-500 mt-6">
          Join <span className="text-tech-cyan font-mono">2,847</span> other developers
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
