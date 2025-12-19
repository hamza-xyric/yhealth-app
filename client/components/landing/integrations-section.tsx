"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const integrations = [
  { name: "Apple Health", logo: "🍎", color: "from-red-500/20 to-red-600/20" },
  { name: "Google Fit", logo: "🏃", color: "from-blue-500/20 to-green-500/20" },
  { name: "Fitbit", logo: "⌚", color: "from-teal-500/20 to-teal-600/20" },
  { name: "Garmin", logo: "🎯", color: "from-orange-500/20 to-orange-600/20" },
  {
    name: "Samsung Health",
    logo: "📱",
    color: "from-blue-600/20 to-blue-700/20",
  },
  { name: "Strava", logo: "🚴", color: "from-orange-500/20 to-red-500/20" },
  {
    name: "MyFitnessPal",
    logo: "🥗",
    color: "from-green-500/20 to-green-600/20",
  },
  { name: "Peloton", logo: "🚲", color: "from-red-600/20 to-red-700/20" },
];

function IntegrationCard({
  integration,
  index,
}: {
  integration: (typeof integrations)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br ${integration.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Card */}
      <div className="relative glass-card rounded-2xl p-4 sm:p-6 border border-white/10 text-center h-full overflow-hidden group-hover:border-primary/30 transition-all duration-300">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: index * 0.05 + 0.2 }}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-background/50 flex items-center justify-center shadow-lg border border-white/10"
          >
            <span className="text-3xl sm:text-4xl">{integration.logo}</span>
          </motion.div>

          {/* Name */}
          <h4 className="font-semibold text-xs sm:text-sm">
            {integration.name}
          </h4>

          {/* Connected indicator on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Zap className="w-3 h-3" />
            <span>Connect</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function IntegrationsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span>Integrations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"
          >
            Connects with Your{" "}
            <span className="gradient-text-animated">Favorite Apps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground px-2 sm:px-4"
          >
            Seamlessly sync your health data from all your devices and apps for
            a complete picture of your wellness.
          </motion.p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              index={index}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <p className="text-sm sm:text-base text-muted-foreground">
            And <span className="text-primary font-medium">50+ more</span>{" "}
            integrations coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
