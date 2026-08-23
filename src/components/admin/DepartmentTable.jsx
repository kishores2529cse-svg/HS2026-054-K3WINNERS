import React, { useState } from 'react';
import {
  Building2,
  Users,
  Search,
  Filter,
  UserPlus,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function DepartmentTable({
  departments,
  onOpenAllocateModal,
  onDepartmentSelect,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSLA, setFilterSLA] = useState('all');

  const filteredDepts = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    const slaNum = parseInt(dept.sla, 10);
    if (filterSLA === 'high') return matchesSearch && slaNum >= 90;
    if (filterSLA === 'medium') return matchesSearch && slaNum >= 80 && slaNum < 90;
    if (filterSLA === 'low') return matchesSearch && slaNum < 80;
    return matchesSearch;
  });

  const getSlaBadgeVariant = (slaStr) => {
    const val = parseInt(slaStr, 10);
    if (val >= 90) return 'success';
    if (val >= 80) return 'warning';
    return 'danger';
  };

  const getSlaColor = (slaStr) => {
    const val = parseInt(slaStr, 10);
    if (val >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (val >= 80) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getProgressBarColor = (slaStr) => {
    const val = parseInt(slaStr, 10);
    if (val >= 90) return 'bg-emerald-500';
    if (val >= 80) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <Card
      title="Department Management & SLA Performance"
      subtitle="Real-time municipal workload distribution, SLA compliance indices, and officer workforce allocation."
      headerIcon={Building2}
      action={
        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onClick={() => onOpenAllocateModal(null)}
          className="bg-purple-700 hover:bg-purple-800 focus:ring-purple-500 text-white"
        >
          Assign / Allocate Officers
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search departments or leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">SLA Benchmark:</span>
            {[
              { id: 'all', label: 'All Depts' },
              { id: 'high', label: '≥ 90% SLA' },
              { id: 'medium', label: '80% - 89%' },
              { id: 'low', label: '< 80% (Warning)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterSLA(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterSLA === f.id
                    ? 'bg-purple-100 text-purple-900 font-bold border border-purple-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Department Name</th>
                <th className="py-3.5 px-4 text-center">Total Complaints</th>
                <th className="py-3.5 px-4 text-center">Resolved Count</th>
                <th className="py-3.5 px-4 text-center">Active Officers</th>
                <th className="py-3.5 px-4">SLA Resolution Score %</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredDepts.length > 0 ? (
                filteredDepts.map((dept) => {
                  const resolutionPct = Math.round((dept.resolved / dept.total) * 100);
                  const slaVal = parseInt(dept.sla, 10);
                  return (
                    <tr
                      key={dept.id}
                      className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                      onClick={() => onDepartmentSelect?.(dept)}
                    >
                      {/* Department Name + Lead */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${dept.iconBg || 'bg-purple-50 text-purple-700'}`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                              {dept.name}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                              <span>Lead: <strong>{dept.leadOfficer}</strong></span>
                              <span>•</span>
                              <span>Avg: <strong>{dept.avgResponse}</strong></span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Total Complaints */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 font-mono text-xs">
                          {dept.total}
                        </span>
                      </td>

                      {/* Resolved Count */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-emerald-700 font-mono">
                            {dept.resolved}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-medium">
                            ({resolutionPct}%)
                          </span>
                        </div>
                      </td>

                      {/* Active Officers */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-bold">
                          <Users className="w-3.5 h-3.5 text-purple-600" />
                          <span>{dept.officers}</span>
                        </div>
                      </td>

                      {/* SLA Resolution Score % */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5 min-w-[140px]">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-xs border ${getSlaColor(dept.sla)}`}>
                              {dept.sla}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              Target: 85%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(dept.sla)}`}
                              style={{ width: `${Math.min(slaVal, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={UserPlus}
                          onClick={() => onOpenAllocateModal(dept)}
                          className="hover:border-purple-300 hover:text-purple-700 text-xs py-1 px-2.5"
                        >
                          Assign Officers
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    No municipal departments match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Summary Footer Bar */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Overall Municipal SLA Index: <strong className="text-slate-900">89.5%</strong> (Compliant with Urban Governance Standard 2026)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Total Deployed Officers: <strong className="text-slate-900">{departments.reduce((acc, d) => acc + d.officers, 0)}</strong></span>
            <span>Total Active Tickets: <strong className="text-amber-700">{departments.reduce((acc, d) => acc + (d.total - d.resolved), 0)}</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
}
