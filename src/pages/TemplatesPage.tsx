import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  Search, 
  Filter, 
  Eye, 
  Layout, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { cn } from "../lib/utils";

const categoryList = ["All", "SaaS", "Fintech", "Agency", "E-commerce", "Portfolio"];

const templates = [
  {
    id: 1,
    title: "Quantum Dashboard",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-modern analytics interface with real-time graphs.",
    trending: true
  },
  {
    id: 2,
    title: "Zenith Banking",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist dark theme for high-end financial institutions.",
    trending: false
  },
  {
    id: 3,
    title: "Neo Creative",
    category: "Agency",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Bold typography and chaotic layouts for creative minds.",
    trending: true
  },
  {
    id: 4,
    title: "Aura Commerce",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    description: "Futuristic product showcase with immersive visuals.",
    trending: false
  },
  {
    id: 5,
    title: "Nova Portfolio",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    description: "Clean, professional layout with smooth scroll effects.",
    trending: true
  },
  {
    id: 6,
    title: "Titan App",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    description: "Technical dashboard focused on data density.",
    trending: false
  }
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020205] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Template Engine</h1>
            <p className="text-gray-400 text-lg">Choose a starting point and let AuraFlow AI evolve it.</p>
          </div>
          
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts or styles..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-8">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeCategory === cat 
                  ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent hover:border-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((t, i) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-6 glass">
                  <img 
                    src={t.image} 
                    alt={t.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10">
                      {t.category}
                    </div>
                    {t.trending && (
                      <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold border border-blue-500/20 text-blue-400 flex items-center gap-1">
                        <TrendingUp size={10} /> Trending
                      </div>
                    )}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <button className="p-4 bg-white text-black rounded-full shadow-xl hover:scale-110 transition-all">
                        <Eye size={20} />
                      </button>
                      <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold shadow-xl hover:scale-110 transition-all flex items-center gap-2">
                        <Sparkles size={18} /> Remix
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{t.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-40">
            <Layout className="mx-auto text-gray-700 mb-6" size={60} />
            <h3 className="text-2xl font-bold mb-2">No templates found</h3>
            <p className="text-gray-500">Try searching for something else or browse all categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
