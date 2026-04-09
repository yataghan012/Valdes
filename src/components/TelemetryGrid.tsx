import React from 'react';

export default function TelemetryGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {[
        { label: 'Vessel Alpha', status: 'En Route', value: '45.2° N, 12.4° W', alert: false },
        { label: 'Trench Probe', status: 'Offline', value: 'ERR_CONNECTION', alert: true },
        { label: 'Coastal Hub', status: 'Active', value: 'Processing', alert: false },
      ].map((item, i) => (
        <div 
          key={i} 
          className="p-8 border border-copper/20 bg-trench/30 backdrop-blur-sm flex flex-col gap-6 relative overflow-hidden group hover:border-copper/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-brand text-white">{item.label}</h3>
            {item.alert ? (
              <span className="text-[10px] font-bold tracking-widest uppercase text-coral bg-coral/10 px-2 py-1 rounded-sm border border-coral/30 animate-pulse">
                {item.status}
              </span>
            ) : (
              <span className="text-[10px] tracking-widest uppercase text-slate-light/50 border border-slate-light/10 px-2 py-1 rounded-sm">
                {item.status}
              </span>
            )}
          </div>
          <div className="font-mono text-sm text-slate-light/70 tracking-wider">
            {item.value}
          </div>
          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-copper/30 group-hover:border-copper transition-colors m-3"></div>
        </div>
      ))}
    </section>
  );
}
