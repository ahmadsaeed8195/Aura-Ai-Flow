import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  Zap, 
  Layout, 
  Smartphone, 
  MousePointer2, 
  Cpu, 
  Globe, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { cn } from "../lib/utils";

const features = [
  {
    title: "Neural Layout Engine",
    description: "Our AI doesn't just use templates; it understands spatial hierarchy and semantic intent to build unique layouts from scratch.",
    icon: Layout,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Adaptive Responsive System",
    description: "Every pixel is calculated for infinite viewports. Buttons, margins, and typography scale intelligently across all devices.",
    icon: Smartphone,
    color: "text-violet-400",
    bg: "bg-violet-400/10"
  },
  {
    title: "AI Design Assistant",
    description: "Real-time design audits that suggest improvements in readability, contrast, and visual rhythm as you build.",
    icon: Sparkles,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "One-Click Deployment",
    description: "Go from prompt to live URL in under 60 seconds. We handle the infrastructure, SSL, and edge delivery.",
    icon: Globe,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-400/10"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-8"
          >
            Capabilities Portfolio
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8"
          >
            Everything you need <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              to build with AI.
            </span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            AuraFlow AI combines high-performance neural engines with production-grade web infrastructure to deliver the future of creation.
          </p>
        </div>
        
        {/* Animated Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
        </div>
      </section>

      {/* Interactive Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[32px] glass hover:border-white/20 transition-all overflow-hidden"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", f.bg)}>
                <f.icon className={f.color} size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {f.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
                Learn more <ArrowRight size={16} />
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Pipeline */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto border border-white/5 rounded-[40px] p-12 relative overflow-hidden backdrop-blur-3xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Generation Pipeline</h2>
              <ul className="space-y-6">
                {[
                  "Semantic Parsing of User Intent",
                  "Real-time Component Synthesis",
                  "Automated Asset Delivery (SVGs, WebP)",
                  "Edge-ready Deployment (Vercel/Netlify/CloudRun)"
                ].map((item, i) => (
                  <motion.li 
                    key={`pipeline-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-gray-400"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                       <CheckCircle2 size={14} className="text-blue-400" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative">
               <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-full border border-white/10 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                 <Cpu size={80} className="text-blue-400/40" />
                 <div className="absolute inset-0 border-2 border-dashed border-blue-500/10 rounded-full scale-110" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 italic">Ready to experience the future?</h2>
        <button className="px-10 py-5 bg-white text-black rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all">
          Start Your First Design
        </button>
      </section>
    </div>
  );
}
