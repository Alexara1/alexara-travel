
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { ShoppingBag, ArrowLeft, CheckCircle, ExternalLink, ShieldCheck, Tag, Info, Truck } from 'lucide-react';

const GearDetail: React.FC = () => {
  const { slug } = useParams();
  const { gear, t } = useSite();
  const item = gear.find(g => g.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gear not found</h2>
        <Link to="/gear" className="text-secondary hover:underline">Return to Gear</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/gear" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image/Video */}
            <div className="space-y-6">
                <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 aspect-square flex items-center justify-center group">
                    {item.video ? (
                        <video src={item.video} controls className="w-full h-full object-contain" poster={item.image} />
                    ) : (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" />
                    )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center opacity-40">
                            <ShoppingBag className="w-6 h-6 text-slate-300" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{item.category}</span>
                    <div className="flex items-center text-green-600 font-bold text-sm">
                        <Truck className="w-4 h-4 mr-2" /> <span>Global Node Shipping</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">{item.name}</h1>
                
                <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-100">
                    <span className="text-4xl font-black text-primary">${item.price}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">In Synthesis</span>
                </div>

                <div className="space-y-6 mb-12">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-secondary" /> Product Specification
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg font-light">{item.description}</p>
                    <ul className="space-y-3">
                        {['Engineered for Durability', 'Optimized Weight Distribution', 'TSA Compliance Certified', 'Lifetime Synthesis Support'].map(spec => (
                            <li key={spec} className="flex items-center space-x-3 text-sm text-gray-500">
                                <CheckCircle className="w-4 h-4 text-secondary" />
                                <span>{spec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-8">
                    <a 
                        href={item.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-primary hover:bg-slate-800 text-white py-5 rounded-[1.5rem] font-bold text-lg transition-all flex items-center justify-center shadow-2xl active:scale-95 group"
                    >
                        Check Availability <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                        <ShieldCheck className="w-6 h-6 text-secondary shrink-0" />
                        <p className="text-xs text-gray-500 leading-relaxed">
                            This product is part of the Alexara Curated Collection. We only recommend gear that meets our rigorous standards for modern travelers. Purchases made through this link support our independent travel reporting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GearDetail;
