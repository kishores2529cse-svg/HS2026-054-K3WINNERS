import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs hover:shadow-md hover:shadow-rose-600/20 focus:ring-rose-500 font-semibold',
  secondary: 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-xs focus:ring-slate-700 font-semibold',
  outline: 'border border-slate-300 bg-white hover:bg-rose-50/50 hover:border-rose-300 hover:text-rose-700 text-slate-700 shadow-2xs focus:ring-rose-400 font-medium',
  ghost: 'text-slate-600 hover:bg-rose-50/60 hover:text-rose-700 focus:ring-rose-400 font-medium',
  danger: 'bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white shadow-xs focus:ring-rose-600 font-semibold',
  mild: 'bg-rose-50 hover:bg-rose-100 active:bg-rose-200/80 text-rose-700 border border-rose-200 shadow-2xs focus:ring-rose-400 font-semibold',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs focus:ring-emerald-500 font-semibold',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
