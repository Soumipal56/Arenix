import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export const JudgeVerdict = ({ judgeData }) => {
  return (
    <div className="mt-12 bg-gradient-to-br from-[#1a1c0b] to-[#0a0f0a] rounded-2xl border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.1)] relative overflow-hidden">
      {/* Glowing top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
      
      <div className="p-6 border-b border-yellow-900/30 flex items-center gap-4">
        <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <Scale className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-yellow-400 font-bold text-xl tracking-wide uppercase font-mono">Judge Verdict</h2>
          <p className="text-yellow-600 text-xs font-mono">Automated Evaluation Protocol</p>
        </div>
      </div>
      
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Judge reasoning for Solution 1 */}
        <div className="space-y-4 relative">
          <div className="flex items-end justify-between border-b border-cyan-900/40 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              <span className="text-cyan-400 font-mono text-sm">Model Alpha Evaluation</span>
            </div>
            <div className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              {judgeData.solution_1_score}<span className="text-lg text-cyan-700">/10</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {judgeData.solution_1_reasoning}
          </p>
        </div>

        {/* Judge reasoning for Solution 2 */}
        <div className="space-y-4 relative">
          <div className="flex items-end justify-between border-b border-fuchsia-900/40 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-fuchsia-500" />
              <span className="text-fuchsia-400 font-mono text-sm">Model Beta Evaluation</span>
            </div>
            <div className="text-3xl font-bold text-fuchsia-300 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
              {judgeData.solution_2_score}<span className="text-lg text-fuchsia-700">/10</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {judgeData.solution_2_reasoning}
          </p>
        </div>
      </div>
    </div>
  );
};
