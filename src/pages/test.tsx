import { useEffect, useState } from 'react';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';

interface ParallaxSectionProps {
  backgroundImage: string;
  speed?: number;
  children?: React.ReactNode;
}

const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

const ParallaxSection = ({ backgroundImage, speed = 0.5, children }: ParallaxSectionProps) => {
  const offset = useParallax(speed);

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        transform: `translateY(${offset}px)`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </section>
  );
};

export const ParallaxHome = () => {
  return (
    <div className="scroll-smooth">
      {/* Hero Section with Parallax */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
        speed={0.4}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            Welcome to Paradise
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow">
            Discover the perfect beach getaway
          </p>
          <ChevronDoubleDownIcon className="h-12 w-12 animate-bounce mx-auto" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </ParallaxSection>

      {/* Content Section 1 */}
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Crystal Clear Waters
          </h2>
          <p className="text-lg text-blue-700 mb-8">
            Experience the most pristine beaches with turquoise waters and white sandy shores.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Feature {item}
                </h3>
                <p className="text-blue-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Parallax Section */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1519046904884-53103b34b206"
        speed={0.3}
      >
        <div className="text-center text-white z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow">
            Sunset Paradise
          </h2>
          <p className="text-xl md:text-2xl drop-shadow">
            Experience breathtaking sunsets over the ocean
          </p>
        </div>
        <div className="absolute inset-0 bg-orange-900/30" />
      </ParallaxSection>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xl mb-4">🌴 Beach Paradise Resort</p>
          <p className="opacity-75">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};