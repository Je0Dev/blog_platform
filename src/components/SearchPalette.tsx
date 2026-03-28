import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Hash, Command } from 'lucide-react';
import gsap from 'gsap';

interface SearchItem {
  id: string;
  title: string;
  type: 'post' | 'tag' | 'category';
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
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
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const handleSelect = useCallback((item: SearchItem) => {
    navigate(item.url);
    onClose();
  }, [navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="search-overlay"
      onClick={onClose}
    >
      <div 
        className="search-box mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-tech-border">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search posts, tags, or categories..."
            className="search-input flex-1"
          />
          <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
            <kbd className="px-2 py-1 bg-tech-surface rounded">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="font-mono text-sm">No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
                {filteredItems.length} results
              </div>
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`command-item ${index === selectedIndex ? 'active' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {item.type === 'post' && <FileText className="w-4 h-4 text-tech-cyan" />}
                  {item.type === 'tag' && <Hash className="w-4 h-4 text-tech-pink" />}
                  {item.type === 'category' && <Command className="w-4 h-4 text-tech-green" />}
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                  </div>
                  {index === selectedIndex && (
                    <span className="text-xs text-tech-cyan font-mono">↵</span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-tech-border text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-tech-surface rounded">↑↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-tech-surface rounded">↵</kbd>
              to select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPalette;
