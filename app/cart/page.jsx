'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { ArrowRight, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, getCartTotals, clearCart, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const cartTotals = getCartTotals();
  const shippingCost = cartTotals.subtotal > 500000 ? 0 : 25000;
  const totalAmount = cartTotals.subtotal - promoDiscount + shippingCost;

  // Debug: Log cart data
  console.log('=== CART PAGE DEBUG ===');
  console.log('Cart Items:', cartItems);
  console.log('Cart Items Length:', cartItems.length);
  console.log('Cart Totals:', cartTotals);
  console.log('LocalStorage Cart:', localStorage.getItem('homedecor_cart'));
  console.log('=== END CART DEBUG ===');

  const formatPrice = (price) => {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const handleQuantityChange = (itemId, newQuantity, attributes = {}) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, attributes);
    } else {
      updateQuantity(itemId, newQuantity, attributes);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/checkout');
    }
  };

  const applyPromoCode = () => {
    // Simple promo code logic
    const promoCodes = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'WELCOME': 0.15
    };

    const discount = promoCodes[promoCode.toUpperCase()] || 0;
    setPromoDiscount(discount * cartTotals.subtotal);
  };

  const clearCartHandler = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-light mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven&apos;t added any products yet</p>

          {/* Debug Information */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm font-medium mb-2">Debug Information:</p>
            <p className="text-xs text-gray-600 mb-1">Cart Items: {cartItems.length}</p>
            <p className="text-xs text-gray-600 mb-1">LocalStorage: {localStorage.getItem('homedecor_cart') ? 'Has data' : 'Empty'}</p>
            <details className="text-xs">
              <summary className="cursor-pointer text-blue-600">Raw LocalStorage Data</summary>
              <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-32">
                {localStorage.getItem('homedecor_cart') || 'No data'}
              </pre>
            </details>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>

            {/* Test button to add dummy data */}
            <button
              onClick={() => {
                const testItem = {
                  id: 'test-123',
                  name: 'Test Product',
                  price: 100000,
                  sale_price: 80000,
                  regular_price: 100000,
                  images: [{ src: '/placeholder-product.jpg' }],
                  sku: 'TEST-001',
                  quantity: 1,
                  addedAt: new Date().toISOString()
                };

                // Manually add to localStorage
                const currentCart = JSON.parse(localStorage.getItem('homedecor_cart') || '[]');
                currentCart.push(testItem);
                localStorage.setItem('homedecor_cart', JSON.stringify(currentCart));

                // Force page reload
                window.location.reload();
              }}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Test Product to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-light">Shopping Cart ({cartTotals.totalItems} items)</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-medium">Products</h2>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCartHandler}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${JSON.stringify(item.attributes)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images?.[0]?.src ? (
                          <Image
                            src={item.images[0].src}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBag size={32} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.sku && item.sku !== "N/A" && (
                              <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.attributes)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-2">
                          {item.sale_price && item.sale_price < (item.regular_price || item.price) ? (
                            <>
                              <span className="font-medium text-lg">
                                {formatPrice(item.sale_price)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(item.regular_price || item.price)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-lg">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.attributes)}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.attributes)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <span className="text-sm text-gray-600">
                            Total: {formatPrice((item.sale_price || item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(cartTotals.subtotal)}</span>
                </div>

                {/* Promo Code */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {promoDiscount > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      Discount applied: -{formatPrice(promoDiscount)}
                    </p>
                  )}
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                {cartTotals.subtotal < 500000 && (
                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    🎁 Add Rp {(500000 - cartTotals.subtotal).toLocaleString("id-ID")} more for free shipping!
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
