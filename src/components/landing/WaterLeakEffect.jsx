import React from 'react';

export default function WaterLeakEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 left-2 z-20 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-mono text-red-400">
        BURST PIPE
      </div>
      <div className="relative w-full flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded border border-slate-500 relative flex items-center justify-center">
          <div className="w-3 h-3 bg-red-600/80 rounded-full animate-ping border border-red-400" />
        </div>
        <div className="relative w-full flex justify-center h-16 overflow-hidden">
          <div className="w-2 bg-gradient-to-b from-sky-400 via-cyan-300 to-blue-500 animate-water-stream group-hover:w-3 transition-all opacity-90 shadow-[0_0_10px_#38bdf8]" />
          <div className="absolute top-2 left-1/2 -translate-x-4 w-1.5 h-1.5 rounded-full bg-sky-300 animate-water-splash" />
          <div className="absolute top-4 left-1/2 translate-x-3 w-2 h-2 rounded-full bg-sky-200 animate-water-splash" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-1 w-20 h-4 bg-sky-400/20 rounded-full blur-md animate-mist-expand" />
        </div>
      </div>
      <div className="relative z-10 w-full text-center">
        <span className="text-[10px] font-mono text-slate-400">CONTINUOUS PIPE LEAKAGE</span>
      </div>
    </div>
  );
}
