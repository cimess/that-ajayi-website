import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calendar, CheckCircle } from 'lucide-react';
import { SelectDemo } from '../components/shadcnSelect';

const BookStyling: React.FC = () => {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    eventType: '',
    date: '',
    budget: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      dateRequested: new Date().toISOString()
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-eko-black text-white font-sans">
      <Navigation />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-4 text-eko-gold">Book Styling Services</h1>
          <p className="text-gray-300 mb-12">
            Personalized styling for your most important moments. Tell us about your event.
          </p>

          {submitted ? (
            <div className="bg-eko-green/10 border border-eko-green p-8 rounded-2xl text-center animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-eko-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Request Sent</h3>
              <p className="text-gray-300">We'll be in touch shortly to confirm details.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-eko-gold hover:underline"
              >
                Book another event
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-gold transition-colors"
                    value={formData.clientName}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-gold transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Event Type</label>
               <SelectDemo
                width="w-full"
                placeholder="Select Event Type"
                value={formData.eventType}
                onValueChange={(val: string) => setFormData({...formData, eventType: val})}
                options={[
                { value: 'wedding', label: 'Wedding' },
                { value: 'gala', label: 'Gala / Red Carpet' },
                { value: 'photoshoot', label: 'Photoshoot' },
                { value: 'wardrobe-refresh', label: 'Wardrobe Refresh' },
              ]}
              className=""
              />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Event Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-gold transition-colors"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                    <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                <SelectDemo
                  width="w-[180px]"
                  placeholder="Select Budget"
                  value={formData.budget}
                  onValueChange={(val: string) => setFormData({...formData, budget: val})}
                  className=""
                  options={[
                  { value: 'standard', label: 'Standard' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'luxury', label: 'Luxury' },
                ]}/>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-eko-gold text-eko-black font-bold py-4 rounded-lg hover:bg-amber-500 hover:text-black transition-colors"
              >
                Request Consultation
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookStyling;
