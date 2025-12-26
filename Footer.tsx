
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Share2, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

// Helper to get icon by platform name
const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const props = { className: "h-5 w-5" };

  if (p === 'facebook') return <Facebook {...props} />;
  if (p === 'twitter') return <Twitter {...props} />;
  if (p === 'instagram') return <Instagram {...props} />;
  if (p === 'linkedin') return <Linkedin {...props} />;
  if (p === 'youtube') return <Youtube {...props} />;
  
  // Custom SVGs
  if (p === 'tiktok') return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
  if (p === 'pinterest') return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <line x1="12" y1="5" x2="12" y2="19" />
       <line x1="5" y1="12" x2="19" y2="12" />
       <path d="M9 5c2-2 5-2 7 0" />
       <circle cx="12" cy="12" r="10" />
    </svg>
  );

  return <Share2 {...props} />;
};

const Footer: React.FC = () => {
  const { settings } = useSite();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const socialLinks = settings.socialMedia || [];
  const { address, phone, email } = settings.contact || { address: '', phone: '', email: '' };

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (emailValue.trim()) {
          setIsSubscribed(true);
          setTimeout(() => {
              setIsSubscribed(false);
              setEmailValue('');
          }, 6000);
      }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">{settings.siteName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Inspiring wanderlust and connecting you with the world's most breathtaking destinations. Your journey begins here.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {socialLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-secondary transition-colors" 
                    title={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/destinations" className="text-gray-400 hover:text-secondary text-sm transition-colors">Destinations</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-secondary text-sm transition-colors">Travel Deals</Link></li>
              <li><Link to="/gear" className="text-gray-400 hover:text-secondary text-sm transition-colors">Travel Gear</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-secondary text-sm transition-colors">Travel Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span className="whitespace-pre-line">{address || "123 Adventure Ave, Suite 400\nNew York, NY 10001"}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>{phone || "+1 (555) 123-4567"}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>{email || `hello@${settings.siteName.toLowerCase()}.com`}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive deals and travel tips.</p>
            {isSubscribed ? (
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center text-green-400 text-xs animate-in fade-in zoom-in duration-300">
                    <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                    <span>Success! Check your inbox for your welcome discount.</span>
                </div>
            ) : (
                <form className="space-y-2" onSubmit={handleSubscribe}>
                    <input 
                        type="email" 
                        required
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="Your email address" 
                        className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-secondary transition-colors text-sm"
                    />
                    <button type="submit" className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-2 rounded transition-colors text-sm shadow-md">
                        Subscribe
                    </button>
                </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Affiliate Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
