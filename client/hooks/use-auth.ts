"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import { api, ApiError } from "@/lib/api-client";
import toast from "react-hot-toast";

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

interface VerifyRegistrationData {
  activationToken: string;
  activationCode: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

interface VerifyEmailData {
  token: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (data: RegisterData): Promise<{ success: boolean; activationToken?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<{ activationToken: string; message: string }>("/auth/register", data);

        if (response.success && response.data?.activationToken) {
          toast.success("Verification code sent to your email!");
          return { success: true, activationToken: response.data.activationToken };
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Registration failed. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return { success: false };
    },
    []
  );

  const verifyRegistration = useCallback(
    async (data: VerifyRegistrationData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<{
          user: { email: string };
          accessToken: string;
          refreshToken: string;
        }>("/auth/verify-registration", data);

        if (response.success && response.data) {
          // Set the token immediately after registration
          if (response.data.accessToken) {
            api.setAccessToken(response.data.accessToken);
          }

          // Sign in with NextAuth to create session
          const signInResult = await signIn("credentials", {
            email: response.data.user.email,
            // Use a special marker that the backend can recognize
            redirect: false,
          });

          toast.success("Account created successfully! Welcome to yHealth!");
          router.push("/dashboard");
          return true;
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Verification failed. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return false;
    },
    [router]
  );

  const login = useCallback(
    async (data: LoginData) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
          // Force session refresh to ensure token is available
          const session = await getSession();
          if (session?.accessToken) {
            api.setAccessToken(session.accessToken);
          }

          toast.success("Welcome back!");
          router.push("/dashboard");
          return true;
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Invalid credentials";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return false;
    },
    [router]
  );

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      const message = "Google sign in failed. Please try again.";
      setError(message);
      toast.error(message);
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Signed out successfully");
    } catch (err) {
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/forgot-password", data);

      if (response.success) {
        toast.success("Password reset email sent! Check your inbox.");
        return true;
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to send reset email. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }

    return false;
  }, []);

  const resetPassword = useCallback(
    async (data: ResetPasswordData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post("/auth/reset-password", data);

        if (response.success) {
          toast.success("Password reset successfully! Please sign in.");
          router.push("/auth/signin");
          return true;
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Failed to reset password. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return false;
    },
    [router]
  );

  const verifyEmail = useCallback(
    async (data: VerifyEmailData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post("/auth/verify-email", data);

        if (response.success) {
          toast.success("Email verified! You can now sign in.");
          router.push("/auth/signin");
          return true;
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Verification failed. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return false;
    },
    [router]
  );

  const resendVerification = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/resend-verification", { email });

      if (response.success) {
        toast.success("Verification email sent!");
        return true;
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to resend email. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }

    return false;
  }, []);

  const resendRegistrationOTP = useCallback(
    async (activationToken: string): Promise<{ success: boolean; activationToken?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<{ activationToken: string; message: string }>(
          "/auth/resend-registration-otp",
          { activationToken }
        );

        if (response.success && response.data?.activationToken) {
          toast.success("New verification code sent to your email!");
          return { success: true, activationToken: response.data.activationToken };
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Failed to resend code. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }

      return { success: false };
    },
    []
  );

  return {
    isLoading,
    error,
    register,
    verifyRegistration,
    resendRegistrationOTP,
    login,
    loginWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
  };
}
