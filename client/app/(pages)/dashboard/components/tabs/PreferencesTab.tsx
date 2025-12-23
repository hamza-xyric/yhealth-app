"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Sliders,
  Bell,
  MessageSquare,
  Clock,
  Volume2,
  Zap,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sun,
  Moon,
  Smartphone,
  Mail,
} from "lucide-react";
import { api, ApiError } from "@/lib/api-client";

interface Preferences {
  coaching: {
    style: string;
    intensity: string;
    preferredChannel: string;
    checkInFrequency: string;
  };
  notifications: {
    enabled: boolean;
    activityReminders: boolean;
    progressUpdates: boolean;
    motivationalMessages: boolean;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  };
  display: {
    theme: string;
    compactMode: boolean;
    showMetrics: boolean;
  };
}

const coachingStyles = [
  { id: "supportive", label: "Supportive", desc: "Encouraging and gentle guidance" },
  { id: "direct", label: "Direct", desc: "Straightforward and to the point" },
  { id: "analytical", label: "Analytical", desc: "Data-driven insights" },
  { id: "motivational", label: "Motivational", desc: "High energy and inspiring" },
];

const intensityLevels = [
  { id: "gentle", label: "Gentle", desc: "Light nudges and reminders" },
  { id: "moderate", label: "Moderate", desc: "Balanced approach" },
  { id: "intensive", label: "Intensive", desc: "Frequent check-ins" },
];

const channelOptions = [
  { id: "app", label: "App Only", icon: <Smartphone className="w-4 h-4" /> },
  { id: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
  { id: "both", label: "Both", icon: <Bell className="w-4 h-4" /> },
];

const frequencyOptions = [
  { id: "daily", label: "Daily" },
  { id: "twice_daily", label: "Twice Daily" },
  { id: "weekly", label: "Weekly" },
];

export function PreferencesTab() {
  const [preferences, setPreferences] = useState<Preferences>({
    coaching: {
      style: "supportive",
      intensity: "moderate",
      preferredChannel: "app",
      checkInFrequency: "daily",
    },
    notifications: {
      enabled: true,
      activityReminders: true,
      progressUpdates: true,
      motivationalMessages: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
    display: {
      theme: "dark",
      compactMode: false,
      showMetrics: true,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchPreferences = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{ preferences: Preferences }>("/preferences");
      if (response.success && response.data?.preferences) {
        setPreferences(response.data.preferences);
      }
    } catch (err) {
      // Use defaults if not found
      console.log("Using default preferences");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const savePreferences = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      await api.patch("/preferences", preferences);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save preferences");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateCoaching = (field: keyof Preferences["coaching"], value: string) => {
    setPreferences((prev) => ({
      ...prev,
      coaching: { ...prev.coaching, [field]: value },
    }));
  };

  const updateNotifications = (
    field: keyof Preferences["notifications"],
    value: boolean | string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pink-400" />
            Preferences
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Customize your coaching experience
          </p>
        </div>

        <button
          onClick={savePreferences}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </button>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Coaching Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Coaching Style</h3>
          </div>

          <div className="space-y-3">
            {coachingStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateCoaching("style", style.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  preferences.coaching.style === style.id
                    ? "bg-purple-500/20 border border-purple-500/30"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{style.label}</p>
                    <p className="text-sm text-slate-400">{style.desc}</p>
                  </div>
                  {preferences.coaching.style === style.id && (
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Coaching Intensity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-white">Coaching Intensity</h3>
          </div>

          <div className="space-y-3">
            {intensityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => updateCoaching("intensity", level.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  preferences.coaching.intensity === level.id
                    ? "bg-amber-500/20 border border-amber-500/30"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{level.label}</p>
                    <p className="text-sm text-slate-400">{level.desc}</p>
                  </div>
                  {preferences.coaching.intensity === level.id && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Communication Channel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Communication Channel</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {channelOptions.map((channel) => (
              <button
                key={channel.id}
                onClick={() => updateCoaching("preferredChannel", channel.id)}
                className={`p-4 rounded-xl text-center transition-all ${
                  preferences.coaching.preferredChannel === channel.id
                    ? "bg-cyan-500/20 border border-cyan-500/30"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`mx-auto mb-2 ${
                    preferences.coaching.preferredChannel === channel.id
                      ? "text-cyan-400"
                      : "text-slate-400"
                  }`}
                >
                  {channel.icon}
                </div>
                <p className="text-sm font-medium text-white">{channel.label}</p>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-sm text-slate-400 mb-2 block">Check-in Frequency</label>
            <div className="flex gap-2">
              {frequencyOptions.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => updateCoaching("checkInFrequency", freq.id)}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    preferences.coaching.checkInFrequency === freq.id
                      ? "bg-cyan-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "activityReminders" as const,
                label: "Activity Reminders",
                desc: "Get reminded about scheduled activities",
              },
              {
                key: "progressUpdates" as const,
                label: "Progress Updates",
                desc: "Weekly summaries and milestone alerts",
              },
              {
                key: "motivationalMessages" as const,
                label: "Motivational Messages",
                desc: "Daily inspiration and encouragement",
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <div>
                  <p className="font-medium text-white">{setting.label}</p>
                  <p className="text-xs text-slate-400">{setting.desc}</p>
                </div>
                <button
                  onClick={() =>
                    updateNotifications(
                      setting.key,
                      !preferences.notifications[setting.key]
                    )
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    preferences.notifications[setting.key]
                      ? "bg-green-500"
                      : "bg-slate-600"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      preferences.notifications[setting.key]
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}

            {/* Quiet Hours */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">Quiet Hours</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">From</label>
                  <input
                    type="time"
                    value={preferences.notifications.quietHoursStart || "22:00"}
                    onChange={(e) =>
                      updateNotifications("quietHoursStart", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">To</label>
                  <input
                    type="time"
                    value={preferences.notifications.quietHoursEnd || "07:00"}
                    onChange={(e) =>
                      updateNotifications("quietHoursEnd", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
