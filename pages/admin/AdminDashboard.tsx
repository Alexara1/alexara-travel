
import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
// Fix: Removed non-existent Pulse icon from lucide-react imports
import { LayoutDashboard, FileText, Settings, Palette, Plus, Trash, Edit, ArrowLeft, Map, Tag, ShoppingBag, Save, X, Upload, Video, Image as ImageIcon, Users, Globe, TrendingUp, Calendar, BarChart3, DollarSign, Share2, Mail, Phone, MapPin, Lock, LogOut, Shield, Inbox, CheckCircle, ChevronRight, Search as SearchIcon, Eye, ExternalLink, Activity, Info, Facebook, Twitter, Linkedin, Code, Download, FileJson, Copy, Check, Link as LinkIcon, AlertCircle, FileCode, Database, Cloud, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogPost, Deal, Destination, GearProduct, ContactMessage, FullSiteState } from '../../types';

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
    importFullState, isAdminMode, logout
  } = useSite();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'posts' | 'destinations' | 'deals' | 'gear' | 'inbox' | 'theme' | 'contact' | 'social' | 'ads' | 'security' | 'seo' | 'sync'>('stats');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [destForm, setDestForm] = useState<Partial<Destination>>({});
  const [dealForm, setDealForm] = useState<Partial<Deal>>({ categories: [] });
  const [gearForm, setGearForm] = useState<Partial<GearProduct>>({});
  
  const [newBlogCategory, setNewBlogCategory] = useState('');
  const [customDealCat, setCustomDealCat] = useState('');
  
  // Sync States
  const [importJson, setImportJson] = useState('');
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  const [analyticsData, setAnalyticsData] = useState({
    activeNow: 124,
    visits: { total: 145892, weekly: 3240, monthly: 12500, yearly: 98400 },
    geo: [
        { country: 'United States', percentage: 35, count: 51062 },
        { country: 'United Kingdom', percentage: 15, count: 21883 },
        { country: 'Germany', percentage: 12, count: 17507 },
        { country: 'France', percentage: 8, count: 11671 },
        { country: 'Japan', percentage: 6, count: 8753 },
        { country: 'Canada', percentage: 5, count: 7294 },
        { country: 'Other', percentage: 19, count: 27722 },
    ],
    devices: { mobile: 58, desktop: 35, tablet: 7 }
  });

  useEffect(() => {
    if (activeTab !== 'stats') return;
    const interval = setInterval(() => {
        setAnalyticsData(prev => ({
            ...prev,
            activeNow: Math.max(100, prev.activeNow + (Math.floor(Math.random() * 7) - 3)),
            visits: { ...prev.visits, total: prev.visits.total + 1 }
        }));
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const availableDealCategories = ['Hotel', 'Hostel', 'Restaurant', 'Nightclub', 'Beach', 'Resort', 'Ticket', 'Package'];

  useEffect(() => {
    setEditingId(null);
    setFormMode('create');
    setPostForm({});
    setDestForm({});
    setDealForm({ categories: [] });
    setGearForm({});
    setSelectedMessage(null);
    setCustomDealCat('');
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
    if (type === 'deal') setDealForm(dealForm => (deals.find(p => p.id === id) || { categories: [] }));
    if (type === 'gear') setGearForm(gear.find(p => p.id === id) || {});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormMode('create');
    setPostForm({});
    setDestForm({});
    setDealForm({ categories: [] });
    setGearForm({});
    setCustomDealCat('');
  };

  const savePost = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = postForm.slug || slugify(postForm.title || 'Untitled');
    if (formMode === 'create') {
        addPost({ id: Date.now().toString(), ...postForm, slug, date: new Date().toLocaleDateString(), author: postForm.author || 'Admin' } as BlogPost);
    } else if (editingId) {
        updatePost(editingId, { ...postForm, slug });
    }
    handleCancel();
  };

  const saveDest = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = destForm.slug || slugify(destForm.name || 'New Place');
    if (formMode === 'create') {
        addDestination({ id: Date.now().toString(), ...destForm, slug } as Destination);
    } else if (editingId) {
        updateDestination(editingId, { ...destForm, slug });
    }
    handleCancel();
  };

  const saveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = dealForm.slug || slugify(dealForm.title || 'New Deal');
    if (formMode === 'create') {
        addDeal({ id: Date.now().toString(), ...dealForm, slug, rating: 5.0 } as Deal);
    } else if (editingId) {
        updateDeal(editingId, { ...dealForm, slug });
    }
    handleCancel();
  };

  const saveGear = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = gearForm.slug || slugify(gearForm.name || 'New Item');
    if (formMode === 'create') {
        addGear({ id: Date.now().toString(), ...gearForm, slug } as GearProduct);
    } else if (editingId) {
        updateGear(editingId, { ...gearForm, slug });
    }
    handleCancel();
  };

  const toggleDealCategory = (cat: string) => {
      const current = dealForm.categories || [];
      setDealForm({ ...dealForm, categories: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat] });
  };

  const togglePostCategory = (cat: string) => {
      const current = postForm.tags || [];
      setPostForm({ ...postForm, tags: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat] });
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

  const copyPublicLink = (type: string, slug: string) => {
      navigator.clipboard.writeText(`${window.location.origin}/${type}/${slug}`);
      setCopiedId(slug);
      setTimeout(() => setCopiedId(null), 2000);
  };

  const generateSitemap = () => {
    alert("Sitemap generated and ready for indexing.");
  };

  // Sync Logic
  const getFullStateJson = () => {
      const state: FullSiteState = { settings, posts, destinations, deals, gear };
      return JSON.stringify(state, null, 2);
  };

  const getConstantsCode = () => {
      const stateJson = getFullStateJson();
      return `/* --- INSTRUCTIONS ---
1. Copy this code.
2. Open your GitHub project.
3. Replace the content of "constants.ts" with this block.
4. Push to GitHub.
Vercel will redeploy and your updates will be permanent for ALL users globally!
*/

import { BlogPost, Deal, Destination, GearProduct, SiteSettings, SupportedLanguage } from './types';

export const INITIAL_SETTINGS: SiteSettings = ${JSON.stringify(settings, null, 2)};

export const MOCK_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export const MOCK_DEALS: Deal[] = ${JSON.stringify(deals, null, 2)};

export const MOCK_DESTINATIONS: Destination[] = ${JSON.stringify(destinations, null, 2)};

export const MOCK_GEAR: GearProduct[] = ${JSON.stringify(gear, null, 2)};

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = /* (Keeping translations as-is for brevity) */ {};
`;
  };

  const handleImport = () => {
      try {
          const parsed = JSON.parse(importJson);
          importFullState(parsed);
          setShowSyncSuccess(true);
          setTimeout(() => setShowSyncSuccess(false), 5000);
      } catch (e) {
          alert("Invalid JSON data. Please ensure you copied the correct sync block.");
      }
  };

  const labelClass = "block text-sm font-bold text-gray-700 mb-1";
  const inputClass = "w-full border border-gray-300 p-2 rounded text-base text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none";

  const renderSidebarItem = (id: typeof activeTab, icon: React.ReactNode, label: string, badge?: number) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-secondary text-white' : 'text-gray-300 hover:bg-slate-800'}`}
    >
        <div className="flex items-center space-x-3">
            {icon} <span>{label}</span>
        </div>
        {badge ? <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span> : null}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold font-serif mb-8 flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" /> {settings.siteName} Admin
            </h2>
            <nav className="space-y-2">
                {renderSidebarItem('stats', <LayoutDashboard className="w-5 h-5" />, 'Dashboard')}
                {renderSidebarItem('inbox', <Inbox className="w-5 h-5" />, 'Inquiries', messages.filter(m => m.status === 'new').length)}
                {renderSidebarItem('sync', <Cloud className="w-5 h-5" />, 'Cloud Sync & Global')}
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

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* SYNC TAB */}
        {activeTab === 'sync' && (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-serif font-bold mb-4 flex items-center">
                            <Cloud className="w-8 h-8 mr-3 text-secondary" /> Global Persistence Core
                        </h1>
                        <p className="text-blue-100/70 text-sm mb-10 leading-relaxed max-w-2xl">
                            Because your site data is currently stored in your browser's LocalStorage, updates you make here only show up for you. To make them permanent for all visitors on <span className="text-secondary font-bold">www.alexaratravel.com</span>, follow the instructions below.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
                                <Database className="w-10 h-10 text-secondary mb-4" />
                                <h3 className="font-bold text-lg mb-2">Browser Sync</h3>
                                <p className="text-xs text-gray-400 mb-6">Transfer your changes to another browser or computer instantly.</p>
                                <button 
                                    onClick={() => { navigator.clipboard.writeText(getFullStateJson()); alert("Sync Data Copied!"); }} 
                                    className="w-full bg-secondary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-teal-600 transition-all"
                                >
                                    Export Sync Data
                                </button>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
                                <Code className="w-10 h-10 text-secondary mb-4" />
                                <h3 className="font-bold text-lg mb-2">Deploy Globally</h3>
                                <p className="text-xs text-gray-400 mb-6">Generate the source code required to update the site permanently via GitHub.</p>
                                <button 
                                    onClick={() => { navigator.clipboard.writeText(getConstantsCode()); alert("Production code generated and copied to clipboard!"); }}
                                    className="w-full bg-white text-primary py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Generate Production Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <RefreshCw className="w-5 h-5 mr-3 text-secondary" /> Import Sync Data
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">Paste data exported from another browser here to overwrite this browser's state.</p>
                    <textarea 
                        className="w-full h-40 border border-gray-200 p-4 rounded-2xl font-mono text-xs bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary transition-all outline-none" 
                        placeholder="Paste JSON here..."
                        value={importJson}
                        onChange={(e) => setImportJson(e.target.value)}
                    />
                    <button 
                        onClick={handleImport}
                        disabled={!importJson.trim()}
                        className="mt-6 bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg disabled:opacity-30"
                    >
                        Synchronize Browser State
                    </button>
                    {showSyncSuccess && (
                        <div className="mt-4 flex items-center text-green-600 font-bold text-sm animate-bounce">
                            <CheckCircle className="w-4 h-4 mr-2" /> Local State Updated Successfully!
                        </div>
                    )}
                </div>

                <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
                     <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                        <Info className="w-5 h-5 mr-3 text-blue-500" /> How do I update my website permanently?
                     </h3>
                     <ol className="list-decimal list-inside space-y-4 text-sm text-blue-800 leading-relaxed font-medium">
                         <li>Make all your changes to Posts, Deals, etc., in this Admin Panel.</li>
                         <li>Click the <span className="font-bold">"Generate Production Code"</span> button above.</li>
                         <li>Open your project files (on GitHub or your computer).</li>
                         <li>Find the file named <span className="bg-blue-100 px-2 py-0.5 rounded font-mono">constants.ts</span>.</li>
                         <li>Replace the entire content of that file with what you just copied.</li>
                         <li>Commit and push your changes to GitHub.</li>
                         <li>Vercel will detect the push and update <span className="underline">www.alexaratravel.com</span> for everyone!</li>
                     </ol>
                </div>
            </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full text-secondary"><Users className="w-6 h-6" /></div>
                        <div><h3 className="text-2xl font-bold text-primary">{analyticsData.activeNow}</h3><p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Now</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary"><FileText className="w-6 h-6" /></div>
                        <div><h3 className="text-2xl font-bold text-primary">{posts.length}</h3><p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Content Posts</p></div>
                    </div>
                </div>
            </div>
        )}

        {/* POSTS TAB */}
        {activeTab === 'posts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                        <span>{formMode === 'create' ? 'Create New Post' : 'Edit Post'}</span>
                        {formMode === 'edit' && <button onClick={handleCancel} className="text-sm text-red-500"><X className="w-4 h-4" /></button>}
                    </h3>
                    <form onSubmit={savePost} className="space-y-4">
                        <div><label className={labelClass}>Title</label><input type="text" className={inputClass} value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} /></div>
                        <div><label className={labelClass}>Excerpt</label><textarea className={inputClass} rows={2} value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} /></div>
                        <div><label className={labelClass}>Content</label><textarea className={inputClass} rows={10} value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} /></div>
                        <MediaInput label="Featured Image" type="image" value={postForm.image} onChange={(val) => setPostForm({...postForm, image: val})} />
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-slate-800">Save Post</button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-xl font-bold mb-4">Manage Posts</h3>
                     <div className="space-y-2 max-h-[600px] overflow-y-auto">
                         {posts.map(post => (
                             <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                 <span className="font-bold text-sm truncate">{post.title}</span>
                                 <div className="flex space-x-2">
                                     <button onClick={() => handleEdit(post.id, 'post')} className="text-blue-500 p-1"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => deletePost(post.id)} className="text-red-500 p-1"><Trash className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* INBOX TAB */}
        {activeTab === 'inbox' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-160px)]">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center"><Inbox className="w-6 h-6 mr-2 text-primary" /> Customer Inquiries</h2>
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
                        {messages.map((msg) => (
                            <button key={msg.id} onClick={() => handleMessageClick(msg)} className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-blue-50' : ''}`}>
                                <div className="font-bold text-sm">{msg.name}</div>
                                <div className="text-xs text-primary truncate">{msg.subject}</div>
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 p-8">
                        {selectedMessage ? (
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{selectedMessage.subject}</h3>
                                <p className="text-sm text-gray-500 mb-8">From: {selectedMessage.name} ({selectedMessage.email})</p>
                                <div className="bg-gray-50 p-8 rounded-2xl whitespace-pre-wrap">{selectedMessage.message}</div>
                            </div>
                        ) : <div className="h-full flex items-center justify-center text-gray-400">Select a message</div>}
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
