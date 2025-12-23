"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Archive,
  Filter,
  Search,
  ChevronDown,
  Clock,
  Trophy,
  Target,
  Flame,
  Settings,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Link2,
  PartyPopper,
  Calendar,
  ArrowLeft,
  MoreVertical,
  RefreshCw,
  X,
  Loader2,
  Inbox,
  CheckCircle2,
  Circle,
  ArchiveRestore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MainLayout } from "@/components/layout";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";

// Types
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  icon?: string;
  imageUrl?: string;
  actionUrl?: string;
  actionLabel?: string;
  category?: string;
  priority: "low" | "normal" | "high" | "urgent";
  isRead: boolean;
  readAt?: string;
  isArchived: boolean;
  archivedAt?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  metadata?: Record<string, unknown>;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  archived: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}

// Notification type icons and colors
const NOTIFICATION_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  achievement: {
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  goal_progress: {
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  goal_completed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  streak: { icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  reminder: { icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
  plan_update: {
    icon: Calendar,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  system: { icon: Settings, color: "text-slate-500", bg: "bg-slate-500/10" },
  social: {
    icon: MessageSquare,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  integration: { icon: Link2, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  coaching: {
    icon: MessageSquare,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  celebration: {
    icon: PartyPopper,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  tip: { icon: Lightbulb, color: "text-green-500", bg: "bg-green-500/10" },
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  normal: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
};

function NotificationSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-4 rounded-xl bg-card/60"
        >
          <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  type,
  searchQuery,
}: {
  type: string;
  searchQuery: string;
}) {
  const messages: Record<string, { title: string; description: string }> = {
    all: {
      title: "No notifications yet",
      description:
        "When you receive notifications, they will appear here. Start your health journey to get updates!",
    },
    unread: {
      title: "All caught up!",
      description:
        "You have no unread notifications. Great job staying on top of things!",
    },
    archived: {
      title: "No archived notifications",
      description:
        "Notifications you archive will be stored here for reference.",
    },
    search: {
      title: "No results found",
      description: `No notifications match "${searchQuery}". Try a different search term.`,
    },
  };

  const { title, description } =
    messages[searchQuery ? "search" : type] || messages.all;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-6"
      >
        {type === "unread" ? (
          <CheckCheck className="w-10 h-10 text-primary" />
        ) : (
          <Inbox className="w-10 h-10 text-muted-foreground" />
        )}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </motion.div>
  );
}

function NotificationItem({
  notification,
  isSelected,
  onSelect,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onUnarchive,
  onDelete,
  selectionMode,
}: {
  notification: Notification;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  onDelete: (id: string) => void;
  selectionMode: boolean;
}) {
  const router = useRouter();
  const config = NOTIFICATION_CONFIG[notification.type] || {
    icon: Bell,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  };
  const Icon = config.icon;

  const handleClick = () => {
    if (selectionMode) {
      onSelect(notification.id);
      return;
    }

    if (!notification.isRead) {
      onMarkRead(notification.id);
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      layout
      className={cn(
        "group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-200",
        "border border-transparent hover:border-primary/10",
        notification.isRead
          ? "bg-card/40 hover:bg-card/60"
          : "bg-card/80 hover:bg-card shadow-sm",
        isSelected && "ring-2 ring-primary/50 bg-primary/5",
        notification.actionUrl && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      {/* Selection Checkbox */}
      {selectionMode && (
        <div
          className="flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(notification.id)}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      )}

      {/* Unread Indicator */}
      {!notification.isRead && !selectionMode && (
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          config.bg
        )}
      >
        {notification.icon ? (
          <span className="text-xl">{notification.icon}</span>
        ) : (
          <Icon className={cn("w-5 h-5", config.color)} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              "text-sm font-medium line-clamp-1",
              !notification.isRead && "text-foreground",
              notification.isRead && "text-muted-foreground"
            )}
          >
            {notification.title}
          </h4>
          <div className="flex items-center gap-2 flex-shrink-0">
            {notification.priority !== "normal" && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0 capitalize",
                  PRIORITY_COLORS[notification.priority]
                )}
              >
                {notification.priority}
              </Badge>
            )}
          </div>
        </div>

        <p
          className={cn(
            "text-xs mt-1 line-clamp-2",
            !notification.isRead
              ? "text-muted-foreground"
              : "text-muted-foreground/70"
          )}
        >
          {notification.message}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>

          {notification.actionUrl && notification.actionLabel && (
            <span className="text-[10px] text-primary font-medium">
              {notification.actionLabel} →
            </span>
          )}
        </div>
      </div>

      {/* Actions Menu */}
      {!selectionMode && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {notification.isRead ? (
              <DropdownMenuItem onClick={() => onMarkUnread(notification.id)}>
                <Circle className="w-4 h-4 mr-2" />
                Mark as unread
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onMarkRead(notification.id)}>
                <Check className="w-4 h-4 mr-2" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {notification.isArchived ? (
              <DropdownMenuItem onClick={() => onUnarchive(notification.id)}>
                <ArchiveRestore className="w-4 h-4 mr-2" />
                Unarchive
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onArchive(notification.id)}>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(notification.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </motion.div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | "selected" | null>(
    null
  );

  // Fetch notifications
  const fetchNotifications = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const [notifResponse, statsResponse] = await Promise.all([
        api.get<{ notifications: Notification[] }>("/notifications", {
          params: { limit: 100, includeArchived: true },
        }),
        api.get<NotificationStats>("/notifications/stats"),
      ]);

      setNotifications(notifResponse.data?.notifications || []);
      setStats(statsResponse.data || null);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    let result = notifications;

    // Tab filter
    if (activeTab === "unread") {
      result = result.filter((n) => !n.isRead && !n.isArchived);
    } else if (activeTab === "archived") {
      result = result.filter((n) => n.isArchived);
    } else {
      result = result.filter((n) => !n.isArchived);
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((n) => n.type === typeFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter((n) => n.priority === priorityFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query)
      );
    }

    return result;
  }, [notifications, activeTab, typeFilter, priorityFilter, searchQuery]);

  // Handlers
  const handleMarkRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n
        )
      );
      setStats((prev) =>
        prev ? { ...prev, unread: prev.unread - 1, read: prev.read + 1 } : prev
      );
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkUnread = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/unread`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isRead: false, readAt: undefined } : n
        )
      );
      setStats((prev) =>
        prev ? { ...prev, unread: prev.unread + 1, read: prev.read - 1 } : prev
      );
    } catch (error) {
      toast.error("Failed to mark as unread");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.post("/notifications/mark-all-read");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: new Date().toISOString() }))
      );
      setStats((prev) =>
        prev
          ? { ...prev, unread: 0, read: prev.total - prev.archived }
          : prev
      );
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/archive`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, isArchived: true, archivedAt: new Date().toISOString() }
            : n
        )
      );
      setStats((prev) =>
        prev ? { ...prev, archived: prev.archived + 1 } : prev
      );
      toast.success("Notification archived");
    } catch (error) {
      toast.error("Failed to archive");
    }
  };

  const handleUnarchive = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/unarchive`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isArchived: false, archivedAt: undefined } : n
        )
      );
      setStats((prev) =>
        prev ? { ...prev, archived: prev.archived - 1 } : prev
      );
      toast.success("Notification restored");
    } catch (error) {
      toast.error("Failed to restore");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setStats((prev) =>
        prev ? { ...prev, total: prev.total - 1 } : prev
      );
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;

    try {
      await api.post("/notifications/delete-multiple", {
        ids: Array.from(selectedIds),
      });
      setNotifications((prev) =>
        prev.filter((n) => !selectedIds.has(n.id))
      );
      setStats((prev) =>
        prev ? { ...prev, total: prev.total - selectedIds.size } : prev
      );
      setSelectedIds(new Set());
      setSelectionMode(false);
      toast.success(`${selectedIds.size} notifications deleted`);
    } catch (error) {
      toast.error("Failed to delete notifications");
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNotifications.map((n) => n.id)));
    }
  };

  const confirmDelete = () => {
    if (deleteTarget === "selected") {
      handleDeleteSelected();
    } else if (deleteTarget) {
      handleDelete(deleteTarget);
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // Get unique types for filter
  const uniqueTypes = useMemo(() => {
    const types = new Set(notifications.map((n) => n.type));
    return Array.from(types);
  }, [notifications]);

  if (authLoading || (!user && isLoading)) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <NotificationSkeleton />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <BellOff className="w-16 h-16 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Please sign in to view your notifications.
            </p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Background decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Bell className="w-7 h-7 text-primary" />
                  Notifications
                  {stats && stats.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground">
                      {stats.unread} new
                    </Badge>
                  )}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Stay updated with your health journey
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fetchNotifications(true)}
                disabled={isRefreshing}
                className="rounded-full"
              >
                <RefreshCw
                  className={cn("w-4 h-4", isRefreshing && "animate-spin")}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full"
              >
                <Link href="/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
            >
              {[
                {
                  label: "Total",
                  value: stats.total,
                  color: "from-slate-500 to-slate-600",
                },
                {
                  label: "Unread",
                  value: stats.unread,
                  color: "from-primary to-purple-500",
                },
                {
                  label: "Read",
                  value: stats.read,
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  label: "Archived",
                  value: stats.archived,
                  color: "from-orange-500 to-amber-500",
                },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  className="border-0 bg-card/60 backdrop-blur-sm"
                >
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p
                      className={cn(
                        "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                        stat.color
                      )}
                    >
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Tabs and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-6"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-card/60 backdrop-blur-sm p-1 h-auto">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
                >
                  Unread
                  {stats && stats.unread > 0 && (
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {stats.unread}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-card/60 border-0 rounded-xl"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px] h-10 bg-card/60 border-0 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[140px] h-10 bg-card/60 border-0 rounded-xl">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={selectionMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectionMode(!selectionMode);
                    setSelectedIds(new Set());
                  }}
                  className="rounded-lg"
                >
                  {selectionMode ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Select
                    </>
                  )}
                </Button>

                {selectionMode && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                      className="rounded-lg"
                    >
                      {selectedIds.size === filteredNotifications.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>

                    {selectedIds.size > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setDeleteTarget("selected");
                          setDeleteDialogOpen(true);
                        }}
                        className="rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete ({selectedIds.size})
                      </Button>
                    )}
                  </>
                )}
              </div>

              {stats && stats.unread > 0 && !selectionMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="rounded-lg"
                >
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
              )}
            </div>
          </motion.div>

          {/* Notifications List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isLoading ? (
              <NotificationSkeleton />
            ) : filteredNotifications.length === 0 ? (
              <EmptyState type={activeTab} searchQuery={searchQuery} />
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <AnimatePresence mode="popLayout">
                  {filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      isSelected={selectedIds.has(notification.id)}
                      onSelect={handleSelect}
                      onMarkRead={handleMarkRead}
                      onMarkUnread={handleMarkUnread}
                      onArchive={handleArchive}
                      onUnarchive={handleUnarchive}
                      onDelete={(id) => {
                        setDeleteTarget(id);
                        setDeleteDialogOpen(true);
                      }}
                      selectionMode={selectionMode}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Notification(s)</AlertDialogTitle>
              <AlertDialogDescription>
                {deleteTarget === "selected"
                  ? `Are you sure you want to delete ${selectedIds.size} notification(s)? This action cannot be undone.`
                  : "Are you sure you want to delete this notification? This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
