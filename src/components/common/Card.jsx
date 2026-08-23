import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  action,
  headerIcon: Icon,
  className = '',
  bodyClassName = '',
  hoverEffect = false,
  bordered = true,
  padding = 'normal', // 'none', 'sm', 'normal', 'lg'
  footer,
}) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-xs transition-all duration-200
        ${bordered ? 'border border-slate-200' : ''}
        ${hoverEffect ? 'hover:shadow-md hover:border-slate-300' : ''}
        ${className}
      `}
    >
      {(title || subtitle || action || Icon) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      <div className={`${paddings[padding] || paddings.normal} ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
}
