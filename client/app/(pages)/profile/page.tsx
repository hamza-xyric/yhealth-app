"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Settings,
  Shield,
  Bell,
  ChevronRight,
  Activity,
  Heart,
  Trophy,
  Flame,
  Clock,
  Target,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/context/AuthContext";
import { cn } from "@/lib/utils";

// Mock stats data
const mockStats = {
  daysStreak: 14,
  totalWorkouts: 48,
  caloriesBurned: 12580,
  goalsCompleted: 8,
};

// Quick action items
const quickActions = [
  {
    icon: Edit3,
    label: "Edit Profile",
    href: "/profile/edit",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Shield,
    label: "Privacy",
    href: "/settings/privacy",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/settings/notifications",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

// Stats cards
const statCards = [
  {
    icon: Flame,
    label: "Day Streak",
    value: mockStats.daysStreak,
    suffix: "days",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Activity,
    label: "Workouts",
    value: mockStats.totalWorkouts,
    suffix: "total",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Heart,
    label: "Calories",
    value: mockStats.caloriesBurned.toLocaleString(),
    suffix: "kcal",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Trophy,
    label: "Goals",
    value: mockStats.goalsCompleted,
    suffix: "achieved",
    color: "from-amber-400 to-yellow-500",
  },
];

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Skeleton */}
      <div className="relative mb-8">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="mb-4 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <div className="pt-16 space-y-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Hydration-safe hook to check if component is mounted on client
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ProfilePage() {
  const { user, isLoading, getInitials, getDisplayName } = useAuth();
  const isHydrated = useHydrated();

  if (!isHydrated || isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          {/* Cover Image */}
          <div className="relative h-48 md:h-56 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-purple-500/80 to-pink-500/80" />
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            {/* Decorative elements */}
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-white/20"
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <Sparkles className="w-6 h-6 text-white/50" />
            </div>
          </div>

          {/* Avatar and Name */}
          <div className="absolute -bottom-12 left-4 md:left-8 flex items-end gap-4 md:gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-4 ring-background shadow-2xl">
                <AvatarImage src={user.avatarUrl || undefined} alt={getDisplayName()} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-white font-bold text-3xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="mb-2 md:mb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {getDisplayName()}
                </h1>
                {user.isEmailVerified && (
                  <BadgeCheck className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Member since {memberSince}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="absolute top-4 right-4">
            <Button
              asChild
              size="sm"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-0"
            >
              <Link href="/profile/edit">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 rounded-2xl" />
              <Card className="relative border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className={cn("absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-bl-full", stat.color)} />
                <CardContent className="p-4">
                  <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3", stat.color)}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.suffix}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8 border-0 bg-card/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your profile details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Email */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  {user.isEmailVerified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">Not added</p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p className="text-sm font-medium">{formatDate(user.dateOfBirth)}</p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p className="text-sm font-medium capitalize">
                      {user.gender?.replace(/_/g, " ") || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage your profile and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", action.bgColor)}>
                          <action.icon className={cn("w-5 h-5", action.color)} />
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </Link>
                    {index < quickActions.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
