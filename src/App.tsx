import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Product, PRODUCTS } from './data/ecommerceData';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // E-commerce state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'audio' | 'living' | 'workspace' | 'apparel'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2500);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setLastAddedId(product.id);
    setTimeout(() => {
      setLastAddedId((current) => (current === product.id ? null : current));
    }, 1500);

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string) => {
    const isFavorited = wishlistIds.includes(productId);
    if (isFavorited) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from saved wishlist');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Saved to your wishlist');
    }
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-3 focus:py-1.5 focus:text-xs focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Semantic Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Semantic Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreProducts={scrollToProducts}
          onExploreCategories={scrollToCategories}
        />

        {/* 2. Featured Categories Section (CSS Grid) */}
        <Categories
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToProducts();
          }}
        />

        {/* 3. Featured / Popular Products Section (CSS Grid) */}
        <ProductGrid
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onQuickView={(product) => setQuickViewProduct(product)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          lastAddedId={lastAddedId}
        />

        {/* 4. Promotional Section or Banner */}
        <PromoBanner
          onShopPromo={() => {
            setActiveCategory('all');
            scrollToProducts();
          }}
        />

        {/* 5. Customer Reviews / Social Proof */}
        <Testimonials />

        {/* 6. Call-to-action & Newsletter Section */}
        <Newsletter />
      </main>

      {/* Semantic Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToProducts();
        }}
      />

      {/* Interactive Cart Drawer (<aside>) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-xs text-white shadow-lg animate-in slide-in-from-bottom-2"
        >
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-blue-300 hover:text-white font-medium flex items-center gap-1"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Cart</span>
          </button>
        </div>
      )}

    </div>
  );
}
