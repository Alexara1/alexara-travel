
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, Settings, User, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { SupportedLanguage } from '../types';

const LanguageSelector: React.FC = () => {
  const { settings, updateSettings } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'ES', label: 'Español', flag: '🇪🇸' },
    { code: 'FR', label: 'Français', flag: '🇫🇷' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'JP', label: '日本語', flag: '🇯🇵' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'ZH', label: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === settings.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 font-bold text-xs uppercase tracking-widest border border-transparent hover:border-gray-200"
      >
        <Globe className="w-3.5 h-3.5 text-secondary" />
        <span>{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 max-h-80 overflow-y-auto custom-scrollbar">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                updateSettings({ language: lang.code });
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors hover:bg-gray-50 ${settings.language === lang.code ? 'text-secondary bg-secondary/5' : 'text-gray-600'}`}
            >
              <span>{lang.label}</span>
              <span className="text-sm">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings, isAdminMode, t } = useSite();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger state change slightly after scroll begins
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_planner'), path: '/ai-planner', icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-accent animate-pulse" /> },
    { name: t('nav_destinations'), path: '/destinations' },
    { name: t('nav_deals'), path: '/deals' },
    { name: t('nav_blog'), path: '/blog' },
    { name: t('nav_gear'), path: '/gear' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white ${
      scrolled 
        ? 'shadow-lg border-b border-gray-100 py-3 backdrop-blur-md' 
        : 'py-5 border-b-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {settings.logo ? (
                 <img src={settings.logo} alt={settings.siteName} className="h-10 w-auto object-contain" />
            ) : (
                <>
                    <div className="bg-primary p-2 rounded-lg">
                    <Plane className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight text-primary">
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
                  isActive(link.path) 
                    ? 'text-secondary font-bold' 
                    : 'text-gray-600'
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
              {t('btn_book')}
            </Link>
            
            <LanguageSelector />
            
            {/* Admin Link */}
            <Link 
              to="/admin"
              className={`p-2 rounded-full transition-all duration-300 ${
                isAdminMode 
                  ? 'bg-primary text-white shadow-inner' 
                  : 'bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}
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
        <div className="md:hidden bg-white border-t border-gray-50 absolute w-full top-full left-0 animate-in slide-in-from-top-4 duration-300 shadow-xl">
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
            <div className="pt-4 flex flex-col items-center space-y-4 px-3 border-t border-gray-100 pb-6">
                 <Link
                  to="/deals"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-secondary text-white px-4 py-3 rounded-xl font-bold"
                >
                  {t('btn_book')}
                </Link>
                <div className="flex items-center space-x-6 w-full justify-center">
                    <LanguageSelector />
                    <Link 
                        to="/admin"
                        onClick={() => setIsOpen(false)} 
                        className={`p-2.5 rounded-full ${isAdminMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                    >
                        {isAdminMode ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </Link>
                </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
