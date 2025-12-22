"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Smartphone,
  Watch,
  Activity,
  Heart,
  Check,
  ExternalLink,
  Loader2,
  Info,
} from "lucide-react";
import { useOnboarding, Integration } from "../OnboardingContext";
import { StepNavigation } from "../components/StepNavigation";

// Available integrations based on PRD F1.4
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
    dataTypes: ["Training", "Heart Rate", "Sleep", "Stress"],
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
    dataTypes: ["Running", "Cycling", "Swimming", "Workouts"],
  },
  {
    id: "peloton",
    name: "Peloton",
    type: "app",
    icon: "P",
    connected: false,
    dataTypes: ["Workouts", "Heart Rate", "Cycling", "Classes"],
  },
  {
    id: "withings",
    name: "Withings",
    type: "wearable",
    icon: "W",
    connected: false,
    dataTypes: ["Weight", "Body Comp", "Sleep", "Blood Pressure"],
  },
];

const integrationColors: Record<string, { bg: string; text: string; border: string }> = {
  whoop: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  apple_health: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
  fitbit: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  garmin: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  oura: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  google_fit: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  myfitnesspal: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  strava: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  peloton: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
  withings: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
};

export function IntegrationsStep() {
  const { connectedIntegrations, toggleIntegration, nextStep, prevStep } =
    useOnboarding();

  const [connecting, setConnecting] = useState<string | null>(null);

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
    const colors = integrationColors[integration.id] || {
      bg: "bg-slate-500/20",
      text: "text-slate-400",
      border: "border-slate-500/30",
    };

    return (
      <motion.button
        onClick={() => handleConnect(integration.id)}
        disabled={isConnecting}
        className={`
          relative p-4 rounded-xl border transition-all duration-300
          ${
            isConnected
              ? `${colors.bg} ${colors.border}`
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Connected Badge */}
        {isConnected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}

        <div className="flex flex-col items-center gap-3">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${colors.bg} ${colors.text}`}
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              integration.icon
            )}
          </div>

          {/* Name */}
          <span
            className={`text-sm font-medium ${isConnected ? "text-white" : "text-slate-300"}`}
          >
            {integration.name}
          </span>

          {/* Status */}
          <span
            className={`text-xs ${
              isConnected
                ? "text-emerald-400"
                : isConnecting
                  ? "text-blue-400"
                  : "text-slate-500"
            }`}
          >
            {isConnected ? "Connected" : isConnecting ? "Connecting..." : "Tap to connect"}
          </span>
        </div>
      </motion.button>
    );
  };

  const IntegrationSection = ({
    title,
    icon,
    integrations,
  }: {
    title: string;
    icon: React.ReactNode;
    integrations: Integration[];
  }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-sm text-slate-500">({integrations.length})</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Smartphone className="w-8 h-8 text-blue-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Connect Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Devices & Apps
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Sync your wearables and health apps to get personalized insights
          based on your real data.
        </p>
      </motion.div>

      {/* Connected Count */}
      {connectedIntegrations.length > 0 && (
        <motion.div
          className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-white font-medium">
                {connectedIntegrations.length} integration
                {connectedIntegrations.length !== 1 ? "s" : ""} connected
              </span>
              <p className="text-sm text-slate-400">
                We&apos;ll sync your data automatically
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Integrations */}
      <IntegrationSection
        title="Wearables"
        icon={<Watch className="w-5 h-5 text-blue-400" />}
        integrations={wearables}
      />

      <IntegrationSection
        title="Health Platforms"
        icon={<Activity className="w-5 h-5 text-green-400" />}
        integrations={platforms}
      />

      <IntegrationSection
        title="Fitness & Nutrition Apps"
        icon={<Heart className="w-5 h-5 text-pink-400" />}
        integrations={apps}
      />

      {/* Info Box */}
      <motion.div
        className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Your data is secure
            </h4>
            <p className="text-xs text-slate-400">
              We use OAuth 2.0 for secure connections. Your credentials are never
              stored. You can disconnect anytime.{" "}
              <a
                href="#"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <StepNavigation
        onBack={prevStep}
        onNext={nextStep}
        onSkip={nextStep}
        showSkip={connectedIntegrations.length === 0}
        nextLabel="Continue to Preferences"
      />
    </div>
  );
}
