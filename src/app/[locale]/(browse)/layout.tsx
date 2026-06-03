import { SessionProvider } from "next-auth/react";

import { Navbar } from "@/widgets/navbar";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-bg-base">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
