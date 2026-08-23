import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function OpenManholeEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-mono text-red-400">
        <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />
        <span>OPEN PIT</span>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-28 h-14 bg-black rounded-[50%] border-4 border-slate-700 flex items-center justify-center overflow-hidden animate-hazard-pulse">
          <div className="absolute inset-1 bg-red-950/90 rounded-[50%] border border-red-600/60 shadow-[inset_0_0_15px_#ef4444]" />
          <div className="w-10 h-10 rounded-full bg-slate-400/20 blur-md animate-manhole-steam" />
          <div className="w-8 h-8 rounded-full bg-red-500/20 blur-sm animate-manhole-steam" style={{ animationDelay: '0.8s' }} />
        </div>
      </div>
      <div className="relative z-10 w-full text-center">
        <span className="text-[10px] font-mono text-slate-400">UNCOVERED DRAINAGE HAZARD</span>
      </div>
    </div>
  );
}
