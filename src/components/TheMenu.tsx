import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Database, X } from 'lucide-react';

const MENU_DATA = [
  {
    id: 1,
    name: "Parrillada de Mar",
    price: "$25.000",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    category: "Para Compartir",
    description: "Un festín monumental de lo mejor del océano. Incluye langostinos al fuego, calamares, pescado blanco local y mariscos, todo con el toque del humo patagónico y servido con nuestro chimichurri costero de autor."
  },
  {
    id: 2,
    name: "Centolla Fueguina",
    price: "$32.000",
    image: "https://images.unsplash.com/photo-1553659971-f01207815844?auto=format&fit=crop&w=800&q=80",
    category: "La Pesca",
    description: "La joya de la corona de los mares del sur. Centolla pura y dulce traída directamente de las aguas gélidas de Tierra del Fuego, servida simplemente con manteca clarificada y limón para honrar su perfección natural."
  },
  {
    id: 3,
    name: "Merluza Negra",
    price: "$28.000",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80",
    category: "La Pesca",
    description: "También conocida como Bacalao de Profundidad. Una delicia rica y mantecosa que se derrite en la boca. Sellada a la sartén para lograr una piel crocante manteniendo un interior tierno y laminado."
  },
  {
    id: 4,
    name: "Ostras Frescas (x6)",
    price: "$15.000",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80",
    category: "Barra de Crudos",
    description: "Seis ostras impecables, abiertas al momento. Salinas, crocantes y refrescantes. Servidas sobre hielo picado con una mignonette clásica y gajos de limón fresco."
  },
  {
    id: 5,
    name: "Pulpo a la Gallega",
    price: "$22.000",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    category: "Tapas",
    description: "Tiernos tentáculos de pulpo cocidos a fuego lento a la perfección, luego espolvoreados con pimentón ahumado y sal marina gruesa. Servidos sobre papas andinas aplastadas."
  },
  {
    id: 6,
    name: "Ceviche Patagónico",
    price: "$18.000",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    category: "Barra de Crudos",
    description: "Pesca local fresca curada en jugos cítricos vibrantes, mezclada con cebolla morada, cilantro y un toque de ají picante. Un despertar brillante y ácido para el paladar."
  }
];

export default function TheMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<typeof MENU_DATA[0] | null>(null);

  const categories = ['Todos', ...Array.from(new Set(MENU_DATA.map(item => item.category)))];

  const filteredMenu = MENU_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-slate-light">
      
      <div className="relative z-10 bg-[#0e4268]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-6 md:p-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Database className="w-4 h-4 text-copper" />
            <span className="text-xs font-mono tracking-[0.3em] text-copper uppercase font-bold">Fuente de Verdad</span>
            <Database className="w-4 h-4 text-copper" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-brand font-bold text-white mb-6 salt-crust tracking-tighter">
            TRANSPARENCIA
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-slate-light/70 font-mono leading-relaxed">
            Precios de mercado en vivo. Directo de los barcos a nuestra base de datos centralizada. Sin cargos ocultos, sin misterios de precios.
          </p>
        </div>

        {/* Search Bar (Terminal Style) */}
        <div className="relative max-w-2xl mx-auto mb-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-light/40 group-focus-within:text-copper transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-[#08253d]/80 border border-white/10 text-white font-mono text-sm placeholder:text-slate-light/30 focus:outline-none focus:border-copper/50 focus:ring-1 focus:ring-copper/50 transition-all backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            placeholder="Buscar en la base de datos (ej., 'Merluza', 'Barra de Crudos')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-[10px] font-mono text-slate-light/20 uppercase tracking-widest">Consulta_Activa</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'border-copper bg-copper/10 text-copper shadow-[0_0_15px_rgba(179,107,57,0.2)]' 
                  : 'border-white/10 bg-[#08253d]/50 text-slate-light/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visual Market Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className="relative h-64 group overflow-hidden border border-white/10 bg-[#08253d] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Heavy gradient to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08253d] via-[#08253d]/60 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  
                  {/* Top: Category & Price */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-light/90 border border-white/20 px-2 py-1 bg-black/40 backdrop-blur-md">
                      {item.category}
                    </span>
                    <span className="text-lg font-mono font-bold text-copper bg-[#08253d]/90 px-2 py-1 border border-copper/30 shadow-lg">
                      {item.price}
                    </span>
                  </div>

                  {/* Bottom: Name */}
                  <div>
                    <h3 className="text-2xl font-brand text-white mb-1 group-hover:text-copper transition-colors drop-shadow-md">
                      {item.name}
                    </h3>
                  </div>

                </div>
                
                {/* Industrial Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 z-20"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 z-20"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 z-20"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 z-20"></div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-light/40 font-mono text-sm">
              <Database className="w-8 h-8 mb-4 opacity-20" />
              <p>No se encontraron registros para "{searchQuery}"</p>
            </div>
          )}
        </div>

      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#08253d] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-copper text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Half */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative shrink-0">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient to blend image into content on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08253d] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#08253d]"></div>
              </div>

              {/* Content Half */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                {/* Industrial Corner Accents */}
                <div className="hidden md:block absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30"></div>
                <div className="hidden md:block absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30"></div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono tracking-widest uppercase text-slate-light/90 border border-white/20 px-2 py-1 bg-white/5">
                    {selectedItem.category}
                  </span>
                  <span className="text-xl font-mono font-bold text-copper">
                    {selectedItem.price}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-brand text-white mb-6 leading-tight">
                  {selectedItem.name}
                </h3>

                <div className="h-[1px] w-12 bg-copper mb-6"></div>

                <p className="text-slate-light/70 font-light leading-relaxed text-lg mb-8">
                  {selectedItem.description}
                </p>

                {/* Modal CTA */}
                <button className="self-start wet-stone-btn px-8 py-3 border border-copper/40 text-white font-sans font-medium tracking-[0.2em] uppercase text-xs transition-all flex items-center gap-2 group">
                  <span>Agregar al Pedido</span>
                  <div className="w-1 h-1 rounded-full bg-copper group-hover:bg-white transition-colors"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
