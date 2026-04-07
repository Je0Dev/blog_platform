import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

const LatestPosts = () => {
  const featuredPosts = posts.filter(p => p.tableOfContents.length > 0).slice(0, 3);

  return (
    <section className="pt-16 pb-12">
      <div className="max-w-prose mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-cream mb-4">
          In-Depth Writing
        </h2>
        <p className="font-sans text-earth-tan mb-12">
          Longer pieces with detailed exploration and practical examples.
        </p>
        
        <div className="space-y-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="border-b border-moss pb-8 last:border-b-0">
              <Link to={`/blog/${post.slug}`} className="no-underline">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                  <div className="w-full md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2 text-xs font-sans text-earth-muted">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/tags/${encodeURIComponent(tag)}`}
                          className="px-2 py-0.5 bg-deep-forest border border-moss rounded-full hover:bg-olive-light hover:text-deep-olive transition-colors no-underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold text-cream mb-2 line-clamp-2 hover:text-olive-light transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="font-sans text-earth-tan text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs font-sans text-earth-muted">
                      <span>{post.date}</span>
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
