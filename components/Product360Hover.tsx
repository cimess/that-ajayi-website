import React, { useState, useRef, useEffect } from 'react';

interface Product360HoverProps {
  basePath: string;
  frameCount?: number;
  posterImage: string;
}

const Product360Hover: React.FC<Product360HoverProps> = ({
  basePath,
  frameCount = 36,
  posterImage
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<any>(null);

  // Preload images logic could go here, but for now we rely on browser cache or just load on hover.
  // To avoid flickering, we should ideally preload.

  const frames = React.useMemo(() =>
    Array.from({ length: frameCount }, (_, i) =>
      `${basePath}/frame_${String(i + 1).padStart(4, '0')}.webp`
    ), [basePath, frameCount]);

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % frameCount);
      }, 50); // approx 20fps
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentFrame(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, frameCount]);

  return (
    <div
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Helper to preload images invisibly */}
        <div className="hidden">
            {isHovered && frames.map(src => <img key={src} src={src} alt="preload" />)}
        </div>

      {isHovered && currentFrame > 0 ? (
        <img
          src={frames[currentFrame]}
          alt="360 view"
          className="w-full h-full object-cover absolute inset-0 z-10"
        />
      ) : (
          <img
            src={posterImage}
            alt="Product"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
      )}
    </div>
  );
};

export default Product360Hover;
