import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface Tag {
  name: string;
  count: number;
  color: string;
}

interface TagCloudProps {
  onTagSelect: (tag: string | null) => void;
  selectedTag: string | null;
}

const tags: Tag[] = [
  { name: 'JavaScript', count: 24, color: '#f7df1e' },
  { name: 'TypeScript', count: 18, color: '#3178c6' },
  { name: 'React', count: 22, color: '#61dafb' },
  { name: 'Node.js', count: 15, color: '#339933' },
  { name: 'Python', count: 12, color: '#3776ab' },
  { name: 'Rust', count: 8, color: '#dea584' },
  { name: 'Go', count: 6, color: '#00add8' },
  { name: 'WebDev', count: 30, color: '#00f5ff' },
  { name: 'AI', count: 14, color: '#a855f7' },
  { name: 'DevOps', count: 10, color: '#ff6b35' },
  { name: 'Database', count: 9, color: '#ff3366' },
  { name: 'Security', count: 7, color: '#00ff88' },
];

const TagCloud = ({ onTagSelect, selectedTag }: TagCloudProps) => {
  return (
    <div className="bg-tech-surface rounded-2xl p-6 border border-tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-oswald text-xl font-bold">Popular Tags</h3>
        {selectedTag && (
          <button
            onClick={() => onTagSelect(null)}
            className="flex items-center gap-1 text-xs text-tech-cyan hover:underline"
          >
            <X className="w-3 h-3" />
            Clear filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${encodeURIComponent(tag.name)}`}
            className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === tag.name
                ? 'text-black'
                : 'text-white hover:scale-105'
            }`}
            style={{
              background: selectedTag === tag.name
                ? tag.color
                : `${tag.color}15`,
              border: `1px solid ${selectedTag === tag.name ? tag.color : `${tag.color}40`}`,
              boxShadow: selectedTag === tag.name
                ? `0 0 20px ${tag.color}50`
                : 'none',
            }}
          >
            <span className="flex items-center gap-2">
              #{tag.name}
              <span 
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedTag === tag.name ? 'bg-black/20' : 'bg-white/10'
                }`}
              >
                {tag.count}
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* Active filter indicator */}
      {selectedTag && (
        <div className="mt-4 pt-4 border-t border-tech-border">
          <p className="text-sm text-gray-400">
            Showing posts tagged with <span className="text-tech-cyan font-medium">#{selectedTag}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TagCloud;
