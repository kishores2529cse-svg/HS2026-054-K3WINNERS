import React from 'react';

export default function PageHeader({
  title,
  description,
  badge,
  action,
  breadcrumbs,
  className = '',
}) {
  return (
    <div className={`mb-6 pb-5 border-b border-slate-200 ${className}`}>
      {breadcrumbs && (
        <nav className="flex text-xs text-slate-500 mb-2 font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center">
              {idx > 0 && <span className="mx-2 text-slate-400">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-emerald-600 transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-800">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && <p className="mt-1 text-sm text-slate-600 max-w-3xl">{description}</p>}
        </div>

        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
