
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Loader2, Info, ExternalLink, RefreshCw, Save, Trash, PlaneTakeoff, History, Calendar, MapPin, Clock, Copy, Check } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Itinerary } from '../types';

const AIPlanner: React.FC = () => {
  const { settings } = useSite();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [sources, setSources] = useState<{ uri: string; title: string }[]>([]);
  const [copied, setCopied] = useState(false);
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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Act as a world-class travel architect for ${settings.siteName} Travel Agency. 
        Analyze this user request and generate a complete, professional itinerary: "${finalPrompt}"
        
        Mandatory Format Rules:
        - Use "### Day X: [Title]" for each day's header.
        - Use specific times where possible (e.g., 09:00 AM).
        - Include a section called "### Expert Secrets" at the end.
        - Suggest specific hotel names or flight types based on the request.
        
        Format beautifully with Markdown headers (###) and clear bullet points.`,
        config: {
          tools: [{ googleSearch: {} }],
          thinkingConfig: { thinkingBudget: 15000 }
        }
      });

      setGeneratedItinerary(response.text || "Failed to generate itinerary.");
      const extractedSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
        .filter(Boolean) as { uri: string; title: string }[];
      setSources(extractedSources || []);
      
      setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("AI Planner Error:", error);
      setGeneratedItinerary("I'm sorry, our travel intelligence system is temporarily offline. Please try again.");
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
      destination: "Global Explorer",
      duration: "Multi-Day",
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
          <div key={i} className="relative pl-12 pb-10 group/day">
            <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-slate-100 group-last/day:hidden"></div>
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg z-10 group-hover/day:scale-110 transition-transform">
              {dayMatch[1]}
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4 pt-1">
              {dayMatch[2]}
            </h3>
          </div>
        );
      }
      if (line.startsWith('###')) {
          return <h3 key={i} className="text-xl font-bold text-secondary mt-12 mb-6 uppercase tracking-widest flex items-center"><Sparkles className="w-5 h-5 mr-3" /> {line.replace(/###/g, '').trim()}</h3>;
      }
      if (line.startsWith('-') || line.startsWith('*')) {
          return (
            <div key={i} className="flex items-start mb-4 pl-12">
               <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-4 shrink-0"></div>
               <span className="text-gray-700 leading-relaxed font-medium">{line.substring(1).trim()}</span>
            </div>
          );
      }
      return line.trim() ? <p key={i} className="mb-6 pl-12 text-gray-600 leading-relaxed">{line}</p> : null;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl text-secondary px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-10 border border-white/10 shadow-2xl">
                <div className="w-2 h-2 bg-secondary rounded-full animate-ping mr-1"></div>
                <span>AI Travel Intelligence v4.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-10 leading-[1.1] tracking-tight">
                Architect your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-400 italic">perfect escape.</span>
            </h1>
            
            <form onSubmit={(e) => { e.preventDefault(); generateItinerary(); }} className="relative max-w-3xl mx-auto group mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/50 via-primary/50 to-accent/50 rounded-[2.5rem] blur-xl opacity-20 group-focus-within:opacity-100 transition duration-700"></div>
                <div className="relative flex items-center bg-white rounded-[2rem] shadow-3xl overflow-hidden p-2.5 border border-white/20">
                    <div className="hidden sm:flex items-center justify-center w-14 h-14 bg-slate-50 rounded-full ml-2">
                        <PlaneTakeoff className="w-6 h-6 text-primary" />
                    </div>
                    <input 
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your dream trip (e.g., Luxury Kyoto in Autumn)"
                        className="flex-1 bg-transparent px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none font-medium"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="bg-primary hover:bg-slate-900 text-white font-bold px-10 py-5 rounded-[1.6rem] transition-all flex items-center space-x-3 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-secondary" /> <span>Craft Itinerary</span></>}
                    </button>
                </div>
            </form>
            
            <div className="mt-8">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-4">Start with a Blueprint</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                      { text: "Surprise London Weekend", icon: <MapPin className="w-3.5 h-3.5" /> },
                      { text: "14 Days Across Japan", icon: <MapPin className="w-3.5 h-3.5" /> },
                      { text: "Eco-Bali Retreat", icon: <MapPin className="w-3.5 h-3.5" /> },
                      { text: "Paris Art Tour", icon: <MapPin className="w-3.5 h-3.5" /> }
                    ].map(suggestion => (
                        <button 
                            key={suggestion.text}
                            onClick={() => handleSuggestionClick(suggestion.text)}
                            className="group relative px-6 py-3.5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 overflow-hidden"
                        >
                            {/* Frosted Glass Background */}
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-all rounded-2xl shadow-xl"></div>
                            
                            <div className="relative flex items-center text-[11px] font-bold text-white uppercase tracking-widest">
                                <span className="mr-2 text-secondary group-hover:scale-125 transition-transform duration-300">{suggestion.icon}</span>
                                {suggestion.text}
                                <Sparkles className="w-3 h-3 ml-2 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <div ref={resultsRef} className="max-w-6xl mx-auto px-4 py-20 -mt-10 relative z-20">
        {isLoading ? (
            <div className="py-32 bg-white rounded-[3rem] shadow-2xl flex flex-col items-center text-center space-y-10 animate-in fade-in duration-700 border border-gray-100">
                <div className="relative">
                    <div className="w-40 h-40 border-[6px] border-secondary/10 border-t-secondary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-secondary animate-pulse" />
                    </div>
                </div>
                <div className="max-w-md px-6">
                    <h3 className="text-3xl font-serif font-bold text-primary mb-4">Synthesizing Travel Data</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Our neural network is analyzing thousands of flight routes, hotel ratings, and local weather patterns to build your bespoke journey.</p>
                </div>
            </div>
        ) : generatedItinerary ? (
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
                <div className="p-10 md:p-14 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/80 backdrop-blur-md sticky top-20 z-30">
                  <div className="mb-6 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">AI Certified</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Verified Grounded Search</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-primary">Your Masterpiece Itinerary</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                      <button onClick={handleCopy} className="bg-white border border-gray-200 text-gray-600 px-6 py-4 rounded-2xl font-bold flex items-center hover:bg-gray-50 transition-all active:scale-95">
                        {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />} {copied ? 'Copied' : 'Copy Text'}
                      </button>
                      <button onClick={saveItinerary} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center shadow-xl hover:shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-95">
                        <Save className="w-4 h-4 mr-2" /> Save to Archive
                      </button>
                      <button onClick={() => { setGeneratedItinerary(null); setPrompt(''); }} className="bg-white border border-gray-200 text-gray-400 p-4 rounded-2xl hover:text-red-500 transition-colors">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                  </div>
                </div>
                <div className="p-10 md:p-20"><div className="max-w-4xl mx-auto">{renderItineraryContent(generatedItinerary)}</div></div>
                {sources.length > 0 && (
                  <div className="p-10 md:p-14 bg-slate-900 text-white">
                    <h3 className="text-[11px] font-bold text-secondary uppercase tracking-[0.4em] mb-10 flex items-center"><Info className="w-5 h-5 mr-3" /> Data Intelligence Sources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sources.map((source, idx) => (
                        <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all shadow-lg">
                          <div className="truncate pr-4">
                            <p className="text-xs font-bold text-white truncate mb-1">{source.title}</p>
                            <p className="text-[9px] text-gray-400 truncate uppercase tracking-widest">Grounded URL</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-secondary shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 relative group">
                    <div className="absolute -inset-10 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-[4rem] blur-3xl opacity-50"></div>
                    <div className="relative h-[600px] rounded-[3.5rem] overflow-hidden shadow-3xl border border-white">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Adventure awaiting" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                             <h4 className="text-white text-3xl font-serif font-bold mb-4">Unlimited Possibilities</h4>
                             <p className="text-blue-100 max-w-md text-lg leading-relaxed">Enter a destination and let our AI curate a journey grounded in real-time global availability and local secrets.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-serif font-bold text-primary flex items-center"><History className="w-6 h-6 mr-3 text-secondary" /> Archive</h3>
                        {savedItineraries.length > 0 && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{savedItineraries.length} Saved</span>}
                    </div>
                    {savedItineraries.length > 0 ? (
                        <div className="space-y-5 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
                            {savedItineraries.map(plan => (
                                <div key={plan.id} className="group bg-slate-50 p-6 rounded-[2rem] border border-transparent hover:border-secondary hover:bg-white transition-all shadow-sm hover:shadow-xl cursor-pointer relative" onClick={() => { setGeneratedItinerary(plan.content); setPrompt(plan.title); }}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 group-hover:bg-secondary group-hover:text-white transition-colors"><Calendar className="w-5 h-5" /></div>
                                        <button onClick={(e) => { e.stopPropagation(); deleteItinerary(plan.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                    </div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-secondary transition-colors text-lg line-clamp-2 leading-tight">{plan.title}</h4>
                                    <div className="mt-4 flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]"><Clock className="w-3 h-3 mr-1.5" /> {plan.createdAt}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm"><History className="w-8 h-8 text-gray-200" /></div>
                            <h5 className="font-bold text-gray-400 text-sm uppercase tracking-widest">No Archived Journeys</h5>
                        </div>
                    )}
                    <div className="mt-10 pt-10 border-t border-gray-100">
                        <div className="flex items-center space-x-4 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                            <Info className="w-5 h-5 text-primary shrink-0" />
                            <p className="text-[11px] text-gray-600 leading-relaxed font-medium">Archived itineraries are stored locally in your browser for privacy.</p>
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
