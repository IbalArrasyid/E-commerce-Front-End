"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Heart,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Shield
} from "lucide-react";

export default function ShoppingCartDropdown({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [expandedItems, setExpandedItems] = useState(new Set());
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

  const toggleItemExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  const removeItem = (itemId) => {
    onRemoveItem?.(itemId);
  };

  const handleCheckout = () => {
    onCheckout?.(items, total);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Cart Dropdown */}
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingCart size={24} />
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              {items.length > 0 && (
                <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Package size={64} className="mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-center">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 space-y-3"
                  >
                    {/* Item Header */}
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images?.[0]?.src || '/placeholder-product.jpg'}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {formatPrice(item.sale_price || item.price || 0)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Details (Expandable) */}
                    {item.attributes && Object.keys(item.attributes).length > 0 && (
                      <div className="border-t pt-3">
                        <button
                          onClick={() => toggleItemExpanded(item.id)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <span>View details</span>
                          {expandedItems.has(item.id) ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedItems.has(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 space-y-1 text-sm">
                                {Object.entries(item.attributes).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-gray-600">{key}:</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Item Subtotal */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-semibold">
                        {formatPrice((item.sale_price || item.price || 0) * item.quantity)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
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
                  <Heart size={14} />
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Proceed to Checkout
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
      </div>
    </AnimatePresence>
  );
}