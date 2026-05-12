import React ,{lazy,Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import CollectionScroll from './components/CollectionScroll';
import AIStylist from './components/AIStylist';
import Footer from './components/Footer';

import Dashboard from './pages/Admin/Dashboard';
import Collections from './pages/Collections';
import SimilarCollections from './pages/SimilarCollections';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/Admin/ResetPassword';
import { FaWhatsapp } from 'react-icons/fa'

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
const WhatsappIcon=FaWhatsapp as any

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
                <p className="text-xl  mb-12 leading-relaxed">
                 A lagos-born digital styling studio that transform everyday products into luxury visuals using ai,storytelling and modern african aesthetics
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
                  <a href="/book" className="bg-eko-green text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-eko-black transition-colors duration-300 inline-block">
                    Book Measurement
                  </a>
                  <button className="max-w-[300px] border border-green rounded-full bg-emerald-700 text-white px-5 py-2  uppercase tracking-widest font-bold  w-fit md:w-full gap-3 flex justify-center"  onClick={() =>
        window.open(
          "https://wa.me/2347042295237?text=Hi%20I%20need%20your%20service",
          "_blank"
        )
      }>
            <span className="flex items-center justify-center gap-3 w-fit"><WhatsappIcon className="size-8"/>Contact us</span>
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
    const SubmitItem = lazy(() => import('./pages/SubmitItem'));
const BookStyling = lazy(() => import('./pages/BookStyling'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));

  return (
    <DataProvider>
      <Suspense fallback={<LoadingScreen />}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/submit" element={<SubmitItem />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/similar/:id" element={<SimilarCollections />} />
          <Route path="/book" element={<BookStyling />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      </Suspense>
    </DataProvider>
  );
};

export default App;

