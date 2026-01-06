'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const InteractiveHotspot = ({
  images = [],
  hotspots = [],
  className = '',
  containerClassName = '',
  gap = '20px',
  hotspotColor = '#0058a3',
  hotspotSize = 24,
  tooltipMinWidth = 280,
  tooltipMaxWidth = 320,
  responsive = true
}) => {
  const [mobileOpenTooltips, setMobileOpenTooltips] = useState({})

  const handleHotspotClick = (hotspotId) => {
    if (responsive && window.innerWidth <= 768) {
      setMobileOpenTooltips(prev => ({
        ...prev,
        [hotspotId]: !prev[hotspotId]
      }))
    }
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest('.hotspot-group')) {
      setMobileOpenTooltips({})
    }
  }

  React.useEffect(() => {
    if (responsive) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [responsive])

  return (
    <>
      <style jsx>{`
        .images-container {
          display: flex;
          gap: ${gap};
          max-width: 1200px;
          margin: 0 auto;
        }

        .hotspot-container {
          position: relative;
          display: inline-block;
          flex: 1;
          max-width: 100%;
        }

        .hotspot-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .hotspot-group {
          position: absolute;
          padding: 30px;
          margin: -30px;
        }

        .hotspot {
          position: relative;
          width: ${hotspotSize}px;
          height: ${hotspotSize}px;
          background-color: rgba(255, 255, 255, 0.9);
          border: 2px solid ${hotspotColor};
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          margin: 30px;
        }

        .hotspot::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: ${hotspotColor};
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .hotspot:hover {
          transform: scale(1.1);
          background-color: ${hotspotColor};
        }

        .hotspot:hover::before {
          background-color: white;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .tooltip {
          position: absolute;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          padding: 16px;
          min-width: ${tooltipMinWidth}px;
          max-width: ${tooltipMaxWidth}px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 20;
          pointer-events: none;
        }

        .hotspot-group:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .tooltip.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: white;
          transform: rotate(45deg);
          box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
        }

        .tooltip.top::before {
          bottom: -6px;
          left: 20px;
        }

        .tooltip.bottom::before {
          top: -6px;
          left: 20px;
        }

        .tooltip.left::before {
          right: -6px;
          top: 20px;
        }

        .tooltip.right::before {
          left: -6px;
          top: 20px;
        }

        .tooltip-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .tooltip-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .tooltip-info {
          flex: 1;
        }

        .tooltip-title {
          font-weight: 700;
          font-size: 16px;
          color: #1a1a1a;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tooltip-title a {
          color: inherit;
          text-decoration: none;
        }

        .tooltip-title a:hover {
          color: ${hotspotColor};
        }

        .tooltip-description {
          font-size: 13px;
          color: #666;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .tooltip-price {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .tooltip-price-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tooltip-price-original {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
          font-weight: 400;
        }

        .tooltip-price-sale {
          font-size: 18px;
          font-weight: 700;
          color: #d32f2f;
        }

        .tooltip-price a {
          color: inherit;
          text-decoration: none;
        }

        .tooltip-price a:hover {
          color: ${hotspotColor};
        }

        ${responsive ? `
          @media (max-width: 768px) {
            .images-container {
              flex-direction: column;
              gap: 30px;
            }

            .tooltip {
              min-width: 240px;
              max-width: 280px;
              font-size: 12px;
            }

            .tooltip-title {
              font-size: 14px;
            }

            .tooltip-price {
              font-size: 16px;
            }
          }
        ` : ''}

        ${hotspots.map((hotspot, index) => `
          .hotspot-${index + 1} {
            top: ${hotspot.position.top};
            left: ${hotspot.position.left};
            ${hotspot.position.bottom ? `bottom: ${hotspot.position.bottom};` : ''}
            ${hotspot.position.right ? `right: ${hotspot.position.right};` : ''}
          }

          .tooltip-${index + 1} {
            top: ${hotspot.tooltipPosition?.top || hotspot.position.top};
            left: ${hotspot.tooltipPosition?.left || hotspot.position.left};
            ${hotspot.tooltipPosition?.bottom ? `bottom: ${hotspot.tooltipPosition.bottom};` : ''}
            ${hotspot.tooltipPosition?.right ? `right: ${hotspot.tooltipPosition.right};` : ''}
          }
        `).join('')}
      `}</style>

      <div className={`images-container ${containerClassName}`}>
        {images.map((image, imageIndex) => {
          const imageHotspots = hotspots.filter(hotspot => hotspot.imageIndex === imageIndex)

          return (
            <div key={imageIndex} className={`hotspot-container ${className}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="hotspot-image"
                style={{ width: '100%', height: 'auto' }}
              />

              {imageHotspots.map((hotspot, hotspotIndex) => {
                const globalIndex = hotspots.indexOf(hotspot)
                const isMobileOpen = mobileOpenTooltips[`hotspot-${globalIndex + 1}`]
                const tooltipClass = hotspot.tooltipPosition?.position || 'top'

                return (
                  <div
                    key={hotspot.id || globalIndex}
                    className={`hotspot-group hotspot-${globalIndex + 1}`}
                    onClick={() => handleHotspotClick(`hotspot-${globalIndex + 1}`)}
                  >
                    <div className="hotspot"></div>
                    <div
                      className={`tooltip tooltip-${globalIndex + 1} ${tooltipClass} ${isMobileOpen ? 'active' : ''
                        }`}
                    >
                      <div className="tooltip-header">
                        {hotspot.productImage && (
                          <Image
                            src={hotspot.productImage}
                            alt={hotspot.title}
                            width={60}
                            height={60}
                            className="tooltip-image"
                          />
                        )}
                        <div className="tooltip-info">
                          {hotspot.title && (
                            <div className="tooltip-title">
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
                              className="tooltip-description"
                              dangerouslySetInnerHTML={{ __html: hotspot.description }}
                            />
                          )}
                          {hotspot.price && (
                            <div className="tooltip-price">
                              {hotspot.url ? (
                                <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                  {hotspot.price}
                                </a>
                              ) : (
                                hotspot.price
                              )}
                            </div>
                          )}
                          {hotspot.pricing && (
                            <div className="tooltip-price-container">
                              {hotspot.url ? (
                                <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                  {hotspot.pricing.original && (
                                    <div className="tooltip-price-original">
                                      {hotspot.pricing.original}
                                    </div>
                                  )}
                                  {hotspot.pricing.sale && (
                                    <div className="tooltip-price-sale">
                                      {hotspot.pricing.sale}
                                    </div>
                                  )}
                                </a>
                              ) : (
                                <>
                                  {hotspot.pricing.original && (
                                    <div className="tooltip-price-original">
                                      {hotspot.pricing.original}
                                    </div>
                                  )}
                                  {hotspot.pricing.sale && (
                                    <div className="tooltip-price-sale">
                                      {hotspot.pricing.sale}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default InteractiveHotspot