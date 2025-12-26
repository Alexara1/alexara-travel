
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
            <div className="inline-flex items-center justify-center bg-blue-50 w-24 h-24 rounded-full mb-8">
                <Compass className="w-12 h-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lost in Transit?</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
                It looks like the destination you're looking for doesn't exist or has moved to a new secret location.
            </p>
            <div className="space-y-4">
                <Link to="/" className="flex items-center justify-center w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    <Home className="w-5 h-5 mr-2" /> Back to Home
                </Link>
                <Link to="/deals" className="flex items-center justify-center w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    <Search className="w-5 h-5 mr-2" /> Find a Deal
                </Link>
            </div>
        </div>
        <p className="mt-8 text-gray-400 text-sm">Error Code: DESTINATION_NOT_FOUND</p>
      </div>
    </div>
  );
};

export default NotFound;
