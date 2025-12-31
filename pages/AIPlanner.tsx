
import { GoogleGenAI } from "@google/genai";
import React, { useState, useRef } from 'react';
import { Sparkles, Send, Loader2, ExternalLink, RefreshCw, Save, Trash, Clock, Copy, Check, AlertCircle, Cpu, Zap, Globe2, Link as LinkIcon, History } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Itinerary } from '../types';

const AIPlanner: React.FC = () => {
  const { settings } = useSite();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [sources, setSources] = useState<{ uri: string; title: string }[]>([]);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>(() => {
    const saved = localStorage.getItem('alexara_itineraries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const loadingSteps: Record<string, string[]> = {
    EN: ["Establishing Neural Uplink...", "Grounding Search Parameters...", "Analyzing Global Flight Tables...", "Synthesizing Luxury Accommodations...", "Orchestrating Niche Experiences...", "Finalizing Architectural Blueprint..."],
    ES: ["Estableciendo enlace neuronal...", "Buscando parámetros...", "Analizando vuelos globales...", "Sintetizando alojamientos de lujo...", "Orquestando experiencias nicho...", "Finalizando plano arquitectónico..."],
    FR: ["Établissement de la liaison neurale...", "Ancrage des paramètres de recherche...", "Analyse des tables de vols mondiaux...", "Synthèse d'hébergements de luxe...", "Orchestration d'expériences de niche...", "Finalisation du plan architectural..."],
    DE: ["Aufbau der neuronalen Verbindung...", "Suchparameter verankern...", "Globale Flugtabellen analysieren...", "Synthese von Luxusunterkünften...", "Orchestrierung von Nischenerlebnissen...", "Finalisierung des Architekturplans..."],
    JP: ["ニューラルリンクを確立中...", "検索パラメータを接地中...", "グローバルフライト表を分析中...", "豪華な宿泊施設を合成中...", "ニッチな体験を調整中...", "建築設計図を完成させています..."],
    RU: ["Установка нейронного соединения...", "Поиск параметров в глобальной сети...", "Анализ таблиц мировых авиаперелетов...", "Подбор роскошных вариантов размещения...", "Создание уникальных впечатлений...", "Завершение архитектурного плана..."],
    ZH: ["建立神经链接...", "正在搜索全球参数...", "分析全球航班表...", "综合高奢住宿方案...", "策划独特的小众体验...", "最终确定行程蓝图..."]
  };

  const currentSteps = loadingSteps[settings.language] || loadingSteps['EN'];

  const generateItinerary = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;
    
    setIsLoading(true);
    setLoadingStep(0);
    setGeneratedItinerary(null);
    setSources([]);
    setErrorMsg(null);

    const stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev < currentSteps.length - 1 ? prev + 1 : prev));
    }, 3000);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API_KEY missing in production bundle.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: finalPrompt,
        config: {
          systemInstruction: `Act as a world-class luxury travel architect for ${settings.siteName}. 
          CRITICAL: You MUST write the entire itinerary in the following language: ${settings.language}.
          Generate a sophisticated multi-day itinerary.
          Formatting Rules:
          - Use "### Day X: [Title]" for daily headers.
          - Include specific hotel and location names.
          - Focus on high-end, exclusive experiences.`,
          tools: [{ googleSearch: {} }],
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
      }, 500);

    } catch (error: any) {
      console.error("AI Planner Failure:", error);
      setErrorMsg("Our neural network is encountering high latency. Please verify your API Key and network connection.");
    } finally {
      setIsLoading(false);
      clearInterval(stepInterval);
    }
  };

  const handleCopy = () => {
    if (generatedItinerary) {
      navigator.clipboard.writeText(generatedItinerary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
    const updated = savedItineraries.filter(plan => plan.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('alexara_itineraries', JSON.stringify(updated));
  };

  const renderItineraryContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const dayMatch = line.match(/^### (Day|Día|Jour|Tag|日|День|天) (\d+): (.+)/i);
      if (dayMatch) {
        return (
          <div key={i} className="relative pl-14 pt-12 pb-14 group/day">
            <div className="absolute left-[23px] top-12 bottom-0 w-1 bg-slate-100 group-last/day:hidden"></div>
            <div className="absolute left-0 top-12 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-xl z-10 group-hover/day:scale-110 transition-transform">
              {dayMatch[2]}
            </div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-6">{dayMatch[3]}</h3>
          </div>
        );
      }
      if (line.trim().startsWith('###')) {
          return (
            <div key={i} className="mt-16 mb-8 pl-14">
                <h3 className="text-xl font-bold text-secondary uppercase tracking-[0.4em] flex items-center">
                    <Sparkles className="w-5 h-5 mr-4 animate-pulse" /> 
                    {line.replace(/###/g, '').trim()}
                </h3>
            </div>
          );
      }
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          return (
            <div key={i} className="flex items-start mb-6 pl-14 group/bullet">
               <div className="w-2.5 h-2.5 rounded-full bg-secondary/40 mt-2.5 mr-6 shrink-0 group-hover/bullet:scale-150 transition-transform"></div>
               <span className="text-gray-700 leading-relaxed font-medium text-lg">{line.replace(/^[-*]\s*/, '').trim()}</span>
            </div>
          );
      }
      return line.trim() ? <p key={i} className="mb-8 pl-14 text-gray-600 leading-relaxed text-lg font-light">{line}</p> : null;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative pt-48 pb-40 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-3xl text-secondary px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.5em] mb-14 border border-white/10 shadow-2xl">
                <Cpu className="w-4 h-4 text-secondary animate-pulse" />
                <span>Neural Travel Architect Pro v5.0</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-16 leading-[1] tracking-tight">
                Synthesize your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-teal-200 to-accent italic">perfect escape.</span>
            </h1>
            
            <form onSubmit={(e) => { e.preventDefault(); generateItinerary(); }} className="relative max-w-3xl mx-auto group">
                <div className="relative flex items-center bg-white rounded-[2.8rem] shadow-3xl overflow-hidden p-3.5 border border-white/30 backdrop-blur-xl hover:shadow-secondary/20 transition-all duration-500">
                    <input 
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="7 days in Patagonia for solo adventure..."
                        className="flex-1 bg-transparent px-8 py-6 text-xl text-gray-800 placeholder-gray-400 outline-none font-medium"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="bg-primary hover:bg-slate-900 text-white font-bold px-12 py-6 rounded-[2.2rem] transition-all flex items-center space-x-4 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
                    >
                        {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : <><Zap className="w-6 h-6 group-hover:rotate-12 transition-transform text-secondary" /> <span>Architect</span></>}
                    </button>
                </div>
            </form>
        </div>
      </section>

      <div ref={resultsRef} className="max-w-6xl mx-auto px-4 py-24 -mt-20 relative z-20 min-h-[500px]">
        {isLoading ? (
            <div className="py-48 bg-white rounded-[4.5rem] shadow-3xl flex flex-col items-center text-center space-y-16 animate-in fade-in duration-1000 border border-gray-100">
                <div className="relative">
                    <div className="w-64 h-64 border-[12px] border-secondary/5 border-t-secondary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <Sparkles className="w-16 h-16 text-secondary animate-pulse" />
                            <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-xl animate-ping"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-4xl font-serif font-bold text-primary mb-4 tracking-tight">{currentSteps[loadingStep]}</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-bold">Synthesizing Global Data Nodes</p>
                </div>
            </div>
        ) : errorMsg ? (
            <div className="bg-red-50 border-2 border-red-100 rounded-[4rem] p-20 text-center shadow-xl">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-10" />
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Neural Link Interrupted</h3>
                <p className="text-red-700 max-w-md mx-auto leading-relaxed mb-10 text-lg">{errorMsg}</p>
                <button onClick={() => generateItinerary()} className="text-primary font-bold hover:underline flex items-center mx-auto">
                    <RefreshCw className="w-5 h-5 mr-2" /> Attempt Re-Synthesis
                </button>
            </div>
        ) : generatedItinerary ? (
            <div className="bg-white rounded-[5rem] shadow-3xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-20 duration-1000">
                <div className="p-14 md:p-20 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/90 backdrop-blur-3xl sticky top-20 z-30 shadow-sm">
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-primary mb-2">Master Itinerary</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Architected for: {prompt}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-5 mt-8 md:mt-0">
                      <button onClick={handleCopy} className="bg-white border border-gray-200 text-gray-600 px-10 py-6 rounded-3xl font-bold flex items-center hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                        {copied ? <Check className="w-6 h-6 mr-3 text-green-500" /> : <Copy className="w-6 h-6 mr-3" />} {copied ? 'Copied' : 'Copy Blueprint'}
                      </button>
                      <button onClick={saveItinerary} className="bg-primary hover:bg-slate-900 text-white px-12 py-6 rounded-3xl font-bold flex items-center shadow-3xl transition-all active:scale-95">
                        <Save className="w-6 h-6 mr-3" /> Archive Plan
                      </button>
                  </div>
                </div>
                
                <div className="p-16 md:p-32">
                    <div className="max-w-4xl mx-auto">
                        {renderItineraryContent(generatedItinerary)}

                        {sources.length > 0 && (
                            <div className="mt-32 pt-16 border-t border-gray-100 pl-14">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.5em] mb-10 flex items-center">
                                    <Globe2 className="w-5 h-5 mr-4 text-secondary" /> Verified Intelligence Sources
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {sources.map((source, idx) => (
                                        <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                                                <LinkIcon className="w-4 h-4 text-secondary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-600 truncate flex-1">{source.title || 'Knowledge Base Node'}</span>
                                            <ExternalLink className="w-4 h-4 text-gray-300 ml-2" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 h-[600px] rounded-[5rem] overflow-hidden shadow-3xl relative group">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Adventure" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-20 text-white">
                        <div className="mb-6 flex items-center space-x-3 text-secondary">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em]">AI-Powered Precision</span>
                        </div>
                        <h4 className="text-6xl font-serif font-bold mb-4 leading-none">Infinite Discovery <br/> Awaits.</h4>
                        <p className="text-blue-100/60 max-w-md font-light">Input your constraints above to synthesize a bespoke global itinerary based on real-time neural data.</p>
                    </div>
                </div>
                <div className="bg-white rounded-[5rem] p-16 shadow-3xl border border-gray-100 flex flex-col h-full overflow-hidden">
                    <h3 className="text-3xl font-serif font-bold text-primary mb-16 flex items-center"><History className="w-10 h-10 mr-5 text-secondary" /> Archive</h3>
                    {savedItineraries.length > 0 ? (
                        <div className="space-y-8 overflow-y-auto flex-1 pr-4 custom-scrollbar">
                            {savedItineraries.map(plan => (
                                <div key={plan.id} className="group bg-slate-50/50 p-10 rounded-[3rem] border-2 border-transparent hover:border-secondary hover:bg-white transition-all shadow-sm cursor-pointer relative" onClick={() => { setGeneratedItinerary(plan.content); setPrompt(plan.title); }}>
                                    <h4 className="font-bold text-gray-900 group-hover:text-secondary transition-colors text-2xl line-clamp-2 mb-6">{plan.title}</h4>
                                    <div className="flex items-center text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4"><Clock className="w-4 h-4 mr-3" /> {plan.createdAt}</div>
                                    <button onClick={(e) => { e.stopPropagation(); deleteItinerary(plan.id); }} className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-500 transition-all">
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50/80 rounded-[4rem] border-2 border-dashed border-gray-200">
                            <History className="w-16 h-16 text-gray-200 mb-8" />
                            <h5 className="font-bold text-gray-400 text-xs uppercase tracking-[0.5em]">Logs Empty</h5>
                            <p className="text-[10px] text-gray-300 mt-4 leading-relaxed">Your journeys will appear here once archived.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
