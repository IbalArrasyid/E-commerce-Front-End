"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Grid, List, ChevronDown, X, SlidersHorizontal } from "lucide-react";

const ProductsGrid = dynamic(() => import("@/components/ProductsGrid"), { ssr: false });

// Strip HTML tags and decode entities
const formatText = (text) => {
  if (!text) return '';

  // Create a temporary element to decode HTML entities
  const decodeHtmlEntities = (str) => {
    if (typeof window === 'undefined') return str;
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  // First decode HTML entities
  let decodedText = decodeHtmlEntities(text);

  // Then strip HTML tags
  let cleanText = decodedText.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

  // Replace various dashes with regular dashes
  cleanText = cleanText.replace(/[\u2013\u2014\u8211]/g, '-');

  // Clean up multiple spaces
  cleanText = cleanText.replace(/\s+/g, ' ').trim();

  return cleanText;
};

export default function ProductsPage({ products, category, categoryId }) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  // Calculate price range from products
  const productPrices = products.map(p => parseFloat(p.price || p.sale_price || 0));
  const minProductPrice = productPrices.length > 0 ? Math.min(...productPrices) : 0;
  const maxProductPrice = productPrices.length > 0 ? Math.max(...productPrices) : 10000000;

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: minProductPrice, max: maxProductPrice });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Update price range when products change
  useEffect(() => {
    if (productPrices.length > 0) {
      setPriceRange({ min: minProductPrice, max: maxProductPrice });
    }
  }, [products.length]); // Only re-run when products count changes

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    result = result.filter((product) => {
      const price = parseFloat(product.price || product.sale_price || 0);

      // Price range filter
      if (price < priceRange.min || price > priceRange.max) {
        return false;
      }

      // In stock filter
      if (inStockOnly && product.stock_status !== 'instock') {
        return false;
      }

      // On sale filter
      if (onSaleOnly && !product.sale_price) {
        return false;
      }

      return true;
    });

    // Sort products
    result = result.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return (b.total_sales || 0) - (a.total_sales || 0);
        case "latest":
          return new Date(b.date_created || 0) - new Date(a.date_created || 0);
        case "price-low-high":
          const priceA = parseFloat(a.price || a.sale_price || 0);
          const priceB = parseFloat(b.price || b.sale_price || 0);
          return priceA - priceB;
        case "price-high-low":
          const priceC = parseFloat(a.price || a.sale_price || 0);
          const priceD = parseFloat(b.price || b.sale_price || 0);
          return priceD - priceC;
        case "name-asc":
          return (a.name || '').localeCompare(b.name || '');
        case "name-desc":
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });

    return result;
  }, [products, sortBy, priceRange, inStockOnly, onSaleOnly]);

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "latest", label: "Latest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" }
  ];

  // Handle product click for navigation
  const handleProductClick = (product) => {
    if (product?.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return `Rp ${(price / 1000000).toFixed(1)}M`;
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange({ min: minProductPrice, max: maxProductPrice });
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  // Count active filters
  const activeFilterCount = [
    inStockOnly,
    onSaleOnly,
    priceRange.min !== minProductPrice,
    priceRange.max !== maxProductPrice
  ].filter(Boolean).length;

  // Format category name (strip HTML tags)
  const formattedCategory = formatText(category);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">{formattedCategory}</h1>
        <span className="text-sm text-gray-600">
          {filteredAndSortedProducts.length} of {products.length} products
        </span>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-4 border-b">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium">Filter</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* View Toggle */}
          {/* <div className="flex items-center gap-1 border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div> */}
        </div>

        {/* Sort Dropdown */}
        {/* <div className="relative w-full lg:w-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full lg:w-auto gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm">Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 lg:left-auto left-0 mt-2 w-full lg:w-56 bg-white border rounded-lg shadow-lg z-30">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                    sortBy === option.value ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Reset all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      min={minProductPrice}
                      max={maxProductPrice}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      min={minProductPrice}
                      max={maxProductPrice}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Range: Rp {priceRange.min.toLocaleString('id-ID')} - Rp {priceRange.max.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Availability
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            </div>

            {/* Active Filters Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Active Filters
              </label>
              <div className="flex flex-wrap gap-2">
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full">
                    In Stock
                    <button onClick={() => setInStockOnly(false)} className="hover:bg-gray-800 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {onSaleOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full">
                    On Sale
                    <button onClick={() => setOnSaleOnly(false)} className="hover:bg-gray-800 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {(priceRange.min !== minProductPrice || priceRange.max !== maxProductPrice) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full">
                    {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                    <button onClick={() => setPriceRange({ min: minProductPrice, max: maxProductPrice })} className="hover:bg-gray-800 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {activeFilterCount === 0 && (
                  <span className="text-sm text-gray-500">No active filters</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!categoryId ? (
        <p className="text-sm text-gray-500">
          Category <q>{formattedCategory}</q> not found.
        </p>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No products match your filters.</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <ProductsGrid products={filteredAndSortedProducts} viewMode={viewMode} onProductClick={handleProductClick} />
      )}
    </main>
  );
}
