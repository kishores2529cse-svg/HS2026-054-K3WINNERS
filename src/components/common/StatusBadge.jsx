import React from 'react';
import { Clock, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Badge from './Badge';

const statusConfig = {
  Pending: {
    variant: 'warning',
    icon: Clock,
    label: 'Pending',
  },
  'In Progress': {
    variant: 'info',
    icon: RefreshCw,
    label: 'In Progress',
  },
  Resolved: {
    variant: 'success',
    icon: CheckCircle2,
    label: 'Resolved',
  },
  Rejected: {
    variant: 'danger',
    icon: XCircle,
    label: 'Rejected',
  },
  Escalated: {
    variant: 'danger',
    icon: AlertTriangle,
    label: 'Escalated',
  },
};

export default function StatusBadge({ status = 'Pending', size = 'md', className = '' }) {
  const config = statusConfig[status] || {
    variant: 'default',
    icon: Clock,
    label: status,
  };

  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} size={size} className={className}>
      <IconComponent className={`w-3.5 h-3.5 ${status === 'In Progress' ? 'animate-spin' : ''}`} />
      <span>{config.label}</span>
    </Badge>
  );
}
