import Link from "next/link";
import { HandCoins, GraduationCap, Hammer, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Support Us — Mahamudra",
};

const WAYS_TO_HELP = [
  {
    icon: HandCoins,
    title: "Make a donation",
    body: "Donations cover teacher stipends, hall maintenance, and keep in-person fees lower than they'd otherwise need to be.",
    cta: "Contact us about donating",
  },
  {
    icon: GraduationCap,
    title: "Sponsor a scholarship seat",
    body: "Each program sets aside a small number of seats for students who couldn't otherwise attend. Sponsor one, in full or in part.",
    cta: "Ask about sponsorship",
  },
  {
    icon: Hammer,
    title: "Volunteer at a retreat",
    body: "Retreats run on volunteer support in the kitchen, grounds, and logistics — in exchange for reduced or waived fees.",
    cta: "Apply to volunteer",
  },
];

export default function SupportUsPage() {
  return (
    <main className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <h1 className="max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl">
        Support the community
      </h1>
      <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
        Mahamudra runs as a non-profit community. Fees cover roughly
        two-thirds of what it costs to run each retreat — the rest comes from
        people who want to see this practice stay accessible.
      </p>

      <div className="mt-12 flex flex-col gap-6 lg:flex-row">
        {WAYS_TO_HELP.map((way) => (
          <div
            key={way.title}
            className="flex flex-1 flex-col rounded-xl2 border border-line bg-white p-7"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron/10">
              <way.icon className="h-5 w-5 text-saffron" />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">{way.title}</h3>
            <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
              {way.body}
            </p>
            <Link
              href="/contact-us"
              className="mt-5 flex items-center gap-1.5 font-body text-sm font-medium text-pine hover:text-pine-light"
            >
              {way.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
