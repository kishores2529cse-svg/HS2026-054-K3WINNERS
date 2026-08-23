import { useState } from 'react';
import {
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Trash2,
  Sparkles,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import Modal from '../common/Modal';
import { SAMPLE_PROOF_PHOTOS } from './officerData';

function StatusUpdateForm({ complaint, onClose, onSave }) {
  const [status, setStatus] = useState(complaint.status || 'In Progress');
  const [officerNotes, setOfficerNotes] = useState(complaint.officerNotes || '');
  const [assignedTeam, setAssignedTeam] = useState(complaint.assignedTeam || 'BBMP Rapid Road Repair Unit 2');
  const [proofImage, setProofImage] = useState(complaint.proofImage || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset selector
  const handleSelectPreset = (url, sampleNote) => {
    setProofImage(url);
    if (!officerNotes && sampleNote) {
      setOfficerNotes(sampleNote);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSave({
        ...complaint,
        status,
        officerNotes,
        assignedTeam,
        proofImage: status === 'Resolved' ? (proofImage || SAMPLE_PROOF_PHOTOS[0].url) : proofImage,
        resolvedAt: status === 'Resolved' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : complaint.resolvedAt,
        timeline: [
          ...(complaint.timeline || []),
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action: `Status updated to ${status}`,
            user: 'Officer Kalai (Ward 14)',
            note: officerNotes || `Status transitioned to ${status}`,
          },
        ],
      });
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  const statusOptions = [
    {
      value: 'Pending',
      label: 'Pending Inspection',
      desc: 'Awaiting on-site field team arrival',
      icon: Clock,
      color: 'border-amber-200 bg-amber-50/60 text-amber-900',
    },
    {
      value: 'In Progress',
      label: 'Work In Progress',
      desc: 'Crew dispatched and active on site',
      icon: RefreshCw,
      color: 'border-sky-200 bg-sky-50/60 text-sky-900',
    },
    {
      value: 'Resolved',
      label: 'Resolved & Verified',
      desc: 'Work completed with photographic proof',
      icon: CheckCircle2,
      color: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
    },
    {
      value: 'Rejected',
      label: 'Rejected / Duplicate',
      desc: 'Not within zonal purview or duplicate report',
      icon: XCircle,
      color: 'border-rose-200 bg-rose-50/60 text-rose-900',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Complaint Brief Summary Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">{complaint.title}</span>
          <span className="text-[11px] font-mono font-semibold text-slate-500">{complaint.id}</span>
        </div>
        <p className="text-xs text-slate-600 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
          <span>{complaint.location}</span>
        </p>
      </div>

      {/* 1. Status Selection Grid */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Select Resolution Status <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {statusOptions.map((opt) => {
            const Icon = opt.icon;
            const selected = status === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  selected
                    ? `${opt.color} ring-2 ring-sky-500 shadow-xs`
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selected ? 'bg-white shadow-2xs' : 'bg-slate-100'} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Proof Photo Upload Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Work Resolution Proof Photo
            {status === 'Resolved' && (
              <span className="text-emerald-700 font-bold ml-1.5 text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Required for Resolution
              </span>
            )}
          </label>
          <span className="text-[11px] text-slate-500">Supports JPG, PNG with GPS Metadata</span>
        </div>

        {/* Photo Dropzone & Preview */}
        {proofImage ? (
          <div className="relative rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                <img
                  src={proofImage}
                  alt="Proof Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Resolution Proof Attached</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Auto Geo-Stamped: {complaint.coordinates?.[0]?.toFixed(4)}° N, {complaint.coordinates?.[1]?.toFixed(4)}° E • Indiranagar
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setProofImage(null)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50/70 hover:bg-sky-50/30 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors group text-center">
              <div className="p-3 bg-white rounded-full shadow-xs border border-slate-200 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-sky-600" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2">
                Click to upload resolution proof photo
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                or drag and drop camera image directly here
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Quick sample preset proof buttons */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="text-[11px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>1-Click Sample Resolution Proof Presets:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PROOF_PHOTOS.slice(0, 3).map((sample, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectPreset(sample.url, sample.note)}
                    className="text-[11px] px-2 py-1 bg-white border border-slate-200 hover:border-sky-400 hover:text-sky-700 rounded-md transition-colors text-slate-700 text-left font-medium"
                  >
                    📷 {sample.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Assigned Field Crew */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Assigned Field Crew / Rapid Unit
        </label>
        <input
          type="text"
          value={assignedTeam}
          onChange={(e) => setAssignedTeam(e.target.value)}
          placeholder="e.g. BBMP Rapid Road Repair Unit 2 / BESCOM Line Crew"
          className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* 4. Officer Inspection Remarks */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Officer Inspection Notes & Resolution Details
        </label>
        <textarea
          rows={3}
          value={officerNotes}
          onChange={(e) => setOfficerNotes(e.target.value)}
          placeholder="Describe action taken, materials used, crew members, on-site measurements, or next steps..."
          className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 text-xs font-semibold rounded-lg text-white transition-colors shadow-xs ${
            status === 'Resolved'
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-sky-600 hover:bg-sky-700'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Resolution & Update Status'}
        </button>
      </div>
    </form>
  );
}

export default function StatusUpdateModal({
  isOpen,
  onClose,
  complaint,
  onSave,
}) {
  if (!isOpen || !complaint) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Complaint Status & Resolution Proof"
      subtitle={`Complaint ID: ${complaint.id} • ${complaint.category}`}
      size="lg"
    >
      <StatusUpdateForm
        key={complaint.id}
        complaint={complaint}
        onClose={onClose}
        onSave={onSave}
      />
    </Modal>
  );
}
