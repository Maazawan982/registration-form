import React from 'react';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                L
              </span>
              <span className="text-base font-bold text-gray-900">
                Lumina Goods
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-xs">
              Quality everyday goods designed for simplicity, durability, and functional living. Crafted with care using sustainable materials.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
              Shop Collections
            </h4>
            <ul className="space-y-1.5 text-gray-500">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('all');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('audio');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Audio &amp; Headphones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('living');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home &amp; Living
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('workspace');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Workspace &amp; Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('apparel');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Modern Apparel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-1.5 text-gray-500">
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">
                  Shipping &amp; Delivery Information
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">
                  30-Day Easy Return Policy
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">
                  Order Status &amp; Tracking
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-1.5 text-gray-500">
              <li>
                <span>Email: support@luminagoods.com</span>
              </li>
              <li>
                <span>Phone: +1 (800) 555-0199</span>
              </li>
              <li>
                <span>Hours: Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM EST</span>
              </li>
              <li>
                <span>Address: 140 Market Street, San Francisco, CA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Lumina Goods Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-gray-900 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
