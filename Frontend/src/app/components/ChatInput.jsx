import React from 'react';
import { Send } from 'lucide-react';
import axios from "axios";

export const ChatInput = ({ input, setInput, onSend, loading, setLoading }) => {

  const handleSendClick = async () => {
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      const response = await axios.post('/invoke', { input });
      console.log(response.data);
      
      onSend(response.data.result);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="w-full bg-gradient-to-t from-gray-50 dark:from-[#060913] via-gray-50 dark:via-[#060913] to-transparent pt-10 pb-8 px-4 mt-auto pointer-events-none transition-colors duration-300">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter prompt for Arenix..."
            disabled={loading}
            className="w-full bg-white dark:bg-[#0b0f19] border border-gray-300 dark:border-cyan-800/50 rounded-full py-4 pl-6 pr-16 text-gray-900 dark:text-cyan-100 placeholder-gray-400 dark:placeholder-cyan-800 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-indigo-500/50 dark:focus:ring-cyan-400/50 shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            onClick={handleSendClick}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed p-2.5 rounded-full text-white transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-3">
          <span className="text-[10px] text-gray-500 font-mono">Arenix V1.0.0 // ENCRYPTED CONNECTION // WAITING FOR INPUT</span>
        </div>
      </div>
    </div>
  );
};
