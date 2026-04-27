import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logan Stewart | Software Engineer & Engineering Leader",
  description: "Dual-persona resume showcasing expertise in software engineering and engineering leadership.",
  keywords: ["resume", "software engineer", "engineering leader", "developer", "leadership"],
};

function PersonaProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PersonaProvider>{children}</PersonaProvider>
    </Suspense>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}>
        <PersonaProviderWrapper>
          {children}
        </PersonaProviderWrapper>
      </body>
    </html>
  );
}