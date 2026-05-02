import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Anchor, MapPin, Clock, Truck, Fish, Crosshair, X } from 'lucide-react';

export default function MaritimeTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Animate the trace line drawing down
  const pathHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light flex flex-col">
      
      {/* --- PART 1: THE LOGISTICAL TRACE (Brickwork & Industrial) --- */}
      <div className="relative w-full py-16 px-6 md:px-12 z-10 bg-[#0b3352]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]" ref={containerRef}>
        {/* Brickwork Underlay (Parallax reveal effect via fixed attachment simulation) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-brick-wall.png')] opacity-10 mix-blend-overlay pointer-events-none rounded-3xl"></div>

        <div className="relative z-20">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-16 bg-copper shadow-[0_0_10px_rgba(179,107,57,0.5)]"></div>
                <span className="text-xs font-mono tracking-[0.3em] text-copper uppercase font-bold">Autoridad Logística</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white leading-[0.9] tracking-tighter salt-crust">
                EL RASTREO <br/> MARÍTIMO
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-slate-light/60 font-mono leading-relaxed border-l border-copper/30 pl-6">
              Trasladamos la carga de la prueba de la opinión a la logística. Seguí el viaje de 48 horas de la cadena de frío desde las aguas profundas de la Patagonia directamente a Córdoba.
            </p>
          </div>

          {/* Industrial Timeline */}
          <div className="relative w-full max-w-4xl mx-auto pl-8 md:pl-0">
            
            {/* The Charcoal Metal Track (Background Line) */}
            <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1A1A1A] border-r border-white/5 -translate-x-1/2"></div>
            
            {/* The Animated Copper Trace Line */}
            <motion.div 
              className="absolute left-[39px] md:left-1/2 top-0 w-[2px] bg-copper shadow-[0_0_15px_rgba(179,107,57,0.8)] -translate-x-1/2 origin-top"
              style={{ height: pathHeight }}
            ></motion.div>

            {/* Timeline Steps */}
            <div className="flex flex-col gap-24 relative z-10">
              
              {[
                { time: "00:00", title: "La Pesca", loc: "Puerto Rawson, Chubut", desc: "Los barcos de alta mar descargan la pesca de la mañana directamente en los muelles.", icon: Fish, align: "right", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", rot: 3 },
                { time: "04:00", title: "Procesamiento", loc: "Planta Costera", desc: "Limpieza inmediata y enfriamiento rápido para sellar el sabor oceánico.", icon: Anchor, align: "left", img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80", rot: -2 },
                { time: "12:00", title: "Cadena de Frío", loc: "Ruta 3 hacia el Norte", desc: "El transporte térmico especializado mantiene un entorno estricto de 2°C.", icon: Truck, align: "right", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80", rot: 2 },
                { time: "48:00", title: "La Llegada", loc: "Valdés, Córdoba", desc: "Emplatado y servido. La brecha de 1.000 km, acortada al instante.", icon: MapPin, align: "left", highlight: true, img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80", rot: -3 }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-start md:items-center w-full ${step.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Panel */}
                  <div className={`w-full md:w-1/2 flex ${step.align === 'left' ? 'md:justify-start pl-16 md:pl-12' : 'md:justify-end pl-16 md:pl-0 md:pr-12'}`}>
                    <div className="relative bg-black/20 border border-white/5 rounded-2xl p-8 w-full max-w-sm group hover:border-copper/50 transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-xs font-mono font-bold tracking-widest px-2 py-1 ${step.highlight ? 'bg-coral text-trench' : 'bg-copper text-trench'}`}>
                          T+{step.time}
                        </span>
                        <span className="text-xs font-mono text-slate-light/40 uppercase tracking-wider">{step.loc}</span>
                      </div>
                      <h3 className="text-2xl font-brand text-white mb-3">{step.title}</h3>
                      <p className="text-sm text-slate-light/60 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center w-20 h-20">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-trench relative z-20 ${step.highlight ? 'bg-coral shadow-[0_0_30px_rgba(255,126,103,0.4)]' : 'bg-[#11517f] shadow-[0_0_20px_rgba(0,0,0,0.8)]'}`}>
                      <step.icon className={`w-6 h-6 ${step.highlight ? 'text-trench' : 'text-copper'}`} />
                    </div>
                  </div>

                  {/* Cinematic Polaroid Attachment */}
                  <div className={`hidden md:flex w-1/2 ${step.align === 'left' ? 'justify-end pr-16' : 'justify-start pl-16'} items-center`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: step.rot }}
                      viewport={{ once: true, margin: "-100px" }}
                      onClick={() => setSelectedImage(step.img)}
                      className="relative p-3 pb-12 bg-[#E2E8F0] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-105 hover:z-30 group max-w-[280px] w-full cursor-pointer"
                    >
                      {/* Masking Tape */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm rotate-[-4deg] z-10"></div>
                      
                      {/* Image */}
                      <div className="relative w-full aspect-square overflow-hidden bg-trench border border-slate-300">
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Handwritten note / timestamp */}
                      <div className="absolute bottom-4 left-4 font-mono text-xs text-trench/60 uppercase tracking-widest font-bold">
                        REG_{step.time.replace(':', '')}
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-copper text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Vista ampliada" 
                className="w-full h-full object-contain max-h-[85vh] rounded"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
