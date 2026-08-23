import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  UserPlus,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function AllocateOfficersModal({
  isOpen,
  onClose,
  selectedDepartment,
  departments,
  onSaveAllocation,
}) {
  const [deptId, setDeptId] = useState('');
  const [officersToAdd, setOfficersToAdd] = useState(2);
  const [shiftType, setShiftType] = useState('Day Rapid Response (08:00 - 18:00)');
  const [targetWard, setTargetWard] = useState('Ward 14 (Indiranagar Hotspot)');
  const [specialInstructions, setSpecialInstructions] = useState('Expedite pothole patching & priority drainage clearance ahead of evening rainfall.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedDepartment) {
      setDeptId(selectedDepartment.id);
    } else if (departments && departments.length > 0) {
      setDeptId(departments[0].id);
    }
  }, [selectedDepartment, departments]);

  const currentDept = departments.find((d) => d.id === deptId) || departments[0] || {};

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSaveAllocation({
        departmentId: deptId,
        additionalOfficers: Number(officersToAdd),
        shift: shiftType,
        ward: targetWard,
        notes: specialInstructions,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const sampleRoster = [
    { name: 'Officer Vikramaditya R.', id: 'OFF-782', status: 'Available', exp: '5 yrs' },
    { name: 'Officer Sneha Menon', id: 'OFF-641', status: 'On Field Duty', exp: '3 yrs' },
    { name: 'Officer Karthik Balan', id: 'OFF-912', status: 'Available', exp: '4 yrs' },
    { name: 'Officer Ananya Sen', id: 'OFF-504', status: 'On Standby', exp: '2 yrs' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Allocate & Deploy Field Officers"
      subtitle="Reassign municipal capacity and deploy emergency task forces to high-density zones."
      size="lg"
      primaryAction={{
        label: isSubmitting ? 'Deploying...' : 'Confirm Officer Deployment',
        onClick: handleConfirm,
        isLoading: isSubmitting,
        variant: 'primary',
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onClose,
      }}
    >
      <div className="space-y-5 text-xs text-slate-700">
        
        {/* Department Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Select Municipal Department <span className="text-rose-500">*</span>
          </label>
          <select
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} (Current active officers: {dept.officers})
              </option>
            ))}
          </select>
        </div>

        {/* Current Allocation Stats Card */}
        {currentDept && (
          <div className="p-3.5 bg-purple-50/80 rounded-xl border border-purple-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>{currentDept.name}</span>
              </div>
              <p className="text-[11px] text-purple-700 mt-0.5">
                Lead Supervisor: <strong>{currentDept.leadOfficer || 'Executive Engineer'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <div>
                <span className="text-slate-500 block">Current Staff</span>
                <span className="font-extrabold text-slate-900">{currentDept.officers} Officers</span>
              </div>
              <div>
                <span className="text-slate-500 block">SLA Score</span>
                <span className="font-extrabold text-purple-800 font-mono">{currentDept.sla}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Avg Response</span>
                <span className="font-extrabold text-emerald-700">{currentDept.avgResponse}</span>
              </div>
            </div>
          </div>
        )}

        {/* Additional Officers & Shift Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Additional Officers to Allocate <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="20"
                value={officersToAdd}
                onChange={(e) => setOfficersToAdd(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-center focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-xs text-slate-500">
                New Total: <strong className="text-slate-900">{(currentDept.officers || 0) + Number(officersToAdd)}</strong> officers
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Deployment Shift Type
            </label>
            <select
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Day Rapid Response (08:00 - 18:00)</option>
              <option>Night Emergency Squad (18:00 - 04:00)</option>
              <option>24/7 Monsoonal Standby Unit</option>
              <option>Zonal Quality Audit Flying Squad</option>
            </select>
          </div>
        </div>

        {/* Target Ward */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Priority Deployment Ward / Sector
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-purple-600 absolute left-3 top-2.5" />
            <input
              type="text"
              value={targetWard}
              onChange={(e) => setTargetWard(e.target.value)}
              placeholder="e.g. Ward 14 - Indiranagar Main Road"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Tactical Directive Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Operational Directives & AI Protocol
          </label>
          <textarea
            rows="2"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Specify equipment requirements or SLA benchmarks..."
          />
        </div>

        {/* Roster Pool Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              Available Reserve Officer Pool
            </span>
            <span className="text-[11px] text-slate-500">4 Ready for Immediate Dispatch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleRoster.map((officer) => (
              <div
                key={officer.id}
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-[11px]"
              >
                <div>
                  <div className="font-semibold text-slate-900">{officer.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{officer.id} • {officer.exp} experience</div>
                </div>
                <Badge
                  variant={officer.status === 'Available' ? 'success' : officer.status === 'On Standby' ? 'info' : 'warning'}
                  size="sm"
                >
                  {officer.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
}
