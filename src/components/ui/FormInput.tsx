import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string | null;
  icon?: LucideIcon;
  endAdornment?: React.ReactNode;
  hint?: string;
  onFocusField?: () => void;
  onBlurField?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  error,
  icon: Icon,
  endAdornment,
  hint,
  onFocusField,
  onBlurField,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full text-left space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold tracking-wide text-slate-700"
        >
          {label}
          {props.required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
        </label>
        {hint && (
          <span className="text-[11px] text-slate-500">{hint}</span>
        )}
      </div>

      <div className="relative rounded-xl transition-all duration-200 group">
        {Icon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon className="h-4 w-4" />
          </div>
        )}

        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onFocus={(e) => {
            onFocusField?.();
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            onBlurField?.();
            props.onBlur?.(e);
          }}
          className={`w-full rounded-xl border bg-white py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : 'pl-3.5'}
            ${endAdornment ? 'pr-11' : 'pr-3.5'}
            ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-400'
            }
            ${className}
          `}
          {...props}
        />

        {endAdornment && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[11px] font-medium text-rose-600 animate-in fade-in slide-in-from-top-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};
