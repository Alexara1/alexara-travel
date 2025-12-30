
import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { MapPin, ArrowRight } from 'lucide-react';

const Destinations: React.FC = () => {
  const { destinations, t } = useSite();

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">{t('dest_title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('dest_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
           {/* Featured Large */}
           <div className="md:col-span-2 relative h-96 rounded-2xl overflow-hidden shadow-xl group">
             <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80" alt="France" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h2 className="text-4xl font-bold text-white mb-2">{t('dest_featured_title')}</h2>
                <p className="text-gray-200 mb-4 max-w-xl">{t('dest_featured_desc')}</p>
                <Link 
                  to={`/deals?country=${encodeURIComponent('France')}`} 
                  className="inline-flex items-center w-fit bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary hover:text-white transition-all transform hover:scale-105"
                >
                  {t('dest_find_deals')} {t('dest_featured_title')} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 relative bg-black">
                {dest.video ? (
                    <video src={dest.video} controls className="w-full h-full object-cover" />
                ) : (
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                )}
                
                {!dest.video && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t(dest.continent)}
                    </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-secondary" />
                  {dest.name}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">{dest.description}</p>
                <Link 
                  to={`/deals?country=${encodeURIComponent(dest.name)}`} 
                  className="block w-full text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  {t('dest_find_deals')} {dest.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
