"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

// export type BookingRow = {
//   id: string;
//   fullName: string;
//   email: string;
//   // participants: number;
//   phone: string | null;
//   message: string | null;
//   status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
//   createdAt: string;
//   program: { title: string } | null ;
// };
export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

// const STATUS_VARIANT: Record<BookingRow["status"], "default" | "warning" | "danger" | "neutral"> = {
//   PENDING: "warning",
//   CONFIRMED: "default",
//   CANCELLED: "danger",
//   COMPLETED: "neutral",
// };

export function MessagesTable({ initialMessages }: { initialMessages: MessageRow[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, isRead: MessageRow["isRead"]) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => prev.map((b) => (b.id === id ? { ...b, isRead } : b)));
    } catch {
      // In production, surface this with a toast component.
      alert("Failed to update message status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Read</TableHead>
          <TableHead className="text-right">Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((b) => (
          <TableRow key={b.id}>
            <TableCell>
              <p className="font-medium text-stone-900">{b.fullName}</p>
              <p className="text-xs text-stone-500">{b.email}</p>
            </TableCell>
            <TableCell>{b.name}</TableCell>
            <TableCell>{b.email}</TableCell>
            <TableCell>
              {/* <Badge variant={STATUS_VARIANT[b.isRead]}>{b.isRead ? "Read" : ""}</Badge> */}
            </TableCell>
            <TableCell className="text-right">
              <select
                value={b.isRead ? "READ" : "UNREAD"}
                disabled={updatingId === b.id}
                onChange={(e) => updateStatus(b.id, e.target.value as MessageRow["isRead"])}
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
        {messages.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-stone-400">
              No messages yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
