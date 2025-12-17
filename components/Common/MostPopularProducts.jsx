'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const MostPopularProducts = ({
  title = "Most Popular Products",
  subtitle = "Discover our best-selling furniture pieces loved by our customers",
  className = '',
  showWishlist = true,
  showRating = true,
  apiEndpoint = '/api/products/popular-products',
  itemsPerSlide = 4,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wishlistItems, setWishlistItems] = useState(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiEndpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success && result.data) {
          const transformedProducts = transformWooCommerceProducts(result.data)
          setProducts(transformedProducts.slice(0, 12))
        } else {
          throw new Error(result.error || 'Failed to fetch products')
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)
        setProducts(getSampleProducts())
      }
    }

    fetchProducts()
  }, [apiEndpoint])

  const transformWooCommerceProducts = (wooProducts) => {
    if (!Array.isArray(wooProducts)) return []

    return wooProducts.map(product => {
      const regularPrice = parseFloat(product.regular_price) || 0
      const salePrice = parseFloat(product.sale_price) || 0
      const hasDiscount = salePrice > 0 && salePrice < regularPrice
      const discountPercentage = hasDiscount
        ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
        : 0

      return {
        id: product.id,
        name: product.name,
        category: product.categories?.[0]?.name || 'Furniture',
        price: salePrice > 0 ? salePrice : regularPrice,
        originalPrice: hasDiscount ? regularPrice : null,
        discount: discountPercentage,
        image: product.images?.[0]?.src || getSampleProducts()[0].image,
        rating: parseFloat(product.average_rating) || 4.5,
        reviews: parseInt(product.rating_count) || 0,
        url: `/product/${product.slug}`,
        isNew: product.date_created ? isNewProduct(product.date_created) : false,
      }
    })
  }

  const isNewProduct = (dateCreated) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const createdDate = new Date(dateCreated)
    return createdDate > thirtyDaysAgo
  }

  useEffect(() => {
    if (autoPlay && products.length > itemsPerSlide) {
      const interval = setInterval(() => {
        handleNext()
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, currentIndex, products.length, itemsPerSlide, autoPlayInterval])

  const toggleWishlist = (productId, e) => {
    e.preventDefault()
    setWishlistItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - itemsPerSlide)
    setCurrentIndex(prev => (prev >= maxIndex) ? 0 : prev + 1)
  }

  const handlePrev = () => {
    const maxIndex = Math.max(0, products.length - itemsPerSlide)
    setCurrentIndex(prev => (prev <= 0) ? maxIndex : prev - 1)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getSampleProducts = () => [
    {
      id: 1,
      name: 'Duke Chesterfield Sofa',
      category: 'Living Room',
      price: 21998813,
      originalPrice: 25141500,
      discount: 13,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg',
      rating: 4.8,
      reviews: 124,
      url: '/product/duke-chesterfield-sofa',
      isNew: false
    },
    {
      id: 2,
      name: 'Livorno Single 11 Onyx',
      category: 'Living Room',
      price: 11280375,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/Livorno-Single-11-Onyx.jpg',
      rating: 4.6,
      reviews: 89,
      url: '/product/livorno-single-11-onyx',
      isNew: true
    }
  ]

  const ProductCard = ({ product }) => {
    const isWishlisted = wishlistItems.has(product.id)

    return (
      <div className="group flex-shrink-0 w-72">
        <Link href={product.url || '#'} className="block">
          {/* Product Image */}
          <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-4">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="288px"
              />
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-black text-white px-3 py-1 text-xs font-medium">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-white text-black px-3 py-1 text-xs font-medium border border-gray-200">
                  NEW
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                onClick={(e) => toggleWishlist(product.id, e)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${isWishlisted
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Category */}
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>

            {/* Product Name */}
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:underline">
              {product.name}
            </h3>

            {/* Rating */}
            {showRating && product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-base font-semibold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerSlide)
  const totalSlides = Math.max(1, products.length - itemsPerSlide + 1)

  if (loading) {
    return (
      <div className={`${className} py-16`}>
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          <p className="mt-4 text-gray-500 text-sm">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`${className} py-16 md:py-24`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="w-12 h-px bg-gray-300 mx-auto mt-6"></div>
      </div>

      {/* Carousel */}
      <div className="relative px-4 md:px-8">
        {/* Navigation Buttons */}
        {products.length > itemsPerSlide && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-gray-400 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-gray-400 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Products Container */}
        <div className="overflow-hidden mx-12">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (288 + 24)}px)` }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Indicators */}
        {products.length > itemsPerSlide && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                    ? 'bg-gray-900 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MostPopularProducts