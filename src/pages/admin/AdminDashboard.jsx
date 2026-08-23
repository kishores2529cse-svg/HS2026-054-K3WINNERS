import React from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Users,
  Map,
  Cpu,
  BarChart3,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total City Complaints', value: '1,420', icon: FileText, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Resolved Tickets', value: '1,180', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Action', value: '240', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'High Priority Hotspots', value: '18', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const departmentOverview = [
    { name: 'Sanitation & Waste Management', total: 480, resolved: 440, officers: 24, sla: '96%' },
    { name: 'Public Works & Roads (PWD)', total: 420, resolved: 330, officers: 18, sla: '88%' },
    { name: 'Electrical & Street Lighting', total: 310, resolved: 280, officers: 12, sla: '92%' },
    { name: 'Water Supply & Sewage Board', total: 210, resolved: 130, officers: 15, sla: '74%' },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <PageHeader
        title="Admin Governance Center"
        description="Municipal administration overview, department performance, complaint hotspot heatmaps, and AI intelligence."
        badge={<Badge variant="purple">Admin Portal (Kanishk)</Badge>}
        action={
          <Button variant="secondary" size="sm" icon={ShieldCheck}>
            Kanishk's Module Base
          </Button>
        }
      />

      {/* DEVELOPER NOTICE BANNER */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3 text-purple-900 text-xs">
        <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Admin Module Workspace Foundation:</strong>
          <p className="mt-0.5 text-purple-800">
            This dashboard layout foundation is configured for <strong>Kanishk</strong> to implement municipal analytics, officer management tables, department allocation, and GIS hotspot tracking.
          </p>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${stat.color}`}>{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* PLACEHOLDERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DEPARTMENT PERFORMANCE TABLE PLACEHOLDER */}
        <div className="lg:col-span-8 space-y-6">
          <Card title="Department Management & SLA Performance" headerIcon={Building2}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Department Name</th>
                    <th className="py-3 px-4">Total Issues</th>
                    <th className="py-3 px-4">Resolved</th>
                    <th className="py-3 px-4">Officers</th>
                    <th className="py-3 px-4">SLA Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departmentOverview.map((dept, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-slate-900">{dept.name}</td>
                      <td className="py-3 px-4">{dept.total}</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold">{dept.resolved}</td>
                      <td className="py-3 px-4">{dept.officers}</td>
                      <td className="py-3 px-4 font-mono font-bold text-purple-700">{dept.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* HOTSPOT MAP PLACEHOLDER */}
          <Card title="City Hotspot & GIS Heatmap Placeholder" headerIcon={Map}>
            <div className="bg-slate-900 text-white rounded-xl p-10 text-center space-y-3 border border-slate-800">
              <Map className="w-10 h-10 text-purple-400 mx-auto" />
              <h4 className="text-base font-bold">Zonal Complaint Hotspot Heatmap</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Leaflet / Recharts analytical map container for visual ward-level hotspot analysis. Reserved for Kanishk's implementation.
              </p>
            </div>
          </Card>
        </div>

        {/* AI INSIGHTS & OFFICER MGMT PLACEHOLDERS */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="AI Governance Insights" headerIcon={Cpu}>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-purple-50 text-purple-950 rounded-xl border border-purple-200 space-y-1">
                <strong className="font-bold">AI Pattern Alert:</strong>
                <p>Water pipe leaks spiking by +35% in Ward 8 over the past 48 hours. Inspection recommended.</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 space-y-1">
                <strong className="font-bold">SLA Optimization:</strong>
                <p>Sanitation auto-dispatch reduced response time from 12h to 3.2h across Ward 14.</p>
              </div>
            </div>
          </Card>

          <Card title="Officer Roster Placeholder" headerIcon={Users}>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto" />
              <div className="text-xs font-bold text-slate-800">Officer Workload & Attendance</div>
              <p className="text-[11px] text-slate-500">
                Detailed officer roster management tables and performance tracking widgets will be integrated here.
              </p>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
