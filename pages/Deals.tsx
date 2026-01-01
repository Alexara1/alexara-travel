
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Tag, Clock, Star, Check, MapPin, Search, Send, MailCheck, X, Building2, Bed, UtensilsCrossed, Music2, Palmtree, Tent, Sparkles, SlidersHorizontal, ChevronRight, Ticket, Package, ImageIcon, Map as MapIcon } from 'lucide-react';
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
        <div className="flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-widest mb-3">
          <MapPin className="w-3 h-3" />
          <span>{deal.city}, {deal.location}</span>
        </div>
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
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => { if (urlCountry) setSelectedCountry(urlCountry); }, [urlCountry]);

  // Reset city when country changes
  useEffect(() => {
    setSelectedCity('All');
  }, [selectedCountry]);

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
  
  const cities = useMemo(() => {
    const filteredByCountry = selectedCountry === 'All' 
        ? deals 
        : deals.filter(d => d.location === selectedCountry);
    return ['All', ...Array.from(new Set(filteredByCountry.map(d => d.city)))];
  }, [deals, selectedCountry]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesCountry = selectedCountry === 'All' || deal.location === selectedCountry;
      const matchesCity = selectedCity === 'All' || deal.city === selectedCity;
      const matchesCategory = selectedCategory === 'All' || deal.categories.includes(selectedCategory as any);
      const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            deal.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesCity && matchesCategory && matchesSearch;
    });
  }, [deals, selectedCountry, selectedCity, selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 tracking-tight">{t('nav_deals')}</h1>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 mb-8 text-primary font-bold uppercase tracking-widest text-xs">
            <SlidersHorizontal className="w-4 h-4 text-secondary" /> <span>Bespoke Filter Architecture</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Country Selector */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center">
                <Globe className="w-3 h-3 mr-2" /> Country
              </label>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)} 
                className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* City Selector */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center">
                <MapIcon className="w-3 h-3 mr-2" /> City
              </label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)} 
                disabled={selectedCountry === 'All' && cities.length <= 1}
                className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            {/* Search Input */}
            <div className="lg:col-span-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center">
                    <Search className="w-3 h-3 mr-2" /> Quick Search
                </label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or city..."
                        className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-700"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-50">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Discovery Categories</label>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button 
                        key={cat.name} 
                        onClick={() => setSelectedCategory(cat.name)} 
                        className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 shadow-sm ${selectedCategory === cat.name ? 'bg-primary text-white border-primary scale-105' : 'bg-white text-gray-600 border-gray-100 hover:border-secondary'}`}
                    >
                        <cat.icon className={`w-3.5 h-3.5 ${selectedCategory === cat.name ? 'text-secondary' : 'text-gray-300'}`} />
                        {cat.key === 'All' ? 'All Experiences' : t(cat.key)}
                    </button>
                ))}
            </div>
          </div>

          {(selectedCountry !== 'All' || selectedCity !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={() => { setSelectedCountry('All'); setSelectedCity('All'); setSelectedCategory('All'); setSearchQuery(''); }} 
                    className="text-[10px] font-black text-red-400 hover:text-red-500 flex items-center uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl transition-colors"
                >
                    <X className="w-3.5 h-3.5 mr-2" /> Reset Architectural Filters
                </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} t={t} />
                ))
            ) : (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                    <ImageIcon className="w-16 h-16 mx-auto mb-6 text-gray-100" />
                    <h3 className="text-2xl font-serif font-bold text-gray-400">No matching synthesis found.</h3>
                    <p className="text-gray-300 text-sm mt-2">Try adjusting your neural search parameters.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Deals;
import { Globe } from 'lucide-react';
