
import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import AdContainer from '../components/AdContainer';

const Blog: React.FC = () => {
  const { posts, settings, t } = useSite();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t('blog_title')}</h1>
          <p className="text-lg text-gray-600">{t('blog_subtitle')}</p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Link to={`/blog/${featuredPost.id}`} className="group block relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-3xl">
                  <div className="flex items-center text-white/80 text-sm mb-4 space-x-4">
                    <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-bold uppercase">{featuredPost.tags[0]}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {featuredPost.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {featuredPost.author}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 group-hover:text-secondary transition-colors leading-tight">{featuredPost.title}</h2>
                  <p className="text-lg text-gray-200 mb-6 line-clamp-2 md:line-clamp-none">{featuredPost.excerpt}</p>
                  <span className="inline-flex items-center text-white font-bold border-b-2 border-secondary pb-1">{t('blog_read_full')} <ArrowRight className="ml-2 w-5 h-5" /></span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full border border-gray-100">
              <Link to={`/blog/${post.id}`} className="block h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                   <span className="text-secondary font-bold uppercase">{post.tags[0]}</span>
                   <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-secondary transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-primary font-bold text-sm hover:underline mt-auto">{t('blog_read_more')}</Link>
              </div>
            </article>
          ))}
        </div>

        {/* Global Ad Banner */}
        {settings.ads?.enabled && settings.ads?.headerBanner && (
            <div className="mt-20 flex justify-center">
                <AdContainer code={settings.ads.headerBanner} label="Travel Inspiration Sponsor" />
            </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
