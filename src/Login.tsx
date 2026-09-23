import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onSuccess: (email: string) => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Please enter your password';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess(email.trim());
  };

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Login
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div className="space-y-1 text-left">
          <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@example.com"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.email
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.email && <p className="text-[11px] font-medium text-rose-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1 text-left">
          <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Enter your password"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.password
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[11px] font-medium text-rose-600">{errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      <div className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Login;
