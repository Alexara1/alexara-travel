
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Sparkles, BrainCircuit, Navigation } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Home: React.FC = () => {
  const { settings, destinations, deals, t } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const featuredDestinations = destinations.slice(0, 4);
  const featuredDeals = deals.slice(0, 3);

  const heroSlides = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Added pt-20 to account for fixed navbar height */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 mt-20">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
              }`}
            >
              <img src={slide} alt="" className={`w-full h-full object-cover ${index === currentSlide ? 'animate-[slow-zoom_15s_linear_infinite]' : ''}`} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90"></div>
          {/* Scanline and Mesh adjusted to avoid top-edge flickering */}
          <div className="scanline-overlay opacity-30"></div>
          <div className="absolute inset-0 neural-mesh opacity-10 top-0"></div>
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto py-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] mb-10 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span>{t('hero_badge')}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-[1.05] tracking-tighter">
            {t('hero_title_1')} <br/> <span className="text-secondary italic">{t('hero_title_2')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-50 mb-14 font-light drop-shadow-lg max-w-3xl mx-auto leading-relaxed opacity-90">
            {settings.heroSubtitle}
          </p>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white/95 p-2.5 rounded-[2.8rem] shadow-3xl flex flex-col md:flex-row items-center border border-white/30 backdrop-blur-2xl hover:shadow-secondary/20 transition-all duration-500 relative z-30">
              <div className="flex-1 w-full md:w-auto px-8 py-5 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center">
                  <Navigation className="text-secondary w-5 h-5 mr-4" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_placeholder')} 
                    className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400 font-bold text-lg" 
                  />
                </div>
              </div>
              <div className="w-full md:w-auto px-2 py-2 md:py-0">
                <button type="submit" className="w-full md:w-auto bg-primary hover:bg-slate-800 text-white font-black py-5 px-12 rounded-[2.3rem] transition-all duration-300 flex items-center justify-center shadow-xl group">
                  <Search className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
                  {t('search_btn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                  <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                    <BrainCircuit className="w-4 h-4" />
                    <span>{t('home_innovation_badge')}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-[1.1]">
                    {t('home_innovation_title_1')} <br/> <span className="text-secondary italic">{t('home_innovation_title_2')}</span>
                  </h2>
                  <p className="text-blue-100/70 text-lg mb-12 leading-relaxed max-w-xl">
                    {t('home_innovation_desc')}
                  </p>
                  <div className="mt-16">
                      <Link to="/ai-planner" className="bg-secondary hover:bg-teal-500 text-white font-bold px-12 py-5 rounded-full shadow-3xl transition-all transform hover:scale-105 inline-flex items-center group">
                          {t('nav_planner')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Link>
                  </div>
              </div>
              
              <div className="relative h-[600px] w-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] shadow-3xl overflow-hidden p-12 flex flex-col">
                      <div className="flex items-center justify-between mb-12">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                                  <Navigation className="w-7 h-7 text-white" />
                              </div>
                              <h4 className="text-white font-bold text-lg tracking-tight">Neural Navigator</h4>
                          </div>
                      </div>
                      <div className="flex-1 relative flex items-center justify-center">
                          <BrainCircuit className="w-24 h-24 text-secondary/30 animate-pulse" />
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">{t('home_trending_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((dest) => (
              <Link to={`/search?q=${encodeURIComponent(dest.name)}`} key={dest.id} className="group relative overflow-hidden rounded-[2.5rem] shadow-xl h-96 block bg-slate-200">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent flex flex-col justify-end p-8">
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{t(dest.continent)}</span>
                  <h3 className="text-white text-3xl font-bold mb-3">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-16 text-center">{t('home_exclusive_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-500 group flex flex-col h-full">
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center shadow-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                    <span className="text-sm font-black text-gray-900">{deal.rating}</span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>{deal.duration}</span>
                    <span className="text-secondary">{deal.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">{deal.title}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-3xl font-black text-primary">${deal.price}</div>
                    <Link to="/deals" className="bg-primary hover:bg-slate-800 text-white p-5 rounded-2xl transition-all shadow-xl group/btn">
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
