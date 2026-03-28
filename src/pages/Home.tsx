import { useState, useCallback } from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import RecentBlogs from '../sections/RecentBlogs';
import Categories from '../sections/Categories';
import Newsletter from '../sections/Newsletter';
import LatestPosts from '../sections/LatestPosts';
import Footer from '../sections/Footer';
import SearchPalette from '../components/SearchPalette';
import { posts } from '../data/posts';

interface SearchItem {
  id: string;
  title: string;
  type: 'post' | 'tag' | 'category';
  url: string;
}

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchItems: SearchItem[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    type: 'post',
    url: `/blog/${post.slug}`,
  }));

  // Add tags to search
  const allTags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));
  allTags.forEach(tag => {
    searchItems.push({
      id: `tag-${tag}`,
      title: tag,
      type: 'tag',
      url: `/tags/${encodeURIComponent(tag)}`,
    });
  });

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return (
    <>
      <SearchPalette 
        isOpen={isSearchOpen} 
        onClose={handleSearchClose}
        items={searchItems}
      />
      <Header onSearchClick={handleSearchClick} />
      <main>
        <Hero />
        <RecentBlogs />
        <Categories />
        <Newsletter />
        <LatestPosts />
      </main>
      <Footer />
    </>
  );
};

export default Home;
