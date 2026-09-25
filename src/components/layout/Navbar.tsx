"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Flower2, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/registration", label: "Registration" },
  { href: "/code-of-conduct", label: "Code of Conduct" },
  { href: "/support-us", label: "Support Us" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-stone/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10"
      >
        <Link href="/" className="flex items-center gap-2 text-ink">
          <Image src="/images/logo.png" alt="Mahamudra Logo" width={324} height={324} />
          {/* <Flower2 className="h-6 w-6 text-saffron" strokeWidth={1.5} /> */}
          {/* <span className="font-display text-xl font-medium tracking-tight">Mahamudra</span> */}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/registration"
          className="hidden items-center gap-2 rounded-full bg-saffron px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-saffron-dark lg:inline-flex"
        >
          <CalendarHeart className="h-4 w-4" />
          Book a retreat
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-stone lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-body text-sm text-ink-soft"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/registration"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-2.5 font-body text-sm font-medium text-white"
              >
                <CalendarHeart className="h-4 w-4" />
                Book a retreat
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
