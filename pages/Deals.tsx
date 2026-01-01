
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Tag, Clock, Star, Check, MapPin, Search, Send, MailCheck, X, Building2, Bed, UtensilsCrossed, Music2, Palmtree, Tent, Sparkles, SlidersHorizontal, ChevronRight, Ticket, Package, ImageIcon } from 'lucide-react';
import { Deal } from '../types';

const DealCard: React.FC<{ deal: Deal; t: (k: string) => string }> = ({ deal, t }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-gray-400 space-y-2">
            <ImageIcon className="w-12 h-12 opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Image Unavailable</span>
          </div>
        ) : (
          <img 
            src={deal.image} 
            alt={deal.title} 
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          />
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {deal.categories.map(cat => (
            <span key={cat} className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black uppercase text-gray-700 shadow-sm border border-white/50">
              {t(`cat_${cat.toLowerCase()}`)}
            </span>
          ))}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">{deal.location}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 group-hover:text-primary transition-colors leading-tight">{deal.title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 line-through mb-1">${deal.originalPrice}</div>
            <div className="text-3xl font-black text-primary">${deal.price}</div>
          </div>
          <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95">
            {t('btn_book')}
          </a>
        </div>
      </div>
    </div>
  );
};

const Deals: React.FC = () => {
  const { deals, settings, t } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const urlCountry = queryParams.get('country');

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => { if (urlCountry) setSelectedCountry(urlCountry); }, [urlCountry]);

  const categories = [
    { name: 'All', key: 'All', icon: Sparkles },
    { name: 'Hotel', key: 'cat_hotel', icon: Building2 },
    { name: 'Hostel', key: 'cat_hostel', icon: Bed },
    { name: 'Restaurant', key: 'cat_restaurant', icon: UtensilsCrossed },
    { name: 'Nightclub', key: 'cat_nightclub', icon: Music2 },
    { name: 'Beach', key: 'cat_beach', icon: Palmtree },
    { name: 'Resort', key: 'cat_resort', icon: Tent },
    { name: 'Ticket', key: 'cat_ticket', icon: Ticket },
    { name: 'Package', key: 'cat_package', icon: Package }
  ];

  const countries = useMemo(() => ['All', ...Array.from(new Set(deals.map(d => d.location)))], [deals]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesCountry = selectedCountry === 'All' || deal.location === selectedCountry;
      const matchesCategory = selectedCategory === 'All' || deal.categories.includes(selectedCategory as any);
      const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesCategory && matchesSearch;
    });
  }, [deals, selectedCountry, selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">{t('nav_deals')}</h1>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-6 text-primary font-bold">
            <SlidersHorizontal className="w-5 h-5" /> <span>Refine Selection</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Country</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button 
                        key={cat.name} 
                        onClick={() => setSelectedCategory(cat.name)} 
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                    >
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.key === 'All' ? 'All' : t(cat.key)}
                    </button>
                ))}
              </div>
            </div>
          </div>
          {(selectedCountry !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button onClick={() => { setSelectedCountry('All'); setSelectedCategory('All'); setSearchQuery(''); }} className="mt-8 text-xs font-bold text-red-400 flex items-center">
              <X className="w-4 h-4 mr-1" /> Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} t={t} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
