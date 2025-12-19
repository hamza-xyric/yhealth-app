"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  Cpu,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us About You",
    subtitle: "Quick Onboarding",
    description:
      "Share your goals through a natural conversation. Our AI asks the right questions to understand your unique needs.",
    color: "from-cyan-400 to-cyan-600",
    features: ["5-minute setup", "Natural conversation", "No forms to fill"],
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Creates Your Plan",
    subtitle: "Intelligent Analysis",
    description:
      "Our AI analyzes your data across fitness, nutrition, and wellbeing to craft a truly personalized coaching strategy.",
    color: "from-purple-400 to-purple-600",
    features: ["Cross-pillar analysis", "Adaptive planning", "Science-backed"],
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Live Your Life",
    subtitle: "Seamless Integration",
    description:
      "Get real-time coaching through voice, WhatsApp, or app. Your AI coach is always there when you need guidance.",
    color: "from-pink-400 to-pink-600",
    features: ["Multi-channel support", "Real-time insights", "Zero friction"],
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Transform & Evolve",
    subtitle: "Continuous Improvement",
    description:
      "Watch your health transform as the AI learns and adapts. Celebrate wins and discover insights about yourself.",
    color: "from-amber-400 to-orange-600",
    features: ["Progress tracking", "Adaptive coaching", "Milestone rewards"],
  },
];

// Animated data flow line
function DataFlowLine({ index }: { index: number }) {
  return (
    <div className="hidden lg:flex absolute top-1/2 -right-8 w-16 items-center z-20">
      <svg className="w-full h-8" viewBox="0 0 64 32">
        <defs>
          <linearGradient
            id={`flowGradient${index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="oklch(0.75 0.2 180)" />
            <stop offset="100%" stopColor="oklch(0.7 0.2 280)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 16 L 48 16"
          stroke={`url(#flowGradient${index})`}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
        />
        <motion.polygon
          points="48,10 64,16 48,22"
          fill="url(#flowGradient0)"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1 + index * 0.2 }}
        />
      </svg>

      {/* Animated dot */}
      <motion.div
        className="absolute left-0 w-2 h-2 rounded-full bg-primary"
        animate={{
          x: [0, 48, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Step Card Component
function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0`}
        animate={isInView ? { opacity: [0, 0.2, 0.1] } : {}}
        transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
      />

      <div className="relative glass-card rounded-3xl p-6 h-full border border-white/10 overflow-hidden group hover:border-primary/30 transition-colors">
        {/* Background pattern */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />

        {/* Step number - top left */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.15 + 0.2,
            type: "spring",
          }}
          className="absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-background to-background/80 border border-white/10 flex items-center justify-center shadow-lg"
        >
          <span className="text-lg font-bold gradient-text">{step.number}</span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 pt-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.15 + 0.3,
              type: "spring",
            }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
          >
            <step.icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Text */}
          <span
            className={`text-xs font-medium uppercase tracking-wider bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
          >
            {step.subtitle}
          </span>
          <h3 className="text-xl font-bold mt-1 mb-3">{step.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {step.description}
          </p>

          {/* Feature list */}
          <div className="space-y-2">
            {step.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + 0.5 + i * 0.1,
                }}
                className="flex items-center gap-2 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div
          className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${step.color} opacity-5 rounded-tl-full`}
        />
      </div>

      {/* Connection arrow */}
      {index < steps.length - 1 && <DataFlowLine index={index} />}
    </motion.div>
  );
}

// Central AI visualization
function CentralAI() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center mb-16">
      {/* Outer ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={angle}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(80px) translateY(-50%)`,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-purple-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Core */}
      <motion.div
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center glow-cyan"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu className="w-10 h-10 text-white" />

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/50"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      {/* Connection lines to steps */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 200"
      >
        <defs>
          <linearGradient
            id="connectGradient"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="oklch(0.75 0.2 180)" stopOpacity="0" />
            <stop
              offset="50%"
              stopColor="oklch(0.75 0.2 180)"
              stopOpacity="0.5"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.75 0.2 180)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="100"
          x2="800"
          y2="100"
          stroke="url(#connectGradient)"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </svg>

      {/* Labels */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-8 text-center"
      >
        <span className="text-xs text-muted-foreground">Powered by</span>
        <div className="text-sm font-semibold gradient-text">
          yHealth AI Engine
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-14 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <ArrowRight className="w-4 h-4 text-primary" />
            <span>Your Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            From Sign-Up to
            <span className="block gradient-text-animated">Transformation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Your path to better health starts with a simple conversation. Let
            our AI guide you every step of the way.
          </motion.p>
        </div>

        {/* Central AI Visualization */}
        <CentralAI />

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to start your transformation?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-semibold glow-cyan"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
