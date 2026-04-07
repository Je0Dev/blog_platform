import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Menu, ArrowRight, FileText, Hash } from 'lucide-react';
import { posts, getPostsByTag } from '../data/posts';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'posts' | 'tags'>('posts');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filteredPosts = query.trim()
    ? posts.filter(p => {
        const lowerQuery = query.toLowerCase();
        return p.title.toLowerCase().includes(lowerQuery) || 
               p.tags.some(t => t.toLowerCase().includes(lowerQuery));
      })
    : [];

  const filteredTags = query.trim()
    ? allTags.filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
    : [];

  const isSelected = (index: number) => {
    return hoveredIndex === index || selectedIndex === index;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setSelectedIndex(0);
    setHoveredIndex(null);
  }, [query, activeSection]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (url: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(url);
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleTagClick = (tag: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/tags/${encodeURIComponent(tag)}`);
    setIsSearchOpen(false);
    setQuery('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-olive/95 backdrop-blur-sm border-b border-moss' : 'bg-transparent'}`}>
        <div className="max-w-wide mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={scrollToTop} className="font-serif text-xl font-semibold text-cream hover:text-tomato transition-colors">
            George
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/tags" onClick={scrollToTop} className="font-sans text-sm text-earth-tan hover:text-cream transition-colors hidden sm:block">
              Writing
            </Link>
            <Link to="/projects" onClick={scrollToTop} className="font-sans text-sm text-earth-tan hover:text-cream transition-colors hidden sm:block">
              Projects
            </Link>
            <Link to="/about" onClick={scrollToTop} className="font-sans text-sm text-earth-tan hover:text-cream transition-colors hidden sm:block">
              About
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-deep-forest border border-moss rounded hover:border-earth-tan transition-colors text-sm text-earth-muted hover:text-cream"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-xs">⌘K</span>
            </button>
            <button
              onClick={onMenuToggle}
              className="p-2 text-earth-tan hover:text-cream transition-colors sm:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-deep-olive/98 backdrop-blur-md flex items-start justify-center pt-[12vh]"
          onClick={() => { setIsSearchOpen(false); setQuery(''); }}
        >
          <div 
            className="w-full max-w-3xl mx-4 bg-deep-forest border border-moss rounded-lg overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-moss">
              <Search className="w-5 h-5 text-olive-light flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={e => {
                  const maxItems = activeSection === 'posts' ? filteredPosts.length : filteredTags.length;
                  
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (activeSection === 'posts' && filteredTags.length > 0) {
                      setActiveSection('tags');
                      setSelectedIndex(0);
                    }
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    if (activeSection === 'tags' && filteredPosts.length > 0) {
                      setActiveSection('posts');
                      setSelectedIndex(0);
                    }
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHoveredIndex(null);
                    setSelectedIndex(i => Math.min(i + 1, maxItems - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHoveredIndex(null);
                    setSelectedIndex(i => Math.max(i - 1, 0));
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (activeSection === 'posts' && filteredPosts[selectedIndex]) {
                      handleSelect(`/blog/${filteredPosts[selectedIndex].slug}`);
                    } else if (activeSection === 'tags' && filteredTags[selectedIndex]) {
                      handleTagClick(filteredTags[selectedIndex]);
                    }
                  }
                }}
                placeholder="Search writings, topics, or tags..."
                className="flex-1 bg-transparent text-cream placeholder:text-earth-muted font-serif text-lg focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-earth-muted hover:text-cream transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-2 py-1 bg-deep-olive border border-moss rounded text-xs text-earth-muted font-mono">ESC</kbd>
            </div>

            <div className="flex border-b border-moss">
              <button
                onClick={() => { setActiveSection('posts'); setSelectedIndex(0); setHoveredIndex(null); }}
                className={`flex-1 px-5 py-3 text-sm font-sans transition-colors flex items-center justify-center gap-2 ${
                  activeSection === 'posts' 
                    ? 'text-tomato border-b-2 border-tomato -mb-px' 
                    : 'text-earth-muted hover:text-cream'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Posts</span>
                <span className="text-xs opacity-60">({filteredPosts.length})</span>
              </button>
              <button
                onClick={() => { setActiveSection('tags'); setSelectedIndex(0); setHoveredIndex(null); }}
                className={`flex-1 px-5 py-3 text-sm font-sans transition-colors flex items-center justify-center gap-2 ${
                  activeSection === 'tags' 
                    ? 'text-olive-light border-b-2 border-olive-light -mb-px' 
                    : 'text-earth-muted hover:text-cream'
                }`}
              >
                <Hash className="w-4 h-4" />
                <span>Tags</span>
                <span className="text-xs opacity-60">({filteredTags.length})</span>
              </button>
            </div>

            <div ref={listRef} className="max-h-[400px] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-earth-muted font-sans text-sm mb-2">Start typing to search...</p>
                  <p className="text-earth-muted/60 font-sans text-xs">Supports regex patterns</p>
                </div>
              ) : (
                <>
                  {activeSection === 'posts' ? (
                    filteredPosts.length === 0 ? (
                      <div className="px-5 py-8 text-center">
                        <p className="text-earth-muted font-sans text-sm">No posts found for "{query}"</p>
                      </div>
                    ) : (
                      <div className="py-1">
                        {filteredPosts.map((post, index) => (
                          <div
                            key={post.id}
                            onClick={() => handleSelect(`/blog/${post.slug}`)}
                            onMouseEnter={() => { setSelectedIndex(index); setHoveredIndex(index); }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`px-5 py-3 cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                              isSelected(index) ? 'bg-deep-sage translate-x-2' : 'hover:bg-deep-olive'
                            }`}
                          >
                            <div className="flex-shrink-0 mt-2">
                              <FileText className={`w-4 h-4 transition-colors ${isSelected(index) ? 'text-tomato' : 'text-earth-muted'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-serif text-base transition-colors ${isSelected(index) ? 'text-cream' : 'text-earth-tan'} ${isSelected(index) ? 'underline underline-offset-4' : ''}`}>
                                {post.title}
                              </p>
                              <p className="text-earth-muted font-sans text-xs mt-1 truncate">
                                /blog/{post.slug}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {post.tags.map(tag => (
                                  <span
                                    key={tag}
                                    onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}
                                    className={`text-xs font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                                      isSelected(index) 
                                        ? 'bg-olive/40 text-olive-light underline underline-offset-2' 
                                        : 'bg-olive/20 text-olive-light/70 hover:bg-olive/30'
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {isSelected(index) && (
                              <div className="flex-shrink-0 text-olive-light font-mono text-xs flex items-center gap-1 mt-2">
                                <span>↵</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    filteredTags.length === 0 ? (
                      <div className="px-5 py-8 text-center">
                        <p className="text-earth-muted font-sans text-sm">No tags found for "{query}"</p>
                      </div>
                    ) : (
                      <div className="py-1">
                        {filteredTags.map((tag, index) => {
                          const tagPosts = getPostsByTag(tag);
                          return (
                            <div
                              key={tag}
                              onClick={() => handleTagClick(tag)}
                              onMouseEnter={() => { setSelectedIndex(index); setHoveredIndex(index); }}
                              onMouseLeave={() => setHoveredIndex(null)}
                              className={`px-5 py-3 cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                                isSelected(index) ? 'bg-deep-sage translate-x-2' : 'hover:bg-deep-olive'
                              }`}
                            >
                              <div className="flex-shrink-0 mt-1">
                                <Hash className={`w-4 h-4 transition-colors ${isSelected(index) ? 'text-olive-light' : 'text-earth-muted'}`} />
                              </div>
                              <div className="flex-1">
                                <p className={`font-sans text-base transition-colors ${isSelected(index) ? 'text-cream' : 'text-earth-tan'} ${isSelected(index) ? 'underline underline-offset-4' : ''}`}>
                                  {tag}
                                </p>
                                <p className="text-earth-muted font-mono text-xs mt-1">
                                  /tags/{encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}
                                </p>
                              </div>
                              <div className="flex-shrink-0 text-xs font-mono px-2 py-1 rounded bg-olive/20 text-olive-light mt-1">
                                {tagPosts.length}
                              </div>
                              {isSelected(index) && (
                                <div className="flex-shrink-0 text-olive-light font-mono text-xs flex items-center gap-1 mt-2">
                                  <span>↵</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  )}
                </>
              )}
            </div>

            <div className="px-5 py-3 border-t border-moss bg-deep-olive/50 flex items-center justify-between text-xs text-earth-muted font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3 rotate-180" /> <ArrowRight className="w-3 h-3" /> navigate</span>
                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3 rotate-180" /> <ArrowRight className="w-3 h-3" /> switch</span>
                <span>↵ select</span>
              </div>
              <span className="text-earth-muted/60">Try: "rust", "cli.*", "^soft"</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
