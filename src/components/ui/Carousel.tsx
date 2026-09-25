"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode[];
  /** Roughly how many cards are visible at once on a large screen. */
  visibleOnDesktop?: 2 | 3 | 4;
  ariaLabel: string;
}

/// A dependency-free carousel: a flex row that scrolls horizontally,
/// with prev/next buttons and dot indicators. Built with plain flexbox +
/// CSS scroll-snap rather than a library, per the project's "use CSS flex
/// and Tailwind" requirement. Swap this for a 21st.dev carousel component
/// (see README) if you'd rather pull in one of their pre-built variants.
export default function Carousel({ children, visibleOnDesktop = 3, ariaLabel }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = children.length;

  const basisClass =
    visibleOnDesktop === 2
      ? "lg:basis-1/2"
      : visibleOnDesktop === 4
      ? "lg:basis-1/4"
      : "lg:basis-1/3";

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(count - 1, index));
    setActiveIndex(next);
    scrollToIndex(next);
  };

  // Keep the active dot in sync when the visitor swipes/scrolls manually.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const trackLeft = track.scrollLeft;
        let closest = 0;
        let closestDistance = Infinity;
        children.forEach((child, i) => {
          const distance = Math.abs(child.offsetLeft - track.offsetLeft - trackLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div role="region" aria-label={ariaLabel} className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={cn("shrink-0 basis-[85%] snap-start sm:basis-1/2", basisClass)}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === activeIndex ? "w-6 bg-saffron" : "w-2 bg-line"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-saffron hover:text-saffron disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === count - 1}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-saffron hover:text-saffron disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
