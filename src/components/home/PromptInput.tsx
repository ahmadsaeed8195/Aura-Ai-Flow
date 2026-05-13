import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wand2, Mic, Sparkles, Send, Trash2, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
}

export function PromptInput({ onGenerate }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const suggestions = [
    "Futuristic AI startup landing page with glassmorphism",
    "Luxury organic skin care ecommerce store",
    "Minimalist architect portfolio with dark mode",
    "Fintech dashboard with real-time data visualizers",
  ];

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-12 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative group mt-4"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-25" />
        <div className="relative glass neon-border rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-start gap-4">
             <div className="mt-1 text-blue-400">
               <Wand2 size={24} />
             </div>
             <textarea
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               placeholder="Build a futuristic luxury real estate platform..."
               className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full resize-none h-24 text-lg font-light focus:ring-0"
               onKeyDown={(e) => {
                 if (e.key === "Enter" && !e.shiftKey) {
                   e.preventDefault();
                   handleGenerate();
                 }
               }}
             />
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex gap-2">
               {["Minimalist", "SaaS UI", "Cyberpunk"].map(tag => (
                 <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-500 border border-white/10">
                   {tag}
                 </span>
               ))}
            </div>
            
            <div className="flex items-center gap-3">
               <button
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  isRecording ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-white"
                )}
              >
                <Mic size={20} />
              </button>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 text-white disabled:opacity-50"
              >
                Generate <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap justify-center gap-3 mt-8"
      >
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setPrompt(s)}
            className="text-xs font-medium text-zinc-500 hover:text-indigo-400 transition-colors px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:border-indigo-500/30"
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => setPrompt(suggestions[Math.floor(Math.random() * suggestions.length)])}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5"
        >
          Surprise Me
        </button>
      </motion.div>
    </div>
  );
}
