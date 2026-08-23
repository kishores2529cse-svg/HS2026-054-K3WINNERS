import React, { useState, useRef } from 'react';
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
  User as UserIcon,
  LogIn,
  LogOut,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

import ProblemCard from '../components/landing/ProblemCard';
import SolutionCard from '../components/landing/SolutionCard';
import CivicPhoneMockup from '../components/landing/CivicPhoneMockup';
import InteractiveCursor from '../components/landing/InteractiveCursor';
import { StressedPersonGraphic, HappyPersonGraphic } from '../components/landing/StressedToHappyPerson';

export default function Landing() {
  const containerRef = useRef(null);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('civicconnect_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const problemCardsData = [
    { type: 'potholes', title: 'POTHOLES', subtitle: 'Dangerous road craters & water pools' },
    { type: 'street_lights', title: 'BROKEN STREET LIGHTS', subtitle: 'Dark streets & faulty lighting' },
    { type: 'water_leakage', title: 'WATER LEAKAGE', subtitle: 'Burst pipes & wasted water' },
    { type: 'cctv', title: 'BROKEN CCTV', subtitle: 'Offline cameras & security gaps' },
    { type: 'garbage_dumps', title: 'GARBAGE DUMPS', subtitle: 'Accumulated waste & toxic fumes' },
    { type: 'open_manholes', title: 'OPEN MANHOLES', subtitle: 'Exposed street hazard pits' },
  ];

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
      desc: 'Officers update status with proof of work. Citizens get instant notifications.',
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
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Custom Red -> Green Interactive Mouse Cursor */}
      <InteractiveCursor containerRef={containerRef} />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-950 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-tight text-white font-mono group-hover:text-emerald-400 transition-colors">
                CivicConnect
              </span>
              <span className="text-[9px] font-mono text-emerald-400/80">K3 WINNERS PLATFORM</span>
            </div>
          </Link>

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            
            {user ? (
              /* LOGGED IN: SMALL CIRCLED PROFILE AVATAR IN TOP RIGHT CORNER */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full bg-slate-900 border border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-95"
                  title={`${user.name} (${user.role})`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-400">
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80";
                      }}
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-200 hidden sm:block px-1">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-3.5 space-y-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/60"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-100 truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{user.email}</div>
                        <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md mt-1 border border-emerald-800/60">
                          {user.role} Portal
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Link
                        to={user.role === 'officer' ? '/officer/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/citizen/dashboard'}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/60 transition-colors"
                      >
                        <span>Open Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('civicconnect_user');
                          setUser(null);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <span>Sign Out</span>
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* NOT LOGGED IN: LOG IN BUTTON */
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono bg-slate-900 text-slate-200 border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Log In</span>
                  </button>
                </Link>
                <Link to="/register" className="hidden sm:inline-block">
                  <button
                    type="button"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10" />

      {/* HERO SECTION - CINEMATIC INTERACTIVE DEMO */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* TOP TITLE BANNER */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-300">PROBLEM</span>
            <span className="text-emerald-400">→ AI ACTION →</span>
            <span className="text-emerald-400 font-bold">RESOLUTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            From <span className="text-red-500 underline decoration-red-500/40">Problems</span> to{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
              Progress
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CivicConnect empowers citizens to report, AI to act, and cities to improve — together.
          </p>
        </div>

        {/* CINEMATIC LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* LEFT COLUMN: THE PROBLEM (Red Theme - 4 Cols) */}
          <div className="lg:col-span-4 space-y-5 problem-zone">
            <div className="flex items-center justify-between border-b border-red-950/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h2 className="text-base sm:text-lg font-black tracking-wider text-red-500 uppercase font-mono">
                  THE PROBLEM
                </h2>
              </div>
              <span className="text-[10px] font-mono text-red-400/80">Civic issues go unnoticed</span>
            </div>

            {/* 6 Problem Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {problemCardsData.map((prob) => (
                <ProblemCard key={prob.type} type={prob.type} title={prob.title} subtitle={prob.subtitle} />
              ))}
            </div>

            {/* Stressed Person Storytelling Graphic */}
            <div className="pt-2">
              <StressedPersonGraphic />
            </div>
          </div>

          {/* RIGHT 8 COLUMNS CONTAINER: Center Phone + Right Solution + Wide Horizontal Action Card */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* TOP ROW: Center Phone (4 Cols) + Right Solution (4 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 items-start relative">
              
              {/* SVG Energy Flow Line */}
              <svg className="absolute -inset-10 w-full h-full pointer-events-none hidden lg:block -z-10" viewBox="0 0 400 600">
                <defs>
                  <linearGradient id="redToGreenFlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 200 C 150 180, 250 250, 380 200 M 20 400 C 150 380, 250 450, 380 400"
                  fill="none"
                  stroke="url(#redToGreenFlow)"
                  strokeWidth="2.5"
                  className="animate-energy-flow"
                />
              </svg>

              {/* Center Phone (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
                <CivicPhoneMockup />
              </div>

              {/* Right Solution (4 Cols) */}
              <div className="lg:col-span-4 space-y-4 solution-zone">
                <div className="flex items-center justify-between border-b border-emerald-950/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h2 className="text-base sm:text-lg font-black tracking-wider text-emerald-400 uppercase font-mono">
                      THE SOLUTION
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80">Smart AI Dispatch</span>
                </div>

                <SolutionCard
                  role="citizen"
                  title="FOR CITIZENS"
                  description="Easy Reporting & Total Transparency. Report issues with photos & GPS coordinates."
                />
                <SolutionCard
                  role="officer"
                  title="FOR OFFICERS"
                  description="AI-Powered Smart Dispatch. Classifies issues, removes duplicates, and assigns zonal teams."
                />
                <SolutionCard
                  role="admin"
                  title="FOR ADMINS"
                  description="Actionable City Analytics. Live dashboards, hotspot maps, and resource allocation."
                />

                {/* Happy Person Storytelling Graphic */}
                <div className="pt-2">
                  <HappyPersonGraphic />
                </div>
              </div>

            </div>

            {/* HORIZONTALLY EXPANDED WIDE CTA CARD FILLING ALL RIGHT SIDE EMPTY SPACE */}
            <div className="w-full bg-gradient-to-r from-emerald-950/95 via-teal-900/95 to-slate-900/95 rounded-2xl p-6 border border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-emerald-400 hover:shadow-[0_0_50px_rgba(16,185,129,0.55)] transition-all duration-300 group">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-mono font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>TAKE ACTION TODAY</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono leading-tight">
                  Stronger Communities. <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">Better Tomorrow.</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Together, let us build a cleaner, safer, smarter city. It takes less than a minute to submit a photo & geo-tagged report.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link to="/citizen/report">
                  <button
                    type="button"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 hover:from-emerald-300 hover:to-teal-200 active:scale-95 shadow-xl shadow-emerald-950/80 transition-all duration-200 cursor-pointer group-hover:scale-105"
                  >
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span>Report Now</span>
                    <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM FEATURE INDICATORS STRIP */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <Cpu className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-slate-100">AI Powered</div>
            <div className="text-[10px] text-slate-400">Smart Classification</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <Clock className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-slate-100">Real-time Tracking</div>
            <div className="text-[10px] text-slate-400">Full Transparency</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-slate-100">Faster Resolution</div>
            <div className="text-[10px] text-slate-400">Better Cities</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <BarChart3 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-slate-100">Data Driven</div>
            <div className="text-[10px] text-slate-400">Smarter Decisions</div>
          </div>
        </div>

      </section>

      {/* PLATFORM WORKFLOW STEPS */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="primary" size="md">Transparent Process</Badge>
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">
              How CivicConnect Works
            </h2>
            <p className="text-slate-400 text-sm">
              From citizen photo upload to field verification and final fix — designed for speed and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col justify-between h-full p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-colors shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-700 font-mono">{step.step}</span>
                      <Badge variant="primary" size="sm">{step.badge}</Badge>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/60">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="primary" size="md">Smart Features</Badge>
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">
              Engineered for Modern Smart Cities
            </h2>
            <p className="text-slate-400 text-sm">
              Cutting-edge tools for citizens, department officers, and municipal admins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/60 transition-colors shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM STATS */}
      <section className="bg-slate-900/90 text-white py-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-12 border border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4 space-y-2">
                  <div className="inline-flex p-2.5 bg-slate-800 rounded-xl text-emerald-400 mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-300">{stat.label}</div>
                  <div className="text-xs text-emerald-400 font-bold">{stat.change}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
