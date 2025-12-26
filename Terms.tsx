import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Terms of Service</h1>
          <div className="prose prose-slate max-w-none text-gray-700">
            <p className="mb-4 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">Welcome to Alexara. By accessing our website, you agree to these terms.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">1. Acceptance of Terms</h2>
            <p className="mb-4">By using our services, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">2. Affiliate Disclosure</h2>
            <p className="mb-4">Alexara participates in various affiliate marketing programs. We may earn a commission on purchases made through links on our site.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">3. Limitation of Liability</h2>
            <p className="mb-4">Alexara shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the site.</p>
          </div>
        </div>
    </div>
  );
};

export default Terms;