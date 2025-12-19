"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Users, Activity, Award, Heart, Zap, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "People transforming their health",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    icon: Activity,
    value: 10,
    suffix: "M+",
    label: "Activities Tracked",
    description: "Workouts, steps & more logged",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Users achieving their goals",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: Heart,
    value: 4.9,
    suffix: "/5",
    label: "User Rating",
    description: "Based on 10K+ reviews",
    color: "from-amber-400 to-orange-500",
  },
];

const highlights = [
  { icon: Zap, text: "Real-time AI coaching" },
  { icon: Globe, text: "Available in 50+ countries" },
];

function AnimatedCounter({
  value,
  suffix,
  duration = 2,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const isFloat = !Number.isInteger(value);

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      const currentValue = progress * value;
      setCount(
        isFloat ? parseFloat(currentValue.toFixed(1)) : Math.floor(currentValue)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Pre-computed particle positions and animation values (stable across renders)
const PARTICLE_CONFIG = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${(i * 5.7 + 3) % 100}%`,
  top: `${(i * 7.3 + 11) % 100}%`,
  duration: 3 + (i % 5) * 0.4,
  delay: (i % 8) * 0.25,
}));

// Animated background particles
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_CONFIG.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Stat Card Component
function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative glass-card rounded-3xl p-8 h-full border border-white/10 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1 + 0.2,
              type: "spring",
            }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
          >
            <stat.icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Value */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            <span className="gradient-text">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </span>
          </motion.div>

          {/* Label */}
          <div className="text-lg font-semibold mb-1">{stat.label}</div>
          <p className="text-sm text-muted-foreground">{stat.description}</p>
        </div>

        {/* Animated border glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl border-2 border-transparent`}
          style={{
            background: `linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(135deg, transparent 40%, oklch(0.75 0.2 180 / 0.5) 50%, transparent 60%) border-box`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-based zoom animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  // Parallax for orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [30, -80]);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <ParticleField />

      {/* Decorative orbs with parallax */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />

      <motion.div
        style={{ scale, opacity, y }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4 text-primary" />
            <span>By the Numbers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Trusted by a
            <span className="block gradient-text-animated">
              Global Community
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Join thousands of health-conscious individuals who have discovered
            the power of AI-driven wellness coaching.
          </motion.p>

          {/* Highlight badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-6"
          >
            {highlights.map((highlight, i) => (
              <div
                key={highlight.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm"
              >
                <highlight.icon className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{highlight.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom decoration - animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
