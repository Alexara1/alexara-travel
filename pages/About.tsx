
import React from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle, Globe, Users, ShieldCheck, Map } from 'lucide-react';

const About: React.FC = () => {
  const { settings, t } = useSite();

  const team = [
    { name: "Alex Johnson", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg", bio: "With over 15 years in the travel industry, Alex's vision for Alexara was born from a desire to blend technology with human discovery." },
    { name: "Sarah Williams", role: "Head of Travel Content", img: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Sarah leads our editorial team, ensuring every guide and review meets our rigorous standards for honesty and detail." },
    { name: "David Chen", role: "Partnerships Director", img: "https://randomuser.me/api/portraits/men/22.jpg", bio: "David manages our relationships with the world's best travel providers to bring exclusive value to our collective." },
    { name: "Emily Davis", role: "Lead Travel Architect", img: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Emily oversees the neural planning algorithms, ensuring AI results are grounded in real-world travel expertise." },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="bg-primary text-white py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">{t('about_mission_title')}</h1>
            <p className="text-xl text-blue-100 leading-relaxed font-light opacity-90">Architecting the future of travel through curated intelligence and human expertise.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Deep Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start mb-32">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-serif font-bold text-primary">Our Story & Purpose</h2>
            <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
              <p>
                Alexara Travel was founded in 2023 with a singular mission: to restore the magic of discovery to the modern traveler. In an era of infinite choices and information overload, we recognized that the true challenge wasn't finding a flight or a hotel—it was finding the *right* one.
              </p>
              <p>
                Our platform is more than just a booking site; it is a synthesis of cutting-edge travel intelligence and deep, human-curated expertise. We specialize in sharing in-depth travel guides, honest hotel reviews, and meticulously vetted destination tips that help you plan better, smarter trips. 
              </p>
              <p>
                Every piece of content on Alexara—from our neural-planned itineraries to our artisanal gear recommendations—is original and updated regularly. We believe that travel should be transformative, and that transformation begins with a plan you can trust.
              </p>
              <p>
                As a travel-focused digital collective, we pride ourselves on helping travelers navigate the complexities of global exploration. Whether you're seeking a hidden beach in Thailand or the best flight hacking tips for 2024, our team is dedicated to providing the practical advice and inspiration you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <Globe className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Global Vision</h3>
                <p className="text-sm text-gray-600">Connecting travelers with the world's most breathtaking and culturally rich destinations.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <ShieldCheck className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Transparency First</h3>
                <p className="text-sm text-gray-600">Commitment to honest reviews and clear affiliate disclosures in every interaction.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-8 lg:sticky lg:top-32">
             <h3 className="text-2xl font-serif font-bold">The Alexara Edge</h3>
             <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-4 mt-1 shrink-0" />
                  <div>
                    <span className="font-bold block">Original Content</span>
                    <p className="text-xs text-gray-400 mt-1">Deeply researched guides written by professional travelers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-4 mt-1 shrink-0" />
                  <div>
                    <span className="font-bold block">Neural Synthesis</span>
                    <p className="text-xs text-gray-400 mt-1">AI-powered planning grounded in real-time travel data.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-4 mt-1 shrink-0" />
                  <div>
                    <span className="font-bold block">Expert Community</span>
                    <p className="text-xs text-gray-400 mt-1">A global collective sharing verified experiences.</p>
                  </div>
                </li>
             </ul>
             <div className="pt-6 border-t border-slate-800">
                <p className="text-xs text-gray-500 italic">"Travel is the only thing you buy that makes you richer."</p>
             </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-16">{t('about_team')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {team.map((member, i) => (
                    <div key={i} className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                        <div className="relative mb-8 flex justify-center">
                            <div className="absolute inset-0 bg-secondary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100"></div>
                            <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto relative z-10 border-4 border-white shadow-xl group-hover:border-secondary transition-colors" />
                        </div>
                        <h3 className="font-bold text-2xl text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-secondary text-sm font-black uppercase tracking-widest mb-4">{member.role}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
