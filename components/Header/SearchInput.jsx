'use client'

import React, { useState, useEffect } from 'react'
import { Search, X, Package } from 'lucide-react'
import Link from 'next/link'

export default function SearchInput() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  /* ===============================
   * ESC + Autofocus
   * =============================== */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape)
      setTimeout(() => {
        const input = document.getElementById('search-input')
        if (input) input.focus()
      }, 150)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSearchOpen])

  /* ===============================
   * Live Search (Debounce) - Products only
   * =============================== */
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setProducts([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery)}&per_page=8`
        )

        if (res.ok) {
          const json = await res.json()
          setProducts(json.products || [])
        } else {
          setProducts([])
        }

      } catch (err) {
        console.error('Search error:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div>
      {/* Search Icon */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 text-black hover:text-gray-700"
        aria-label="Search"
      >
        <Search className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsSearchOpen(false)}
        />
      )}

      {/* Search Modal */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300
          ${isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="w-[90vw] max-w-2xl bg-white shadow-xl rounded-lg px-4 py-6 relative">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-5 top-5"
          >
            <X />
          </button>

          {/* Input */}
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Products.."
            className="w-full py-2 border-b border-gray-400 focus:border-black outline-none"
          />

          {/* Result */}
          {(loading || products.length > 0) && (
            <div className="ajax-search-result mt-4 max-h-[60vh] overflow-y-auto">
              {loading && products.length === 0 && (
                <p className="text-sm text-gray-500 py-2">Searching…</p>
              )}

              {products.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <Package className="w-3 h-3" />
                    Products
                  </div>
                  {products.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      className="product-link flex gap-3 py-2 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      title={item.name}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img
                        src={item.images?.[0]?.src || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="product-title text-sm font-medium truncate">
                          {item.name}
                        </h3>

                        <div className="text-xs mt-1">
                          {item.sale_price && item.sale_price !== '' ? (
                            <>
                              <del className="mr-2 text-gray-400">
                                Rp{Number(item.regular_price || 0).toLocaleString('id-ID')}
                              </del>
                              <ins className="no-underline font-semibold text-gray-900">
                                Rp{Number(item.sale_price).toLocaleString('id-ID')}
                              </ins>
                            </>
                          ) : (
                            <span className="font-semibold text-gray-900">
                              Rp{Number(item.price || 0).toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* No results */}
              {!loading && products.length === 0 && (
                <p className="text-sm text-gray-500 py-4 text-center">No products found</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
