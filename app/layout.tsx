import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "sonner";
import SupabaseProvider from "@/components/SupabaseProvider"; 

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strathmore Environmental Club - Towards a Cleaner Community",
  description:
    "Join the Strathmore University Environmental Club in building a sustainable future for our campus community through environmental awareness, waste management, and collective action.",
  keywords:
    "Strathmore University, Environmental Club, Siwaka, Sustainability, Waste Management, Clean Campus, Environmental Awareness, Tree Planting, Recycling",
  authors: [{ name: "Strathmore Environmental Club" }],
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Strathmore Environmental Club ",
    description:
      "Building a sustainable future for our campus community through environmental action and education.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {/* Supabase wraps children */}
        <SupabaseProvider>
          {children}
          <Toaster position="top-center" />
        </SupabaseProvider>

        {/*Vercel Analytics and speed */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
