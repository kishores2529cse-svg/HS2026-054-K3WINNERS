import React, { useState } from 'react';
import {
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function CategoryBreakdownChart() {
  const [selectedCat, setSelectedCat] = useState('Sanitation');

  const categories = [
    {
      id: 'Sanitation',
      name: 'Sanitation & Solid Waste',
      count: 480,
      percentage: 33.8,
      resolved: 440,
      pending: 40,
      sla: '96%',
      avgTime: '2.4h',
      trend: '+12%',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      topWard: 'Ward 14 (Central Market)',
      aiNote: 'Garbage dump clearance speed increased by 38% after smart bin sensor rollout.',
    },
    {
      id: 'Roads',
      name: 'PWD & Road Infrastructure',
      count: 420,
      percentage: 29.6,
      resolved: 330,
      pending: 90,
      sla: '88%',
      avgTime: '5.1h',
      trend: '+24%',
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      topWard: 'Ward 22 (Outer Ring Rd)',
      aiNote: 'Monsoon pothole cluster alerts detected along 8.2 km arterial road corridors.',
    },
    {
      id: 'Electrical',
      name: 'Electrical & Street Lighting',
      count: 310,
      percentage: 21.8,
      resolved: 280,
      pending: 30,
      sla: '92%',
      avgTime: '3.1h',
      trend: '-6%',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      topWard: 'Ward 03 (Commercial St)',
      aiNote: '92% of dark spot complaints resolved within 4 hours via automated circuit triage.',
    },
    {
      id: 'Water',
      name: 'Water Supply & Drainage',
      count: 210,
      percentage: 14.8,
      resolved: 130,
      pending: 80,
      sla: '74%',
      avgTime: '7.8h',
      trend: '+35%',
      color: 'bg-sky-500',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      topWard: 'Ward 08 (Lakeview Corridor)',
      aiNote: 'High pipe burst rate identified in aging underground mains across Ward 8.',
    },
  ];

  const activeCategory = categories.find((c) => c.id === selectedCat) || categories[0];
  const totalComplaints = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <Card
      title="Complaint Category Distribution & Velocity"
      subtitle="Breakdown of 1,420 city tickets across civic domains and resolution timelines"
      headerIcon={BarChart3}
    >
      <div className="space-y-6">
        
        {/* Multi-segment Combined Distribution Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              Volume Proportion Share
            </span>
            <span className="text-[11px] text-slate-500">100% Normalized</span>
          </div>

          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner p-0.5 gap-0.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                title={`${cat.name}: ${cat.percentage}% (${cat.count} complaints)`}
                className={`${cat.color} h-full rounded-xs transition-all duration-300 hover:brightness-110 cursor-pointer`}
                style={{ width: `${cat.percentage}%` }}
              />
            ))}
          </div>

          {/* Legend Items */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all cursor-pointer ${
                  selectedCat === cat.id ? 'bg-slate-100 font-bold text-slate-900 ring-1 ring-slate-300' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span>{cat.id}</span>
                <span className="text-slate-400 font-mono">({cat.percentage}%)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Category Progress Bars Grid */}
        <div className="space-y-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            const resPct = Math.round((cat.resolved / cat.count) * 100);
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-purple-300 bg-purple-50/40 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span className="font-bold text-slate-900">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{cat.count}</span>
                    <span className="text-slate-400 text-[11px]">tickets</span>
                    <Badge variant={cat.trend.startsWith('+') ? 'warning' : 'success'} size="sm">
                      {cat.trend}
                    </Badge>
                  </div>
                </div>

                {/* Progress bar representing resolved vs total */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${resPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>{cat.resolved} Resolved • {cat.pending} Pending</span>
                  <span className="font-semibold text-slate-700">SLA: {cat.sla} (Avg {cat.avgTime})</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Category Insight Banner for Selected Category */}
        <div className={`p-3.5 rounded-xl border ${activeCategory.borderColor} ${activeCategory.bgColor} text-xs space-y-1`}>
          <div className="flex items-center justify-between">
            <span className={`font-bold ${activeCategory.textColor} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5" />
              {activeCategory.name} Intelligence
            </span>
            <span className="text-[11px] text-slate-600">
              Highest Density: <strong>{activeCategory.topWard}</strong>
            </span>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed">
            {activeCategory.aiNote}
          </p>
        </div>

      </div>
    </Card>
  );
}
