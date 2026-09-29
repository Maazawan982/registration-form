import React from 'react';
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onExploreCategories: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onExploreCategories,
}) => {
  return (
    <section 
      id="hero" 
      className="bg-gray-50 border-b border-gray-200 py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-column flexbox/grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="space-y-5 text-left">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              New Collection 2026
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Quality Essentials for Work &amp; Everyday Living
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              Explore our curated selection of high-fidelity audio, minimal desk accessories, and modern home essentials crafted with durable, honest materials.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md text-sm transition-colors"
              >
                <span>Shop All Products</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExploreCategories}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium px-5 py-2.5 rounded-md text-sm border border-gray-300 transition-colors"
              >
                <span>Browse Categories</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div className="flex justify-center">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm max-w-md w-full">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Aura Studio Wireless ANC Headphones"
                className="w-full h-64 sm:h-72 object-cover rounded-md"
              />
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <span className="text-xs text-blue-600 font-semibold">Featured Item</span>
                  <h3 className="text-sm font-bold text-gray-900">Aura Studio ANC Headphones</h3>
                  <p className="text-xs text-gray-500 font-medium">$249.00 <span className="line-through text-gray-400 ml-1">$329.00</span></p>
                </div>
                <button
                  type="button"
                  onClick={onExploreProducts}
                  className="bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                >
                  View Item
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Value Propositions */}
        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 bg-white border border-gray-200 p-4 rounded-md">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-md shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Free Standard Shipping</h4>
              <p className="text-xs text-gray-500">On all studio orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white border border-gray-200 p-4 rounded-md">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-md shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">30-Day Easy Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white border border-gray-200 p-4 rounded-md">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-md shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Secure Payments</h4>
              <p className="text-xs text-gray-500">256-bit encrypted checkout</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
