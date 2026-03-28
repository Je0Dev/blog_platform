import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TerminalHero = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const fullText = `> initializing blog.exe...
> loading modules...
> [OK] react.js
> [OK] typescript
> [OK] tailwind.css
> [OK] gsap animations
> 
> Welcome to my digital garden.
> I write about code, tech, and building things.
> 
> Type 'help' for available commands.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal entrance animation
      gsap.fromTo(terminalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out', delay: 0.5 }
      );
    }, terminalRef);

    // Typewriter effect
    const textLines = fullText.split('\n');
    let currentLine = 0;
    
    const typeInterval = setInterval(() => {
      if (currentLine < textLines.length) {
        setLines(prev => [...prev, textLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);

    return () => {
      ctx.revert();
      clearInterval(typeInterval);
    };
  }, []);

  return (
    <div 
      ref={terminalRef}
      className="terminal w-full max-w-2xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="ml-4 text-xs text-gray-500 font-mono">alex@blog:~</span>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body min-h-[280px]">
          {lines.map((line, index) => (
            <div 
              key={index} 
              className={`font-mono text-sm ${
                line?.startsWith('> [OK]') ? 'text-tech-green' :
                line?.startsWith('> initializing') || line?.startsWith('> loading') ? 'text-tech-cyan' :
                line?.startsWith('> Welcome') || line?.startsWith('> I write') ? 'text-white' :
                line?.startsWith('> Type') ? 'text-gray-400' :
                'text-tech-purple'
              }`}
            >
              {line}
              {index === lines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-tech-cyan ml-1 animate-blink" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TerminalHero;
