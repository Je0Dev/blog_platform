import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Star,
  Code2,
  Cpu,
  Globe,
  Database
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  language: string;
  color: string;
  icon: React.ElementType;
  features: string[];
}

const projects: Project[] = [
  {
    id: '1',
    name: 'ts-pattern-matcher',
    description: 'Pattern matching library for TypeScript',
    longDescription: 'A powerful pattern matching library for TypeScript that brings functional programming patterns to your codebase. Supports exhaustive matching, guards, and nested patterns.',
    tags: ['TypeScript', 'Functional Programming'],
    githubUrl: 'https://github.com/alex/ts-pattern-matcher',
    liveUrl: 'https://ts-pattern-matcher.dev',
    stars: 1247,
    language: 'TypeScript',
    color: '#3178c6',
    icon: Code2,
    features: [
      'Exhaustive pattern matching',
      'Type inference support',
      'Guard clauses',
      'Nested pattern support',
    ],
  },
  {
    id: '2',
    name: 'chat-app-realtime',
    description: 'Real-time chat with WebSockets',
    longDescription: 'A full-featured real-time chat application built with WebSockets, featuring rooms, private messages, file sharing, and end-to-end encryption.',
    tags: ['Node.js', 'WebSockets', 'React'],
    githubUrl: 'https://github.com/alex/chat-app-realtime',
    liveUrl: 'https://chat-demo.alex.dev',
    stars: 892,
    language: 'JavaScript',
    color: '#339933',
    icon: Globe,
    features: [
      'Real-time messaging',
      'Private and group rooms',
      'File sharing',
      'End-to-end encryption',
    ],
  },
  {
    id: '3',
    name: 'wasm-image-processor',
    description: 'High-performance image processing',
    longDescription: 'WebAssembly-powered image processing library written in Rust. Processes images at near-native speed directly in the browser.',
    tags: ['Rust', 'WebAssembly', 'Performance'],
    githubUrl: 'https://github.com/alex/wasm-image-processor',
    liveUrl: 'https://wasm-image.alex.dev',
    stars: 2156,
    language: 'Rust',
    color: '#dea584',
    icon: Cpu,
    features: [
      'Near-native performance',
      'Multiple filter effects',
      'Batch processing',
      'Zero dependencies',
    ],
  },
  {
    id: '4',
    name: 'go-worker-pool',
    description: 'Flexible worker pool in Go',
    longDescription: 'A production-ready worker pool implementation for Go with support for dynamic scaling, priority queues, and graceful shutdown.',
    tags: ['Go', 'Concurrency', 'Backend'],
    githubUrl: 'https://github.com/alex/go-worker-pool',
    stars: 743,
    language: 'Go',
    color: '#00add8',
    icon: Database,
    features: [
      'Dynamic scaling',
      'Priority queues',
      'Graceful shutdown',
      'Metrics and monitoring',
    ],
  },
  {
    id: '5',
    name: 'nextjs-rsc-demo',
    description: 'React Server Components demo',
    longDescription: 'A comprehensive demo application showcasing React Server Components with Next.js App Router, featuring streaming, suspense, and server actions.',
    tags: ['React', 'Next.js', 'Server Components'],
    githubUrl: 'https://github.com/alex/nextjs-rsc-demo',
    liveUrl: 'https://rsc-demo.alex.dev',
    stars: 1567,
    language: 'TypeScript',
    color: '#61dafb',
    icon: Code2,
    features: [
      'Server Components patterns',
      'Streaming SSR',
      'Server Actions',
      'Caching strategies',
    ],
  },
  {
    id: '6',
    name: 'data-analysis-toolkit',
    description: 'Pandas utilities collection',
    longDescription: 'A collection of utilities and helper functions for data analysis with Pandas, including data validation, transformation pipelines, and visualization helpers.',
    tags: ['Python', 'Pandas', 'Data Science'],
    githubUrl: 'https://github.com/alex/data-analysis-toolkit',
    stars: 523,
    language: 'Python',
    color: '#3776ab',
    icon: Database,
    features: [
      'Data validation helpers',
      'Transformation pipelines',
      'Visualization utilities',
      'Performance optimizations',
    ],
  },
];

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
      );

      const cards = projectsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

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
      <header ref={headerRef} className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Open Source <span className="text-tech-cyan">Projects</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of tools and libraries I've built to solve real-world problems. 
            All projects are open source and available on GitHub.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <div ref={projectsRef} className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group p-6 bg-tech-surface rounded-2xl border border-tech-border hover:border-tech-cyan transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                >
                  <project.icon className="w-6 h-6" style={{ color: project.color }} />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    {project.stars.toLocaleString()}
                  </a>
                </div>
              </div>

              {/* Content */}
              <h2 className="font-oswald text-xl font-bold mb-2 group-hover:text-tech-cyan transition-colors">
                {project.name}
              </h2>
              <p className="text-gray-400 mb-4">{project.longDescription}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-tech-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-tech-bg border border-tech-border rounded-full text-xs hover:border-tech-cyan transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-tech-bg border border-tech-border rounded-lg hover:border-white transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-tech-cyan text-black rounded-lg hover:shadow-glow transition-all text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
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

export default Projects;
