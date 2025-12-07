import type { Insight } from "@/types";

export const mockInsight: Insight = {
  id: "insight-1",
  title: "Coach Insight",
  message:
    "Your workouts are 40% more effective after 7+ hours of sleep. Last night you got 6h 45m.",
  actionLabel: "Learn More",
  actionRoute: "/insights/sleep-workout",
  pillar: "wellbeing",
  createdAt: new Date(),
};

export const mockInsights: Insight[] = [
  mockInsight,
  {
    id: "insight-2",
    title: "Nutrition Tip",
    message:
      "You've been consistent with protein intake this week. Keep it up to support your fitness goals!",
    actionLabel: "View Details",
    actionRoute: "/insights/protein",
    pillar: "nutrition",
    createdAt: new Date(Date.now() - 86400000), // Yesterday
  },
  {
    id: "insight-3",
    title: "Activity Reminder",
    message:
      "You usually take a walk around this time. Ready to log a quick 15-minute walk?",
    actionLabel: "Log Walk",
    actionRoute: "/fitness/log",
    pillar: "fitness",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
];