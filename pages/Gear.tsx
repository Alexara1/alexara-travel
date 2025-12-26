
import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { ShoppingBag, ArrowUpRight, Search, X } from 'lucide-react';
import AdContainer from '../components/AdContainer';

const Gear: React.FC = () => {
  const { gear, settings } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = gear.map(item => item.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [gear]);

  const filteredGear = useMemo(() => {
    if (activeCategory === 'All') return gear;
    return gear.filter(item => item.category === activeCategory);
  }, [gear, activeCategory]);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Essential Travel Gear</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Travel smarter and lighter with our curated selection of top-rated luggage, tech, and accessories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        activeCategory === cat 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {filteredGear.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {filteredGear.map((item) => (
              <div key={item.id} className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                  {item.video ? (
                     <div className="absolute inset-0">
                         <video src={item.video} controls className="w-full h-full object-cover" />
                     </div>
                  ) : (
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                  )}
                   
                   {!item.video && (
                      <div className="absolute top-2 right-2">
                          <span className="bg-white/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-600">{item.category}</span>
                      </div>
                   )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    <a 
                      href={item.affiliateLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-bold text-secondary hover:text-teal-700 transition-colors"
                    >
                      Check Price <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
             <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p>No gear found in this category.</p>
          </div>
        )}

        {/* Global Ad Banner */}
        {settings.ads?.enabled && settings.ads?.headerBanner && (
            <div className="flex justify-center border-t border-gray-50 pt-12">
                <AdContainer code={settings.ads.headerBanner} label="Recommended Gear Sponsor" />
            </div>
        )}
      </div>
    </div>
  );
};

export default Gear;
