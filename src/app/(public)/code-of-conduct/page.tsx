import { ShieldCheck, HeartHandshake, VolumeX, Ban } from "lucide-react";

export const metadata = {
  title: "Code of Conduct — Mahamudra",
};

const PRINCIPLES = [
  {
    icon: VolumeX,
    title: "Keep noble silence",
    body: "Unless a session is explicitly designated for talking, please keep silence in the halls, dining room, and grounds. This is the single most requested condition from returning students.",
  },
  {
    icon: HeartHandshake,
    title: "Respect every teacher and student",
    body: "Harassment, discrimination, or unwanted contact of any kind will end your participation immediately, without refund.",
  },
  {
    icon: ShieldCheck,
    title: "Follow safety guidance",
    body: "Some practices involve extended sitting or fasting periods. Let a teacher know about any health condition before the retreat begins, not during it.",
  },
  {
    icon: Ban,
    title: "No intoxicants on site",
    body: "Alcohol, recreational drugs, and smoking are not permitted anywhere on the retreat grounds for the full duration of your stay.",
  },
];

export default function CodeOfConductPage() {
  return (
    <main className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <h1 className="max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl">
        Code of conduct
      </h1>
      <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
        The Mahamudra program is **NOT** available online. You need to be physically present at the location for 10 days. The program runs from 15th to 25th of the active month. Once you join in, you must follow several codes of conduct during your stay as mentioned below.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {PRINCIPLES.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-xl2 border border-line bg-white p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine/10">
              <item.icon className="h-5 w-5 text-pine" />
            </span>
            <div>
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
        Teachers reserve the right to ask a student to leave a program, without
        refund, if these principles are broken in a way that affects other
        students&apos; practice.
      </p>
    </main>
  );
}
