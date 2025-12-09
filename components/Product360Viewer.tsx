import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product360ScrollProps {
  basePath: string;
  frameCount?: number;
  containerAnimation: gsap.core.Tween; // 👈 from CollectionScroll
}

const Product360Scroll: React.FC<Product360ScrollProps> = ({
  basePath,
  frameCount = 36,
  containerAnimation
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef({ value: 0 });

  const frames = Array.from({ length: frameCount }, (_, i) =>
    `${basePath}/frame_${String(i + 1).padStart(4, '0')}.webp`
  );

  useEffect(() => {
    if (!imgRef.current) return;

    const st = ScrollTrigger.create({
      trigger: imgRef.current,
      containerAnimation,
      start: 'left center',
      end: 'right center',
      scrub: true,

      onUpdate: self => {
        const frame = Math.round(self.progress * (frameCount - 1));
        frameRef.current.value = frame;
        imgRef.current!.src = frames[frame];
      },

      onLeave: () => {
        imgRef.current!.src = frames[0];
      },

      onLeaveBack: () => {
        imgRef.current!.src = frames[0];
      }
    });

    return () => st.kill();
  }, [frameCount, containerAnimation]);

  return (
    <img
      ref={imgRef}
      src={frames[0]}
      draggable={false}
      className="w-full h-full object-cover select-none"
      alt="360 scroll view"
    />
  );
};

export default Product360Scroll;
