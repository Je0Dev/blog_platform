import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TechCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  color: string;
  index: number;
}

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  javascript: { bg: 'rgba(247, 223, 30, 0.15)', text: '#f7df1e', border: 'rgba(247, 223, 30, 0.3)' },
  typescript: { bg: 'rgba(49, 120, 198, 0.15)', text: '#3178c6', border: 'rgba(49, 120, 198, 0.3)' },
  react: { bg: 'rgba(97, 218, 251, 0.15)', text: '#61dafb', border: 'rgba(97, 218, 251, 0.3)' },
  node: { bg: 'rgba(51, 153, 51, 0.15)', text: '#339933', border: 'rgba(51, 153, 51, 0.3)' },
  'node.js': { bg: 'rgba(51, 153, 51, 0.15)', text: '#339933', border: 'rgba(51, 153, 51, 0.3)' },
  python: { bg: 'rgba(55, 118, 171, 0.15)', text: '#3776ab', border: 'rgba(55, 118, 171, 0.3)' },
  rust: { bg: 'rgba(222, 165, 132, 0.15)', text: '#dea584', border: 'rgba(222, 165, 132, 0.3)' },
  go: { bg: 'rgba(0, 173, 216, 0.15)', text: '#00add8', border: 'rgba(0, 173, 216, 0.3)' },
  webdev: { bg: 'rgba(0, 245, 255, 0.15)', text: '#00f5ff', border: 'rgba(0, 245, 255, 0.3)' },
  ai: { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
};

const TechCard = ({ id, title, excerpt, date, readTime, tags, image, color, index }: TechCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <Link to={`/blog/${id}`}>
      <article
        ref={cardRef}
        className="tech-card group relative bg-tech-surface rounded-2xl overflow-hidden border border-tech-border cursor-pointer h-full"
        style={{
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 30px ${color}10`,
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="tech-card-image w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 opacity-30"
            style={{ background: `linear-gradient(180deg, transparent 0%, ${color}40 100%)` }}
          />
          
          {/* Color accent bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: color }}
          />

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: color }}
            >
              <ArrowUpRight className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => {
              const colors = tagColors[tag.toLowerCase()] || tagColors.webdev;
              return (
                <span
                  key={tag}
                  className="tech-tag"
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  #{tag}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <h3 className="font-oswald text-xl font-bold mb-2 group-hover:text-tech-cyan transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{date}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}20, transparent 70%)`,
          }}
        />
      </article>
    </Link>
  );
};

export default TechCard;
