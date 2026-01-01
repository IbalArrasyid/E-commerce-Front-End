'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots, FaChevronLeft, FaChevronRight, FaStar, FaTag, FaRedo } from 'react-icons/fa';

const STORAGE_KEY = 'homedecor_chat';

const ChatWidget = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  // Load chat from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { messages: savedMessages, threadId: savedThreadId } = JSON.parse(saved);
        if (savedMessages && savedMessages.length > 0) {
          setMessages(savedMessages);
        }
        if (savedThreadId) {
          setThreadId(savedThreadId);
        }
      } catch (e) {
        console.error('Error loading chat from localStorage:', e);
      }
    }
  }, []);

  // Save chat to localStorage when messages or threadId change
  useEffect(() => {
    if (messages.length > 0 || threadId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, threadId }));
    }
  }, [messages, threadId]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          text: "Hello! I am Home Decor Indonesia's virtual assistant. How can I help you?",
          isAgent: true
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isAgent: false
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Use existing threadId for continuation, or create new thread
      const url = threadId
        ? `http://localhost:8000/chat/${threadId}`
        : 'http://localhost:8000/chat';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          userId: 'guest-web-user'
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      // Save threadId for subsequent requests (conversation memory)
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
      }

      // Reset loading state and start streaming messages
      setIsLoading(false);
      setIsStreaming(true);

      // Create three separate chat bubbles with delays
      const baseId = Date.now();

      // First bubble: Intro text
      if (data.intro) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setMessages(prev => [...prev, {
          id: baseId,
          text: data.intro,
          isAgent: true
        }]);
      }

      // Second bubble: Product carousel (if products exist)
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setMessages(prev => [...prev, {
          id: baseId + 1,
          text: '', // Empty text, just show products
          isAgent: true,
          products: data.products
        }]);
      }

      // Third bubble: Follow-up text
      if (data.followUp) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setMessages(prev => [...prev, {
          id: baseId + 2,
          text: data.followUp,
          isAgent: true
        }]);
      }

      setIsStreaming(false);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setIsStreaming(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Sorry, the server is busy. Please try again later.",
        isAgent: true
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      id: 'init-1',
      text: "Hello! I am Home Decor Indonesia's virtual assistant. How can I help you?",
      isAgent: true
    }]);
    setThreadId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Navigate to product page when product is clicked
  const handleProductClick = (product) => {
    // Close chat widget and navigate to product page using name as slug
    setIsOpen(false);
    // Convert product name to URL-friendly slug
    const slug = product.item_name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Remove consecutive hyphens
      .trim();
    router.push(`/product/${slug}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">


      <div className={`
        flex flex-col
        fixed bottom-24 right-6 
        w-[380px] h-[520px] 
        bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100
        transition-all duration-300 origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
      `}>

        <div className="bg-slate-900 p-4 flex justify-between items-center text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
              <FaRobot className="text-xl text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistant</h3>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {threadId && (
              <button
                onClick={handleResetChat}
                title="Start new conversation"
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-green-400"
              >
                <FaRedo className="text-sm" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={msg.id || index}>
                {/* Only render text bubble if there's text content */}
                {msg.text && (
                  <div
                    className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${msg.isAgent
                      ? 'bg-white border border-gray-200 text-gray-700 self-start rounded-bl-none'
                      : 'bg-slate-800 text-white self-end rounded-br-none ml-auto'
                      }`}
                  >
                    {msg.text}
                  </div>
                )}

                {msg.products && msg.products.length > 0 && (
                  <ProductCarousel products={msg.products} onProductClick={handleProductClick} />
                )}
              </div>
            ))}

            {(isLoading || isStreaming) && (
              <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1 w-16">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 text-gray-800 transition-all"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || isStreaming}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || isStreaming}
            className={`
              p-3 rounded-full text-white transition-all shadow-md flex items-center justify-center
              ${!inputValue.trim() || isLoading || isStreaming ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-700 hover:scale-105'}
            `}
          >
            <FaPaperPlane className="ml-[-2px]" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center
          w-12 h-12 rounded-full shadow-2xl transition-all duration-300 ease-in-out
          ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-green-600 hover:bg-green-700 hover:scale-110'}
        `}
      >
        {isOpen ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaCommentDots className="text-white text-2xl" />
        )}
      </button>

    </div>
  );
};

const formatIDR = (value) => {
  if (!value) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}


const ProductCarousel = ({ products, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentIndex])


  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = products[currentIndex];

  const handleProductClick = () => {
    if (onProductClick && currentProduct) {
      onProductClick(currentProduct);
    }
  };

  return (
    <div className="mt-3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div
        className="relative bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleProductClick}
      >
        {currentProduct.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImageIndex(prev =>
                  prev === 0 ? currentProduct.images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow z-10"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() =>
                setCurrentImageIndex(prev =>
                  prev === currentProduct.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow z-10"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {currentProduct.images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${idx === currentImageIndex ? 'w-5 bg-slate-700' : 'w-1.5 bg-slate-300'
                }`}
            />
          ))}
        </div>


        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <FaTag className="text-xs" />
          SALE
        </div>

        {/* Clickable image linking to product page */}
        <a
          href={`/product/${currentProduct.slug || currentProduct.item_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full cursor-pointer"
        >
          {currentProduct.images && currentProduct.images.length > 0 ? (
            <img
              src={currentProduct.images[currentImageIndex]}
              alt={currentProduct.item_name}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png"
              }}
            />

          ) : (
            <div className="text-6xl flex items-center justify-center w-full h-full">🛋️</div>
          )}
        </a>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          {/* Clickable product name */}
          <a
            href={`/product/${currentProduct.slug || currentProduct.item_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-800 text-sm line-clamp-2 flex-1 hover:text-green-600 hover:underline transition-colors cursor-pointer"
          >
            {currentProduct.item_name || 'Product Name'}
          </a>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {currentProduct.item_description || 'Product description'}
        </p>

        <div className="text-xs text-gray-500 mb-2">
          Brand: <span className="font-semibold text-gray-700">{currentProduct.brand || 'Unknown'}</span>
        </div>

        {currentProduct.user_reviews && currentProduct.user_reviews.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-xs ${i < Math.round(currentProduct.user_reviews[0].rating) ? '' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({currentProduct.user_reviews[0].rating}/5)
            </span>
          </div>
        )}


        <div className="flex items-end gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            {formatIDR(currentProduct.prices?.sale_price || 0)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatIDR(currentProduct.prices?.full_price || 0)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <FaChevronLeft className="text-sm text-slate-700" />
          </button>

          <div className="flex gap-1">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-slate-700' : 'w-1.5 bg-slate-300'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <FaChevronRight className="text-sm text-slate-700" />
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-2">
          {currentIndex + 1} of {products.length}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;