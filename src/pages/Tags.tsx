import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Hash, 
  ArrowRight,
  Clock,
  Calendar
} from 'lucide-react';
import { posts, getPostsByTag, getAllTags } from '../data/posts';

gsap.registerPlugin(ScrollTrigger);

const tagColors: Record<string, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#61dafb',
  'node.js': '#339933',
  node: '#339933',
  python: '#3776ab',
  rust: '#dea584',
  go: '#00add8',
  webdev: '#00f5ff',
  'web development': '#00f5ff',
  ai: '#a855f7',
  devops: '#ff6b35',
  database: '#ff3366',
  security: '#00ff88',
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

const Tags = () => {
  const { tag } = useParams<{ tag: string }>();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allTags = getAllTags();
  const filteredPosts = tag ? getPostsByTag(tag) : posts;
  const tagPostCounts = allTags.map(t => ({
    name: t,
    count: getPostsByTag(t).length,
    color: getTagColor(t),
  })).sort((a, b) => b.count - a.count);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
      );

      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [tag]);

  return (
    <div className="min-h-screen bg-tech-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          </div>
          <Link to="/" className="font-mono text-lg font-bold hover:text-tech-cyan transition-colors">
            &lt;ALEX/&gt;
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header ref={headerRef} className="pt-32 pb-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {tag ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link to="/tags" className="hover:text-tech-cyan transition-colors">Tags</Link>
                <ArrowRight className="w-4 h-4" />
                <span className="text-tech-cyan">#{tag}</span>
              </div>
              <h1 className="font-oswald text-4xl sm:text-5xl font-bold mb-4">
                Articles tagged with <span style={{ color: getTagColor(tag) }}>#{tag}</span>
              </h1>
              <p className="text-gray-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </>
          ) : (
            <>
              <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center">
                Browse by <span className="text-tech-cyan">Tags</span>
              </h1>
              <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto">
                Explore articles organized by technology, topic, and programming language.
              </p>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-6 lg:px-12 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Tag Cloud (only show when not filtering) */}
          {!tag && (
            <div className="mb-16">
              <h2 className="font-oswald text-xl font-bold mb-6 text-gray-400 uppercase tracking-wider">
                All Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {tagPostCounts.map((t) => (
                  <Link
                    key={t.name}
                    to={`/tags/${encodeURIComponent(t.name)}`}
                    className="group flex items-center gap-2 px-4 py-2 bg-tech-surface border border-tech-border rounded-full hover:border-tech-cyan transition-all"
                  >
                    <Hash className="w-4 h-4" style={{ color: t.color }} />
                    <span className="group-hover:text-white transition-colors">{t.name}</span>
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{ background: `${t.color}20`, color: t.color }}
                    >
                      {t.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles List */}
          <div ref={contentRef} className="space-y-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block p-6 bg-tech-surface rounded-2xl border border-tech-border hover:border-tech-cyan transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image */}
                  <div className="sm:w-48 flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-32 sm:h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-tech-bg border border-tech-border rounded-full text-xs"
                          style={{ color: getTagColor(t) }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="font-oswald text-xl font-bold mb-2 group-hover:text-tech-cyan transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} read
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden sm:flex items-center">
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-tech-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No articles found with this tag.</p>
              <Link 
                to="/tags" 
                className="inline-flex items-center gap-2 text-tech-cyan hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse all tags
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-tech-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-mono text-lg font-bold hover:text-tech-cyan transition-colors">
            &lt;ALEX/&gt;
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link to="/tags" className="hover:text-white transition-colors">Tags</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tags;
