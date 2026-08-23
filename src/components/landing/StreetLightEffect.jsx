import React from 'react';

export default function StreetLightEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 right-3 flex items-center gap-1 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-mono text-red-400">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span>FAULTY LIGHT</span>
      </div>
      <div className="relative z-10 mt-1 flex flex-col items-center">
        <div className="w-8 h-3 bg-slate-700 rounded-t-full border border-slate-600 shadow-md" />
        <div className="w-12 h-1 bg-amber-400/90 rounded-full shadow-[0_0_12px_#f59e0b] animate-irregular-flicker group-hover:brightness-125" />
      </div>
      <div className="absolute top-6 w-0 h-0 border-l-[45px] border-r-[45px] border-b-[110px] border-l-transparent border-r-transparent border-b-amber-400/15 pointer-events-none animate-irregular-flicker group-hover:border-b-amber-400/30 group-hover:scale-105 transition-all duration-300" />
      <div className="w-1.5 h-20 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-full z-10 shadow-inner" />
      <div className="relative z-10 w-full h-8 bg-slate-900/90 border-t border-slate-800 rounded-b-lg flex items-center justify-center overflow-hidden">
        <div className="w-24 h-5 rounded-full bg-amber-400/25 blur-sm animate-irregular-flicker group-hover:bg-amber-400/40" />
        <span className="absolute text-[10px] font-mono text-slate-400 font-medium">DARK SECTOR ROAD</span>
      </div>
    </div>
  );
}
