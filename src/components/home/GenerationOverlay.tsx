import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, BrainCircuit, Cpu, Layers, Globe, CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface GenerationOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

const steps = [
  { id: "analyzing", label: "Analyzing prompt intent...", icon: BrainCircuit, color: "from-blue-400 to-blue-600" },
  { id: "layout", label: "Generating semantic structure...", icon: Layers, color: "from-violet-400 to-violet-600" },
  { id: "components", label: "Synthesizing UI components...", icon: Cpu, color: "from-fuchsia-400 to-fuchsia-600" },
  { id: "theme", label: "Applying visual design tokens...", icon: Globe, color: "from-blue-400 to-violet-600" },
  { id: "preview", label: "Optimizing responsive experience...", icon: Sparkles, color: "from-emerald-400 to-emerald-600" },
];

export function GenerationOverlay({ isVisible, onComplete }: GenerationOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStepIndex(0);
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 0.3;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  useEffect(() => {
    const stepProgressRange = 100 / steps.length;
    const newIndex = Math.floor(progress / stepProgressRange);
    if (newIndex < steps.length) {
      setCurrentStepIndex(newIndex);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020205] backdrop-blur-3xl overflow-hidden"
        >
          {/* Neural Visualization Background Nodes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
             {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i <= currentStepIndex ? 1 : 0.1 }}
                  className={cn(
                    "absolute w-64 h-64 rounded-full blur-[80px]",
                    i === 0 ? "top-1/4 left-1/4" : 
                    i === 1 ? "top-1/2 left-1/3" : 
                    i === 2 ? "top-1/4 right-1/4" : 
                    i === 3 ? "bottom-1/4 left-1/2" : "bottom-1/3 right-1/3",
                    `bg-gradient-to-br ${step.color}`
                  )}
                />
             ))}
          </div>

          <div className="max-w-xl w-full px-8 text-center z-10">
            {/* Spec: Neural Visualization Flow */}
            <div className="flex justify-between items-center mb-12 relative">
               {steps.map((step, i) => (
                 <React.Fragment key={step.id}>
                   <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ 
                       scale: i === currentStepIndex ? 1.2 : 1, 
                       opacity: i <= currentStepIndex ? 1 : 0.3,
                       borderColor: i <= currentStepIndex ? "#3b82f6" : "#27272a"
                     }}
                     className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all relative z-10 bg-black/40 backdrop-blur-xl",
                        i === currentStepIndex ? "shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-500" : "border-white/10"
                     )}
                   >
                     <step.icon size={20} className={i <= currentStepIndex ? "text-blue-400" : "text-zinc-600"} />
                   </motion.div>
                   {i < steps.length - 1 && (
                     <div className="flex-1 h-px bg-white/10 relative overflow-hidden mx-2">
                        <motion.div 
                          initial={{ left: "-100%" }}
                          animate={{ left: i < currentStepIndex ? "0%" : "-100%" }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600"
                        />
                     </div>
                   )}
                 </React.Fragment>
               ))}
            </div>

            <motion.div
              key={steps[currentStepIndex].label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                {steps[currentStepIndex].label}
              </h2>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                Neural Generation Alpha-4 Protocol
              </p>
            </motion.div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-12 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500"
              />
            </div>

            <div className="glass p-6 rounded-2xl border-white/5 text-left font-mono">
               <div className="flex items-center justify-between text-[10px] text-gray-500 mb-4 uppercase tracking-tighter">
                  <span>Log Process System</span>
                  <span className="text-blue-400 animate-pulse">Live</span>
               </div>
               <div className="space-y-1 h-32 overflow-hidden flex flex-col justify-end">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-[10px] text-zinc-400"
                    >
                      [{new Date().toLocaleTimeString()}] NODE_SYNC_{idx_to_hex(i + idx_to_num(progress))}: DATA_PACKET_RECEIVED
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function idx_to_hex(n: number) {
  return Math.floor(n * 1234).toString(16).toUpperCase().substring(0, 4);
}
function idx_to_num(n: number) {
  return Math.floor(n);
}
