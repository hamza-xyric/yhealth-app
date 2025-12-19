import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090/api";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.error?.message || "Invalid credentials");
          }

          return {
            id: data.data.user.id,
            email: data.data.user.email,
            name: data.data.user.firstName
              ? `${data.data.user.firstName} ${data.data.user.lastName || ""}`
              : data.data.user.email,
            image: data.data.user.avatarUrl,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            onboardingStatus: data.data.user.onboardingStatus,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google sign-in - register/login with backend
      if (account?.provider === "google" && profile?.email) {
        try {
          const response = await fetch(`${API_URL}/auth/social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              idToken: account.id_token,
              accessToken: account.access_token,
              email: profile.email,
              name: profile.name,
              picture: (profile as { picture?: string }).picture,
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            // Return error message for error page
            const errorMessage = data.error?.message || "Social authentication failed";
            return `/auth/signin?error=${encodeURIComponent(errorMessage)}`;
          }

          // Store backend tokens in user object for jwt callback
          (user as unknown as Record<string, unknown>).backendData = data.data;
          return true;
        } catch (error) {
          console.error("Social auth error:", error);
          return `/auth/signin?error=${encodeURIComponent("Failed to connect to authentication server")}`;
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger }) {
      // Debug logging
      if (process.env.NODE_ENV === "development") {
        console.log("[NextAuth JWT] Callback:", {
          trigger,
          hasUser: !!user,
          hasAccount: !!account,
          provider: account?.provider,
          userAccessToken: user?.accessToken ? "present" : "missing",
          tokenAccessToken: token.accessToken ? "present" : "missing",
        });
      }

      // Initial sign in - user object contains data from authorize callback
      if (user) {
        token.id = user.id;
        // For credentials provider, user.accessToken comes from authorize()
        if (user.accessToken) {
          token.accessToken = user.accessToken;
        }
        if (user.refreshToken) {
          token.refreshToken = user.refreshToken;
        }
        if (user.onboardingStatus) {
          token.onboardingStatus = user.onboardingStatus;
        }

        if (process.env.NODE_ENV === "development") {
          console.log("[NextAuth JWT] Set from user:", {
            accessToken: token.accessToken ? `${String(token.accessToken).substring(0, 20)}...` : "none",
          });
        }
      }

      // Handle Google sign-in - get tokens from backendData
      if (account?.provider === "google" && user) {
        const backendData = (user as unknown as Record<string, unknown>).backendData as {
          user: { id: string; onboardingStatus: string };
          accessToken: string;
          refreshToken: string;
        } | undefined;

        if (backendData) {
          token.id = backendData.user.id;
          token.accessToken = backendData.accessToken;
          token.refreshToken = backendData.refreshToken;
          token.onboardingStatus = backendData.user.onboardingStatus;

          if (process.env.NODE_ENV === "development") {
            console.log("[NextAuth JWT] Set from Google backendData:", {
              accessToken: token.accessToken ? `${String(token.accessToken).substring(0, 20)}...` : "none",
            });
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Debug logging
      if (process.env.NODE_ENV === "development") {
        console.log("[NextAuth Session] Callback:", {
          tokenAccessToken: token.accessToken ? "present" : "missing",
        });
      }

      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.onboardingStatus = token.onboardingStatus as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
