
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
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
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t('contact_title')}</h1>
            <p className="text-gray-600">{t('footer_desc')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="bg-primary text-white p-10 md:w-2/5">
                <h3 className="text-2xl font-bold mb-6">{t('contact_info_title')}</h3>
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <Phone className="w-5 h-5 text-secondary mt-1" />
                        <div><p className="text-xs text-blue-200 uppercase tracking-wide">Phone</p><p className="font-medium">{phone}</p></div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Mail className="w-5 h-5 text-secondary mt-1" />
                        <div><p className="text-xs text-blue-200 uppercase tracking-wide">Email</p><p className="font-medium">{email}</p></div>
                    </div>
                </div>
            </div>

            <div className="p-10 md:w-3/5">
                {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_first_name')}</label><input name="firstName" required value={formData.firstName} onChange={handleChange} type="text" className={inputClasses} /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_last_name')}</label><input name="lastName" required value={formData.lastName} onChange={handleChange} type="text" className={inputClasses} /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')}</label><input name="email" required value={formData.email} onChange={handleChange} type="email" className={inputClasses} /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_message')}</label><textarea name="message" required value={formData.message} onChange={handleChange} rows={4} className={inputClasses}></textarea></div>
                        <button className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-lg transform active:scale-95">
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
