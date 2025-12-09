import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import Product360Scroll from './Product360Viewer';
// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const CollectionScroll: React.FC = () => {
  const { collections } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

// add this near your other refs
const horizontalTween = useRef<any>(null);

  /* Limit to first 11 items for the horizontal scroll */
  const displayedCollections = collections.slice(0, 11);

  // replace the existing useEffect with this
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    /*
       We are adding one extra "panel" for the View More link if we have more than 11 items.
       However, the prompt just said "limit to 11 post so the collection takes more and a link to view more"
       The best way to do this in this horizontal scroll structure is to make the 12th panel the "View More" panel
       OR just have it be part of the flow.
       Let's stick to the visual style.
    */

    // If we want to show a "View More" panel at the end, we treat it as an extra item.
    // Let's create a combined list including a placeholder for "View More" if needed.
    // OR we can just append a custom div in the map.

    // NOTE: The GSAP logic counts sections. So if we render an extra div with className 'collection-panel', GSAP will pick it up.

    const sections = gsap.utils.toArray('.collection-panel');
    const container = containerRef.current;
    if (!container || sections.length === 0) return;

    // We want to move the container left by (N-1) viewports
    const xPercent = -100 * (sections.length - 1) / sections.length;

    const ctx = gsap.context(() => {
      // store the tween so child components can read it
      horizontalTween.current = gsap.to(container, {
        xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + container.offsetWidth,
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      horizontalTween.current = null;
    };
  }, [collections]); // Re-run when collections change


  return (
    <div id="collections" className="relative bg-eko-black overflow-hidden">
      {/*
         We wrap the horizontal container in a section that gets pinned.
         The container is what moves left.
      */}
      <section ref={sectionRef} className="h-screen w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full"
          style={{ width: `${Math.max(displayedCollections.length + 1, 1) * 100}%` }}
        >
          {displayedCollections.map((item, index) => (
            <div
              key={item.id}
              className="collection-panel w-screen h-full flex flex-col md:flex-row shrink-0 relative"
            >
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
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </>
              )}

              {/* Collection Number */}
              <div className="absolute top-10 left-10 text-9xl font-serif text-white/10 select-none">
                {index < 9 ? `0${index + 1}` : index + 1}
              </div>
            </div>


              {/* Text Side */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-eko-black flex items-center justify-center p-8 md:p-20 relative border-l border-white/5">
                <div className="max-w-xl">
                   <div className="flex gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-eko-gold text-xs uppercase tracking-wider border border-eko-gold/30 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-eko-gold uppercase tracking-[0.2em] text-sm mb-2">{item.subtitle}</h3>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-none">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {item.description}
                  </p>

                  {item.affiliateLink ? (
                    <a
                      href={item.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-white uppercase tracking-widest hover:text-eko-gold transition-colors"
                    >
                      Shop This Look
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                  ) : (
                    <button className="group flex items-center gap-3 text-white uppercase tracking-widest hover:text-eko-gold transition-colors">
                      View Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* VIEW MORE PANEL */}
           <div className="collection-panel w-screen h-full flex flex-col items-center justify-center shrink-0 relative bg-eko-black border-l border-white/5">
                <div className="text-center">
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Discover More</h2>
                    <p className="text-gray-400 text-xl mb-12 max-w-md mx-auto">
                        Explore our full collection of bespoke digital fashion experiences.
                    </p>
                    <a href="/collections" className="inline-block border border-eko-gold text-eko-gold px-12 py-4 uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all duration-300 rounded-lg">
                        View All Collections
                    </a>
                </div>
           </div>

        </div>
      </section>

      {/* Section Indicator/Help Text below the pinned area */}
      <div className="bg-eko-black py-4 text-center border-t border-white/5">
        <p className="text-white/30 text-xs uppercase tracking-widest">
          Latest Arrivals - Season 2025
        </p>
      </div>
    </div>
  );
};

export default CollectionScroll;
