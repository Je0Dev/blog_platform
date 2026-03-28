import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  MapPin,
  Briefcase,
  Code2,
  Globe,
  Heart
} from 'lucide-react';
import { posts } from '../data/posts';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'JavaScript/TypeScript', level: 95 },
  { name: 'React/Next.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Rust', level: 70 },
  { name: 'Go', level: 65 },
];

const experiences = [
  {
    company: 'TechCorp',
    role: 'Senior Full-Stack Developer',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
  },
  {
    company: 'StartupXYZ',
    role: 'Full-Stack Developer',
    period: '2020 - 2022',
    description: 'Built real-time collaboration features and optimized application performance.',
  },
  {
    company: 'Digital Agency',
    role: 'Frontend Developer',
    period: '2018 - 2020',
    description: 'Developed responsive web applications for various clients.',
  },
];

const About = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalArticles = posts.length;
  const totalReadTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readTime);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
      );

      const sections = contentRef.current?.querySelectorAll('.about-section');
      if (sections) {
        gsap.fromTo(sections,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
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
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img 
              src="/hero.jpg" 
              alt="Alex Chen"
              className="w-32 h-32 rounded-full object-cover border-4 border-tech-cyan"
            />
            <div className="text-center md:text-left">
              <h1 className="font-oswald text-4xl sm:text-5xl font-bold mb-2">
                Alex Chen
              </h1>
              <p className="text-xl text-gray-400 mb-4">
                Full-Stack Developer & Technical Writer
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  Available for freelance
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-tech-surface border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-tech-surface border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-tech-surface border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@alex.dev"
              className="p-3 bg-tech-surface border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div ref={contentRef} className="px-6 lg:px-12 pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Bio */}
          <section className="about-section">
            <h2 className="font-oswald text-2xl font-bold mb-4 text-tech-cyan">About Me</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a full-stack developer with a passion for building scalable, performant applications 
                and sharing knowledge with the developer community. With over 6 years of experience, 
                I've worked on everything from real-time collaboration tools to high-traffic web applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me writing technical articles, contributing to open source, 
                or exploring new technologies. I believe in the power of clean code, thorough documentation, 
                and continuous learning.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="about-section">
            <h2 className="font-oswald text-2xl font-bold mb-6 text-tech-cyan">Blog Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-tech-surface rounded-xl border border-tech-border text-center">
                <Code2 className="w-6 h-6 text-tech-cyan mx-auto mb-2" />
                <p className="font-oswald text-3xl font-bold">{totalArticles}</p>
                <p className="text-sm text-gray-500">Articles</p>
              </div>
              <div className="p-6 bg-tech-surface rounded-xl border border-tech-border text-center">
                <Globe className="w-6 h-6 text-tech-purple mx-auto mb-2" />
                <p className="font-oswald text-3xl font-bold">{totalReadTime}</p>
                <p className="text-sm text-gray-500">Minutes of Content</p>
              </div>
              <div className="p-6 bg-tech-surface rounded-xl border border-tech-border text-center">
                <Heart className="w-6 h-6 text-tech-pink mx-auto mb-2" />
                <p className="font-oswald text-3xl font-bold">10K+</p>
                <p className="text-sm text-gray-500">Monthly Readers</p>
              </div>
              <div className="p-6 bg-tech-surface rounded-xl border border-tech-border text-center">
                <Github className="w-6 h-6 text-tech-green mx-auto mb-2" />
                <p className="font-oswald text-3xl font-bold">6</p>
                <p className="text-sm text-gray-500">Open Source Projects</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="about-section">
            <h2 className="font-oswald text-2xl font-bold mb-6 text-tech-cyan">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-tech-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-tech-cyan to-tech-purple rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="about-section">
            <h2 className="font-oswald text-2xl font-bold mb-6 text-tech-cyan">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-tech-surface rounded-xl border border-tech-border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <span className="text-sm text-tech-cyan">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{exp.company}</p>
                  <p className="text-gray-500">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="about-section text-center py-8">
            <h2 className="font-oswald text-2xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-gray-400 mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@alex.dev"
                className="px-8 py-3 bg-tech-cyan text-black font-medium rounded-lg hover:shadow-glow transition-all"
              >
                Get in Touch
              </a>
              <Link
                to="/projects"
                className="px-8 py-3 border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
              >
                View Projects
              </Link>
            </div>
          </section>
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

export default About;
