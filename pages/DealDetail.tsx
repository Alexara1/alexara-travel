
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { MapPin, ArrowLeft, Star, Clock, CheckCircle, ExternalLink, ShieldCheck, Tag } from 'lucide-react';

const DealDetail: React.FC = () => {
  const { slug } = useParams();
  const { deals, t } = useSite();
  const deal = deals.find(d => d.slug === slug);

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Deal not found</h2>
        <Link to="/deals" className="text-secondary hover:underline">Return to Deals</Link>
      </div>
    );
  }

  const discount = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/deals" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
        </Link>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Media Section */}
                <div className="relative h-[400px] lg:h-auto bg-slate-900">
                    {deal.video ? (
                        <video src={deal.video} controls className="w-full h-full object-cover" poster={deal.image} />
                    ) : (
                        <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-6 left-6">
                        <span className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Save {discount}%</span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-8 md:p-16 flex flex-col">
                    <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-secondary" /> {deal.city}, {deal.location}</span>
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-secondary" /> {deal.duration}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">{deal.title}</h1>

                    <div className="mb-8">
                        <p className="text-gray-600 leading-relaxed text-lg font-light italic">
                           {deal.description || "Synthesizing luxury experiences with market-leading value. This hand-picked deal offers unparalleled access to one of the world's most breathtaking locations."}
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-10">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                        ))}
                        <span className="text-sm font-black text-gray-900 ml-2">{deal.rating} Rating</span>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl mb-10 border border-slate-100">
                        <div className="flex items-end space-x-4">
                            <div>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Architected Price</p>
                                <span className="text-5xl font-black text-primary">${deal.price}</span>
                            </div>
                            <div className="mb-1.5">
                                <span className="text-lg text-gray-400 line-through font-medium">${deal.originalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-12">
                        {['Best Price Guaranteed', 'Vetted Luxury Accommodation', 'Neural Synthesis Recommended', '24/7 Global Support'].map((feat) => (
                            <div key={feat} className="flex items-center space-x-3 text-sm font-medium text-gray-600">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{feat}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <a 
                            href={deal.affiliateLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full bg-primary hover:bg-slate-800 text-white py-5 rounded-[1.5rem] font-bold text-lg transition-all flex items-center justify-center shadow-2xl active:scale-95 group"
                        >
                            Book with Architected Savings <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <p className="text-[10px] text-gray-400 text-center mt-4 font-medium italic">
                            * Clicking book will redirect you to our trusted partner platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Detailed Content / Disclosure */}
        <div className="max-w-4xl mx-auto mt-20">
             <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center">
                    <ShieldCheck className="w-6 h-6 mr-3 text-secondary" /> Alexara Curated Insight
                </h3>
                <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                    <p>This experience has been synthesized by our travel architects specifically for its unique value-to-luxury ratio. Whether you're exploring the winding streets of {deal.city} or relaxing at a premium {deal.categories[0]}, this deal represents a top-tier recommendation from our collective.</p>
                    <p>We analyze thousands of data points daily to ensure the rates provided through our affiliate partners are among the most competitive available in the global travel marketplace. Please note that availability is dynamic and subject to node synchronization delays.</p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Experience Categories:</h4>
                    <div className="flex flex-wrap gap-2">
                        {deal.categories.map(cat => (
                            <span key={cat} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{cat}</span>
                        ))}
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetail;