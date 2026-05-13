import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share2, 
  Search,
  Sparkles
} from "lucide-react";
import { cn } from "../lib/utils";

const communityPosts = [
  {
    id: 1,
    author: "0xNeo",
    title: "Synthwave SaaS Concept",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    likes: "1.2k",
    remixes: "45"
  },
  {
    id: 2,
    author: "AuraDesign",
    title: "Minimalist Fintech Flux",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    likes: "892",
    remixes: "12"
  },
  {
    id: 3,
    author: "CyberFlow",
    title: "Neural Portfolio v2",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
    likes: "567",
    remixes: "89"
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-4 uppercase italic">Neural Network</h1>
            <p className="text-gray-400 text-lg">Discovery. Remix. Evolve. The collective intelligence of AuraFlow creators.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Find creators..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group glass p-4 rounded-[40px] hover:border-white/20 transition-all"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6">
                <img src={post.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold"><Heart size={16} /> {post.likes}</button>
                    <button className="flex items-center gap-1.5 text-xs font-bold"><Repeat2 size={16} /> {post.remixes}</button>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest">Remix AI</button>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">@{post.author}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{post.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
