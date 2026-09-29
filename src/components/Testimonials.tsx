import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/ecommerceData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-12 md:py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real feedback from satisfied customers worldwide
          </p>
        </div>

        {/* 3 simple review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-9 w-9 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{t.author}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <span>{t.role}</span>
                    <span className="text-green-600 font-medium flex items-center gap-0.5 ml-1">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
