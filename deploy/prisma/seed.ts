import { PrismaClient, ProgramLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.program.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Foundations of Mahamudra",
        slug: "foundations-of-mahamudra",
        summary: "A five-day introduction to resting the mind in its natural state.",
        description:
          "This retreat introduces the core Mahamudra practices of shamatha and pointing-out instruction, suited to students with no prior meditation background.",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
        location: "Mountain Retreat Centre, Himachal Pradesh",
        durationDays: 5,
        level: ProgramLevel.BEGINNER,
        startDate: new Date("2026-03-02"),
      },
      {
        title: "Silent Practice Intensive",
        slug: "silent-practice-intensive",
        summary: "Ten days of noble silence, structured sitting, and daily guidance.",
        description:
          "A demanding, quiet retreat for students who already hold a daily practice and want to deepen it under close guidance.",
        imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
        location: "Forest Hermitage, Uttarakhand",
        durationDays: 10,
        level: ProgramLevel.INTERMEDIATE,
        startDate: new Date("2026-04-10"),
      },
      {
        title: "Teacher Training Path",
        slug: "teacher-training-path",
        summary: "A year-long path preparing senior students to guide others.",
        description:
          "Combines residential intensives with ongoing mentorship for students preparing to hold space for group practice.",
        imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
        location: "Mountain Retreat Centre, Himachal Pradesh",
        durationDays: 14,
        level: ProgramLevel.ADVANCED,
        startDate: new Date("2026-06-01"),
      },
      {
        title: "Weekend Grounding",
        slug: "weekend-grounding",
        summary: "A two-day reset for people balancing practice with working life.",
        description:
          "Short enough to fit around a working week, this weekend covers posture, breath, and short-form sitting practice.",
        imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=80",
        location: "City Sangha House, Delhi",
        durationDays: 2,
        level: ProgramLevel.ALL_LEVELS,
        startDate: new Date("2026-02-14"),
      },
    ],
  });

  await prisma.teacher.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Lama Tenzin Norbu",
        title: "Resident Teacher",
        bio: "Lama Tenzin has guided Mahamudra retreats for over twenty years, trained in the Kagyu lineage.",
        imageUrl: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&q=80",
        order: 1,
      },
      {
        name: "Ani Dolkar",
        title: "Senior Instructor",
        bio: "Ani Dolkar leads the Teacher Training Path and specializes in working with new students.",
        imageUrl: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=800&q=80",
        order: 2,
      },
      {
        name: "Dr. Arjun Mehta",
        title: "Meditation & Wellbeing Guide",
        bio: "Arjun bridges contemplative practice with modern mental health research, leading the Weekend Grounding sessions.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
        order: 3,
      },
    ],
  });

  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        quote:
          "I came in skeptical and left with a daily practice I've now kept for two years.",
        author: "Priya S.",
        role: "Foundations of Mahamudra, 2024",
        rating: 5,
        order: 1,
      },
      {
        quote:
          "The silence intensive was the hardest and most worthwhile ten days I've spent anywhere.",
        author: "Marcus L.",
        role: "Silent Practice Intensive, 2025",
        rating: 5,
        order: 2,
      },
      {
        quote: "Small groups, real attention from the teachers, no pretense.",
        author: "Fatima R.",
        role: "Weekend Grounding, 2025",
        rating: 5,
        order: 3,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
