'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const GridHotspotGallery = ({
  images = [],
  hotspots = [],
  className = '',
  maxGridItems = 7
}) => {
  const [fullscreenImage, setFullscreenImage] = useState('')
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  // Use useCallback to prevent re-creation of functions
  const openFullscreen = useCallback((imageSrc) => {
    setFullscreenImage(imageSrc)
    setIsFullscreenOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeFullscreen = useCallback(() => {
    setIsFullscreenOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFullscreen()
      }
    }

    if (isFullscreenOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreenOpen, closeFullscreen])

  // Improved discount calculator (handles decimals safely)
  const calculateDiscount = (original, sale) => {
    if (!original || !sale) return null
    // Remove non-numeric chars except dot/comma for decimals
    const cleanOriginal = parseFloat(original.replace(/[^0-9.]/g, ''))
    const cleanSale = parseFloat(sale.replace(/[^0-9.]/g, ''))
    
    if (cleanOriginal && cleanSale) {
      return Math.round(((cleanOriginal - cleanSale) / cleanOriginal) * 100)
    }
    return null
  }

  const displayImages = images.slice(0, maxGridItems)

  return (
    <>
      <div className={`grid-container ${className}`}>
        {displayImages.map((image, imageIndex) => {
          const imageHotspots = hotspots.filter(hotspot => hotspot.imageIndex === imageIndex)
          const isLarge = imageIndex === 0

          return (
            <div
              key={imageIndex}
              className={`grid-item ${isLarge ? 'large-item' : ''}`}
              onClick={() => !imageHotspots.length && openFullscreen(image.src)}
            >
              {/* Replaced <img> with next/image */}
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${imageIndex + 1}`}
                fill
                sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="grid-image"
                priority={isLarge} // Load the LCP image immediately
              />

              {imageHotspots.map((hotspot, hotspotIndex) => {
                const globalIndex = hotspots.indexOf(hotspot)
                const discount = hotspot.pricing ?
                  calculateDiscount(hotspot.pricing.original, hotspot.pricing.sale) : null

                // Use inline styles for dynamic positioning instead of generating CSS classes
                const positionStyle = {
                    top: hotspot.position?.top,
                    left: hotspot.position?.left,
                    bottom: hotspot.position?.bottom,
                    right: hotspot.position?.right,
                };

                const tooltipStyle = {
                    top: hotspot.tooltipPosition?.top,
                    left: hotspot.tooltipPosition?.left,
                    bottom: hotspot.tooltipPosition?.bottom,
                    right: hotspot.tooltipPosition?.right,
                };

                return (
                  <div
                    key={hotspot.id || globalIndex}
                    className="hotspot"
                    style={positionStyle}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="tooltip" style={tooltipStyle}>
                      {hotspot.productImage && (
                        <div className="tooltip-image-wrapper">
                            <Image
                                src={hotspot.productImage}
                                alt={hotspot.title}
                                fill
                                sizes="160px"
                                className="tooltip-image"
                            />
                        </div>
                      )}
                      <div className="tooltip-content">
                        {hotspot.title && (
                          <div className="product-name">
                            {hotspot.url ? (
                              <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                {hotspot.title}
                              </a>
                            ) : (
                              hotspot.title
                            )}
                          </div>
                        )}
                        {hotspot.description && (
                          <div
                            className="product-desc"
                            dangerouslySetInnerHTML={{ __html: hotspot.description }}
                          />
                        )}
                        
                        {/* Price Rendering */}
                        {(hotspot.price || hotspot.pricing) && (
                           <div className="product-price">
                             {hotspot.url ? (
                               <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                 {hotspot.pricing ? (
                                    <>
                                        {hotspot.pricing.original && <span className="original-price">{hotspot.pricing.original}</span>}
                                        {hotspot.pricing.sale && <span className="sale-price">{hotspot.pricing.sale}</span>}
                                        {discount && <span className="discount-badge">{discount}% OFF</span>}
                                    </>
                                 ) : (
                                    <span className="single-price">{hotspot.price}</span>
                                 )}
                               </a>
                             ) : (
                                <>
                                  {hotspot.pricing ? (
                                     <>
                                         {hotspot.pricing.original && <span className="original-price">{hotspot.pricing.original}</span>}
                                         {hotspot.pricing.sale && <span className="sale-price">{hotspot.pricing.sale}</span>}
                                         {discount && <span className="discount-badge">{discount}% OFF</span>}
                                     </>
                                  ) : (
                                     <span className="single-price">{hotspot.price}</span>
                                  )}
                                </>
                             )}
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Fullscreen overlay */}
      <div
        className={`fullscreen-overlay ${isFullscreenOpen ? 'active' : ''}`}
        onClick={closeFullscreen}
      >
         <div className="fullscreen-image-container">
            {fullscreenImage && (
                <Image
                    src={fullscreenImage}
                    alt="Fullscreen view"
                    fill
                    className="fullscreen-image"
                    quality={90}
                />
            )}
         </div>
        <button className="close-button" onClick={closeFullscreen} aria-label="Close fullscreen">×</button>
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          grid-template-rows: 300px 300px; /* Fixed height rows for consistency */
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .grid-item {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          background: #f0f0f0; /* Loading placeholder color */
        }

        .grid-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Next.js Image specific styles */
        .grid-item :global(.grid-image) {
           object-fit: cover;
           transition: transform 0.5s ease;
        }

        .grid-item:hover :global(.grid-image) {
          transform: scale(1.05);
        }

        .large-item {
          grid-row: span 2;
        }

        /* Hotspot Styles */
        .hotspot {
          position: absolute;
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid #007AFF;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
          animation: pulse 2s infinite;
        }

        .hotspot::after {
          content: '';
          position: absolute;
          width: 40px;
          height: 40px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .hotspot::before {
          content: '';
          width: 10px;
          height: 10px;
          background: #007AFF;
          border-radius: 50%;
          z-index: 1;
        }

        .hotspot:hover {
          transform: scale(1.1);
          background: #007AFF;
          animation: none;
        }

        .hotspot:hover::before {
          background: white;
        }

        /* Tooltip Styles */
        .tooltip {
          position: absolute;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          width: 180px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px) scale(0.95);
          transition: all 0.2s ease-out;
          z-index: 30;
          pointer-events: none;
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .hotspot:hover .tooltip,
        .tooltip:hover {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .tooltip-image-wrapper {
            position: relative;
            width: 100%;
            height: 100px;
        }

        .tooltip-image-wrapper :global(.tooltip-image) {
          object-fit: cover;
        }

        .tooltip-content {
          padding: 12px;
        }

        .product-name {
          font-size: 12px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        
        .product-name a { text-decoration: none; color: inherit; }
        .product-name a:hover { color: #007AFF; }

        .product-desc {
          font-size: 10px;
          color: #666;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .product-price, .product-price a {
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          text-decoration: none;
          color: inherit;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 10px;
        }

        .sale-price {
          color: #ef4444;
          font-weight: 700;
        }

        .discount-badge {
          background: #ef4444;
          color: white;
          font-size: 9px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Animation */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(0, 122, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0); }
        }

        /* Fullscreen */
        .fullscreen-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
        }

        .fullscreen-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .fullscreen-image-container {
            position: relative;
            width: 90vw;
            height: 90vh;
        }

        .fullscreen-image-container :global(.fullscreen-image) {
            object-fit: contain;
        }

        .close-button {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto;
          }

          .grid-item {
            height: 250px; /* Force height on mobile */
          }
          
          .large-item {
             height: 400px;
             grid-row: span 1;
          }

          /* Force tooltips to be centered on mobile */
          .tooltip {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 80vw;
            z-index: 100;
          }
        }
      `}</style>
    </>
  )
}

export default GridHotspotGallery