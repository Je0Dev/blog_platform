import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Hash, 
  ExternalLink, 
  Github, 
  ChevronRight,
  Bookmark,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../data/posts';
import CodeBlock from '../components/CodeBlock';
import ReadingProgress from '../components/ReadingProgress';

gsap.registerPlugin(ScrollTrigger);

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    if (!post) return;

    // Animate content on load
    gsap.fromTo('.article-content > *',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.05,
      }
    );

    // Set up intersection observer for table of contents
    const headings = contentRef.current?.querySelectorAll('h2[id]');
    if (headings) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0% -80% 0%' }
      );

      headings.forEach((heading) => observer.observe(heading));
      return () => observer.disconnect();
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-tech-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-oswald text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-tech-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return (
            <CodeBlock 
              key={index}
              code={code.trim()}
              language={language || 'javascript'}
            />
          );
        }
      }
      
      // Convert markdown-like syntax to HTML
      const html = part
        .replace(/## (.*)/g, '<h2 id="$1" class="font-oswald text-2xl sm:text-3xl font-bold mt-12 mb-6 text-white">$1</h2>')
        .replace(/### (.*)/g, '<h3 class="font-oswald text-xl sm:text-2xl font-bold mt-8 mb-4 text-white">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
        .replace(/\n/g, ' ');
      
      return <div key={index} dangerouslySetInnerHTML={{ __html: `<p class="text-gray-300 leading-relaxed mb-4">${html}</p>` }} />;
    });
  };

  return (
    <div className="min-h-screen bg-tech-bg">
      <ReadingProgress />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <span className="text-gray-600">|</span>
            <Link to="/" className="font-mono text-lg font-bold hover:text-tech-cyan transition-colors">
              &lt;ALEX/&gt;
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-tech-surface transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-5 h-5 text-tech-green" /> : <Copy className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-lg hover:bg-tech-surface transition-colors"
              title="Bookmark"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-tech-cyan text-tech-cyan' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <article ref={articleRef} className="pt-24 pb-16">
        {/* Hero Section */}
        <header className="px-6 lg:px-12 max-w-4xl mx-auto mb-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-tech-cyan transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/" className="hover:text-tech-cyan transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="flex items-center gap-1 px-3 py-1 bg-tech-surface border border-tech-border rounded-full text-sm hover:border-tech-cyan hover:text-tech-cyan transition-colors"
              >
                <Hash className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-tech-border"
              />
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-xs">{post.author.bio}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 50%, ${post.color}30 100%)` }}
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-oswald text-lg font-bold mb-4 text-gray-400 uppercase tracking-wider">
                  Contents
                </h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${
                        activeSection === item.id
                          ? 'border-tech-cyan text-tech-cyan'
                          : 'border-tech-border text-gray-400 hover:text-white hover:border-gray-500'
                      }`}
                      style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-tech-border">
                  <h3 className="font-oswald text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">
                    Share
                  </h3>
                  <div className="flex items-center gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-tech-surface hover:bg-[#1DA1F2] hover:text-white transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-tech-surface hover:bg-[#0A66C2] hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-3">
              <div ref={contentRef} className="article-content">
                {renderContent(post.content)}
              </div>

              {/* External Links */}
              {post.externalLinks.length > 0 && (
                <div className="mt-12 pt-8 border-t border-tech-border">
                  <h3 className="font-oswald text-xl font-bold mb-4">External Resources</h3>
                  <div className="space-y-3">
                    {post.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-4 bg-tech-surface rounded-xl border border-tech-border hover:border-tech-cyan transition-colors group"
                      >
                        <ExternalLink className="w-5 h-5 text-tech-cyan mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium group-hover:text-tech-cyan transition-colors">{link.title}</p>
                          <p className="text-sm text-gray-500">{link.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              {post.projectLinks.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-oswald text-xl font-bold mb-4">Related Projects</h3>
                  <div className="space-y-3">
                    {post.projectLinks.map((project, index) => (
                      <a
                        key={index}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-4 bg-tech-surface rounded-xl border border-tech-border hover:border-tech-purple transition-colors group"
                      >
                        <Github className="w-5 h-5 text-tech-purple mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium group-hover:text-tech-purple transition-colors">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-tech-border">
                <h3 className="font-oswald text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-tech-surface border border-tech-border rounded-full text-sm hover:border-tech-cyan hover:text-tech-cyan transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 lg:px-12 py-16 border-t border-tech-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-oswald text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block p-4 bg-tech-surface rounded-xl border border-tech-border hover:border-tech-cyan transition-colors"
                >
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-medium group-hover:text-tech-cyan transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{relatedPost.readTime} read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default Article;
