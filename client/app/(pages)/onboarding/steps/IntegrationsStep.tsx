"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Smartphone,
  Watch,
  Activity,
  Heart,
  Check,
  ExternalLink,
  Loader2,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Link2,
  Unlink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useOnboarding, Integration } from "../OnboardingContext";
import api from "@/lib/api-client";

// Integration logos/icons with brand colors
const integrationBranding: Record<
  string,
  { bg: string; text: string; border: string; glow: string; logo: string }
> = {
  whoop: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    border: "border-yellow-500/40",
    glow: "shadow-yellow-500/20",
    logo: "W",
  },
  apple_health: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/40",
    glow: "shadow-red-500/20",
    logo: "♥",
  },
  fitbit: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "shadow-cyan-500/20",
    logo: "F",
  },
  garmin: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/40",
    glow: "shadow-blue-500/20",
    logo: "G",
  },
  oura: {
    bg: "bg-purple-500/15",
    text: "text-purple-400",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    logo: "O",
  },
  google_fit: {
    bg: "bg-green-500/15",
    text: "text-green-400",
    border: "border-green-500/40",
    glow: "shadow-green-500/20",
    logo: "G",
  },
  myfitnesspal: {
    bg: "bg-blue-600/15",
    text: "text-blue-400",
    border: "border-blue-600/40",
    glow: "shadow-blue-600/20",
    logo: "M",
  },
  strava: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/40",
    glow: "shadow-orange-500/20",
    logo: "S",
  },
  samsung_health: {
    bg: "bg-indigo-500/15",
    text: "text-indigo-400",
    border: "border-indigo-500/40",
    glow: "shadow-indigo-500/20",
    logo: "S",
  },
  cronometer: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/20",
    logo: "C",
  },
};

// Available integrations
const availableIntegrations: Integration[] = [
  {
    id: "whoop",
    name: "WHOOP",
    type: "wearable",
    icon: "W",
    connected: false,
    dataTypes: ["HRV", "Sleep", "Strain", "Recovery"],
  },
  {
    id: "apple_health",
    name: "Apple Health",
    type: "platform",
    icon: "AH",
    connected: false,
    dataTypes: ["Steps", "Heart Rate", "Sleep", "Workouts"],
  },
  {
    id: "fitbit",
    name: "Fitbit",
    type: "wearable",
    icon: "FB",
    connected: false,
    dataTypes: ["Steps", "Sleep", "Heart Rate", "Activity"],
  },
  {
    id: "garmin",
    name: "Garmin",
    type: "wearable",
    icon: "G",
    connected: false,
    dataTypes: ["Training", "Heart Rate", "Sleep", "VO2 Max"],
  },
  {
    id: "oura",
    name: "Oura Ring",
    type: "wearable",
    icon: "O",
    connected: false,
    dataTypes: ["Sleep", "Readiness", "Activity", "HRV"],
  },
  {
    id: "google_fit",
    name: "Google Fit",
    type: "platform",
    icon: "GF",
    connected: false,
    dataTypes: ["Steps", "Heart Rate", "Workouts", "Sleep"],
  },
  {
    id: "myfitnesspal",
    name: "MyFitnessPal",
    type: "app",
    icon: "MFP",
    connected: false,
    dataTypes: ["Nutrition", "Calories", "Macros", "Meals"],
  },
  {
    id: "strava",
    name: "Strava",
    type: "app",
    icon: "S",
    connected: false,
    dataTypes: ["Running", "Cycling", "Swimming", "GPS"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function IntegrationsStep() {
  const { connectedIntegrations, toggleIntegration, nextStep, prevStep } =
    useOnboarding();

  const [connecting, setConnecting] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("wearable");

  // Try to load integrations from API
  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        await api.get("/integrations");
        // Could update local state with server data
      } catch {
        // Use local state as fallback
      }
    };
    loadIntegrations();
  }, []);

  const handleConnect = async (integrationId: string) => {
    if (connecting) return;

    const isConnected = connectedIntegrations.includes(integrationId);
    if (isConnected) {
      toggleIntegration(integrationId);
      return;
    }

    setConnecting(integrationId);
    // Simulate OAuth connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toggleIntegration(integrationId);
    setConnecting(null);
  };

  // Group integrations by type
  const wearables = availableIntegrations.filter((i) => i.type === "wearable");
  const platforms = availableIntegrations.filter((i) => i.type === "platform");
  const apps = availableIntegrations.filter((i) => i.type === "app");

  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const isConnected = connectedIntegrations.includes(integration.id);
    const isConnecting = connecting === integration.id;
    const branding = integrationBranding[integration.id] || {
      bg: "bg-slate-500/15",
      text: "text-slate-400",
      border: "border-slate-500/40",
      glow: "shadow-slate-500/20",
      logo: integration.icon,
    };

    return (
      <motion.button
        variants={cardVariants}
        onClick={() => handleConnect(integration.id)}
        disabled={isConnecting}
        className={`
          group relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300
          border backdrop-blur-sm overflow-hidden
          ${
            isConnected
              ? `${branding.bg} ${branding.border} shadow-lg ${branding.glow}`
              : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700/80"
          }
        `}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Connected Badge */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 z-10"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`
              relative w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg
              transition-all duration-300
              ${isConnected ? `${branding.bg} ${branding.text}` : "bg-slate-800/80 text-slate-400"}
            `}
          >
            {isConnecting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span className="text-xl">{branding.logo}</span>
            )}

            {/* Connecting pulse */}
            {isConnecting && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-cyan-400/50"
                animate={{
                  scale: [1, 1.2, 1.2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4
              className={`font-semibold truncate ${
                isConnected ? "text-white" : "text-slate-300"
              }`}
            >
              {integration.name}
            </h4>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {integration.dataTypes.slice(0, 3).join(" • ")}
              {integration.dataTypes.length > 3 && " +more"}
            </p>
          </div>

          {/* Action */}
          <div className="flex-shrink-0">
            {isConnected ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium"
              >
                <Link2 className="w-3.5 h-3.5" />
                Connected
              </motion.div>
            ) : isConnecting ? (
              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                Connecting...
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-400 text-xs font-medium group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                Connect
              </div>
            )}
          </div>
        </div>

        {/* Data types on hover/connected */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-slate-700/50"
            >
              <div className="flex flex-wrap gap-2">
                {integration.dataTypes.map((type) => (
                  <span
                    key={type}
                    className={`px-2 py-1 rounded-md text-xs ${branding.bg} ${branding.text}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.button>
    );
  };

  const IntegrationSection = ({
    id,
    title,
    icon,
    integrations,
    description,
  }: {
    id: string;
    title: string;
    icon: React.ReactNode;
    integrations: Integration[];
    description: string;
  }) => {
    const isExpanded = expandedSection === id;
    const connectedCount = integrations.filter((i) =>
      connectedIntegrations.includes(i.id)
    ).length;

    return (
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => setExpandedSection(isExpanded ? null : id)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:bg-slate-800/50 transition-colors mb-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center">
              {icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white flex items-center gap-2">
                {title}
                {connectedCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                    {connectedCount} connected
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {integrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Header */}
      <motion.div
        className="text-center mb-10 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-500/20 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link2 className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-400">
            Sync your health data
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Connect Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Devices & Apps
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Sync your wearables and health apps to get personalized insights
          based on your real data. The more you connect, the better we can help.
        </p>
      </motion.div>

      {/* Connected Status */}
      <AnimatePresence>
        {connectedIntegrations.length > 0 && (
          <motion.div
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">
                  {connectedIntegrations.length} integration
                  {connectedIntegrations.length !== 1 ? "s" : ""} connected
                </h3>
                <p className="text-sm text-slate-400">
                  Your data will sync automatically in the background
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integration Sections */}
      <IntegrationSection
        id="wearable"
        title="Wearables"
        icon={<Watch className="w-5 h-5 text-blue-400" />}
        integrations={wearables}
        description="Smart watches and fitness trackers"
      />

      <IntegrationSection
        id="platform"
        title="Health Platforms"
        icon={<Activity className="w-5 h-5 text-green-400" />}
        integrations={platforms}
        description="Native health apps on your devices"
      />

      <IntegrationSection
        id="app"
        title="Fitness & Nutrition Apps"
        icon={<Heart className="w-5 h-5 text-pink-400" />}
        integrations={apps}
        description="Workout and meal tracking apps"
      />

      {/* Security Info */}
      <motion.div
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-800/50 via-slate-800/30 to-slate-800/50 border border-slate-700/50 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-1">
              Your data is secure
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              We use OAuth 2.0 for secure connections. Your credentials are never
              stored. You can disconnect anytime.{" "}
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Minimum Integration Requirement Banner */}
      <AnimatePresence>
        {connectedIntegrations.length === 0 && (
          <motion.div
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-amber-300 font-semibold mb-1">
                  Connect at least one integration
                </h4>
                <p className="text-sm text-slate-400">
                  To provide personalized insights and track your progress, we need to sync with at least one of your health devices or apps. This enables your AI coach to give data-driven recommendations.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={prevStep}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back
        </motion.button>

        <div className="flex items-center gap-3">
          {connectedIntegrations.length === 0 ? (
            <motion.div
              className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base
                       bg-slate-700/50 text-slate-500 cursor-not-allowed"
              title="Connect at least one integration to continue"
            >
              <span className="relative z-10">Connect to Continue</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </motion.div>
          ) : (
            <motion.button
              onClick={nextStep}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base
                       bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25
                       hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <span className="relative z-10">Continue to Preferences</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
