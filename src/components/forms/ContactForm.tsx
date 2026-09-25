"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        subject: fieldErrors.subject?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl2 border border-line bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-pine" />
        <h3 className="mt-4 font-display text-2xl text-ink">Message sent.</h3>
        <p className="mt-2 max-w-sm font-body text-sm text-ink-soft">
          Thank you for reaching out. We read every message and will reply
          within two to three days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl2 border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder="Jordan Lee"
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="jordan@example.com"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Subject" htmlFor="subject" error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            className={inputClass(!!errors.subject)}
            placeholder="Question about the March retreat"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={inputClass(!!errors.message)}
            placeholder="How can we help?"
          />
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-saffron-dark disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="mt-4 font-body text-xs text-red-700">
          {serverError}
        </p>
      )}
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-stone px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink-soft/50",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
    hasError ? "border-red-700" : "border-line"
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-body text-xs font-medium text-ink-soft">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 font-body text-xs text-red-700">{error}</p>}
    </div>
  );
}
