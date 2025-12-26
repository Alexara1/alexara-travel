import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, ExternalLink } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ChatMessage } from '../types';

const AIConcierge: React.FC = () => {
  const { settings } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Welcome to ${settings.siteName}. I'm your AI Travel Specialist. Where shall we explore next?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === 'undefined' || apiKey.length < 10) {
        throw new Error("API Key is missing or invalid. Please set GEMINI_API_KEY in your environment.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are the ${settings.siteName} AI Concierge, a luxury travel expert. 
          Your tone is sophisticated, helpful, and inspiring. 
          The agency is called "${settings.siteName}".
          Always use Google Search to provide up-to-date travel advice, weather, and local events.
          If a user asks about a destination, give them unique tips and suggest they check the "Deals" page for bookings.
          Keep responses concise and elegant.`,
        }
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
        .filter(Boolean) as { uri: string; title: string }[];

      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error) {
      console.error("AI Concierge Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, my concierge services are currently limited. Please ensure your API connection is configured correctly in the environment settings." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group ${
          isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` }}
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 group-hover:ml-2 text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          Ask Concierge
        </span>
      </button>

      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[340px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[60] transition-transform duration-500 ease-in-out transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-white/10 rounded-lg relative">
                <Bot className="w-5 h-5 text-secondary" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-primary animate-pulse"></div>
             </div>
             <div>
                <h3 className="font-serif font-bold text-base leading-none">AI Concierge</h3>
                <p className="text-[9px] text-blue-200 uppercase tracking-widest mt-1 flex items-center">
                    Live Intelligence
                </p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[90%] flex space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`p-3 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.slice(0, 2).map((source, sIdx) => (
                          <a 
                            key={sIdx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[9px] flex items-center bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded transition-colors truncate max-w-[120px]"
                          >
                            <ExternalLink className="w-2.5 h-2.5 mr-1" /> {source.title || 'Source'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-primary text-white mr-2`}>
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all placeholder-gray-400"
            />
            <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-30"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[9px] text-gray-300 text-center mt-3 uppercase tracking-widest font-medium">Gemini AI Intelligence</p>
        </form>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[55] animate-in fade-in duration-300"
        ></div>
      )}
    </>
  );
};

export default AIConcierge;