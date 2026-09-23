import React, { useState, useMemo } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, UserPlus } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SocialButtons } from '../ui/SocialButtons';
import { AuthMode, UserProfile, PasswordRequirements } from '../../types/auth';

interface SignupFormProps {
  onSuccess: (user: UserProfile) => void;
  onSwitchMode: (mode: AuthMode) => void;
  initialEmail?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onSwitchMode,
  initialEmail = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const passwordStats: PasswordRequirements = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (passwordStats.minLength) score += 25;
    if (passwordStats.hasNumber) score += 25;
    if (passwordStats.hasUpper) score += 25;
    if (passwordStats.hasSpecial) score += 25;
    return score;
  }, [passwordStats]);

  const strengthLabel = useMemo(() => {
    if (strengthScore <= 25) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (strengthScore <= 50) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-600' };
    if (strengthScore <= 75) return { label: 'Strong', color: 'bg-blue-500', text: 'text-blue-600' };
    return { label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  }, [strengthScore]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (strengthScore < 50) {
      newErrors.password = 'Password must meet at least 2 security criteria';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedTerms) {
      newErrors.terms = 'You must agree to the Terms of Service & Privacy Policy';
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
      const newUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim(),
        role: 'Member',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Just now',
      };
      onSuccess(newUser);
    }, 600);
  };

  return (
    <div className="w-full space-y-3.5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Create Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your details to create your new account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <FormInput
          label="Full Name"
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Elena Rostova"
          required
          autoComplete="name"
          icon={User}
          error={errors.name}
        />

        <FormInput
          label="Email Address"
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="elena@company.com"
          required
          autoComplete="email"
          icon={Mail}
          error={errors.email}
        />

        <div>
          <FormInput
            label="Password"
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Min. 8 characters"
            required
            autoComplete="new-password"
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

          {/* Password strength indicators */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">Security Strength:</span>
                <span className={`font-semibold ${strengthLabel.text}`}>{strengthLabel.label}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${strengthLabel.color}`}
                  style={{ width: `${strengthScore}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-1 pt-1 text-[10px] text-slate-600">
                <span className={`flex items-center gap-1 ${passwordStats.minLength ? 'text-emerald-600 font-semibold' : ''}`}>
                  <Check className="h-3 w-3" /> 8+ chars
                </span>
                <span className={`flex items-center gap-1 ${passwordStats.hasUpper ? 'text-emerald-600 font-semibold' : ''}`}>
                  <Check className="h-3 w-3" /> Uppercase
                </span>
                <span className={`flex items-center gap-1 ${passwordStats.hasNumber ? 'text-emerald-600 font-semibold' : ''}`}>
                  <Check className="h-3 w-3" /> Number
                </span>
                <span className={`flex items-center gap-1 ${passwordStats.hasSpecial ? 'text-emerald-600 font-semibold' : ''}`}>
                  <Check className="h-3 w-3" /> Symbol
                </span>
              </div>
            </div>
          )}
        </div>

        <FormInput
          label="Confirm Password"
          id="signup-confirm-password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          placeholder="Repeat your password"
          required
          autoComplete="new-password"
          icon={Lock}
          error={errors.confirmPassword}
        />

        {/* Terms checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600">
            <input
              type="checkbox"
              id="signup-terms"
              checked={agreedTerms}
              onChange={(e) => {
                setAgreedTerms(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
              }}
              className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              I agree to the{' '}
              <span className="text-indigo-600 font-medium hover:underline">Terms of Service</span> and{' '}
              <span className="text-indigo-600 font-medium hover:underline">Privacy Policy</span>.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.terms}</p>
          )}
        </div>

        {/* Create Account Button */}
        <div className="pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Creating account..."
          >
            <UserPlus className="h-4 w-4" />
            <span>Create Account</span>
          </PrimaryButton>
        </div>
      </form>

      {/* Divider */}
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-white px-3 text-slate-400">Or sign up with</span>
        </div>
      </div>

      <SocialButtons onSocialLogin={(provider) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onSuccess({
            id: 'usr_oauth_' + Math.random().toString(36).substring(2, 7),
            name: `${provider} User`,
            email: `newuser@${provider.toLowerCase()}.com`,
            role: 'Enterprise Member',
            createdAt: '2026-03-12',
            lastLogin: 'Just now',
          });
        }, 500);
      }} />

      {/* Footer Switch */}
      <div className="pt-1 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchMode('login')}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
