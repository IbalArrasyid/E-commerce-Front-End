"use client"

import React, { useState, useRef, useEffect } from 'react';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // State untuk menyimpan riwayat chat
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant', // 'user' atau 'assistant'
      text: 'Halo! Saya asisten virtual Home Decor Indonesia. Ada yang bisa saya bantu terkait produk atau showroom kami?'
    }
  ]);

  // Fungsi untuk scroll otomatis ke pesan terbawah
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Fungsi saat user mengirim pesan
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Tampilkan pesan User di layar
    const userMessage = { id: Date.now(), role: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    
    const originalInput = inputValue; // Simpan teks untuk dikirim
    setInputValue(""); // Kosongkan input
    setIsLoading(true);

    try {
      // 2. TEMBAK API KE BACK-END SENDIRI
      const response = await fetch('http://localhost:8000/chat', { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          message: originalInput,
          userId: 'guest-123' // Opsional
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server AI');
      }

      const data = await response.json();
      
      // 3. Tampilkan balasan dari Server
      const aiMessage = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: data.response // Pastikan ini sesuai dengan JSON dari backend (res.json({ reply: ... }))
      };
      
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: "Maaf, server AI sedang sibuk atau tidak dapat dihubungi." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      
      {/* --- CHAT WINDOW (Muncul saat isOpen == true) --- */}
      <div className={`
        w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col
        transition-all duration-300 origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'}
      `}>
        
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
               {/* Icon Bot */}
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-slate-300">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition">
            {/* Icon Close */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`max-w-[80%] p-3 text-sm rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white self-end rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-700 self-start rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
               <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tanya tentang produk..."
            className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 text-gray-800"
          />
          <button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Icon Send */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>

      </div>

      {/* --- FLOATING TRIGGER BUTTON (Pengganti tombol WA) --- */}
      <div className="flex items-center gap-3">
        {/* Label Hover (Tooltip) */}
        <div className={`
          bg-white text-slate-800 px-4 py-2 rounded-lg shadow-md border border-gray-100
          transition-all duration-300 text-sm font-medium
          ${!isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}>
          Tanya AI Kami 👋
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300
            ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-slate-900 hover:bg-slate-800 hover:scale-105'}
          `}
        >
           {isOpen ? (
             // Icon Close (X) saat terbuka
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
           ) : (
             // Icon Chat/Bot saat tertutup
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
           )}
        </button>
      </div>

    </div>
  );
}