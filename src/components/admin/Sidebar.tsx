"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Mail,
  HeartHandshake,
  Flower2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Flower2 },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/contributions", label: "Contributions", icon: HeartHandshake },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-stone-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white">
          <Flower2 className="h-4 w-4" />
        </div>
        <span className="font-semibold text-stone-900">Mahamudra Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-emerald-50 text-emerald-800" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
