"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Settings,
  Shield,
  Bell,
  ChevronRight,
  Activity,
  Heart,
  Trophy,
  Flame,
  Target,
  Sparkles,
  BadgeCheck,
  Zap,
  TrendingUp,
  Award,
  Star,
  Crown,
  Clock,
  BarChart3,
  Users,
  Dumbbell,
  Apple,
  Moon,
  Droplets,
  ArrowUpRight,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/app/context/AuthContext";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout";

// Mock stats data - In production, fetch from API
const mockStats = {
  daysStreak: 14,
  totalWorkouts: 48,
  caloriesBurned: 12580,
  goalsCompleted: 8,
  totalGoals: 12,
  weeklyProgress: 78,
  healthScore: 85,
};

// Mock achievements
const achievements = [
  {
    icon: Flame,
    name: "7 Day Streak",
    unlocked: true,
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Trophy,
    name: "First Goal",
    unlocked: true,
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Zap,
    name: "Power Week",
    unlocked: true,
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Crown,
    name: "Champion",
    unlocked: false,
    color: "from-gray-400 to-gray-500",
  },
  {
    icon: Star,
    name: "Perfect Month",
    unlocked: false,
    color: "from-gray-400 to-gray-500",
  },
];

// Mock recent activities
const recentActivities = [
  {
    icon: Dumbbell,
    title: "Completed workout",
    time: "2 hours ago",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Apple,
    title: "Logged nutrition",
    time: "5 hours ago",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Moon,
    title: "8h sleep tracked",
    time: "Yesterday",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Droplets,
    title: "Hydration goal met",
    time: "Yesterday",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

// Quick actions
const quickActions = [
  {
    icon: Edit3,
    label: "Edit Profile",
    href: "/profile/edit",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary to-purple-500",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    label: "Privacy",
    href: "/settings/privacy",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/settings/notifications",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    gradient: "from-blue-500 to-cyan-500",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

function ProfileSkeleton() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="relative mb-8">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <div className="absolute -bottom-16 left-8 flex items-end gap-6">
              <Skeleton className="h-36 w-36 rounded-full" />
              <div className="mb-4 space-y-3">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
          <div className="pt-20 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Hydration-safe hook
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Circular Progress Component
function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  children,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient
            id="circleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  gradient,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
    >
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500",
          gradient
        )}
      />
      <Card className="relative h-full border-0 bg-card/80 backdrop-blur-xl overflow-hidden">
        <div
          className={cn(
            "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 -translate-y-6 translate-x-6 rounded-full blur-2xl",
            gradient
          )}
        />
        <CardContent className="p-5">
          <div
            className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg",
              gradient
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {label}
              </p>
              <span className="text-xs text-muted-foreground">{suffix}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user, isLoading, getInitials, getDisplayName } = useAuth();
  const isHydrated = useHydrated();
  const router = useRouter();

  if (!isHydrated || isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-20 h-20  mx-auto rounded-full bg-muted/50 flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Please sign in to view your profile.
            </p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatGender = (gender: string | null) => {
    if (!gender) return "Not set";
    return gender.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
        {/* Ambient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/15 to-rose-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-4 py-8 max-w-6xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="relative">
              {/* Cover */}
              <div className="relative h-56 md:h-72 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />

                {/* Animated decorative elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-12 w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20"
                />
                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-12 right-40 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-16 right-56 w-10 h-10 rounded-full bg-white/20"
                />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-12 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white/80 text-sm font-medium">
                    Health Score: {mockStats.healthScore}
                  </span>
                </motion.div>

                {/* Edit Button */}
                <div className="absolute top-6 right-6">
                  <Button
                    asChild
                    size="sm"
                    className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white border border-white/20 shadow-lg"
                  >
                    <Link href="/profile/edit">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute -bottom-20 left-6 md:left-10 right-6 md:right-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-sm opacity-75" />
                    <Avatar className="relative h-32 w-32 md:h-40 md:w-40 ring-4 ring-background shadow-2xl">
                      <AvatarImage
                        src={user.avatarUrl || undefined}
                        alt={getDisplayName()}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-white font-bold text-4xl">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    {user.isEmailVerified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-4 border-background"
                      >
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Name & Info */}
                  <div className="flex-1 pb-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {getDisplayName()}
                        </h1>
                        <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Member since {memberSince}
                      </p>
                    </motion.div>
                  </div>

                  {/* Quick Stats Pills - Desktop */}
                  <div className="hidden md:flex items-center gap-3 pb-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border shadow-lg"
                    >
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold">
                        {mockStats.daysStreak}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        day streak
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border shadow-lg"
                    >
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold">
                        {mockStats.goalsCompleted}/{mockStats.totalGoals}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        goals
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="pt-24 md:pt-28">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Stats Cards */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Your Statistics
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        View All
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard
                        icon={Flame}
                        label="Streak"
                        value={mockStats.daysStreak}
                        suffix="days"
                        gradient="from-orange-500 to-red-500"
                        delay={0}
                      />
                      <StatCard
                        icon={Activity}
                        label="Workouts"
                        value={mockStats.totalWorkouts}
                        suffix="total"
                        gradient="from-cyan-500 to-blue-500"
                        delay={0.1}
                      />
                      <StatCard
                        icon={Heart}
                        label="Calories"
                        value={mockStats.caloriesBurned.toLocaleString()}
                        suffix="kcal"
                        gradient="from-pink-500 to-rose-500"
                        delay={0.2}
                      />
                      <StatCard
                        icon={Trophy}
                        label="Goals"
                        value={mockStats.goalsCompleted}
                        suffix="achieved"
                        gradient="from-amber-500 to-yellow-500"
                        delay={0.3}
                      />
                    </div>
                  </motion.div>

                  {/* Personal Information */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Personal Information
                          </h2>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/profile/edit" className="text-primary">
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          {/* Email */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg shadow-primary/20">
                              <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Email
                              </p>
                              <p className="font-medium truncate">
                                {user.email}
                              </p>
                            </div>
                            {user.isEmailVerified && (
                              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                <BadgeCheck className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </motion.div>

                          {/* Phone */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/10"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                              <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Phone
                              </p>
                              <p className="font-medium">
                                {user.phone || "Not added"}
                              </p>
                            </div>
                          </motion.div>

                          {/* Date of Birth */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/10"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Date of Birth
                              </p>
                              <p className="font-medium">
                                {formatDate(user.dateOfBirth)}
                              </p>
                            </div>
                          </motion.div>

                          {/* Gender */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/5 to-rose-500/5 border border-pink-500/10"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Gender
                              </p>
                              <p className="font-medium">
                                {formatGender(user.gender)}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Achievements */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Achievements
                          </h2>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            View All
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                          {achievements.map((achievement, index) => (
                            <motion.div
                              key={achievement.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * index }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className={cn(
                                "flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl",
                                achievement.unlocked
                                  ? "bg-gradient-to-b from-muted/50 to-transparent"
                                  : "bg-muted/20 opacity-50"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                                  achievement.color,
                                  !achievement.unlocked && "grayscale"
                                )}
                              >
                                <achievement.icon className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-xs font-medium text-center whitespace-nowrap">
                                {achievement.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                  {/* Weekly Progress */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Weekly Progress
                        </h2>

                        <div className="flex justify-center mb-6">
                          <CircularProgress
                            value={mockStats.weeklyProgress}
                            size={140}
                            strokeWidth={10}
                          >
                            <div className="text-center">
                              <p className="text-3xl font-bold">
                                {mockStats.weeklyProgress}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Complete
                              </p>
                            </div>
                          </CircularProgress>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Goals Progress
                            </span>
                            <span className="text-sm font-medium">
                              {mockStats.goalsCompleted}/{mockStats.totalGoals}
                            </span>
                          </div>
                          <Progress
                            value={
                              (mockStats.goalsCompleted /
                                mockStats.totalGoals) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Recent Activity
                          </h2>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {recentActivities.map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                            >
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center",
                                  activity.bgColor
                                )}
                              >
                                <activity.icon
                                  className={cn("w-5 h-5", activity.color)}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.time}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
                      <div className="p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-primary" />
                          Quick Actions
                        </h2>

                        <div className="grid grid-cols-2 gap-3">
                          {quickActions.map((action, index) => (
                            <motion.div
                              key={action.label}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={action.href}
                                className={cn(
                                  "flex flex-col items-center gap-2 p-4 rounded-2xl",
                                  "bg-gradient-to-br from-muted/50 to-transparent",
                                  "hover:from-muted hover:to-muted/50",
                                  "transition-all duration-300 group"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                    "bg-gradient-to-br group-hover:shadow-lg",
                                    `${action.gradient} group-hover:shadow-${
                                      action.color.split("-")[1]
                                    }-500/20`
                                  )}
                                >
                                  <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm font-medium">
                                  {action.label}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
