
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { MapPin, ArrowLeft, Globe, Tag, Sparkles, Navigation, ExternalLink, ArrowRight, Ticket, Zap } from 'lucide-react';

const DestinationDetail: React.FC = () => {
  const { slug } = useParams();
  const { destinations, deals, t } = useSite();
  const dest = destinations.find(d => d.slug === slug);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h2>
        <Link to="/destinations" className="text-secondary hover:underline">Return to Destinations</Link>
      </div>
    );
  }

  const relatedDeals = deals.filter(deal => deal.location === dest.name);

  return (
    <div className="bg-white min-h-screen pb-20 pt-20">
      {/* Hero Media Section */}
      <div className="h-[60vh] relative w-full bg-slate-900 overflow-hidden">
        {dest.video ? (
             <video src={dest.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
        ) : (
             <img src={dest.image} alt={dest.name} className="w-full h-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
                <div className="flex items-center space-x-3 text-secondary text-sm font-bold uppercase tracking-[0.3em] mb-4">
                    <Navigation className="w-4 h-4" />
                    <span>{dest.continent}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">{dest.name}</h1>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/destinations" className="inline-flex items-center text-gray-500 hover:text-primary mb-12 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Destinations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif font-bold text-primary mb-8">About {dest.name}</h2>
                <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed mb-16">
                    <p className="text-xl mb-6 font-light italic text-slate-500">{dest.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Whether you're exploring ancient ruins, dining in Michelin-starred restaurants, or finding peace in nature, {dest.name} offers a unique synthesis of culture and beauty. Our travel architects have explored every corner of this destination to ensure your journey is nothing short of extraordinary.</p>
                </div>

                {/* --- CONVERSION BRIDGE: AUTOMATIC COUNTRY LINK --- */}
                <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group shadow-2xl">
                    {/* Animated background elements for "Neural" feel */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-secondary/20 transition-all duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                    <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center space-x-2 text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Direct Deals Synchronized</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            The best {dest.name} <br/> <span className="text-secondary italic">savings found.</span>
                        </h3>
                        
                        <p className="text-blue-100/60 mb-12 max-w-lg text-lg leading-relaxed">
                            Our synthesis core has identified a collection of high-value hotel rates, flight packages, and local experiences specific to {dest.name}.
                        </p>
                        
                        <Link 
                            to={`/deals?country=${encodeURIComponent(dest.name)}`} 
                            className="inline-flex items-center bg-white text-primary hover:bg-secondary hover:text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group/btn"
                        >
                            Explore {dest.name} Deals <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Global Search Affiliate CTA */}
                {dest.affiliateLink && (
                  <div className="bg-secondary p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <h3 className="text-xl font-bold mb-4 relative z-10">Search All Stays</h3>
                      <p className="text-blue-50 text-sm mb-8 opacity-90 relative z-10">Find thousands of verified hotels, hostels, and resorts in {dest.name} at the best market rates.</p>
                      <a 
                        href={dest.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-white text-secondary py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-50 transition-all shadow-lg group/link relative z-10"
                      >
                        Explore {dest.name} Hotels <ExternalLink className="ml-2 w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                  </div>
                )}

                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                        <Tag className="w-5 h-5 mr-2 text-secondary" /> Handpicked for You
                    </h3>
                    {relatedDeals.length > 0 ? (
                        <div className="space-y-4">
                            {relatedDeals.slice(0, 5).map(deal => (
                                <Link key={deal.id} to={`/deals/${deal.slug}`} className="block group">
                                    <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-transparent group-hover:border-secondary transition-all">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                            <img src={deal.image} className="w-full h-full object-cover" alt={deal.title} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-secondary">{deal.title}</h4>
                                            <p className="text-xs text-secondary font-black mt-1">Starting from ${deal.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 italic">No specific deals currently tracked for this region. Check back soon for curated syntheses.</p>
                    )}
                </div>

                <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                        <Globe className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 relative z-10">Architect your Journey</h3>
                    <p className="text-blue-100/70 text-sm mb-8 relative z-10">Use our AI synthesis core to build a unique itinerary for {dest.name}.</p>
                    <Link to="/ai-planner" className="inline-flex items-center text-white bg-secondary px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-600 transition-all relative z-10">
                        <Sparkles className="w-4 h-4 mr-2" /> Start AI Planning
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
