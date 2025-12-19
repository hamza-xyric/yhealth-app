import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YHealth - Your Personal Health Companion",
    template: "%s | YHealth",
  },
  description:
    "Transform your health journey with personalized wellness plans, AI-powered insights, and comprehensive health tracking. Start your path to a healthier you today.",
  keywords: [
    "health",
    "wellness",
    "fitness",
    "nutrition",
    "mental health",
    "tracking",
    "AI health",
    "personalized health",
  ],
  authors: [{ name: "YHealth Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yhealth.app",
    title: "YHealth - Your Personal Health Companion",
    description:
      "Transform your health journey with personalized wellness plans and AI-powered insights.",
    siteName: "YHealth",
  },
  twitter: {
    card: "summary_large_image",
    title: "YHealth - Your Personal Health Companion",
    description:
      "Transform your health journey with personalized wellness plans and AI-powered insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
