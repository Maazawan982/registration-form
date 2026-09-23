import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { PrimaryButton } from '../ui/PrimaryButton';

interface SignupFormProps {
  onSuccess: (name: string) => void;
  onSwitchMode: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onSwitchMode }) => {
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
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Please enter a password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess(name.trim());
  };

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Sign Up
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your details to create an account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormInput
          label="Full Name"
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="John Doe"
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
          placeholder="name@example.com"
          required
          autoComplete="email"
          icon={Mail}
          error={errors.email}
        />

        <FormInput
          label="Password"
          id="signup-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="At least 6 characters"
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

        <div className="pt-1">
          <PrimaryButton type="submit">
            Create Account
          </PrimaryButton>
        </div>
      </form>

      <div className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};
