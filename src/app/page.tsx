import HeroSection from "@/components/home/HeroSection";
import ProgramsCarousel from "@/components/home/ProgramsCarousel";
import TeachersCarousel from "@/components/home/TeachersCarousel";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { getActivePrograms } from "@/server/services/program.service";
import { getTeachers, getTestimonials } from "@/server/services/content.service";
import type { ProgramCardData, TeacherCardData, TestimonialCardData } from "@/types";

// Revalidate this page's data every hour rather than on every request —
// program/teacher/testimonial content doesn't change minute to minute.
export const revalidate = 3600;
const FALLBACK_IMAGE = "/images/logo.png";


export default async function HomePage() {
  const [programs, teachers, testimonials] = await Promise.all([
    getActivePrograms(),
    getTeachers(),
    getTestimonials(),
  ]);

  const programCards: ProgramCardData[] = programs.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    imageUrl: p.imageUrl ?? FALLBACK_IMAGE,
    location: p.location,
    durationDays: p.durationDays,
    level: p.level,
  }));

  const teacherCards: TeacherCardData[] = teachers.map((t) => ({
    id: t.id,
    name: t.name,
    title: t.title,
    bio: t.bio,
    imageUrl: t.imageUrl,
  }));

  const testimonialCards: TestimonialCardData[] = testimonials.map((t) => ({
    id: t.id,
    quote: t.quote,
    author: t.author,
    role: t.role,
    rating: t.rating,
  }));

  return (
    <main>
      <HeroSection />
      <ProgramsCarousel programs={programCards} />
      <TeachersCarousel teachers={teacherCards} />
      <TestimonialsCarousel testimonials={testimonialCards} />
    </main>
  );
}
