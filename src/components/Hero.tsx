import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1600&q=80", // Platter
  "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1600&q=80", // Steaming dish
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80"  // Sushi
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const yPlatter = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacityPlatter = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setAutoplayFailed(true));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full h-[100svh] min-h-[650px] flex flex-col items-center justify-center pt-16 md:pt-20"
      onClick={() => autoplayFailed && videoRef.current?.play().then(() => setAutoplayFailed(false))}
    >
      {/* Ambient Video Background with seamless fade at the bottom */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        <video 
          ref={videoRef}
src={`${import.meta.env.BASE_URL}ocean.mp4`}
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        {/* Deep Oceanic Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A243F]/80 to-transparent transition-colors duration-500"></div>
        
        {/* Weathered Map Overlay (Subtle Texture) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Lighthouse Micro-Interaction */}
        <motion.div style={{ y: yText }} className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-coral shadow-[0_0_12px_#FF7E67]"></span>
          </div>
          <span className="text-xs font-mono tracking-[0.2em] text-slate-light/80 uppercase">
            {autoplayFailed ? "Esperando Entrada" : "En Vivo: Costa Patagónica"}
          </span>
        </motion.div>

        {/* Oversized Typography */}
        <motion.div style={{ y: yText }} className="flex flex-col items-center z-10">
          <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[10rem] font-brand font-bold leading-[0.85] tracking-tighter text-white salt-crust mb-4">
            VALDÉS
          </h1>
          <div className="flex items-center gap-6 w-full max-w-3xl">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-copper/50 to-transparent"></div>
            <h2 className="text-xs md:text-sm lg:text-base font-sans font-light tracking-[0.4em] uppercase text-slate-light/90">
              El Sustituto Costero
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-copper/50 to-transparent"></div>
          </div>
        </motion.div>

        {/* Parallax Platter Stack Slideshow */}
        <motion.div 
          style={{ y: yPlatter, opacity: opacityPlatter }} 
          className="relative w-full max-w-4xl mx-auto mt-[-1rem] md:mt-[-4rem] z-30 pointer-events-none"
        >
          {/* Radial mask to blend the edges of the image into the background */}
          <div 
            className="relative w-full aspect-square md:aspect-[21/9] flex items-center justify-center"
            style={{ 
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)', 
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' 
            }}
          >
            <AnimatePresence>
              <motion.img 
                key={currentSlide}
                src={SLIDE_IMAGES[currentSlide]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                alt="Abundant Seafood Platter" 
                className="absolute inset-0 w-full h-full object-cover drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div style={{ y: yText }} className="relative z-40 mt-[-2rem] md:mt-[-5rem]">
          <button 
            onClick={() => {
              const el = document.getElementById('menu');
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
            }}
            className="wet-stone-btn group relative px-12 py-6 border border-copper/40 text-white font-sans font-medium tracking-[0.2em] uppercase text-sm transition-all overflow-hidden pointer-events-auto"
          >
            <span className="relative z-10 drop-shadow-md">Explorar el Menú</span>
            
            {/* Wet-stone shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            {/* Industrial Rivets */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-trench border border-copper/40 shadow-inner"></div>
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-trench border border-copper/40 shadow-inner"></div>
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-trench border border-copper/40 shadow-inner"></div>
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-trench border border-copper/40 shadow-inner"></div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
