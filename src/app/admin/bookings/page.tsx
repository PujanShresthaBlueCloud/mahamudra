import { Topbar } from "@/components/admin/Topbar";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { prisma } from "@/lib/db";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { title: true } } },
  });

  const serialized = bookings.map((b) => ({ ...b, createdAt: b.createdAt.toISOString() }));

  return (
    <>
      <Topbar title="Bookings" />
      <main className="flex-1 p-6">
        <BookingsTable initialBookings={serialized} />
      </main>
    </>
  );
}
