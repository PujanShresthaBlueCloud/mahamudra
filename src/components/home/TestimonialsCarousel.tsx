"use client";

import { Star, Quote } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TestimonialCardData } from "@/types";

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: TestimonialCardData[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading eyebrow="From our students" title="What people carry home" align="center" />

      <div className="mt-10">
        <Carousel ariaLabel="Student testimonials" visibleOnDesktop={2}>
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-xl2 border border-line bg-white p-7"
            >
              <Quote className="h-6 w-6 text-saffron" strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-medium text-ink">{t.author}</p>
                  {t.role && <p className="font-body text-xs text-ink-soft">{t.role}</p>}
                </div>
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-saffron text-saffron" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
