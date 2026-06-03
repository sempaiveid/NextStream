"use client";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface UserMenuProps {
  session: Session;
}

export function UserMenu({ session }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitial =
    session.user?.name?.[0] ?? session.user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="avatar"
            className="w-8 h-8 rounded"
          />
        ) : (
          <div className="w-8 h-8 rounded bg-brand flex items-center justify-center">
            <span className="text-white text-sm font-bold">{userInitial}</span>
          </div>
        )}
        <ChevronDown
          className={`w-4 h-4 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-black/95 border border-white/10 rounded-md py-2 z-50">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-white text-sm font-medium truncate">
              {session.user?.name ?? session.user?.email}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {session.user?.email}
            </p>
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <User className="w-4 h-4" />
            Profile
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <div className="border-t border-white/10 mt-2 pt-2">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
