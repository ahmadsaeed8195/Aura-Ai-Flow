import React from "react";
import { GeneratedWebsite, ThemeMode } from "../../types";
import { 
  Sparkles, 
  ChevronRight, 
  Star, 
  MapPin, 
  Mail, 
  Phone,
  Layout,
  Layers,
  Cpu,
  Globe
} from "lucide-react";

interface SiteRendererProps {
  site: GeneratedWebsite;
  isMobile?: boolean;
}

export function SiteRenderer({ site, isMobile }: SiteRendererProps) {
  const getThemeStyles = (theme: ThemeMode) => {
    switch (theme) {
      case "Dark":
        return "bg-[#020205] text-white";
      case "Cyberpunk":
        return "bg-[#050505] text-blue-400 font-mono tracking-tighter selection:bg-blue-400 selection:text-black";
      case "Glassmorphism":
        return "bg-black text-white backdrop-blur-3xl bg-[radial-gradient(circle_at_top_right,#1e1b4b,transparent_50%)]";
      case "Luxury":
        return "bg-[#0f0f0f] text-[#d4af37] font-serif tracking-tight selection:bg-[#d4af37] selection:text-black";
      case "Corporate":
        return "bg-slate-50 text-slate-900 border-x border-slate-200";
      default:
        return "bg-white text-zinc-900";
    }
  };

  return (
    <div className={`w-full min-h-screen ${getThemeStyles(site.theme)} transition-colors duration-1000 overflow-x-hidden`} style={{ fontFamily: `'${site.font}', sans-serif` }}>
      {site.sections.map((section) => {
        const { type, content } = section;
        
        switch (type) {
          case "hero":
            return (
              <section key={section.id} className="relative py-24 px-8 flex flex-col items-center text-center overflow-hidden border-b border-white/5">
                <div className="max-w-4xl mx-auto z-10">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                    {content.heading}
                  </h1>
                  <p className="text-lg opacity-70 mb-10 max-w-2xl mx-auto">
                    {content.subtext}
                  </p>
                  <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                    {content.buttonText || "Get Started"}
                    <ChevronRight size={20} />
                  </button>
                </div>
                {/* Glow Background for Hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
              </section>
            );
          
          case "features":
            return (
              <section key={section.id} className="py-20 px-8 border-b border-white/5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.features?.map((f: any, i: number) => (
                    <div key={`${f.title}-${i}`} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Sparkles className="text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                      <p className="opacity-60 text-sm leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "pricing":
            return (
              <section key={section.id} className="py-24 px-8">
                <div className="max-w-5xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Investment Tiers</h2>
                  <p className="opacity-60">Choose the perfect path for your growth.</p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(content.plans || [
                    { name: "Starter", price: "$0", features: ["Basic UI", "1 Website", "Standard Support"] },
                    { name: "Pro", price: "$29", features: ["Advanced AI", "Unlimited Sites", "Priority Access"], highlighted: true },
                    { name: "Enterprise", price: "Custom", features: ["Dedicated Team", "API Access", "Custom Design"] },
                  ]).map((p: any, i: number) => (
                    <div 
                      key={`${p.name}-${i}`} 
                      className={`p-8 rounded-3xl border ${p.highlighted ? "border-indigo-500 bg-indigo-500/5 ring-4 ring-indigo-500/10" : "border-white/10 bg-white/5"} relative`}
                    >
                      {p.highlighted && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Best Value</div>}
                      <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                      <div className="text-3xl font-extrabold mb-6 transition-all">{p.price}</div>
                      <ul className="space-y-4 mb-8">
                        {p.features?.map((f: string, fi: number) => (
                          <li key={`${p.name}-feat-${fi}`} className="flex items-center gap-3 text-sm opacity-70">
                            <CheckCircle size={16} className="text-indigo-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${p.highlighted ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "bg-white/5 text-white hover:bg-white/10"}`}>
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "footer":
            return (
              <footer key={section.id} className="py-12 px-8 bg-zinc-900/50 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                      <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight text-white">{site.title}</span>
                  </div>
                  <div className="flex gap-8 text-sm opacity-60">
                    <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
                  </div>
                  <div className="text-xs opacity-40">
                    © 2026 {site.title}. Created with AuraFlow AI.
                  </div>
                </div>
              </footer>
            );

          default:
            return <div key={section.id} className="p-20 text-center opacity-30 italic">Section: {type} coming soon</div>;
        }
      })}
    </div>
  );
}

function CheckCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
