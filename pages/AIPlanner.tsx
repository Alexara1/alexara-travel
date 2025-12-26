
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Loader2, Info, ExternalLink, RefreshCw, Save, Trash, PlaneTakeoff, History, Calendar, MapPin, Clock, Copy, Check, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Itinerary } from '../types';

const AIPlanner: React.FC = () => {
  const { settings } = useSite();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [sources, setSources] = useState<{ uri: string; title: string }[]>([]);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>(() => {
    const saved = localStorage.getItem('alexara_itineraries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const generateItinerary = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;
    
    setIsLoading(true);
    setGeneratedItinerary(null);
    setSources([]);
    setErrorMsg(null);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === "") {
        throw new Error("API_KEY_MISSING");
      }

      // Initialize fresh instance before call
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: finalPrompt,
        config: {
          systemInstruction: `Act as a world-class luxury travel architect for ${settings.siteName}. 
          Generate a sophisticated multi-day itinerary.
          
          Formatting Rules:
          - Use "### Day X: [Title]" for daily headers.
          - Use Markdown for bolding and bullet points.
          - Include a "### Expert Secrets" section with niche local tips.
          - Suggest specific flight routes and hotel names.
          
          Ensure the tone is professional, exclusive, and exciting.`,
          tools: [{ googleSearch: {} }],
          thinkingConfig: { thinkingBudget: 20000 }
        }
      });

      const text = response.text;
      if (!text) throw new Error("EMPTY_RESPONSE");

      setGeneratedItinerary(text);
      
      const extractedSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
        .filter(Boolean) as { uri: string; title: string }[];
      setSources(extractedSources || []);
      
      setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (error: any) {
      console.error("Alexara AI Planner Detailed Error:", error);
      let msg = "Our travel intelligence network is currently experiencing heavy traffic.";
      
      if (error.message === "API_KEY_MISSING") {
        msg = "The site configuration is incomplete. Please ensure the Gemini API key is set in your environment variables. If you just updated Netlify, try triggering a new deploy.";
      }
      
      setErrorMsg(msg);
      setGeneratedItinerary(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedItinerary) {
      navigator.clipboard.writeText(generatedItinerary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    generateItinerary(suggestion);
  };

  const saveItinerary = () => {
    if (!generatedItinerary) return;
    const newItinerary: Itinerary = {
      id: Date.now().toString(),
      title: prompt.substring(0, 40) + (prompt.length > 40 ? '...' : ''),
      destination: "Global Discovery",
      duration: "Custom Stay",
      content: generatedItinerary,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newItinerary, ...savedItineraries];
    setSavedItineraries(updated);
    localStorage.setItem('alexara_itineraries', JSON.stringify(updated));
  };

  const deleteItinerary = (id: string) => {
    const updated = savedItineraries.filter(i => i.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('alexara_itineraries', JSON.stringify(updated));
  };

  const renderItineraryContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const dayMatch = line.match(/^### Day (\d+): (.+)/i);
      if (dayMatch) {
        return (
          <div key={i} className="relative pl-14 pb-12 group/day">
            <div className="absolute left-[23px] top-10 bottom-0 w-1 bg-slate-100 group-last/day:hidden"></div>
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-xl z-10 group-hover/day:scale-110 transition-transform">
              {dayMatch[1]}
            </div>
            <h3 className="text-3xl font-serif font-bold text-primary mb-6 pt-2">
              {dayMatch[2]}
            </h3>
          </div>
        );
      }
      if (line.startsWith('###')) {
          return (
            <h3 key={i} className="text-xl font-bold text-secondary mt-14 mb-8 uppercase tracking-[0.3em] flex items-center">
              <Sparkles className="w-6 h-6 mr-4 animate-pulse" /> 
              {line.replace(/###/g, '').trim()}
            </h3>
          );
      }
      if (line.startsWith('-') || line.startsWith('*')) {
          return (
            <div key={i} className="flex items-start mb-5 pl-14 group/bullet">
               <div className="w-2 h-2 rounded-full bg-secondary/60 mt-2.5 mr-5 shrink-0 group-hover/bullet:scale-150 transition-transform"></div>
               <span className="text-gray-700 leading-relaxed font-medium text-lg">{line.substring(1).trim()}</span>
            </div>
          );
      }
      return line.trim() ? <p key={i} className="mb-8 pl-14 text-gray-600 leading-relaxed text-lg">{line}</p> : null;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative pt-40 pb-32 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl text-secondary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.5em] mb-12 border border-white/10 shadow-2xl">
                <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-ping mr-2"></div>
                <span>Neural Travel Architect v4.5</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-12 leading-[1] tracking-tight">
                Design your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-300 italic">dream itinerary.</span>
            </h1>
            
            <form onSubmit={(e) => { e.preventDefault(); generateItinerary(); }} className="relative max-w-3xl mx-auto group mb-14">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary/40 via-primary/40 to-accent/40 rounded-[2.8rem] blur-2xl opacity-20 group-focus-within:opacity-100 transition duration-700"></div>
                <div className="relative flex items-center bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden p-3 border border-white/20">
                    <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full ml-3">
                        <PlaneTakeoff className="w-7 h-7 text-primary" />
                    </div>
                    <input 
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Where and how long? (e.g. 5 days in Paris for Art lovers)"
                        className="flex-1 bg-transparent px-8 py-5 text-xl text-gray-800 placeholder-gray-400 outline-none font-medium"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="bg-primary hover:bg-slate-900 text-white font-bold px-12 py-6 rounded-[2rem] transition-all flex items-center space-x-4 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform text-secondary" /> <span>Synthesize</span></>}
                    </button>
                </div>
            </form>
            
            <div className="mt-10">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.4em] mb-6">Neural Presets</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {[
                      { text: "Autumn in Kyoto", icon: <MapPin className="w-4 h-4" /> },
                      { text: "Amalfi Coast Tour", icon: <MapPin className="w-4 h-4" /> },
                      { text: "Iceland Road Trip", icon: <MapPin className="w-4 h-4" /> },
                      { text: "New York Art Weekend", icon: <MapPin className="w-4 h-4" /> }
                    ].map(suggestion => (
                        <button 
                            key={suggestion.text}
                            onClick={() => handleSuggestionClick(suggestion.text)}
                            className="group relative px-8 py-4 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-all rounded-2xl shadow-xl"></div>
                            <div className="relative flex items-center text-[12px] font-bold text-white uppercase tracking-widest">
                                <span className="mr-3 text-secondary group-hover:scale-125 transition-transform duration-300">{suggestion.icon}</span>
                                {suggestion.text}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <div ref={resultsRef} className="max-w-6xl mx-auto px-4 py-24 -mt-16 relative z-20 min-h-[400px]">
        {isLoading ? (
            <div className="py-40 bg-white rounded-[4rem] shadow-3xl flex flex-col items-center text-center space-y-12 animate-in fade-in duration-1000 border border-gray-100">
                <div className="relative">
                    <div className="w-48 h-48 border-[8px] border-secondary/10 border-t-secondary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-secondary animate-pulse" />
                    </div>
                </div>
                <div className="max-w-lg px-8">
                    <h3 className="text-4xl font-serif font-bold text-primary mb-6 tracking-tight">Accessing Neural Database</h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">Scanning live flight tables, hotel availability, and local event registries to construct your unique journey.</p>
                </div>
            </div>
        ) : errorMsg ? (
            <div className="bg-red-50 border-2 border-red-100 rounded-[3rem] p-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Neural Link Interrupted</h3>
                <p className="text-red-700 max-w-md mx-auto leading-relaxed mb-8">{errorMsg}</p>
                <button 
                  onClick={() => generateItinerary()} 
                  className="bg-white border border-red-200 text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all shadow-md active:scale-95"
                >
                  Reconnect to Intelligence
                </button>
            </div>
        ) : generatedItinerary ? (
            <div className="bg-white rounded-[4rem] shadow-3xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-16 duration-1000">
                <div className="p-12 md:p-16 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/80 backdrop-blur-2xl sticky top-20 z-30 shadow-sm">
                  <div className="mb-8 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Verified AI Architect</span>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.4em]">Search Grounded</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-primary">Bespoke Blueprint</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={handleCopy} className="bg-white border border-gray-200 text-gray-600 px-8 py-5 rounded-[2rem] font-bold flex items-center hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        {copied ? <Check className="w-5 h-5 mr-3 text-green-500" /> : <Copy className="w-5 h-5 mr-3" />} {copied ? 'Copied' : 'Duplicate text'}
                      </button>
                      <button onClick={saveItinerary} className="bg-primary text-white px-10 py-5 rounded-[2rem] font-bold flex items-center shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1 active:scale-95">
                        <Save className="w-5 h-5 mr-3" /> Archive Journey
                      </button>
                      <button onClick={() => { setGeneratedItinerary(null); setPrompt(''); }} className="bg-white border border-gray-200 text-gray-400 p-5 rounded-[2rem] hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                        <RefreshCw className="w-6 h-6" />
                      </button>
                  </div>
                </div>
                <div className="p-12 md:p-24"><div className="max-w-4xl mx-auto">{renderItineraryContent(generatedItinerary)}</div></div>
                {sources.length > 0 && (
                  <div className="p-12 md:p-16 bg-slate-900 text-white">
                    <h3 className="text-[12px] font-bold text-secondary uppercase tracking-[0.5em] mb-12 flex items-center"><Info className="w-6 h-6 mr-4" /> GROUNDED INTELLIGENCE NODES</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sources.map((source, idx) => (
                        <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all shadow-2xl">
                          <div className="truncate pr-6">
                            <p className="text-sm font-bold text-white truncate mb-2">{source.title}</p>
                            <p className="text-[10px] text-gray-500 truncate uppercase tracking-widest font-mono">source.v1</p>
                          </div>
                          <ExternalLink className="w-6 h-6 text-gray-600 group-hover:text-secondary shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 relative group">
                    <div className="absolute -inset-10 bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-[5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative h-[650px] rounded-[4rem] overflow-hidden shadow-3xl border border-white/50">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Adventure awaiting" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-16">
                             <h4 className="text-white text-5xl font-serif font-bold mb-6 tracking-tight">Infinite Horizons.</h4>
                             <p className="text-blue-100/80 max-w-md text-xl leading-relaxed font-light">Describe your destination, pace, and interests to receive a curated masterplan grounded in global intelligence.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[4rem] p-12 shadow-3xl border border-gray-100 flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-3xl font-serif font-bold text-primary flex items-center"><History className="w-8 h-8 mr-4 text-secondary" /> Archive</h3>
                        {savedItineraries.length > 0 && <span className="text-[11px] font-bold text-gray-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{savedItineraries.length}</span>}
                    </div>
                    {savedItineraries.length > 0 ? (
                        <div className="space-y-6 overflow-y-auto flex-1 pr-3 custom-scrollbar">
                            {savedItineraries.map(plan => (
                                <div key={plan.id} className="group bg-slate-50/50 p-8 rounded-[2.5rem] border border-transparent hover:border-secondary hover:bg-white transition-all shadow-sm hover:shadow-2xl cursor-pointer relative" onClick={() => { setGeneratedItinerary(plan.content); setPrompt(plan.title); }}>
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="bg-white p-4 rounded-[1.2rem] shadow-sm border border-gray-100 group-hover:bg-secondary group-hover:text-white transition-all duration-300"><Calendar className="w-6 h-6" /></div>
                                        <button onClick={(e) => { e.stopPropagation(); deleteItinerary(plan.id); }} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash className="w-5 h-5" /></button>
                                    </div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-secondary transition-colors text-xl line-clamp-2 leading-tight tracking-tight">{plan.title}</h4>
                                    <div className="mt-5 flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]"><Clock className="w-3.5 h-3.5 mr-2" /> {plan.createdAt}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-slate-50/50 rounded-[3rem] border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm"><History className="w-10 h-10 text-gray-200" /></div>
                            <h5 className="font-bold text-gray-400 text-sm uppercase tracking-[0.3em]">No Journeys Archived</h5>
                        </div>
                    )}
                    <div className="mt-12 pt-10 border-t border-gray-100">
                        <div className="flex items-center space-x-5 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Info className="w-5 h-5 text-primary shrink-0" />
                            </div>
                            <p className="text-[12px] text-gray-500 leading-relaxed font-medium">Local browser storage ensures your travel blueprints remain private and accessible.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
