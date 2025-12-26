
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Tag, Clock, Star, Check, MapPin, Search, Send, MailCheck, X, Building2, Bed, UtensilsCrossed, Music2, Palmtree, Tent, Sparkles, SlidersHorizontal, ChevronRight, Ticket, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdContainer from '../components/AdContainer';

const Deals: React.FC = () => {
  const { deals, settings } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  // Get initial filters from URL
  const queryParams = new URLSearchParams(location.search);
  const urlCountry = queryParams.get('country');
  const urlCity = queryParams.get('city');

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle incoming URL parameters
  useEffect(() => {
    if (urlCountry) {
        setSelectedCountry(urlCountry);
        if (urlCity) {
            setSelectedCity(urlCity);
        } else {
            setSelectedCity('All');
        }
    }
  }, [urlCountry, urlCity]);

  // Categories with Icons
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

  // Derive unique countries
  const countries = useMemo(() => {
    return ['All', ...Array.from(new Set(deals.map(d => d.location)))];
  }, [deals]);

  // Derive cities based on selected country
  const cities = useMemo(() => {
    const filteredDeals = selectedCountry === 'All' 
      ? deals 
      : deals.filter(d => d.location === selectedCountry);
    return ['All', ...Array.from(new Set(filteredDeals.map(d => d.city)))];
  }, [deals, selectedCountry]);

  // Comprehensive filter logic
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesCountry = selectedCountry === 'All' || deal.location === selectedCountry;
      const matchesCity = selectedCity === 'All' || deal.city === selectedCity;
      const matchesCategory = selectedCategory === 'All' || deal.categories.includes(selectedCategory as any);
      const matchesSearch = 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        deal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesCity && matchesCategory && matchesSearch;
    });
  }, [deals, selectedCountry, selectedCity, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCountry('All');
    setSelectedCity('All');
    setSelectedCategory('All');
    setSearchQuery('');
    navigate('/deals', { replace: true });
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity('All'); // Reset city when country changes
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-gray-200 pb-8">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Exclusive Travel Deals</h1>
            <p className="text-gray-600 max-w-xl">Find your perfect escape with our curated selection of luxury hotels, beachfront resorts, and vibrant nightlife across the globe.</p>
          </div>
          <div className="w-full md:w-auto">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
             </div>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-6 text-primary font-bold">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Refine Your Search</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Country Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-secondary outline-none cursor-pointer"
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">City</label>
              <select 
                value={selectedCity}
                disabled={selectedCountry === 'All'}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={`w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-secondary outline-none cursor-pointer ${selectedCountry === 'All' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Category Icons Grid */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category Filter</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive 
                        ? 'bg-primary text-white border-primary shadow-md transform scale-105' 
                        : 'bg-white text-gray-600 border-gray-100 hover:border-secondary hover:bg-secondary/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                      <span>{cat.name}s</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {(selectedCountry !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                <button 
                  onClick={clearFilters}
                  className="text-xs font-bold text-red-400 hover:text-red-600 flex items-center transition-colors"
                >
                  <X className="w-4 h-4 mr-1" /> Reset All Filters
                </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center text-sm text-gray-500 font-medium">
            <span>Showing {filteredDeals.length} {filteredDeals.length === 1 ? 'exceptional offer' : 'exceptional offers'}</span>
            <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
            <span className="text-secondary">
              {selectedCountry} {selectedCity !== 'All' ? ` > ${selectedCity}` : ''} {selectedCategory !== 'All' ? ` > ${selectedCategory}s` : ''}
            </span>
        </div>

        {/* Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col h-full">
                <div className="relative h-56 bg-slate-200 overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center shadow-sm border border-white/50">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs font-bold text-gray-800">{deal.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                     {deal.categories?.map(cat => (
                        <span key={cat} className="bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-lg">
                            {cat}
                        </span>
                     ))}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                     <MapPin className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                     {deal.city}, {deal.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">{deal.title}</h3>
                  
                  <div className="flex items-center text-gray-500 text-xs mb-6 space-x-4">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {deal.duration}</span>
                    <span className="flex items-center"><Check className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Best Price</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through mb-1">Was ${deal.originalPrice}</div>
                      <div className="text-2xl font-black text-primary">${deal.price}</div>
                    </div>
                    <a 
                      href={deal.affiliateLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-1"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No matches found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any {selectedCategory !== 'All' ? selectedCategory.toLowerCase() + 's' : 'deals'} matching those criteria. Try expanding your search!</p>
              <button onClick={clearFilters} className="mt-8 text-secondary font-bold hover:underline flex items-center justify-center mx-auto">
                 <X className="w-4 h-4 mr-2" /> Reset all filters
              </button>
          </div>
        )}

        {/* Affiliate Concierge Banner */}
        <div className="mt-20 bg-gradient-to-br from-primary to-slate-800 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                 <div className="inline-flex items-center justify-center bg-secondary/20 backdrop-blur-xl p-4 rounded-full mb-8">
                    <MailCheck className="w-8 h-8 text-secondary" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Need a Custom Itinerary?</h2>
                 <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                    Our travel experts specialize in finding off-market affiliate deals. Share your dream destination, and we'll send a personalized list of direct booking links to your inbox.
                 </p>
                 
                 <button 
                    onClick={() => navigate('/contact')}
                    className="bg-secondary hover:bg-teal-400 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl transition-all transform hover:scale-105 inline-flex items-center"
                 >
                    <Send className="w-5 h-5 mr-3" /> Get Your Free Guide
                 </button>
             </div>
             
             {/* Abstract Decor */}
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
