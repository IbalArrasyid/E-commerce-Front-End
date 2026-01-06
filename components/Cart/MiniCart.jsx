"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ShoppingBag
} from "lucide-react";

export default function MiniCart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  maxItems = 3
}) {
  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const price = item.sale_price || item.price || 0;
    return total + (price * item.quantity);
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const displayItems = items.slice(0, maxItems);
  const hasMoreItems = items.length > maxItems;

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
    onCheckout?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Mini Cart Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gray-700" />
                <span className="font-semibold text-gray-900">
                  Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <ShoppingCart size={48} className="mx-auto mb-4" />
                  <p className="text-sm font-medium mb-2">Your cart is empty</p>
                  <p className="text-xs">Add some products to get started!</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {displayItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images?.[0]?.src || '/placeholder-product.jpg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {formatPrice(item.sale_price || item.price || 0)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1, item.attributes)}
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1, item.attributes)}
                              className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id, item.attributes)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Show More Items Indicator */}
                  {hasMoreItems && (
                    <div className="text-center py-2">
                      <button
                        onClick={onClose}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View all {items.length} items
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  Checkout
                  <ChevronRight size={16} />
                </button>

                {/* View Cart Link */}
                <button
                  onClick={onClose}
                  className="w-full py-2 text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  View Cart Details
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}