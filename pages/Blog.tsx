
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Calendar, User, ArrowRight, BookOpen, Map, Bed, Plane, Zap, Tag, Globe } from 'lucide-react';
import AdContainer from '../components/AdContainer';

const Blog: React.FC = () => {
  const { posts, settings, t } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically map settings categories to icons
  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('guide')) return <Map className="w-4 h-4" />;
    if (n.includes('review') || n.includes('hotel')) return <Bed className="w-4 h-4" />;
    if (n.includes('tip') || n.includes('hack')) return <Zap className="w-4 h-4" />;
    if (n.includes('deal') || n.includes('flight')) return <Plane className="w-4 h-4" />;
    if (n.includes('destination')) return <Globe className="w-4 h-4" />;
    return <Tag className="w-4 h-4" />;
  };

  const categories = useMemo(() => {
    const list = settings.blogCategories || [];
    return [
      { name: 'All', icon: <BookOpen className="w-4 h-4" /> },
      ...list.map(name => ({ name, icon: getCategoryIcon(name) }))
    ];
  }, [settings.blogCategories]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(post => post.tags.some(tag => tag === activeCategory));
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t('blog_title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Expert guides, honest reviews, and the latest travel deals curated for the global explorer.</p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${
                        activeCategory === cat.name 
                        ? 'bg-primary text-white border-primary shadow-xl scale-105' 
                        : 'bg-white text-gray-600 border-gray-100 hover:border-secondary shadow-sm'
                    }`}
                >
                    {cat.icon}
                    {cat.name}
                </button>
            ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && (
          <div className="mb-20">
            <Link to={`/blog/${featuredPost.slug}`} className="group block relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px]">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-12 md:p-20">
                <div className="max-w-4xl">
                  <div className="flex items-center text-white/80 text-xs mb-6 space-x-6 font-bold uppercase tracking-[0.2em]">
                    <span className="bg-secondary text-white px-4 py-1.5 rounded-xl font-black">{featuredPost.tags[0]}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-secondary" /> {featuredPost.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-2 text-secondary" /> {featuredPost.author}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 group-hover:text-secondary transition-colors leading-tight">{featuredPost.title}</h2>
                  <p className="text-xl text-gray-200 mb-10 line-clamp-2 md:line-clamp-none font-light leading-relaxed">{featuredPost.excerpt}</p>
                  <span className="inline-flex items-center bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl group-hover:bg-secondary group-hover:text-white transition-all">{t('blog_read_full')} <ArrowRight className="ml-3 w-5 h-5" /></span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(activeCategory === 'All' ? remainingPosts : filteredPosts).map((post) => (
                <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 group">
                <Link to={`/blog/${post.slug}`} className="block h-64 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">{post.tags[0]}</span>
                    </div>
                </Link>
                <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 space-x-4">
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5 text-secondary" /> {post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-secondary transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed font-medium">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="text-primary font-black text-xs uppercase tracking-widest flex items-center group-hover:text-secondary transition-colors">
                        {t('blog_read_more')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                </article>
            ))}
            </div>
        ) : (
            <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                <BookOpen className="w-16 h-16 mx-auto mb-6 text-gray-100" />
                <h3 className="text-2xl font-serif font-bold text-gray-400">No articles in this category.</h3>
                <p className="text-gray-300 text-sm mt-2">Try browsing our other travel expertise collections.</p>
            </div>
        )}

        {/* Global Ad Banner */}
        {settings.ads?.enabled && settings.ads?.headerBanner && (
            <div className="mt-24 flex justify-center">
                <AdContainer code={settings.ads.headerBanner} label="Travel Inspiration Sponsor" />
            </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
