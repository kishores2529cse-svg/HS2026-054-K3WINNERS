import React, { useState } from 'react';
import {
  Building2,
  Users,
  Map,
  Cpu,
  BarChart3,
  ShieldCheck,
  Download,
  Bell,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  FileSpreadsheet,
  Layers,
  Search
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

// Admin Modular Components
import MunicipalMetrics from '../../components/admin/MunicipalMetrics';
import DepartmentTable from '../../components/admin/DepartmentTable';
import AllocateOfficersModal from '../../components/admin/AllocateOfficersModal';
import HotspotHeatmap from '../../components/admin/HotspotHeatmap';
import CategoryBreakdownChart from '../../components/admin/CategoryBreakdownChart';
import AIGovernanceWidget from '../../components/admin/AIGovernanceWidget';
import DispatchHotspotModal from '../../components/admin/DispatchHotspotModal';
import OfficerRosterWidget from '../../components/admin/OfficerRosterWidget';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  // Departments State
  const [departments, setDepartments] = useState([
    {
      id: 'dept-sanitation',
      name: 'Sanitation & Waste Management',
      total: 480,
      resolved: 440,
      officers: 24,
      sla: '96%',
      avgResponse: '2.4 hrs',
      leadOfficer: 'Rajesh Sharma',
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'dept-pwd',
      name: 'Public Works & Roads (PWD)',
      total: 420,
      resolved: 330,
      officers: 18,
      sla: '88%',
      avgResponse: '5.1 hrs',
      leadOfficer: 'Priya Sundaram',
      iconBg: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'dept-electrical',
      name: 'Electrical & Street Lighting',
      total: 310,
      resolved: 280,
      officers: 12,
      sla: '92%',
      avgResponse: '3.1 hrs',
      leadOfficer: 'Amit Patel',
      iconBg: 'bg-indigo-50 text-indigo-700',
    },
    {
      id: 'dept-water',
      name: 'Water Supply & Sewage Board',
      total: 210,
      resolved: 130,
      officers: 15,
      sla: '74%',
      avgResponse: '7.8 hrs',
      leadOfficer: 'Dr. Anand Rao',
      iconBg: 'bg-sky-50 text-sky-700',
    },
  ]);

  // Hotspots State
  const [hotspots, setHotspots] = useState([
    {
      id: 'HS-101',
      name: 'Indiranagar Pothole Hotspot',
      ward: 'Ward 14 (East)',
      location: '100ft Road & 4th Cross Intersection',
      category: 'Public Works & Roads',
      complaintCount: 68,
      resolutionRate: 28,
      riskLevel: 'Critical',
      leadOfficer: 'Officer Vikramaditya R.',
      coordinates: '12.9784° N, 77.6408° E',
      affectedRadius: '1.2 km² (Commuter arterial)',
      aiDiagnostic: 'Severe monsoon surface erosion exacerbated by high commercial bus volume. Structural patching recommended.',
    },
    {
      id: 'HS-102',
      name: 'Sector 4 Drainage Overflow',
      ward: 'Ward 22 (South)',
      location: 'Main Stormwater Channel Sector 4',
      category: 'Water & Sewage Board',
      complaintCount: 54,
      resolutionRate: 41,
      riskLevel: 'High',
      leadOfficer: 'Officer Sneha Menon',
      coordinates: '12.9279° N, 77.6271° E',
      affectedRadius: '2.0 km² (Residential zone)',
      aiDiagnostic: 'Solid waste blockage at culvert junction causing 40% backflow during peak morning runoff.',
    },
    {
      id: 'HS-103',
      name: 'Lakeview Avenue Mainline Leak',
      ward: 'Ward 08 (North)',
      location: 'Lakeview Ring Corridor Pillar 42',
      category: 'Water Supply & Sewage',
      complaintCount: 42,
      resolutionRate: 19,
      riskLevel: 'Critical',
      leadOfficer: 'Dr. Anand Rao',
      coordinates: '12.9915° N, 77.5920° E',
      affectedRadius: '3.5 km² (Water grid pressure loss)',
      aiDiagnostic: '35% sudden pressure drop detected. Underground cast-iron pipe fracture probable. Code Red repair required.',
    },
    {
      id: 'HS-104',
      name: 'MG Road Smart Lighting Outage',
      ward: 'Ward 03 (Central)',
      location: 'Metro Plaza & Brigade Boulevard',
      category: 'Electrical & Lighting',
      complaintCount: 38,
      resolutionRate: 76,
      riskLevel: 'Moderate',
      leadOfficer: 'Officer Amit Patel',
      coordinates: '12.9756° N, 77.6066° E',
      affectedRadius: '0.8 km² (Commercial corridor)',
      aiDiagnostic: 'Feeder transformer relay tripped during lightning surge. 80% automated sub-line bypass active.',
    },
    {
      id: 'HS-105',
      name: 'Whitefield Central Garbage Cluster',
      ward: 'Ward 31 (East Zone)',
      location: 'ITPL Main Road Transit Point',
      category: 'Sanitation & Solid Waste',
      complaintCount: 45,
      resolutionRate: 52,
      riskLevel: 'High',
      leadOfficer: 'Officer Rajesh Sharma',
      coordinates: '12.9698° N, 77.7499° E',
      affectedRadius: '1.5 km² (Transit corridor)',
      aiDiagnostic: 'Commercial dumping overflow during late night hours. Smart sensor bin placement recommended.',
    },
    {
      id: 'HS-106',
      name: 'Koramangala 5th Block Waterlogging',
      ward: 'Ward 19 (South-East)',
      location: 'Club Road Low-Lying Junction',
      category: 'Public Works & Roads',
      complaintCount: 29,
      resolutionRate: 64,
      riskLevel: 'Moderate',
      leadOfficer: 'Officer Priya Sundaram',
      coordinates: '12.9352° N, 77.6245° E',
      affectedRadius: '0.9 km² (Market area)',
      aiDiagnostic: 'Desilting 70% complete. Sump pump capacity sufficient for moderate monsoon showers.',
    },
  ]);

  // Modal States
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [selectedDeptForAllocation, setSelectedDeptForAllocation] = useState(null);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedHotspotForDispatch, setSelectedHotspotForDispatch] = useState(null);

  // Show Temporary Toast Message
  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handle Officer Allocation Save
  const handleSaveAllocation = (allocationData) => {
    setDepartments((prevDepts) =>
      prevDepts.map((d) => {
        if (d.id === allocationData.departmentId) {
          const newOfficers = d.officers + allocationData.additionalOfficers;
          return {
            ...d,
            officers: newOfficers,
            sla: `${Math.min(99, parseInt(d.sla, 10) + 2)}%`,
          };
        }
        return d;
      })
    );

    const targetDept = departments.find((d) => d.id === allocationData.departmentId);
    showToast(
      'Officer Allocation Successful',
      `Allocated +${allocationData.additionalOfficers} officers to ${targetDept?.name || 'Department'} (${allocationData.shift}).`,
      'success'
    );
  };

  // Handle Hotspot Emergency Dispatch
  const handleConfirmDispatch = (dispatchData) => {
    setHotspots((prev) =>
      prev.map((hs) => {
        if (hs.id === dispatchData.hotspotId) {
          return {
            ...hs,
            resolutionRate: Math.min(95, hs.resolutionRate + 25),
            riskLevel: hs.riskLevel === 'Critical' ? 'High' : 'Moderate',
          };
        }
        return hs;
      })
    );

    showToast(
      'Emergency Dispatch Authorized',
      `${dispatchData.teamType} deployed under ${dispatchData.officerLead}. Citizen broadcast initiated.`,
      'danger'
    );
  };

  // Handle AI Trigger
  const handleTriggerAIAction = (actionTitle, detail) => {
    showToast(
      `AI Directive Executed: ${actionTitle}`,
      detail,
      'purple'
    );
  };

  // Handle Report Export Simulation
  const handleExportReport = () => {
    showToast(
      'Municipal Governance Report Generated',
      'Compiled city-wide telemetry report: CivicConnect_Governance_Q3_2026.pdf (1.42 MB).',
      'success'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* HEADER WITH REAL-TIME ACTIONS */}
      <PageHeader
        title="Admin Governance & Municipal Analytics"
        description="Cross-department SLA oversight, spatial GIS complaint heatmaps, predictive AI anomaly triage, and emergency workforce dispatch."
        badge={<Badge variant="purple">Admin Portal (Kanishk)</Badge>}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={FileSpreadsheet}
              onClick={handleExportReport}
              className="bg-white hover:bg-slate-50 text-slate-700 font-semibold"
            >
              Export Municipal Report
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ShieldCheck}
              onClick={() => {
                setSelectedDeptForAllocation(null);
                setIsAllocateModalOpen(true);
              }}
              className="bg-purple-700 hover:bg-purple-800 focus:ring-purple-500 text-white font-bold"
            >
              Allocate Officers
            </Button>
          </div>
        }
      />

      {/* TOAST FEEDBACK NOTIFICATION BANNER */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 shadow-md transition-all animate-in fade-in slide-in-from-top-2 ${
            toastMessage.type === 'danger'
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : toastMessage.type === 'purple'
              ? 'bg-purple-50 border-purple-300 text-purple-950'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {toastMessage.type === 'danger' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : toastMessage.type === 'purple' ? (
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-bold text-xs">{toastMessage.title}</strong>
              <p className="text-xs mt-0.5 opacity-90">{toastMessage.message}</p>
            </div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* REQUIREMENT 1: MUNICIPAL SUMMARY METRICS */}
      <section aria-label="Municipal Summary Metrics">
        <MunicipalMetrics
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </section>

      {/* MAIN DASHBOARD DUAL-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DEPARTMENT MANAGEMENT & GIS HOTSPOT HEATMAP */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* REQUIREMENT 2: DEPARTMENT MANAGEMENT & SLA TABLE */}
          <section aria-label="Department Management & SLA Performance">
            <DepartmentTable
              departments={departments}
              onOpenAllocateModal={(dept) => {
                setSelectedDeptForAllocation(dept);
                setIsAllocateModalOpen(true);
              }}
              onDepartmentSelect={(dept) => {
                setSelectedDeptForAllocation(dept);
                setIsAllocateModalOpen(true);
              }}
            />
          </section>

          {/* REQUIREMENT 3: ZONAL HOTSPOT & GIS HEATMAP ANALYTICS */}
          <section aria-label="Zonal Hotspot & GIS Heatmap Analytics">
            <HotspotHeatmap
              hotspots={hotspots}
              onSelectHotspot={(hs) => {
                setSelectedHotspotForDispatch(hs);
              }}
              onOpenDispatchModal={(hs) => {
                setSelectedHotspotForDispatch(hs);
                setIsDispatchModalOpen(true);
              }}
            />
          </section>

          {/* REQUIREMENT 3 CONTINUED: CATEGORY BREAKDOWN & VELOCITY */}
          <section aria-label="Category Breakdown Chart">
            <CategoryBreakdownChart />
          </section>

        </div>

        {/* RIGHT COLUMN: AI GOVERNANCE INTELLIGENCE & OFFICER ROSTER */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* REQUIREMENT 4: AI GOVERNANCE INTELLIGENCE WIDGET */}
          <section aria-label="AI Governance Intelligence">
            <AIGovernanceWidget
              onTriggerAction={handleTriggerAIAction}
            />
          </section>

          {/* OFFICER ROSTER & WORKLOAD TRACKER */}
          <section aria-label="Officer Workload & Roster">
            <OfficerRosterWidget
              onOpenAllocateModal={() => {
                setSelectedDeptForAllocation(null);
                setIsAllocateModalOpen(true);
              }}
            />
          </section>

          {/* MUNICIPAL SYSTEM HEALTH & COMPLIANCE SUMMARY */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 text-white rounded-2xl border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-200">CENTRAL CIVIC ENGINE</span>
              </div>
              <Badge variant="purple" size="sm">v2.6.4 Stable</Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Citizen Telemetry Ping</span>
                <span className="font-mono text-emerald-400 font-bold">14ms (Optimal)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>AI Triaging Uptime</span>
                <span className="font-mono text-slate-200 font-bold">99.98%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Active Field Geofences</span>
                <span className="font-mono text-purple-300 font-bold">32 Wards Synced</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
              CivicConnect Municipal Administration Governance Center is operating under National Smart City Standardized Protocol.
            </p>
          </div>

        </div>

      </div>

      {/* ALLOCATE OFFICERS MODAL */}
      <AllocateOfficersModal
        isOpen={isAllocateModalOpen}
        onClose={() => setIsAllocateModalOpen(false)}
        selectedDepartment={selectedDeptForAllocation}
        departments={departments}
        onSaveAllocation={handleSaveAllocation}
      />

      {/* DISPATCH HOTSPOT MODAL */}
      <DispatchHotspotModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        hotspot={selectedHotspotForDispatch}
        onConfirmDispatch={handleConfirmDispatch}
      />

    </div>
  );
}
