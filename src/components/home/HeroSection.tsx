import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sunrise } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-content gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div>
          <p className="flex items-center gap-2 font-body text-sm font-medium text-pine">
            <Sunrise className="h-4 w-4" />
              Mahamudra, the union of all apparent dualities. 
          </p>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Mahamudra Retreat Center Nepal
          </h1>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
            Offering Course in Mahamudra Meditation as Taught By H.E Chogyal Rinpoche
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-saffron-dark"
            >
              Reserve your place
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about-us"
              className="font-body text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              Learn about our practice
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2">
            {/* <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
              alt="A meditation hall at dawn, prayer flags visible through an open doorway"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            /> */}
            <Image
              src="/images/banner.webp"
              alt="A meditation hall at dawn, prayer flags visible through an open doorway"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating detail card, echoing a retreat's essentials */}
          <div className="absolute -bottom-8 left-1/2 w-[85%] -translate-x-1/2 rounded-xl2 border border-line bg-white/95 p-5 shadow-sm backdrop-blur sm:left-6 sm:w-auto sm:translate-x-0">
            <p className="font-body text-xs font-medium text-pine">Next intake</p>
            <p className="mt-1 font-display text-lg text-ink">
              Foundations of Mahamudra
            </p>
            <p className="mt-1 font-body text-xs text-ink-soft">
              March 2, 2026 · 5 days · Himachal Pradesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
