import React from 'react';

interface SocialButtonsProps {
  onSocialLogin?: (provider: string) => void;
  disabled?: boolean;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  onSocialLogin,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {/* Google */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSocialLogin?.('Google')}
        aria-label="Continue with Google"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-50 shadow-xs"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.4-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
          />
        </svg>
        <span className="hidden sm:inline">Google</span>
      </button>

      {/* GitHub */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSocialLogin?.('GitHub')}
        aria-label="Continue with GitHub"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-50 shadow-xs"
      >
        <svg className="h-4 w-4 fill-current text-slate-800 shrink-0" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        <span className="hidden sm:inline">GitHub</span>
      </button>

      {/* Apple */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSocialLogin?.('Apple')}
        aria-label="Continue with Apple"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-50 shadow-xs"
      >
        <svg className="h-4 w-4 fill-current text-slate-900 shrink-0" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.88-1.03 2.99 1.11.09 2.31-.65 2.97-1.45z" />
        </svg>
        <span className="hidden sm:inline">Apple</span>
      </button>
    </div>
  );
};
