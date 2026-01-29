
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Contact: React.FC = () => {
  const { settings, addMessage, t } = useSite();
  const { address, phone, email } = settings.contact || { address: '', phone: '', email: '' };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({ name: `${formData.firstName} ${formData.lastName}`, email: formData.email, subject: formData.subject, message: formData.message });
    setIsSubmitted(true);
    setTimeout(() => { setIsSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' }); }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="bg-gray-50 min-h-screen py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t('contact_title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">We're always open to collaboration, travel inquiries, and partnership opportunities. Get in touch with our team today.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="bg-primary text-white p-12 md:w-2/5">
                <h3 className="text-2xl font-bold mb-8">Direct Communication</h3>
                <p className="text-blue-100/70 text-sm mb-12 leading-relaxed">
                    Whether you have a question about a specific guide, want to discuss a hotel partnership, or just want to share your latest adventure, we'd love to hear from you.
                </p>
                <div className="space-y-8">
                    {address && (
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                            <div>
                                <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] mb-1">Global HQ</p>
                                <p className="font-medium whitespace-pre-line text-sm">{address}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-start space-x-4">
                        <Phone className="w-5 h-5 text-secondary mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] mb-1">Inquiries</p>
                            <p className="font-medium text-sm">{phone}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Mail className="w-5 h-5 text-secondary mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] mb-1">Official Email</p>
                            <p className="font-medium text-sm">{email}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-20 pt-8 border-t border-white/10 flex items-center gap-4">
                   <div className="bg-secondary p-3 rounded-2xl">
                      <MessageSquare className="w-6 h-6 text-white" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest">Responses within 24-48h</span>
                </div>
            </div>

            <div className="p-12 md:w-3/5">
                {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-600 mb-6" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Synthesis Received</h3>
                        <p className="text-gray-500">Your message has been processed. A travel specialist will contact you shortly.</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">First Name</label><input name="firstName" required value={formData.firstName} onChange={handleChange} type="text" className={inputClasses} placeholder="John" /></div>
                            <div><label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Last Name</label><input name="lastName" required value={formData.lastName} onChange={handleChange} type="text" className={inputClasses} placeholder="Doe" /></div>
                        </div>
                        <div><label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label><input name="email" required value={formData.email} onChange={handleChange} type="email" className={inputClasses} placeholder="john@example.com" /></div>
                        <div><label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Message</label><textarea name="message" required value={formData.message} onChange={handleChange} rows={6} className={inputClasses} placeholder="Tell us about your next adventure..."></textarea></div>
                        <button className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center shadow-lg transform active:scale-95 transition-all text-sm uppercase tracking-widest">
                            <Send className="w-4 h-4 mr-2" /> {t('form_submit')}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
