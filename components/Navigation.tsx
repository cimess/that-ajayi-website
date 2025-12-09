import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen || !isHome ? 'bg-eko-black/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
        {/* Logo */}
        <img src="/logo/thatAjayi-Logo.png" alt="a logo picture" className='size-12 object-cover rounded-full ' />
        <Link to="/" className="text-2xl font-serif font-bold tracking-widest ">
          <span className='text-amber-500'>THAT</span> <span className='text-white'>AJAYI</span>
        </Link>
</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-white tracking-wide">
          <Link to="/"className=" px-2 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold">PORTFOLIO</Link>
          <Link to="/collections" className=" px-2 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold">COLLECTIONS</Link>
          <Link to="/submit" className=" px-2 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold">SUBMIT ITEM</Link>
          <Link to="/book" className=" px-2 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold">
            BOOK STYLING
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
           <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-eko-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">Portfolio</Link>
          <Link to="/collections" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">Collections</Link>
          <Link to="/submit" onClick={() => setIsOpen(false)} className="text-white text-lg font-serif">Submit Item</Link>
          <Link to="/book" onClick={() => setIsOpen(false)} className="bg-eko-gold text-eko-black py-3 w-full font-bold mt-4 text-center">
            BOOK STYLING
          </Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-500 text-sm flex items-center gap-2 justify-center mt-4">
            <Lock className="w-3 h-3" /> Agency Access
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
