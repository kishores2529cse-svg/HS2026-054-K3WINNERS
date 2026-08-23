import React from 'react';
import { Camera, AlertCircle } from 'lucide-react';

export default function CctvGlitchEffect() {
  return (
    <div className="relative w-full h-44 bg-slate-950/80 rounded-xl overflow-hidden border border-red-900/40 group flex flex-col items-center justify-between p-3 select-none">
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-red-950/90 border border-red-800/80 px-2 py-0.5 rounded text-[10px] font-mono text-red-400 group-hover:scale-105 transition-transform">
        <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />
        <span>SIGNAL LOST</span>
      </div>
      <div className="relative z-10 mt-3 flex items-center justify-center w-full">
        <div className="relative animate-cctv-vibrate group-hover:animate-cctv-shake">
          <div className="w-16 h-10 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
            <Camera className="w-6 h-6 text-slate-300" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />
          </div>
          <div className="absolute -bottom-2 right-1 w-2 h-2 bg-amber-400 rounded-full animate-electric-spark opacity-80" />
          <div className="absolute -top-1 left-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-electric-spark opacity-90" />
        </div>
      </div>
      <div className="relative z-10 w-full h-14 bg-slate-900/90 rounded-lg border border-slate-800 p-2 flex flex-col justify-center overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>CAM-04 [OFFLINE]</span>
          <span className="text-red-400 font-bold animate-pulse">NO FEED</span>
        </div>
        <div className="w-full h-2 bg-slate-950 rounded mt-1.5 overflow-hidden relative border border-slate-800">
          <div className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
