"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/Product/ProductCard";
import QuickViewModal from "@/components/Product/QuickViewModal";
import CompareModal from "@/components/Compare/CompareModal";
import { useCart } from "@/hooks/useCart";
import { useCompare } from "@/hooks/useCompare";

// Global state for compare and quick view
let globalCompareState = [];
let globalQuickViewState = null;

const updateGlobalCompare = (callback) => {
  globalCompareState = callback(globalCompareState);
  window.dispatchEvent(new CustomEvent('compareUpdate', { detail: globalCompareState }));
};


const updateGlobalQuickView = (product) => {
  globalQuickViewState = product;
  window.dispatchEvent(new CustomEvent('quickViewUpdate', { detail: product }));
};

export default function ProductsGrid({ products = [], viewMode = "grid", onProductClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuickViewModal, setShowQuickViewModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const perPage = 12;

  // Use the enhanced cart and compare hooks
  const { addToCart, updateQuantity, removeFromCart } = useCart();
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
    isInCompare
  } = useCompare();

  if (!products || products.length === 0) return null;

  // Sort products alphabetically by name
  const sortedProducts = [...products].sort((a, b) =>
    a.name?.localeCompare(b.name) || 0
  );

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + perPage);

  // Quick view functions
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickViewModal(true);
  };

  const closeQuickView = () => {
    setShowQuickViewModal(false);
    setQuickViewProduct(null);
  };

  // Show compare modal
  const handleShowCompareModal = () => {
    if (compareItems.length > 0) {
      setShowCompareModal(true);
    }
  };

  // Product click handler
  const handleProductClick = (product) => {
    onProductClick?.(product);
  };

  // Add to cart function (using enhanced hook)
  const handleAddToCart = (product, quantity = 1, attributes = {}) => {
    const success = addToCart(product, quantity, attributes);

    if (success) {
      // Emit event for CartManager to show notification
      window.dispatchEvent(new CustomEvent('addToCart', {
        detail: { product, quantity, attributes }
      }));
    }

    return success;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Enhanced Compare Bar */}
      {compareItems.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{compareItems.length} product(s) selected</span>
              <div className="flex gap-2">
                {compareItems.map(product => (
                  <div key={product.id} className="relative group">
                    <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden border-2 border-transparent group-hover:border-blue-300 transition-colors">
                      <Image
                        src={product.images?.[0]?.src || '/placeholder-product.jpg'}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              {compareItems.length < 4 && (
                <span className="text-xs text-gray-500">
                  Add {4 - compareItems.length} more to compare
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCompare}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleShowCompareModal}
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Compare Now
                <ArrowUpDown size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid atau List produk */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              isInCompare={isInCompare(product.id)}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              isInCompare={isInCompare(product.id)}
              viewMode="list"
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${currentPage === page
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Enhanced Compare Modal */}
      <CompareModal
        products={compareItems}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        onAddToCart={addToCart}
        onRemoveFromCompare={removeFromCompare}
        onClearCompare={clearCompare}
      />

      {/* Enhanced Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={showQuickViewModal}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
        onAddToWishlist={(product, isWishlisted) => {
          // Handle wishlist functionality
          console.log('Wishlist toggle:', product.name, isWishlisted);
        }}
      />
    </div>
  );
}
