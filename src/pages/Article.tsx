import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, ExternalLink, Github, Copy, Check, Share2, Twitter, Linkedin } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, posts } from '../data/posts';
import Newsletter from '../components/Newsletter';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  artist?: string;
  year?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
    title: 'Perseus & the Gorgons',
    description: 'The hero Perseus slays Medusa, with Pegasus emerging from her blood.',
    artist: 'Walter Crane',
    year: '1892',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
    title: 'Knights in Combat',
    description: 'The pursuit of mastery requires dedication and discipline.',
    artist: 'Thomas W. Phelan',
    year: '1870',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
    title: 'The Faerie Queene',
    description: 'Allegory of virtue and the journey toward wisdom.',
    artist: 'Arthur Rackham',
    year: '1896',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
    title: 'The Arrival',
    description: 'Finding one\'s place in the world takes patience.',
    artist: 'Howard Pyle',
    year: '1885',
  },
];

const oldBookImages = galleryImages.map(img => img.src);

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    if (!post) return;

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
      <div className="min-h-screen bg-deep-olive flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4 text-cream">Article Not Found</h1>
          <p className="text-earth-tan mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-olive-light hover:text-tomato transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out "${post.title}" by George`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderTextContent(content.slice(lastIndex, match.index)));
      }
      parts.push(
        <pre key={`code-${match.index}`} className="bg-deep-forest border border-moss rounded-lg p-4 overflow-x-auto my-6">
          <code className="font-mono text-sm text-earth-tan">{match[2].trim()}</code>
        </pre>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(renderTextContent(content.slice(lastIndex)));
    }

    return parts;
  };

  const renderTextContent = (text: string) => {
    const blocks = text.split(/\n\n+/);
    
    return blocks.map((block, blockIndex) => {
      if (block.startsWith('## ')) {
        const title = block.replace('## ', '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h2 key={blockIndex} id={id} className="font-serif text-2xl font-bold text-cream mt-12 mb-4 scroll-mt-24">
            {title}
          </h2>
        );
      }
      
      if (block.startsWith('### ')) {
        return (
          <h3 key={blockIndex} className="font-serif text-xl font-bold text-cream mt-8 mb-3">
            {block.replace('### ', '')}
          </h3>
        );
      }

      if (block.startsWith('> ')) {
        return (
          <blockquote key={blockIndex} className="border-l-4 border-olive-light pl-6 py-2 my-6 bg-deep-forest/50 rounded-r-lg">
            <p className="text-earth-tan italic leading-relaxed">
              {formatInlineElements(block.replace('> ', ''))}
            </p>
          </blockquote>
        );
      }

      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(line => line.match(/^[-*] /));
        return (
          <ul key={blockIndex} className="list-disc list-inside space-y-2 my-6 text-earth-tan leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{formatInlineElements(item.replace(/^[-*] /, ''))}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={blockIndex} className="text-earth-tan leading-relaxed mb-6">
          {formatInlineElements(block)}
        </p>
      );
    });
  };

  const formatInlineElements = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let elementIndex = 0;

    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
    let match;
    let lastIndex = 0;

    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        const linkText = match[2];
        const url = match[3];
        parts.push(
          <a 
            key={`link-${elementIndex++}`}
            href={url}
            target={url.startsWith('http') ? '_blank' : undefined}
            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-olive-light hover:text-tomato underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
          >
            {linkText}
          </a>
        );
      } else if (match[4]) {
        const boldText = match[5];
        parts.push(
          <strong key={`bold-${elementIndex++}`} className="text-cream font-semibold">{boldText}</strong>
        );
      } else if (match[6]) {
        const italicText = match[7];
        parts.push(
          <em key={`italic-${elementIndex++}`} className="italic text-earth-tan/90">{italicText}</em>
        );
      } else if (match[8]) {
        const codeText = match[9];
        parts.push(
          <code key={`code-${elementIndex++}`} className="px-1.5 py-0.5 bg-deep-forest border border-moss rounded text-sm font-mono text-olive-light">{codeText}</code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const postIndex = posts.findIndex(p => p.slug === slug);
  const heroImage = oldBookImages[postIndex % oldBookImages.length];
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <div className="min-h-screen bg-deep-olive">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-olive/95 backdrop-blur-sm border-b border-moss">
        <div className="max-w-wide mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-earth-tan hover:text-cream transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-sans text-sm">Back</span>
            </button>
            <span className="text-moss">|</span>
            <Link to="/" className="font-serif text-lg font-semibold text-cream hover:text-tomato transition-colors">
              George
            </Link>
          </div>
          
          <div ref={shareMenuRef} className="relative">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded hover:bg-deep-forest transition-colors text-earth-tan hover:text-cream"
              title="Share"
            >
              {copied ? <Check className="w-5 h-5 text-olive-light" /> : <Share2 className="w-5 h-5" />}
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-deep-forest border border-moss rounded-lg shadow-xl py-2 z-50">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-earth-tan hover:bg-deep-sage hover:text-cream transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy link
                </button>
                <button
                  onClick={shareToTwitter}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-earth-tan hover:bg-deep-sage hover:text-cream transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Share on Twitter
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-earth-tan hover:bg-deep-sage hover:text-cream transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <article ref={articleRef} className="pt-24 pb-16">
        <header className="max-w-prose mx-auto px-6 mb-12">
          {/* Enhanced Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-earth-muted mb-6">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tags" className="hover:text-cream transition-colors">Writing</Link>
            <span>/</span>
            <span className="text-olive-light truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="tag-pill"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-cream">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-earth-muted mb-8">
            <div className="flex items-center gap-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-moss"
              />
              <div>
                <p className="text-cream font-sans font-medium">{post.author.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="font-sans">{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-sans">{post.readTime} read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Illustration */}
        <div className="max-w-prose mx-auto px-6 mb-12">
          <div className="illustration-container">
            <img 
              src={heroImage}
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
              loading="eager"
            />
            <p className="illustration-caption">Illustration from Old Book Illustrations</p>
          </div>
        </div>

        <div className="max-w-wide mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-sans text-sm font-semibold mb-4 text-earth-muted uppercase tracking-wider">
                  Contents
                </h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${
                        activeSection === item.id
                          ? 'border-olive-light text-cream'
                          : 'border-moss text-earth-tan hover:text-cream hover:border-earth-tan'
                      }`}
                      style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div ref={contentRef} className="prose max-w-prose">
                {renderContent(post.content)}
              </div>

              {/* Giphy Embeds */}
              {post.giphyEmbeds && post.giphyEmbeds.length > 0 && (
                <div className="mt-12 max-w-prose">
                  <h3 className="font-serif text-xl font-bold text-cream mb-4">Related Media</h3>
                  {post.giphyEmbeds.map((giphy, index) => (
                    <div key={index} className="mb-6">
                      <div className="giphy-embed rounded-lg overflow-hidden">
                        <iframe
                          src={giphy.embedUrl}
                          width="100%"
                          height="300"
                          frameBorder="0"
                          className="giphy-embed"
                          allowFullScreen
                          title={giphy.title}
                        ></iframe>
                      </div>
                      <p className="illustration-caption">{giphy.title}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* External Links */}
              {post.externalLinks.length > 0 && (
                <div className="mt-12 pt-8 border-t border-moss max-w-prose">
                  <h3 className="font-serif text-xl font-bold text-cream mb-4">Further Reading</h3>
                  <p className="text-earth-muted mb-4 font-sans text-sm">
                    Resources and references that influenced this piece.
                  </p>
                  <div className="space-y-3">
                    {post.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-card"
                      >
                        <div className="flex items-start gap-3">
                          <ExternalLink className="w-5 h-5 text-olive-light mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="link-card-title">{link.title}</p>
                            <p className="link-card-desc">{link.description}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              {post.projectLinks.length > 0 && (
                <div className="mt-8 max-w-prose">
                  <h3 className="font-serif text-xl font-bold text-cream mb-4">Related Projects</h3>
                  <p className="text-earth-muted mb-4 font-sans text-sm">
                    Code and projects connected to this writing.
                  </p>
                  <div className="space-y-3">
                    {post.projectLinks.map((project, index) => (
                      <a
                        key={index}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-card"
                      >
                        <div className="flex items-start gap-3">
                          <Github className="w-5 h-5 text-tomato mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="link-card-title">{project.name}</p>
                            <p className="link-card-desc">{project.description}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Illustration Gallery */}
              <div className="mt-12">
                <h3 className="font-serif text-xl font-bold text-cream mb-4 flex items-center gap-4">
                  Illustrations
                  <span className="h-px flex-1 bg-gradient-to-r from-moss to-transparent"></span>
                </h3>
                <p className="text-earth-muted font-sans text-sm mb-6">
                  Antique illustrations from <a href="https://www.oldbookillustrations.com" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:text-tomato">oldbookillustrations.com</a>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {galleryImages.map((img, index) => {
                    const imgPostIndex = posts.findIndex((_, i) => oldBookImages.indexOf(img.src) === i % oldBookImages.length);
                    const linkPost = imgPostIndex >= 0 ? posts[imgPostIndex] : null;
                    const href = linkPost ? `/blog/${linkPost.slug}` : '/tags/illustration';
                    
                    return (
                      <Link
                        key={index}
                        to={href}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group relative block overflow-hidden rounded-lg border border-moss hover:border-earth-tan transition-all duration-300"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="font-serif text-xs font-bold text-cream group-hover:text-tomato transition-colors line-clamp-1 underline-hover">
                            {img.title}
                          </p>
                          <p className="font-mono text-[10px] text-earth-muted">
                            {img.year}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="flex items-center gap-1 px-1.5 py-1 bg-deep-olive/90 backdrop-blur-sm rounded text-[10px] text-cream">
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12 max-w-prose">
                <Newsletter />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-moss max-w-prose">
                <h3 className="font-sans text-sm font-semibold mb-3 text-earth-muted uppercase tracking-wider">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="tag-pill"
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

      {relatedPosts.length > 0 && (
        <section className="px-6 py-16 border-t border-moss">
          <div className="max-w-prose mx-auto">
            <h2 className="font-serif text-2xl font-bold text-cream mb-8">Related Writing</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <div className="bg-deep-forest border border-moss rounded-lg p-4 hover:bg-deep-sage hover:border-earth-tan transition-colors">
                    <h3 className="font-serif text-base font-bold mb-2 group-hover:text-tomato transition-colors line-clamp-2">
                      <Link to={`/blog/${relatedPost.slug}`} className="text-earth-tan hover:text-cream hover:text-tomato transition-colors underline-hover">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-earth-muted text-sm underline-hover">{relatedPost.readTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev/Next Navigation */}
      {(prevPost || nextPost) && (
        <nav className="px-6 py-12 border-t border-moss">
          <div className="max-w-wide mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-2 p-4 bg-deep-forest border border-moss rounded-lg hover:border-earth-tan transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-earth-muted">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </div>
                  <span className="font-serif text-cream group-hover:text-tomato transition-colors underline-hover">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-2 p-4 bg-deep-forest border border-moss rounded-lg hover:border-earth-tan transition-colors text-right sm:col-start-2"
                >
                  <div className="flex items-center justify-end gap-2 text-sm text-earth-muted">
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-cream group-hover:text-tomato transition-colors underline-hover">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      <footer className="px-6 py-8 border-t border-moss">
        <div className="max-w-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-serif text-lg font-semibold text-cream hover:text-tomato transition-colors">
            George
          </Link>
          <div className="flex items-center gap-6 text-sm text-earth-tan">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-cream transition-colors">Projects</Link>
            <Link to="/tags" className="hover:text-cream transition-colors">Tags</Link>
            <Link to="/about" className="hover:text-cream transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Article;
