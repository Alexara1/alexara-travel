
import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Search, MapPin, Tag, FileText, ShoppingBag, Star, ArrowRight, Compass } from 'lucide-react';

const SearchResults: React.FC = () => {
  const { destinations, deals, gear, posts } = useSite();
  const location = useLocation();
  
  // Get query from URL
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  // Search Logic
  const results = useMemo(() => {
    if (!query) return { destinations: [], deals: [], gear: [], posts: [] };

    const filterFn = (item: any, fields: string[]) => {
        return fields.some(field => item[field]?.toString().toLowerCase().includes(query));
    };

    return {
      destinations: destinations.filter(d => filterFn(d, ['name', 'description', 'continent'])),
      deals: deals.filter(d => filterFn(d, ['title', 'location', 'duration'])),
      gear: gear.filter(g => filterFn(g, ['name', 'description', 'category'])),
      posts: posts.filter(p => filterFn(p, ['title', 'excerpt', 'content', 'author']))
    };
  }, [query, destinations, deals, gear, posts]);

  const totalResults = results.destinations.length + results.deals.length + results.gear.length + results.posts.length;

  if (!query) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gray-50">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">What are you looking for?</h2>
        <p className="text-gray-500 mt-2">Enter a destination, activity, or gear name in the search bar above.</p>
        <Link to="/" className="mt-6 text-secondary font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">Search Results</h1>
            <p className="text-gray-600">
                Found {totalResults} {totalResults === 1 ? 'match' : 'matches'} for <span className="text-secondary font-bold">"{query}"</span>
            </p>
        </div>

        {totalResults === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No results found</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    We couldn't find any destinations, deals, or articles matching your search. Try different keywords or browse our popular categories.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/destinations" className="bg-primary text-white px-6 py-2 rounded-full font-bold">Browse Destinations</Link>
                    <Link to="/deals" className="bg-secondary text-white px-6 py-2 rounded-full font-bold">View Deals</Link>
                </div>
            </div>
        ) : (
            <div className="space-y-16">
                {/* Destinations Section */}
                {results.destinations.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <Compass className="w-6 h-6 text-secondary mr-2" />
                            <h2 className="text-2xl font-bold text-primary">Destinations</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.destinations.map(dest => (
                                <Link to={`/destinations/${dest.slug}`} key={dest.id} className="bg-white rounded-xl shadow-sm overflow-hidden group border border-gray-100">
                                    <div className="h-40 overflow-hidden">
                                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">{dest.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase mt-1">{dest.continent}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Deals Section */}
                {results.deals.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <Tag className="w-6 h-6 text-secondary mr-2" />
                            <h2 className="text-2xl font-bold text-primary">Travel Deals</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.deals.map(deal => (
                                <Link to={`/deals/${deal.slug}`} key={deal.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex h-32 border border-gray-100 group">
                                    <img src={deal.image} alt={deal.title} className="w-32 h-full object-cover" />
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-secondary transition-colors">{deal.title}</h3>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <MapPin className="w-3 h-3 mr-1" /> {deal.location}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-lg font-bold text-secondary">${deal.price}</span>
                                            <span className="text-xs font-bold text-primary flex items-center hover:underline">
                                                View Deal <ArrowRight className="w-3 h-3 ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Blog Posts Section */}
                {results.posts.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <FileText className="w-6 h-6 text-secondary mr-2" />
                            <h2 className="text-2xl font-bold text-primary">Articles & Guides</h2>
                        </div>
                        <div className="space-y-4">
                            {results.posts.map(post => (
                                <Link to={`/blog/${post.slug}`} key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:bg-gray-50 transition-colors group">
                                    <img src={post.image} alt={post.title} className="w-20 h-20 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">{post.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">{post.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Gear Section */}
                {results.gear.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <ShoppingBag className="w-6 h-6 text-secondary mr-2" />
                            <h2 className="text-2xl font-bold text-primary">Travel Gear</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {results.gear.map(item => (
                                <Link to={`/gear/${item.slug}`} key={item.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 text-center hover:shadow-md transition-shadow group">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 mx-auto object-contain mb-4" />
                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-secondary transition-colors">{item.name}</h3>
                                    <p className="text-secondary font-bold mt-1">${item.price}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
