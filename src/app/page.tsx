"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import {
  OverallScore,
  PillarCardsGrid,
  QuickActions,
  ActivityFeed,
} from "@/components/home";
import { InsightCard } from "@/components/composed/insight-card";
import {
  mockUser,
  mockWellnessScores,
  mockInsight,
  mockActivities,
} from "@/data/mock";
import type { Pillar, Activity } from "@/types";
import type { TabId } from "@/components/layout/bottom-tab-bar";

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isCheckInComplete, setIsCheckInComplete] = useState(false);

  const handlePillarPress = (pillar: Pillar) => {
    console.log(`Navigate to ${pillar} detail`);
  };

  const handleActionPress = (actionId: string) => {
    console.log(`Action pressed: ${actionId}`);
    if (actionId === "checkin") {
      setIsCheckInComplete(true);
    }
  };

  const handleActivityPress = (activity: Activity) => {
    console.log(`Activity pressed: ${activity.id}`);
  };

  const handleInsightAction = () => {
    console.log("Insight action triggered");
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-safe">
      <Header
        userName={mockUser.name}
        firstName={mockUser.firstName}
        avatarUrl={mockUser.avatarUrl}
      />

      <motion.main
        className="pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <OverallScore score={mockWellnessScores.overall} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PillarCardsGrid
            fitnessScore={mockWellnessScores.fitness}
            nutritionScore={mockWellnessScores.nutrition}
            wellbeingScore={mockWellnessScores.wellbeing}
            onPillarPress={handlePillarPress}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="px-4 mt-6">
          <InsightCard
            insight={mockInsight}
            onActionClick={handleInsightAction}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <QuickActions
            isCheckInComplete={isCheckInComplete}
            onActionPress={handleActionPress}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ActivityFeed
            activities={mockActivities}
            onActivityPress={handleActivityPress}
          />
        </motion.div>
      </motion.main>

      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}