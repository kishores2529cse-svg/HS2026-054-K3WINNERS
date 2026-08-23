import {
  ClipboardList,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function OfficerStats({
  complaints = [],
  activeFilter,
  onSelectFilter,
}) {
  // Compute dynamic stats based on complaints array + baseline stats
  const totalCount = complaints.length >= 8 ? complaints.length + 20 : 28;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length + 3;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length + 11;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length + 6;
  const highPriorityCount = complaints.filter((c) => c.priority === 'High' && c.status !== 'Resolved').length + 2;

  const stats = [
    {
      id: 'all',
      label: 'Total Assigned Complaints',
      value: totalCount,
      subtext: 'Ward 14 Zonal Queue',
      icon: ClipboardList,
      color: 'text-slate-900',
      bg: 'bg-slate-100',
      borderColor: 'hover:border-slate-400',
      activeBorder: 'border-slate-900 ring-2 ring-slate-900/10',
      badge: 'All Active',
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'Pending',
      label: 'Pending Verification',
      value: pendingCount,
      subtext: 'Requires Site Inspection',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderColor: 'hover:border-amber-400',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20',
      badge: 'Needs Action',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'In Progress',
      label: 'Work In Progress',
      value: inProgressCount,
      subtext: 'Field Crew Deployed',
      icon: RefreshCw,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      borderColor: 'hover:border-sky-400',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/20',
      badge: 'Active Work',
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      id: 'Resolved',
      label: 'Resolved Today',
      value: resolvedCount,
      subtext: 'Verified with Geo-Proof',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-400',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20',
      badge: '+94.2% SLA',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'High Priority',
      label: 'High Priority Urgency',
      value: highPriorityCount,
      subtext: 'AI Urgency Score ≥ 85',
      icon: AlertTriangle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      borderColor: 'hover:border-rose-400',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20',
      badge: 'Immediate SLA',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isSelected = activeFilter === stat.id;
          return (
            <button
              key={stat.id}
              onClick={() => onSelectFilter?.(stat.id)}
              className={`text-left p-4 rounded-xl bg-white border transition-all duration-200 shadow-2xs group relative overflow-hidden ${
                isSelected
                  ? stat.activeBorder
                  : `border-slate-200/90 ${stat.borderColor} hover:shadow-md`
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${stat.bg}`} />

              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <div className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 line-clamp-1">
                {stat.subtext}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
