import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SocialButtons } from '../ui/SocialButtons';
import { AuthMode, UserProfile } from '../../types/auth';

interface LoginFormProps {
  onSuccess: (user: UserProfile) => void;
  onSwitchMode: (mode: AuthMode) => void;
  initialEmail?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchMode,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('error') || password === 'wrongpassword') {
        setErrors({ general: 'Invalid email or password. Please try again.' });
        return;
      }

      const loggedUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0].replace('.', ' ').replace(/^./, (s) => s.toUpperCase()) || 'Sarah Connor',
        email: email.trim(),
        role: 'Senior Member',
        createdAt: '2026-03-12',
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onSuccess(loggedUser);
    }, 600);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your credentials to sign in to your account.
        </p>
      </div>

      {/* General Error Alert */}
      {errors.general && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
        >
          {errors.general}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        <FormInput
          label="Email Address"
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="name@company.com"
          required
          autoComplete="email"
          icon={Mail}
          error={errors.email}
        />

        <FormInput
          label="Password"
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="••••••••••••"
          required
          autoComplete="current-password"
          icon={Lock}
          error={errors.password}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        {/* Remember me and Forgot password */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-800">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => onSwitchMode('forgot')}
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        {/* Primary Login Button */}
        <div className="pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Signing in..."
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </PrimaryButton>
        </div>
      </form>

      {/* Divider */}
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-white px-3 text-slate-400">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <SocialButtons onSocialLogin={(provider) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onSuccess({
            id: 'usr_oauth_' + Math.random().toString(36).substring(2, 7),
            name: `${provider} Authenticated User`,
            email: `user@${provider.toLowerCase()}.com`,
            role: 'Enterprise Member',
            createdAt: '2026-03-12',
            lastLogin: 'Just now',
          });
        }, 500);
      }} />

      {/* Footer Switch */}
      <div className="pt-2 text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchMode('signup')}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
