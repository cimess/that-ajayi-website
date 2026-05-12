import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Wand2, Share2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            id: "01",
            icon: <Upload className="w-10 h-10"/>,
            title: "Submit Your Assets",
            desc: "Upload photos of your fabric, existing garments, or even just a moodboard. Tell us your vision, target audience, and preferred aesthetic.",
        },
        {
            id: "02",
            icon: <Wand2 className="w-10 h-10"/>,
            title: "AI Styling Magic",
            desc: "We use our custom AI workflows to generate high-fidelity editorials. We apply textures, drape fabrics on virtual models, and create lighting that fits your brand.",
        },
        {
            id: "03",
            icon: <Share2 className="w-10 h-10"/>,
            title: "Delivery & Launch",
            desc: "Receive your portfolio-ready images or video reels. Ready to post on Instagram, TikTok, or your website to drive sales.",
        }
    ];

  return (
    <>
    <Navigation />
    <div className="bg-eko-black text-white min-h-screen pt-24 pb-12 font-sans">
      <section className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8">How It Works</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Complex technology, simple process. We handle the heavy lifting of AI generation so you can focus on selling fashion.
        </p>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-6 mb-24">
        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 bg-linear-to-r from-transparent via-emerald-500 to-transparent z-0"></div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-black border border-white/10 p-8 pt-12 md:pt-16 text-center relative group hover:border-amber-500 transition-colors duration-300 rounded-lg"
                    >
                        {/* Number Badge */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 border-green flex items-center justify-center font-bold text-green z-20 group-hover:bg-green group-hover:text-white transition-colors duration-300">
                            {step.id}
                        </div>

                        <div className="text-white mb-6 flex justify-center group-hover:text-eko-gold transition-colors">{step.icon}</div>
                        <h3 className="text-2xl font-serif font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ / Expectation Setting */}
      <section className="container mx-auto px-6 max-w-3xl">
         <h2 className="text-3xl font-serif font-bold mb-10 text-center">Why Choose Digital?</h2>
         <div className="space-y-6">
            <div className="flex gap-4 items-start bg-white/5 p-6 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-eko-gold shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white mb-2">No Physical Sampling Needed</h4>
                    <p className="text-gray-400 text-sm">Visualize designs before you sew a single stitch. Save money on fabric waste.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start bg-white/5 p-6 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-eko-gold shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white mb-2">Infinite Locations</h4>
                    <p className="text-gray-400 text-sm">Shoot in Paris, Tokyo, or Mars without leaving Lagos.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start bg-white/5 p-6 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-eko-gold shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white mb-2">Consistent Branding</h4>
                    <p className="text-gray-400 text-sm">Maintain a perfectly consistent look across your entire Instagram feed.</p>
                </div>
            </div>
         </div>

         <div className="mt-16 text-center">
            <Link to="/submit" className="px-10 py-4 uppercase font-bold tracking-widest bg-amber-500 transition-colors duration-300 inline-block shadow-lg shadow-amber-500/20 rounded-lg">
                Start My Project
            </Link>
         </div>
      </section>
    </div>
    </>
  );
};

export default HowItWorks;
