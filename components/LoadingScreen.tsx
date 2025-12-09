import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: onComplete
          });
        }
      });

      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1.5")
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-eko-black flex flex-col items-center justify-center text-white">
      <div className="overflow-hidden mb-8">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-serif font-bold text-eko-gold translate-y-full opacity-0">
          THAT AJAYI
        </h1>
      </div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-eko-gold w-full origin-left scale-x-0"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
