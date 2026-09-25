"use client";

import Image from "next/image";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TeacherCardData } from "@/types";

export default function TeachersCarousel({ teachers }: { teachers: TeacherCardData[] }) {
  if (teachers.length === 0) return null;

  return (
    <section className="border-y border-line bg-stone-dim/60">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow="Guidance"
          title="The teachers who hold the room"
          description="Each retreat is led by a teacher trained directly in the lineage, supported by senior students."
          align="center"
        />

        <div className="mt-10">
          <Carousel ariaLabel="Teachers" visibleOnDesktop={3}>
            {teachers.map((teacher) => (
              <article key={teacher.id} className="flex h-full flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border border-line">
                  <Image
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg text-ink">{teacher.name}</h3>
                <p className="mt-1 font-body text-xs font-medium text-saffron">
                  {teacher.title}
                </p>
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-ink-soft">
                  {teacher.bio}
                </p>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
