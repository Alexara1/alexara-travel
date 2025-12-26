
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Map, ArrowRight, Star, ShieldCheck, Globe2, Users, Quote, CheckCircle, MessageSquare, Sparkles, BrainCircuit, Zap, Terminal, Globe, CloudSun, Plane, MapPin, Navigation, Hotel, Activity, TrendingUp, Compass, Target, BarChart, Layers } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import AdContainer from '../components/AdContainer';

const Home: React.FC = () => {
  const { settings, posts, destinations, deals } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const recentPosts = posts.slice(0, 3);
  const featuredDestinations = destinations.slice(0, 4);
  const featuredDeals = deals.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const testimonials = [
    {
      name: "Marcus Thorne",
      location: "London, UK",
      trip: "Bali Wellness Retreat",
      text: `The AI Planner on ${settings.siteName} saved me hours of research. It found hidden spots in Bali I'd never seen on standard blogs!`,
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      link: "/blog/1"
    },
    {
      name: "Elena Rodriguez",
      location: "Madrid, Spain",
      trip: "Kyoto Cultural Tour",
      text: "I love the curated guides. It felt like I had a local friend showing me the hidden gems of Kyoto. The AI Concierge is incredibly fast.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      link: "/blog/2"
    },
    {
      name: "James Wilson",
      location: "California, USA",
      text: "Professional, transparent, and incredibly helpful. The customer support team and AI tools went above and beyond for my family.",
      trip: "European Budget Guide",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      link: "/blog/3"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2021&q=80" 
            alt="Travel Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>AI-Powered Global Travel Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {settings.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-10 font-light drop-shadow-md">
            {settings.heroSubtitle}
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-2xl mx-auto"
          >
            <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex items-center">
                <Map className="text-gray-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go?" 
                  className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400" 
                />
              </div>
            </div>
            <div className="w-full md:w-auto px-2 py-2 md:py-0">
              <button 
                type="submit"
                className="w-full md:w-auto bg-secondary hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Trust Signals */}
      <section className="bg-white py-12 shadow-sm relative z-20 -mt-8 mx-4 md:mx-12 lg:mx-24 rounded-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Trusted Booking</h3>
            <p className="text-gray-500 text-sm mt-2">Secure transactions with verified partners globally.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
               <Globe2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Expert Local Guides</h3>
            <p className="text-gray-500 text-sm mt-2">Experience destinations like a local with our curated guides.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">AI Concierge 24/7</h3>
            <p className="text-gray-500 text-sm mt-2">Our proprietary travel intelligence is here to assist you instantly.</p>
          </div>
        </div>
      </section>

      {/* 3. AI INNOVATION SECTION (PROFESSIONAL UPGRADE) */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                  <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                    <BrainCircuit className="w-4 h-4" />
                    <span>Next-Generation Travel Intelligence</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-[1.15]">
                    Experience the future of <br/> <span className="text-secondary italic">personalized planning.</span>
                  </h2>
                  <p className="text-blue-100/70 text-lg mb-12 leading-relaxed max-w-xl">
                    Our AI architects synthesize millions of data points—from real-time flight pricing to hyper-local weather shifts—to curate journeys that feel like they were made by a lifelong friend.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3 group">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                              <Sparkles className="w-6 h-6 text-secondary" />
                          </div>
                          <h4 className="text-white font-bold">Neural Itineraries</h4>
                          <p className="text-gray-400 text-xs leading-relaxed">Dynamic day-by-day plans that evolve with your preferences and local secrets.</p>
                      </div>
                      <div className="space-y-3 group">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                              <Target className="w-6 h-6 text-secondary" />
                          </div>
                          <h4 className="text-white font-bold">Price Prediction</h4>
                          <p className="text-gray-400 text-xs leading-relaxed">Sophisticated algorithms pinpointing the absolute best time to book your stay.</p>
                      </div>
                  </div>
                  
                  <div className="mt-14">
                      <Link to="/ai-planner" className="bg-secondary hover:bg-teal-500 text-white font-bold px-12 py-5 rounded-full shadow-2xl transition-all transform hover:scale-105 inline-flex items-center">
                          Architect Your Journey <ArrowRight className="ml-3 w-5 h-5" />
                      </Link>
                  </div>
              </div>
              
              {/* PROFESSIONAL DASHBOARD VISUAL */}
              <div className="relative group">
                  {/* Outer Glow */}
                  <div className="absolute -inset-10 bg-gradient-to-tr from-secondary/30 to-primary/30 rounded-full blur-[100px] opacity-20 animate-pulse"></div>

                  <div className="relative h-[540px] w-full">
                      {/* Base Dashboard Layer */}
                      <div className="absolute top-0 left-0 w-full h-full bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] shadow-3xl overflow-hidden p-10 flex flex-col">
                          <div className="flex items-center justify-between mb-10">
                              <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                                      <Navigation className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm tracking-tight">Neural Navigator</h4>
                                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Live Synthesis Engine</p>
                                  </div>
                              </div>
                              <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                  <span className="text-[9px] font-bold text-green-500 uppercase">Optimizer Active</span>
                              </div>
                          </div>

                          {/* Data Nodes & Visualizer */}
                          <div className="flex-1 relative">
                              {/* Background Pulse Rings */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                  <div className="w-64 h-64 border border-dashed border-secondary/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                  <div className="absolute w-48 h-48 border border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                              </div>

                              {/* Layered Floating Cards */}
                              <div className="absolute top-0 left-0 w-48 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-left-4 duration-1000">
                                  <div className="flex items-center space-x-2 mb-3">
                                      <Plane className="w-4 h-4 text-secondary" />
                                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Flights_Grounded</span>
                                  </div>
                                  <div className="text-xs text-white font-bold">LHR → TYO</div>
                                  <div className="text-[10px] text-green-500 mt-1 font-bold">$742 (Best Price)</div>
                              </div>

                              <div className="absolute bottom-10 right-0 w-56 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                                  <div className="flex items-center space-x-2 mb-3">
                                      <Layers className="w-4 h-4 text-accent" />
                                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Itinerary_Scan</span>
                                  </div>
                                  <div className="space-y-2">
                                      <div className="flex items-center text-[10px] text-gray-300">
                                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div> Day 1: Tsukiji Secrets
                                      </div>
                                      <div className="flex items-center text-[10px] text-gray-300">
                                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div> Day 2: Ginza Hidden Bar
                                      </div>
                                  </div>
                              </div>

                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center relative shadow-3xl">
                                      <div className="absolute inset-0 bg-secondary rounded-full blur-xl opacity-40 animate-pulse"></div>
                                      <BrainCircuit className="w-12 h-12 text-white relative z-10" />
                                  </div>
                              </div>
                          </div>

                          {/* Stats Bar */}
                          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-around">
                              <div className="text-center">
                                  <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Dwell_Time</div>
                                  <div className="text-sm font-bold text-white">4.2m avg</div>
                              </div>
                              <div className="text-center">
                                  <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Conversion</div>
                                  <div className="text-sm font-bold text-secondary">+12.4%</div>
                              </div>
                              <div className="text-center">
                                  <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Trust_Index</div>
                                  <div className="text-sm font-bold text-accent">9.8/10</div>
                              </div>
                          </div>
                      </div>

                      {/* Floating Accessory: Status Overlay */}
                      <div className="absolute -right-6 -bottom-6 bg-white p-6 rounded-[2.5rem] shadow-3xl border border-gray-100 w-48 animate-bounce duration-[6s]">
                          <div className="flex items-center justify-between mb-4">
                              <BarChart className="w-4 h-4 text-primary" />
                              <div className="text-[10px] font-bold text-gray-400 uppercase">Growth</div>
                          </div>
                          <div className="text-2xl font-serif font-bold text-primary">$12.4k<span className="text-xs text-green-500 ml-1">↑</span></div>
                          <p className="text-[9px] text-gray-400 mt-2 leading-relaxed">Simulated monthly affiliate growth powered by AI personalization.</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Featured Destinations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Trending Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the most popular spots that our travelers are raving about this season.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest) => (
              <Link 
                to={`/search?q=${encodeURIComponent(dest.name)}`} 
                key={dest.id} 
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80 block bg-slate-200"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=60';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">{dest.continent}</span>
                  <h3 className="text-white text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="mt-2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                    Explore Details <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations" className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors">
              View All Destinations <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Hot Deals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Exclusive Deals</h2>
              <p className="text-gray-600">Limited time offers you can't miss.</p>
            </div>
            <Link to="/deals" className="hidden md:flex items-center text-secondary font-bold hover:text-primary transition-colors">
              See All Offers <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-slate-200">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-bold text-gray-800">{deal.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">{deal.duration}</span>
                    <span className="text-sm font-bold text-teal-600">{deal.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{deal.title}</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-sm text-gray-400 line-through">${deal.originalPrice}</span>
                      <div className="text-2xl font-bold text-primary">${deal.price}</div>
                    </div>
                    <Link to="/deals" className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                      View Deal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Travel Inspiration (Blog Preview) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Travel Inspiration</h2>
            <p className="text-gray-600">Tips, guides, and stories from around the globe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recentPosts.map((post) => (
              <article key={post.id} className="flex flex-col group">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-md h-60 bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
                      {post.tags[0]}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                   <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="text-secondary font-medium text-sm hover:underline">Read Article</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Stories from the Road (Testimonials) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <MessageSquare className="w-4 h-4" />
                    <span>Real Traveler Feedback</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Stories from the Road</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Experience the {settings.siteName} difference through the eyes of our global community of explorers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {testimonials.map((t, idx) => (
                    <Link 
                      to={t.link} 
                      key={idx} 
                      className="group block bg-white p-8 rounded-3xl relative shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-secondary/20"
                    >
                        <Quote className="absolute top-6 right-8 w-10 h-10 text-secondary/5 group-hover:text-secondary/10 transition-colors" />
                        
                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-md" />
                                <div className="absolute -bottom-1 right-3 bg-secondary text-white p-1 rounded-full shadow-sm">
                                    <CheckCircle className="w-3 h-3" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 leading-tight">{t.name}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border border-green-100">Verified Trip: {t.trip}</span>
                        </div>

                        <p className="text-gray-600 text-sm italic leading-relaxed mb-6 group-hover:text-gray-800 transition-colors">
                          "{t.text}"
                        </p>
                        
                        <div className="flex items-center text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          Read Case Study <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center">
                <Link 
                    to="/blog" 
                    className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    View All Traveler Spotlights <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>
        </div>
      </section>

      {/* Global Ad Banner */}
      {settings.ads?.enabled && settings.ads?.headerBanner && (
        <section className="py-8 bg-transparent flex justify-center">
            <AdContainer code={settings.ads.headerBanner} label="Sponsored" />
        </section>
      )}

      {/* 8. CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to start your adventure?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect trip with {settings.siteName}. Exclusive deals await.
          </p>
          <Link to="/deals" className="inline-block bg-accent hover:bg-yellow-500 text-slate-900 font-bold py-4 px-10 rounded-full shadow-xl transition-transform transform hover:scale-105">
            Book Your Trip Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
