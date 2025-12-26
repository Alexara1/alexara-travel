import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-gray-700">
            <p className="mb-4 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">At Alexara, we prioritize your privacy. This policy explains how we collect, use, and protect your personal information.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">1. Information We Collect</h2>
            <p className="mb-4">We collect information you provide directly to us, such as when you subscribe to our newsletter, use our contact form, or book a trip through our partners.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">2. How We Use Information</h2>
            <p className="mb-4">We use your information to improve our services, communicate with you, and prevent fraud.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">3. Third-Party Links</h2>
            <p className="mb-4">Our site contains affiliate links. When you click on these links, you may be directed to a third-party site. We are not responsible for the privacy practices of these sites.</p>
          </div>
        </div>
    </div>
  );
};

export default Privacy;