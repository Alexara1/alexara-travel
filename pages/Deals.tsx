
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Tag, Clock, Star, Check, MapPin, Search, Send, MailCheck, X, Building2, Bed, UtensilsCrossed, Music2, Palmtree, Tent, Sparkles, SlidersHorizontal, ChevronRight, Ticket, Package } from 'lucide-react';

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
    { name: 'All', icon: Sparkles },
    { name: 'Hotel', icon: Building2 },
    { name: 'Hostel', icon: Bed },
    { name: 'Restaurant', icon: UtensilsCrossed },
    { name: 'Nightclub', icon: Music2 },
    { name: 'Beach', icon: Palmtree },
    { name: 'Resort', icon: Tent },
    { name: 'Ticket', icon: Ticket },
    { name: 'Package', icon: Package }
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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">{t('nav_deals')}</h1>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-6 text-primary font-bold">
            <SlidersHorizontal className="w-5 h-5" /> <span>{t('deals_refine')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">{t('deals_country')}</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">{t('deals_category')}</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}>{cat.name}</button>
                ))}
              </div>
            </div>
          </div>
          {(selectedCountry !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button onClick={() => { setSelectedCountry('All'); setSelectedCategory('All'); setSearchQuery(''); }} className="mt-8 text-xs font-bold text-red-400 flex items-center">
              <X className="w-4 h-4 mr-1" /> {t('deals_reset')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100">
                    <img src={deal.image} alt={deal.title} className="h-56 object-cover" />
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs font-bold text-secondary uppercase mb-2">{deal.location}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-primary">{deal.title}</h3>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-2xl font-black text-primary">${deal.price}</span>
                            <a href={deal.affiliateLink} target="_blank" rel="noopener" className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm">{t('btn_book')}</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
