
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Contact: React.FC = () => {
  const { settings, addMessage } = useSite();
  const { address, phone, email } = settings.contact || { address: '', phone: '', email: '' };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });
    setIsSubmitted(true);
    // Reset form after success state
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Get in Touch</h1>
            <p className="text-gray-600">Have a question about a trip? Need custom planning? We're here to help.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            {/* Info Side */}
            <div className="bg-primary text-white p-10 md:w-2/5 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <p className="text-blue-100 mb-8 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Phone className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-xs text-blue-200 uppercase tracking-wide">Phone</p>
                                <p className="font-medium">{phone || "+1 (555) 123-4567"}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-xs text-blue-200 uppercase tracking-wide">Email</p>
                                <p className="font-medium">{email || "hello@alexara.com"}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-xs text-blue-200 uppercase tracking-wide">Headquarters</p>
                                <p className="font-medium whitespace-pre-line">{address || "123 Adventure Ave\nNew York, NY 10001"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <p className="text-sm text-blue-200">&copy; {new Date().getFullYear()} {settings.siteName}</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="p-10 md:w-3/5">
                {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-300">
                        <div className="bg-green-100 p-4 rounded-full mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for reaching out. We have received your inquiry and will respond shortly.</p>
                        <button 
                            onClick={() => setIsSubmitted(false)}
                            className="mt-8 text-secondary font-bold hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input name="firstName" required value={formData.firstName} onChange={handleChange} type="text" className={inputClasses} placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input name="lastName" required value={formData.lastName} onChange={handleChange} type="text" className={inputClasses} placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input name="email" required value={formData.email} onChange={handleChange} type="email" className={inputClasses} placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select name="subject" value={formData.subject} onChange={handleChange} className={inputClasses}>
                                <option>General Inquiry</option>
                                <option>Booking Assistance</option>
                                <option>Personalized Deal Search</option>
                                <option>Partnership</option>
                                <option>Feedback</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea name="message" required value={formData.message} onChange={handleChange} rows={4} className={inputClasses} placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center shadow-lg transform active:scale-95">
                            <Send className="w-4 h-4 mr-2" /> Send Message
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
