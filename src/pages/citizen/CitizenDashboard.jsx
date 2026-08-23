import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  FileText,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Filter,
  Search,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import StatusBadge from '../../components/common/StatusBadge';
import PageHeader from '../../components/common/PageHeader';

// Structured dummy data that can easily be replaced by API calls in the future
export const MOCK_CITIZEN_COMPLAINTS = [
  {
    id: 'CC-9041',
    title: 'Overflowing Garbage Bin on 4th Cross Road',
    category: 'Garbage & Waste',
    description: 'The municipal bin has been overflowing for 2 days. Bad odor spreading near residential homes.',
    location: '4th Cross, Ward 14, Indiranagar',
    status: 'In Progress',
    urgency: 'Medium',
    date: '2026-08-22',
    officer: 'S. Ramesh (Sanitation Inspector)',
    updatesCount: 2,
    priorityScore: 78,
  },
  {
    id: 'CC-8920',
    title: 'Dangerous Pothole on Main Arterial Road',
    category: 'Road Infrastructure',
    description: 'Deep pothole causing traffic slowdowns and bike hazards near the metro station exit.',
    location: 'MG Road, Opposite Metro Gate 2',
    status: 'Pending',
    urgency: 'High',
    date: '2026-08-23',
    officer: 'Unassigned (AI Routing to PWD)',
    updatesCount: 1,
    priorityScore: 92,
  },
  {
    id: 'CC-8755',
    title: 'Non-Functional Streetlight near Community Park',
    category: 'Electrical & Lighting',
    description: 'Streetlight pole #42 is dark since last weekend. Safety concern for evening walkers.',
    location: '12th Main Road, Sector 3',
    status: 'Resolved',
    urgency: 'Low',
    date: '2026-08-19',
    officer: 'V. Prakash (Electrical Dept)',
    updatesCount: 4,
    priorityScore: 45,
  },
  {
    id: 'CC-8610',
    title: 'Water Pipe Leakage at Apartment Gate',
    category: 'Water Supply & Sewage',
    description: 'Clean water gushing out onto road from underground pipe break.',
    location: 'Lakeview Avenue, Ward 8',
    status: 'Resolved',
    urgency: 'High',
    date: '2026-08-15',
    officer: 'K. Balan (Water Board)',
    updatesCount: 3,
    priorityScore: 89,
  },
];

export default function CitizenDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const stats = [
    { label: 'Total Complaints', value: MOCK_CITIZEN_COMPLAINTS.length, icon: FileText, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Pending Action', value: MOCK_CITIZEN_COMPLAINTS.filter(c => c.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'In Progress', value: MOCK_CITIZEN_COMPLAINTS.filter(c => c.status === 'In Progress').length, icon: RefreshCw, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Resolved', value: MOCK_CITIZEN_COMPLAINTS.filter(c => c.status === 'Resolved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const filteredComplaints = MOCK_CITIZEN_COMPLAINTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* PAGE HEADER */}
      <PageHeader
        title="Citizen Overview"
        description="Track your reported civic complaints, monitor resolution progress, or file new neighborhood issues."
        action={
          <Link to="/citizen/report">
            <Button variant="primary" size="md" icon={PlusCircle}>
              Report New Issue
            </Button>
          </Link>
        }
      />

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

      {/* QUICK REPORT ACTION BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
            <Sparkles className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-bold text-base">Spotted a pothole, broken light, or garbage build-up?</h3>
            <p className="text-xs text-emerald-100 mt-0.5">Submit with photo & auto-GPS location. Our AI dispatches it to officials immediately.</p>
          </div>
        </div>
        <Link to="/citizen/report" className="shrink-0">
          <Button variant="primary" size="sm" className="bg-white text-emerald-800 hover:bg-emerald-50">
            File Report Now
          </Button>
        </Link>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECENT COMPLAINTS TABLE / LIST */}
        <div className="lg:col-span-8 space-y-4">
          <Card
            title="My Submitted Complaints"
            subtitle="Live status updates from zonal field officers"
            action={
              <Link to="/citizen/complaints" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 text-xs">
                <span className="text-slate-500 font-semibold px-2">Status:</span>
                {['All', 'Pending', 'In Progress', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-1 rounded-md font-medium text-[11px] transition-colors ${
                      statusFilter === st ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Complaints list */}
            <div className="space-y-3">
              {filteredComplaints.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No complaints found matching filter criteria.
                </div>
              ) : (
                filteredComplaints.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all bg-white hover:bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-bold text-slate-500">{item.id}</span>
                          <Badge variant="outline" size="sm">{item.category}</Badge>
                          {item.urgency === 'High' && <Badge variant="danger" size="sm">Urgent</Badge>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      </div>
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>Date: <strong>{item.date}</strong></span>
                        <Link
                          to={`/citizen/complaints/${item.id}`}
                          className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                        >
                          Details <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* SIDEBAR NEARBY ISSUES / STATUS SUMMARY */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Breakdown Card */}
          <Card title="Resolution Summary">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Active Pipeline</span>
                <span className="font-bold text-slate-900">2 Complaints</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 w-1/4" title="Pending" />
                <div className="bg-sky-500 w-1/4" title="In Progress" />
                <div className="bg-emerald-500 w-2/4" title="Resolved" />
              </div>
              <div className="grid grid-cols-3 text-[11px] text-center pt-1 text-slate-500">
                <div><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />Pending (25%)</div>
                <div><span className="inline-block w-2 h-2 rounded-full bg-sky-500 mr-1" />Progress (25%)</div>
                <div><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />Done (50%)</div>
              </div>
            </div>
          </Card>

          {/* Nearby Neighborhood Hotspot Placeholder Card */}
          <Card
            title="Nearby Issues Placeholder"
            subtitle="Sector 4 & Ward 14 activity"
            headerIcon={MapPin}
          >
            <div className="space-y-3">
              <div className="bg-slate-900 text-white rounded-xl p-4 text-center space-y-2 relative overflow-hidden">
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Live Ward Heatmap
                </div>
                <div className="text-2xl font-black font-mono">14 Active Reports</div>
                <p className="text-[11px] text-slate-400">
                  Interactive GIS location mapping will load here when Leaflet API connects.
                </p>
                <div className="pt-2">
                  <Badge variant="warning" size="sm">Main Street Potholes Hotspot</Badge>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Citizens in your zone have submitted reports for Sanitation (45%) and Streetlights (35%).
              </p>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
