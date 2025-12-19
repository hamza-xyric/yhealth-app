"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, CheckCircle, Quote, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  verified: boolean;
  pillar?: "fitness" | "nutrition" | "wellbeing";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    verified: true,
    pillar: "fitness",
    content:
      "YHealth completely transformed my approach to wellness. The AI insights helped me understand my body better than any other app. I've lost 20 pounds and feel more energetic than ever!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/avatars/michael.jpg",
    rating: 5,
    verified: true,
    pillar: "wellbeing",
    content:
      "As someone who spends long hours at the desk, YHealth's reminders and personalized exercise recommendations have been a game-changer. My back pain is gone and I sleep so much better now.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Working Mom",
    avatar: "/avatars/emily.jpg",
    rating: 5,
    verified: true,
    pillar: "nutrition",
    content:
      "Balancing work and family left no time for my health. YHealth made it easy with quick workouts and meal planning. The whole family is eating healthier now!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Marathon Runner",
    avatar: "/avatars/david.jpg",
    rating: 5,
    verified: true,
    pillar: "fitness",
    content:
      "The training insights and recovery tracking helped me shave 15 minutes off my marathon time. The integration with my fitness devices is seamless.",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Yoga Instructor",
    avatar: "/avatars/lisa.jpg",
    rating: 5,
    verified: true,
    pillar: "wellbeing",
    content:
      "I recommend YHealth to all my students. The mindfulness features and stress tracking complement yoga practice beautifully. It's holistic wellness at its best.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Personal Trainer",
    avatar: "/avatars/james.jpg",
    rating: 5,
    verified: true,
    pillar: "fitness",
    content:
      "As a fitness professional, I've tried countless apps. YHealth stands out with its comprehensive approach. I use it with all my clients now.",
  },
  {
    id: 7,
    name: "Amanda Foster",
    role: "Nutritionist",
    avatar: "/avatars/amanda.jpg",
    rating: 4,
    verified: true,
    pillar: "nutrition",
    content:
      "The meal tracking and nutritional insights are spot-on. My clients love how easy it is to log their meals and see their progress over time.",
  },
  {
    id: 8,
    name: "Robert Kim",
    role: "Business Executive",
    avatar: "/avatars/robert.jpg",
    rating: 5,
    verified: true,
    pillar: "wellbeing",
    content:
      "With my busy schedule, I needed something that works around my life. YHealth's smart scheduling and quick check-ins fit perfectly into my routine.",
  },
  {
    id: 9,
    name: "Jennifer Adams",
    role: "Healthcare Worker",
    avatar: "/avatars/jennifer.jpg",
    rating: 5,
    verified: true,
    pillar: "nutrition",
    content:
      "Working night shifts made maintaining health difficult. The personalized recommendations adapted to my schedule beautifully. Highly recommended!",
  },
  {
    id: 10,
    name: "Chris Martinez",
    role: "College Student",
    avatar: "/avatars/chris.jpg",
    rating: 5,
    verified: true,
    pillar: "fitness",
    content:
      "Affordable and effective! As a student on a budget, YHealth gives me premium features without breaking the bank. My energy levels have never been better.",
  },
  {
    id: 11,
    name: "Sophia Lee",
    role: "Wellness Coach",
    avatar: "/avatars/sophia.jpg",
    rating: 5,
    verified: true,
    pillar: "wellbeing",
    content:
      "The holistic approach to health tracking is exactly what I recommend to my clients. Sleep, nutrition, exercise, and mental wellness all in one place.",
  },
  {
    id: 12,
    name: "Daniel Brown",
    role: "Retired Teacher",
    avatar: "/avatars/daniel.jpg",
    rating: 4,
    verified: true,
    pillar: "nutrition",
    content:
      "At 65, I was skeptical about health apps. YHealth proved me wrong with its easy interface and gentle reminders. My doctor is impressed with my progress!",
  },
];

const pillarColors = {
  fitness: "from-cyan-400 to-cyan-600",
  nutrition: "from-purple-400 to-purple-600",
  wellbeing: "from-pink-400 to-pink-600",
};

const pillarLabels = {
  fitness: "Fitness",
  nutrition: "Nutrition",
  wellbeing: "Wellbeing",
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 mb-4 break-inside-avoid group hover:border-primary/30 transition-all duration-300">
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-8 h-8 text-primary" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <Avatar className="w-11 h-11 border-2 border-primary/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="text-sm bg-gradient-to-br from-primary/20 to-purple-500/20 text-foreground">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{testimonial.name}</div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < testimonial.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pillar Badge */}
      {testimonial.pillar && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${
              pillarColors[testimonial.pillar]
            } text-white font-medium`}
          >
            {pillarLabels[testimonial.pillar]}
          </span>
          {testimonial.verified && (
            <div className="flex items-center gap-1 text-xs text-green-500">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
        &quot;{testimonial.content}&quot;
      </p>

      {/* Role */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <span className="text-xs text-muted-foreground">
          {testimonial.role}
        </span>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 mb-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-3/4 bg-muted rounded" />
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [loading, setLoading] = useState(true);
  const [colCount, setColCount] = useState(4);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateColCount = () => {
      if (window.innerWidth < 640) {
        setColCount(1);
      } else if (window.innerWidth < 768) {
        setColCount(2);
      } else if (window.innerWidth < 1024) {
        setColCount(3);
      } else if (window.innerWidth < 1280) {
        setColCount(4);
      } else {
        setColCount(5);
      }
    };

    updateColCount();
    window.addEventListener("resize", updateColCount);
    return () => window.removeEventListener("resize", updateColCount);
  }, []);

  const columns = useMemo(() => {
    const cols: Testimonial[][] = Array.from({ length: colCount }, () => []);
    const doubledTestimonials = [...testimonials, ...testimonials];

    doubledTestimonials.forEach((testimonial, index) => {
      cols[index % colCount].push(testimonial);
    });

    return cols;
  }, [colCount]);

  return (
    <section id="testimonials" className="py-9 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Real Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Loved by
            <span className="block gradient-text-animated">
              Thousands Worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Join thousands of satisfied users who have transformed their health
            journey with yHealth&apos;s AI coaching.
          </motion.p>
        </div>

        {/* Testimonials Grid with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden h-[700px] mask-gradient"
        >
          <div className="flex gap-4 h-full">
            {loading
              ? Array.from({ length: colCount }).map((_, idx) => (
                  <div key={idx} className="flex-1 flex flex-col">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TestimonialSkeleton key={i} />
                    ))}
                  </div>
                ))
              : columns.map((columnTestimonials, columnIndex) => (
                  <motion.div
                    key={columnIndex}
                    className="flex-1 flex flex-col"
                    animate={{
                      y:
                        columnIndex % 2 === 0
                          ? [0, -50 * columnTestimonials.length]
                          : [-50 * columnTestimonials.length, 0],
                    }}
                    transition={{
                      duration: 25 + columnIndex * 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {columnTestimonials.map((testimonial, index) => (
                      <TestimonialCard
                        key={`${columnIndex}-${index}-${testimonial.id}`}
                        testimonial={testimonial}
                      />
                    ))}
                  </motion.div>
                ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10"
        >
          {[
            { value: "50K+", label: "Happy Users" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "10K+", label: "5-Star Reviews" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
