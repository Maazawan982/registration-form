import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/ecommerceData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 overflow-y-auto animate-in fade-in"
    >
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-lg p-6 shadow-xl text-left">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left: Product Image */}
          <div className="relative aspect-square w-full rounded-md overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Details & Add to Cart */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-blue-600">
                {product.categoryLabel}
              </span>
              <h2 id="quick-view-title" className="text-xl font-bold text-gray-900 mt-1">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500 mt-1 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="font-semibold text-gray-700 ml-1">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}.00
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}.00
                </span>
              )}
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded ml-1">
                In Stock ({product.stock})
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-900 block">Highlights:</span>
                <ul className="text-xs text-gray-600 space-y-0.5 list-disc list-inside">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-xs font-semibold transition-colors ${
                  justAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart (${product.price * quantity}.00)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
