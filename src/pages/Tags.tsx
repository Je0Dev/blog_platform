import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { LightboxTrigger } from '../components/Lightbox';
import { posts, getPostsByTag, getAllTags } from '../data/posts';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
];

const tagColors: Record<string, string> = {
  javascript: '#c4a06e',
  typescript: '#c4a06e',
  react: '#c4a06e',
  rust: '#dea584',
  esp32: '#dea584',
  embedded: '#8b7355',
  hardware: '#8b7355',
  iot: '#6b7b4b',
  java: '#c4a06e',
  'api design': '#8b9b6b',
  'data modeling': '#8b9b6b',
  learning: '#c4a06e',
  cli: '#c4a06e',
  unix: '#c4a06e',
  'software design': '#8b9b6b',
  craftsmanship: '#8b9b6b',
  'software engineering': '#8b9b6b',
  philosophy: '#c45c3e',
  'indieweb': '#8b9b6b',
  'personal website': '#8b9b6b',
  'digital garden': '#8b9b6b',
  'systems programming': '#dea584',
  c: '#8b7355',
  database: '#8b9b6b',
};

const getTagColor = (tag: string): string => {
  const normalized = tag.toLowerCase();
  return tagColors[normalized] || '#c4a06e';
};

const Tags = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = getAllTags();

  useEffect(() => {
    if (tag) {
      const decodedTag = decodeURIComponent(tag);
      const normalizedTag = decodedTag.toLowerCase().replace(/-/g, ' ');
      const matchedTag = allTags.find(t => t.toLowerCase() === normalizedTag);
      if (matchedTag && !selectedTags.includes(matchedTag)) {
        setSelectedTags([matchedTag]);
      }
    }
  }, [tag, allTags, selectedTags]);

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => selectedTags.some(t => post.tags.includes(t)))
    : posts;

  const tagPostCounts = allTags.map(t => ({
    name: t,
    count: getPostsByTag(t).length,
    color: getTagColor(t),
  })).sort((a, b) => b.count - a.count);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = '1';
    }
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
    if (tag) {
      navigate('/tags');
    }
  };

  return (
    <div className="min-h-screen bg-deep-olive">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-olive/95 backdrop-blur-sm border-b border-moss">
        <div className="max-w-wide mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-earth-tan hover:text-cream transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          </div>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-lg font-semibold text-cream hover:text-tomato transition-colors">
            George
          </Link>
        </div>
      </nav>

      <header ref={headerRef} className="pt-24 pb-8 px-6 opacity-0 transition-opacity duration-500">
        <div className="max-w-wide mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-cream">
            {tag ? (
              <>
                <Link to="/tags" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-olive-light hover:text-tomato transition-colors">Browse by Tags</Link>
                <span className="text-earth-muted mx-3">/</span>
                <span className="text-tomato">{selectedTags[0] || decodeURIComponent(tag)}</span>
              </>
            ) : (
              <>Browse by <Link to="/tags" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-olive-light hover:text-tomato transition-colors">Tags</Link></>
            )}
          </h1>
          <p className="font-sans text-base text-earth-tan text-center max-w-2xl mx-auto mb-8">
            {tag 
              ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} tagged with "${selectedTags[0] || decodeURIComponent(tag)}"`
              : 'Explore articles organized by topic and technology. Select multiple tags to filter.'}
          </p>
        </div>
      </header>

      <div className="px-6 pb-16">
        <div className="max-w-wide mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans text-sm font-semibold text-earth-muted uppercase tracking-wider">
                Filter by Tags
              </h2>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearTags}
                  className="flex items-center gap-1 text-sm text-olive-light hover:text-tomato transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear ({selectedTags.length})
                </button>
              )}
            </div>
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors"
                    style={{ 
                      backgroundColor: `${getTagColor(tag)}20`, 
                      border: `1px solid ${getTagColor(tag)}`,
                      color: getTagColor(tag)
                    }}
                  >
                    <span className="text-sm font-sans">#{tag}</span>
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {tagPostCounts.map((t) => (
                <button
                  key={t.name}
                  onClick={() => toggleTag(t.name)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 border ${
                    selectedTags.includes(t.name)
                      ? ''
                      : 'bg-deep-forest border-moss hover:bg-deep-sage hover:border-earth-tan'
                  }`}
                  style={{ 
                    backgroundColor: selectedTags.includes(t.name) ? `${t.color}30` : undefined,
                    borderColor: selectedTags.includes(t.name) ? t.color : undefined,
                    color: selectedTags.includes(t.name) ? t.color : undefined,
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className={`font-sans text-sm transition-colors ${selectedTags.includes(t.name) ? 'underline-hover active' : 'underline-hover'}`} style={!selectedTags.includes(t.name) ? { color: '#c9b99a' } : {}}>{t.name}</span>
                  <span 
                    className="px-1.5 py-0.5 text-xs rounded-full font-mono flex-shrink-0"
                    style={{ 
                      backgroundColor: selectedTags.includes(t.name) ? `${t.color}40` : `${t.color}20`, 
                      color: selectedTags.includes(t.name) ? t.color : '#c9b99a' 
                    }}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="font-sans text-earth-muted">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {selectedTags.length > 0 && ` matching ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post, index) => (
              <article key={post.id} className="group bg-deep-forest border border-moss rounded-lg overflow-hidden hover:border-earth-tan hover:shadow-lg hover:shadow-olive/10 transition-all duration-300">
                <div className="overflow-hidden border-b border-moss">
                  <LightboxTrigger 
                    src={oldBookImages[index % oldBookImages.length]}
                    alt={post.title}
                    caption={post.title}
                  >
                    <div className="aspect-[4/3] overflow-hidden flex-shrink-0 bg-deep-olive cursor-pointer">
                      <img 
                        src={oldBookImages[index % oldBookImages.length]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </LightboxTrigger>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((t) => (
                      <Link
                        key={t}
                        to={`/tags/${encodeURIComponent(t)}`}
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors underline-hover"
                        style={{ 
                          backgroundColor: `${getTagColor(t)}20`, 
                          color: getTagColor(t)
                        }}
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                  
                  <h2 className="font-serif text-base font-bold mb-2">
                    <Link to={`/blog/${post.slug}`} className="text-earth-tan hover:text-cream hover:text-tomato transition-colors underline-hover">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="font-sans text-earth-tan text-sm line-clamp-2 mb-3 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-earth-muted font-sans mt-auto pt-2 border-t border-moss/50">
                    <span className="underline-hover">{post.date}</span>
                    <span>·</span>
                    <span className="underline-hover">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-tan mb-4">No articles found with the selected tags.</p>
              <button 
                onClick={clearTags}
                className="inline-flex items-center gap-2 text-olive-light hover:text-tomato transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="px-6 py-8 border-t border-moss">
        <div className="max-w-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-lg font-semibold text-cream hover:text-tomato transition-colors">
            George
          </Link>
          <div className="flex items-center gap-6 text-sm text-earth-tan">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cream transition-colors">Home</Link>
            <Link to="/tags" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cream transition-colors">Tags</Link>
            <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cream transition-colors">Projects</Link>
            <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cream transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tags;
