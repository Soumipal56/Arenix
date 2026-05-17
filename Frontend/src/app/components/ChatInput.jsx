import React from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({ input, setInput, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="w-full bg-gradient-to-t from-[#060913] via-[#060913] to-transparent pt-10 pb-8 px-4 mt-auto pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter prompt for Arenix..."
            className="w-full bg-[#0b0f19] border border-cyan-800/50 rounded-full py-4 pl-6 pr-16 text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all"
          />
          <button 
            onClick={onSend}
            disabled={!input.trim()}
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
