import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-12 md:py-16 bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-4">
        
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Sign up to receive updates about new product launches, special seasonal promotions, and subscriber-only discounts.
        </p>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <span>Thank you for subscribing! We sent a confirmation to <strong>{email}</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-600 text-left font-medium">
                {error}
              </p>
            )}

            <p className="text-[11px] text-gray-400 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
