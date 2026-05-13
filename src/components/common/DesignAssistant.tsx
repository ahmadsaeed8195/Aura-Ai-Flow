import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { cn } from "../../lib/utils";

export function DesignAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AuraFlow Design Assistant. How can I help you improve your website today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "I'm analyzing your design... AuraFlow suggests improving the spacing in the hero section for better visual hierarchy." }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-600/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <Sparkles className="group-hover:rotate-12 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-[60] w-[380px] bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center relative">
                   <Bot size={20} className="text-white" />
                   <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Design Co-pilot</h3>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active & Thinking</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px]">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    m.role === "ai" 
                      ? "bg-white/5 text-zinc-300 rounded-tl-none border border-white/5" 
                      : "bg-indigo-600 text-white ml-auto rounded-tr-none shadow-lg shadow-indigo-600/10"
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask for design advice..."
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl py-3 px-4 pr-12 text-sm text-white focus:border-indigo-500 focus:ring-0 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
