import React from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import CollectionScroll from './components/CollectionScroll';
import AIStylist from './components/AIStylist';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="min-h-screen bg-eko-black text-white font-sans selection:bg-eko-gold selection:text-eko-black">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <main>
        <Hero />
        <CollectionScroll />

        {/* Bespoke/CTA Section */}
        <section id="bespoke" className="py-32 bg-fixed bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: 'url(/images/corporate_senator_suit.png)' }}>
          <div className="absolute inset-0 bg-eko-black/80"></div>
          <div className="container mx-auto px-6 relative z-10">
             <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-serif font-bold mb-8 text-white">Bespoke Tailoring</h2>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                  Experience the ultimate luxury of a garment made exclusively for you.
                  From fabric selection to the final stitch, we craft masterpieces that embody your persona.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <button className="bg-eko-green text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-eko-black transition-colors duration-300">
                    Book Measurement
                  </button>
                  <button className="border border-eko-green text-eko-green px-10 py-4 uppercase tracking-widest font-bold hover:bg-eko-green hover:text-white transition-colors duration-300">
                    Our Process
                  </button>
                </div>
             </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-eko-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </section>

      </main>
      <Footer />
      <AIStylist />
    </div>
  );
};

export default App;
