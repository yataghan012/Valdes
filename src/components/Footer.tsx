import React, { useState } from 'react';
import { Anchor, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer() {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'protocol' | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative w-full pt-24 pb-12 text-slate-light overflow-hidden border-t border-white/10 bg-transparent">
      {/* Background Pattern - Subtle maritime grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Anchor className="w-6 h-6 text-copper" />
              <span className="text-2xl font-brand font-bold text-white tracking-tight uppercase">Valdés</span>
            </div>
            <p className="text-sm text-slate-light/50 font-mono leading-relaxed uppercase tracking-wider">
              Especialistas en tablas de mar. <br />
              Alta Córdoba & Villa Belgrano. <br />
              Desde 1994.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-slate-light/40 hover:text-copper transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-light/40 hover:text-copper transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-light/40 hover:text-copper transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Branch 1: Alta Córdoba */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.3em] text-copper uppercase font-bold">Sucursal_01 // Alta Córdoba</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-light/30 mt-1" />
                <span className="text-sm text-slate-light/70 font-mono uppercase">Urquiza 1864, <br />Alta Córdoba, ARG</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-light/30" />
                <span className="text-sm text-slate-light/70 font-mono">+54 351 472-1234</span>
              </div>
            </div>
          </div>

          {/* Branch 2: Villa Belgrano */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.3em] text-copper uppercase font-bold">Sucursal_02 // Villa Belgrano</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-light/30 mt-1" />
                <span className="text-sm text-slate-light/70 font-mono uppercase">Av. Gauss 5780, <br />Villa Belgrano, ARG</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-light/30" />
                <span className="text-sm text-slate-light/70 font-mono">+54 351 481-5678</span>
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.3em] text-copper uppercase font-bold">Manifiesto // Links</h4>
            <div className="space-y-3">
              <button onClick={() => scrollToSection('experiencia')} className="block text-sm text-slate-light/50 hover:text-white font-mono uppercase tracking-widest transition-colors text-left">El Rastreo</button>
              <button onClick={() => scrollToSection('experiencia')} className="block text-sm text-slate-light/50 hover:text-white font-mono uppercase tracking-widest transition-colors text-left">El Ritual</button>
              <button onClick={() => scrollToSection('eventos')} className="block text-sm text-slate-light/50 hover:text-white font-mono uppercase tracking-widest transition-colors text-left">El Manifiesto</button>
              <button onClick={() => setModalType('protocol')} className="block text-sm text-slate-light/50 hover:text-white font-mono uppercase tracking-widest transition-colors text-left">Transparencia</button>
              <div className="pt-4 flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-light/30" />
                <span className="text-sm text-slate-light/70 font-mono">[REEMPLAZAR CON EMAIL REAL DEL RESTAURANTE]</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-light/20 uppercase tracking-[0.2em]">
            © 2026 Valdés Restó & Marisquería. Todos los derechos reservados.
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-slate-light/20 uppercase tracking-[0.2em]">
            <button onClick={() => setModalType('privacy')} className="hover:text-slate-light/40 transition-colors">Política_de_Privacidad</button>
            <button onClick={() => setModalType('terms')} className="hover:text-slate-light/40 transition-colors">Términos_de_Servicio</button>
            <button onClick={() => setModalType('protocol')} className="hover:text-slate-light/40 transition-colors">Protocolo_de_Datos</button>
          </div>
        </div>

      </div>

      {/* Legal Modal Overlay */}
      <LegalModal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        type={modalType} 
      />

      {/* Industrial Rivet Accents */}
      <div className="absolute top-0 left-1/4 w-[1px] h-4 bg-white/10"></div>
      <div className="absolute top-0 left-2/4 w-[1px] h-4 bg-white/10"></div>
      <div className="absolute top-0 left-3/4 w-[1px] h-4 bg-white/10"></div>
    </footer>
  );
}
