'use client';

import { useState } from 'react';

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const plainTitle = title?.replace(/<[^>]*>/g, '') || '';

  const handleShareFacebook = () => {
    if (typeof window !== 'undefined') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        '_blank',
        'width=600,height=400'
      );
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(plainTitle)}&url=${encodeURIComponent(window.location.href)}`,
        '_blank',
        'width=600,height=400'
      );
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Share this article
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleShareFacebook}
          className="px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm font-medium hover:bg-[#166FE5] transition-colors"
        >
          Facebook
        </button>
        <button
          onClick={handleShareTwitter}
          className="px-4 py-2 bg-[#000000] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Twitter
        </button>
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
