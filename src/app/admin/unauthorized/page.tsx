import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4 text-center">
      <ShieldAlert className="h-10 w-10 text-rose-600" strokeWidth={1.5} />
      <h1 className="text-2xl font-semibold text-stone-900">You do nothave access to this page</h1>
      <p className="max-w-sm text-sm text-stone-600">
        This area is restricted to Mahamudra admins. If you believe this is a
        mistake, contact the site owner to have your account upgraded.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
      >
        Return to the site
      </Link>
    </div>
  );
}
