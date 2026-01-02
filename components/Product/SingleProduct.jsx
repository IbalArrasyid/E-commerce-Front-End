"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Check,
  Package
} from "lucide-react";
import ProductSlider from "./ProductSlider";
import { navlinks } from "@/constant";
import { useCart } from "@/hooks/useCart";

export default function SingleProduct({ product, relatedProducts = [], isLoading = false }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState('');

  // Use the cart hook
  const { addToCart, cartItems, getCartTotals } = useCart();

  // Function to find category path for a product based on its name and category
  const findCategoryPath = (productName, productCategory) => {
    // Extract keywords from product name to determine category
    const nameLower = productName.toLowerCase();
    const categoryLower = productCategory.toLowerCase();

    // Define keywords for each category
    const categoryKeywords = {
      'Living Room': [
        'sofa', 'sectional', 'corner', 'day bed', 'cleopatra', 'arm chair', 'side table',
        'coffee table', 'bench', 'ottoman', 'pouf', 'stool', 'console', 'chest', 'drawer',
        'sideboard', 'buffet', 'tv stand', 'room divider', 'cabinet'
      ],
      'Bed Room': [
        'bed', 'headboard', 'nightstand', 'night stand', 'makeup', 'vanity', 'dresser',
        'wardrobe', 'chest', 'tv cabinet', 'bed bench'
      ],
      'Dining Room': [
        'dining table', 'dining chair', 'bar chair', 'bar stool', 'trolley', 'bar cart', 'buffet'
      ],
      'Home Office': [
        'study table', 'desk', 'office chair', 'study chair', 'bookcase', 'bookshelf', 'filing'
      ],
      'Lighting': [
        'ceiling light', 'pendant', 'chandelier', 'table lamp', 'floor lamp', 'wall light', 'lamp'
      ],
      'Decoration': [
        'vase', 'ceramic', 'photo frame', 'bowl', 'tray', 'bookend', 'candle holder',
        'decoration', 'accent', 'sculpture', 'art'
      ],
      'Wall Decor': [
        'wall art', 'mirror', 'clock', 'painting', 'wall decor'
      ],
      'Cushions': [
        'cushion', 'pillow', 'throw pillow'
      ],
      'Rugs': [
        'rug', 'carpet'
      ],
      'Curtains': [
        'curtain', 'drapery', 'blind'
      ],
      'Upholstery': [
        'upholstery', 'fabric', 'reupholster'
      ],
      'Wallpapers': [
        'wallpaper', 'wall covering'
      ]
    };

    // Check product name keywords first
    for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => nameLower.includes(keyword))) {
        return findCategoryHref(categoryName);
      }
    }

    // Check product category if name doesn't match
    for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => categoryLower.includes(keyword))) {
        return findCategoryHref(categoryName);
      }
    }

    // Default fallback to Furniture if no specific category matches
    return '/furniture';
  };

  // Helper function to find the href for a category name
  const findCategoryHref = (categoryName) => {
    // Search through navlinks for the category
    for (const link of navlinks) {
      if (link.name === categoryName) {
        return link.href;
      }
      // Check sublinks
      if (link.sublinks) {
        for (const sublink of link.sublinks) {
          if (sublink.name === categoryName) {
            return sublink.href;
          }
        }
      }
    }
    return '/furniture'; // Default fallback
  };

  // Function to get the display name of the category for breadcrumb
  const getCategoryDisplayName = (productName, productCategory) => {
    // Extract keywords from product name to determine category
    const nameLower = productName.toLowerCase();
    const categoryLower = productCategory.toLowerCase();

    // Define keywords for each category (same as above but return the display name)
    const categoryKeywords = {
      'Living Room': [
        'sofa', 'sectional', 'corner', 'day bed', 'cleopatra', 'arm chair', 'side table',
        'coffee table', 'bench', 'ottoman', 'pouf', 'stool', 'console', 'chest', 'drawer',
        'sideboard', 'buffet', 'tv stand', 'room divider', 'cabinet'
      ],
      'Bed Room': [
        'bed', 'headboard', 'nightstand', 'night stand', 'makeup', 'vanity', 'dresser',
        'wardrobe', 'chest', 'tv cabinet', 'bed bench'
      ],
      'Dining Room': [
        'dining table', 'dining chair', 'bar chair', 'bar stool', 'trolley', 'bar cart', 'buffet'
      ],
      'Home Office': [
        'study table', 'desk', 'office chair', 'study chair', 'bookcase', 'bookshelf', 'filing'
      ],
      'Lighting': [
        'ceiling light', 'pendant', 'chandelier', 'table lamp', 'floor lamp', 'wall light', 'lamp'
      ],
      'Decoration': [
        'vase', 'ceramic', 'photo frame', 'bowl', 'tray', 'bookend', 'candle holder',
        'decoration', 'accent', 'sculpture', 'art'
      ],
      'Wall Decor': [
        'wall art', 'mirror', 'clock', 'painting', 'wall decor'
      ],
      'Cushions': [
        'cushion', 'pillow', 'throw pillow'
      ],
      'Rugs': [
        'rug', 'carpet'
      ],
      'Curtains': [
        'curtain', 'drapery', 'blind'
      ],
      'Upholstery': [
        'upholstery', 'fabric', 'reupholster'
      ],
      'Wallpapers': [
        'wallpaper', 'wall covering'
      ]
    };

    // Check product name keywords first
    for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => nameLower.includes(keyword))) {
        return categoryName;
      }
    }

    // Check product category if name doesn't match
    for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => categoryLower.includes(keyword))) {
        return categoryName;
      }
    }

    return 'Furniture'; // Default fallback
  };

  // Function to detect subcategory and get its path from navlinks
  const getSubcategoryInfo = (productName, productCategory, parentCategory) => {
    const nameLower = productName.toLowerCase();
    const categoryLower = productCategory.toLowerCase();

    // Define subcategory keywords and their corresponding navlink paths
    const subcategoryMap = {
      // Living Room subcategories
      'Sofas': {
        keywords: ['sofa', 'sofas', 'sectional', 'cleopatra', 'day bed'],
        href: '/furniture/living-room/sofas'
      },
      'Sectional & Corner Sofas': {
        keywords: ['sectional', 'corner sofa'],
        href: '/furniture/living-room/sectional-corner-sofas'
      },
      'Day Bed / Cleopatra': {
        keywords: ['day bed', 'cleopatra'],
        href: '/furniture/living-room/cleopatra-day-beds'
      },
      'Arm Chairs': {
        keywords: ['arm chair', 'armchair', 'accent chair'],
        href: '/furniture/living-room/arm-chairs'
      },
      'Side Table': {
        keywords: ['side table', 'end table'],
        href: '/furniture/living-room/side-table'
      },
      'Coffee Table': {
        keywords: ['coffee table', 'cocktail table'],
        href: '/furniture/living-room/coffee-table'
      },
      'Bench': {
        keywords: ['bench', 'benches'],
        href: '/furniture/living-room/bench'
      },
      'Ottoman & Pouf': {
        keywords: ['ottoman', 'pouf', 'footstool'],
        href: '/furniture/living-room/ottoman-pouf'
      },
      'Decorative Stool': {
        keywords: ['decorative stool', 'stool'],
        href: '/furniture/living-room/decorative-stools'
      },
      'Console Table': {
        keywords: ['console', 'console table'],
        href: '/furniture/living-room/console-tables'
      },
      'Chest Drawer': {
        keywords: ['chest', 'chest of drawers', 'dresser'],
        href: '/furniture/living-room/chests'
      },
      'Sideboard & Buffet': {
        keywords: ['sideboard', 'buffet', 'credenza'],
        href: '/furniture/living-room/buffet'
      },
      'TV Stand': {
        keywords: ['tv stand', 'tv cabinet', 'media console'],
        href: '/furniture/living-room/tv-stands'
      },
      'Room Deviders': {
        keywords: ['room divider', 'screen', 'partition'],
        href: '/furniture/living-room/room-deviders'
      },

      // Bed Room subcategories
      'Beds': {
        keywords: ['bed', 'bedframe'],
        href: '/furniture/bedroom/bedsets'
      },
      'Headboards': {
        keywords: ['headboard', 'head board'],
        href: '/furniture/bedroom/headboards'
      },
      'Bed Side Table': {
        keywords: ['nightstand', 'night stand', 'bedside table'],
        href: '/furniture/bedroom/bed-side-nightstand'
      },
      'Make Up Table': {
        keywords: ['makeup', 'vanity', 'dressing table'],
        href: '/furniture/bedroom/makeup-table'
      },
      'Chest Of Drawers and Dressers': {
        keywords: ['dresser', 'chest of drawers', 'wardrobe'],
        href: '/furniture/bedroom/chest-of-drawers-and-dressers'
      },
      'TV Cabinets': {
        keywords: ['tv cabinet', 'tv unit', 'media cabinet'],
        href: '/furniture/bedroom/tv-cabinets'
      },
      'Bed Benches': {
        keywords: ['bed bench', 'end of bed bench'],
        href: '/furniture/bedroom/bed-benches'
      },

      // Dining Room subcategories
      'Dining Table': {
        keywords: ['dining table', 'kitchen table'],
        href: '/furniture/dining-room/dining-tables'
      },
      'Dining Chairs': {
        keywords: ['dining chair', 'kitchen chair'],
        href: '/furniture/dining-room/dining-chairs'
      },
      'Bar Chair': {
        keywords: ['bar chair', 'bar stool', 'counter stool'],
        href: '/furniture/dining-room/bar-chairs'
      },
      'Trolleys & Bar Carts': {
        keywords: ['trolley', 'bar cart', 'serving cart'],
        href: '/furniture/dining-room/trolleys-bar-carts'
      },

      // Other categories
      'Study Tables': {
        keywords: ['study table', 'desk', 'writing desk'],
        href: '/product-category/study-tables'
      },
      'Study Chairs': {
        keywords: ['study chair', 'office chair', 'desk chair'],
        href: '/product-category/office-chairs'
      },
      'Bookcase': {
        keywords: ['bookcase', 'bookshelf', 'book shelf'],
        href: '/product-category/furniture/bookcases'
      }
    };

    // Check product name keywords first
    for (const [subcategoryName, info] of Object.entries(subcategoryMap)) {
      if (info.keywords.some(keyword => nameLower.includes(keyword))) {
        return {
          name: subcategoryName,
          href: info.href
        };
      }
    }

    // Check product category if name doesn't match
    for (const [subcategoryName, info] of Object.entries(subcategoryMap)) {
      if (info.keywords.some(keyword => categoryLower.includes(keyword))) {
        return {
          name: subcategoryName,
          href: info.href
        };
      }
    }

    return null; // No subcategory found
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-light mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <a href="/products" className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  // Format product data from WooCommerce API
  const formatProductData = (wooProduct) => {
    // Debug: Log the entire product object to see all available fields
    console.log('=== COMPLETE PRODUCT DATA DEBUG ===');
    console.log('Raw product object:', wooProduct);
    console.log('Product keys:', Object.keys(wooProduct));

    // Log all stock-related fields
    console.log('Stock-related fields:');
    Object.keys(wooProduct).forEach(key => {
      if (key.toLowerCase().includes('stock') || key.toLowerCase().includes('inventory') || key.toLowerCase().includes('quantity')) {
        console.log(`${key}:`, wooProduct[key], `(type: ${typeof wooProduct[key]})`);
      }
    });

    // Check for nested stock data
    if (wooProduct.stock_status) console.log('stock_status found:', wooProduct.stock_status);
    if (wooProduct.manage_stock !== undefined) console.log('manage_stock found:', wooProduct.manage_stock);
    if (wooProduct.stock_quantity !== undefined) console.log('stock_quantity found:', wooProduct.stock_quantity);
    if (wooProduct.backorders_allowed !== undefined) console.log('backorders_allowed found:', wooProduct.backorders_allowed);
    if (wooProduct.backorders !== undefined) console.log('backorders found:', wooProduct.backorders);

    // Standard debug info
    console.log('Standard product data:', {
      id: wooProduct.id,
      name: wooProduct.name,
      description: wooProduct.description?.substring(0, 100),
      short_description: wooProduct.short_description?.substring(0, 100),
      price: wooProduct.price,
      sale_price: wooProduct.sale_price,
      regular_price: wooProduct.regular_price,
      on_sale: wooProduct.on_sale,
      prices: wooProduct.prices,
      stock_status: wooProduct.stock_status,
      stock_quantity: wooProduct.stock_quantity,
      manage_stock: wooProduct.manage_stock,
      status: wooProduct.status
    });
    console.log('=== END PRODUCT DATA DEBUG ===');

    // Handle different price field structures from different WooCommerce API versions
    let price = 0;
    let salePrice = null;
    let regularPrice = 0;

    if (wooProduct.prices) {
      // WooCommerce Store API format
      price = parseFloat(wooProduct.prices.price) || 0;
      salePrice = wooProduct.prices.sale_price ? parseFloat(wooProduct.prices.sale_price) : null;
      regularPrice = parseFloat(wooProduct.prices.regular_price) || price;
    } else {
      // WooCommerce REST API v3 format
      price = parseFloat(wooProduct.price) || 0;
      salePrice = wooProduct.on_sale && wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : null;
      regularPrice = parseFloat(wooProduct.regular_price) || price;
    }

    // Handle stock status properly
    let stock = 0;
    console.log('Stock fields:', {
      stock_status: wooProduct.stock_status,
      manage_stock: wooProduct.manage_stock,
      stock_quantity: wooProduct.stock_quantity,
      // Check for different API field names
      stockStatus: wooProduct.stockStatus,
      manageStock: wooProduct.manageStock,
      stockQty: wooProduct.stock_quantity || wooProduct.stockQty
    });

    // Try multiple field naming conventions from different WooCommerce API versions
    const stockStatus = wooProduct.stock_status || wooProduct.stockStatus;
    const manageStock = wooProduct.manage_stock || wooProduct.manageStock;
    const stockQuantity = wooProduct.stock_quantity || wooProduct.stockQty;

    console.log('Stock analysis:', {
      stockStatus,
      manageStock,
      stockQuantity,
      stockStatusType: typeof stockStatus,
      manageStockType: typeof manageStock,
      stockQuantityType: typeof stockQuantity
    });

    // More robust stock status checking - DEFAULT TO IN STOCK
    let isInStock = true; // Default assumption: most products are in stock

    // Only mark as out of stock if we have clear evidence
    if (stockStatus === 'outofstock' ||
      stockStatus === 'out of stock' ||
      stockStatus === false) {
      isInStock = false;
      console.log('🔴 EXPLICIT OUT OF STOCK:', stockStatus);
    } else if (stockStatus === 'instock' ||
      stockStatus === 'in stock' ||
      stockStatus === true ||
      stockStatus === '1' ||
      stockStatus === 1) {
      isInStock = true;
      console.log('🟢 EXPLICIT IN STOCK:', stockStatus);
    } else {
      // No explicit stock status - assume in stock (safer default)
      isInStock = true;
      console.log('🟡 NO STOCK STATUS FOUND - DEFAULTING TO IN STOCK');
    }

    // Apply stock quantity logic only if stock management is clearly enabled
    if (manageStock === true && stockQuantity != null) {
      if (stockQuantity > 0) {
        stock = parseInt(stockQuantity);
        console.log('🟢 MANAGED STOCK - Quantity:', stock);
      } else {
        stock = 0;
        isInStock = false;
        console.log('🔴 MANAGED STOCK - Zero or negative quantity:', stockQuantity);
      }
    } else {
      // No stock management or no quantity - assume plentiful stock
      stock = 999;
      console.log('🟢 NO STOCK MANAGEMENT - DEFAULT STOCK (999)');
    }

    // Final status check
    if (isInStock && stock > 0) {
      console.log('✅ FINAL: PRODUCT IS IN STOCK - Quantity:', stock);
    } else {
      console.log('❌ FINAL: PRODUCT IS OUT OF STOCK - Quantity:', stock);
    }

    // Clean and format description
    const cleanDescription = (text, isShort = false) => {
      if (!text) return "Premium quality product with excellent craftsmanship and design.";

      // Remove HTML tags but preserve line breaks and paragraphs
      let cleanText = text
        // Convert <br> tags to line breaks
        .replace(/<br\s*\/?>/gi, '\n')
        // Convert <p> and </p> to line breaks
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<p[^>]*>/gi, '')
        // Convert <div> and </div> to line breaks
        .replace(/<\/div>/gi, '\n')
        .replace(/<div[^>]*>/gi, '')
        // Convert list items to bullet points
        .replace(/<li[^>]*>/gi, '\n• ')
        // Remove remaining HTML tags
        .replace(/<[^>]*>/g, '');

      // Decode HTML entities
      cleanText = cleanText
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—')
        .replace(/&rsquo;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&rdquo;/g, '"')
        .replace(/&ldquo;/g, '"');

      // Clean up extra whitespace and formatting
      cleanText = cleanText
        // Remove excessive line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Clean up bullet points
        .replace(/^[•\s]+/gm, '• ')
        // Remove leading/trailing whitespace from lines
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');

      // Apply length limits for short descriptions
      if (isShort) {
        cleanText = cleanText.substring(0, 200);
        // Don't cut off in the middle of a word
        const lastSpace = cleanText.lastIndexOf(' ');
        if (lastSpace > 150) {
          cleanText = cleanText.substring(0, lastSpace) + '...';
        } else {
          cleanText += '...';
        }
      }

      return cleanText.trim() || "Premium quality product with excellent craftsmanship and design.";
    };

    return {
      id: wooProduct.id,
      name: wooProduct.name,
      description: cleanDescription(wooProduct.short_description || wooProduct.description, true),
      fullDescription: cleanDescription(wooProduct.description, false),
      price: price,
      salePrice: salePrice,
      regularPrice: regularPrice,
      // Also include WooCommerce field names for compatibility
      sale_price: salePrice,
      regular_price: regularPrice,
      on_sale: wooProduct.on_sale && salePrice && salePrice < regularPrice,
      images: wooProduct.images?.map((img, index) => ({
        id: img.id || index,
        src: img.src || img.url,
        alt: img.alt || wooProduct.name
      })) || [],
      sku: wooProduct.sku || "N/A",
      category: wooProduct.categories?.[0]?.name || "General",
      stock: stock,
      rating: wooProduct.average_rating ? parseFloat(wooProduct.average_rating) : 4.5,
      reviews: wooProduct.review_count || 0,
      brand: wooProduct.attributes?.find(attr => attr.name === "Brand")?.options?.[0] || "HomeDecor Indonesia",
      material: wooProduct.attributes?.find(attr => attr.name === "Material")?.options?.[0] || "Premium Materials",
      dimensions: wooProduct.dimensions ? `${wooProduct.dimensions.length} × ${wooProduct.dimensions.width} × ${wooProduct.dimensions.height}` : "Standard Size",
      weight: wooProduct.weight ? `${wooProduct.weight} kg` : "Standard Weight",
      warranty: wooProduct.attributes?.find(attr => attr.name === "Warranty")?.options?.[0] || "1 Year",
      colors: wooProduct.attributes?.find(attr => attr.name === "Color")?.options || [],
      features: wooProduct.attributes?.find(attr => attr.name === "Features")?.options || [
        "Premium quality construction",
        "Durable and long-lasting",
        "Modern design",
        "Easy maintenance"
      ]
    };
  };

  const productData = formatProductData(product);

  // Get category display name and path for breadcrumb
  const categoryDisplayName = getCategoryDisplayName(productData.name, productData.category);
  const categoryPath = findCategoryPath(productData.name, productData.category);

  // Get subcategory info if available
  const subcategoryInfo = getSubcategoryInfo(productData.name, productData.category, categoryDisplayName);

  // Format related products data
  const formattedRelatedProducts = relatedProducts.map(relatedProduct => {
    const formatted = formatProductData(relatedProduct);
    console.log('Formatted related product:', {
      id: formatted.id,
      name: formatted.name,
      price: formatted.price,
      salePrice: formatted.salePrice
    });
    return formatted;
  });

  // Debug: Log formatted product data
  console.log('Formatted product data:', {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    salePrice: productData.salePrice,
    regularPrice: productData.regularPrice,
    stock: productData.stock,
    description: productData.description?.substring(0, 100),
    // Also show stock display logic
    stockDisplay: productData.stock === 999 ? "In stock (no limit)" : productData.stock > 0 ? `${productData.stock} units` : "Out of stock"
  });

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Check if product is in stock
    if (productData.stock <= 0) {
      setAddToCartMessage('This product is out of stock');
      setTimeout(() => setAddToCartMessage(''), 3000);
      return;
    }

    // Prepare product data for cart
    const productForCart = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      sale_price: productData.salePrice,
      regular_price: productData.regularPrice,
      images: productData.images,
      sku: productData.sku
    };

    // Add to cart using the cart hook
    const success = addToCart(productForCart, quantity);

    if (success) {
      setAddToCartMessage(`Added ${quantity} × ${productData.name} to cart!`);

      // Emit event for cart notifications (if you have a cart notification system)
      window.dispatchEvent(new CustomEvent('addToCart', {
        detail: {
          product: productForCart,
          quantity,
          cartItems: cartItems.length + 1,
          cartTotal: getCartTotals()
        }
      }));

      // Reset quantity after successful addition
      setQuantity(1);

      // Clear success message after 3 seconds
      setTimeout(() => setAddToCartMessage(''), 3000);

      console.log(`✅ Successfully added ${quantity} × ${productData.name} to cart`);
    } else {
      setAddToCartMessage('Failed to add product to cart. Please try again.');
      setTimeout(() => setAddToCartMessage(''), 3000);
      console.error(`❌ Failed to add ${productData.name} to cart`);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Wishlist logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productData.name,
        text: productData.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <ChevronRight size={14} />
          <a href={categoryPath} className="hover:text-black transition-colors">{categoryDisplayName}</a>
          {subcategoryInfo && (
            <>
              <ChevronRight size={14} />
              <a href={subcategoryInfo.href} className="hover:text-black transition-colors">
                {subcategoryInfo.name}
              </a>
            </>
          )}
          <ChevronRight size={14} />
          <span className="text-black font-medium">{productData.name}</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={productData.images[selectedImage]?.src || '/placeholder-product.jpg'}
                    alt={productData.images[selectedImage]?.alt || productData.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation */}
              {productData.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % productData.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productData.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                        ? "border-black shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-light tracking-wide mb-2">{productData.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{productData.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({productData.reviews} reviews)</span>
                <span className={`text-sm font-medium ${productData.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {productData.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {productData.salePrice && productData.salePrice < productData.regularPrice ? (
                <>
                  <span className="text-3xl font-light">
                    Rp {productData.salePrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    Rp {productData.regularPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {Math.round((1 - productData.salePrice / productData.regularPrice) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-light">
                  Rp {productData.price.toLocaleString("id-ID")}
                </span>
              )}
            </div>

            {/* Short Description */}
            <div className="text-gray-600 leading-relaxed">
              {productData.description.split('\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-3' : ''}>
                  {paragraph.startsWith('• ') ? (
                    <span className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{paragraph.substring(2)}</span>
                    </span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            {/* Color Options */}
            {productData.colors && productData.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Color Options</h3>
                <div className="flex gap-2">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition-colors"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= productData.stock}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {productData.stock > 0 ? `${productData.stock} units available` : 'Out of stock'}
                </span>
              </div>

              {/* Add to Cart Success Message */}
              {addToCartMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-3 rounded-lg text-sm font-medium ${addToCartMessage.includes('Failed') || addToCartMessage.includes('out of stock')
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                    }`}
                >
                  {addToCartMessage}
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={productData.stock === 0}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {productData.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-3 border rounded-lg hover:bg-gray-50 transition-colors ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-gray-300"
                    }`}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-600">Within Jakarta area</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">{productData.warranty}</p>
                    <p className="text-xs text-gray-600">Quality guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-600">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{productData.sku}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{productData.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium">{productData.brand}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">{productData.dimensions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{productData.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="container mx-auto px-4 py-12">
        <div className="border-b">
          <div className="flex gap-8">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-light mb-4">Product Description</h3>
                <div className="text-gray-600 leading-relaxed mb-4 space-y-4">
                  {productData.fullDescription.split('\n\n').map((paragraph, index) => (
                    <div key={index}>
                      {paragraph.includes('\n') ? (
                        // Handle paragraphs with multiple lines (like lists)
                        paragraph.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className={lineIndex > 0 ? 'mt-2' : ''}>
                            {line.startsWith('• ') ? (
                              <div className="flex items-start">
                                <span className="text-gray-400 mr-3 mt-1">•</span>
                                <span className="flex-1">{line.substring(2)}</span>
                              </div>
                            ) : line.trim() ? (
                              <p>{line}</p>
                            ) : null}
                          </div>
                        ))
                      ) : (
                        // Handle simple paragraphs
                        paragraph.startsWith('• ') ? (
                          <div className="flex items-start">
                            <span className="text-gray-400 mr-3 mt-1">•</span>
                            <span className="flex-1">{paragraph.substring(2)}</span>
                          </div>
                        ) : (
                          <p>{paragraph}</p>
                        )
                      )}
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-light mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                key="specifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-xl font-light mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">General</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Material:</span>
                          <span>{productData.material}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Dimensions:</span>
                          <span>{productData.dimensions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Weight:</span>
                          <span>{productData.weight}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Warranty:</span>
                          <span>{productData.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Care Instructions</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Vacuum regularly with soft brush attachment</li>
                        <li>• Spot clean with mild detergent and damp cloth</li>
                        <li>• Avoid direct sunlight and heat sources</li>
                        <li>• Professional cleaning recommended for deep stains</li>
                        <li>• Rotate cushions periodically for even wear</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-xl font-light mb-6">Customer Reviews</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="text-4xl font-light mb-2">{productData.rating}</div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{productData.reviews} Reviews</p>
                      <button className="text-sm text-black font-medium hover:underline">
                        Write a Review
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      {productData.reviews > 0 ? (
                        // Sample reviews - in real app, fetch from API
                        [1, 2, 3].map((review) => (
                          <div key={review} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm font-medium">Customer {review}</span>
                              <span className="text-sm text-gray-600">• 2 weeks ago</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Excellent quality and very comfortable! The product looks even better in person and the material feels premium. Highly recommend!
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {formattedRelatedProducts && formattedRelatedProducts.length > 0 && (
        <ProductSlider
          products={formattedRelatedProducts}
          title="You Might Also Like"
          subtitle="Discover similar products that complement your selection"
          autoplay={true}
          autoplayInterval={4000}
          showArrows={true}
          showDots={true}
          slidesToShow={4}
          className="bg-gray-50"
        />
      )}
    </div>
  );
}