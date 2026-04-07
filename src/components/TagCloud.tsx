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
  { name: 'Craftsmanship', count: 3, color: '#8b9b6b' },
  { name: 'Software Engineering', count: 2, color: '#8b9b6b' },
  { name: 'Philosophy', count: 1, color: '#c45c3e' },
  { name: 'IndieWeb', count: 1, color: '#8b9b6b' },
  { name: 'Personal Website', count: 1, color: '#8b9b6b' },
  { name: 'Digital Garden', count: 1, color: '#8b9b6b' },
  { name: 'Rust', count: 1, color: '#dea584' },
  { name: 'Learning', count: 3, color: '#c4a06e' },
  { name: 'Systems Programming', count: 1, color: '#dea584' },
  { name: 'ESP32', count: 1, color: '#6b7b4b' },
  { name: 'Embedded', count: 1, color: '#6b7b4b' },
  { name: 'Hardware', count: 1, color: '#6b7b4b' },
  { name: 'IoT', count: 1, color: '#6b7b4b' },
  { name: 'CLI', count: 3, color: '#c4a06e' },
  { name: 'C', count: 3, color: '#8b7355' },
  { name: 'Unix', count: 1, color: '#c4a06e' },
  { name: 'Software Design', count: 1, color: '#8b9b6b' },
  { name: 'Java', count: 1, color: '#b07219' },
  { name: 'API Design', count: 1, color: '#61dafb' },
  { name: 'Data Modeling', count: 1, color: '#61dafb' },
];

const TagCloud = ({ onTagSelect, selectedTag }: TagCloudProps) => {
  return (
    <div className="mt-8 bg-deep-forest border border-moss rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans text-sm font-semibold text-earth-muted uppercase tracking-wider">
          Filter by Topic
        </h3>
        {selectedTag && (
          <button
            onClick={() => onTagSelect(null)}
            className="flex items-center gap-1 text-xs text-olive-light hover:text-cream transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${encodeURIComponent(tag.name)}`}
            className={`group px-3 py-1.5 rounded-full text-sm font-sans transition-colors no-underline ${
                selectedTag === tag.name
                  ? 'bg-olive-light text-deep-olive'
                  : 'bg-deep-olive border border-moss text-earth-tan hover:bg-deep-sage hover:text-cream'
            }`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>

      {selectedTag && (
        <div className="mt-4 pt-4 border-t border-moss">
          <p className="text-sm text-earth-tan">
            Showing posts tagged with <span className="text-olive-light font-medium">#{selectedTag}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TagCloud;
