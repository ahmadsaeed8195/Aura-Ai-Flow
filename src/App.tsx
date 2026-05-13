/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CinematicBackground } from './components/common/CinematicBackground';
import { LandingPage } from './components/home/LandingPage';
import { Editor } from './components/editor/Editor';
import FeaturesPage from './pages/FeaturesPage';
import TemplatesPage from './pages/TemplatesPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import { DesignAssistant } from './components/common/DesignAssistant';
import { GeneratedWebsite } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeSite, setActiveSite] = useState<GeneratedWebsite | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGenerationComplete = (site: GeneratedWebsite) => {
    setActiveSite(site);
    navigate('/editor');
  };

  return (
    <main className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <CinematicBackground />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            >
              <LandingPage onGenerationComplete={handleGenerationComplete} />
            </motion.div>
          } />
          
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/oracle" element={<AIAssistantPage />} />

          <Route path="/login" element={
            <div className="flex flex-col items-center justify-center min-h-screen pt-20">
              <div className="glass p-12 rounded-[40px] w-full max-w-md text-center">
                <h2 className="text-3xl font-black mb-8">Access Portal</h2>
                <div className="space-y-4">
                  <input type="email" placeholder="Identifier" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50" />
                  <input type="password" placeholder="Passkey" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50" />
                  <button className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all">Synchronize</button>
                </div>
              </div>
            </div>
          } />

          <Route path="/editor" element={
            activeSite ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Editor site={activeSite} onExit={() => navigate('/')} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-screen"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-4 italic">No Active Session Detected</h2>
                  <button 
                    onClick={() => navigate('/')}
                    className="px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest shadow-xl"
                  >
                    Return to Prime
                  </button>
                </div>
              </motion.div>
            )
          } />
        </Routes>
      </AnimatePresence>

      <DesignAssistant />
    </main>
  );
}



