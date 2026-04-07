import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Star, ArrowRight, ArrowUp, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl: string;
  stars: number;
  language: string;
  giphyUrl?: string;
  illustrationUrl?: string;
  features?: string[];
  relatedTags?: string[];
}

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
];

const projects: Project[] = [
  {
    id: '1',
    name: 'esp32OffboardTimerSensor',
    description: 'Environmental sensor with configurable intervals.',
    longDescription: 'Built for IoT projects requiring periodic data collection. Uses FreeRTOS for task scheduling and handles sensor calibration automatically.',
    tags: ['ESP32', 'C++', 'Embedded'],
    githubUrl: 'https://github.com/Je0Dev/esp32OffboardTimerSensor',
    stars: 1,
    language: 'C++',
    illustrationUrl: oldBookImages[0],
    features: ['FreeRTOS integration', 'I2C/SPI support', 'Deep sleep modes'],
    relatedTags: ['iot', 'hardware'],
  },
  {
    id: '2',
    name: 'ImbdCloneApp',
    description: 'Movie database with REST API.',
    longDescription: 'A full-stack application demonstrating data modeling patterns. Features pagination, filtering, and relationship management between movies, actors, and directors.',
    tags: ['Java', 'API', 'Learning'],
    githubUrl: 'https://github.com/Je0Dev/ImdbCloneApp',
    stars: 1,
    language: 'Java',
    illustrationUrl: oldBookImages[1],
    features: ['REST API design', 'Relational modeling', 'JPA/Hibernate'],
    relatedTags: ['data modeling', 'api design'],
  },
  {
    id: '3',
    name: 'cli_atm_system',
    description: 'ATM simulation with account management.',
    longDescription: 'Practicing C fundamentals through a realistic banking scenario. Implements file-based persistence and demonstrates clean architecture in a CLI context.',
    tags: ['C', 'CLI', 'Learning'],
    githubUrl: 'https://github.com/Je0Dev/cli_atm_system',
    stars: 1,
    language: 'C',
    illustrationUrl: oldBookImages[2],
    features: ['File I/O', 'Account transactions', 'Input validation'],
    relatedTags: ['software design'],
  },
  {
    id: '4',
    name: 'cli_student_database',
    description: 'Student records with search and CRUD.',
    longDescription: 'A practical exercise in data structures and file handling. Supports searching by name, ID, or grade, with sorted output options.',
    tags: ['C', 'CLI', 'Database'],
    githubUrl: 'https://github.com/Je0Dev/cli_student_database_management_system',
    stars: 1,
    language: 'C',
    illustrationUrl: oldBookImages[3],
    features: ['Binary file storage', 'Quick search', 'Report generation'],
    relatedTags: ['database', 'data modeling'],
  },
  {
    id: '5',
    name: 'cli_task_manager',
    description: 'Task tracker with full CRUD operations.',
    longDescription: 'Built to understand CLI design patterns and data persistence. Supports priorities, due dates, and filtering by status.',
    tags: ['C', 'CLI', 'Productivity'],
    githubUrl: 'https://github.com/Je0Dev/cli_task_manager_system',
    stars: 1,
    language: 'C',
    illustrationUrl: oldBookImages[4],
    features: ['JSON export', 'Priority levels', 'Due date tracking'],
    relatedTags: ['software design', 'craftsmanship'],
  },
  {
    id: '6',
    name: 'personal_website',
    description: 'This digital garden — built with care.',
    longDescription: 'A place for writing about technology, craftsmanship, and the practice of building things that last. Inspired by the quiet web.',
    tags: ['TypeScript', 'React', 'Web'],
    githubUrl: 'https://github.com/Je0Dev/personal_website',
    stars: 1,
    language: 'TypeScript',
    illustrationUrl: oldBookImages[5],
    features: ['Markdown rendering', 'Dark theme', 'RSS feed'],
    relatedTags: ['personal website', 'digital garden', 'indieweb'],
  },
];

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = '1';
    }
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 768) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, projects.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + columns, projects.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - columns, 0));
    } else if (e.key === 'Enter' && projects[selectedIndex]) {
      e.preventDefault();
      window.open(projects[selectedIndex].githubUrl, '_blank', 'noopener,noreferrer');
    } else if (e.key === 'Escape') {
      setSelectedIndex(-1);
    }
  }, [selectedIndex, columns]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedIndex !== -1 && cardsRef.current) {
      const card = cardsRef.current.children[selectedIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedIndex]);

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
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-cream">
              Open Source <span className="text-olive-light">Projects</span>
            </h1>
            <p className="font-sans text-base text-earth-tan max-w-2xl mx-auto">
              A collection of tools built to <strong className="text-cream">learn</strong>, 
              <strong className="text-cream"> experiment</strong>, and 
              <strong className="text-cream"> solve problems</strong>. 
              Each project is an exercise in <Link to="/tags/craftsmanship" className="text-olive-light hover:text-tomato">craftsmanship</Link>.
            </p>
            <p className="font-sans text-sm text-earth-muted mt-3">
              Find me on <a href="https://github.com/Je0Dev" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:text-tomato">GitHub</a> or 
              browse by <Link to="/tags" className="text-olive-light hover:text-tomato">topic</Link>.
            </p>
          </div>
          
          <div className="illustration-container max-w-xl mx-auto">
            <img 
              src={oldBookImages[0]}
              alt="Antique illustration from Old Book Illustrations"
              className="w-full rounded-lg shadow-md"
              loading="eager"
            />
            <p className="illustration-caption">Forging code, one project at a time</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-16">
        <div className="max-w-wide mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-earth-muted text-sm">
              {projects.length} projects
            </p>
            <div className="flex items-center gap-2 text-xs text-earth-muted font-mono">
              <span className="flex items-center gap-1"><ArrowLeft className="w-3 h-3" /><ArrowRight className="w-3 h-3" /> navigate</span>
              <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /> up/down</span>
              <span>↵ open</span>
            </div>
          </div>
          <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project, index) => (
              <article 
                key={project.id}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(-1)}
                className={`bg-deep-forest border rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedIndex === index 
                    ? 'border-olive-light shadow-lg shadow-olive/10 scale-[1.02]' 
                    : 'border-moss hover:border-earth-tan'
                }`}
              >
                <div 
                  className="aspect-[4/3] overflow-hidden bg-deep-olive cursor-pointer"
                  onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                >
                  <img
                    src={project.illustrationUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-serif text-sm font-bold truncate mr-2">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream hover:text-tomato transition-colors underline-hover"
                      >
                        {project.name}
                      </a>
                    </h2>
                    <div className="flex items-center gap-1 text-earth-muted text-xs flex-shrink-0">
                      <Star className="w-3 h-3" />
                      {project.stars}
                    </div>
                  </div>
                  
                  <p className="font-sans text-earth-tan text-xs mb-3">
                    {project.description}
                  </p>

                  {project.longDescription && (
                    <p className="font-sans text-earth-muted text-xs mb-3 line-clamp-2">
                      {project.longDescription}
                    </p>
                  )}

                  {project.features && project.features.length > 0 && (
                    <div className="mb-3">
                      <span className="text-xs text-earth-muted font-semibold">Features: </span>
                      <span className="text-xs text-earth-tan">
                        {project.features.join(' · ')}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${encodeURIComponent(tag)}`}
                        className="tag-pill text-[10px] px-1.5 py-0.5"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  {project.relatedTags && project.relatedTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-xs">
                      <span className="text-earth-muted font-semibold">Related:</span>
                      {project.relatedTags.map((tag, i) => (
                        <span key={tag}>
                          <Link
                            to={`/tags/${encodeURIComponent(tag)}`}
                            className="text-olive-light hover:text-tomato transition-colors"
                          >
                            {tag}
                          </Link>
                          {i < project.relatedTags!.length - 1 && <span className="text-earth-muted">·</span>}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-deep-olive border border-moss rounded text-xs text-earth-tan hover:bg-deep-sage hover:border-earth-tan transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Source
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 text-olive-light hover:text-tomato text-xs transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
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

export default Projects;
