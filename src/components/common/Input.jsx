import React from 'react';

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  options = [], // for select type
  rows = 4, // for textarea type
  className = '',
  id,
  name,
  required = false,
  ...props
}) {
  const inputId = id || name || `input-${Math.random().toString(36).substring(2, 9)}`;

  const baseInputStyles = `
    w-full px-3.5 py-2.5 bg-white border text-sm text-slate-900 rounded-lg shadow-xs transition duration-150
    placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
    ${error ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-300'}
    ${Icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {type === 'select' ? (
          <select id={inputId} name={name} required={required} className={baseInputStyles} {...props}>
            {options.map((opt, i) => (
              <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
                {typeof opt === 'object' ? opt.label : opt}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            rows={rows}
            required={required}
            className={baseInputStyles}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            required={required}
            className={baseInputStyles}
            {...props}
          />
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
