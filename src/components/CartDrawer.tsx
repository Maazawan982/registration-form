import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/ecommerceData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountMultiplier = appliedPromo === 'SAVE20' ? 0.2 : 0;
  const discountAmount = rawSubtotal * discountMultiplier;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 5;
  const estimatedTax = subtotalAfterDiscount * 0.08;
  const orderTotal = subtotalAfterDiscount + shippingFee + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === 'SAVE20') {
      setAppliedPromo('SAVE20');
      setPromoError(null);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "SAVE20" for 20% off.');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-in fade-in"
    >
      <div className="w-full max-w-md h-full bg-white flex flex-col shadow-xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">
              Your Shopping Cart
            </h2>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Alert */}
        {items.length > 0 && (
          <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-100 text-xs text-blue-900">
            {isFreeShipping ? (
              <span className="font-semibold text-green-700">✓ You have qualified for FREE standard shipping!</span>
            ) : (
              <span>Add ${(freeShippingThreshold - subtotalAfterDiscount).toFixed(2)} more to qualify for <strong>Free Shipping</strong>!</span>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orderComplete ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Order Placed Successfully!</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Thank you for your purchase. We have received your order and sent a confirmation receipt to your email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-medium text-gray-500">Your cart is currently empty.</p>
              <button
                type="button"
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Start Browsing Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded object-cover border border-gray-200 bg-white"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">
                    ${item.product.price}.00
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-gray-600 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-xs text-gray-900">
                  ${item.product.price * item.quantity}.00
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {!orderComplete && items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Discount code (SAVE20)"
                className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
              >
                Apply
              </button>
            </form>

            {promoError && (
              <p className="text-[11px] text-red-600">{promoError}</p>
            )}

            {appliedPromo && (
              <p className="text-[11px] text-green-600 font-semibold">
                ✓ Coupon "{appliedPromo}" applied: 20% off
              </p>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount (20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isCheckingOut ? 'Processing Order...' : 'Proceed to Checkout'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
