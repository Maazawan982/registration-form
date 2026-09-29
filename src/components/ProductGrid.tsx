import React, { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/ecommerceData';
import { ProductCard } from './ProductCard';
import { Search, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  activeCategory: string;
  onSelectCategory: (category: 'all' | 'audio' | 'living' | 'workspace' | 'apparel') => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  lastAddedId: string | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onAddToCart,
  onQuickView,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  wishlistIds,
  onToggleWishlist,
  lastAddedId,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filterTabs = [
    { label: 'All Products', slug: 'all' as const },
    { label: 'Audio', slug: 'audio' as const },
    { label: 'Home & Living', slug: 'living' as const },
    { label: 'Workspace', slug: 'workspace' as const },
    { label: 'Apparel', slug: 'apparel' as const },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-12 md:py-16 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Popular Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse our handcrafted collection of durable essentials
            </p>
          </div>

          <div className="text-xs text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> items
          </div>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {filterTabs.map((tab) => {
              const isSelected = activeCategory === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => onSelectCategory(tab.slug)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <label htmlFor="sort-dropdown" className="text-gray-500 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-md text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <span>Search results for: <strong>"{searchQuery}"</strong></span>
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              className="text-blue-700 font-semibold underline hover:text-blue-900"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Products Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                isAddedJustNow={lastAddedId === product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-base font-semibold text-gray-700">No products found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your category or search keywords.</p>
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectCategory('all');
              }}
              className="mt-4 inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-md"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
