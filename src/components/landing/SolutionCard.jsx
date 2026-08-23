import React from 'react';
import { ShieldCheck, UserCheck, BarChart3, CheckCircle2 } from 'lucide-react';

export default function SolutionCard({ role, title, description }) {
  const getRoleConfig = () => {
    switch (role) {
      case 'citizen':
        return {
          icon: UserCheck,
          badge: 'Citizen App UI',
          previewTitle: 'Reported Issue #8492',
          status: 'Submitted via GPS',
          borderColor: 'border-emerald-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
        };
      case 'officer':
        return {
          icon: ShieldCheck,
          badge: 'Officer Portal',
          previewTitle: 'AI Smart Dispatch',
          status: 'Routed to Zone 4 Team',
          borderColor: 'border-teal-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(20,184,166,0.3)]',
        };
      case 'admin':
        return {
          icon: BarChart3,
          badge: 'Admin Dashboard',
          previewTitle: 'Live City Heatmap',
          status: 'Resolution Rate: 98.4%',
          borderColor: 'border-emerald-400/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]',
        };
      default:
        return {
          icon: UserCheck,
          badge: 'Solution',
          previewTitle: 'Smart Resolution',
          status: 'Active',
          borderColor: 'border-emerald-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
        };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  return (
    <div className={`relative bg-slate-900/90 backdrop-blur-md border ${config.borderColor} rounded-2xl p-4 flex flex-col justify-between space-y-3 ${config.glow} transition-all duration-300 group cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/60">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black tracking-wider text-emerald-400 font-mono">
            {title}
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded-full">
          {config.badge}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {description}
      </p>

      <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-2.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-200 font-bold">{config.previewTitle}</span>
        </div>
        <span className="text-emerald-400 text-[10px]">{config.status}</span>
      </div>
    </div>
  );
}
