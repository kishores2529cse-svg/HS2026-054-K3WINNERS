import React, { useState } from 'react';
import {
  FileText,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  BarChart2,
  UserCheck,
  Info,
  Filter,
  Search,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import StatusBadge from '../../components/common/StatusBadge';
import PageHeader from '../../components/common/PageHeader';

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState('list');

  const stats = [
    { label: 'Assigned Complaints', value: '28', icon: FileText, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Pending Verification', value: '6', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Work In Progress', value: '14', icon: RefreshCw, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Resolved Today', value: '8', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'High Priority', value: '5', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const dummyAssigned = [
    { id: 'CC-9041', category: 'Sanitation', title: 'Overflowing Bin on 4th Cross', location: 'Indiranagar Ward 14', priority: 'Medium', status: 'In Progress' },
    { id: 'CC-8920', category: 'Road Infrastructure', title: 'Deep Pothole near Metro Station', location: 'MG Road Sector 4', priority: 'High', status: 'Pending' },
    { id: 'CC-8812', category: 'Water Supply', title: 'Underground Pipe Burst', location: 'Lakeview Avenue', priority: 'High', status: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <PageHeader
        title="Officer Command Dashboard"
        description="Zonal field officer task queue, priority inspection dispatch, and resolution verification."
        badge={<Badge variant="info">Officer Portal (Kalai)</Badge>}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={UserCheck}>
              Kalai's Module Base
            </Button>
          </div>
        }
      />

      {/* DEVELOPER NOTICE BANNER */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-3 text-sky-900 text-xs">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Officer Module Workspace Foundation:</strong>
          <p className="mt-0.5 text-sky-800">
            This layout foundation has been configured for <strong>Kalai</strong> to build out full field officer inspection workflows, resolution image uploads, and status management.
          </p>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* MODULE SECTION PLACEHOLDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ASSIGNED COMPLAINT LIST PLACEHOLDER */}
        <div className="lg:col-span-8 space-y-6">
          <Card
            title="Assigned Complaints Queue"
            subtitle="Sorted by AI Priority Score"
            action={
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-2.5 py-1 rounded-md font-medium ${activeTab === 'list' ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-600'}`}
                >
                  List View
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`px-2.5 py-1 rounded-md font-medium ${activeTab === 'map' ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-600'}`}
                >
                  Map View
                </button>
              </div>
            }
          >
            {activeTab === 'list' ? (
              <div className="space-y-3">
                {dummyAssigned.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{item.id}</span>
                        <Badge variant="outline" size="sm">{item.category}</Badge>
                        {item.priority === 'High' && <Badge variant="danger" size="sm">High Priority</Badge>}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-600" /> {item.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <StatusBadge status={item.status} size="sm" />
                      <Button variant="outline" size="sm">
                        Inspect & Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-xl p-12 text-center space-y-3 border border-slate-800">
                <MapPin className="w-10 h-10 text-sky-400 mx-auto" />
                <h4 className="text-base font-bold">Officer GIS Ward Map Placeholder</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Interactive Leaflet map displaying pinned zonal field tasks ready for Kalai's implementation.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* ANALYTICS & RESOLUTION SUMMARY PLACEHOLDER */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Performance Analytics Placeholder" headerIcon={BarChart2}>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Weekly SLA Compliance</span>
                  <span className="text-emerald-600">92.4%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full w-[92.4%]" />
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-2 border border-slate-800">
                <div className="text-xs text-sky-400 font-mono font-bold">Kalai's Component Slot</div>
                <p className="text-[11px] text-slate-400">
                  Resolution rate charts, field team dispatch controls, and image upload verification logic will be placed here.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
