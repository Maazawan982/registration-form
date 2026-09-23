import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  loadingText,
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const variantClasses = {
    primary:
      'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 hover:shadow-indigo-500/30 disabled:opacity-60 disabled:hover:bg-indigo-600',
    secondary:
      'bg-slate-800 text-slate-100 hover:bg-slate-750 hover:text-white border border-slate-700/80 shadow-sm disabled:opacity-50',
    outline:
      'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white disabled:opacity-50',
    ghost:
      'bg-transparent text-slate-400 hover:bg-slate-800/40 hover:text-white disabled:opacity-50',
  };

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white/90" />
          <span>{loadingText || 'Please wait...'}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
