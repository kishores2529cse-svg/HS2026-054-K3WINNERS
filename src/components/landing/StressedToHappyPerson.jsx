import React from 'react';
import { Frown, Smile, AlertCircle, CheckCircle2 } from 'lucide-react';

export function StressedPersonGraphic() {
  return (
    <div className="relative bg-slate-900/90 border border-red-950/80 rounded-xl p-3 flex items-center gap-3 select-none">
      <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center shrink-0">
        <Frown className="w-6 h-6 text-red-500 animate-pulse" />
      </div>
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Frustrated Citizen</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Potholes, darkness, water leaks with no clear reporting path.
        </p>
      </div>
    </div>
  );
}

export function HappyPersonGraphic() {
  return (
    <div className="relative bg-slate-900/90 border border-emerald-950/80 rounded-xl p-3 flex items-center gap-3 select-none">
      <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center shrink-0">
        <Smile className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Empowered Citizen</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Instant submission, live status updates, and resolved city infrastructure.
        </p>
      </div>
    </div>
  );
}
