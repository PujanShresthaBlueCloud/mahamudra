import { CalendarCheck, Flower2, Mail, HeartHandshake } from "lucide-react";
import { Topbar } from "@/components/admin/Topbar";
import { StatCard } from "@/components/admin/StatCard";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  // Server components can query Prisma directly — no API round-trip
  // needed for read-only data used only within this page.
  const [serviceCount, pendingBookings, unreadMessages, contributionCount] = await Promise.all([
    prisma.program.count({ where: { isActive: true } }),
    prisma.registration.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contribution?.count(),
  ]);

  return (
    <>
      <Topbar title="Dashboard" />
      <main className="flex-1 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Published services" value={serviceCount} icon={Flower2} />
          <StatCard label="Pending bookings" value={pendingBookings} icon={CalendarCheck} hint="Needs review" />
          <StatCard label="Unread messages" value={unreadMessages} icon={Mail} />
          <StatCard label="Total contributions" value={contributionCount} icon={HeartHandshake} />
        </div>
      </main>
    </>
  );
}
