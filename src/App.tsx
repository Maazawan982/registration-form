import React, { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { AuthMode } from './types/auth';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleLoginSuccess = (email: string) => {
    setPopupMessage(`Login successfully! Welcome back ${email}.`);
  };

  const handleSignupSuccess = (name: string) => {
    setPopupMessage(`Account created successfully! Welcome, ${name}.`);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex items-center justify-center p-4 sm:p-6">
      
      {/* Centered Form Card */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
        
        {/* 2 Tabs: Login & Sign Up */}
        <div className="flex items-center justify-center border-b border-slate-100 pb-3 mb-6">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs border border-slate-200/80 w-full">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Active Form */}
        {authMode === 'login' ? (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onSwitchMode={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm
            onSuccess={handleSignupSuccess}
            onSwitchMode={() => setAuthMode('login')}
          />
        )}

      </div>

      {/* Success Popup Message Modal */}
      {popupMessage && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4"
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <button
              type="button"
              onClick={() => setPopupMessage(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Success
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {popupMessage}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setPopupMessage(null)}
                className="w-full rounded-xl bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
