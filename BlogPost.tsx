
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { 
  Calendar, User, Tag, Facebook, Twitter, Linkedin, 
  ArrowLeft, Instagram, Youtube, Share2, Github
} from 'lucide-react';
import AdContainer from '../components/AdContainer';

// Helper to get icon by platform name, matching the footer logic
const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const props = { className: "w-4 h-4" };

  if (p === 'facebook') return <Facebook {...props} />;
  if (p === 'twitter') return <Twitter {...props} />;
  if (p === 'instagram') return <Instagram {...props} />;
  if (p === 'linkedin') return <Linkedin {...props} />;
  if (p === 'youtube') return <Youtube {...props} />;
  
  // Custom SVGs for other common platforms
  if (p === 'tiktok') return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
  if (p === 'pinterest') return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <line x1="12" y1="5" x2="12" y2="19" />
       <line x1="5" y1="12" x2="19" y2="12" />
       <path d="M9 5c2-2 5-2 7 0" />
       <circle cx="12" cy="12" r="10" />
    </svg>
  );

  return <Share2 {...props} />;
};

// Helper to get platform-specific branding colors
const getSocialColorClass = (platform: string) => {
  const p = platform.toLowerCase();
  if (p === 'facebook') return 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white';
  if (p === 'twitter') return 'bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white';
  if (p === 'instagram') return 'bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white';
  if (p === 'linkedin') return 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white';
  if (p === 'youtube') return 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white';
  return 'bg-gray-50 text-gray-600 hover:bg-gray-600 hover:text-white';
};

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { posts, settings } = useSite();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <Link to="/blog" className="text-secondary hover:underline">Return to Blog</Link>
      </div>
    );
  }

  const socialLinks = settings.socialMedia || [];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Media */}
      <div className="h-[60vh] relative w-full bg-black">
        {post.video ? (
             <div className="w-full h-full relative">
                 <video 
                    src={post.video} 
                    controls 
                    className="w-full h-full object-contain"
                    poster={post.image}
                 />
             </div>
        ) : (
             <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
        )}
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20">
            <div className="max-w-4xl px-4 text-center pointer-events-auto">
                <div className="flex items-center justify-center space-x-4 text-white/90 text-sm mb-6 font-medium">
                    <span className="bg-secondary/90 px-3 py-1 rounded-full uppercase tracking-wider">{post.tags[0]}</span>
                    <span>{post.date}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center text-white space-x-2">
                    <div className="bg-gray-200 rounded-full p-1"><User className="text-gray-600 w-4 h-4" /></div>
                    <span>By {post.author}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 bg-white -mt-10 rounded-t-3xl pt-12 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content Column */}
            <div className="lg:w-2/3">
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Articles
                </Link>
                
                {/* Header Actions: Tags & Functional Social Icons */}
                <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-8 mb-8 gap-4">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">#{tag}</span>
                        ))}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">Follow us:</span>
                        <div className="flex space-x-2">
                            {socialLinks.map((link, idx) => (
                                <a 
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-sm border border-gray-100 ${getSocialColorClass(link.platform)}`}
                                    title={`Visit our ${link.platform}`}
                                >
                                    {getSocialIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="lead text-xl text-gray-600 mb-8 font-light italic border-l-4 border-secondary pl-4">
                        {post.excerpt}
                    </p>
                    <div className="text-gray-800 leading-relaxed space-y-6">
                        {post.content.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:w-1/3 space-y-8">
                 {/* Author Widget */}
                 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full shrink-0 flex items-center justify-center text-xl text-white font-serif font-bold">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{post.author}</h4>
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Travel Contributor</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">Expert traveler and storyteller. Passionate about uncovering the soul of every destination.</p>
                </div>

                {/* Advertisement Widget */}
                {settings.ads?.enabled && settings.ads?.sidebarBanner && (
                    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col items-center">
                        <AdContainer code={settings.ads.sidebarBanner} label="Sponsor" />
                    </div>
                )}

                {/* Related Posts */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-secondary" /> Read Next
                    </h4>
                    <ul className="space-y-4">
                        {posts.filter(p => p.id !== post.id).slice(0,3).map(p => (
                            <li key={p.id}>
                                <Link to={`/blog/${p.id}`} className="group block">
                                    <h5 className="text-sm font-bold text-gray-800 group-hover:text-secondary transition-colors line-clamp-2">{p.title}</h5>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-tight">{p.date}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
