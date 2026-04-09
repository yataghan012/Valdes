import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Database, Anchor } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'protocol' | null;
}

const CONTENT = {
  privacy: {
    title: 'POLÍTICA DE PRIVACIDAD',
    icon: Shield,
    sections: [
      {
        subtitle: 'RECOLECCIÓN DE DATOS',
        text: 'En Valdés, recolectamos información necesaria para gestionar sus reservas y mejorar su experiencia. Esto incluye nombre, contacto y preferencias gastronómicas.'
      },
      {
        subtitle: 'USO DE LA INFORMACIÓN',
        text: 'Sus datos se utilizan exclusivamente para confirmar reservas, enviar recordatorios y, si lo autoriza, comunicar novedades sobre nuestra pesca fresca.'
      },
      {
        subtitle: 'SEGURIDAD MARÍTIMA',
        text: 'Implementamos protocolos de encriptación de grado industrial para asegurar que su información personal permanezca en un entorno seguro y privado.'
      }
    ]
  },
  terms: {
    title: 'TÉRMINOS DE SERVICIO',
    icon: FileText,
    sections: [
      {
        subtitle: 'POLÍTICA DE RESERVAS',
        text: 'Las reservas tienen una tolerancia de 15 minutos. En caso de no presentarse o cancelar con menos de 2 horas de antelación, nos reservamos el derecho de reasignar la mesa.'
      },
      {
        subtitle: 'CONDUCTA EN SUCURSALES',
        text: 'Valdés es un espacio de respeto y convivencia. Nos reservamos el derecho de admisión para mantener el ambiente adecuado para todos nuestros comensales.'
      },
      {
        subtitle: 'LIMITACIÓN DE RESPONSABILIDAD',
        text: 'Valdés no se responsabiliza por objetos personales olvidados en las instalaciones, aunque haremos lo posible por recuperarlos a través de nuestro protocolo de objetos perdidos.'
      }
    ]
  },
  protocol: {
    title: 'PROTOCOLO DE DATOS',
    icon: Database,
    sections: [
      {
        subtitle: 'RASTREO LOGÍSTICO',
        text: 'Cada ingreso de mercadería cuenta con un registro digital de temperatura y ubicación desde Puerto Rawson hasta nuestras sucursales en Córdoba.'
      },
      {
        subtitle: 'TRANSPARENCIA DE ORIGEN',
        text: 'Los datos de origen, fecha de captura y embarcación están a disposición de los comensales que deseen verificar la trazabilidad de su plato.'
      },
      {
        subtitle: 'AUDITORÍA DE CALIDAD',
        text: 'Realizamos controles diarios de calidad basados en los datos recolectados por nuestros sensores en la cadena de frío de 48 horas.'
      }
    ]
  }
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!type) return null;
  const content = CONTENT[type];
  const Icon = content.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-trench/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0A1118] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl"
          >
            {/* Industrial Header */}
            <div className="relative px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-copper/10 rounded-lg">
                  <Icon className="w-5 h-5 text-copper" />
                </div>
                <h2 className="text-xl font-brand font-bold text-white tracking-tight uppercase">
                  {content.title}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-light/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Rivets */}
              <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/10"></div>
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/10"></div>
            </div>

            {/* Content Body */}
            <div className="px-8 py-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-10">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-copper/20">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-copper shadow-[0_0_10px_rgba(179,107,57,0.5)]"></div>
                    <h3 className="text-xs font-mono font-bold text-copper tracking-[0.2em] uppercase mb-3">
                      {section.subtitle}
                    </h3>
                    <p className="text-slate-light/70 font-light leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Signature / Footer */}
              <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between opacity-40">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Valdés_Legal_Dept</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest">v1.0_2026</span>
              </div>
            </div>

            {/* Background Sigil Watermark */}
            <div className="absolute bottom-[-10%] right-[-10%] pointer-events-none opacity-[0.02] rotate-12">
              <Anchor className="w-64 h-64 text-white" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
