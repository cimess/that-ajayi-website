import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-eko-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-bold text-eko-gold mb-6">That Ajayi  </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining African luxury fashion through impeccable tailoring and heritage fabrics.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400 text-sm ">
              <li><a href="/collections" className="hover:text-eko-gold transition-colors">Latest Collections</a></li>
              <li><a href="/about" className="hover:text-eko-gold transition-colors">Our Story</a></li>
              <li><a href="/how-it-works" className="hover:text-eko-gold transition-colors">How It Works</a></li>
              <li><a href="/services" className="hover:text-eko-gold transition-colors">Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6">Client Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/book" className="hover:text-eko-gold transition-colors">Book a Consultation</a></li>
              <li><a href="/submit" className="hover:text-eko-gold transition-colors">Submit Item</a></li>
              <li><a href="/admin" className="hover:text-eko-gold transition-colors">Agency Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-eko-gold hover:text-eko-gold transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-eko-gold hover:text-eko-gold transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-eko-gold hover:text-eko-gold transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Lekki Phase 1, Lagos, Nigeria<br />
              hello@ekocouture.ng
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 That-Ajayi. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
