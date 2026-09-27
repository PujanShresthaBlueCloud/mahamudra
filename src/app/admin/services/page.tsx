import { Topbar } from "@/components/admin/Topbar";
import { ServicesTable } from "@/components/admin/ServicesTable";
import { prisma } from "@/lib/db";

export default async function AdminServicesPage() {
  const services = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });

  // Decimal fields from Prisma aren't directly serializable to a client
  // component prop — convert to string/number first.
  // const serialized = services.map((s) => ({ ...s, price: s.price.toString() }));
  const serialized = services.map((s) => ({ ...s }));

  return (
    <>
      <Topbar title="Programs" />
      <main className="flex-1 p-6">
        <ServicesTable initialServices={serialized} />
      </main>
    </>
  );
}
