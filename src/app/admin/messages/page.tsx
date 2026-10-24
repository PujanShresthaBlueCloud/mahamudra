import { Topbar } from "@/components/admin/Topbar";
import { MessagesTable } from "@/components/admin/MessagesTable";
import { prisma } from "@/lib/db";

export default async function AdminServicesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    // include: { _count: { select: { registrations: true } } },
  });

  // Decimal fields from Prisma aren't directly serializable to a client
  // component prop — convert to string/number first.
  // const serialized = services.map((s) => ({ ...s, price: s.price.toString() }));
  const serialized = messages.map((s) => ({ ...s }));

  return (
    <>
      <Topbar title="Messages" />
      <main className="flex-1 p-6">
        <MessagesTable initialMessages={serialized} />
      </main>
    </>
  );
}
