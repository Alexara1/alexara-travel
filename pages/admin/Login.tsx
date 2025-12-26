
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { INITIAL_SETTINGS } from '../../constants';
import { Lock, User, Plane, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  
  const { login, settings, updateSettings } = useSite();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
       // Context handles navigation via isAdminMode change in AppContent
    } else {
      setError('Invalid credentials');
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will reset the admin email and password to the original defaults.")) {
        updateSettings({
            adminEmail: INITIAL_SETTINGS.adminEmail,
            adminPassword: INITIAL_SETTINGS.adminPassword
        });
        setEmail(INITIAL_SETTINGS.adminEmail || '');
        setPassword(INITIAL_SETTINGS.adminPassword || '');
        setError('');
        setShowRecovery(false);
        alert(`Credentials reset successfully!\n\nEmail: ${INITIAL_SETTINGS.adminEmail}\nPassword: ${INITIAL_SETTINGS.adminPassword}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-none shadow-2xl w-full max-w-md overflow-hidden border border-gray-800 relative">
        
        {/* Decorative top strip */}
        <div className="h-1 w-full bg-white"></div>

        <div className="bg-black p-10 text-center border-b border-gray-800 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-black to-black"></div>
            
            <div className="relative z-10">
                <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6 shadow-glow">
                    <Lock className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-wider uppercase">Admin Panel</h1>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Secure Access Point</p>
            </div>
        </div>
        
        <div className="p-10 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-black text-white px-4 py-3 text-sm text-center flex items-center justify-center border border-gray-800">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}

                {/* Recovery Mode UI */}
                {showRecovery && (
                    <div className="bg-gray-100 border-l-4 border-black p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-start">
                             <RefreshCw className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" />
                             <div>
                                 <h4 className="text-sm font-bold text-black mb-1 uppercase tracking-wide">Recovery Mode</h4>
                                 <p className="text-xs text-gray-600 mb-3">
                                     Reset credentials to factory defaults?
                                 </p>
                                 <button 
                                    type="button"
                                    onClick={handleReset}
                                    className="text-xs bg-black text-white font-bold px-4 py-2 hover:bg-gray-800 transition-colors uppercase tracking-wider"
                                 >
                                     Reset Credentials
                                 </button>
                             </div>
                        </div>
                    </div>
                )}
                
                <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                        </div>
                        <input
                            type="email"
                            required
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all rounded-none"
                            placeholder="admin@alexara.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-black uppercase tracking-wider">Password</label>
                        <button 
                            type="button"
                            onClick={() => setShowRecovery(!showRecovery)}
                            className="text-xs font-medium text-gray-500 hover:text-black transition-colors underline decoration-dotted"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all rounded-none"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 transition-all duration-300 uppercase tracking-widest text-sm shadow-lg hover:shadow-xl"
                >
                    Authenticate
                </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <button onClick={() => navigate('/')} className="text-xs text-gray-500 hover:text-black font-bold uppercase tracking-wider flex items-center justify-center w-full transition-colors">
                   <ArrowLeft className="w-3 h-3 mr-2" /> Back to Site
                </button>
            </div>
        </div>
      </div>
      <p className="mt-8 text-gray-600 text-[10px] uppercase tracking-widest opacity-60">
        &copy; {new Date().getFullYear()} {settings.siteName}. System Secured.
      </p>
    </div>
  );
};

export default Login;
