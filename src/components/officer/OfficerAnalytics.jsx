import {
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import Card from '../common/Card';
import { OFFICER_PROFILE } from './officerData';

export default function OfficerAnalytics({ complaints = [] }) {
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;

  const teams = [
    { name: 'Rapid Road Repair Unit 2', dept: 'Roads & PWD', active: 3, status: 'On-Site' },
    { name: 'Water Emergency Squad', dept: 'BWSSB', active: 2, status: 'Dispatched' },
    { name: 'Sanitation Compactor Unit 4', dept: 'Solid Waste', active: 4, status: 'Active' },
    { name: 'BESCOM Line Crew 3', dept: 'Electrical', active: 1, status: 'Standby' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Officer ID & Jurisdiction Badge */}
      <Card padding="sm" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-slate-800">
        <div className="p-2 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 font-bold text-lg shrink-0">
              KS
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white truncate">{OFFICER_PROFILE.name}</h4>
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              </div>
              <p className="text-xs text-sky-300 truncate">{OFFICER_PROFILE.role}</p>
              <span className="font-mono text-[10px] text-slate-400">{OFFICER_PROFILE.badgeNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80 text-xs">
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[10px] block">Assigned Ward</span>
              <span className="font-bold text-slate-100">{OFFICER_PROFILE.ward}</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[10px] block">SLA Compliance</span>
              <span className="font-bold text-emerald-400">{OFFICER_PROFILE.slaCompliance}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* SLA & Resolution Performance */}
      <Card title="SLA Compliance & Speed" headerIcon={TrendingUp}>
        <div className="space-y-4 text-xs">
          
          {/* SLA Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Weekly On-Time SLA</span>
              <span className="text-emerald-700 font-bold">94.2% Passed</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-emerald-600 h-2.5 rounded-full w-[94.2%]" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Target: &gt;90%</span>
              <span>Avg Turnaround: <strong>3.6h</strong></span>
            </div>
          </div>

          {/* Quick Stat Counters */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Pending</span>
              <span className="text-lg font-black text-amber-700">{pendingCount}</span>
            </div>
            <div className="bg-sky-50 p-2 rounded-lg border border-sky-100">
              <span className="text-[10px] font-bold text-sky-800 uppercase block">In Progress</span>
              <span className="text-lg font-black text-sky-700">{inProgressCount}</span>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Resolved</span>
              <span className="text-lg font-black text-emerald-700">{resolvedCount}</span>
            </div>
          </div>

        </div>
      </Card>

      {/* Rapid Field Action Teams */}
      <Card title="Dispatched Field Teams" headerIcon={Users}>
        <div className="space-y-2.5">
          {teams.map((team, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="font-bold text-slate-900 truncate">{team.name}</div>
                <div className="text-[11px] text-slate-500">{team.dept}</div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  {team.status}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">{team.active} tasks assigned</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
