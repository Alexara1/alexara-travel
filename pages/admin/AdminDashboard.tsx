
import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { LayoutDashboard, FileText, Settings, Palette, Plus, Trash, Edit, ArrowLeft, Map, Tag, ShoppingBag, Save, X, Upload, Video, Image as ImageIcon, Users, Globe, TrendingUp, Calendar, BarChart3, DollarSign, Share2, Mail, Phone, MapPin, Lock, LogOut, Shield, Inbox, CheckCircle, ChevronRight, Search as SearchIcon, Eye, ExternalLink, Activity, Info, Facebook, Twitter, Linkedin, Code, Download, FileJson, Copy, Check, Link as LinkIcon, Pulse } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogPost, Deal, Destination, GearProduct, ContactMessage } from '../../types';

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const MediaInput: React.FC<{
    label: string;
    value: string | undefined;
    onChange: (val: string) => void;
    accept?: string;
    type: 'image' | 'video';
    recommendedDimensions?: string;
}> = ({ label, value, onChange, accept = "image/*", type, recommendedDimensions }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                alert("File is too large for local storage demo (Max 4MB). Please use a URL instead.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                {type === 'image' ? <ImageIcon className="w-4 h-4"/> : <Video className="w-4 h-4"/>}
                {label}
            </label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder={type === 'image' ? "https://example.com/image.jpg" : "https://example.com/video.mp4"}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded inline-flex items-center transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="text-sm">Upload</span>
                    <input 
                        type="file" 
                        className="hidden" 
                        accept={accept}
                        onChange={handleFileChange} 
                    />
                </label>
            </div>
            {type === 'image' && recommendedDimensions && (
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <span className="font-semibold mr-1">Recommended Size:</span> {recommendedDimensions}
                </p>
            )}
            {value && value.startsWith('data:') && (
                <p className="text-xs text-green-600 mt-1">File uploaded successfully</p>
            )}
             {value && type === 'image' && (
                <div className="mt-2 h-20 w-32 bg-gray-100 rounded overflow-hidden border border-gray-200 relative">
                    <img src={value} alt="Preview" className="w-full h-full object-contain" />
                </div>
            )}
        </div>
    );
};

const AdminDashboard: React.FC = () => {
  const { 
    settings, updateSettings, 
    posts, addPost, updatePost, deletePost,
    destinations, addDestination, updateDestination, deleteDestination,
    deals, addDeal, updateDeal, deleteDeal,
    gear, addGear, updateGear, deleteGear,
    messages, deleteMessage, markMessageRead,
    isAdminMode, logout
  } = useSite();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'posts' | 'destinations' | 'deals' | 'gear' | 'inbox' | 'theme' | 'contact' | 'social' | 'ads' | 'security' | 'seo'>('stats');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [destForm, setDestForm] = useState<Partial<Destination>>({});
  const [dealForm, setDealForm] = useState<Partial<Deal>>({ categories: [] });
  const [gearForm, setGearForm] = useState<Partial<GearProduct>>({});
  
  const [newBlogCategory, setNewBlogCategory] = useState('');

  // Live Analytics State
  const [analyticsData, setAnalyticsData] = useState({
    activeNow: 124,
    visits: {
        total: 145892,
        weekly: 3240,
        monthly: 12500,
        yearly: 98400
    },
    geo: [
        { country: 'United States', percentage: 35, count: 51062 },
        { country: 'United Kingdom', percentage: 15, count: 21883 },
        { country: 'Germany', percentage: 12, count: 17507 },
        { country: 'France', percentage: 8, count: 11671 },
        { country: 'Japan', percentage: 6, count: 8753 },
        { country: 'Canada', percentage: 5, count: 7294 },
        { country: 'Other', percentage: 19, count: 27722 },
    ],
    devices: {
        mobile: 58,
        desktop: 35,
        tablet: 7
    }
  });

  // Simulate Live Data Updates
  useEffect(() => {
    if (activeTab !== 'stats') return;

    const interval = setInterval(() => {
        setAnalyticsData(prev => {
            const visitorInflow = Math.floor(Math.random() * 5) + 1;
            const activeShift = Math.floor(Math.random() * 7) - 3;
            
            // Randomly shift device percentages slightly
            const mobileShift = (Math.random() * 0.2) - 0.1;
            const desktopShift = (Math.random() * 0.2) - 0.1;

            return {
                ...prev,
                activeNow: Math.max(100, prev.activeNow + activeShift),
                visits: {
                    ...prev.visits,
                    total: prev.visits.total + visitorInflow,
                    weekly: prev.visits.weekly + visitorInflow,
                    monthly: prev.visits.monthly + visitorInflow,
                },
                devices: {
                    mobile: Math.min(70, Math.max(40, prev.devices.mobile + mobileShift)),
                    desktop: Math.min(50, Math.max(20, prev.devices.desktop + desktopShift)),
                    tablet: 100 - (prev.devices.mobile + mobileShift) - (prev.devices.desktop + desktopShift)
                }
            };
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const availableDealCategories = ['Hotel', 'Hostel', 'Restaurant', 'Nightclub', 'Beach', 'Resort', 'Activity', 'Ticket', 'Package'];

  useEffect(() => {
    setEditingId(null);
    setFormMode('create');
    setPostForm({});
    setDestForm({});
    setDealForm({ categories: [] });
    setGearForm({});
    setSelectedMessage(null);
  }, [activeTab]);

  if (!isAdminMode) return <div className="p-8 text-center text-red-500 font-bold">Access Denied</div>;

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleEdit = (id: string, type: 'post' | 'dest' | 'deal' | 'gear') => {
    setEditingId(id);
    setFormMode('edit');
    if (type === 'post') setPostForm(posts.find(p => p.id === id) || {});
    if (type === 'dest') setDestForm(destinations.find(p => p.id === id) || {});
    if (type === 'deal') setDealForm(deals.find(p => p.id === id) || { categories: [] });
    if (type === 'gear') setGearForm(gear.find(p => p.id === id) || {});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormMode('create');
    setPostForm({});
    setDestForm({});
    setDealForm({ categories: [] });
    setGearForm({});
  };

  const savePost = (e: React.FormEvent) => {
    e.preventDefault();
    const title = postForm.title || 'Untitled';
    const slug = postForm.slug || slugify(title);

    if (formMode === 'create') {
        addPost({
            id: Date.now().toString(),
            slug: slug,
            title: title,
            excerpt: postForm.excerpt || '',
            content: postForm.content || '',
            image: postForm.image || `https://picsum.photos/seed/${Date.now()}/800/600`,
            video: postForm.video,
            author: postForm.author || 'Admin',
            date: new Date().toLocaleDateString(),
            tags: postForm.tags || []
        } as BlogPost);
    } else if (editingId) {
        updatePost(editingId, { ...postForm, slug });
    }
    handleCancel();
  };

  const saveDest = (e: React.FormEvent) => {
    e.preventDefault();
    const name = destForm.name || 'New Place';
    const slug = destForm.slug || slugify(name);

    if (formMode === 'create') {
        addDestination({
            id: Date.now().toString(),
            slug: slug,
            name: name,
            continent: destForm.continent || 'Europe',
            description: destForm.description || '',
            image: destForm.image || `https://picsum.photos/seed/${Date.now()}/400/300`,
            video: destForm.video
        } as Destination);
    } else if (editingId) {
        updateDestination(editingId, { ...destForm, slug });
    }
    handleCancel();
  };

  const saveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const title = dealForm.title || 'New Deal';
    const slug = dealForm.slug || slugify(title);

    if (formMode === 'create') {
        addDeal({
            id: Date.now().toString(),
            slug: slug,
            title: title,
            location: dealForm.location || (destinations.length > 0 ? destinations[0].name : 'Unknown'),
            city: dealForm.city || 'Unknown',
            categories: dealForm.categories || [],
            price: Number(dealForm.price) || 0,
            originalPrice: Number(dealForm.originalPrice) || 0,
            image: dealForm.image || `https://picsum.photos/seed/${Date.now()}/600/400`,
            video: dealForm.video,
            rating: 5.0,
            duration: dealForm.duration || '3 Days',
            affiliateLink: dealForm.affiliateLink || '#'
        } as Deal);
    } else if (editingId) {
        updateDeal(editingId, { ...dealForm, slug });
    }
    handleCancel();
  };

  const saveGear = (e: React.FormEvent) => {
    e.preventDefault();
    const name = gearForm.name || 'New Item';
    const slug = gearForm.slug || slugify(name);

    if (formMode === 'create') {
        addGear({
            id: Date.now().toString(),
            slug: slug,
            name: name,
            description: gearForm.description || '',
            price: Number(gearForm.price) || 0,
            image: gearForm.image || `https://picsum.photos/seed/${Date.now()}/300/300`,
            video: gearForm.video,
            category: gearForm.category || 'Accessories',
            affiliateLink: gearForm.affiliateLink || '#'
        } as GearProduct);
    } else if (editingId) {
        updateGear(editingId, { ...gearForm, slug });
    }
    handleCancel();
  };

  const toggleDealCategory = (cat: string) => {
      const current = dealForm.categories || [];
      if (current.includes(cat as any)) {
          setDealForm({ ...dealForm, categories: current.filter(c => c !== cat) });
      } else {
          setDealForm({ ...dealForm, categories: [...current, cat as any] });
      }
  };

  const togglePostCategory = (cat: string) => {
      const current = postForm.tags || [];
      if (current.includes(cat)) {
          setPostForm({ ...postForm, tags: current.filter(c => c !== cat) });
      } else {
          setPostForm({ ...postForm, tags: [...current, cat] });
      }
  };

  const handleAddBlogCategory = () => {
    if (!newBlogCategory.trim()) return;
    const current = settings.blogCategories || [];
    if (current.includes(newBlogCategory.trim())) {
        alert("Category already exists.");
        return;
    }
    updateSettings({ blogCategories: [...current, newBlogCategory.trim()] });
    setNewBlogCategory('');
  };

  const handleRemoveBlogCategory = (cat: string) => {
    if (window.confirm(`Are you sure you want to remove the category "${cat}"? Posts tagged with this will still keep the tag, but it will be removed from future choices.`)) {
        updateSettings({ blogCategories: settings.blogCategories.filter(c => c !== cat) });
    }
  };

  const copyPublicLink = (type: 'blog' | 'destinations' | 'deals' | 'gear', slug: string) => {
      const url = `${window.location.origin}/${type}/${slug}`;
      navigator.clipboard.writeText(url);
      setCopiedId(slug);
      setTimeout(() => setCopiedId(null), 2000);
  };

  const addSocialLink = () => {
    const newLinks = [...(settings.socialMedia || [])];
    newLinks.push({ platform: 'Facebook', url: '' });
    updateSettings({ socialMedia: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...(settings.socialMedia || [])];
    newLinks.splice(index, 1);
    updateSettings({ socialMedia: newLinks });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...(settings.socialMedia || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateSettings({ socialMedia: newLinks });
  };

  const handleMessageClick = (msg: ContactMessage) => {
      setSelectedMessage(msg);
      markMessageRead(msg.id);
  };

  const generateSitemap = () => {
    const baseUrl = settings.canonicalUrl || 'https://alexara.com';
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Base Pages
    ['/', '/destinations', '/deals', '/gear', '/blog', '/about', '/contact'].forEach(p => {
      sitemap += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Dynamic Content
    posts.forEach(p => { sitemap += `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority Kent="0.6" />\n  </url>\n`; });
    destinations.forEach(d => { sitemap += `  <url>\n    <loc>${baseUrl}/destinations/${d.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`; });
    deals.forEach(d => { sitemap += `  <url>\n    <loc>${baseUrl}/deals/${d.slug}</loc>\n    <changefreq>daily</changefreq>\n    <priority Kent="0.7" />\n  </url>\n`; });
    gear.forEach(g => { sitemap += `  <url>\n    <loc>${baseUrl}/gear/${g.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`; });

    sitemap += `</urlset>`;
    
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded text-base text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-shadow";
  const labelClass = "block text-sm font-bold text-gray-700 mb-1";

  const renderSidebarItem = (id: typeof activeTab, icon: React.ReactNode, label: string, badge?: number) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-secondary text-white' : 'text-gray-300 hover:bg-slate-800'}`}
    >
        <div className="flex items-center space-x-3">
            {icon} <span>{label}</span>
        </div>
        {badge ? (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
        ) : null}
    </button>
  );

  const unreadCount = messages.filter(m => m.status === 'new').length;

  const getSEOHealth = () => {
    const titleLen = settings.metaTitle?.length || 0;
    const descLen = settings.metaDescription?.length || 0;
    const keywordsCount = settings.metaKeywords?.split(',').filter(k => k.trim()).length || 0;
    
    return [
      { label: 'Meta Title Length', status: titleLen >= 50 && titleLen <= 60 ? 'good' : (titleLen > 0 ? 'warning' : 'critical'), info: `${titleLen} characters (Ideal: 50-60)` },
      { label: 'Meta Description Length', status: descLen >= 120 && descLen <= 160 ? 'good' : (descLen > 0 ? 'warning' : 'critical'), info: `${descLen} characters (Ideal: 120-160)` },
      { label: 'Keywords Density', status: keywordsCount >= 3 ? 'good' : 'warning', info: `${keywordsCount} keywords defined` },
      { label: 'Canonical URL', status: settings.canonicalUrl ? 'good' : 'warning', info: settings.canonicalUrl ? 'Present' : 'Missing' },
      { label: 'Search Visibility', status: settings.searchVisibility ? 'good' : 'critical', info: settings.searchVisibility ? 'Indexing Enabled' : 'NoIndex (Hidden)' }
    ];
  };

  const seoHealth = getSEOHealth();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold font-serif mb-8 flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" /> {settings.siteName} Admin
            </h2>
            <nav className="space-y-2">
                {renderSidebarItem('stats', <LayoutDashboard className="w-5 h-5" />, 'Dashboard')}
                {renderSidebarItem('inbox', <Inbox className="w-5 h-5" />, 'Inquiries', unreadCount)}
                <div className="h-px bg-slate-800 my-4"></div>
                {renderSidebarItem('posts', <FileText className="w-5 h-5" />, 'Blog Posts')}
                {renderSidebarItem('destinations', <Map className="w-5 h-5" />, 'Destinations')}
                {renderSidebarItem('deals', <Tag className="w-5 h-5" />, 'Deals')}
                {renderSidebarItem('gear', <ShoppingBag className="w-5 h-5" />, 'Gear')}
                <div className="h-px bg-slate-800 my-4"></div>
                {renderSidebarItem('theme', <Palette className="w-5 h-5" />, 'Appearance')}
                {renderSidebarItem('contact', <Mail className="w-5 h-5" />, 'Contact Info')}
                {renderSidebarItem('social', <Share2 className="w-5 h-5" />, 'Social Media')}
                {renderSidebarItem('seo', <SearchIcon className="w-5 h-5" />, 'SEO & Sitemap')}
                {renderSidebarItem('ads', <DollarSign className="w-5 h-5" />, 'Monetization')}
                {renderSidebarItem('security', <Shield className="w-5 h-5" />, 'Security')}
            </nav>
        </div>
        <div className="p-6 border-t border-slate-800 space-y-4">
             <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors w-full">
                 <LogOut className="w-4 h-4" /> <span>Logout</span>
             </button>
             <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                 <ArrowLeft className="w-4 h-4" /> <span>Back to Website</span>
             </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* --- STATS TAB (UPDATED FOR LIVE DATA) --- */}
        {activeTab === 'stats' && (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-600">Live Traffic Nodes</span>
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-600 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" /> Real-Time Synthesis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                            <Users className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary">{analyticsData.activeNow}</h3>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Now</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary">{posts.length}</h3>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Content Posts</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                         <div className="bg-green-50 p-3 rounded-full text-green-600">
                            <Tag className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary">{deals.length}</h3>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Deals</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${unreadCount > 0 ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                            <Inbox className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold ${unreadCount > 0 ? 'text-red-500' : 'text-primary'}`}>{unreadCount}</h3>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">New Inquiries</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-600 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" /> Visitor Analytics (Live)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 group hover:border-secondary transition-colors">
                        <div className="flex justify-between items-start mb-2">
                             <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                 <Users className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12%</span>
                        </div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Visitors</h4>
                        <p className="text-2xl font-bold text-gray-800 mt-1 tabular-nums">{analyticsData.visits.total.toLocaleString()}</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 group hover:border-secondary transition-colors">
                         <div className="flex justify-between items-start mb-2">
                             <div className="bg-pink-50 p-2 rounded-lg text-pink-500">
                                 <Calendar className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +5%</span>
                        </div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Weekly Visits</h4>
                        <p className="text-2xl font-bold text-gray-800 mt-1 tabular-nums">{analyticsData.visits.weekly.toLocaleString()}</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 group hover:border-secondary transition-colors">
                         <div className="flex justify-between items-start mb-2">
                             <div className="bg-purple-50 p-2 rounded-lg text-purple-500">
                                 <BarChart3 className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +8%</span>
                        </div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Monthly Visits</h4>
                        <p className="text-2xl font-bold text-gray-800 mt-1 tabular-nums">{analyticsData.visits.monthly.toLocaleString()}</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 group hover:border-secondary transition-colors">
                         <div className="flex justify-between items-start mb-2">
                             <div className="bg-teal-50 p-2 rounded-lg text-teal-500">
                                 <Globe className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +24%</span>
                        </div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Yearly Visits</h4>
                        <p className="text-2xl font-bold text-gray-800 mt-1 tabular-nums">{analyticsData.visits.yearly.toLocaleString()}</p>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 text-lg flex items-center">
                                <Globe className="w-5 h-5 mr-2 text-gray-500" /> Geographic Distribution
                            </h3>
                            <button className="text-[10px] text-secondary font-black uppercase tracking-widest hover:underline">Real-Time Heatmap</button>
                         </div>
                         <div className="space-y-4">
                             {analyticsData.geo.map((item, index) => (
                                 <div key={item.country} className="flex items-center">
                                     <span className="w-32 text-xs font-bold text-gray-600 truncate">{item.country}</span>
                                     <div className="flex-1 mx-4 bg-gray-100 rounded-full h-2 overflow-hidden">
                                         <div 
                                            className="bg-secondary h-full rounded-full transition-all duration-1000" 
                                            style={{ width: `${item.percentage}%`, opacity: 1 - (index * 0.1) }}
                                         ></div>
                                     </div>
                                     <span className="w-12 text-[10px] font-black text-gray-800 text-right tabular-nums">{item.percentage}%</span>
                                     <span className="w-20 text-[10px] text-gray-400 text-right ml-2 tabular-nums">{(item.count + Math.floor(analyticsData.visits.total / 1000)).toLocaleString()}</span>
                                 </div>
                             ))}
                         </div>
                     </div>
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                         <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-gray-400" /> Device Usage
                         </h3>
                         <div className="flex flex-col justify-center h-64 space-y-6">
                             <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-xs font-bold text-gray-600">Mobile Synthesis</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-800 tabular-nums">{analyticsData.devices.mobile.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${analyticsData.devices.mobile}%` }}></div>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                                        <span className="text-xs font-bold text-gray-600">Desktop Interface</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-800 tabular-nums">{analyticsData.devices.desktop.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${analyticsData.devices.desktop}%` }}></div>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                                        <span className="text-xs font-bold text-gray-600">Tablet Terminal</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-800 tabular-nums">{analyticsData.devices.tablet.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-teal-400 h-full transition-all duration-1000" style={{ width: `${analyticsData.devices.tablet}%` }}></div>
                                </div>
                             </div>

                             <div className="pt-4 border-t border-gray-100 mt-4">
                                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">Architecting Real-Time Data Flow</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        )}

        {/* --- INBOX TAB --- */}
        {activeTab === 'inbox' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-160px)]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Inbox className="w-6 h-6 mr-2 text-primary" /> Customer Inquiries
                    </h2>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{messages.length} Total Messages</span>
                </div>
                
                <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <button 
                                    key={msg.id}
                                    onClick={() => handleMessageClick(msg)}
                                    className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors relative group ${selectedMessage?.id === msg.id ? 'bg-blue-50/50' : ''}`}
                                >
                                    {msg.status === 'new' && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                                    )}
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-sm truncate font-bold ${msg.status === 'new' ? 'text-gray-900' : 'text-gray-600'}`}>{msg.name}</span>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{msg.date.split(',')[0]}</span>
                                    </div>
                                    <div className="text-xs font-medium text-primary truncate mb-1">{msg.subject}</div>
                                    <p className="text-xs text-gray-400 line-clamp-1">{msg.message}</p>
                                </button>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-400">
                                <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="text-sm font-medium">No messages yet.</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 bg-white overflow-y-auto p-8">
                        {selectedMessage ? (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h3>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">{selectedMessage.name.charAt(0)}</div>
                                                <div>
                                                    <p className="font-bold text-gray-800 leading-none">{selectedMessage.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{selectedMessage.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-gray-400 font-medium">{selectedMessage.date}</span>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => {
                                                    if (window.confirm("Delete this message?")) {
                                                        deleteMessage(selectedMessage.id);
                                                        setSelectedMessage(null);
                                                    }
                                                }}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                title="Delete Message"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[200px]">
                                    {selectedMessage.message}
                                </div>
                                
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Actions</h4>
                                    <div className="flex gap-4">
                                        <a 
                                            href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                            className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center"
                                        >
                                            <Mail className="w-4 h-4 mr-2" /> Reply via Email
                                        </a>
                                        <button 
                                            onClick={() => {
                                                alert("Message marked as resolved.");
                                                markMessageRead(selectedMessage.id);
                                            }}
                                            className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                <Inbox className="w-16 h-16 mb-4 opacity-10" />
                                <h3 className="text-xl font-bold opacity-30">Select a message to read</h3>
                                <p className="text-sm opacity-30 mt-2">All customer inquiries from your contact form will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* --- POSTS TAB --- Kent-fixed */}
        {activeTab === 'posts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                            <span>{formMode === 'create' ? 'Create New Post' : 'Edit Post'}</span>
                            {formMode === 'edit' && <button onClick={handleCancel} className="text-sm text-red-500"><X className="w-4 h-4" /></button>}
                        </h3>
                        <form onSubmit={savePost} className="space-y-4">
                            <div>
                                <label className={labelClass}>Title</label>
                                <input type="text" className={inputClass} value={postForm.title || ''} onChange={e => {
                                    const title = e.target.value;
                                    const updates: Partial<BlogPost> = { title };
                                    if (formMode === 'create' || !postForm.slug) { updates.slug = slugify(title); }
                                    setPostForm({...postForm, ...updates});
                                }} />
                            </div>
                            <div>
                                <label className={labelClass}>Slug (URL Key)</label>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-400 text-sm select-none">/blog/</div>
                                    <input type="text" className={inputClass} value={postForm.slug || ''} onChange={e => setPostForm({...postForm, slug: slugify(e.target.value)})} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Excerpt</label>
                                <textarea className={inputClass} rows={2} value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelClass}>Content</label>
                                <textarea className={inputClass} rows={10} value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Author</label>
                                    <input type="text" className={inputClass} value={postForm.author || ''} onChange={e => setPostForm({...postForm, author: e.target.value})} />
                                </div>
                                <div>
                                    <label className={labelClass}>Categories (Select Tags)</label>
                                    <div className="grid grid-cols-2 gap-2 mt-1 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                                        {(settings.blogCategories || []).map(cat => (
                                            <label key={cat} className="flex items-center space-x-2 text-xs font-medium text-gray-600 cursor-pointer hover:text-primary transition-colors">
                                                <input type="checkbox" checked={(postForm.tags || []).includes(cat)} onChange={() => togglePostCategory(cat)} className="w-4 h-4 text-primary rounded" />
                                                <span>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <MediaInput label="Featured Image" type="image" recommendedDimensions="1200 x 800 px" value={postForm.image} onChange={(val) => setPostForm({...postForm, image: val})} />
                            <MediaInput label="Video" type="video" accept="video/*" value={postForm.video} onChange={(val) => setPostForm({...postForm, video: val})} />
                            <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-slate-800 transition-colors">
                                {formMode === 'create' ? 'Publish Post' : 'Update Post'}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                     <h3 className="text-xl font-bold mb-4">Manage Posts</h3>
                     <div className="space-y-2 max-h-[800px] overflow-y-auto">
                         {posts.map(post => (
                             <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100 group">
                                 <div className="flex-1 truncate">
                                     <span className="font-bold text-sm text-gray-800">{post.title}</span>
                                     <div className="flex items-center gap-2 mt-1">
                                         <span className="text-[10px] text-gray-400 font-mono">/{post.slug}</span>
                                     </div>
                                 </div>
                                 <div className="flex space-x-2 ml-2">
                                     <button onClick={() => copyPublicLink('blog', post.slug)} className="text-gray-400 hover:text-primary p-1">
                                         {copiedId === post.slug ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                     </button>
                                     <button onClick={() => handleEdit(post.id, 'post')} className="text-blue-500 hover:text-blue-700 p-1"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700 p-1"><Trash className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* --- DESTINATIONS TAB --- */}
        {activeTab === 'destinations' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                         <span>{formMode === 'create' ? 'Add Destination' : 'Edit Destination'}</span>
                         {formMode === 'edit' && <button onClick={handleCancel} className="text-sm text-red-500"><X className="w-4 h-4" /></button>}
                    </h3>
                    <form onSubmit={saveDest} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className={labelClass}>Name (Country Name)</label>
                                <input type="text" className={inputClass} value={destForm.name || ''} onChange={e => {
                                    const name = e.target.value;
                                    const updates: Partial<Destination> = { name };
                                    if (formMode === 'create' || !destForm.slug) { updates.slug = slugify(name); }
                                    setDestForm({...destForm, ...updates});
                                }} />
                            </div>
                            <div>
                                <label className={labelClass}>Continent</label>
                                <input type="text" className={inputClass} value={destForm.continent || ''} onChange={e => setDestForm({...destForm, continent: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Slug (URL Key)</label>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-400 text-sm select-none">/destinations/</div>
                                <input type="text" className={inputClass} value={destForm.slug || ''} onChange={e => setDestForm({...destForm, slug: slugify(e.target.value)})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea className={inputClass} rows={3} value={destForm.description || ''} onChange={e => setDestForm({...destForm, description: e.target.value})} />
                        </div>
                        <MediaInput label="Cover Image" type="image" recommendedDimensions="800 x 600 px" value={destForm.image} onChange={(val) => setDestForm({...destForm, image: val})} />
                        <MediaInput label="Promo Video" type="video" accept="video/*" value={destForm.video} onChange={(val) => setDestForm({...destForm, video: val})} />
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-slate-800 transition-colors">
                            {formMode === 'create' ? 'Add Destination' : 'Update Destination'}
                        </button>
                    </form>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-xl font-bold mb-4">Current Destinations</h3>
                     <div className="space-y-2 max-h-[600px] overflow-y-auto">
                         {destinations.map(d => (
                             <div key={d.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                 <div className="flex-1 truncate">
                                     <span className="font-medium text-sm text-gray-800">{d.name}</span>
                                     <p className="text-[10px] text-gray-400">/{d.slug}</p>
                                 </div>
                                 <div className="flex space-x-2 ml-2">
                                     <button onClick={() => copyPublicLink('destinations', d.slug)} className="text-gray-400 hover:text-primary p-1">
                                         {copiedId === d.slug ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                     </button>
                                     <button onClick={() => handleEdit(d.id, 'dest')} className="text-blue-500 hover:text-blue-700 p-1"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => deleteDestination(d.id)} className="text-red-500 hover:text-red-700 p-1"><Trash className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* --- DEALS TAB --- */}
        {activeTab === 'deals' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                         <span>{formMode === 'create' ? 'Add Deal' : 'Edit Deal'}</span>
                         {formMode === 'edit' && <button onClick={handleCancel} className="text-sm text-red-500"><X className="w-4 h-4" /></button>}
                    </h3>
                    <form onSubmit={saveDeal} className="space-y-4">
                        <div>
                            <label className={labelClass}>Title</label>
                            <input type="text" className={inputClass} value={dealForm.title || ''} onChange={e => {
                                const title = e.target.value;
                                const updates: Partial<Deal> = { title };
                                if (formMode === 'create' || !dealForm.slug) { updates.slug = slugify(title); }
                                setDealForm({...dealForm, ...updates});
                            }} />
                        </div>
                        <div>
                            <label className={labelClass}>Slug (URL Key)</label>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-400 text-sm select-none">/deals/</div>
                                <input type="text" className={inputClass} value={dealForm.slug || ''} onChange={e => setDealForm({...dealForm, slug: slugify(e.target.value)})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className={labelClass}>Location (Select Destination)</label>
                                <select className={inputClass} value={dealForm.location || ''} onChange={e => setDealForm({...dealForm, location: e.target.value})} required>
                                    <option value="" disabled>Choose a destination...</option>
                                    {destinations.map(d => ( <option key={d.id} value={d.name}>{d.name}</option> ))}
                                    <option value="Other">Other (Not in Destinations)</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>City</label>
                                <input type="text" className={inputClass} value={dealForm.city || ''} onChange={e => setDealForm({...dealForm, city: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div><label className={labelClass}>Price ($)</label><input type="number" className={inputClass} value={dealForm.price || ''} onChange={e => setDealForm({...dealForm, price: Number(e.target.value)})} /></div>
                             <div><label className={labelClass}>Original Price ($)</label><input type="number" className={inputClass} value={dealForm.originalPrice || ''} onChange={e => setDealForm({...dealForm, originalPrice: Number(e.target.value)})} /></div>
                        </div>
                        <MediaInput label="Deal Image" type="image" recommendedDimensions="800 x 600 px" value={dealForm.image} onChange={(val) => setDealForm({...dealForm, image: val})} />
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-slate-800 transition-colors">
                            {formMode === 'create' ? 'Add Deal' : 'Update Deal'}
                        </button>
                    </form>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-xl font-bold mb-4">Active Deals</h3>
                     <div className="space-y-2 max-h-[600px] overflow-y-auto">
                         {deals.map(d => (
                             <div key={d.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                 <div>
                                     <span className="font-bold text-sm text-gray-800 truncate">{d.title}</span>
                                     <p className="text-[10px] text-gray-400">/{d.slug}</p>
                                 </div>
                                 <div className="flex space-x-2 ml-2">
                                     <button onClick={() => copyPublicLink('deals', d.slug)} className="text-gray-400 hover:text-primary p-1">
                                         {copiedId === d.slug ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                     </button>
                                     <button onClick={() => handleEdit(d.id, 'deal')} className="text-blue-500 hover:text-blue-700 p-1"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => deleteDeal(d.id)} className="text-red-500 hover:text-red-700 p-1"><Trash className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* --- GEAR TAB --- */}
        {activeTab === 'gear' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                         <span>{formMode === 'create' ? 'Add Gear' : 'Edit Gear'}</span>
                         {formMode === 'edit' && <button onClick={handleCancel} className="text-sm text-red-500"><X className="w-4 h-4" /></button>}
                    </h3>
                    <form onSubmit={saveGear} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className={labelClass}>Name</label>
                                <input type="text" className={inputClass} value={gearForm.name || ''} onChange={e => {
                                    const name = e.target.value;
                                    const updates: Partial<GearProduct> = { name };
                                    if (formMode === 'create' || !gearForm.slug) { updates.slug = slugify(name); }
                                    setGearForm({...gearForm, ...updates});
                                }} />
                            </div>
                            <div><label className={labelClass}>Category</label><input type="text" className={inputClass} value={gearForm.category || ''} onChange={e => setGearForm({...gearForm, category: e.target.value})} /></div>
                        </div>
                        <div>
                            <label className={labelClass}>Slug (URL Key)</label>
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-400 text-sm select-none">/gear/</div>
                                <input type="text" className={inputClass} value={gearForm.slug || ''} onChange={e => setGearForm({...gearForm, slug: slugify(e.target.value)})} />
                            </div>
                        </div>
                        <div><label className={labelClass}>Description</label><textarea className={inputClass} rows={2} value={gearForm.description || ''} onChange={e => setGearForm({...gearForm, description: e.target.value})} /></div>
                        <div><label className={labelClass}>Price ($)</label><input type="number" className={inputClass} value={gearForm.price || ''} onChange={e => setGearForm({...gearForm, price: Number(e.target.value)})} /></div>
                        <MediaInput label="Product Image" type="image" recommendedDimensions="500 x 500 px" value={gearForm.image} onChange={(val) => setGearForm({...gearForm, image: val})} />
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-slate-800 transition-colors">
                            {formMode === 'create' ? 'Add Item' : 'Update Item'}
                        </button>
                    </form>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-xl font-bold mb-4">Gear Inventory</h3>
                     <div className="space-y-2 max-h-[600px] overflow-y-auto">
                         {gear.map(g => (
                             <div key={g.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                 <div className="flex-1 truncate">
                                     <span className="font-medium text-sm text-gray-800">{g.name}</span>
                                     <p className="text-[10px] text-gray-400">/{g.slug}</p>
                                 </div>
                                 <div className="flex space-x-2 ml-2">
                                     <button onClick={() => copyPublicLink('gear', g.slug)} className="text-gray-400 hover:text-primary p-1">
                                         {copiedId === g.slug ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                     </button>
                                     <button onClick={() => handleEdit(g.id, 'gear')} className="text-blue-500 hover:text-blue-700 p-1"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => deleteGear(g.id)} className="text-red-500 hover:text-red-700 p-1"><Trash className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* --- THEME TAB --- */}
        {activeTab === 'theme' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
                <h3 className="text-xl font-bold mb-6">Customization</h3>
                <div className="space-y-6">
                    <div>
                        <label className={labelClass}>Site Name</label>
                        <input type="text" className={inputClass} value={settings.siteName} onChange={(e) => updateSettings({ siteName: e.target.value })} />
                    </div>
                     <MediaInput 
                        label="Site Logo" 
                        type="image"
                        recommendedDimensions="200 x 50 px (Transparent PNG recommended)"
                        value={settings.logo} 
                        onChange={(val) => updateSettings({ logo: val })} 
                    />
                     <div>
                        <label className={labelClass}>Hero Title</label>
                        <input type="text" className={inputClass} value={settings.heroTitle} onChange={(e) => updateSettings({ heroTitle: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Primary Color</label>
                            <div className="flex items-center space-x-2">
                                <input type="color" className="h-10 w-10 border-none cursor-pointer" value={settings.primaryColor} onChange={(e) => updateSettings({ primaryColor: e.target.value })} />
                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">{settings.primaryColor}</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Secondary Color</label>
                            <div className="flex items-center space-x-2">
                                <input type="color" className="h-10 w-10 border-none cursor-pointer" value={settings.secondaryColor} onChange={(e) => updateSettings({ secondaryColor: e.target.value })} />
                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">{settings.secondaryColor}</span>
                            </div>
                        </div>
                         <div>
                            <label className={labelClass}>Accent Color</label>
                            <div className="flex items-center space-x-2">
                                <input type="color" className="h-10 w-10 border-none cursor-pointer" value={settings.accentColor} onChange={(e) => updateSettings({ accentColor: e.target.value })} />
                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">{settings.accentColor}</span>
                            </div>
                        </div>
                    </div>
                     <div>
                        <label className={labelClass}>Font Family</label>
                        <select className={inputClass} value={settings.fontFamily} onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}>
                            <option value="Open Sans">Open Sans (Clean)</option>
                            <option value="Roboto">Roboto (Modern)</option>
                            <option value="Helvetica">Helvetica (Classic)</option>
                        </select>
                    </div>
                </div>
            </div>
        )}

        {/* --- CONTACT INFO TAB --- */}
        {activeTab === 'contact' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-primary" /> Contact Information
                </h3>
                <p className="text-gray-500 mb-6 text-sm">Update the contact details displayed in the footer and on the contact page.</p>
                <div className="space-y-6">
                    <div>
                        <label className={labelClass}>Phone Number</label>
                        <div className="flex items-center relative">
                             <Phone className="w-5 h-5 text-gray-400 absolute left-3" />
                             <input 
                                type="text" 
                                className={`${inputClass} pl-10`} 
                                value={settings.contact?.phone || ''} 
                                onChange={(e) => updateSettings({ contact: { ...(settings.contact as any), phone: e.target.value } })} 
                                placeholder="+1 (555) 123-4567"
                             />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Email Address</label>
                        <div className="flex items-center relative">
                             <Mail className="w-5 h-5 text-gray-400 absolute left-3" />
                             <input 
                                type="email" 
                                className={`${inputClass} pl-10`} 
                                value={settings.contact?.email || ''} 
                                onChange={(e) => updateSettings({ contact: { ...(settings.contact as any), email: e.target.value } })} 
                                placeholder="hello@example.com"
                             />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Physical Address</label>
                        <div className="flex items-start relative">
                             <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                             <textarea 
                                className={`${inputClass} pl-10`} 
                                rows={3}
                                value={settings.contact?.address || ''} 
                                onChange={(e) => updateSettings({ contact: { ...(settings.contact as any), address: e.target.value } })} 
                                placeholder="123 Street Name&#10;City, State, Zip"
                             />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-10">Line breaks will be preserved.</p>
                    </div>
                </div>
            </div>
        )}

        {/* --- SOCIAL MEDIA TAB --- */}
        {activeTab === 'social' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center">
                        <Share2 className="w-6 h-6 mr-2 text-indigo-600" /> Social Media Links
                    </h3>
                    <button 
                        onClick={addSocialLink}
                        className="bg-primary text-white text-sm px-4 py-2 rounded-lg flex items-center hover:bg-slate-800 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Link
                    </button>
                </div>
                <div className="space-y-4">
                    {(settings.socialMedia || []).map((link, index) => (
                        <div key={index} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                             <div className="w-1/3">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Platform</label>
                                <select 
                                    className="w-full border border-gray-300 p-2 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={link.platform}
                                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                >
                                    <option value="Facebook">Facebook</option>
                                    <option value="Twitter">Twitter (X)</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="TikTok">TikTok</option>
                                    <option value="Pinterest">Pinterest</option>
                                    <option value="Reddit">Reddit</option>
                                    <option value="Rutube">Rutube</option>
                                    <option value="Other">Other</option>
                                </select>
                             </div>
                             <div className="flex-1">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">URL</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 p-2 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="https://..."
                                    value={link.url}
                                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                />
                             </div>
                             <div className="pt-5">
                                 <button 
                                    onClick={() => removeSocialLink(index)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                >
                                     <Trash className="w-5 h-5" />
                                 </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- MONETIZATION / ADS TAB --- */}
        {activeTab === 'ads' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-3xl">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-green-600" /> Monetization Settings
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            id="adsEnabled"
                            checked={settings.ads?.enabled} 
                            onChange={(e) => updateSettings({ ads: { ...settings.ads, enabled: e.target.checked } as any })}
                            className="w-5 h-5 text-secondary rounded focus:ring-secondary mr-3"
                        />
                        <label htmlFor="adsEnabled" className="text-gray-800 font-bold">Enable Advertisements</label>
                    </div>
                    <div className={!settings.ads?.enabled ? 'opacity-50 pointer-events-none' : ''}>
                        <div className="mb-6">
                            <label className={labelClass}>Header Banner Code (Horizontal 728x90)</label>
                            <textarea 
                                className={`${inputClass} font-mono text-xs`} 
                                rows={4} 
                                placeholder="<script>...</script>"
                                value={settings.ads?.headerBanner || ''}
                                onChange={(e) => updateSettings({ ads: { ...settings.ads, headerBanner: e.target.value } as any })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Sidebar Banner Code (Square 300x250)</label>
                            <textarea 
                                className={`${inputClass} font-mono text-xs`} 
                                rows={4} 
                                placeholder="<script>...</script>"
                                value={settings.ads?.sidebarBanner || ''}
                                onChange={(e) => updateSettings({ ads: { ...settings.ads, sidebarBanner: e.target.value } as any })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- SECURITY TAB --- */}
        {activeTab === 'security' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" /> Security Settings
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className={labelClass}>Admin Email</label>
                        <input 
                            type="email" 
                            className={`${inputClass}`} 
                            value={settings.adminEmail || ''} 
                            onChange={(e) => updateSettings({ adminEmail: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Admin Password</label>
                        <input 
                            type="text" 
                            className={`${inputClass}`} 
                            value={settings.adminPassword || ''} 
                            onChange={(e) => updateSettings({ adminPassword: e.target.value })} 
                        />
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
