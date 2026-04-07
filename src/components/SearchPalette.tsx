import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  type: 'post' | 'tag';
  url: string;
}

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: SearchItem[];
}

const SearchPalette = ({ isOpen, onClose, items }: SearchPaletteProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevIsOpenRef = useRef(isOpen);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: SearchItem) => {
    navigate(item.url);
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-deep-olive/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative mx-4 sm:mx-6 lg:mx-8 max-w-md mt-20"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 bg-deep-forest border border-moss rounded-lg">
          <Search className="w-5 h-5 text-earth-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search writings or tags..."
            className="flex-1 bg-transparent text-cream placeholder:text-earth-muted font-serif focus:outline-none"
          />
          <div className="flex items-center gap-1 text-xs text-earth-muted font-mono">
            <kbd className="px-2 py-1 bg-deep-olive border border-moss rounded">ESC</kbd>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-4 px-4 py-6 text-center text-earth-muted">
            <p className="font-mono text-sm">No results found for "{query}"</p>
          </div>
        ) : (
          <>
            <div className="px-4 py-2 text-xs text-earth-muted font-mono uppercase tracking-wider">
              {filteredItems.length} results
            </div>
            <div className="max-h-[400px] overflow-y-auto space-y-1 bg-deep-forest border border-moss rounded-lg">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-deep-sage transition-colors ${index === selectedIndex ? 'bg-deep-sage' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-earth-muted">
                      {item.type === 'post' && <span className="text-olive-light">•</span>}
                      {item.type === 'tag' && <span className="text-olive-light">#</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-sm text-cream">{item.title}</p>
                      <p className="text-xs text-earth-muted font-mono capitalize">{item.type}</p>
                    </div>
                  </div>
                  {index === selectedIndex && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-olive-light"></div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex items-center justify-between px-4 py-2 text-xs text-earth-muted font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-deep-forest border border-moss rounded">↑↓</kbd>
              to navigate
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-deep-forest border border-moss rounded">↵</kbd>
              to select
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPalette;
