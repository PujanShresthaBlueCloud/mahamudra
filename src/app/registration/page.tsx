import { CalendarHeart } from "lucide-react";
import RegistrationForm from "@/components/forms/RegistrationForm";
import { getActivePrograms } from "@/server/services/program.service";
import type { ProgramCardData } from "@/types";

export const metadata = {
  title: "Registration — Mahamudra",
};

export default async function RegistrationPage() {
  const programs = await getActivePrograms();
  const programCards: ProgramCardData[] = programs.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    imageUrl: p.imageUrl,
    location: p.location,
    durationDays: p.durationDays,
    level: p.level,
  }));

  return (
    <main className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron/10">
          <CalendarHeart className="h-5 w-5 text-saffron" />
        </span>
        <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
          Register for a retreat
        </h1>
        <p className="max-w-lg font-body text-base leading-relaxed text-ink-soft">
          Fill in your details below and choose a program if you already know
          which one you'd like to join. We'll follow up by email within two
          business days with payment and preparation instructions.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <RegistrationForm programs={programCards} />
      </div>
    </main>
  );
}
