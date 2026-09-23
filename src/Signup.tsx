import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface SignupProps {
  onSuccess: (name: string) => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};

    if (!name.trim()) {
      errs.name = 'Please enter your name';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Please enter a password';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess(name.trim());
  };

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign Up
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Create a new account by filling in the details below.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1 text-left">
          <label htmlFor="signup-name" className="block text-xs font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="John Doe"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.name
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.name && <p className="text-[11px] font-medium text-rose-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1 text-left">
          <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="signup-email"
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
          <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="At least 6 characters"
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

        {/* Confirm Password */}
        <div className="space-y-1 text-left">
          <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="signup-confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Repeat your password"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.confirmPassword
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] font-medium text-rose-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Signup;
