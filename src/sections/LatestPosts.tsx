import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowUpRight, Clock, Hash } from 'lucide-react';
import { posts } from '../data/posts';

gsap.registerPlugin(ScrollTrigger);

const tagColors: Record<string, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#61dafb',
  node: '#339933',
  'node.js': '#339933',
  python: '#3776ab',
  rust: '#dea584',
  go: '#00add8',
  websockets: '#339933',
  'real-time': '#ff6b35',
  'server components': '#61dafb',
  'next.js': '#000000',
  webassembly: '#dea584',
  'systems programming': '#dea584',
  pandas: '#3776ab',
  'data science': '#3776ab',
  concurrency: '#00add8',
  backend: '#00add8',
  'functional programming': '#3178c6',
};

const getTagColor = (tag: string): string => {
  const normalized = tag.toLowerCase();
  return tagColors[normalized] || '#00f5ff';
};

const LatestPosts = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  // Get first 3 posts with code examples
  const featuredPosts = posts.filter(p => p.tableOfContents.length > 0).slice(0, 3);

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

      const postItems = postsRef.current?.querySelectorAll('.featured-post');
      postItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-tech-bg py-24"
    >
      {/* Section Header */}
      <div ref={headingRef} className="px-6 lg:px-12 mb-12">
        <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-pink to-tech-orange">Posts</span>
        </h2>
        <p className="text-gray-400 max-w-xl">
          In-depth tutorials with code examples and practical implementations.
        </p>
      </div>

      {/* Posts */}
      <div ref={postsRef} className="px-6 lg:px-12 space-y-12">
        {featuredPosts.map((post, index) => (
          <article
            key={post.id}
            className="featured-post group grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Image */}
            <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-tech-bg/80 to-transparent" />
              
              {/* Tags overlay */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${encodeURIComponent(tag)}`}
                    className="flex items-center gap-1 px-3 py-1 bg-tech-surface/90 backdrop-blur-sm rounded-full text-xs font-medium"
                    style={{ color: getTagColor(tag) }}
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} read</span>
                </div>
              </div>

              {/* Title */}
              <Link to={`/blog/${post.slug}`}>
                <h3 className="font-oswald text-2xl sm:text-3xl font-bold mb-3 group-hover:text-tech-cyan transition-colors">
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-400 mb-6">
                {post.excerpt}
              </p>

              {/* Read More */}
              <Link 
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-tech-cyan font-mono text-sm hover:underline group/btn"
              >
                Read article
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
