import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { Check, Zap, Sparkles, Shield, Cpu, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const plans = [
  {
    name: "Spark",
    price: "Free",
    description: "Perfect for exploring AI creation.",
    features: ["3 AI Generations / mo", "Standard Support", "AuraFlow Subdomain", "Community Access"],
    button: "Get Started",
    popular: false,
    color: "bg-white/5",
    accent: "text-gray-400",
    accentBg: "bg-gray-400/10"
  },
  {
    name: "Flux",
    price: "$29",
    description: "For professionals building the future.",
    features: ["Unlimited Generations", "Priority Neural Queue", "Custom Domains", "Advanced Analytics", "White-label Option"],
    button: "Upgrade to Flux",
    popular: true,
    color: "bg-blue-600/10",
    accent: "text-blue-400",
    accentBg: "bg-blue-400/10"
  },
  {
    name: "Nebula",
    price: "$99",
    description: "Enterprise grade AI infrastructure.",
    features: ["Dedicated AI Instance", "Design Concierge", "SLA Guarantee", "Advanced Security", "Custom AI Models"],
    button: "Contact Sales",
    popular: false,
    color: "bg-white/5",
    accent: "text-violet-400",
    accentBg: "bg-violet-400/10"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-8">
            Flexible Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Creation Engine.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Scale your design ambitions with our neural processing tiers. From casual exploration to enterprise deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative group p-10 rounded-[40px] border border-white/5 transition-all hover:border-white/10 overflow-hidden",
                p.popular ? "glass ring-2 ring-blue-500/50 shadow-[0_0_80px_rgba(59,130,246,0.1)]" : "bg-white/[0.02]"
              )}
            >
              {p.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-blue-500 text-[10px] font-black rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="text-left mb-10">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{p.price}</span>
                  {p.price !== 'Free' && <span className="text-gray-500 font-bold">/mo</span>}
                </div>
                <p className="mt-4 text-gray-500 text-sm font-medium leading-relaxed">{p.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", p.accentBg)}>
                      <Check size={12} className={p.accent} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]",
                p.popular 
                  ? "bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}>
                {p.button}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Mini */}
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-12 text-left relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">Need a custom instance?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                For teams requiring high-volume generation, custom trained models, and air-gapped security protocols.
              </p>
              <button className="flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Speak with Enterprise Team <ArrowRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Cpu, label: "Private GPU" },
                { icon: Shield, label: "SOC2 Ready" },
                { icon: Zap, label: "Zero Latency" },
                { icon: Sparkles, label: "Custom Models" },
              ].map(item => (
                <div key={item.label} className="p-4 bg-white/5 rounded-2xl flex flex-col items-center gap-3 text-center border border-white/5">
                  <item.icon className="text-blue-400" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
