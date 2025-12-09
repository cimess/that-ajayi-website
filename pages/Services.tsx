import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Camera, Film, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
    const services = [
        {
            icon: <Sparkles className="w-8 h-8"/>,
            title: "Digital Styling",
            desc: "The hero product. We take your raw fabric or simple product photos and transform them into high-end editorial campaigns using AI styling.",
            price: "Starting at ₦50,000",
            features: ["Fabric-to-Look Transformation", "Moodboard Curation", "3 Style Variations"]
        },
        {
            icon: <Camera className="w-8 h-8"/>,
            title: "AI Model Creation",
            desc: "Stop searching for the perfect face. We generate hyper-realistic AI models tailored to your brand's diversity and aesthetic needs.",
            price: "Custom Quote",
            features: ["Custom Ethnicity & Body Type", "Consistent Brand Face", "Unlimited Poses"]
        },
        {
            icon: <Film className="w-8 h-8"/>,
            title: "Cinematic Reels",
            desc: "Motion graphics and AI-enhanced video clips designed to stop the scroll. Perfect for TikTok and Reels engagement.",
            price: "Starting at ₦35,000",
            features: ["15-30s Vertical Video", "Sound Design", "Visual Effects"]
        },
        {
            icon: <PenTool className="w-8 h-8"/>,
            title: "Brand Direction",
            desc: "A complete visual overhaul. We define your brand's color palette, typography, and visual language to scream 'Luxury'.",
            price: "Consultation Only",
            features: ["Brand Book", "Social Media Templates", "Art Direction"]
        }
    ];

  return (
    <div className="bg-eko-black text-white min-h-screen pt-24 pb-12 font-sans">
      <section className="container mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
            Elevate your fashion brand with digital-first solutions. We combine artistry with AI to deliver results that convert.
        </p>
      </section>

      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-8 mb-20">
        {services.map((service, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-10 hover:bg-white/10 transition-all duration-300 group rounded-lg"
            >
                <div className="text-eko-gold mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed min-h-[80px]">{service.desc}</p>

                <ul className="space-y-2 mb-8 border-t border-white/10 pt-6">
                    {service.features.map((feat, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-eko-green rounded-full"></span> {feat}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-white font-bold tracking-wide">{service.price}</span>
                    <Link to="/book" className="flex items-center gap-2 text-eko-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                        Book Now <ArrowRight className="w-4 h-4"/>
                    </Link>
                </div>
            </motion.div>
        ))}
      </section>

       {/* CTA */}
       <section className="container mx-auto px-6">
        <div className="bg-eko-green/20 border border-eko-green/30 p-12 text-center rounded-sm">
            <h2 className="text-3xl font-serif font-bold mb-4">Not sure what you need?</h2>
            <p className="text-gray-300 mb-8">Let's have a chat about your brand's vision and find the perfect package.</p>
             <Link to="/book" className="bg-eko-green text-white px-8 py-3 uppercase font-bold text-sm tracking-widest hover:bg-yellow-500 hover:text-black transition-colors duration-300 rounded-full">
                Book a Consultation
             </Link>
        </div>
       </section>
    </div>
  );
};

export default Services;
