'use client';

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTag, FaStar } from 'react-icons/fa';

/**
 * Formats a number into Indonesian Rupiah currency format
 * @param {number} value - The numeric value to format
 * @returns {string} - Formatted currency string (e.g., "Rp 1.000.000")
 */
const formatIDR = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

/**
 * ProductCardSlider - A carousel component for displaying product cards
 *
 * @param {Object[]} products - Array of product objects to display
 * @param {string} products[].item_name - Name of the product
 * @param {string} products[].item_description - Description of the product
 * @param {string} products[].brand - Brand name
 * @param {string[]} products[].images - Array of image URLs
 * @param {Object} products[].prices - Price object with sale_price and full_price
 * @param {Object[]} products[].user_reviews - Array of user reviews with rating
 */
const ProductCardSlider = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when product changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentIndex]);

  // Handle edge case: no products
  if (!products || products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  // Navigation handlers
  const goToPreviousProduct = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNextProduct = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentProduct.images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const hasMultipleImages = currentProduct.images && currentProduct.images.length > 1;
  const hasReviews = currentProduct.user_reviews && currentProduct.user_reviews.length > 0;
  const rating = hasReviews ? currentProduct.user_reviews[0].rating : 0;

  return (
    <div className="mt-3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center">
        {/* Image Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow transition-colors"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-slate-700" />
            </button>

            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow transition-colors"
              aria-label="Next image"
            >
              <FaChevronRight className="text-slate-700" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {currentProduct.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full cursor-pointer transition-all ${
                  idx === currentImageIndex ? 'w-5 bg-slate-700' : 'w-1.5 bg-slate-300'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Sale Badge */}
        {currentProduct.prices?.sale_price &&
          currentProduct.prices.full_price &&
          currentProduct.prices.sale_price < currentProduct.prices.full_price && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <FaTag className="text-xs" />
              SALE
            </div>
          )}

        {/* Product Image or Placeholder */}
        {currentProduct.images && currentProduct.images.length > 0 ? (
          <img
            src={currentProduct.images[currentImageIndex]}
            alt={currentProduct.item_name || 'Product'}
            className="w-full h-full object-cover transition-all duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`text-6xl ${currentProduct.images?.length > 0 ? 'hidden' : ''}`}>
          🛋️
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4">
        {/* Product Name */}
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-gray-800 text-sm line-clamp-2 flex-1 pr-2">
            {currentProduct.item_name || 'Product Name'}
          </h4>
        </div>

        {/* Product Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {currentProduct.item_description || 'Product description'}
        </p>

        {/* Brand */}
        <div className="text-xs text-gray-500 mb-2">
          Brand:{' '}
          <span className="font-semibold text-gray-700">
            {currentProduct.brand || 'Unknown'}
          </span>
        </div>

        {/* Rating */}
        {hasReviews && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${i < Math.round(rating) ? '' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({rating}/5)</span>
          </div>
        )}

        {/* Prices */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            {formatIDR(currentProduct.prices?.sale_price || 0)}
          </span>
          {currentProduct.prices?.full_price &&
            currentProduct.prices.sale_price < currentProduct.prices.full_price && (
              <span className="text-sm text-gray-400 line-through">
                {formatIDR(currentProduct.prices.full_price)}
              </span>
            )}
        </div>

        {/* Product Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={goToPreviousProduct}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="Previous product"
          >
            <FaChevronLeft className="text-sm text-slate-700" />
          </button>

          {/* Product Indicators */}
          <div className="flex gap-1">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-slate-700' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNextProduct}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="Next product"
          >
            <FaChevronRight className="text-sm text-slate-700" />
          </button>
        </div>

        {/* Product Counter */}
        <div className="text-center text-xs text-gray-500 mt-2">
          {currentIndex + 1} of {products.length}
        </div>
      </div>
    </div>
  );
};

export default ProductCardSlider;
