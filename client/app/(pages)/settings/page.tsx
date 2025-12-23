"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Clock,
  Zap,
  Heart,
  Target,
  BarChart2,
  Flame,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
  Save,
  Link as LinkIcon,
  Unlink,
  Trash2,
  Download,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";
import { MainLayout } from "@/components/layout";

// Types
interface UserPreferences {
  coaching: {
    style: string;
    intensity: string;
    preferredChannel: string;
    checkInFrequency: string;
    preferredCheckInTime: string;
    timezone: string;
  };
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  appearance: {
    theme: string;
    compactMode: boolean;
  };
  privacy: {
    shareProgress: boolean;
    anonymousAnalytics: boolean;
  };
}

interface ConnectedIntegration {
  provider: string;
  displayName: string;
  description: string;
  tier: number;
  dataTypes: string[];
  syncFrequencyMinutes: number;
  authType: string;
  scopes: string[];
  isConnected: boolean;
  lastSync?: string;
}

const coachingStyles = [
  { id: "supportive", label: "Supportive", icon: <Heart className="w-4 h-4" /> },
  { id: "direct", label: "Direct", icon: <Target className="w-4 h-4" /> },
  { id: "analytical", label: "Analytical", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "motivational", label: "Motivational", icon: <Flame className="w-4 h-4" /> },
];

const intensityLevels = [
  { id: "light", label: "Light Touch", desc: "2-3 check-ins/week" },
  { id: "moderate", label: "Balanced", desc: "5-7 check-ins/week" },
  { id: "intensive", label: "High Engagement", desc: "10-14 check-ins/week" },
];

export default function SettingsPage() {
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("coaching");
  const [integrations, setIntegrations] = useState<ConnectedIntegration[]>([]);

  const [preferences, setPreferences] = useState<UserPreferences>({
    coaching: {
      style: "supportive",
      intensity: "moderate",
      preferredChannel: "push",
      checkInFrequency: "daily",
      preferredCheckInTime: "09:00",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    notifications: {
      enabled: true,
      email: true,
      push: true,
      sms: false,
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "07:00",
      },
    },
    appearance: {
      theme: "dark",
      compactMode: false,
    },
    privacy: {
      shareProgress: false,
      anonymousAnalytics: true,
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin?callbackUrl=/settings");
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch preferences
  const fetchPreferences = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{ preferences: Partial<UserPreferences> }>(
        "/preferences"
      );
      if (response.success && response.data?.preferences) {
        setPreferences((prev) => ({
          ...prev,
          ...response.data!.preferences,
        }));
      }

      // Fetch integrations
      const intResponse = await api.get<{
        integrations: ConnectedIntegration[];
      }>("/integrations");
      if (intResponse.success && intResponse.data) {
        setIntegrations(intResponse.data.integrations || []);
      }
    } catch (err) {
      if (err instanceof ApiError && err.code !== "NOT_FOUND") {
        console.error("Failed to load preferences:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPreferences();
    }
  }, [isAuthenticated, fetchPreferences]);

  // Save preferences
  const savePreferences = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.patch("/preferences", preferences);
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save settings");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Update preference helper
  const updatePreference = (
    section: keyof UserPreferences,
    key: string,
    value: unknown
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const sections = [
    { id: "coaching", label: "Coaching", icon: <Heart className="w-5 h-5" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: <LinkIcon className="w-5 h-5" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="w-5 h-5" />,
    },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <User className="w-5 h-5" /> },
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-400">Loading settings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Settings
                  </span>
                </h1>
                <p className="text-slate-400 mt-1">
                  Manage your preferences and account
                </p>
              </div>

            <button
              onClick={savePreferences}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Save Changes
            </button>
          </div>

          {/* Success/Error Messages */}
          {(success || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${
                success
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {success ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <p className={success ? "text-green-400" : "text-red-400"}>
                  {success || error}
                </p>
              </div>
            </motion.div>
          )}
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 shrink-0"
          >
            <div className="sticky top-8 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            {/* Coaching Settings */}
            {activeSection === "coaching" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Coaching Style
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {coachingStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          updatePreference("coaching", "style", style.id)
                        }
                        className={`p-4 rounded-xl border text-left transition-all ${
                          preferences.coaching.style === style.id
                            ? "bg-purple-500/20 border-purple-500/40"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              preferences.coaching.style === style.id
                                ? "bg-purple-500/30 text-purple-400"
                                : "bg-white/10 text-slate-400"
                            }`}
                          >
                            {style.icon}
                          </div>
                          <span
                            className={
                              preferences.coaching.style === style.id
                                ? "text-white font-medium"
                                : "text-slate-300"
                            }
                          >
                            {style.label}
                          </span>
                          {preferences.coaching.style === style.id && (
                            <Check className="w-4 h-4 text-purple-400 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Engagement Level
                  </h2>
                  <div className="space-y-3">
                    {intensityLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() =>
                          updatePreference("coaching", "intensity", level.id)
                        }
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          preferences.coaching.intensity === level.id
                            ? "bg-purple-500/20 border-purple-500/40"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <p
                            className={
                              preferences.coaching.intensity === level.id
                                ? "text-white font-medium"
                                : "text-slate-300"
                            }
                          >
                            {level.label}
                          </p>
                          <p className="text-sm text-slate-500">{level.desc}</p>
                        </div>
                        {preferences.coaching.intensity === level.id && (
                          <Check className="w-5 h-5 text-purple-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Check-in Time
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-slate-400 mb-2 block">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={preferences.coaching.preferredCheckInTime}
                        onChange={(e) =>
                          updatePreference(
                            "coaching",
                            "preferredCheckInTime",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-slate-400 mb-2 block">
                        Timezone
                      </label>
                      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-500" />
                        {preferences.coaching.timezone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Notification Channels
                    </h2>
                    <button
                      onClick={() =>
                        updatePreference(
                          "notifications",
                          "enabled",
                          !preferences.notifications.enabled
                        )
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.notifications.enabled
                          ? "bg-purple-500"
                          : "bg-slate-700"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                        animate={{
                          left: preferences.notifications.enabled
                            ? "calc(100% - 20px)"
                            : "4px",
                        }}
                      />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        id: "push",
                        label: "Push Notifications",
                        icon: <Smartphone className="w-5 h-5" />,
                        key: "push",
                      },
                      {
                        id: "email",
                        label: "Email",
                        icon: <Mail className="w-5 h-5" />,
                        key: "email",
                      },
                      {
                        id: "sms",
                        label: "SMS",
                        icon: <MessageSquare className="w-5 h-5" />,
                        key: "sms",
                      },
                    ].map((channel) => (
                      <div
                        key={channel.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/10 text-slate-400">
                            {channel.icon}
                          </div>
                          <span className="text-slate-300">{channel.label}</span>
                        </div>
                        <button
                          onClick={() =>
                            updatePreference(
                              "notifications",
                              channel.key,
                              !preferences.notifications[
                                channel.key as keyof typeof preferences.notifications
                              ]
                            )
                          }
                          disabled={!preferences.notifications.enabled}
                          className={`relative w-12 h-6 rounded-full transition-colors disabled:opacity-50 ${
                            preferences.notifications[
                              channel.key as keyof typeof preferences.notifications
                            ]
                              ? "bg-purple-500"
                              : "bg-slate-700"
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                            animate={{
                              left: preferences.notifications[
                                channel.key as keyof typeof preferences.notifications
                              ]
                                ? "calc(100% - 20px)"
                                : "4px",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-lg font-semibold text-white">
                        Quiet Hours
                      </h2>
                    </div>
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            quietHours: {
                              ...prev.notifications.quietHours,
                              enabled: !prev.notifications.quietHours.enabled,
                            },
                          },
                        }))
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.notifications.quietHours.enabled
                          ? "bg-indigo-500"
                          : "bg-slate-700"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                        animate={{
                          left: preferences.notifications.quietHours.enabled
                            ? "calc(100% - 20px)"
                            : "4px",
                        }}
                      />
                    </button>
                  </div>

                  {preferences.notifications.quietHours.enabled && (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-slate-400 mb-2 block">
                          From
                        </label>
                        <input
                          type="time"
                          value={preferences.notifications.quietHours.start}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                quietHours: {
                                  ...prev.notifications.quietHours,
                                  start: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-slate-400 mb-2 block">
                          To
                        </label>
                        <input
                          type="time"
                          value={preferences.notifications.quietHours.end}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                quietHours: {
                                  ...prev.notifications.quietHours,
                                  end: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeSection === "integrations" && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Connected Apps
                </h2>

                <div className="space-y-4">
                  {integrations.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center">
                        <LinkIcon className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-slate-400">No connected integrations</p>
                      <button
                        onClick={() => router.push("/onboarding")}
                        className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        Connect Apps
                      </button>
                    </div>
                  ) : (
                    integrations.map((integration) => (
                      <div
                        key={integration.provider}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {integration.displayName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="text-xs text-slate-400 mt-1">
                                Last synced:{" "}
                                {new Date(integration.lastSync).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                        {integration.isConnected ? (
                          <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                            <Unlink className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-sm font-medium">
                            Connect
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeSection === "appearance" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Theme
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: <Sun className="w-5 h-5" /> },
                      { id: "dark", label: "Dark", icon: <Moon className="w-5 h-5" /> },
                      {
                        id: "system",
                        label: "System",
                        icon: <Settings className="w-5 h-5" />,
                      },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() =>
                          updatePreference("appearance", "theme", theme.id)
                        }
                        className={`p-4 rounded-xl border text-center transition-all ${
                          preferences.appearance.theme === theme.id
                            ? "bg-purple-500/20 border-purple-500/40"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className={
                              preferences.appearance.theme === theme.id
                                ? "text-purple-400"
                                : "text-slate-400"
                            }
                          >
                            {theme.icon}
                          </span>
                          <span
                            className={
                              preferences.appearance.theme === theme.id
                                ? "text-white"
                                : "text-slate-300"
                            }
                          >
                            {theme.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Compact Mode
                      </h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Use a more condensed layout
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updatePreference(
                          "appearance",
                          "compactMode",
                          !preferences.appearance.compactMode
                        )
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.appearance.compactMode
                          ? "bg-purple-500"
                          : "bg-slate-700"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                        animate={{
                          left: preferences.appearance.compactMode
                            ? "calc(100% - 20px)"
                            : "4px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeSection === "privacy" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Data & Privacy
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <p className="text-white font-medium">
                          Share Progress with Coach
                        </p>
                        <p className="text-sm text-slate-400">
                          Allow your AI coach to see detailed progress
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updatePreference(
                            "privacy",
                            "shareProgress",
                            !preferences.privacy.shareProgress
                          )
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.privacy.shareProgress
                            ? "bg-purple-500"
                            : "bg-slate-700"
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                          animate={{
                            left: preferences.privacy.shareProgress
                              ? "calc(100% - 20px)"
                              : "4px",
                          }}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <p className="text-white font-medium">
                          Anonymous Analytics
                        </p>
                        <p className="text-sm text-slate-400">
                          Help improve yHealth with anonymous usage data
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updatePreference(
                            "privacy",
                            "anonymousAnalytics",
                            !preferences.privacy.anonymousAnalytics
                          )
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.privacy.anonymousAnalytics
                            ? "bg-purple-500"
                            : "bg-slate-700"
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                          animate={{
                            left: preferences.privacy.anonymousAnalytics
                              ? "calc(100% - 20px)"
                              : "4px",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Your Data
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4" />
                      Export Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Delete All Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Account Information
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <label className="text-sm text-slate-400 mb-1 block">
                        Name
                      </label>
                      <p className="text-white">
                        {user?.firstName
                          ? `${user.firstName} ${user.lastName || ""}`.trim()
                          : "Not set"}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5">
                      <label className="text-sm text-slate-400 mb-1 block">
                        Email
                      </label>
                      <p className="text-white">{user?.email || "Not set"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Session
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>

                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6">
                  <h2 className="text-lg font-semibold text-red-400 mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-sm text-slate-400 mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.main>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}
