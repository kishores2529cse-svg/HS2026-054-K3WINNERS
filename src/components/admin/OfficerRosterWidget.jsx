import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  MapPin,
  Shield,
  Phone,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function OfficerRosterWidget({ onOpenAllocateModal }) {
  const [filterDuty, setFilterDuty] = useState('all');

  const officers = [
    {
      id: 'OFF-101',
      name: 'Rajesh Sharma',
      role: 'Sanitation Lead Super',
      dept: 'Sanitation & Waste',
      ward: 'Ward 14 (Indiranagar)',
      status: 'On Field Duty',
      activeTickets: 8,
      resolvedToday: 12,
      badgeVariant: 'warning',
      phone: '+91 98450 11234',
    },
    {
      id: 'OFF-102',
      name: 'Priya Sundaram',
      role: 'Executive Road Eng.',
      dept: 'PWD Road Infra',
      ward: 'Ward 22 (Sector 4)',
      status: 'On Field Duty',
      activeTickets: 11,
      resolvedToday: 7,
      badgeVariant: 'warning',
      phone: '+91 98450 22345',
    },
    {
      id: 'OFF-103',
      name: 'Amit Patel',
      role: 'Senior Grid Inspector',
      dept: 'Electrical & Lighting',
      ward: 'Ward 03 (MG Road)',
      status: 'Available',
      activeTickets: 3,
      resolvedToday: 9,
      badgeVariant: 'success',
      phone: '+91 98450 33456',
    },
    {
      id: 'OFF-104',
      name: 'Dr. Anand Rao',
      role: 'Water Board Division Head',
      dept: 'Water & Sewage Board',
      ward: 'Ward 08 (Lakeview)',
      status: 'Emergency Triage',
      activeTickets: 14,
      resolvedToday: 5,
      badgeVariant: 'danger',
      phone: '+91 98450 44567',
    },
    {
      id: 'OFF-105',
      name: 'Sneha Menon',
      role: 'Field Rapid Inspector',
      dept: 'Sanitation & Waste',
      ward: 'Ward 31 (Whitefield)',
      status: 'Available',
      activeTickets: 4,
      resolvedToday: 11,
      badgeVariant: 'success',
      phone: '+91 98450 55678',
    },
  ];

  const filteredOfficers = officers.filter((off) => {
    if (filterDuty === 'available') return off.status === 'Available';
    if (filterDuty === 'field') return off.status === 'On Field Duty' || off.status === 'Emergency Triage';
    return true;
  });

  return (
    <Card
      title="Field Officer Workload & Deployment Roster"
      subtitle="Live officer status tracking, ward assignments, and real-time operational capacity"
      headerIcon={Users}
      action={
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilterDuty('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                filterDuty === 'all' ? 'bg-white shadow-xs text-purple-900 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({officers.length})
            </button>
            <button
              onClick={() => setFilterDuty('field')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                filterDuty === 'field' ? 'bg-white shadow-xs text-purple-900 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              On Duty
            </button>
            <button
              onClick={() => setFilterDuty('available')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                filterDuty === 'available' ? 'bg-white shadow-xs text-purple-900 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Available
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        {filteredOfficers.map((off) => (
          <div
            key={off.id}
            className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs border border-purple-200 shrink-0">
                {off.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{off.name}</span>
                  <span className="font-mono text-[10px] text-slate-400">({off.id})</span>
                  <Badge variant={off.badgeVariant} size="sm">
                    {off.status}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-700">{off.role}</span>
                  <span>•</span>
                  <span>{off.dept}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-purple-700">
                    <MapPin className="w-3 h-3" /> {off.ward}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <div className="text-right text-[11px]">
                <span className="text-slate-500 block">Queue Load</span>
                <span className="font-bold font-mono text-slate-900">
                  {off.activeTickets} Active <span className="text-emerald-600">({off.resolvedToday} done)</span>
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenAllocateModal?.(null)}
                className="text-xs py-1 px-2.5 hover:border-purple-300 hover:text-purple-700 shrink-0"
              >
                Reassign
              </Button>
            </div>
          </div>
        ))}

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-between">
          <span>Total Municipal Field Cadre: <strong>69 Active Officers</strong></span>
          <span className="text-emerald-700 font-semibold">94.2% Attendance on Shift</span>
        </div>
      </div>
    </Card>
  );
}
