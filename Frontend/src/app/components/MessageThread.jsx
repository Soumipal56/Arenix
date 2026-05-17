import React from 'react';
import { User, TerminalSquare, Bot } from 'lucide-react';
import { SolutionCard } from './SolutionCard';
import { JudgeVerdict } from './JudgeVerdict';

export const MessageThread = ({ message }) => {
  return (
    <div className="space-y-12 mb-24 border-b border-white/5 pb-16">
      
      {/* User Message */}
      <div className="flex justify-end">
        <div className="max-w-2xl bg-gradient-to-r from-indigo-50 dark:from-[#1E1B4B] to-indigo-100 dark:to-[#312E81] p-5 rounded-2xl rounded-tr-sm border border-indigo-200 dark:border-indigo-500/30 shadow-sm dark:shadow-[0_0_20px_rgba(79,70,229,0.15)] backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-1.5 rounded-md border border-indigo-300 dark:border-indigo-500/50 transition-colors duration-300">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs font-mono text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">User Query</span>
          </div>
          <p className="text-gray-900 dark:text-indigo-50 text-lg leading-relaxed">
            {message.problem}
          </p>
        </div>
      </div>

      {/* AI Solutions Container (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Center Decorative Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-cyan-900/50 to-transparent transform -translate-x-1/2 transition-colors duration-300"></div>
        
        {/* Solution 1 */}
        <SolutionCard 
          title="Model Alpha"
          icon={TerminalSquare}
          colorClass="cyan"
          language="Code"
          content={message.solution_1 || message.soultion_1} // Handling potential typo from data
        />

        {/* Solution 2 */}
        <SolutionCard 
          title="Model Beta"
          icon={Bot}
          colorClass="fuchsia"
          language="Code"
          content={message.solution_2 || message.soultion_2}
        />
      </div>

      {/* Judge Recommendation */}
      {message.judge && (
        <JudgeVerdict judgeData={message.judge} />
      )}

    </div>
  );
};
