import {
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';

export default function ComplaintDetailModal({
  isOpen,
  onClose,
  complaint,
  onOpenUpdateModal,
}) {
  if (!complaint) return null;

  const isResolved = complaint.status === 'Resolved';
  const isHighPriority = complaint.priority === 'High';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complaint Inspection Dossier"
      subtitle={`Complaint Ref: ${complaint.id} • ${complaint.category}`}
      size="xl"
      primaryAction={{
        label: isResolved ? 'Update Status / Proof' : 'Take Action & Update Status',
        onClick: () => {
          onClose();
          onOpenUpdateModal(complaint);
        },
        variant: 'primary',
      }}
      secondaryAction={{
        label: 'Close',
        onClick: onClose,
      }}
    >
      <div className="space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                {complaint.id}
              </span>
              <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-700">
                {complaint.category}
              </span>
              <StatusBadge status={complaint.status} size="sm" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {complaint.title}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{complaint.location}</span>
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3 text-center shrink-0 min-w-[110px]">
            <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">AI Priority</div>
            <div className="text-2xl font-black text-white mt-0.5">{complaint.urgencyScore}/100</div>
            <div className="text-[10px] text-slate-400 font-medium">{complaint.priority} Urgency</div>
          </div>
        </div>

        {/* Before / After Evidence Photos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Visual Evidence & Resolution Proof</span>
            </h4>
            <span className="text-xs text-slate-500">
              {complaint.proofImage ? 'Both Before & After photos available' : 'Citizen report photo attached'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span className="text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Citizen Reported Photo
                </span>
                <span className="text-[11px] text-slate-400">{complaint.reportedDate}</span>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                {complaint.beforeImage ? (
                  <img
                    src={complaint.beforeImage}
                    alt="Citizen Reported Issue"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No before photo attached
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  Initial Defect
                </div>
              </div>
            </div>

            {/* After / Resolution Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Officer Resolution Proof
                </span>
                <span className="text-[11px] text-slate-400">
                  {isResolved ? (complaint.resolvedAt || 'Verified') : 'Pending completion'}
                </span>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                {complaint.proofImage ? (
                  <img
                    src={complaint.proofImage}
                    alt="Officer Resolution Proof"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-slate-300" />
                    <span className="text-xs font-medium text-slate-600">No Resolution Proof Uploaded Yet</span>
                    <span className="text-[11px] text-slate-400">Click 'Take Action' to upload field proof</span>
                  </div>
                )}
                {complaint.proofImage && (
                  <div className="absolute bottom-2 left-2 bg-emerald-700/90 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                    Work Completed & Geo-Stamped
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Issue Details & Citizen Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Citizen Report Information
            </h4>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500">Citizen Name:</span>
                <p className="font-semibold text-slate-900">{complaint.reportedBy?.name || 'Anonymous Citizen'}</p>
              </div>
              <div>
                <span className="text-slate-500">Contact:</span>
                <p className="font-semibold text-slate-900">{complaint.reportedBy?.phone || '+91 98450 00000'}</p>
              </div>
              <div>
                <span className="text-slate-500">Full Description:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                  {complaint.description}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Field Unit Assignment */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Zonal Assignment & SLA
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500">Ward & Zone:</span>
                <p className="font-semibold text-slate-900">{complaint.ward || 'Ward 14 (Indiranagar)'} • {complaint.zone || 'East Zone'}</p>
              </div>
              <div>
                <span className="text-slate-500">GPS Coordinates:</span>
                <p className="font-mono font-medium text-slate-800">
                  {complaint.coordinates?.[0]?.toFixed(4)}° N, {complaint.coordinates?.[1]?.toFixed(4)}° E
                </p>
              </div>
              <div>
                <span className="text-slate-500">Assigned Rapid Response Unit:</span>
                <p className="font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200 inline-block mt-0.5">
                  {complaint.assignedTeam || 'BBMP Rapid Road Repair Unit 2'}
                </p>
              </div>
              <div>
                <span className="text-slate-500">SLA Status:</span>
                <p className={`font-semibold ${isResolved ? 'text-emerald-700' : isHighPriority ? 'text-rose-700' : 'text-slate-900'}`}>
                  {complaint.slaDeadline}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Audit Timeline */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Action & Dispatch Audit Trail
          </h4>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            {complaint.timeline && complaint.timeline.length > 0 ? (
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {complaint.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 border-2 border-white flex items-center justify-center shrink-0 z-10 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{item.action}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{item.note}</p>
                      <span className="text-[10px] text-sky-700 font-semibold block mt-1">
                        By: {item.user}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-2">
                No previous action records.
              </div>
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
}
