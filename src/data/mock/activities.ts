import type { Activity } from "@/types";

export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    type: "workout",
    title: "Morning Run",
    detail: "5.2km",
    timestamp: "8:30am",
    pillar: "fitness",
    createdAt: new Date(new Date().setHours(8, 30, 0, 0)),
  },
  {
    id: "activity-2",
    type: "meal",
    title: "Lunch logged",
    detail: "650 cal",
    timestamp: "12:45pm",
    pillar: "nutrition",
    createdAt: new Date(new Date().setHours(12, 45, 0, 0)),
  },
  {
    id: "activity-3",
    type: "mood",
    title: "Mood: Good",
    detail: "",
    timestamp: "2:00pm",
    pillar: "wellbeing",
    createdAt: new Date(new Date().setHours(14, 0, 0, 0)),
  },
];