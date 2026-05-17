import React from 'react';
import { MarkdownContent } from './MarkdownContent';

export const SolutionCard = ({ title, icon: Icon, colorClass, language, content }) => {
  // Determine color theme classes
  const themeStyles = {
    cyan: {
      border: "border-cyan-200 dark:border-cyan-500/20",
      hoverBorder: "hover:border-cyan-400 dark:hover:border-cyan-500/40",
      shadow: "shadow-md dark:shadow-[0_0_30px_rgba(0,229,255,0.05)]",
      headerBg: "from-cyan-50 dark:from-cyan-950/30",
      iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
      iconBorder: "border-cyan-300 dark:border-cyan-500/30",
      iconShadow: "group-hover:shadow-lg dark:group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      titleColor: "text-cyan-800 dark:text-cyan-300",
      tagBg: "bg-cyan-100 dark:bg-cyan-950/50",
      tagText: "text-cyan-800 dark:text-cyan-600"
    },
    fuchsia: {
      border: "border-fuchsia-200 dark:border-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-400 dark:hover:border-fuchsia-500/40",
      shadow: "shadow-md dark:shadow-[0_0_30px_rgba(255,0,255,0.05)]",
      headerBg: "from-fuchsia-50 dark:from-fuchsia-950/30",
      iconBg: "bg-fuchsia-100 dark:bg-fuchsia-500/10",
      iconBorder: "border-fuchsia-300 dark:border-fuchsia-500/30",
      iconShadow: "group-hover:shadow-lg dark:group-hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
      titleColor: "text-fuchsia-800 dark:text-fuchsia-300",
      tagBg: "bg-fuchsia-100 dark:bg-fuchsia-950/50",
      tagText: "text-fuchsia-800 dark:text-fuchsia-600"
    }
  };

  const theme = themeStyles[colorClass] || themeStyles.cyan;

  return (
    <div className={`bg-white dark:bg-[#0b0f19] rounded-2xl border ${theme.border} ${theme.shadow} overflow-hidden flex flex-col ${theme.hoverBorder} transition-colors duration-500 group`}>
      <div className={`p-4 border-b border-gray-100 dark:border-white/5 bg-gradient-to-r ${theme.headerBg} to-transparent flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`${theme.iconBg} p-2 rounded-lg border ${theme.iconBorder} ${theme.iconShadow} transition-all duration-300`}>
            <Icon className={`w-5 h-5 ${theme.iconColor}`} />
          </div>
          <h2 className={`${theme.titleColor} font-mono font-semibold tracking-wide`}>{title}</h2>
        </div>
        <div className={`text-xs font-mono ${theme.tagText} ${theme.tagBg} px-2 py-1 rounded transition-colors duration-300`}>{language}</div>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
};
