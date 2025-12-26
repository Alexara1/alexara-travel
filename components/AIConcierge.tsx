
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
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
      
      if (!apiKey || apiKey === "") {
        throw new Error("API_KEY_MISSING");
      }

      // Initialize the GenAI client using process.env.API_KEY as required.
      const ai = new GoogleGenAI({ apiKey });
      
      // Use the Chat API for multi-turn conversations
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are the ${settings.siteName} AI Concierge, a luxury travel expert. 
          Your tone is sophisticated, helpful, and inspiring. 
          The agency is called "${settings.siteName}".
          Always use Google Search to provide up-to-date travel advice, weather, and local events.
          If a user asks about a destination, give them unique tips and suggest they check the "Deals" page for bookings.
          Keep responses concise and elegant.`,
        },
        // Provide history but exclude the very first welcome message if it's not a real model turn
        history: messages.slice(1).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "I apologize, but I'm having trouble processing that request right now.";
      
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
        .filter(Boolean) as { uri: string; title: string }[];

      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error: any) {
      console.error("Alexara AI Concierge Error:", error);
      
      let errorText = "I apologize, my concierge services are currently experiencing a connection issue.";
      if (error.message === "API_KEY_MISSING") {
        errorText = "Concierge error: The Gemini API key is missing. If you just added it to Netlify, please trigger a 'Clear cache and deploy' to update the build.";
      }
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: errorText 
      }]);
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[60] transition-transform duration-500 ease-in-out transform flex flex-col ${
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
                    Grounded Intelligence
                </p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[90%] flex space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  <p>{msg.text}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                        <ExternalLink className="w-2.5 h-2.5 mr-1" /> Grounded Sources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.slice(0, 3).map((source, sIdx) => (
                          <a 
                            key={sIdx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition-colors truncate max-w-[150px]"
                          >
                            {source.title || 'Source'}
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
               <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-primary text-white mr-2">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
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
              placeholder="Where should we go...?"
              className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-[13px] focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all placeholder-gray-400"
            />
            <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center space-x-1 mt-3">
             <Sparkles className="w-2.5 h-2.5 text-secondary" />
             <p className="text-[9px] text-gray-300 uppercase tracking-widest font-bold">Powered by Gemini AI Intelligence</p>
          </div>
        </form>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[55] animate-in fade-in duration-300"
        ></div>
      )}
    </>
  );
};

export default AIConcierge;
