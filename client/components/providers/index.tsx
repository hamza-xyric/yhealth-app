"use client";

import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "./session-provider";
import { AuthProvider } from "@/app/context/AuthContext";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              padding: "12px 16px",
              boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
            },
            success: {
              iconTheme: {
                primary: "hsl(var(--primary))",
                secondary: "white",
              },
              style: {
                borderLeft: "4px solid hsl(var(--primary))",
              },
            },
            error: {
              iconTheme: {
                primary: "hsl(var(--destructive))",
                secondary: "white",
              },
              style: {
                borderLeft: "4px solid hsl(var(--destructive))",
              },
            },
          }}
        />
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
