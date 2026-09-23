import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { PrimaryButton } from '../ui/PrimaryButton';
import { AuthMode, ForgotStep } from '../../types/auth';

interface ForgotPasswordFlowProps {
  onSwitchMode: (mode: AuthMode) => void;
}

export const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  onSwitchMode,
}) => {
  const [step, setStep] = useState<ForgotStep>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [demoCode] = useState('749210');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Send Reset Link / OTP
  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid account email.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 600);
  };

  // Step 2: Verify Code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otpCode.length < 6) {
      setError('Please enter all 6 digits of the code.');
      return;
    }

    if (otpCode !== demoCode && otpCode !== '123456') {
      setError('Invalid code. Use the demo code or request a new one.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('new-password');
    }, 500);
  };

  // Step 3: Set New Password
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 600);
  };

  return (
    <div className="w-full space-y-4">
      {/* Back to Login button */}
      <button
        type="button"
        onClick={() => onSwitchMode('login')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Sign In</span>
      </button>

      {/* Error display */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
        >
          {error}
        </div>
      )}

      {/* STEP 1: Email Input */}
      {step === 'email' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Forgot Password
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Enter your account email to receive a secure recovery code.
            </p>
          </div>

          <form onSubmit={handleSendRequest} noValidate className="space-y-3.5">
            <FormInput
              label="Account Email"
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="name@company.com"
              required
              autoComplete="email"
              icon={Mail}
            />

            <div className="pt-1">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Sending code..."
              >
                <span>Send Reset Code</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2: Code Verification */}
      {step === 'code' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Enter Recovery Code
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              We sent a 6-digit verification code to <span className="text-indigo-600 font-medium">{email}</span>.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3 text-xs text-indigo-900">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Simulated Code:</span>
              <button
                type="button"
                onClick={() => setOtpCode(demoCode)}
                className="underline text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Auto-fill Code
              </button>
            </div>
            <p className="mt-1 font-mono text-sm tracking-widest text-indigo-600 font-bold">
              {demoCode}
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-3.5">
            <FormInput
              label="6-Digit Verification Code"
              id="forgot-otp"
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="749210"
              required
              icon={KeyRound}
              className="tracking-widest font-mono text-center sm:text-left text-base"
            />

            <div className="pt-1">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Verifying code..."
              >
                <span>Verify Code</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setOtpCode('');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Resend verification code</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: New Password */}
      {step === 'new-password' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Set New Password
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Create a new secure password for your account.
            </p>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-3.5">
            <FormInput
              label="New Password"
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              icon={Lock}
            />

            <FormInput
              label="Confirm New Password"
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              required
              icon={ShieldCheck}
            />

            <div className="pt-1">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Updating password..."
              >
                <span>Update Password</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 'success' && (
        <div className="py-3 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 shadow-xs">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Password Reset Complete
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your password has been updated. You can now sign in with your new credentials.
          </p>

          <div className="pt-2">
            <PrimaryButton
              type="button"
              onClick={() => onSwitchMode('login')}
            >
              <span>Proceed to Sign In</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};
