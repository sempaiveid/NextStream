"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "TV Shows", href: "/tv-shows" },
  { label: "Movies", href: "/movies" },
  { label: "My List", href: "/my-list" },
  { label: "Browse by Languages", href: "/browse" },
];

export function NavLinks() {
  const pathname = usePathname();

  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm transition-colors hover:text-white ${
            pathnameWithoutLocale === link.href
              ? "text-white font-semibold"
              : "text-gray-300"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}