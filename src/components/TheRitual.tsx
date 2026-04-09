import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const UGC_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80", span: "md:col-span-2 md:row-span-2", alt: "Massive seafood platter" },
  { id: 2, src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80", span: "md:col-span-1 md:row-span-1", alt: "Friends clinking glasses" },
  { id: 3, src: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80", span: "md:col-span-1 md:row-span-2", alt: "Steaming shellfish" },
  { id: 4, src: "https://images.unsplash.com/photo-1553659971-f01207815844?auto=format&fit=crop&w=800&q=80", span: "md:col-span-1 md:row-span-1", alt: "Close up of fresh catch" },
  { id: 5, src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80", span: "md:col-span-2 md:row-span-1", alt: "Dining atmosphere" },
  { id: 6, src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", span: "md:col-span-1 md:row-span-1", alt: "Prawns" },
  { id: 7, src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80", span: "md:col-span-1 md:row-span-1", alt: "Sushi arrangement" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

export default function TheRitual() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light">
      
      <div className="relative w-full py-16 px-6 md:px-12 overflow-hidden bg-[#030B14]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        
        {/* Background Whale Tail Sigil Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 100 100" className="w-[120%] md:w-[80%] h-auto fill-white" preserveAspectRatio="xMidYMid meet">
            <path d="M50,60 C40,40 10,20 0,25 C15,15 40,20 48,40 C49,42 51,42 52,40 C60,20 85,15 100,25 C90,20 60,40 50,60 Z M48,60 L48,100 L52,100 L52,60 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-copper"></div>
              <span className="text-xs font-mono tracking-[0.3em] text-copper uppercase font-bold">Abundancia Democrática</span>
              <div className="h-[1px] w-12 bg-copper"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-brand font-bold text-white mb-6 salt-crust tracking-tighter">
              EL RITUAL
            </h2>
            <p className="max-w-2xl text-lg text-slate-light/70 font-light leading-relaxed">
              La experiencia de "Diente Libre" es más que una comida; es una celebración de la costa. 
              Sin límites, sin pretensiones. Solo una marea interminable de sabor patagónico.
            </p>
          </div>

          {/* The Mosaic Rebuild Gallery */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[150px] md:auto-rows-[250px] max-w-6xl mx-auto p-2 bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          >
            {UGC_IMAGES.map((img) => (
              <motion.div 
                key={img.id}
                variants={tileVariants}
                className={`relative overflow-hidden group bg-[#0A1118] ${img.span}`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                {/* Instagram-style overlay on hover */}
                <div className="absolute inset-0 bg-[#0A1118]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <Instagram className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action below mosaic */}
          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer font-mono text-xs uppercase tracking-widest text-slate-light/80">
              <Instagram className="w-4 h-4 text-copper" />
              <span>Sumate al Ritual @ValdesResto</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
