import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Menu, X, LogIn, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Templates", href: "/templates" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Community", href: "/community" },
    { name: "Oracle", href: "/oracle" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-4 h-20 flex items-center",
        isScrolled
          ? "glass border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-sm text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase text-white">
              AuraFlow<span className="text-blue-500">.AI</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.href}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all uppercase tracking-widest"
            >
              Start Creating
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-bold uppercase tracking-widest text-zinc-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                <button className="w-full py-4 text-white font-medium text-center">
                  Login
                </button>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">
                  Start Creating
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
