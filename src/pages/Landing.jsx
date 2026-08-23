import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  PlusCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Camera,
  ArrowRight,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Building2,
  Users,
  ShieldCheck,
  Cpu,
  BarChart3,
  Search,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusBadge from '../components/common/StatusBadge';

export default function Landing() {
  const [activeRoleTab, setActiveRoleTab] = useState('citizen');

  const stats = [
    { label: 'Issues Resolved', value: '14,850+', icon: CheckCircle2, change: '+12% this month' },
    { label: 'Avg Resolution Time', value: '4.8 Hours', icon: Clock, change: '65% faster with AI' },
    { label: 'Citizen Satisfaction', value: '98.4%', icon: TrendingUp, change: 'Based on 8k+ reviews' },
    { label: 'Active Departments', value: '18+', icon: Building2, change: 'Across city sectors' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Report Issue',
      desc: 'Citizens submit issue photos, description, and auto geo-tagged GPS location.',
      icon: Camera,
      badge: 'Citizen Action',
    },
    {
      step: '02',
      title: 'AI Classification & Priority',
      desc: 'AI detects complaint category, identifies duplicate reports, and sets urgency tier.',
      icon: Cpu,
      badge: 'AI Engine',
    },
    {
      step: '03',
      title: 'Department & Officer Routing',
      desc: 'System automatically dispatches task to the appropriate zonal field officer.',
      icon: Users,
      badge: 'Auto Dispatch',
    },
    {
      step: '04',
      title: 'Real-time Resolution Tracking',
      desc: 'Officers update status with proof of work. Citizens get instant SMS/web notifications.',
      icon: FileCheck,
      badge: 'Resolution',
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Categorization',
      desc: 'Smart algorithms automatically classify complaints into Garbage, Potholes, Water, or Electrical categories.',
    },
    {
      icon: MapPin,
      title: 'Geo-Tagged Precise Location',
      desc: 'Pinpoint exact coordinates of civic issues on live maps so maintenance teams find them instantly.',
    },
    {
      icon: AlertTriangle,
      title: 'Intelligent Priority Scoring',
      desc: 'High-risk hazards like open manholes or water mains get escalated instantly for fast intervention.',
    },
    {
      icon: Search,
      title: 'Duplicate Detection',
      desc: 'Prevents redundant tickets by grouping multiple citizen reports of the same physical location issue.',
    },
    {
      icon: Clock,
      title: 'Live Tracking Timeline',
      desc: 'Transparent progress updates from pending to verification, assignment, work-in-progress, and closure.',
    },
    {
      icon: BarChart3,
      title: 'Zonal Hotspot Analytics',
      desc: 'Empowers municipal admins to spot high-density problem zones and allocate resources proactively.',
    },
  ];

  return (
    <div className="space-y-20 pb-16 bg-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-8 overflow-hidden bg-white">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-50/70 to-transparent -z-10 rounded-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
                <span>Next-Gen Civic Governance Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Report. Track. <br />
                <span className="bg-gradient-to-r from-rose-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
                  Resolve.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                One smart platform to report civic issues, connect them to the right department, and track resolution from start to finish. Powered by AI for faster response and total transparency.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/citizen/report">
                  <Button variant="primary" size="lg" icon={PlusCircle} className="px-7 py-3 shadow-md shadow-rose-600/25">
                    Report an Issue
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" icon={ArrowRight} iconPosition="right" className="px-7 py-3">
                    Explore Platform
                  </Button>
                </Link>
              </div>

              {/* Quick indicators */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>No login needed to explore</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Instant SMS/Email alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Geo-tagged verification</span>
                </div>
              </div>
            </div>

            {/* Right Visual Interactive Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live Ticket Preview #CC-8492
                    </span>
                  </div>
                  <Badge variant="danger" size="sm">High Priority</Badge>
                </div>

                {/* Simulated Complaint Visual */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 relative overflow-hidden border border-slate-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-rose-400 font-bold tracking-wider mb-1">
                        Category: Road Infrastructure
                      </div>
                      <h4 className="font-semibold text-sm text-white">Large Pothole near Main Market Crossing</h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" /> Sector 4, MG Road, Ward 12
                      </p>
                    </div>
                    <StatusBadge status="In Progress" size="sm" />
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>AI Priority Rating: <strong>88/100</strong></span>
                    <span>Officer Assigned: <strong>R. Kumar (Public Works)</strong></span>
                  </div>
                </div>

                {/* Simulated AI Analysis Box */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-rose-950">
                  <Cpu className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">AI Routing Engine:</strong>
                    <p className="text-rose-800 mt-0.5">
                      Categorized as Public Safety Hazard. Auto-dispatched to PWD Road Maintenance Dept. Duplicate checks passed (0 duplicate tickets found).
                    </p>
                  </div>
                </div>

                {/* Progress Step */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Resolution Workflow</span>
                    <span className="text-rose-600 font-bold">Step 3 of 4</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-rose-600 h-2 rounded-full w-3/4 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WORKFLOW BY ROLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary" size="md">Multi-Role Architecture</Badge>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Tailored Experiences for Every Stakeholder
          </h2>
        </div>

        {/* Role Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveRoleTab('citizen')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeRoleTab === 'citizen'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Citizen Workflow
          </button>
          <button
            onClick={() => setActiveRoleTab('officer')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeRoleTab === 'officer'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Officer Dashboard
          </button>
          <button
            onClick={() => setActiveRoleTab('admin')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeRoleTab === 'admin'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin Governance
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          {activeRoleTab === 'citizen' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="primary" size="sm">Lead: Kishore S</Badge>
                <h3 className="text-xl font-bold text-slate-900">Seamless Citizen Reporting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Citizens can report issues in under 60 seconds. Simply snap a photo, add brief details, select location on map, and track live status.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" /> Photo upload with location auto-tagging
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" /> Live complaint tracker with stage timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" /> Transparent officer details & completion proof
                  </li>
                </ul>
                <Link to="/citizen/dashboard">
                  <Button variant="primary" size="sm" className="mt-2">
                    Go to Citizen Portal
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>My Active Complaint</span>
                  <StatusBadge status="Pending" size="sm" />
                </div>
                <div className="text-sm font-semibold text-slate-900">Garbage Accumulation on Corner Street</div>
                <div className="text-xs text-slate-500">Reported 2 hours ago • Sanitation Dept</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                  Status: Assigned to Field Inspector. Verification in progress.
                </div>
              </div>
            </div>
          )}

          {activeRoleTab === 'officer' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="info" size="sm">Module: Kalai</Badge>
                <h3 className="text-xl font-bold text-slate-900">Officer Task Command Center</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zonal officers view assigned complaints sorted by AI priority, update status, upload resolution proof photos, and close tickets.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" /> Priority queue ordered by urgency score
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" /> Map view of assigned zonal tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" /> Status update workflow with image upload
                  </li>
                </ul>
                <Link to="/officer/dashboard">
                  <Button variant="secondary" size="sm" className="mt-2">
                    Open Officer Dashboard
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs text-sky-400 font-mono font-bold uppercase">Officer Worklist</div>
                <div className="flex justify-between items-center text-xs">
                  <span>Assigned Complaints: <strong>14</strong></span>
                  <span className="text-amber-400">High Urgency: <strong>3</strong></span>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-semibold text-white">Water Main Leakage - Ward 8</div>
                  <div className="text-slate-400">Assigned 30m ago • Priority Score 94</div>
                </div>
              </div>
            </div>
          )}

          {activeRoleTab === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="purple" size="sm">Module: Kanishk</Badge>
                <h3 className="text-xl font-bold text-slate-900">City Governance & Analytics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Municipal administrators oversee overall city health, department resolution speeds, officer performance, and complaint hotspot heatmaps.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" /> City-wide complaint metrics & SLA tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" /> Department allocation & officer management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" /> AI Insights on frequent hotspot zones
                  </li>
                </ul>
                <Link to="/admin/dashboard">
                  <Button variant="outline" size="sm" className="mt-2">
                    Access Admin Center
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs text-purple-400 font-mono font-bold uppercase">Municipal Intelligence</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-800 rounded-lg">
                    <div className="text-slate-400">Resolution Rate</div>
                    <div className="text-lg font-bold text-emerald-400">94.2%</div>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-lg">
                    <div className="text-slate-400">Active Hotspots</div>
                    <div className="text-lg font-bold text-amber-400">4 Zones</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary" size="md">Transparent Process</Badge>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            How CivicConnect Works
          </h2>
          <p className="text-slate-600 text-sm">
            From citizen photo upload to field verification and final fix — designed for speed and accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card key={idx} hoverEffect className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 font-mono">{step.step}</span>
                    <Badge variant="primary" size="sm">{step.badge}</Badge>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="primary" size="md">Smart Features</Badge>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Engineered for Modern Smart Cities
            </h2>
            <p className="text-slate-600 text-sm">
              Cutting-edge tools for citizens, department officers, and municipal admins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3 hover:border-rose-300 transition-colors shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shadow-rose-600/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-rose-600 via-rose-600 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-rose-600/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to report a civic issue in your neighborhood?
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm">
              It takes less than a minute. Your report helps city officials fix potholes, streetlights, garbage, and water leaks faster.
            </p>
          </div>
          <div className="flex items-center shrink-0">
            <Link to="/citizen/report">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm sm:text-base bg-white text-rose-700 hover:bg-rose-50 active:scale-95 shadow-lg transition-all duration-150 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>File a Complaint Now</span>
                <ArrowRight className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM STATS */}
      <section className="bg-slate-900 text-white py-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4 space-y-2">
                  <div className="inline-flex p-2.5 bg-slate-800 rounded-xl text-rose-400 mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-300">{stat.label}</div>
                  <div className="text-xs text-rose-400 font-bold">{stat.change}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
