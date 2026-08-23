import React from 'react';

export default function PotholeWaterEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 right-2 z-20 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-mono text-red-400">
        HAZARD CRATER
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-36 h-20 bg-slate-900 rounded-[50%] border-2 border-slate-700 shadow-inner flex items-center justify-center overflow-hidden group-hover:border-red-600/70 transition-colors">
          <div className="absolute inset-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-[50%]" />
          <div className="absolute inset-3 bg-sky-950/70 rounded-[50%] overflow-hidden border border-sky-800/40">
            <div className="absolute inset-0 bg-sky-500/20 animate-pothole-ripple" />
            <div className="absolute inset-1 bg-sky-400/20 animate-pothole-ripple" style={{ animationDelay: '0.6s' }} />
          </div>
          <div className="absolute bottom-4 left-8 w-1.5 h-1.5 rounded-full bg-sky-300 animate-water-splash" />
          <div className="absolute bottom-5 right-10 w-2 h-2 rounded-full bg-sky-200 animate-water-splash" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-4 left-14 w-1 h-1 rounded-full bg-sky-400 animate-water-splash" style={{ animationDelay: '0.8s' }} />
        </div>
      </div>
      <div className="relative z-10 w-full text-center">
        <span className="text-[10px] font-mono text-slate-400">ROAD DAMAGE & STAGNANT WATER</span>
      </div>
    </div>
  );
}
