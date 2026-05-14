import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Download, 
  Undo2, 
  Redo2, 
  Maximize2,
  ChevronLeft,
  Settings,
  Plus,
  Palette,
  Type as TypeIcon,
  Layout,
  Share2,
  Sparkles
} from "lucide-react";
import { GeneratedWebsite, ThemeMode } from "../../types";
import { SiteRenderer } from "./SiteRenderer";
import { cn } from "../../lib/utils";

interface EditorProps {
  site: GeneratedWebsite;
  onExit: () => void;
}

function idx_to_hex(n: number) {
  return Math.floor(n * 1234 + 5678).toString(16).toUpperCase().substring(0, 4);
}

export function Editor({ site: initialSite, onExit }: EditorProps) {
  const [site, setSite] = useState(initialSite);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"theme" | "sections" | "content">("theme");

  const themes: ThemeMode[] = ["Dark", "Light", "Cyberpunk", "Glassmorphism", "Corporate", "Luxury"];
  const fonts = ["Inter", "Space Grotesk", "Outfit", "Playfair Display", "JetBrains Mono"];

  return (
    <div className="fixed inset-0 z-50 bg-[#020205] flex flex-col h-screen overflow-hidden text-white font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
          >
            <ChevronLeft />
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-[10px] font-bold">
              {site.title.charAt(0)}
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-wide">{site.title.toUpperCase()}</h2>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-blue-400 uppercase tracking-widest font-bold">Concept Neural_X</span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Draft v0.12.5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {[
            { id: "desktop", icon: Monitor },
            { id: "tablet", icon: Tablet },
            { id: "mobile", icon: Smartphone }
          ].map(device => (
            <button 
              key={device.id}
              onClick={() => setPreviewMode(device.id as any)}
              className={cn(
                "p-2 rounded-lg transition-all", 
                previewMode === device.id ? "bg-white/5 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <device.icon size={16} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest border border-white/5">
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95">
            <Download size={14} />
            Export Code
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Component Library */}
        <aside className="w-72 border-r border-white/5 flex flex-col bg-[#020205]">
           <div className="p-6 border-b border-white/5">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Neural Components</h3>
              <div className="space-y-3">
                {["Hero Section", "Product Grid", "Feature Flow", "Timeline", "Newsletter", "Dashboard", "Footer"].map(type => (
                  <button 
                    key={type}
                    className="w-full flex items-center justify-between p-4 rounded-2xl glass hover:border-white/20 transition-all group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{type}</span>
                    <Plus size={14} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>
           </div>
           
           <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Active Logic Nodes</h3>
              <div className="space-y-2">
                {site.sections.map((sec, i) => (
                  <div key={sec.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-zinc-600">0{i+1}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest">{sec.type}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  </div>
                ))}
              </div>
           </div>
        </aside>

        {/* Center: Live Editor Workspace */}
        <main className="flex-1 bg-[#050505] overflow-hidden flex flex-col relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
             <motion.div 
               layout
               className={cn(
                 "bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden rounded-[24px] transition-all duration-700 h-full max-h-[850px] border-[12px] border-zinc-900 relative",
                 previewMode === "desktop" ? "w-full" : previewMode === "tablet" ? "w-[768px]" : "w-[390px]"
               )}
             >
                <div className="w-full h-full overflow-y-auto scrollbar-hide">
                  <SiteRenderer site={site} isMobile={previewMode === "mobile"} />
                </div>
                
                {/* Visual Guidelines */}
                <div className="absolute inset-0 border border-blue-500/20 pointer-events-none" />
             </motion.div>
          </div>

          <footer className="h-10 border-t border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-6 gap-8 relative z-20">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest font-mono">NEURAL_SYNC: ACTIVE</span>
             </div>
             <div className="h-3 w-px bg-white/10" />
             <div className="text-[9px] text-zinc-600 uppercase font-black tracking-widest font-mono">LATENCY: 12ms</div>
             <div className="ml-auto text-[9px] text-zinc-600 uppercase font-bold tracking-widest font-mono italic">
               Design Fidelity v4.28.alpha
             </div>
          </footer>
        </main>

        {/* Right Panel: Properties */}
        <aside className="w-80 border-l border-white/5 flex flex-col bg-[#020205]">
           <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              <div>
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Neural Stylizer</h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSite({ ...site, theme: t })}
                      className={cn(
                        "px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                        site.theme === t 
                          ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20" 
                          : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Type Protocols</h3>
                <div className="space-y-2">
                  {fonts.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSite({ ...site, font: f })}
                      className={cn(
                        "w-full px-4 py-3 rounded-2xl border text-[11px] font-bold transition-all text-left flex items-center justify-between uppercase tracking-widest",
                        site.font === f 
                          ? "bg-white/5 border-white/30 text-white" 
                          : "bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10"
                      )}
                      style={{ fontFamily: `'${f}', sans-serif` }}
                    >
                      {f}
                      {site.font === f && <Sparkles size={12} className="text-blue-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={20} className="text-blue-400" />
                  <h4 className="text-xs font-black uppercase tracking-tight">AI Flow Optimizer</h4>
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-wide mb-6">
                  Automatically correct spacing, alignment, and visual hierarchy across all viewports.
                </p>
                <button className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl">
                  Run Optimization
                </button>
              </div>
           </div>

           <div className="p-6 border-t border-white/5 bg-black/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-mono">Neural Score</span>
                <span className="text-[10px] font-mono font-black text-emerald-400">98.2%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "98.2%" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
