"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart, X, Plus } from "lucide-react";

export default function AddToCartNotification({
  product,
  quantity,
  isVisible,
  onClose,
  onGoToCart,
  onContinueShopping
}) {
  if (!product || !isVisible) return null;

  const formatPrice = (price) => {
    return price ? `Rp ${Number(price).toLocaleString("id-ID")}` : "Rp 0";
  };

  const totalPrice = (product.sale_price || product.price || 0) * quantity;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8
        }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-4 min-w-[320px]">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Added to Cart!</h3>
                <p className="text-sm text-gray-600">Item successfully added</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Product Details */}
          <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product.images?.[0]?.src || '/placeholder-product.jpg'}
                alt={product.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                {product.name}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Qty: {quantity}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onContinueShopping}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={onGoToCart}
              className="flex-1 py-2 px-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingCart size={16} />
              View Cart
            </button>
          </div>

          {/* Auto-progress indicator */}
          <div className="mt-3">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-black"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}