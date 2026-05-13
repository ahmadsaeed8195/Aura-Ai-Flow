import React from "react";
import { motion } from "motion/react";
import { Check, Zap, Rocket, Star } from "lucide-react";
import { cn } from "../../lib/utils";

const plans = [
  {
    name: "Spark",
    price: "Free",
    description: "Perfect for personal projects and experimentation.",
    features: ["1 Generated AI Site", "Standard Themes", "Responsive Export", "Community Support"],
    icon: Zap,
    color: "bg-zinc-800"
  },
  {
    name: "Flux",
    price: "$29",
    description: "For professionals building elite digital experiences.",
    features: ["Unlimited Sites", "Custom AI Training", "Next.js & React Export", "Priority Support", "Whitelabeling"],
    icon: Rocket,
    color: "bg-indigo-600",
    popular: true
  },
  {
    name: "Nebula",
    price: "Custom",
    description: "Tailored infrastructure for scaling enterprises.",
    features: ["Custom Domain Hosting", "API Integration", "Multi-user Access", "Security Audits", "SLA Guarantee"],
    icon: Star,
    color: "bg-purple-600"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Invest in the <span className="text-indigo-400">Future</span>
          </motion.h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Choose a plan that fits your vision. Scale your digital presence with human intelligence and AI performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "relative p-8 rounded-3xl border transition-all duration-300 glass",
                plan.popular ? "neon-border" : "hover:bg-white/[0.07]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", plan.color)}>
                <plan.icon size={28} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-gray-500 font-medium font-mono text-sm leading-none ml-1">/mo</span>}
              </div>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                {plan.description}
              </p>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all",
                plan.popular ? "bg-white text-black shadow-lg shadow-white/5" : "bg-white/10 text-white hover:bg-white/20"
              )}>
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
