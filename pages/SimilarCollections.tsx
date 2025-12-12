import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import Product360Hover from '../components/Product360Hover';
import { CollectionItem } from '../types';
import { API_CONFIG } from '../config/api.config';
import LoadingScreen from '../components/LoadingScreen';

const SimilarCollections: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [similarItems, setSimilarItems] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSimilar = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}/collections/similar/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch similar items');
                }
                const data = await response.json();
                setSimilarItems(data);
            } catch (err) {
                console.error(err);
                setError('Could not load similar items.');
            } finally {
                setLoading(false);
            }
        };

        fetchSimilar();
    }, [id]);

    if (loading) return <LoadingScreen onComplete={() => {}} />; // Simplification for loading state

    return (
        <>
            <Navigation />
            <main className="bg-eko-black min-h-screen pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="mb-12">
                         <Link to="/collections" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs mb-8">
                            <ArrowLeft className="w-4 h-4" /> Back to All Collections
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Similar Styles</h1>
                        <p className="text-gray-400 text-lg">
                            Discover pieces curated based on your selection.
                        </p>
                    </div>

                    {error && (
                        <div className="text-red-500 text-center py-20">
                            {error}
                        </div>
                    )}

                    {!loading && !error && similarItems.length === 0 && (
                        <div className="text-white/50 text-center py-20 text-xl font-serif">
                            No similar items found based on tags.
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {similarItems.map((item, index) => (
                            <Link to={`/collections/similar/${item.id}`} key={item.id} className="block group relative bg-[#111] border border-white/5 overflow-hidden rounded-sm hover:border-eko-gold/30 transition-all duration-300">
                                <div className="aspect-4/5 relative overflow-hidden">
                                    {item.spinPath ? (
                                         <Product360Hover
                                            basePath={item.spinPath}
                                            frameCount={item.spinFrames}
                                            posterImage={item.image}
                                         />
                                    ) : (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}
                                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>

                                <div className="p-6 relative">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-eko-gold text-[10px] uppercase tracking-wider border border-eko-gold/30 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-eko-gold uppercase tracking-[0.2em] text-xs mb-2">{item.subtitle}</h3>
                                    <h2 className="text-2xl font-serif text-white mb-4 leading-none">{item.title}</h2>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {item.affiliateLink ? (
                                        <div
                                            className="p-2 rounded-full inline-flex items-center gap-2 text-black uppercase tracking-widest text-xs bg-amber-500 text-semibold"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(item.affiliateLink, '_blank');
                                            }}
                                        >
                                            Shop This Look
                                            <ExternalLink className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-2 text-white/50 uppercase tracking-widest text-xs cursor-default">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SimilarCollections;
