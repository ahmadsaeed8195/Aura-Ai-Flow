import React, { useState } from "react";
import { Navbar } from "../common/Navbar";
import { PromptInput } from "./PromptInput";
import { GenerationOverlay } from "./GenerationOverlay";
import { Pricing } from "./Pricing";
import { generateWebsiteFromPrompt } from "../../services/geminiService";
import { GeneratedWebsite } from "../../types";
import { motion } from "motion/react";
import { Monitor, Smartphone, Layout, Cpu } from "lucide-react";

interface LandingPageProps {
  onGenerationComplete: (site: GeneratedWebsite) => void;
}

export function LandingPage({ onGenerationComplete }: LandingPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedWebsite | null>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const site = await generateWebsiteFromPrompt(prompt);
      setGeneratedSite(site);
    } catch (error) {
      setIsGenerating(false);
    }
  };

  const handleOverlayComplete = () => {
    if (generatedSite) {
      onGenerationComplete(generatedSite);
    }
    setIsGenerating(false);
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col pt-20">
      <Navbar />
      
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-12 py-10 mt-10">
        {/* Left Side: Content & Input */}
        <div className="md:col-span-7 flex flex-col justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] uppercase tracking-widest text-blue-400 font-bold w-fit"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            Next-Gen AI Model 4.0 Active
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            The future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400">
              web creation
            </span>
            <br />
            starts here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-md leading-relaxed"
          >
            Describe your vision in natural language. Our neural engine builds, optimizes, and deploys your high-performance site in seconds.
          </motion.p>

          <div className="w-full">
            <PromptInput onGenerate={handleGenerate} />
          </div>
        </div>

        {/* Right Side: Visual Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-5 flex flex-col justify-center"
        >
          <div className="relative h-[550px] w-full glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              <div className="ml-4 bg-white/5 px-4 py-0.5 rounded-full text-[10px] text-gray-500 font-mono tracking-tighter">
                preview.auraflow.ai/v4-783a
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="flex justify-between items-center mb-4">
                <div className="w-24 h-4 bg-white/10 rounded-full" />
                <div className="flex gap-2">
                  <div className="w-6 h-4 bg-white/10 rounded" />
                  <div className="w-6 h-4 bg-white/10 rounded" />
                  <div className="w-6 h-4 bg-white/10 rounded" />
                </div>
              </div>

              <div className="w-full h-40 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[10px] text-blue-400 font-mono uppercase mb-2 tracking-widest">
                    AI Generation Matrix
                  </div>
                  <div className="text-3xl font-bold">98.2% Ready</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 glass rounded-xl border border-white/10 p-3">
                  <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase">Layout Engine</div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "88%" }}
                       className="h-full bg-blue-500" 
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-400">Mapping nodes...</div>
                </div>
                <div className="h-24 glass rounded-xl border border-white/10 p-3">
                  <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase">Asset Synthesis</div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "72%" }}
                       className="h-full bg-violet-500" 
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-400">Optimizing SVGs...</div>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Design Score</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">98.7</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400">
                    <Smartphone size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400">
                    <Monitor size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <div className="px-6 md:px-12">
        <Pricing />
      </div>

      <footer className="relative z-10 h-14 px-8 flex flex-col md:flex-row items-center justify-between glass text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-20 gap-4 py-4 md:py-0">
        <div className="flex gap-6">
          <span>Status: <span className="text-emerald-500">Operational</span></span>
          <span>Latency: 42ms</span>
          <span>Uptime: 99.99%</span>
        </div>
        <div>© 2026 AURAFLOW TECHNOLOGIES CORP — v0.12.5-BETA</div>
        <div className="flex gap-4">
          <span>Protocol: O1-MAX</span>
          <span>Region: US-EAST-1</span>
        </div>
      </footer>

      <GenerationOverlay isVisible={isGenerating} onComplete={handleOverlayComplete} />
    </div>
  );
}

