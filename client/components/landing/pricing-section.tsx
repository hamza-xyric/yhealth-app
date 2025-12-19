"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Users,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for getting started with AI wellness",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    iconBg: "bg-[#00BCD4]",
    checkBg: "bg-[#00BCD4]/20",
    checkColor: "text-[#00BCD4]",
    features: [
      "Basic activity tracking",
      "Daily step counter",
      "Water intake logging",
      "7-day history",
      "Community access",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "Full AI coaching for serious health goals",
    monthlyPrice: 9.99,
    yearlyPrice: 99,
    icon: Crown,
    iconBg: "bg-[#7C3AED]",
    checkBg: "bg-primary",
    checkColor: "text-primary-foreground",
    features: [
      "Everything in Starter",
      "AI-powered insights",
      "Personalized meal plans",
      "Workout recommendations",
      "Sleep analysis",
      "WhatsApp coaching",
      "Unlimited history",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    popular: true,
  },
  {
    name: "Family",
    description: "Health coaching for the whole family",
    monthlyPrice: 19.99,
    yearlyPrice: 199,
    icon: Users,
    iconBg: "bg-[#EC4899]",
    checkBg: "bg-[#EC4899]/20",
    checkColor: "text-[#EC4899]",
    features: [
      "Everything in Pro",
      "Up to 5 family members",
      "Family health dashboard",
      "Shared meal planning",
      "Group challenges",
      "Family health reports",
      "Dedicated support",
    ],
    cta: "Start 14-Day Trial",
    popular: false,
  },
];

function PricingCard({
  plan,
  index,
  isYearly,
}: {
  plan: (typeof plans)[0];
  index: number;
  isYearly: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent = plan.icon;

  const displayPrice = isYearly
    ? plan.yearlyPrice === 0
      ? 0
      : Math.round(plan.yearlyPrice / 12)
    : plan.monthlyPrice === 0
    ? 0
    : Math.round(plan.monthlyPrice);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col h-full",
        plan.popular && "lg:-mt-4 lg:mb-4"
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/25">
            <Star className="w-3.5 h-3.5 fill-current" />
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div
        className={cn(
          "relative flex flex-col h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300",
          plan.popular
            ? "bg-card border-2 border-primary shadow-xl shadow-primary/10"
            : "bg-card/80 border border-border hover:border-primary/30 hover:shadow-lg"
        )}
      >
        {/* Background Gradient for Popular */}
        {plan.popular && (
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        )}

        {/* Header */}
        <div className="relative text-center mb-5 sm:mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center",
              plan.iconBg
            )}
          >
            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold">
              ${displayPrice}
            </span>
            <span className="text-muted-foreground text-sm sm:text-base">
              /mo
            </span>
          </div>
          {isYearly && plan.yearlyPrice > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Billed{" "}
              <span className="text-primary font-medium">
                ${plan.yearlyPrice}
              </span>
              /year
            </p>
          )}
          {plan.monthlyPrice === 0 && (
            <p className="text-xs sm:text-sm text-primary font-medium mt-1">
              Free forever
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
              className="flex items-start gap-2 sm:gap-3"
            >
              <div
                className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  plan.popular ? plan.checkBg : plan.checkBg
                )}
              >
                <Check
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3",
                    plan.popular ? plan.checkColor : plan.checkColor
                  )}
                />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          variant={plan.popular ? "default" : "outline"}
          className={cn(
            "w-full h-10 sm:h-12 font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base",
            plan.popular &&
              "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
          )}
        >
          <Link
            href="/auth/signup"
            className="flex items-center justify-center gap-2"
          >
            {plan.cta}
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 bg-[#7C3AED]/5 rounded-full blur-3xl" />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span>Simple Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"
          >
            Invest in Your{" "}
            <span className="gradient-text-animated">Health Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground px-2 sm:px-4"
          >
            Choose the perfect plan for your wellness goals. All paid plans
            include a 14-day free trial.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12"
        >
          <span
            className={cn(
              "text-xs sm:text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <span
            className={cn(
              "text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2",
              isYearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              isYearly={isYearly}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border/50"
        >
          {[
            { icon: Shield, text: "30-day money-back guarantee" },
            { icon: Zap, text: "Cancel anytime" },
            { icon: Check, text: "No hidden fees" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
