import React, { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordFlow } from './components/auth/ForgotPasswordFlow';
import { AuthMode, UserProfile } from './types/auth';
import { CheckCircle2, LogOut, ExternalLink } from 'lucide-react';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex items-center justify-center p-4 sm:p-6">
      
      {/* Main Form Container */}
      <div className="w-full max-w-md">
        
        {currentUser ? (
          /* Authenticated Success Screen */
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Welcome, {currentUser.name}!
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                You are successfully signed in.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-left text-xs text-slate-700 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-emerald-700 font-semibold">{currentUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span>{currentUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session ID:</span>
                <span className="text-indigo-600 font-semibold">{currentUser.id}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => alert(`Redirecting to workspace for ${currentUser.email}...`)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Go to Workspace</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentUser(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Form Card (same white color) */
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
            
            {/* Navigation Tabs */}
            <div className="flex items-center justify-center border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs border border-slate-200/80 w-full">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    authMode === 'login'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    authMode === 'signup'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    authMode === 'forgot'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Forgot Password
                </button>
              </div>
            </div>

            {/* Active Form */}
            {authMode === 'login' && (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchMode={(mode) => setAuthMode(mode)}
              />
            )}

            {authMode === 'signup' && (
              <SignupForm
                onSuccess={handleAuthSuccess}
                onSwitchMode={(mode) => setAuthMode(mode)}
              />
            )}

            {authMode === 'forgot' && (
              <ForgotPasswordFlow
                onSwitchMode={(mode) => setAuthMode(mode)}
              />
            )}

          </div>
        )}

      </div>

    </div>
  );
}
