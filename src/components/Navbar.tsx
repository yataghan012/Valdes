import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

const NAV_LINKS = [
  { label: 'NUESTRA HISTORIA', id: 'historia' },
  { label: 'MENÚ', id: 'menu' },
  { label: 'EVENTOS', id: 'eventos' },
  { label: 'SUCURSALES', id: 'sucursales' }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
    
    if (latest > 150 && latest > previous) {
      setHidden(true);
      setIsMobileMenuOpen(false); // Close mobile menu on scroll down
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" });

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isAtTop 
          ? 'top-6 w-full max-w-7xl bg-transparent border-transparent px-6' 
          : 'top-4 w-[95%] max-w-5xl bg-[#0A1118]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] px-4 md:px-8'
      }`}
    >
      <div className="flex justify-between items-center py-3">
        
        {/* Left Side: Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/logo.png" 
            alt="Valdés Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform duration-500" 
            referrerPolicy="no-referrer" 
          />
          <div className={`flex flex-col items-start transition-opacity duration-500 ${!isAtTop ? 'hidden lg:flex' : 'flex'}`}>
            <span className="font-brand text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">Valdés</span>
            <span className="font-brand text-[9px] md:text-[10px] font-light tracking-[0.2em] uppercase text-slate-300 mt-1">
              Restó & Marisquería
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop Only) */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)}
                className={`relative font-brand text-xs uppercase tracking-widest transition-colors duration-300 py-2 group ${
                  isActive ? 'text-copper' : 'text-slate-light/70 hover:text-white'
                }`}
              >
                {link.label}
                {/* Animated Underline */}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-copper transform origin-left transition-transform duration-300 ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Primary CTA Button */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <button className="relative group bg-[#0D151C] border-2 border-copper px-8 py-2.5 flex flex-col items-center justify-center transition-all duration-500 hover:bg-gradient-to-tr hover:from-[#0D151C] hover:via-[#1c2b3b] hover:to-[#0D151C] rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Rivets */}
            <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
            
            {/* Typography */}
            <span className="font-sans font-bold uppercase text-white text-sm tracking-wider">
              RESERVÁ TU MESA
            </span>
            <span className="text-[9px] text-copper/80 uppercase tracking-widest mt-0.5">
              RESERVA INTEGRADA WOKI
            </span>
          </button>
        </div>

        {/* Mobile View: Hamburger Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            className="text-white hover:text-copper transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full mt-2 overflow-hidden"
          >
            <div className="bg-[#0A1118]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl mx-2">
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button 
                      key={link.id} 
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left font-brand text-sm uppercase tracking-widest transition-colors ${
                        isActive ? 'text-copper font-bold' : 'text-slate-light/80'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
              <div className="h-[1px] w-full bg-white/10"></div>
              <button className="relative group w-full bg-[#0D151C] border-2 border-copper px-6 py-3 flex flex-col items-center justify-center transition-all duration-500 hover:bg-gradient-to-tr hover:from-[#0D151C] hover:via-[#1c2b3b] hover:to-[#0D151C] rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-2">
                {/* Rivets */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-copper shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                
                {/* Typography */}
                <span className="font-sans font-bold uppercase text-white text-sm tracking-wider">
                  RESERVÁ TU MESA
                </span>
                <span className="text-[9px] text-copper/80 uppercase tracking-widest mt-0.5">
                  RESERVA INTEGRADA WOKI
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
