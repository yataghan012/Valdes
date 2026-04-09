import React, { useMemo, useState, useEffect } from 'react';
import { motion, MotionValue, useTransform, useScroll } from 'motion/react';

export default function OceanBackground({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade in the entire ocean background effects after the Hero section
  // The Hero is 120vh tall. We start fading in at 80vh and finish at 120vh.
  const masterOpacity = useTransform(scrollY, [vh * 0.8, vh * 1.2], [0, 1]);

  // Realistic light rays fade out as we go deeper (past the Menu section)
  // Menu section is roughly 120vh to 250vh.
  const raysOpacity = useTransform(scrollY, [vh * 1.5, vh * 2.2], [1, 0]);
  
  // Fog parallax (moves up slightly as we scroll down to create depth)
  const fogY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const fogY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Generate random particles for marine snow
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1px to 4px
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 10}s`, // 10s to 30s
      animationDelay: `-${Math.random() * 20}s`, // Negative delay so they are already on screen
      opacity: Math.random() * 0.5 + 0.1,
      drift: Math.random() * 60 - 30 // -30px to 30px horizontal drift
    }));
  }, []);

  return (
    <motion.div style={{ opacity: masterOpacity }} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Inline styles for complex animations */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(110vh) translateX(0px); opacity: 0; }
            10% { opacity: var(--max-opacity); }
            90% { opacity: var(--max-opacity); }
            100% { transform: translateY(-10vh) translateX(var(--drift)); opacity: 0; }
          }
          .marine-snow {
            position: absolute;
            border-radius: 50%;
            animation: floatUp linear infinite;
          }
          @keyframes raysSway1 {
            0% { transform: rotate(-3deg) scale(1.5); }
            100% { transform: rotate(3deg) scale(1.5); }
          }
          @keyframes raysSway2 {
            0% { transform: rotate(2deg) scale(1.5); }
            100% { transform: rotate(-4deg) scale(1.5); }
          }
          .ray-layer {
            position: absolute;
            top: -20%; left: -50%; right: -50%; height: 150%;
            transform-origin: top center;
            mix-blend-mode: screen;
            pointer-events: none;
          }
          .ray-layer-1 {
            background: repeating-conic-gradient(
              from 170deg at 50% -10%,
              rgba(150, 210, 255, 0.08) 0deg,
              rgba(150, 210, 255, 0) 4deg,
              rgba(150, 210, 255, 0.05) 8deg,
              rgba(150, 210, 255, 0) 12deg
            );
            filter: blur(15px);
            animation: raysSway1 12s ease-in-out infinite alternate;
            mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
            -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
          }
          .ray-layer-2 {
            background: repeating-conic-gradient(
              from 180deg at 50% -10%,
              rgba(180, 230, 255, 0.06) 0deg,
              rgba(180, 230, 255, 0) 5deg,
              rgba(180, 230, 255, 0.09) 10deg,
              rgba(180, 230, 255, 0) 15deg
            );
            filter: blur(25px);
            animation: raysSway2 18s ease-in-out infinite alternate;
            mask-image: linear-gradient(to bottom, black 10%, transparent 70%);
            -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent 70%);
          }
        `}
      </style>

      {/* 3. Ocean Currents (Animated Fluid Gradients) */}
      <motion.div 
        animate={{ 
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-teal-900/10 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-900/10 blur-[150px]"
      />

      {/* 1. Realistic Light Rays (God Rays) */}
      <motion.div style={{ opacity: raysOpacity }} className="absolute inset-0 pointer-events-none">
        <div className="ray-layer ray-layer-1" />
        <div className="ray-layer ray-layer-2" />
      </motion.div>

      {/* 4. Abyssal Fog (Parallax Depth Layers) */}
      <motion.div 
        style={{ y: fogY1 }}
        className="absolute inset-[-50%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"
      />
      <motion.div 
        style={{ y: fogY2 }}
        className="absolute inset-[-50%] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-5 mix-blend-overlay"
      />

      {/* 2. Marine Snow (Particles) */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <div 
            key={p.id}
            className="marine-snow"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              backgroundColor: 'white',
              '--max-opacity': p.opacity,
              '--drift': `${p.drift}px`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </motion.div>
  );
}
