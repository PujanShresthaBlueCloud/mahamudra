import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  programId: z.string().optional(),
  message: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  subject: z.string().min(3, "Add a short subject."),
  message: z.string().min(10, "Your message should be at least 10 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;


export const serviceCategoryEnum = z.enum(["RETREAT", "ONLINE_SESSION", "WORKSHOP", "ONE_ON_ONE"]);
export const bookingStatusEnum = z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]);

export const serviceCreateSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  summary: z.string().trim().min(10).max(200),
  description: z.string().trim().min(10).max(5000),
  level: serviceCategoryEnum,
  durationDays: z.number().int().positive().max(10080), // max one week, sanity bound
  // price: z.number().nonnegative().max(1_000_000),
  // capacity: z.number().int().positive().max(10000),
  imageUrl: z.string().url().optional().nullable(),
  isActive: z.boolean().optional(),
  startDate: z.coerce.date().optional().nullable(),
});

// Same as create, but every field optional (PATCH semantics).
export const serviceUpdateSchema = serviceCreateSchema.partial();

export const bookingUpdateSchema = z.object({
  status: bookingStatusEnum,
});

export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
