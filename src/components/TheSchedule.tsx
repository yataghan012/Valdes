import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

const SCHEDULE_DATA = [
  {
    day: "MARTES",
    event: "Sushi & Omakase",
    desc: "Doce pasos. Ingredientes del día. Una mesa para los que quieren algo distinto.",
    branch: "Solo Villa Belgrano",
    status: "Cupos Limitados",
    statusColor: "text-coral",
    glow: true
  },
  {
    day: "MIÉRCOLES",
    event: "Mujeres del Mar",
    desc: "Miércoles para ellas. 50% en cócteles y las mejores tablas para compartir.",
    branch: "Alta Córdoba",
    status: "Disponible",
    statusColor: "text-copper",
    glow: false
  },
  {
    day: "JUEVES",
    event: "Maridaje Patagónico",
    desc: "Cinco pasos. Vinos de altura. El mar y la montaña en la misma mesa.",
    branch: "Ambas Sucursales",
    status: "Disponible",
    statusColor: "text-copper",
    glow: false
  },
  {
    day: "VIERNES",
    event: "La Pesca Fresca",
    desc: "Llega el cargamento del sur. Los primeros en acceder a lo mejor de la semana.",
    branch: "Ambas Sucursales",
    status: "Alta Demanda",
    statusColor: "text-coral",
    glow: true
  },
  {
    day: "FIN DE SEMANA",
    event: "El Ritual (Diente Libre)",
    desc: "Abundancia Democrática. Mariscos sin fin, servidos hasta que digas basta.",
    branch: "Ambas Sucursales",
    status: "Lista de Espera",
    statusColor: "text-slate-light/50",
    glow: false
  }
];

export default function TheSchedule() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light">
      
      <div className="relative z-10 bg-[#08253d]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-6 md:p-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="w-5 h-5 text-copper" />
              <span className="text-xs font-mono tracking-[0.3em] text-copper uppercase font-bold">Agenda Social</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white leading-[0.9] tracking-tighter salt-crust">
              EL MANIFIESTO
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-light/60 font-mono leading-relaxed border-l border-copper/30 pl-6">
            Nuestro ritmo semanal. Reservá con anticipación — los jueves y viernes se llenan primero.
          </p>
        </div>

        {/* The Shipping Manifest Grid */}
        <div className="relative w-full bg-black/20 border border-white/5 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-12 py-6 border-b border-[#1A1A1A] bg-white/[0.02]">
            <div className="col-span-2 text-xs font-mono text-slate-light/40 uppercase tracking-widest">Día</div>
            <div className="col-span-5 text-xs font-mono text-slate-light/40 uppercase tracking-widest">Evento y Detalles</div>
            <div className="col-span-2 text-xs font-mono text-slate-light/40 uppercase tracking-widest">Ubicación</div>
            <div className="col-span-3 text-xs font-mono text-slate-light/40 uppercase tracking-widest text-right">Estado</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {SCHEDULE_DATA.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => window.open('https://valdesmarisqueria.wokiapp.com/', '_blank')}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 px-8 md:px-12 py-8 border-b border-[#1A1A1A] last:border-b-0 hover:bg-white/[0.03] transition-colors duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Day */}
                <div className="col-span-1 md:col-span-2 flex items-center">
                  <span className="text-sm md:text-base font-mono font-bold tracking-widest text-white group-hover:text-copper transition-colors">
                    {item.day}
                  </span>
                </div>

                {/* Event & Details */}
                <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-brand text-white mb-2">{item.event}</h3>
                  <p className="text-sm text-slate-light/60 font-light leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* Location */}
                <div className="col-span-1 md:col-span-2 flex items-center mt-4 md:mt-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-light/50 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    {item.branch}
                  </div>
                </div>

                {/* Status & CTA */}
                <div className="col-span-1 md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center mt-6 md:mt-0 relative">
                  
                  {/* Status Indicator */}
                  <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${item.statusColor} transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4 md:absolute md:right-0`}>
                    {item.glow && (
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.statusColor === 'text-coral' ? 'bg-coral' : 'bg-copper'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${item.statusColor === 'text-coral' ? 'bg-coral' : 'bg-copper'}`}></span>
                      </span>
                    )}
                    {item.status}
                  </div>

                  {/* Hover CTA Button */}
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 md:absolute md:right-0">
                    <span>Reservar Mesa</span>
                    <ArrowRight className="w-4 h-4 text-copper" />
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
