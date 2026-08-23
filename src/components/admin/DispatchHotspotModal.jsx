import React, { useState } from 'react';
import {
  AlertTriangle,
  Send,
  Truck,
  ShieldAlert,
  MapPin,
  Clock,
  CheckCircle,
  Radio,
  FileCheck
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function DispatchHotspotModal({
  isOpen,
  onClose,
  hotspot,
  onConfirmDispatch,
}) {
  const [teamType, setTeamType] = useState('Emergency Rapid Repair Unit (ERRU)');
  const [vehicles, setVehicles] = useState('2 Suction Tankers + 1 Heavy Loader');
  const [slaTarget, setSlaTarget] = useState('2 Hours (Code Red Priority)');
  const [officerLead, setOfficerLead] = useState('Senior Insp. Ramesh Chandra');
  const [priorityNote, setPriorityNote] = useState('Immediate site cordon and asphalt patch / suction drainage activation.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!hotspot) return null;

  const handleDispatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmDispatch({
        hotspotId: hotspot.id,
        teamType,
        vehicles,
        slaTarget,
        officerLead,
        priorityNote,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Emergency Response Task Force"
      subtitle={`Immediate zonal deployment for ${hotspot.name}`}
      size="lg"
      primaryAction={{
        label: isSubmitting ? 'Transmitting Dispatch...' : 'Authorize Emergency Dispatch',
        onClick: handleDispatch,
        isLoading: isSubmitting,
        variant: 'danger',
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onClose,
      }}
    >
      <div className="space-y-4 text-xs text-slate-700">
        
        {/* Hotspot Alert Banner */}
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-950 text-xs">{hotspot.name}</span>
              <Badge variant="danger" size="sm">{hotspot.riskLevel} SEVERITY</Badge>
            </div>
            <p className="text-[11px] text-rose-800">
              <MapPin className="w-3 h-3 inline mr-1 text-rose-600" />
              {hotspot.location} • <strong>{hotspot.complaintCount} active citizen complaints</strong>
            </p>
          </div>
        </div>

        {/* Dispatch Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Emergency Unit Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
            >
              <option>Emergency Rapid Repair Unit (ERRU)</option>
              <option>Heavy Infrastructure Machinery Squad</option>
              <option>Water Board High-Pressure Desilt Team</option>
              <option>Electrical Grid Hazmat & Line Crew</option>
              <option>Health & Sanitation Flying Task Force</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Fleet & Heavy Equipment Allocation
            </label>
            <input
              type="text"
              value={vehicles}
              onChange={(e) => setVehicles(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Response SLA Target
            </label>
            <select
              value={slaTarget}
              onChange={(e) => setSlaTarget(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option>2 Hours (Code Red Priority)</option>
              <option>4 Hours (Urgent Resolution)</option>
              <option>8 Hours (Standard Expedited)</option>
              <option>24 Hours (Next Shift Sweep)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Field Incident Commander
            </label>
            <input
              type="text"
              value={officerLead}
              onChange={(e) => setOfficerLead(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Operational Directives */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Operational Directives & Citizen Advisory
          </label>
          <textarea
            rows="2"
            value={priorityNote}
            onChange={(e) => setPriorityNote(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Live Broadcast Notice */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
          <Radio className="w-4 h-4 text-purple-600 shrink-0" />
          <span>
            Dispatch authorization will automatically notify registered citizens within a <strong>1.5 km radius</strong> with live tracking updates.
          </span>
        </div>

      </div>
    </Modal>
  );
}
