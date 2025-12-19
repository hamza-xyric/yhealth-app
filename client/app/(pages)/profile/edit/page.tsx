"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Save,
  Loader2,
  CheckCircle,
  Sparkles,
  Shield,
  Camera,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AvatarUploader } from "@/components/common/avatar-uploader";
import { useAuth } from "@/app/context/AuthContext";
import { api, ApiError } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Form validation schema with phone validation
const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || isValidPhoneNumber(val),
      "Please enter a valid phone number"
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function EditProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Skeleton className="h-[700px] w-full rounded-3xl" />
      </div>
    </div>
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

// Custom Phone Input Component with styling
function StyledPhoneInput({
  value,
  onChange,
  error,
}: {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-xl transition-all duration-200",
        "bg-muted/50 hover:bg-muted/70 focus-within:bg-muted/70",
        "ring-2 ring-transparent focus-within:ring-primary/50",
        error && "ring-destructive/50"
      )}
    >
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="US"
        value={value}
        onChange={onChange}
        className="flex-1 phone-input-custom"
      />
    </div>
  );
}

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoading, getInitials, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const isHydrated = useHydrated();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  // Update form when user data is available
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: "",
      });
    }
  }, [user, form]);

  const handleAvatarUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use API client's upload method which handles auth token automatically
      const response = await api.upload<{ publicUrl?: string; url?: string }>(
        "/upload/avatar",
        formData
      );

      const avatarUrl = response.data?.publicUrl || response.data?.url;

      if (avatarUrl) {
        await api.patch("/auth/profile", { avatar: avatarUrl });
        updateUser({ avatarUrl });
        toast.success("Avatar updated successfully");
      }

      return avatarUrl || "";
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to upload avatar";
      toast.error(message);
      throw new Error(message);
    }
  };

  const handleAvatarRemove = async (): Promise<void> => {
    try {
      await api.patch("/auth/profile", { avatar: null });
      updateUser({ avatarUrl: null });
      toast.success("Avatar removed");
    } catch {
      toast.error("Failed to remove avatar");
      throw new Error("Failed to remove avatar");
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);

    try {
      const updateData: Record<string, string | undefined> = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      if (data.phone) {
        updateData.phone = data.phone;
      }

      await api.patch("/auth/profile", updateData);

      updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated || isLoading) {
    return <EditProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Please sign in to edit your profile.</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completionItems = [
    { label: "Profile Photo", done: !!user.avatarUrl },
    { label: "Full Name", done: !!(user.firstName && user.lastName) },
    { label: "Email Verified", done: user.isEmailVerified },
  ];
  const completionPercentage = Math.round(
    (completionItems.filter((i) => i.done).length / completionItems.length) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-3xl">
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
              asChild
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Link href="/profile">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Edit Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Customize your personal information
              </p>
            </div>
          </div>

          {/* Profile Completion Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted/30"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(completionPercentage / 100) * 75.4} 75.4`}
                  className="text-primary"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                {completionPercentage}%
              </span>
            </div>
            <span className="text-xs font-medium text-primary">Complete</span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Avatar Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-36 md:h-44">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500" />
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Floating Shapes */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-8 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 right-24 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                />

                {/* Avatar */}
                <div className="absolute -bottom-16 left-8 md:left-12">
                  <div className="relative">
                    <AvatarUploader
                      currentAvatar={user.avatarUrl}
                      fallback={getInitials()}
                      onUpload={handleAvatarUpload}
                      onRemove={handleAvatarRemove}
                      size="xl"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* User Info Preview */}
              <CardContent className="pt-20 pb-6 px-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      {user.email}
                      {user.isEmailVerified && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px] px-1.5 py-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Personal Information</h3>
                          <p className="text-xs text-muted-foreground">
                            Your basic profile details
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Input
                                    placeholder="John"
                                    className={cn(
                                      "h-12 pl-4 pr-10 rounded-xl border-0 bg-muted/50",
                                      "transition-all duration-200",
                                      "hover:bg-muted/70 focus:bg-muted/70",
                                      "focus-visible:ring-2 focus-visible:ring-primary/50",
                                      activeField === "firstName" && "ring-2 ring-primary/50"
                                    )}
                                    {...field}
                                    onFocus={() => setActiveField("firstName")}
                                    onBlur={(e) => {
                                      field.onBlur();
                                      setActiveField(null);
                                    }}
                                  />
                                  <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Input
                                    placeholder="Doe"
                                    className={cn(
                                      "h-12 pl-4 pr-10 rounded-xl border-0 bg-muted/50",
                                      "transition-all duration-200",
                                      "hover:bg-muted/70 focus:bg-muted/70",
                                      "focus-visible:ring-2 focus-visible:ring-primary/50",
                                      activeField === "lastName" && "ring-2 ring-primary/50"
                                    )}
                                    {...field}
                                    onFocus={() => setActiveField("lastName")}
                                    onBlur={(e) => {
                                      field.onBlur();
                                      setActiveField(null);
                                    }}
                                  />
                                  <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Contact Information</h3>
                          <p className="text-xs text-muted-foreground">
                            How we can reach you
                          </p>
                        </div>
                      </div>

                      {/* Email (Read-only) */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <div className="h-12 px-4 rounded-xl bg-muted/30 border border-dashed border-muted-foreground/20 flex items-center justify-between">
                            <span className="text-muted-foreground">{user.email}</span>
                            <div className="flex items-center gap-2">
                              {user.isEmailVerified && (
                                <span className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                  <CheckCircle className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                              <Shield className="w-4 h-4 text-muted-foreground/50" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Email is linked to your account and cannot be changed
                          </p>
                        </div>
                      </div>

                      {/* Phone with Country Code */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                              <Phone className="w-4 h-4 text-primary" />
                              Phone Number
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                                Optional
                              </Badge>
                            </FormLabel>
                            <FormControl>
                              <StyledPhoneInput
                                value={field.value}
                                onChange={field.onChange}
                                error={!!form.formState.errors.phone}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Used for WhatsApp coaching notifications and account recovery
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Tips Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border border-primary/10 p-5"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <div className="relative flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            Complete Your Profile
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            A complete profile helps your AI health coach provide
                            personalized recommendations tailored to your unique journey.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {completionItems.map((item, index) => (
                              <span
                                key={index}
                                className={cn(
                                  "flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full",
                                  item.done
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-muted/50 text-muted-foreground"
                                )}
                              >
                                {item.done ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                                {item.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex-1 h-12 rounded-xl border-muted-foreground/20 hover:bg-muted/50"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !form.formState.isDirty}
                        className={cn(
                          "flex-1 h-12 rounded-xl",
                          "bg-gradient-to-r from-primary via-purple-500 to-pink-500",
                          "hover:opacity-90 transition-opacity",
                          "shadow-lg shadow-primary/25"
                        )}
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="save"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Account Settings
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              href="/settings/privacy"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Privacy Settings
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom styles for phone input */}
      <style jsx global>{`
        .phone-input-custom {
          width: 100%;
        }
        .phone-input-custom .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          width: 100%;
          height: 3rem;
        }
        .phone-input-custom .PhoneInputInput::placeholder {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }
        .phone-input-custom .PhoneInputCountry {
          padding-left: 1rem;
          margin-right: 0;
        }
        .phone-input-custom .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1.125rem;
          border-radius: 0.25rem;
          overflow: hidden;
        }
        .phone-input-custom .PhoneInputCountrySelectArrow {
          margin-left: 0.5rem;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
