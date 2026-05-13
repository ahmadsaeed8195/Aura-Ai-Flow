import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/common/Navbar";
import { 
  User, 
  Shield, 
  Zap, 
  Bell, 
  Smartphone, 
  Eye,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";

const settingGroups = [
  {
    title: "Nexus Core",
    items: [
      { icon: User, label: "Identity Profile", desc: "Manage your neural signature and bio" },
      { icon: Shield, label: "Security & Encryption", desc: "Passkeys and session terminal controls" },
      { icon: Zap, label: "Neural Quota", desc: "Your Spark plan capacity: 48/100" }
    ]
  },
  {
    title: "Interface",
    items: [
      { icon: Bell, label: "Event Triggers", desc: "Notification protocols and webhooks" },
      { icon: Eye, label: "Visual Fidelity", desc: "Cinematic rendering and animation toggles" },
      { icon: Smartphone, label: "Device Sync", desc: "Cross-platform development settings" }
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4 uppercase italic">System Config</h1>
          <p className="text-gray-400 text-lg">Tune the AuraFlow engine to your creative frequency.</p>
        </header>

        <div className="space-y-12">
          {settingGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 pl-4">{group.title}</h2>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between p-6 rounded-[32px] glass hover:bg-white/[0.03] hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
                        <item.icon className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                        <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-700 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-[40px] border border-red-500/10 bg-red-500/5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-1 italic">Terminate Account</h3>
            <p className="text-sm text-red-400/60 font-medium tracking-tight">Irreversibly delete all neural data and projects.</p>
          </div>
          <button className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            Execute
          </button>
        </div>
      </main>
    </div>
  );
}
