import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

const About: React.FC = () => {
  return (
    <>
    <Navigation />
    <div className="bg-eko-black text-white min-h-screen pt-24 pb-12 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-eko-gold text-sm tracking-[0.3em] uppercase mb-4">The Origin</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Where Lagos Energy <br/> Meets Digital Futures.
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We are not just a styling agency. We are a cultural bridge, translating the raw, vibrant pulse of Lagos fashion into high-fidelity digital experiences.
          </p>
        </motion.div>
      </section>

      {/* The Story / Vision */}
      <section className="container mx-auto px-6 mb-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-4/5 overflow-hidden rounded-lg"
        >
           {/* Placeholder for a Founder/Brand Image - Replace with actual asset */}
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10"></div>
          <img
            src="/images/yoruba_agbada_modern.png"
            alt="Fashion editorial mood"
            className="object-cover w-full h-full opacity-80"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4 text-white">The Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              Traditional fashion is limited by physical constraints. We break those walls.
              Using advanced AI tools and styling expertise, we craft visuals that evoke deep emotion—desire, aspiration, and confidence—without the logistical nightmare of traditional photoshoots.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4 text-white">Lagos Roots</h2>
            <p className="text-gray-400 leading-relaxed">
              Inspired by the chaos and creativity of Lagos, our aesthetic is bold, unapologetic, and deeply rooted in storytelling. We bring that "editorial energy" to every pixel.
            </p>
          </div>
        </motion.div>
      </section>

       {/* Values */}
       <section className="bg-white/5 py-20">
        <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-serif font-bold mb-16">Core Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Emotion First", desc: "Technology is cold. We make it feel warm, human, and desirable." },
                    { title: "Standard of Excellence", desc: "We don't do 'good enough'. Every pixel must scream luxury." },
                    { title: "Speed & Scale", desc: "Digital styling allows for rapid iteration and limitless creativity." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-eko-black border border-white/10 p-8 hover:border-eko-gold transition-colors duration-300 group rounded-lg">
                        <h3 className="text-xl font-bold text-eko-gold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-loose">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
       </section>
    </div>
    </>
  );
};

export default About;
