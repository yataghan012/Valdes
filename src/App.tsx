/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurHistory from './components/OurHistory';
import MaritimeTrace from './components/MaritimeTrace';
import TheDuality from './components/TheDuality';
import TheRitual from './components/TheRitual';
import TheSchedule from './components/TheSchedule';
import TheMenu from './components/TheMenu';
import Footer from './components/Footer';
import OceanBackground from './components/OceanBackground';

export default function App() {
  const { scrollYProgress } = useScroll();

  // Ocean descent colors: Surface -> Shallow -> Mid -> Deep -> Abyss
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.7, 1],
    ['#0A243F', '#061626', '#030B14', '#010408', '#000000']
  );

  return (
    <div>
      <motion.div 
        style={{ backgroundColor }}
        className="min-h-screen w-full overflow-x-hidden text-slate-light relative transition-colors duration-500"
      >
        <OceanBackground scrollYProgress={scrollYProgress} />
        
        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen gap-16 md:gap-32 pb-24 isolate">
          
          <Navbar />
          
          <div id="inicio" className="relative z-20">
            <Hero />
          </div>

          <div id="historia">
            <OurHistory />
          </div>

          <div id="menu" className="relative z-10">
            <TheMenu />
          </div>

          <div id="sucursales">
            <TheDuality />
          </div>

          <div id="experiencia" className="flex flex-col gap-16 md:gap-32">
            <TheRitual />
            <MaritimeTrace />
          </div>

          <div id="eventos">
            <TheSchedule />
          </div>

          <Footer />
          
        </div>
      </motion.div>
    </div>
  );
}
