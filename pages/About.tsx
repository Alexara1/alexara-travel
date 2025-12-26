import React from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { settings } = useSite();

  const team = [
    { name: "Alex Johnson", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sarah Williams", role: "Head of Travel", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "David Chen", role: "Partnerships", img: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Emily Davis", role: "Editor in Chief", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
                To inspire and enable people to explore the world with curiosity, confidence, and conscience. 
                We believe travel is the best education.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Team meeting" className="rounded-2xl shadow-xl w-full" />
            </div>
            <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Who We Are</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    {settings.siteName} was founded in 2015 by a group of passionate travelers who wanted to create a platform that went beyond just booking tickets. We wanted to curate experiences.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Today, we are a global team connecting millions of travelers with ethical tour operators, boutique hotels, and authentic local guides.
                </p>
                <ul className="space-y-4">
                    {["Passionate Experts", "24/7 Global Support", "Best Price Guarantee", "Sustainable Travel Focus"].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-800 font-medium">
                            <CheckCircle className="text-secondary w-5 h-5 mr-3" /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Team */}
        <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12">Meet The Team</h2>
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