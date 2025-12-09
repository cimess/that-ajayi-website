import React from 'react';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Product360Hover from '../components/Product360Hover';

const Collections: React.FC = () => {
  const { collections } = useData();

  const pictures = collections.filter(item => !item.spinPath && !item.image.endsWith('.gif'));
  const media = collections.filter(item => item.spinPath || item.image.endsWith('.gif')); // Include gifs as media

  return (
    <>
      <Navigation />
      <main className="bg-eko-black min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 text-center">Collections</h1>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
                Explore our curated selection of digital fashion pieces.
            </p>

            {/* Media / Gifs / Videos Section */}
            {media.length > 0 && (
                <div className="mb-20">
                    <h2 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Motion & 360 Views</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {media.map((item, index) => (
                             <div key={item.id} className="group relative bg-[#111] border border-white/5 overflow-hidden rounded-sm hover:border-eko-gold/30 transition-all duration-300">
                                <div className="aspect-square relative overflow-hidden">
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
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                         />
                                     )}
                                     <div className="absolute top-4 left-4 text-4xl font-serif text-white/20 select-none z-20">
                                        M-{index + 1}
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <h2 className="text-2xl font-serif text-white mb-2 leading-none">{item.title}</h2>
                                    <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pictures Section */}
            <div>
                 <h2 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-4">Editorial Images</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pictures.map((item, index) => (
                    <div key={item.id} className="group relative bg-[#111] border border-white/5 overflow-hidden rounded-sm hover:border-eko-gold/30 transition-all duration-300">
                        <div className="aspect-4/5 relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                            <div className="absolute top-4 left-4 text-4xl font-serif text-white/20 select-none">
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </div>
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
                                <a
                                href={item.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white uppercase tracking-widest text-xs hover:text-eko-gold transition-colors"
                                >
                                Shop This Look
                                <ExternalLink className="w-4 h-4" />
                                </a>
                            ) : (
                                <div className="inline-flex items-center gap-2 text-white/50 uppercase tracking-widest text-xs cursor-default">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Collections;
