import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  Fingerprint,
  Mic
} from "lucide-react";
import { cn } from "../lib/utils";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Protocol established. I am Aura Alpha-4. How shall we evolve your interface today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Query analyzed. Optimizing layout parameters based on neural design principles. Should I apply the 'Nebula' color system to your active project?" }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-6 px-6 max-w-5xl mx-auto w-full flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Sparkles className="text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Design Oracle</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Neural Link Active</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Optimized Performance
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-8 mb-12 overflow-y-auto">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-6 max-w-3xl",
                m.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                m.role === 'ai' ? "bg-blue-500/10 border-blue-500/20" : "bg-white/5 border-white/10"
              )}>
                {m.role === 'ai' ? <Sparkles size={18} className="text-blue-400" /> : <Fingerprint size={18} className="text-gray-400" />}
              </div>
              <div className={cn(
                "p-6 rounded-[24px] text-sm font-medium leading-relaxed",
                m.role === 'ai' ? "glass bg-blue-500/5" : "bg-white/5 border border-white/5"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Describe your design evolution..."
            className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 pl-8 pr-32 outline-none focus:border-blue-500/50 transition-all resize-none min-h-[100px] text-lg font-medium"
          />
          <div className="absolute right-4 bottom-4 flex gap-2">
            <button className="p-4 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSend}
              className="px-6 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all"
            >
              Sync
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
