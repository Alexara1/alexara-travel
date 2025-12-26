
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, Settings, User, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, isAdminMode } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Planner', path: '/ai-planner', icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-accent animate-pulse" /> },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Deals', path: '/deals' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gear', path: '/gear' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {settings.logo ? (
                 <img src={settings.logo} alt={settings.siteName} className="h-10 w-auto object-contain" />
            ) : (
                <>
                    <div className="bg-primary p-2 rounded-lg">
                    <Plane className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-primary tracking-tight">
                    {settings.siteName}
                    </span>
                </>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-secondary flex items-center ${
                  isActive(link.path) ? 'text-secondary font-bold' : 'text-gray-600'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/deals"
              className="bg-secondary hover:bg-teal-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
            
            {/* Admin Link */}
            <Link 
              to="/admin"
              className={`p-2 rounded-full transition-colors ${isAdminMode ? 'bg-primary text-white shadow-inner' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
              title="Admin Panel"
            >
              {isAdminMode ? <Settings className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-secondary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex items-center justify-between px-3">
                 <Link
                  to="/deals"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-secondary text-white px-4 py-2 rounded-md font-medium"
                >
                  Book Now
                </Link>
                <Link 
                  to="/admin"
                  onClick={() => setIsOpen(false)} 
                  className={`ml-4 p-2 rounded-full ${isAdminMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                >
                    {isAdminMode ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
