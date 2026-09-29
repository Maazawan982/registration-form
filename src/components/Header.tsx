import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Check, Copy } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (category: 'all' | 'audio' | 'living' | 'workspace' | 'apparel') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyPromoCode = () => {
    navigator.clipboard.writeText('SAVE20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const navLinks = [
    { label: 'All Products', slug: 'all' as const },
    { label: 'Audio', slug: 'audio' as const },
    { label: 'Home & Living', slug: 'living' as const },
    { label: 'Workspace', slug: 'workspace' as const },
    { label: 'Apparel', slug: 'apparel' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      {/* Simple Top Announcement Bar */}
      <div className="bg-gray-900 text-gray-100 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-white">Special Offer:</span>
            <span className="text-gray-300">Get 20% off your entire order with code</span>
            <button
              type="button"
              onClick={copyPromoCode}
              className="inline-flex items-center gap-1 font-bold text-yellow-300 hover:text-yellow-200 underline cursor-pointer"
              title="Click to copy code"
            >
              SAVE20
              {copiedCode && <Check className="h-3 w-3 text-green-400" />}
            </button>
          </div>

          <div className="hidden md:flex items-center text-gray-300 text-xs">
            <span>Free shipping on all orders over $50</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#hero" className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                L
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Lumina Goods
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeCategory === link.slug;
                return (
                  <button
                    key={link.slug}
                    type="button"
                    onClick={() => {
                      onSelectCategory(link.slug);
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search bar & Cart */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-md text-sm font-medium transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-blue-700 font-bold px-1.5 py-0.2 rounded-full text-xs min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search bar */}
        <div className="sm:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1">
            Categories
          </p>
          {navLinks.map((link) => (
            <button
              key={link.slug}
              type="button"
              onClick={() => {
                onSelectCategory(link.slug);
                setMobileMenuOpen(false);
                const el = document.getElementById('products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                activeCategory === link.slug
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
