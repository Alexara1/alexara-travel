
import { GoogleGenAI } from "@google/genai";
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Search, Compass, RefreshCw, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ChatMessage } from '../types';

// Advanced retry with jitter to handle high-traffic Vercel deployments
const callWithRetry = async (fn: () => Promise<any>, retries = 3, delay = 4000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes('429');
      if (isRateLimit && i < retries - 1) {
        // Exponential backoff + jitter
        const jitter = Math.random() * 1000;
        const waitTime = (delay * Math.pow(2, i)) + jitter;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
};

const AIConcierge: React.FC = () => {
  const { settings } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const welcomeMessages: Record<string, string> = {
    EN: `Welcome to ${settings.siteName}. I'm your Neural Travel Specialist. How may I assist you today?`,
    ES: `Bienvenido a ${settings.siteName}. Soy su especialista en viajes neuronales. ¿Cómo puedo ayudarle hoy?`,
    FR: `Bienvenue chez ${settings.siteName}. Je suis votre spécialiste neural du voyage. Comment puis-je vous aider aujourd'hui ?`,
    DE: `Willkommen bei ${settings.siteName}. Ich bin Ihr neuronaler Reise-Spezialist. Wie kann ich Ihnen heute helfen?`,
    JP: `${settings.siteName}へようこそ。私はあなたのニューラル・トラベル・スペシャリストです。本日はどのようなお手伝いが必要ですか？`,
    RU: `Добро пожаловать в ${settings.siteName}. Я ваш персональный ИИ-гид. Чем я могу быть полезен сегодня?`,
    ZH: `欢迎来到 ${settings.siteName}。我是您的旅行 AI 助手。请问今天有什么可以帮您的？`
  };

  useEffect(() => {
    setMessages([
        { role: 'model', text: welcomeMessages[settings.language] || welcomeMessages['EN'] }
    ]);
  }, [settings.language, settings.siteName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent, retryText?: string) => {
    if (e) e.preventDefault();
    const userMessage = retryText || input.trim();
    if (!userMessage || isTyping) return;

    if (!retryText) {
      setInput('');
      setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    }
    
    setLastUserMessage(userMessage);
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API_KEY_MISSING");

      const response = await callWithRetry(async () => {
        const ai = new GoogleGenAI({ apiKey });
        // gemini-3-flash-preview is prioritized for higher quota
        return await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { role: 'user', parts: [{ text: userMessage }] },
          config: {
            tools: [{ googleSearch: {} }],
            thinkingConfig: { thinkingBudget: 0 }, // Faster, lower token usage
            systemInstruction: `You are the ${settings.siteName} AI Concierge. Respond in ${settings.language}. Be high-end, helpful, and concise.`,
          }
        });
      });

      const text = response.text || "I'm having trouble connecting to the synthesis core. Please try again.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
        .filter(Boolean) as { uri: string; title: string }[];

      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error: any) {
      console.error("AI Concierge Error:", error);
      let errorText = "The neural connection was lost. Please attempt to re-sync.";
      
      if (error?.status === 429 || error?.message?.includes('429')) {
        errorText = "We are currently experiencing high demand. Please wait about 30 seconds to re-send your inquiry.";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorText }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-5 rounded-full shadow-3xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group ${
          isOpen ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` }}
      >
        <Sparkles className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 group-hover:ml-3 text-white text-[11px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
          Neural Concierge
        </span>
      </button>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.15)] z-[60] transition-transform duration-500 ease-in-out transform flex flex-col border-l border-gray-100 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center space-x-4">
             <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                <Compass className="w-5 h-5 text-secondary animate-pulse" />
             </div>
             <div>
                <h3 className="font-serif font-bold text-lg">AI Concierge</h3>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">Neural Core Active</p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] flex space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div>
                    <div className={`p-5 rounded-[2rem] text-[13px] leading-relaxed shadow-sm ${
                      msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}>
                        <p>{msg.text}</p>
                        {msg.text.includes("demand") && lastUserMessage && (
                          <button 
                            onClick={() => handleSend(undefined, lastUserMessage)}
                            className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-secondary hover:underline group/retry"
                          >
                            <RefreshCw className="w-3 h-3 mr-2 group-hover/retry:rotate-180 transition-transform" /> Attempt Re-Sync
                          </button>
                        )}
                        {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                    <Search className="w-3 h-3 mr-2 text-secondary" /> Sources
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {msg.sources.slice(0, 3).map((source, sIdx) => (
                                    <a key={sIdx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-slate-300 truncate max-w-[180px] font-bold">
                                        {source.title || 'Knowledge base'}
                                    </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="w-9 h-9 rounded-2xl flex items-center justify-center bg-primary text-white mr-3 shadow-lg">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-gray-100 shadow-sm flex space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 border-t border-gray-100 bg-white">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire with our travel intelligence..."
              className="w-full pl-6 pr-14 py-5 bg-gray-50 border border-gray-200 rounded-[2rem] text-[13px] focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all"
            />
            <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-3.5 bg-primary text-white rounded-[1.5rem] hover:bg-secondary transition-all disabled:opacity-30 shadow-lg active:scale-90">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[55] animate-in fade-in duration-500"></div>}
    </>
  );
};

export default AIConcierge;
