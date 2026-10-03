export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin, UnauthorizedError, ForbiddenError } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // This is the authoritative check. Middleware (middleware.ts) already
  // filters most unauthorized traffic before it gets here, but a server
  // component/layout should never assume middleware ran correctly for
  // every possible request path — checking again here costs one
  // (cheap, often cached-by-claim) auth lookup and closes that gap.
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/sign-in");
    if (err instanceof ForbiddenError) redirect("/admin/unauthorized");
    throw err;
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
