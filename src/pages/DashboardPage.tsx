import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  Plus, 
  ExternalLink, 
  MoreVertical, 
  Layout, 
  BarChart3, 
  Settings, 
  LogOut,
  FolderOpen,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  Globe
} from "lucide-react";
import { cn } from "../lib/utils";

const projects = [
  {
    id: 1,
    name: "Nebula Landing Page",
    updated: "2 hours ago",
    status: "Published",
    views: "1.2k",
    preview: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "FinFlow Brand Site",
    updated: "1 day ago",
    status: "Draft",
    views: "0",
    preview: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Aura Creative Portfolio",
    updated: "3 days ago",
    status: "Published",
    views: "245",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col pt-24 pb-8 px-4 h-full sticky top-0 hidden lg:flex">
        <nav className="flex-1 space-y-1">
          {[
            { icon: Layout, label: "All Projects", active: true },
            { icon: Layers, label: "Shared Templates", active: false },
            { icon: BarChart3, label: "Analytics", active: false },
            { icon: FolderOpen, label: "Assets Library", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                item.active 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-7xl">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">Workspace</h1>
              <p className="text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                3 active projects • High AI capacity remaining
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-all">
              <Plus size={20} /> Create New
            </button>
          </header>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Views", value: "1,445", trend: "+12.4%", icon: BarChart3 },
              { label: "AI Generations", value: "48 / 100", trend: "Spark Plan", icon: Sparkles },
              { label: "Deployments", value: "12", trend: "Live on AuraCloud", icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="glass p-6 rounded-[24px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl">
                    <stat.icon size={20} className="text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 bg-blue-500/10 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className="text-2xl font-black">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group glass p-4 rounded-[32px] hover:border-white/20 transition-all"
              >
                <div className="relative aspect-video rounded-[24px] overflow-hidden mb-6">
                  <img src={p.preview} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                      p.status === 'Published' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                    )}>
                      {p.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-bold mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} /> {p.updated}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 size={12} /> {p.views} views
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                      Edit Space
                    </button>
                    <button className="p-2.5 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Create Card */}
            <button className="group border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center p-8 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-blue-500/20">
                 <Plus size={32} className="text-gray-500 group-hover:text-blue-400" />
               </div>
               <div className="font-bold text-lg mb-1">Start New Project</div>
               <div className="text-gray-500 text-sm">Launch next generation AI</div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
