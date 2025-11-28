import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(".hero-sub",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.8, stagger: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/lagos_gala_aso_ebi.png"
          alt="Premium Nigerian Aso Ebi Lace Fabric with Gold Embroidery"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eko-black via-eko-black/50 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div ref={textRef}>
          <p className="hero-sub text-eko-gold tracking-[0.3em] uppercase text-sm md:text-base mb-4">
            Est. Lagos 2024
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white font-bold leading-tight mb-6">
            Elegance <span className="italic font-light text-eko-gold">Redefined</span>
          </h1>
          <p className="hero-sub text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Merging the rich heritage of Nigerian craftsmanship with contemporary high fashion.
            Tailored for the icons of today.
          </p>
        </div>

        <div className="hero-sub mt-12 flex flex-col md:flex-row gap-6 justify-center">
          <button className="border border-eko-gold text-eko-gold hover:bg-eko-gold hover:text-eko-black px-8 py-3 uppercase tracking-widest text-sm transition-all duration-300">
            View Lookbook
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
