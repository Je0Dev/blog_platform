import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import TagCloud from '../components/TagCloud';

const RecentBlogs = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()))
    : posts;

  return (
    <section className="pt-16 pb-12">
      <div className="max-w-prose mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-cream mb-4">
          Recent Writing
        </h2>
        <p className="font-sans text-earth-tan mb-8">
          Thoughts on technology, craftsmanship, and the practice of building.
        </p>
        
        <TagCloud onTagSelect={setSelectedTag} selectedTag={selectedTag} />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block bg-deep-forest border border-moss rounded-lg overflow-hidden hover:bg-deep-sage transition-colors duration-200"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 text-xs font-sans bg-deep-olive border border-moss rounded-full hover:bg-olive-light hover:text-deep-olive transition-colors no-underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                
                <h3 className="font-serif text-xl font-bold text-cream mb-2 line-clamp-2 group-hover:text-olive-light transition-colors">
                  {post.title}
                </h3>
                
                <p className="font-sans text-earth-tan text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs font-sans text-earth-muted">
                  <span>{post.date}</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-earth-tan">No posts found for this tag.</p>
            <Link 
              to="/tags"
              className="inline-flex items-center justify-center mt-4 px-4 py-2 border border-moss text-cream font-sans hover:bg-deep-sage transition-colors no-underline"
            >
              Browse all tags
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBlogs;
