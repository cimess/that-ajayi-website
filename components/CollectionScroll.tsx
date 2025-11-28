import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../constants';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const CollectionScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const sections = gsap.utils.toArray('.collection-panel');
    const container = containerRef.current;

    // We want to move the container left by (N-1) viewports
    // xPercent is relative to the container's width (N viewports)
    // So we need to move: 100 * (N-1) / N percent
    const xPercent = -100 * (sections.length - 1) / sections.length;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        xPercent: xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // Adjust end to make the scroll speed feel right. 3000px height per slide essentially.
          end: () => "+=" + container!.offsetWidth,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          style={{ width: `${COLLECTIONS.length * 100}%` }}
        >
          {COLLECTIONS.map((item, index) => (
            <div
              key={item.id}
              className="collection-panel w-screen h-full flex flex-col md:flex-row flex-shrink-0 relative"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Collection Number */}
                <div className="absolute top-10 left-10 text-9xl font-serif text-white/10 select-none">
                  0{index + 1}
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

                  <button className="group flex items-center gap-3 text-white uppercase tracking-widest hover:text-eko-gold transition-colors">
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
