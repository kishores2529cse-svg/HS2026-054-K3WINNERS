import React from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import Badge from '../common/Badge';

export default function MunicipalMetrics({ timeRange, setTimeRange }) {
  const metricsData = {
    all: {
      total: '1,420',
      totalChange: '+12.4%',
      totalTrend: 'up',
      resolved: '1,180',
      resolvedRate: '83.1%',
      resolvedChange: '+8.6%',
      resolvedTrend: 'up',
      pending: '240',
      pendingChange: '-4.2%',
      pendingTrend: 'down',
      hotspots: '18',
      hotspotCritical: '6 Urgent',
      hotspotChange: '+2 New',
      hotspotTrend: 'up',
    },
    '30d': {
      total: '684',
      totalChange: '+9.1%',
      totalTrend: 'up',
      resolved: '572',
      resolvedRate: '83.6%',
      resolvedChange: '+11.2%',
      resolvedTrend: 'up',
      pending: '112',
      pendingChange: '-6.5%',
      pendingTrend: 'down',
      hotspots: '11',
      hotspotCritical: '3 Urgent',
      hotspotChange: '+1 New',
      hotspotTrend: 'up',
    },
    '7d': {
      total: '184',
      totalChange: '+15.3%',
      totalTrend: 'up',
      resolved: '148',
      resolvedRate: '80.4%',
      resolvedChange: '+14.0%',
      resolvedTrend: 'up',
      pending: '36',
      pendingChange: '+3.1%',
      pendingTrend: 'up',
      hotspots: '5',
      hotspotCritical: '2 Urgent',
      hotspotChange: '+1 New',
      hotspotTrend: 'up',
    },
    '24h': {
      total: '34',
      totalChange: '+5.0%',
      totalTrend: 'up',
      resolved: '26',
      resolvedRate: '76.5%',
      resolvedChange: '+18.2%',
      resolvedTrend: 'up',
      pending: '8',
      pendingChange: '-12.5%',
      pendingTrend: 'down',
      hotspots: '2',
      hotspotCritical: '1 Urgent',
      hotspotChange: '0 New',
      hotspotTrend: 'neutral',
    },
  };

  const current = metricsData[timeRange] || metricsData.all;

  const cards = [
    {
      id: 'total',
      label: 'Total City Complaints',
      value: current.total,
      subtext: `${current.totalChange} vs previous period`,
      subtextColor: 'text-slate-600',
      icon: FileText,
      iconColor: 'text-slate-900',
      iconBg: 'bg-slate-100',
      borderColor: 'hover:border-slate-400',
      accentColor: 'from-slate-700 to-slate-900',
      pill: {
        text: 'City-wide',
        variant: 'default',
      },
    },
    {
      id: 'resolved',
      label: 'Resolved Tickets',
      value: current.resolved,
      subtext: `${current.resolvedRate} Resolution Rate`,
      subtextColor: 'text-emerald-700',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-400',
      accentColor: 'from-emerald-500 to-teal-700',
      pill: {
        text: `${current.resolvedChange} velocity`,
        variant: 'success',
      },
    },
    {
      id: 'pending',
      label: 'Pending Action',
      value: current.pending,
      subtext: 'Active in officer queues',
      subtextColor: 'text-amber-700',
      icon: Clock,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      borderColor: 'hover:border-amber-400',
      accentColor: 'from-amber-500 to-orange-600',
      pill: {
        text: current.pendingChange,
        variant: 'warning',
      },
    },
    {
      id: 'hotspots',
      label: 'Critical Hotspot Zones',
      value: current.hotspots,
      subtext: `${current.hotspotCritical} attention`,
      subtextColor: 'text-rose-700',
      icon: AlertTriangle,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      borderColor: 'hover:border-rose-400',
      accentColor: 'from-rose-500 to-red-700',
      pill: {
        text: current.hotspotChange,
        variant: 'danger',
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Timeframe & Subheader Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span className="font-semibold text-slate-800">Municipal Reporting Interval:</span>
          <span className="text-slate-500">Live synchronized telemetry across all 32 Wards</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          {[
            { id: '24h', label: 'Last 24h' },
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: 'all', label: 'Fiscal YTD' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTimeRange(item.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                timeRange === item.id
                  ? 'bg-white text-purple-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden ${card.borderColor}`}
            >
              {/* Subtle top gradient accent on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor} opacity-80 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                    {card.value}
                  </h3>
                </div>

                <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} shadow-2xs group-hover:scale-105 transition-transform shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`font-semibold ${card.subtextColor}`}>
                  {card.subtext}
                </span>
                <Badge variant={card.pill.variant} size="sm">
                  {card.pill.text}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
