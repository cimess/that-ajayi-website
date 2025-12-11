import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Upload, CheckCircle } from 'lucide-react';

const SubmitItem: React.FC = () => {
  const { addSubmission } = useData();
  const [formData, setFormData] = useState({
    brandName: '',
    contactEmail: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Create FormData
      const submissionData = new FormData();
      submissionData.append('brandName', formData.brandName);
      submissionData.append('contactEmail', formData.contactEmail);
      submissionData.append('description', formData.description);

      if (selectedFile) {
          submissionData.append('media', selectedFile);
      }

      await addSubmission(submissionData as any);

      // WhatsApp Integration
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2347042295237';
      const text = `New Submission:\nBrand: ${formData.brandName}\nEmail: ${formData.contactEmail}\n${formData.description}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission failed:', err);

      // Show user-friendly error message
      if (err.response?.data?.error === 'CLOUDINARY_AUTH_ERROR') {
        setError('File upload is currently unavailable. Please try submitting without a file, or contact support.');
      } else {
        setError(err.response?.data?.message || 'Failed to submit. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  text-white font-sans">
      <Navigation />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-4 text-gold">Submit Item for Styling</h1>
          <p className="text-gray-300 mb-12">
            Are you a brand or creator? Submit your pieces (Picture or Video) to be styled by Eko Couture's AI and creative team.
          </p>

          {submitted ? (
            <div className="bg-green/10 border border-green p-8 rounded-2xl text-center animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Submission Received</h3>
              <p className="text-gray-300">We will review your item and get back to you shortly.</p>
              <button
                onClick={() => {
                    setSubmitted(false);
                    setFormData({ brandName: '', contactEmail: '', description: '' });
                    setSelectedFile(null);
                }}
                className="mt-6 text-gold hover:underline"
              >
                Submit another item
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg mb-6">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Brand Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.brandName}
                  onChange={e => setFormData({...formData, brandName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Contact Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.contactEmail}
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Item Description / Notes</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {import.meta.env.VITE_USE_DATABASE === 'true' && (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer group relative">
                <input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setSelectedFile(e.target.files[0]);
                        }
                    }}
                />
                <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3 group-hover:text-gold transition-colors" />
                <p className="text-sm text-gray-400">
                    {selectedFile ? selectedFile.name : "Upload Image or Video (Optional)"}
                </p>
                <p className="text-xs text-gray-600 mt-1">JPG, PNG, MP4 up to 50MB</p>
              </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-black font-bold py-4 rounded-lg md:bg-black md:text-white hover:bg-amber-500 md:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitItem;
