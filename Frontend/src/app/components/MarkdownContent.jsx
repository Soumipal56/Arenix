import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const MarkdownContent = ({ content }) => (
  <div className="prose prose-invert max-w-none text-sm text-gray-300">
    <ReactMarkdown
      components={{
        h3: ({node, ...props}) => <h3 className="text-cyan-400 font-bold mt-4 mb-2 text-lg drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
        li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
        strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="rounded-lg overflow-hidden my-4 border border-cyan-900/50 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                style={atomOneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{ margin: 0, padding: '1rem', background: '#0b0f19' }}
              />
            </div>
          ) : (
            <code className="bg-[#1A1A2E] text-magenta-400 px-1 py-0.5 rounded text-xs" {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);
