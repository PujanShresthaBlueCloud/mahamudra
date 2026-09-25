"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ServiceFormDialog } from "./ServiceFormDialog";

export type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  level: string;
  durationDays: number;
  // price: string | number;
  // capacity: number;
  isActive: boolean;
  _count?: { registrations: number };
};

const CATEGORY_LABEL: Record<string, string> = {
  RETREAT: "Retreat",
  ONLINE_SESSION: "Online session",
  WORKSHOP: "Workshop",
  ONE_ON_ONE: "One-on-one",
};

export function ServicesTable({ initialServices }: { initialServices: ServiceRow[] }) {
  const [services, setServices] = useState<ServiceRow[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(service: ServiceRow) {
    setEditing(service);
    setDialogOpen(true);
  }

  function handleSaved(saved: ServiceRow) {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === saved.id);
      return exists ? prev.map((s) => (s.id === saved.id ? { ...s, ...saved } : s)) : [saved, ...prev];
    });
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete.");
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{services.length} service(s)</p>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add service
        </Button>
      </div>

      {deleteError && <p className="text-sm text-rose-600">{deleteError}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium text-stone-900">{service.title}</TableCell>
              <TableCell>{CATEGORY_LABEL[service.category] ?? service.category}</TableCell>
              <TableCell>${Number(service.price).toFixed(2)}</TableCell>
              <TableCell>{service.capacity}</TableCell>
              <TableCell>{service._count?.bookings ?? 0}</TableCell>
              <TableCell>
                <Badge variant={service.isPublished ? "default" : "neutral"}>
                  {service.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(service)} aria-label={`Edit ${service.title}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(service.id)}
                    disabled={deletingId === service.id}
                    aria-label={`Delete ${service.title}`}
                    className="hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {services.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-stone-400">
                No services yet. Add your first one to see it here.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ServiceFormDialog open={dialogOpen} onOpenChange={setDialogOpen} service={editing} onSaved={handleSaved} />
    </div>
  );
}
