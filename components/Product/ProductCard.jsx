"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/hooks/useCompare";
import {
  RefreshCw,
  Eye,
  Handbag,
  ShoppingCart,
  Heart,
  Share2
} from "lucide-react";

function HoverButton({ children, label, onClick, isActive, size = "default", disabled = false }) {
  const [hoveredButton, setHoveredButton] = useState(null);

  const sizeClasses = {
    default: "p-2",
    small: "p-1.5"
  };

  const iconSizes = {
    default: 18,
    small: 16
  };

  const getButtonStyles = () => {
    const baseClasses = `flex items-center gap-2 rounded-full ${sizeClasses[size]} shadow-md overflow-hidden transition-all duration-300`;

    if (disabled) {
      return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`;
    }

    if (isActive) {
      return `${baseClasses} bg-blue-500 text-white`;
    }

    if (hoveredButton === label) {
      return `${baseClasses} bg-black text-white transform scale-105`;
    }

    return `${baseClasses} bg-white text-black hover:transform hover:scale-105`;
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={getButtonStyles()}
      onMouseEnter={() => !disabled && setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      aria-label={label}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <AnimatePresence>
        {hoveredButton === label && (
          <motion.span
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: "auto", opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="whitespace-nowrap text-sm"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onQuickView,
  onAddToCart,
  onAddToWishlist,
  onShare,
  onProductClick,
  isWishlisted = false,
  showActions = true,
  showWishlist = false,
  showShare = false,
  className = ""
}) {
  const [hover, setHover] = useState(false);
  const [localWishlist, setLocalWishlist] = useState(isWishlisted);

  // Use global compare state
  const { isInCompare, toggleCompare, isCompareFull } = useCompare();
  const isCurrentlyCompared = product ? isInCompare(product.id) : false;

  // Handle product images
  const mainImg = product.images?.[0]?.src;
  const secondImg = product.images?.[1]?.src || mainImg;
  const hasMultipleImages = product.images?.length > 1;

  // Format price
  const formatPrice = (price) => {
    return price ? `Rp ${Number(price).toLocaleString("id-ID")}` : "Rp 0";
  };

  // Calculate discount percentage
  const calculateDiscountPercentage = (salePrice, regularPrice) => {
    if (!salePrice || !regularPrice || salePrice >= regularPrice) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  // Get price values - handle WooCommerce price structure (regular_price, sale_price)
  const getPrices = () => {
    // Debug: log the product price data
    console.log('Product price data for:', product.name, {
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale
    });

    // Use WooCommerce field names: regular_price and sale_price
    const regularPrice = product.regular_price || product.price;
    const salePrice = product.sale_price;
    const hasDiscount = product.on_sale && salePrice && Number(salePrice) < Number(regularPrice);

    console.log('Calculated prices:', {
      regularPrice,
      salePrice,
      hasDiscount
    });

    return {
      regularPrice,
      salePrice,
      hasDiscount
    };
  };

  // Handle button actions
  const handleProductClick = (e) => {
    // Prevent navigation when clicking on action buttons
    if (e.target.closest('button')) {
      return;
    }

    if (product?.slug) {
      onProductClick?.(product);
    }
  };

  const handleCompare = () => {
    if (!product) return;

    try {
      toggleCompare(product);
    } catch (error) {
      if (error.message.includes('Maximum')) {
        alert('Maximum 4 products can be compared. Please remove a product first.');
      }
    }
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleWishlist = () => {
    setLocalWishlist(!localWishlist);
    onAddToWishlist?.(product, !localWishlist);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description?.substring(0, 100),
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    onShare?.(product);
  };

  // List view component
  if (viewMode === "list") {
    return (
      <motion.div
        className={`bg-white border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${className}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleProductClick}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-48 h-48 bg-white flex items-center justify-center overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              {mainImg && (
                <motion.div
                  key={hover && hasMultipleImages ? product.images?.[1]?.id : product.images?.[0]?.id}
                  initial={{ opacity: .5 }}
                  animate={{ scale: hover ? 1.05 : 1, opacity: 1 }}
                  exit={{ opacity: .5 }}
                  transition={{ duration: .3, ease: "easeOut" }}
                >
                  <Image
                    src={hover && hasMultipleImages ? secondImg : mainImg}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full transition-all duration-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons for list view */}
            {showActions && hover && (
              <AnimatePresence>
                <motion.div
                  className="absolute top-2 right-2 flex flex-col items-end gap-2 z-10"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ duration: .3, ease: "easeOut" }}
                >
                  <HoverButton
                    label={isCurrentlyCompared ? "Remove" : "Compare"}
                    onClick={handleCompare}
                    isActive={isCurrentlyCompared}
                    size="small"
                  >
                    <RefreshCw size={14} />
                  </HoverButton>
                  <HoverButton
                    label="Quick view"
                    onClick={handleQuickView}
                    size="small"
                  >
                    <Eye size={15} />
                  </HoverButton>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium leading-tight mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description || 'Premium quality product with excellent craftsmanship and design.'}
              </p>

              {/* Product details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {product.sku && (
                  <div>
                    <span className="font-medium">SKU:</span> {product.sku}
                  </div>
                )}
                <div>
                  <span className="font-medium">Stock:</span>{' '}
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price and actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center text-lg">
                {(() => {
                  const { regularPrice, salePrice, hasDiscount } = getPrices();
                  console.log('List view rendering:', { regularPrice, salePrice, hasDiscount });

                  if (hasDiscount) {
                    const discountPercent = calculateDiscountPercentage(salePrice, regularPrice);
                    console.log('Rendering discount in list:', discountPercent);

                    return (
                      <>
                        <span className="line-through text-gray-400">
                          {formatPrice(regularPrice)}
                        </span>
                        <span className="text-black font-medium">
                          {formatPrice(salePrice)}
                        </span>
                        {discountPercent > 0 && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{discountPercent}%
                          </span>
                        )}
                      </>
                    );
                  } else {
                    console.log('Rendering regular price in list:', regularPrice);
                    return (
                      <span className="text-black font-medium">
                        {formatPrice(regularPrice)}
                      </span>
                    );
                  }
                })()}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                {showWishlist && (
                  <button
                    onClick={handleWishlist}
                    className={`p-2 border rounded-lg hover:bg-gray-50 transition-colors ${
                      localWishlist ? "bg-red-50 border-red-200 text-red-500" : "border-gray-300"
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={localWishlist ? "currentColor" : "none"} />
                  </button>
                )}

                {showShare && (
                  <button
                    onClick={handleShare}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view component
  return (
    <motion.div
      className={`p-4 cursor-pointer ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-72 bg-white flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {mainImg && (
            <motion.div
              key={hover && hasMultipleImages ? product.images?.[1]?.id : product.images?.[0]?.id}
              initial={{ opacity: .5 }}
              animate={{ scale: hover ? 1.05 : 1, opacity: 1 }}
              exit={{ opacity: .5 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <Image
                src={hover && hasMultipleImages ? secondImg : mainImg}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-full transition-all duration-300"
              />
            </motion.div>
          )}
        </AnimatePresence>

                    {/* Enhanced Hover Action Buttons */}
        {showActions && hover && (
          <AnimatePresence>
            <motion.div
              className="absolute top-1/4 right-2 flex flex-col items-end gap-2 z-10"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <HoverButton
                label={isCurrentlyCompared ? "Remove" : "Compare"}
                onClick={handleCompare}
                isActive={isCurrentlyCompared}
                disabled={!product}
              >
                <RefreshCw
                  size={18}
                  className={isCurrentlyCompared ? 'text-white' : ''}
                />
              </HoverButton>
              <HoverButton
                label="Quick view"
                onClick={handleQuickView}
                disabled={!product}
              >
                <Eye size={19} />
              </HoverButton>
              <HoverButton
                label="Add to cart"
                onClick={handleAddToCart}
                disabled={product.stock_status === 'outofstock' || !product}
              >
                <Handbag size={18} />
              </HoverButton>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Compare Badge - Always visible when product is in compare */}
        {isCurrentlyCompared && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-20"
          >
            <RefreshCw size={12} />
            Comparing
          </motion.div>
        )}

        {/* Wishlist and Share buttons */}
        {(showWishlist || showShare) && (
          <div className="absolute top-2 left-2 flex gap-2">
            {showWishlist && (
              <button
                onClick={handleWishlist}
                className={`p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors ${
                  localWishlist ? "text-red-500" : "text-gray-600"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} fill={localWishlist ? "currentColor" : "none"} />
              </button>
            )}
            {showShare && (
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors text-gray-600"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            )}
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-sm font-medium leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap gap-2 items-center text-base">
          {(() => {
            const { regularPrice, salePrice, hasDiscount } = getPrices();
            console.log('Grid view rendering:', { regularPrice, salePrice, hasDiscount });

            if (hasDiscount) {
              const discountPercent = calculateDiscountPercentage(salePrice, regularPrice);
              console.log('Rendering discount:', discountPercent);

              return (
                <>
                  <span className="line-through text-gray-400 text-sm">
                    {formatPrice(regularPrice)}
                  </span>
                  <span className="text-black font-medium">
                    {formatPrice(salePrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                      -{discountPercent}%
                    </span>
                  )}
                </>
              );
            } else {
              console.log('Rendering regular price:', regularPrice);
              return (
                <span className="text-black font-medium">
                  {formatPrice(regularPrice)}
                </span>
              );
            }
          })()}
        </div>
      </div>
    </motion.div>
  );
}