"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export type BookingRow = {
  id: string;
  fullName: string;
  email: string;
  // participants: number;
  phone: string | null;
  message: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  program: { title: string } | null;
};

const STATUS_VARIANT: Record<BookingRow["status"], "default" | "warning" | "danger" | "neutral"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  CANCELLED: "danger",
  COMPLETED: "neutral",
};

export function BookingsTable({ initialBookings }: { initialBookings: BookingRow[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: BookingRow["status"]) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch {
      // In production, surface this with a toast component.
      alert("Failed to update booking status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Program</TableHead>
          {/* <TableHead>Participants</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((b) => (
          <TableRow key={b.id}>
            <TableCell>
              <p className="font-medium text-stone-900">{b.fullName}</p>
              <p className="text-xs text-stone-500">{b.email}</p>
            </TableCell>
            <TableCell>{b.program.title}</TableCell>
            {/* <TableCell>{b.participants}</TableCell> */}
            <TableCell>
              <Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <select
                value={b.status}
                disabled={updatingId === b.id}
                onChange={(e) => updateStatus(b.id, e.target.value as BookingRow["status"])}
                className="rounded-lg border border-stone-300 px-2 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </TableCell>
          </TableRow>
        ))}
        {bookings.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-stone-400">
              No bookings yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
