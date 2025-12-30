
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
    <div className="bg-white min-h-screen">
      <div className="bg-primary text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">{t('about_mission_title')}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">{settings.heroSubtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="" className="rounded-2xl shadow-xl w-full" />
            <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('about_who_we_are')}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('footer_desc')}</p>
                <ul className="space-y-4">
                    {["Premium Curation", "Neural Planning", "Global Support"].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-800 font-medium">
                            <CheckCircle className="text-secondary w-5 h-5 mr-3" /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12">{t('about_team')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-sm" />
                        <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                        <p className="text-secondary text-sm font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
