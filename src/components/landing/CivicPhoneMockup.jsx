import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle2, Cpu, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function CivicPhoneMockup() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Submitted', desc: 'Citizen photo & GPS logged', icon: Camera, color: 'text-slate-300' },
    { label: 'AI Classified', desc: 'Category: Water Leakage', icon: Cpu, color: 'text-amber-400' },
    { label: 'Assigned', desc: 'Routed to Zonal Officer', icon: ShieldCheck, color: 'text-teal-400' },
    { label: 'In Progress', desc: 'Repair crew dispatched', icon: MapPin, color: 'text-sky-400' },
    { label: 'Resolved', desc: 'Work verified & closed', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 sm:w-72 bg-slate-900 rounded-[36px] p-3 border-4 border-slate-700 shadow-[0_0_40px_rgba(16,185,129,0.2)] select-none">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
      </div>

      <div className="relative bg-slate-950 rounded-[28px] overflow-hidden p-4 pt-8 space-y-4 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-black tracking-wider text-slate-100 font-mono">CivicConnect</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
            LIVE TRACKER
          </span>
        </div>

        <div className="relative h-28 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
          <div className="relative z-10 text-center space-y-1">
            <MapPin className="w-6 h-6 text-emerald-400 mx-auto animate-bounce" />
            <div className="text-[11px] font-bold text-slate-200">Main St. Water Leak</div>
            <div className="text-[9px] font-mono text-slate-400">GPS: 12.9716° N, 77.5946° E</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Issue Resolution Status</div>
          <div className="space-y-1.5">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;
              return (
                <div
                  key={s.label}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 border-emerald-500/80 scale-[1.02]'
                      : isPast
                      ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                      : 'bg-slate-950/30 border-slate-900 opacity-40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-emerald-500 text-slate-950 font-bold' : isPast ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[10px] font-bold truncate ${isActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {s.label}
                    </div>
                    <div className="text-[8px] text-slate-400 truncate">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
