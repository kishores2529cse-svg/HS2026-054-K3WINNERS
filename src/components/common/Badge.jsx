import React from 'react';

const badgeVariants = {
  default: 'bg-slate-100 text-slate-800 border-slate-200',
  primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  outline: 'bg-transparent text-slate-700 border-slate-300',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs font-medium',
  md: 'px-2.5 py-1 text-xs font-semibold',
  lg: 'px-3 py-1.5 text-sm font-semibold',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border transition-colors ${badgeVariants[variant] || badgeVariants.default} ${badgeSizes[size] || badgeSizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
