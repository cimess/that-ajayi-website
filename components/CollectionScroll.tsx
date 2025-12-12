import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Product360Scroll from './Product360Viewer';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const CollectionScroll: React.FC = () => {
    const { collections } = useData();
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const horizontalTween = useRef<gsap.core.Tween | null>(null);

    // State for visual cues
    const [showHint, setShowHint] = useState(true);

    /* Limit to first 11 items for the horizontal scroll */
    const displayedCollections = collections.slice(0, 11);

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        // Calculate the total scrollable width
        // We want to scroll until the END of the container aligns with the END of the viewport
        // So we move left by (containerWidth - viewportWidth)

        const getScrollAmount = () => {
             return -(container.scrollWidth - window.innerWidth);
        };

        const ctx = gsap.context(() => {
            horizontalTween.current = gsap.to(container, {
                x: getScrollAmount, // Functional value for responsiveness
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1, // Smooth interaction
                    // Adjust 'end' to control speed.
                    // +=3000 gives it a good amount of vertical scroll distance to convert to horizontal
                    end: () => "+=" + (container.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true, // Recalculate on resize
                    onUpdate: (self) => {
                         // Fade out hint after user starts scrolling
                         if (self.progress > 0.05 && showHint) {
                            setShowHint(false);
                         }
                    }
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            horizontalTween.current = null;
        };
    }, [collections, showHint]);


    return (
        <div id="collections" className="relative bg-eko-black overflow-hidden group/container">
            <section ref={sectionRef} className="h-screen w-full overflow-hidden relative">
                {/*
                    Container Width:
                    We don't need to force a pixel width. Flexbox will handle it.
                    We just need 'w-max' or 'flex-nowrap' and ensure items have defined widths.
                */}
                <div
                    ref={containerRef}
                    className="flex h-full w-max"
                >
                    {displayedCollections.map((item, index) => (
                        <div
                            key={item.id}
                            // Changed w-screen to responsive width for "peeking" effect
                            // Mobile: w-[85vw] to show a bit of next
                            // Desktop: w-[80vw] or w-[85vw] to show next card clearly
                            className="collection-panel w-[85vw] md:w-[80vw] h-full shrink-0 relative border-r border-white/5"
                        >
                            <Link to={`/collections/similar/${item.id}`} className="flex flex-col md:flex-row w-full h-full">
                                {/* Image Side */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                                    {item.spinPath && horizontalTween.current ? (
                                        <Product360Scroll
                                            basePath={item.spinPath}
                                            frameCount={item.spinFrames ?? 36}
                                            containerAnimation={horizontalTween.current}
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </>
                                    )}

                                    {/* Collection Number */}
                                    <div className="absolute top-10 left-10 text-6xl md:text-9xl font-serif text-white/10 select-none pointer-events-none">
                                        {index < 9 ? `0${index + 1}` : index + 1}
                                    </div>
                                </div>


                                {/* Text Side */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-eko-black flex items-center justify-center p-8 md:p-20 relative">
                                    <div className="max-w-xl">
                                        <div className="flex gap-2 mb-6">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-eko-gold text-[10px] md:text-xs uppercase tracking-wider border border-eko-gold/30 px-2 md:px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-eko-gold uppercase tracking-[0.2em] text-xs md:text-sm mb-2">{item.subtitle}</h3>
                                        <h2 className="text-3xl md:text-6xl font-serif text-white mb-6 leading-none">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                                            {item.description}
                                        </p>

                                        {item.affiliateLink ? (
                                            <object>
                                                <a
                                                    href={item.affiliateLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/btn flex items-center gap-3 text-white uppercase tracking-widest hover:text-eko-gold transition-colors text-sm md:text-base current-link"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Shop This Look
                                                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 transition-transform" />
                                                </a>
                                            </object>
                                        ) : (
                                            <button className="group/btn flex items-center gap-3 text-white uppercase tracking-widest hover:text-eko-gold transition-colors text-sm md:text-base">
                                                Scroll down for more
                                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* VIEW MORE PANEL */}
                    <div className="collection-panel w-[85vw] md:w-[60vw] h-full flex flex-col items-center justify-center shrink-0 relative bg-eko-black border-l border-white/5">
                        <div className="text-center px-6">
                            <h2 className="text-4xl md:text-7xl font-serif text-white mb-8">Discover More</h2>
                            <p className="text-gray-400 text-base md:text-xl mb-12 max-w-md mx-auto">
                                Explore our full collection of bespoke digital fashion experiences.
                            </p>
                            <a href="/collections" className=" bg-amber-500 text-black md:bg-transparent md:text-white inline-block border border-eko-gold text-eko-gold px-12 py-4 uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all duration-300 rounded-lg">
                                View All Collections
                            </a>
                        </div>
                    </div>
                </div>

                {/* OVERLAYS & CONTROLS */}

                {/* 1. Scrolling Hint (Bottom Left) - Fades out on scroll */}
                <div
                    className={`absolute bottom-8 left-8 hidden md:flex items-center gap-3 pointer-events-none transition-opacity duration-500 ${showHint ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="w-12 h-[1px] bg-white/30"></div>
                    <span className="text-white/50 text-xs uppercase tracking-widest">Scroll to Explore</span>
                </div>

                 {/* Mobile Swipe Hint */}
                 <div
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden flex items-center gap-2 pointer-events-none transition-opacity duration-500 ${showHint ? 'opacity-100' : 'opacity-0'}`}
                >
                    <span className="text-white/50 text-xs uppercase tracking-widest animate-pulse">Swipe &rarr;</span>
                </div>


                {/* 2. Navigation Arrows (Desktop Only - Appear on Hover) */}
                <div className="absolute bottom-8 right-12 hidden md:flex gap-4 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500">
                     {/*
                        Note: These could be functional, but since it's scroll-driven, they might just be visual cues
                        or we can hook them to scrollTo. For now, let's keep them visual distinct interactions or
                        simple text cues as per requirements "Minimal arrow icons - Left and right arrows that appear on hover".
                        Since GSAP ScrollTrigger controls the scroll, clicking them would require scrollTo plugin.
                        Let's make them purely visual or simple indicators for now unless requested to function.
                        The prompt says "arrow icons... left and right... appear on hover".
                     */}
                     {/* We can leave them as visual cues for now or just generic arrows */}
                     <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50">
                        <ChevronLeft className="w-5 h-5" />
                     </div>
                     <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50">
                        <ChevronRight className="w-5 h-5" />
                     </div>
                </div>

            </section>

            {/* Section Indicator/Help Text below the pinned area */}
            <div className="bg-eko-black py-4 text-center border-t border-white/5 relative z-10">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                    Latest Arrivals - Season 2025
                </p>
            </div>
        </div>
    );
};

export default CollectionScroll;

