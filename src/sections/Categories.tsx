import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Shield, 
  Terminal,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number;
  name: string;
  description: string;
  postCount: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
  tag: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Frontend',
    description: 'React, Vue, Angular, and modern UI development',
    postCount: 24,
    icon: Code2,
    color: '#61dafb',
    gradient: 'from-[#61dafb]/20 to-[#61dafb]/5',
    tag: 'React',
  },
  {
    id: 2,
    name: 'Backend',
    description: 'Node.js, Python, Go, and API architecture',
    postCount: 18,
    icon: Database,
    color: '#339933',
    gradient: 'from-[#339933]/20 to-[#339933]/5',
    tag: 'Node.js',
  },
  {
    id: 3,
    name: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes, and cloud platforms',
    postCount: 15,
    icon: Terminal,
    color: '#ff6b35',
    gradient: 'from-[#ff6b35]/20 to-[#ff6b35]/5',
    tag: 'DevOps',
  },
  {
    id: 4,
    name: 'AI & ML',
    description: 'Machine learning, neural networks, and AI tools',
    postCount: 12,
    icon: Cpu,
    color: '#a855f7',
    gradient: 'from-[#a855f7]/20 to-[#a855f7]/5',
    tag: 'AI',
  },
  {
    id: 5,
    name: 'Web3',
    description: 'Blockchain, smart contracts, and decentralized apps',
    postCount: 8,
    icon: Globe,
    color: '#00f5ff',
    gradient: 'from-[#00f5ff]/20 to-[#00f5ff]/5',
    tag: 'Web3',
  },
  {
    id: 6,
    name: 'Security',
    description: 'Cybersecurity, best practices, and vulnerability analysis',
    postCount: 10,
    icon: Shield,
    color: '#00ff88',
    gradient: 'from-[#00ff88]/20 to-[#00ff88]/5',
    tag: 'Security',
  },
];

const Categories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.category-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-tech-bg py-24"
    >
      {/* Section Header */}
      <div ref={headingRef} className="px-6 lg:px-12 mb-12">
        <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-pink">Category</span>
        </h2>
        <p className="text-gray-400 max-w-xl">
          Explore articles organized by technology stack and domain expertise.
        </p>
      </div>

      {/* Categories Grid */}
      <div 
        ref={gridRef}
        className="px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/tags/${encodeURIComponent(category.tag)}`}
            className="category-card group relative p-6 rounded-2xl border border-tech-border cursor-pointer overflow-hidden transition-all duration-500"
            style={{
              background: hoveredId === category.id 
                ? `linear-gradient(135deg, ${category.color}15, transparent)`
                : 'transparent',
              borderColor: hoveredId === category.id ? `${category.color}50` : undefined,
            }}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  background: `${category.color}20`,
                  border: `1px solid ${category.color}40`,
                }}
              >
                <category.icon 
                  className="w-7 h-7"
                  style={{ color: category.color }}
                />
              </div>

              {/* Title */}
              <h3 className="font-oswald text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                {category.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">
                {category.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.postCount} articles
                </span>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                  style={{ background: category.color }}
                >
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div 
              className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              style={{ background: category.color }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
