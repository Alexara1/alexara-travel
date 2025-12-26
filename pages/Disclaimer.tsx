import React from 'react';
import { AlertCircle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
              <AlertCircle className="w-8 h-8 text-accent mr-3" />
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Affiliate Disclaimer</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-gray-700">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                 <p className="font-bold text-yellow-800 m-0">Transparency is important to us.</p>
            </div>
            
            <p className="mb-4">Alexara allows you to book travel experiences and buy gear through our partners.</p>
            <p className="mb-4">Please note that some of the links on this website are <strong>affiliate links</strong>. This means that if you click on a link and make a purchase, we may earn a small commission at no extra cost to you.</p>
            <p className="mb-4">This helps support our team and allows us to continue creating high-quality travel guides and content for you.</p>
            <p className="mb-4">We only recommend products and services that we trust and believe will add value to our readers.</p>
          </div>
        </div>
    </div>
  );
};

export default Disclaimer;