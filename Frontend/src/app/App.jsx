import React, { useState, useRef, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { MessageThread } from './components/MessageThread';
import { ChatInput } from './components/ChatInput';
import './App.css';

// Initial Mock Data
const INITIAL_MOCK_DATA = {
  problem: "Write an code for Factorial function in js",
  solution_1: "Here's a simple implementation of a factorial function in JavaScript using both **iterative** and **recursive** approaches:\n\n### 1. **Iterative Approach (Using a Loop)**\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) return NaN; // Factorial of negative numbers is undefined\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nconsole.log(factorialIterative(5)); // Output: 120 (5! = 5 × 4 × 3 × 2 × 1 = 120)\n```\n\n### 2. **Recursive Approach (Function calls itself)**\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return NaN; // Factorial of negative numbers is undefined\n    if (n === 0 || n === 1) return 1; // Base case: 0! = 1 and 1! = 1\n    return n * factorialRecursive(n - 1);\n}\n\nconsole.log(factorialRecursive(5)); // Output: 120\n```\n\n### 3. **One-Liner (Using Arrow Function & Ternary Operator)**\n```javascript\nconst factorial = (n) => n < 0 ? NaN : n <= 1 ? 1 : n * factorial(n - 1);\n\nconsole.log(factorial(5)); // Output: 120\n```\n\n### **Key Notes:**\n- **Factorial of 0 (`0!`)** is `1`.\n- **Negative numbers** return `NaN` (Not a Number) since factorial is not defined for them.\n- **Recursive approach** is elegant but may cause a stack overflow for very large `n` (due to call stack limits).\n- **Iterative approach** is more efficient for large numbers.\n\nWould you like an optimized version for very large numbers (e.g., using memoization or BigInt)? 😊",
  solution_2: "Certainly! Below is a simple implementation of a factorial function in JavaScript. This function calculates the factorial of a given non-negative integer `n`.\n\n```javascript\nfunction factorial(n) {\n    if (n < 0) {\n        throw new Error(\"Factorial is not defined for negative numbers.\");\n    }\n    if (n === 0 || n === 1) {\n        return 1;\n    }\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorial(5)); // Output: 120\nconsole.log(factorial(0)); // Output: 1\nconsole.log(factorial(10)); // Output: 3628800\n```\n\n### Explanation:\n- **Input Validation**: The function first checks if the input `n` is negative. If it is, an error is thrown because the factorial is not defined for negative numbers.\n- **Base Case**: If `n` is 0 or 1, the function returns 1, as the factorial of 0 and 1 is defined to be 1.\n- **Iterative Calculation**: For `n > 1`, the function initializes `result` to 1 and then iterates from 2 to `n`, multiplying `result` by each integer in this range.\n\n### Recursive Version:\nIf you prefer a recursive implementation, here it is:\n\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) {\n        throw new Error(\"Factorial is not defined for negative numbers.\");\n    }\n    if (n === 0 || n === 1) {\n        return 1;\n    }\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\nconsole.log(factorialRecursive(0)); // Output: 1\nconsole.log(factorialRecursive(10)); // Output: 3628800\n```\n\nBoth versions will correctly compute the factorial of a non-negative integer. Choose the one that best fits your needs or preferences.",
  judge: {
      solution_1_score: 10,
      solution_2_score: 10,
      solution_1_reasoning: "Solution 1 provides multiple implementations (iterative, recursive, and a one-liner arrow function) which gives the user options based on their coding style. It also includes helpful notes regarding the base case for 0!, the handling of negative numbers, and potential performance/memory issues like stack overflow in the recursive version. Returning NaN for negative numbers is a valid mathematical approach in JavaScript.",
      solution_2_reasoning: "Solution 2 is also excellent and follows best practices. It provides both iterative and recursive implementations with clear explanations. It uses a robust error-handling approach by throwing an Error for negative inputs, which is often preferred in production code over returning NaN. The code is clean, well-commented, and includes multiple example use cases."
  }
};

function App() {
  const [messages, setMessages] = useState([INITIAL_MOCK_DATA]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Create a new simulated message
    const newMessage = {
      problem: input,
      solution_1: `Here is a **simulated response** from Model Alpha for: "${input}"\n\n\`\`\`javascript\nconst example = "Hello Alpha";\nconsole.log(example);\n\`\`\``,
      solution_2: `Here is a **simulated response** from Model Beta for: "${input}"\n\n\`\`\`python\nexample = "Hello Beta"\nprint(example)\n\`\`\``,
      judge: {
        solution_1_score: Math.floor(Math.random() * 3) + 8, // Random score between 8-10
        solution_2_score: Math.floor(Math.random() * 3) + 8, // Random score between 8-10
        solution_1_reasoning: "Model Alpha provides a concise and accurate javascript snippet.",
        solution_2_reasoning: "Model Beta provides a well-structured python alternative."
      }
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="h-screen bg-[#060913] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="border-b border-cyan-900/50 bg-[#0b0f19]/80 backdrop-blur-md shrink-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wide font-mono">
                <span className="text-white">Arenix</span>
              </h1>
              <div className="text-[10px] text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                System Online
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="px-4 py-1.5 rounded-full bg-[#111827] border border-cyan-900/50 text-xs text-cyan-400 shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]">
              Evaluation Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
          {messages.map((msg, index) => (
            <MessageThread key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <ChatInput 
          input={input} 
          setInput={setInput} 
          onSend={handleSend} 
        />
      </div>
    </div>
  );
}

export default App;
