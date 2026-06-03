"use client";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { data: session } = useSession();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-base/95 backdrop-blur-md border-b border-border-subtle"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center gap-10">
        <Link href="/">
          <span className="text-brand font-bold text-xl tracking-widest">
            NEXTSTREAM
          </span>
        </Link>

        <NavLinks />
      </div>

      <div className="flex items-center gap-5">
        <button className="text-white hover:text-gray-300 transition-colors cursor-pointer">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative text-white hover:text-gray-300 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand rounded-full" />
        </button>

        {session && <UserMenu session={session} />}
      </div>
    </header>
  );
}
