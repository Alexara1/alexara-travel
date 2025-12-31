
import React from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { settings, t } = useSite();

  const team = [
    { name: "Alex Johnson", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sarah Williams", role: "Head of Travel", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "David Chen", role: "Partnerships", img: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Emily Davis", role: "Editor in Chief", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="bg-primary text-white py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">{t('about_mission_title')}</h1>
            <p className="text-xl text-blue-100 leading-relaxed font-light opacity-90">{settings.heroSubtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group">
                <div className="absolute -inset-4 bg-secondary/10 rounded-[3rem] blur-2xl group-hover:bg-secondary/20 transition-all"></div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team collaborating" className="rounded-[2.5rem] shadow-2xl w-full relative z-10" />
            </div>
            <div>
                <h2 className="text-4xl font-serif font-bold text-primary mb-8 leading-tight">{t('about_who_we_are')}</h2>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">{t('footer_desc')}</p>
                <ul className="space-y-6">
                    {["about_feature_1", "about_feature_2", "about_feature_3"].map((key, i) => (
                        <li key={i} className="flex items-center text-gray-800 font-bold text-lg">
                            <div className="bg-secondary/10 p-2 rounded-full mr-4 shadow-sm">
                                <CheckCircle className="text-secondary w-6 h-6" />
                            </div>
                            {t(key)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-16">{t('about_team')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {team.map((member, i) => (
                    <div key={i} className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                        <div className="relative mb-8 flex justify-center">
                            <div className="absolute inset-0 bg-secondary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100"></div>
                            <img src={member.img} alt={member.name} className="w-40 h-40 rounded-full mx-auto relative z-10 border-4 border-white shadow-xl group-hover:border-secondary transition-colors" />
                        </div>
                        <h3 className="font-bold text-2xl text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-secondary text-sm font-black uppercase tracking-widest">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
