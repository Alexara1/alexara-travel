
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Share2, CheckCircle, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const props = { className: "h-5 w-5" };
  if (p === 'facebook') return <Facebook {...props} />;
  if (p === 'twitter') return <Twitter {...props} />;
  if (p === 'instagram') return <Instagram {...props} />;
  if (p === 'linkedin') return <Linkedin {...props} />;
  if (p === 'youtube') return <Youtube {...props} />;
  return <Share2 {...props} />;
};

const Footer: React.FC = () => {
  const { settings, t } = useSite();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const socialLinks = settings.socialMedia || [];
  const { address, phone, email } = settings.contact || { address: '', phone: '', email: '' };

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (emailValue.trim()) {
          setIsSubscribed(true);
          setTimeout(() => { setIsSubscribed(false); setEmailValue(''); }, 6000);
      }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white flex items-center">
              <ShieldCheck className="w-6 h-6 mr-2 text-secondary" /> {settings.siteName}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer_desc')}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              {socialLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                    {getSocialIcon(link.platform)}
                  </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">{t('footer_quick_links')}</h4>
            <ul className="space-y-3">
              <li><Link to="/destinations" className="text-gray-400 hover:text-secondary text-sm transition-colors">{t('nav_destinations')}</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-secondary text-sm transition-colors">{t('nav_deals')}</Link></li>
              <li><Link to="/gear" className="text-gray-400 hover:text-secondary text-sm transition-colors">{t('nav_gear')}</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-secondary text-sm transition-colors">{t('nav_blog')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-secondary text-sm transition-colors">{t('nav_about')}</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">{t('footer_contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span className="whitespace-pre-line">{address}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">{t('footer_newsletter')}</h4>
            {isSubscribed ? (
                <div className="bg-green-500/10 text-green-400 p-4 rounded-lg text-xs flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" /> <span>Success!</span>
                </div>
            ) : (
                <form className="space-y-2 mb-8" onSubmit={handleSubscribe}>
                    <input type="email" required value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder={t('form_email')} className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-secondary transition-all" />
                    <button type="submit" className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-2 rounded text-sm transition-colors">{t('footer_subscribe')}</button>
                </form>
            )}
          </div>
        </div>

        {/* Bottom Utility Bar (Critically Updated for Approval) */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link>
            <Link to="/privacy" className="hover:text-secondary transition-colors">{t('footer_privacy')}</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">{t('footer_terms')}</Link>
            <Link to="/disclaimer" className="hover:text-secondary transition-colors">{t('footer_disclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
