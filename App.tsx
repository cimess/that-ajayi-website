import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import CollectionScroll from './components/CollectionScroll';
import AIStylist from './components/AIStylist';
import Footer from './components/Footer';
import SubmitItem from './pages/SubmitItem';
import BookStyling from './pages/BookStyling';
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import Collections from './pages/Collections';
import ScrollToTop from './components/ScrollToTop';
import { FaWhatsapp } from 'react-icons/fa'
const Home: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
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
                 A lagos-born digital styling studio that transform everyday products into luxury visuals using ai,storytelling and modern african aesthetics
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <a href="/book" className="bg-eko-green text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-eko-black transition-colors duration-300 inline-block">
                    Book Measurement
                  </a>
                  <button className="border border-green rounded-full text-emerald-300 px-10 py-4 uppercase tracking-widest font-bold hover:bg-emerald-700 hover:text-white transition-colors duration-300 "  onClick={() =>
        window.open(
          "https://wa.me/2347042295237?text=Hi%20I%20need%20your%20service",
          "_blank"
        )
      }>
            <span className="flex items-center gap-5"><FaWhatsapp className="size-8"/>Contact us on whatsapp</span>
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
    </>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/submit" element={<SubmitItem />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/book" element={<BookStyling />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
