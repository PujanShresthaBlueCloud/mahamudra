import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white/80 px-6 backdrop-blur">
      <h1 className="text-lg font-semibold text-stone-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>
        {/* Clerk handles sign-out, account settings, and session switching. */}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}
