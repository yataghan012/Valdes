import React from 'react';
import { motion } from 'motion/react';
import { Users, Anchor, History, Quote } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: "Ricardo Valdés",
    role: "Fundador & Capitán",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    desc: "30 años de experiencia en la industria pesquera de Rawson."
  },
  {
    name: "Elena Martínez",
    role: "Chef Ejecutiva",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80",
    desc: "Especialista en cocina de mar y técnicas de conservación."
  },
  {
    name: "Julián Valdés",
    role: "Director de Logística",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    desc: "Responsable de que la mercadería llegue en 48hs a Córdoba."
  }
];

export default function OurHistory() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light">
      
      <div className="relative z-10 bg-[#0e4268]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-6 md:p-16 overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <History className="w-5 h-5 text-copper" />
                <span className="text-xs font-mono tracking-[0.3em] text-copper uppercase font-bold">Desde 1994</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white mb-8 leading-[0.9] tracking-tighter salt-crust">
                NUESTRA <br/> HISTORIA
              </h2>
              <div className="space-y-6 text-lg text-slate-light/70 font-light leading-relaxed">
                <p>
                  Todo comenzó en los muelles de Puerto Rawson. Lo que nació como una pequeña empresa familiar de logística pesquera, se transformó en una misión: acortar la distancia entre el Atlántico y el corazón de Argentina.
                </p>
                <p>
                  En Valdés, no solo servimos comida; servimos un compromiso. El compromiso de que el pescado que disfrutas hoy en Córdoba fue descargado hace menos de 48 horas en la costa chubutense.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80" 
                  alt="Nuestra Cocina" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08253d] via-transparent to-transparent"></div>
                
                {/* Floating Quote Card */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 -left-8 md:-left-12 bg-copper p-6 md:p-8 shadow-2xl max-w-[280px] md:max-w-[320px]"
                >
                  <Quote className="w-8 h-8 text-white/40 mb-4" />
                  <p className="text-white font-brand text-xl md:text-2xl leading-tight italic">
                    "La frescura no es un lujo, es un derecho del comensal."
                  </p>
                  <div className="mt-4 h-[1px] w-12 bg-white/30"></div>
                  <p className="mt-4 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                    — Ricardo Valdés
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="border-t border-white/5 pt-20">
            <div className="flex items-center gap-4 mb-12">
              <Users className="w-5 h-5 text-copper" />
              <h3 className="text-2xl font-brand text-white uppercase tracking-tight">La Tripulación</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl mb-6 border border-white/5 shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h4 className="text-xl font-brand text-white mb-1">{member.name}</h4>
                  <p className="text-xs font-mono text-copper uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-sm text-slate-light/50 font-light leading-relaxed">
                    {member.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Anchor */}
          <div className="absolute top-12 right-12 opacity-[0.03] pointer-events-none">
            <Anchor className="w-64 h-64 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
