
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { 
  Calendar, User, Tag, Facebook, Twitter, Linkedin, 
  ArrowLeft, Instagram, Youtube, Share2
} from 'lucide-react';
import AdContainer from '../components/AdContainer';
import { useSEO } from '../hooks/useSEO';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const props = { className: "w-4 h-4" };
  if (p === 'facebook') return <Facebook {...props} />;
  if (p === 'twitter') return <Twitter {...props} />;
  if (p === 'instagram') return <Instagram {...props} />;
  if (p === 'linkedin') return <Linkedin {...props} />;
  if (p === 'youtube') return <Youtube {...props} />;
  if (p === 'tiktok') return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
  return <Share2 {...props} />;
};

const getSocialColorClass = (platform: string) => {
  const p = platform.toLowerCase();
  if (p === 'facebook') return 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white';
  if (p === 'twitter') return 'bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white';
  if (p === 'instagram') return 'bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white';
  if (p === 'linkedin') return 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white';
  if (p === 'youtube') return 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white';
  return 'bg-gray-50 text-gray-600 hover:bg-gray-600 hover:text-white';
};

const BASE_URL = 'https://www.alexaratravel.com';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const { posts, settings } = useSite();
  const post = posts.find(p => p.slug === slug);

  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": { "@type": "Person", "name": post.author },
    "publisher": {
      "@type": "Organization",
      "name": settings.siteName || "Alexara Travel",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` }
  } : undefined;

  useSEO({
    title: post ? `${post.title} | ${settings.siteName || 'Alexara Travel'}` : 'Blog | Alexara Travel',
    description: post?.excerpt,
    canonical: post ? `/blog/${post.slug}` : '/blog',
    ogImage: post?.image,
    ogType: 'article',
    schema: articleSchema,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <Link to="/blog" className="text-secondary hover:underline">Return to Blog</Link>
      </div>
    );
  }

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;

  return (
    <div className="bg-white min-h-screen pb-20 pt-20">
      <div className="h-[60vh] relative w-full bg-slate-900 overflow-hidden">
        {post.video ? (
          <video src={post.video} autoPlay loop muted playsInline poster={post.image}
            className="w-full h-full object-cover opacity-60" />
        ) : (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="flex items-center space-x-4 text-white/70 text-sm mb-4">
              {post.tags[0] && (
                <span className="bg-secondary/90 px-3 py-1 rounded-full uppercase tracking-wider">{post.tags[0]}</span>
              )}
              <span>{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-10 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <div className="flex items-center space-x-4 mb-10 pb-8 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{post.author}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</span>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 font-light italic mb-8 leading-relaxed border-l-4 border-secondary pl-6">
              {post.excerpt}
            </p>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n').map((paragraph, idx) =>
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
              <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer">{tag}</span>
              ))}
            </div>
            <div className="mt-10">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Share this article</p>
              <div className="flex space-x-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
          <aside className="space-y-8">
            <AdContainer placement="sidebar" />
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">More Articles</h3>
              <div className="space-y-4">
                {posts.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group block">
                    <img src={p.image} alt={p.title} className="w-full h-28 object-cover rounded-xl mb-2 group-hover:opacity-80 transition-opacity" />
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-secondary transition-colors leading-tight">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{p.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
