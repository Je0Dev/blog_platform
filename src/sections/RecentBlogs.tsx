import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechCard from '../components/TechCard';
import TagCloud from '../components/TagCloud';
import Gamification from '../components/Gamification';
import { posts } from '../data/posts';

gsap.registerPlugin(ScrollTrigger);

const RecentBlogs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()))
    : posts;

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative bg-tech-bg py-24 dot-pattern"
    >
      {/* Section Header */}
      <div ref={headingRef} className="px-6 lg:px-12 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-tech-cyan" />
              <span className="font-mono text-sm text-tech-cyan uppercase tracking-wider">Latest</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-tech-purple">Articles</span>
            </h2>
          </div>
          <Link 
            to="/tags"
            className="group flex items-center gap-2 font-mono text-sm text-tech-cyan hover:underline self-start lg:self-auto"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Blog Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <TechCard
                  key={post.id}
                  id={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  tags={post.tags}
                  image={post.image}
                  color={post.color}
                  index={index}
                />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 font-mono">No articles found with tag #{selectedTag}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gamification */}
            <Gamification />

            {/* Tag Cloud */}
            <TagCloud onTagSelect={setSelectedTag} selectedTag={selectedTag} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
