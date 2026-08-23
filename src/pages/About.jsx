import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle2,
  Users,
  Target,
  Rocket,
  Building2,
  Cpu,
  ArrowRight,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import PageHeader from '../components/common/PageHeader';

export default function About() {
  const problems = [
    {
      title: 'Communication Bottlenecks',
      desc: 'Citizens struggle with complex municipal office visits, helpline holds, and untracked complaints.',
    },
    {
      title: 'Manual Dispatch Delays',
      desc: 'Routing paper tickets to the wrong department causes days of delay for urgent civic repairs.',
    },
    {
      title: 'Duplicate Reports & Noise',
      desc: 'Dozens of citizens report the same broken road or garbage dump, flooding officer queues.',
    },
    {
      title: 'Lack of Accountability',
      desc: 'Without public live status tracking, citizens lose trust in civic resolution systems.',
    },
  ];

  const AI_capabilities = [
    {
      title: 'Smart Issue Categorization',
      desc: 'Natural language processing and computer vision instantly identify complaint categories.',
    },
    {
      title: 'Automated Priority Matrix',
      desc: 'Safety hazards (open manholes, live wires) receive priority score escalation.',
    },
    {
      title: 'Spatial Duplicate Detection',
      desc: 'Clustering algorithms merge identical location complaints into a single master ticket.',
    },
    {
      title: 'Predictive Hotspot Analytics',
      desc: 'Historical complaint trends help municipal admins deploy preventative maintenance.',
    },
  ];

  const citizenBenefits = [
    'Quick report creation with mobile photo and auto GPS location',
    'Real-time status updates via dashboard and notifications',
    'Transparent resolution proof provided by field officers',
    'Direct feedback rating after ticket closure',
  ];

  const authorityBenefits = [
    'Auto-routed tickets directly to field officers by zonal ward',
    'Prioritized task queue preventing hazardous delays',
    'Unified administration dashboard with departmental performance SLAs',
    'Elimination of duplicate work orders and resource wastage',
  ];

  const team = [
    {
      name: 'Kishore S',
      role: 'Team Lead & Frontend / AI Specialist',
      module: 'Citizen Portal & Integration Lead',
      icon: Users,
      badge: 'Lead',
    },
    {
      name: 'Kalai',
      role: 'Officer Workflow Developer',
      module: 'Officer Task & Field Resolution Module',
      icon: UserCheck,
      badge: 'Officer Lead',
    },
    {
      name: 'Kanishk',
      role: 'Admin & Analytics Architect',
      module: 'Admin Governance & Hotspot Analytics',
      icon: ShieldCheck,
      badge: 'Admin Lead',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 bg-white">
      
      {/* PAGE HEADER */}
      <PageHeader
        title="About CivicConnect"
        description="Transforming civic issue management with smart AI routing, real-time tracking, and multi-tier governance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Platform' },
        ]}
        badge={<Badge variant="primary">K3 WINNERS Project</Badge>}
      />

      {/* MISSION STATEMENT */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-700/60">
            <Target className="w-4 h-4" />
            <span>Our Core Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Bridging the gap between Citizens and Municipal Authorities.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            CivicConnect empowers citizens to report everyday neighborhood problems while providing city officials with intelligent auto-dispatch, priority sorting, and transparent task tracking.
          </p>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="danger" size="md">The Challenge</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Traditional Civic Systems Fail
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-rose-200 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-100">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{prob.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR SOLUTION & AI CAPABILITIES */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <Badge variant="primary" size="md">AI-Driven Governance</Badge>
            <h2 className="text-3xl font-black text-slate-900">
              Smart AI Engine at the Core
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              CivicConnect uses artificial intelligence to remove friction from complaint reporting and dispatching. The AI works behind the scenes so complaints reach the correct repair teams instantly.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AI_capabilities.map((cap, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-rose-100 text-rose-700 rounded-lg">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{cap.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS COMPARISON */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Citizen Benefits */}
        <div className="bg-rose-50/60 p-8 rounded-3xl border border-rose-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Benefits for Citizens</h3>
              <p className="text-xs text-rose-700">Empowering everyday residents</p>
            </div>
          </div>

          <ul className="space-y-3 pt-2">
            {citizenBenefits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Authority Benefits */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-600 text-white rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Benefits for Authorities</h3>
              <p className="text-xs text-sky-400">Streamlining municipal operations</p>
            </div>
          </div>

          <ul className="space-y-3 pt-2">
            {authorityBenefits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM STRUCTURE */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="primary" size="md">Development Team</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Created by Team K3 WINNERS
          </h2>
          <p className="text-xs text-slate-600">
            A modular frontend foundation built for multi-developer collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => {
            const Icon = member.icon;
            return (
              <Card key={idx} hoverEffect className="text-center rounded-2xl border border-slate-200">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold border border-rose-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm">{member.badge}</Badge>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 font-mono w-full border border-slate-200">
                    {member.module}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FUTURE VISION CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4 border border-slate-800">
        <div className="inline-flex p-3 bg-slate-800 text-rose-400 rounded-2xl">
          <Rocket className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black">Future Vision: Next-Gen Smart Cities</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Upcoming expansions include IoT sensor integration for automated drainage overflow alerts, WhatsApp complaint bot, and automated SLA breach escalations.
        </p>
        <div className="pt-2">
          <Link to="/citizen/report">
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="shadow-md shadow-rose-600/25">
              Try Citizen Portal
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
