import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onShopPromo: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopPromo }) => {
  const [copied, setCopied] = useState(false);
  
  // Simple countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAVE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="promotions" className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Simple Clean Navy Promo Card */}
        <div className="bg-slate-900 rounded-lg p-6 sm:p-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & Coupon */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
                Seasonal Promotion
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Spring Flash Sale: Save 20% Storewide
              </h2>

              <p className="text-sm text-gray-300 max-w-lg leading-relaxed">
                Refresh your home and workspace with our handcrafted essentials. Apply discount code at checkout for immediate 20% savings.
              </p>

              {/* Coupon Box */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-2">
                  <span className="text-xs text-gray-400">Code:</span>
                  <span className="font-mono text-sm font-bold text-yellow-300">
                    SAVE20
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="ml-2 bg-slate-700 hover:bg-slate-600 text-white p-1 rounded transition-colors"
                    title="Copy promo code"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {copied && (
                  <span className="text-xs text-green-400 font-medium">
                    Code copied to clipboard!
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Simple Countdown & Button */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-4">
              <div className="text-left lg:text-right space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span>Offer ends in:</span>
                </div>

                {/* 3 boxes for timer */}
                <div className="flex items-center gap-2">
                  <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 text-center w-14">
                    <span className="block font-mono text-xl font-bold text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase">Hours</span>
                  </div>
                  <span className="text-gray-500 font-bold">:</span>
                  <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 text-center w-14">
                    <span className="block font-mono text-xl font-bold text-white">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase">Mins</span>
                  </div>
                  <span className="text-gray-500 font-bold">:</span>
                  <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 text-center w-14">
                    <span className="block font-mono text-xl font-bold text-yellow-300">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase">Secs</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onShopPromo}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors"
              >
                <span>Shop Sale Items</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
