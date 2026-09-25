import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{label}</CardTitle>
        <Icon className="h-4 w-4 text-emerald-700" strokeWidth={1.75} />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-stone-900">{value}</p>
        {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
      </CardContent>
    </Card>
  );
}
