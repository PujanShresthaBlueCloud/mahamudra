"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceRow } from "./ServicesTable";

const CATEGORIES = [
  { value: "RETREAT", label: "Retreat" },
  { value: "ONLINE_SESSION", label: "Online session" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "ONE_ON_ONE", label: "One-on-one" },
];

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceRow | null; // null = creating a new service
  onSaved: (service: ServiceRow) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title") || ""),
      slug: String(form.get("slug") || ""),
      summary: String(form.get("summary") || ""),
      description: String(form.get("description") || ""),
      level: String(form.get("level") || ""),
      // imageUrl: String(form.get("image") || ""),
      imageUrl: String(form.get("image") || ""),
      durationDays: Number(form.get("durationDays") || 0),
      // price: Number(form.get("price") || 0),
      // capacity: Number(form.get("capacity") || 0),
      isActive: form.get("isActive") === "on",
    };

    try {
      const url = service ? `/api/admin/services/${service.id}` : "/api/admin/services";
      console.log(payload.imageUrl, "payload");
      console.log(url, "url -------");
      const method = service ? "PATCH" : "POST";
      console.log(method, "method -------");
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service.");

      onSaved(data.service);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service ? "Edit service" : "Add a new service"}</DialogTitle>
          <DialogDescription>
            {service ? "Update the details shown on the public site." : "This will appear on the registration page once published."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={service?.title} required minLength={3} className="mt-1.5" />
            </div>

            <div className="col-span-2">
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={service?.slug}
                required
                pattern="[a-z0-9-]+"
                placeholder="morning-mindfulness-retreat"
                className="mt-1.5"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" name="summary" defaultValue={service?.summary} required minLength={10} className="mt-1.5" />
            </div>            

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={service?.description} required minLength={10} className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="level">Level</Label>
              <select
                id="level"
                name="level"
                defaultValue={service?.level ?? "RETREAT"}
                className="mt-1.5 flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="durationDays">Duration (days)</Label>
              <Input id="durationDays" name="durationDays" type="number" min={1} defaultValue={service?.durationDays ?? 1} required className="mt-1.5" />
            </div>
            {/* <div>
              <Label htmlFor="image">Upload image</Label>
              <Input id="image" name="image" type="file" accept="image/*" className="mt-1.5" />
            </div> */}
            {/* <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" name="price" type="number" min={0} step="0.01" defaultValue={service?.price ?? 0} required className="mt-1.5" />
            </div> */}

            {/* <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" name="capacity" type="number" min={1} defaultValue={service?.capacity ?? 20} required className="mt-1.5" />
            </div> */}

            <div className="col-span-2 flex items-center gap-2 pt-1">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                defaultChecked={service?.isActive ?? true}
                className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600"
              />
              <Label htmlFor="isActive" className="!m-0">
                Active (visible on the public site)
              </Label>
            </div>
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : service ? "Save changes" : "Create service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
