"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock3, ArrowUpRight } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProgramCardData } from "@/types";

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL_LEVELS: "All levels",
};

export default function ProgramsCarousel({ programs }: { programs: ProgramCardData[] }) {
  if (programs.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Upcoming programs"
          title="Retreats worth planning around"
          description="Each program runs in small groups with daily one-to-one guidance."
        />
        <Link
          href="/registration"
          className="flex shrink-0 items-center gap-1.5 font-body text-sm font-medium text-pine hover:text-pine-light"
        >
          View all & register
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10">
        <Carousel ariaLabel="Upcoming programs" visibleOnDesktop={3}>
          {programs.map((program) => (
            <article
              key={program.id}
              className="flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={program.imageUrl}
                  alt={program.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 85vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-body text-xs font-medium text-ink">
                  {LEVEL_LABEL[program.level] ?? program.level}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg text-ink">{program.title}</h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                  {program.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-body text-xs text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-pine" />
                    {program.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-pine" />
                    {program.durationDays} days
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
