import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/shared/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NextStream",
  description: "Your personal streaming catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
