import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GarbageSmokeEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded text-[10px] font-mono text-red-400">
        <AlertTriangle className="w-3 h-3 text-red-500" />
        <span>TOXIC DUMP</span>
      </div>
      <div className="relative w-full flex-1 flex flex-col items-center justify-end pb-2">
        <div className="absolute top-3 w-16 h-16 flex justify-center">
          <div className="w-6 h-6 rounded-full bg-slate-600/30 blur-md animate-smoke-rise" />
          <div className="w-8 h-8 rounded-full bg-slate-500/20 blur-md animate-smoke-rise" style={{ animationDelay: '0.7s' }} />
          <div className="w-5 h-5 rounded-full bg-stone-500/25 blur-sm animate-smoke-rise" style={{ animationDelay: '1.2s' }} />
        </div>
        <div className="relative z-10 flex items-end justify-center gap-1">
          <div className="w-8 h-7 bg-amber-950 border border-amber-900 rounded-t-md" />
          <div className="w-10 h-10 bg-stone-900 border border-stone-800 rounded-t-lg -ml-2" />
          <div className="w-7 h-6 bg-slate-900 border border-slate-800 rounded-t-sm -ml-2" />
        </div>
      </div>
      <div className="relative z-10 w-full text-center">
        <span className="text-[10px] font-mono text-slate-400">UNCOLLECTED WASTE & FUMES</span>
      </div>
    </div>
  );
}
