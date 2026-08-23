import {
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Users,
  Image as ImageIcon,
  ShieldAlert,
} from 'lucide-react';
import Badge from '../common/Badge';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

export default function ComplaintCard({
  complaint,
  onUpdateStatus,
  onViewDetails,
}) {
  const isHighPriority = complaint.priority === 'High';
  const isResolved = complaint.status === 'Resolved';

  // AI Urgency Score Color Logic
  const getUrgencyColor = (score) => {
    if (score >= 85) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (score >= 65) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md overflow-hidden ${
        isHighPriority && !isResolved
          ? 'border-rose-200/90 shadow-2xs'
          : isResolved
          ? 'border-emerald-100 bg-slate-50/30'
          : 'border-slate-200'
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Left: ID, Badges, Title */}
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {complaint.id}
              </span>
              <Badge variant="outline" size="sm">
                {complaint.category}
              </Badge>
              {isHighPriority && (
                <Badge variant="danger" size="sm" icon={ShieldAlert}>
                  High Urgency
                </Badge>
              )}
              <StatusBadge status={complaint.status} size="sm" />
            </div>

            <h4 className="text-base font-bold text-slate-900 leading-snug hover:text-sky-600 transition-colors cursor-pointer" onClick={() => onViewDetails(complaint)}>
              {complaint.title}
            </h4>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {complaint.description}
            </p>
          </div>

          {/* Right: AI Urgency Score Pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
            <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold ${getUrgencyColor(complaint.urgencyScore)}`}>
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">AI Urgency</span>
                <span className="font-black text-sm">{complaint.urgencyScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mid Row: Location, Time & Assigned Field Team */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100 bg-slate-50/50 -mx-4 sm:-mx-5 px-4 sm:px-5 py-2.5">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate" title={complaint.location}>
              {complaint.location}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className={isResolved ? 'text-emerald-700 font-medium' : isHighPriority ? 'text-rose-700 font-semibold' : ''}>
              {complaint.slaDeadline}
            </span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-slate-600 font-medium">
              {complaint.assignedTeam || 'Officer Kalai Field Unit'}
            </span>
          </div>
        </div>

        {/* Officer remarks if present */}
        {complaint.officerNotes && (
          <div className="mt-3 text-xs bg-sky-50/70 border border-sky-100 rounded-lg p-2.5 text-sky-900 flex items-start gap-2">
            <span className="font-bold text-sky-700 shrink-0">Field Log:</span>
            <span className="text-sky-800 line-clamp-1">{complaint.officerNotes}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
          <div className="flex items-center gap-2">
            {complaint.beforeImage && (
              <button
                type="button"
                onClick={() => onViewDetails(complaint)}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Before Photo Attached</span>
              </button>
            )}
            {complaint.proofImage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Proof Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(complaint)}
            >
              View Details
            </Button>
            <Button
              variant={isResolved ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => onUpdateStatus(complaint)}
            >
              {isResolved ? 'Re-inspect / Update' : 'Update Status & Proof'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
