import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center max-w-prose mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-cream">
          <span className="block">Building</span>
          <span className="block text-olive-light">thoughtfully</span>
        </h1>
        <p className="font-sans text-lg text-earth-tan max-w-prose mx-auto mb-8 leading-relaxed">
          Full-stack developer sharing insights on technology, craftsmanship, 
          and the quiet joy of making things that last.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/tags"
            className="inline-flex items-center justify-center px-6 py-3 bg-olive-light text-deep-olive font-sans font-medium rounded hover:bg-olive transition-colors"
          >
            Read the Writing
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-moss text-cream font-sans font-medium rounded hover:border-olive-light transition-colors"
          >
            See the Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
