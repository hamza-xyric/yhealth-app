"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Send,
  ArrowLeft,
  Zap,
  Sparkles,
  Clock,
  ChevronRight,
  Mic,
  MicOff,
  Paperclip,
  Smile,
  MoreHorizontal,
  Check,
  CheckCheck,
  Volume2,
  Pause,
  Play,
  Brain,
  Heart,
  Shield,
  Target,
  Lightbulb,
  Star,
} from "lucide-react";
import { useOnboarding, GoalCategory } from "../OnboardingContext";

// ============================================================================
// Types
// ============================================================================

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  reactions?: string[];
}

interface ExtractedInsight {
  id: string;
  category: "motivation" | "barrier" | "preference" | "lifestyle" | "goal";
  text: string;
  confidence: number;
  icon: React.ReactNode;
}

interface ConversationState {
  phase: "opening" | "exploration" | "deepening" | "closing";
  topicsExplored: string[];
  insightsGathered: number;
}

// ============================================================================
// Constants
// ============================================================================

const TYPING_DELAY_MIN = 1000;
const TYPING_DELAY_MAX = 2000;
const AI_RESPONSE_DELAY = 500;

const GOAL_OPENING_MESSAGES: Record<GoalCategory, string> = {
  weight_loss:
    "You mentioned wanting to lose weight. I'd love to understand your journey so far. What made you decide now is the right time to focus on this?",
  muscle_building:
    "Building muscle is a great goal! Before we create your plan, tell me about your experience with strength training. What draws you to this goal?",
  sleep_improvement:
    "Better sleep can transform everything else in life. What's been going on with your sleep lately? When did you first notice it becoming a challenge?",
  stress_wellness:
    "Managing stress is so important for overall wellbeing. I'd love to understand what's been on your mind lately. What does a typical stressful day look like for you?",
  energy_productivity:
    "Having more energy sounds like it would make a real difference. Tell me about your energy patterns - when do you feel most alive, and when does that energy dip?",
  event_training:
    "Training for an event is exciting! What event are you preparing for, and what does success look like for you?",
  health_condition:
    "Managing a health condition takes dedication. I'm here to support you. What condition are you focusing on, and how has it been affecting your daily life?",
  habit_building:
    "Building lasting habits is the foundation of any health journey. What habits have you tried to build before, and what made them stick or fade away?",
  overall_optimization:
    "Optimizing your overall health is a holistic approach I really appreciate. If you could wake up feeling 10% better in one area of your life tomorrow, what would that area be?",
  custom:
    "I see you have a unique goal in mind - that's wonderful! Tell me more about what you're hoping to achieve and why it matters to you.",
};

const FOLLOW_UP_QUESTIONS: Record<string, string[]> = {
  motivation: [
    "That's really insightful. What would achieving this goal mean for your daily life?",
    "It sounds like this is deeply personal to you. Has anyone in your life inspired this goal?",
    "When you imagine yourself having achieved this, how do you feel?",
  ],
  barriers: [
    "I hear you. When work gets stressful, what do you typically reach for to cope?",
    "What's gotten in the way of similar goals in the past?",
    "If there was one thing that could make this easier, what would it be?",
  ],
  lifestyle: [
    "How does a typical day look for you? Walk me through your morning routine.",
    "What does your support system look like? Family, friends, or perhaps a workout buddy?",
    "How do you usually unwind after a long day?",
  ],
  preferences: [
    "Do you prefer structure and routine, or more flexibility in your approach?",
    "Are you more motivated by quick wins or long-term progress?",
    "How do you feel about tracking your progress - helpful or overwhelming?",
  ],
  deepening: [
    "That's really helpful to know. Tell me more about that.",
    "I'm curious about that - can you give me an example?",
    "How does that make you feel when it happens?",
  ],
  closing: [
    "We've covered a lot of ground! Before we move on, is there anything else about your health journey you'd like me to know?",
    "This has been really valuable. Any final thoughts before I put together your personalized plan?",
    "I feel like I understand you much better now. Anything else you'd like to add?",
  ],
};

const KEYWORD_PATTERNS = {
  stress: ["stress", "anxious", "overwhelmed", "pressure", "busy", "hectic"],
  motivation: ["want", "hope", "dream", "goal", "achieve", "excited", "ready"],
  barriers: ["hard", "difficult", "struggle", "fail", "tried", "can't", "problem"],
  lifestyle: ["work", "family", "schedule", "routine", "day", "morning", "night"],
  emotions: ["feel", "feeling", "happy", "sad", "frustrated", "confident", "scared"],
  health: ["weight", "sleep", "energy", "tired", "pain", "health", "doctor"],
};

// ============================================================================
// Utility Functions
// ============================================================================

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getTypingDelay(): number {
  return TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
}

function detectKeywords(text: string): string[] {
  const lowerText = text.toLowerCase();
  const detectedTopics: string[] = [];

  for (const [topic, keywords] of Object.entries(KEYWORD_PATTERNS)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      detectedTopics.push(topic);
    }
  }

  return detectedTopics;
}

function selectAIResponse(
  userMessage: string,
  conversationState: ConversationState,
  messageCount: number
): string {
  const detectedTopics = detectKeywords(userMessage);

  if (messageCount >= 8 || conversationState.phase === "closing") {
    return FOLLOW_UP_QUESTIONS.closing[
      Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.closing.length)
    ];
  }

  if (detectedTopics.includes("stress") || detectedTopics.includes("emotions")) {
    return FOLLOW_UP_QUESTIONS.barriers[
      Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.barriers.length)
    ];
  }

  if (detectedTopics.includes("motivation")) {
    return FOLLOW_UP_QUESTIONS.motivation[
      Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.motivation.length)
    ];
  }

  if (detectedTopics.includes("lifestyle")) {
    return FOLLOW_UP_QUESTIONS.lifestyle[
      Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.lifestyle.length)
    ];
  }

  if (detectedTopics.includes("barriers")) {
    return FOLLOW_UP_QUESTIONS.barriers[
      Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.barriers.length)
    ];
  }

  return FOLLOW_UP_QUESTIONS.deepening[
    Math.floor(Math.random() * FOLLOW_UP_QUESTIONS.deepening.length)
  ];
}

function extractInsights(messages: Message[]): ExtractedInsight[] {
  const userMessages = messages.filter((m) => m.sender === "user");
  const insights: ExtractedInsight[] = [];

  userMessages.forEach((message, index) => {
    const text = message.text.toLowerCase();

    if (text.includes("want") || text.includes("goal") || text.includes("hope")) {
      insights.push({
        id: `insight_${index}_motivation`,
        category: "motivation",
        text: message.text.substring(0, 60) + "...",
        confidence: 0.8,
        icon: <Target className="w-3.5 h-3.5" />,
      });
    }

    if (text.includes("struggle") || text.includes("hard") || text.includes("difficult")) {
      insights.push({
        id: `insight_${index}_barrier`,
        category: "barrier",
        text: message.text.substring(0, 60) + "...",
        confidence: 0.75,
        icon: <Shield className="w-3.5 h-3.5" />,
      });
    }

    if (text.includes("work") || text.includes("morning") || text.includes("routine")) {
      insights.push({
        id: `insight_${index}_lifestyle`,
        category: "lifestyle",
        text: message.text.substring(0, 60) + "...",
        confidence: 0.7,
        icon: <Heart className="w-3.5 h-3.5" />,
      });
    }
  });

  return insights.slice(0, 4);
}

// ============================================================================
// Subcomponents
// ============================================================================

function AdvancedTypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-3 max-w-[85%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      {/* AI Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <motion.div
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Typing Bubble */}
      <div className="relative">
        <div className="px-5 py-4 rounded-3xl rounded-bl-lg bg-slate-800/90 border border-slate-700/50 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
            <span className="text-xs text-slate-500 ml-2">thinking...</span>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl rounded-bl-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-xl -z-10" />
      </div>
    </motion.div>
  );
}

interface ChatBubbleProps {
  message: Message;
  isLatest: boolean;
}

function ChatBubble({ message, isLatest }: ChatBubbleProps) {
  const isAI = message.sender === "ai";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`flex items-end gap-3 ${isAI ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AI Avatar */}
      {isAI && (
        <motion.div
          className="relative flex-shrink-0"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900" />
        </motion.div>
      )}

      {/* Message Bubble */}
      <div className={`relative max-w-[75%] group ${isAI ? "" : "order-first"}`}>
        <motion.div
          className={`
            relative px-5 py-4 shadow-xl
            ${isAI
              ? "rounded-3xl rounded-bl-lg bg-slate-800/90 border border-slate-700/50"
              : "rounded-3xl rounded-br-lg bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"
            }
          `}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glass effect overlay for AI */}
          {isAI && (
            <div className="absolute inset-0 rounded-3xl rounded-bl-lg bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          )}

          {/* Message text */}
          <p className={`relative z-10 text-[15px] leading-relaxed ${isAI ? "text-slate-200" : "text-white"}`}>
            {message.text}
          </p>

          {/* Timestamp and status */}
          <div className={`flex items-center gap-2 mt-2 ${isAI ? "justify-start" : "justify-end"}`}>
            <span className="text-[10px] text-slate-500">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {!isAI && message.status && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-slate-400"
              >
                {message.status === "read" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </motion.span>
            )}
          </div>

          {/* Glow effect for latest */}
          {isLatest && (
            <motion.div
              className={`absolute -inset-px rounded-3xl pointer-events-none ${isAI ? "rounded-bl-lg" : "rounded-br-lg"}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2 }}
              style={{
                background: isAI
                  ? "linear-gradient(135deg, rgba(139, 92, 246, 0.4), transparent)"
                  : "linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(217, 70, 239, 0.4))",
              }}
            />
          )}
        </motion.div>

        {/* Hover actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 ${isAI ? "-right-20" : "-left-20"}`}
              initial={{ opacity: 0, x: isAI ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAI ? -10 : 10 }}
            >
              <button className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background glow */}
        {isAI && (
          <div className="absolute inset-0 rounded-3xl rounded-bl-lg bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 blur-2xl -z-10" />
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <motion.div
          className="relative flex-shrink-0"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-bold text-sm">
            N
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface InsightChipProps {
  insight: ExtractedInsight;
  index: number;
}

function InsightChip({ insight, index }: InsightChipProps) {
  const categoryColors = {
    motivation: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    barrier: "from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400",
    preference: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    lifestyle: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    goal: "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${categoryColors[insight.category]} border backdrop-blur-sm`}
    >
      {insight.icon}
      <span className="text-xs font-medium capitalize">{insight.category}</span>
    </motion.div>
  );
}

interface ConversationProgressProps {
  messageCount: number;
  targetMessages: number;
  phase: string;
  insights: ExtractedInsight[];
}

function ConversationProgress({ messageCount, targetMessages, phase, insights }: ConversationProgressProps) {
  const progress = Math.min((messageCount / targetMessages) * 100, 100);
  const phaseLabels: Record<string, string> = {
    opening: "Getting started",
    exploration: "Understanding you",
    deepening: "Going deeper",
    closing: "Wrapping up",
  };

  const phaseIcons: Record<string, React.ReactNode> = {
    opening: <Lightbulb className="w-4 h-4" />,
    exploration: <Brain className="w-4 h-4" />,
    deepening: <Heart className="w-4 h-4" />,
    closing: <Star className="w-4 h-4" />,
  };

  return (
    <div className="px-6 py-4 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 border-b border-slate-800/50 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Phase indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phaseIcons[phase] || <Brain className="w-4 h-4 text-violet-400" />}
            </motion.div>
            <div>
              <p className="text-sm font-medium text-white">{phaseLabels[phase] || "In progress"}</p>
              <p className="text-xs text-slate-500">{messageCount} of {targetMessages} responses</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs">~{Math.max(10 - messageCount, 2)} min left</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          {/* Progress milestones */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[2px]">
            {[0, 33, 66, 100].map((milestone, i) => (
              <div
                key={milestone}
                className={`w-2 h-2 rounded-full transition-colors ${
                  progress >= milestone ? "bg-fuchsia-400" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Extracted insights */}
        {insights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {insights.map((insight, i) => (
              <InsightChip key={insight.id} insight={insight} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder?: string;
}

function ChatInput({ value, onChange, onSend, disabled, placeholder = "Share your thoughts..." }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  return (
    <div className="px-6 py-5 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent backdrop-blur-xl border-t border-slate-800/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className={`
            relative flex items-end gap-3 p-4 rounded-3xl border transition-all duration-300
            ${isFocused
              ? "bg-slate-800/80 border-violet-500/50 shadow-lg shadow-violet-500/10"
              : "bg-slate-800/50 border-slate-700/50"
            }
          `}
          animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        >
          {/* Attachment button */}
          <button
            className="flex-shrink-0 p-2 rounded-xl text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text input */}
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="
              flex-1 bg-transparent text-white placeholder-slate-500
              resize-none outline-none text-[15px] leading-relaxed
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[28px] max-h-[150px]
            "
          />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Emoji button */}
            <button
              className="flex-shrink-0 p-2 rounded-xl text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Voice/Send toggle */}
            {value.trim() ? (
              <motion.button
                onClick={onSend}
                disabled={disabled}
                className="
                  flex-shrink-0 p-3 rounded-2xl
                  bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500
                  text-white shadow-lg shadow-purple-500/30
                  hover:shadow-xl hover:shadow-purple-500/40
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowVoice(!showVoice)}
                className={`
                  flex-shrink-0 p-3 rounded-2xl transition-all duration-200
                  ${showVoice
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-700"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showVoice ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>
            )}
          </div>

          {/* Glow effect when focused */}
          {isFocused && (
            <motion.div
              className="absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 -z-10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>

        {/* Helper text */}
        <p className="mt-3 text-xs text-slate-600 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Enter</kbd> to send
          <span className="mx-2 text-slate-700">|</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}

function SwitchModeButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="
        group flex items-center gap-2 px-4 py-2.5 rounded-2xl
        bg-gradient-to-r from-slate-800/80 to-slate-800/60
        border border-slate-700/50 hover:border-cyan-500/30
        text-slate-400 hover:text-cyan-400
        transition-all duration-300 backdrop-blur-sm
      "
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-1 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
        <Zap className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">Switch to Quick Assessment</span>
    </motion.button>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function DeepAssessmentStep() {
  const {
    selectedGoal,
    prevStep,
    nextStep,
    goToStep,
    setAssessmentMode,
    addAssessmentResponse,
    completeAssessment,
  } = useOnboarding();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    phase: "opening",
    topicsExplored: [],
    insightsGathered: 0,
  });
  const [extractedInsights, setExtractedInsights] = useState<ExtractedInsight[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const TARGET_USER_MESSAGES = 6;

  const userMessageCount = useMemo(
    () => messages.filter((m) => m.sender === "user").length,
    [messages]
  );

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const addAIMessage = useCallback(
    async (text: string) => {
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, getTypingDelay()));

      const newMessage: Message = {
        id: generateMessageId(),
        sender: "ai",
        text,
        timestamp: new Date(),
        status: "read",
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    },
    [scrollToBottom]
  );

  // Initialize conversation only once
  useEffect(() => {
    if (hasInitialized) return;

    const initializeConversation = async () => {
      const openingMessage =
        GOAL_OPENING_MESSAGES[selectedGoal || "custom"] || GOAL_OPENING_MESSAGES.custom;

      await new Promise((resolve) => setTimeout(resolve, AI_RESPONSE_DELAY));
      await addAIMessage(openingMessage);
      setHasInitialized(true);
    };

    initializeConversation();
  }, [selectedGoal, addAIMessage, hasInitialized]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: generateMessageId(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Update status to "read" after a delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessage.id ? { ...m, status: "read" as const } : m))
      );
    }, 500);

    const newUserCount = userMessageCount + 1;
    let newPhase = conversationState.phase;

    if (newUserCount >= TARGET_USER_MESSAGES) {
      newPhase = "closing";
    } else if (newUserCount >= 4) {
      newPhase = "deepening";
    } else if (newUserCount >= 2) {
      newPhase = "exploration";
    }

    setConversationState((prev) => ({
      ...prev,
      phase: newPhase,
      topicsExplored: [...new Set([...prev.topicsExplored, ...detectKeywords(inputValue)])],
    }));

    setTimeout(scrollToBottom, 100);

    setTimeout(async () => {
      if (newUserCount >= TARGET_USER_MESSAGES + 1) {
        setConversationComplete(true);
        return;
      }

      const aiResponse = selectAIResponse(inputValue, { ...conversationState, phase: newPhase }, newUserCount);
      await addAIMessage(aiResponse);

      addAssessmentResponse({
        questionId: `deep_conversation_${newUserCount}`,
        value: inputValue.trim(),
      });

      if (newUserCount % 2 === 0) {
        const insights = extractInsights([...messages, userMessage]);
        setExtractedInsights(insights);
      }
    }, AI_RESPONSE_DELAY);
  }, [inputValue, isTyping, userMessageCount, conversationState, addAIMessage, scrollToBottom, addAssessmentResponse, messages]);

  const handleSwitchToQuick = useCallback(() => {
    setAssessmentMode("quick");
    goToStep(2);
  }, [setAssessmentMode, goToStep]);

  const handleCompleteAssessment = useCallback(() => {
    addAssessmentResponse({
      questionId: "deep_assessment_conversation",
      value: JSON.stringify({
        messages: messages.map((m) => ({
          sender: m.sender,
          text: m.text,
          timestamp: m.timestamp.toISOString(),
        })),
        insights: extractedInsights,
        conversationState,
      }),
    });

    completeAssessment();
    nextStep();
  }, [messages, extractedInsights, conversationState, addAssessmentResponse, completeAssessment, nextStep]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-h-[850px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="flex-shrink-0">
        {/* Navigation */}
        <div className="px-6 py-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/30">
          <motion.button
            onClick={prevStep}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          <SwitchModeButton onClick={handleSwitchToQuick} />
        </div>

        {/* Progress */}
        <ConversationProgress
          messageCount={userMessageCount}
          targetMessages={TARGET_USER_MESSAGES}
          phase={conversationState.phase}
          insights={extractedInsights}
        />

        {/* Title */}
        <div className="px-6 py-6 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-violet-400" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Deep Assessment
            </span>
          </motion.div>
          <motion.h2
            className="mt-4 text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Let&apos;s have a conversation
          </motion.h2>
          <motion.p
            className="mt-2 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Share your thoughts naturally - I&apos;m here to listen and understand
          </motion.p>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)",
        }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <ChatBubble key={message.id} message={message} isLatest={index === messages.length - 1} />
          ))}

          {isTyping && <AdvancedTypingIndicator key="typing" />}
        </AnimatePresence>

        <div ref={messagesEndRef} />

        {/* Completion state */}
        {conversationComplete && (
          <motion.div
            className="flex flex-col items-center gap-6 py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="relative w-24 h-24"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-xl opacity-50" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/40">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Assessment Complete!</h3>
              <p className="text-slate-400 max-w-md">
                Thank you for sharing. I have everything I need to create your personalized health plan.
              </p>
            </div>

            {/* Insights summary */}
            {extractedInsights.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {extractedInsights.map((insight, i) => (
                  <InsightChip key={insight.id} insight={insight} index={i} />
                ))}
              </div>
            )}

            <motion.button
              onClick={handleCompleteAssessment}
              className="
                group flex items-center gap-3 px-10 py-5 rounded-2xl
                bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500
                text-white font-semibold text-lg
                shadow-2xl shadow-purple-500/30
                hover:shadow-purple-500/50
                transition-all duration-300
              "
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Your Plan</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      {!conversationComplete && (
        <div className="flex-shrink-0">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder="Share your thoughts..."
          />
        </div>
      )}
    </div>
  );
}
