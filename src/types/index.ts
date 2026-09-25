export interface ProgramCardData {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  location: string;
  durationDays: number;
  level: string;
}

export interface TeacherCardData {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface TestimonialCardData {
  id: string;
  quote: string;
  author: string;
  role?: string | null;
  rating: number;
}
