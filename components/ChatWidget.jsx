'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State untuk loading indicator
  const messagesEndRef = useRef(null);

  // Initial Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          text: "Halo! Saya asisten virtual Home Decor Indonesia. Ada yang bisa saya bantu?",
          isAgent: true
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // 1. Tambah pesan User ke UI
    const userMessage = { 
      id: Date.now(), 
      text: inputValue, 
      isAgent: false 
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue; // Simpan untuk dikirim
    setInputValue("");
    setIsLoading(true); // Mulai loading

    try {
      // 2. Kirim ke Backend AI (Pastikan port sesuai)
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentInput,
          userId: 'guest-web-user' // Bisa diganti session ID
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      // 3. Tambah balasan AI ke UI
      const agentResponse = {
        id: Date.now() + 1,
        text: data.response, // Pastikan key sesuai dengan response backend 
        isAgent: true
      };

      setMessages(prev => [...prev, agentResponse]);

    } catch (error) {
      console.error('Error:', error);
      // Fallback error message di UI
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Maaf, server sedang sibuk. Mohon coba lagi nanti.",
        isAgent: true
      }]);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* --- CHAT WINDOW --- */}
      <div className={`
        flex flex-col
        fixed bottom-[90px] right-6 
        w-[350px] h-[500px] 
        bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100
        transition-all duration-300 origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
      `}>
        
        {/* Header */}
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
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div 
                key={msg.id || index} 
                className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${
                  msg.isAgent 
                    ? 'bg-white border border-gray-200 text-gray-700 self-start rounded-bl-none' 
                    : 'bg-slate-800 text-white self-end rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Loading Indicator (Typing bubble) */}
            {isLoading && (
              <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1 w-16">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 text-gray-800 transition-all"
            placeholder="Tulis pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`
              p-3 rounded-full text-white transition-all shadow-md flex items-center justify-center
              ${!inputValue.trim() || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-700 hover:scale-105'}
            `}
          >
            <FaPaperPlane className="ml-[-2px]" /> {/* Adjustment biar icon terlihat tengah */}
          </button>
        </form>
      </div>

      {/* --- TOGGLE BUTTON (Floating) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center
          w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ease-in-out
          ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-green-600 hover:bg-green-700 hover:scale-110 animate-bounce-slow'}
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

export default ChatWidget;