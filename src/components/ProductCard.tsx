import React from 'react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../data/ecommerceData';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  isAddedJustNow = false,
}) => {
  return (
    <article className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-3.5 transition-all hover:border-gray-300 hover:shadow-sm text-left">
      
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-200"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product.id)}
          className={`absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs transition-colors ${
            isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 hover:bg-white text-gray-800 text-xs font-semibold py-1.5 px-3 rounded border border-gray-200 shadow-xs flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Info Details */}
      <div className="flex flex-1 flex-col justify-between pt-3 space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium text-[11px] text-blue-600">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span className="font-semibold text-gray-700 text-xs">{product.rating}</span>
              <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-semibold text-gray-900 text-sm mt-1 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-bold text-gray-900">
              ${product.price}.00
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                ${product.originalPrice}.00
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              isAddedJustNow
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAddedJustNow ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </article>
  );
};
