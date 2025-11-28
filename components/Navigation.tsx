import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-eko-black/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-serif font-bold tracking-widest text-eko-gold">
          EKO COUTURE
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-white tracking-wide">
          <a href="#collections" className="hover:text-eko-gold transition-colors">COLLECTIONS</a>
          <a href="#bespoke" className="hover:text-eko-gold transition-colors">BESPOKE</a>
          <a href="#consult" className="hover:text-eko-gold transition-colors">AI STYLIST</a>
          <button className="bg-eko-gold text-eko-black px-6 py-2 rounded-full hover:bg-white transition-colors duration-300 font-bold">
            BOOK FITTING
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
           <ShoppingBag className="w-5 h-5 text-white" />
           <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-eko-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
          <a href="#collections" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">Collections</a>
          <a href="#bespoke" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">Bespoke</a>
          <a href="#consult" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">AI Stylist</a>
          <button className="bg-eko-gold text-eko-black py-3 w-full font-bold mt-4">
            BOOK FITTING
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
