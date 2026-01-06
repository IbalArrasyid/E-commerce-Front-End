"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  Heart,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

export default function CartSidebar({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onMoveToWishlist
}) {
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const price = item.sale_price || item.price || 0;
    return total + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 500000 ? 0 : 25000; // Free shipping over 500k
  const discount = 0; // Calculate discount based on promo code
  const total = subtotal + shipping - discount;

  const formatPrice = (price) => {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const updateItemQuantity = (itemId, newQuantity, attributes = {}) => {
    if (newQuantity > 0) {
      onUpdateQuantity?.(itemId, newQuantity, attributes);
    }
  };

  const removeItem = (itemId, attributes = {}) => {
    onRemoveItem?.(itemId, attributes);
  };

  const handleCheckout = () => {
    onCheckout?.(items, total);
    onClose();
  };

  const moveToWishlist = (item) => {
    onMoveToWishlist?.(item);
    removeItem(item.id, item.attributes);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={24} className="text-gray-700" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
                  <p className="text-sm text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                  <ShoppingBag size={64} className="mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-sm text-center mb-4">
                    Add some products to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${JSON.stringify(item.attributes)}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images?.[0]?.src || '/placeholder-product.jpg'}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {formatPrice(item.sale_price || item.price || 0)}
                          </p>

                          {/* Attributes */}
                          {item.attributes && Object.keys(item.attributes).length > 0 && (
                            <div className="text-xs text-gray-500 mb-2">
                              {Object.entries(item.attributes).map(([key, value]) => (
                                <span key={key} className="mr-2">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Quantity and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1, item.attributes)}
                                disabled={item.quantity <= 1}
                                className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1, item.attributes)}
                                className="p-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => moveToWishlist(item)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Move to wishlist"
                              >
                                <Heart size={16} />
                              </button>
                              <button
                                onClick={() => removeItem(item.id, item.attributes)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Subtotal</span>
                          <span className="font-semibold">
                            {formatPrice((item.sale_price || item.price || 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Promo Code */}
                <div>
                  {!showPromoInput ? (
                    <button
                      onClick={() => setShowPromoInput(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      + Add promo code
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                      />
                      <button
                        onClick={() => setShowPromoInput(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 500000 && (
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                    <Truck size={16} className="text-blue-600" />
                    <p className="text-xs text-blue-800">
                      Add {formatPrice(500000 - subtotal)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Shield size={14} />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Truck size={14} />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <RotateCcw size={14} />
                    <span>30-Day Returns</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ChevronRight size={18} />
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full py-2 text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}