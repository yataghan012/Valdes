import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

const ALTA_IMAGES = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
];

const VILLA_BELGRANO_IMAGES = [
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
];

export default function TheDuality() {
  const [hovered, setHovered] = useState<'alta' | 'villa-belgrano' | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hovered) {
      interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % 3);
      }, 1500);
    } else {
      setImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light">
      <div className="relative w-full flex flex-col md:flex-row overflow-hidden bg-[#0b3352]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] min-h-[80vh]">
      
      {/* Center Divider Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] md:h-auto md:top-0 md:bottom-0 md:left-1/2 md:w-[1px] bg-white/10 z-20 pointer-events-none md:-translate-x-1/2 -translate-y-1/2 md:translate-y-0"></div>

      {/* Alta Córdoba Branch */}
      <motion.div 
        className="relative flex flex-col justify-end p-8 md:p-16 cursor-pointer group border-b md:border-b-0 md:border-r border-white/5"
        animate={{ flex: hovered === 'alta' ? 3 : hovered === 'villa-belgrano' ? 1 : 2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered('alta')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {ALTA_IMAGES.map((img, idx) => {
            const isActive = (hovered === 'alta' && imageIndex === idx) || (!hovered && idx === 0);
            return (
              <motion.img 
                key={img}
                src={img} 
                alt={`Alta Córdoba Casona ${idx}`} 
                initial={false}
                animate={{ 
                  opacity: isActive ? 0.8 : 0, 
                  scale: isActive ? 1.05 : 1.1
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            );
          })}
          {/* Lighter gradient just for text readability at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08253d]/90 via-[#08253d]/30 to-transparent pointer-events-none"></div>
          {/* Overlay blend mode preserves brightness better than multiply */}
          <div className="absolute inset-0 bg-copper/10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-brick-wall.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col w-[300px] md:w-[450px]">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-copper" />
            <span className="text-xs font-mono tracking-[0.2em] text-copper uppercase">La Casona Histórica</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white mb-4 tracking-tight">Alta Córdoba</h2>
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: hovered === 'alta' ? 1 : 0, 
              height: hovered === 'alta' ? 'auto' : 0 
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="text-slate-light/80 font-light mb-8 text-lg leading-relaxed">
              Calidez, acústica y ladrillo a la vista. El ancla marítima original en el corazón de la ciudad. Ideal para cenas íntimas y largas conversaciones.
            </p>
            <button className="flex items-center gap-3 text-white font-mono text-sm uppercase tracking-widest hover:text-copper transition-colors">
              Explorar Sucursal <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Villa Belgrano Branch */}
      <motion.div 
        className="relative flex flex-col justify-end p-8 md:p-16 cursor-pointer group"
        animate={{ flex: hovered === 'villa-belgrano' ? 3 : hovered === 'alta' ? 1 : 2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered('villa-belgrano')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {VILLA_BELGRANO_IMAGES.map((img, idx) => {
            const isActive = (hovered === 'villa-belgrano' && imageIndex === idx) || (!hovered && idx === 0);
            return (
              <motion.img 
                key={img}
                src={img} 
                alt={`Villa Belgrano Minimalist ${idx}`} 
                initial={false}
                animate={{ 
                  opacity: isActive ? 0.8 : 0, 
                  scale: isActive ? 1.05 : 1.1
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            );
          })}
          {/* Lighter gradient just for text readability at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08253d]/90 via-[#08253d]/30 to-transparent pointer-events-none"></div>
          {/* Overlay blend mode preserves brightness better than multiply */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col w-[300px] md:w-[450px]">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-slate-light" />
            <span className="text-xs font-mono tracking-[0.2em] text-slate-light uppercase">El Ancla Moderna</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white mb-4 tracking-tight">Villa Belgrano</h2>
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: hovered === 'villa-belgrano' ? 1 : 0, 
              height: hovered === 'villa-belgrano' ? 'auto' : 0 
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="text-slate-light/80 font-light mb-8 text-lg leading-relaxed">
              Elegante, minimalista y de gran energía. Una versión arquitectónica moderna de los refugios de pesca patagónicos. Ideal para reuniones grandes y noches vibrantes.
            </p>
            <button className="flex items-center gap-3 text-white font-mono text-sm uppercase tracking-widest hover:text-slate-light/70 transition-colors">
              Explorar Sucursal <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      </div>
    </section>
  );
}
