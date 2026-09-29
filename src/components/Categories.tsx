import React from 'react';
import { CATEGORIES, Category } from '../data/ecommerceData';

interface CategoriesProps {
  activeCategory: string;
  onSelectCategory: (slug: 'all' | 'audio' | 'living' | 'workspace' | 'apparel') => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Featured Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a category to filter through our latest products
            </p>
          </div>
        </div>

        {/* 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat: Category) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  const el = document.getElementById('products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-lg border overflow-hidden bg-white transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-100 shadow-sm'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">
                      {cat.itemCount} items
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
