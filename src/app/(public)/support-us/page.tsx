import Link from "next/link";
import { HandCoins, GraduationCap, HandHeart, Hammer, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Support Us — Mahamudra",
};

const WAYS_TO_HELP = [
  {
    icon: HandHeart,
    title: "Who can make a donation",
    body: "According to the tradition of pure Mahamudra, courses are run solely on a donation basis. Donations are accepted only from those who have completed at least one ten-day course with H.E Chogyal Rinpoche or one of his assisting teachers. Someone taking the course for the first time may give a donation on the last day of the course or any time thereafter.\nIn this way courses are supported by those who have realized for themselves the benefits of the practice. Wishing to share these benefits with others, one gives a donation according to one’s means and volition. Such donations are the only source of funding for course in this tradition around the world. There is no wealthy foundation or individual sponsoring them. Neither the teachers nor the organizers receive any kind of payment for their service. Thus, the spread of Mahamudra is carried out with purity of purpose, free from any commercialism.Whether a donation is large or small, it should be given with the wish to help others: The course I have taken has been paid for through the generosity of past students; now let me give something towards the cost of a future course, so that others may also benefit by this technique.",
    cta: "Contact us about donating",
  },
  {
    icon: HandCoins,
    title: "Where to donate?",
    body: (
             <>
              If you are an old student, you can donate us online with the bank details mentioned below. 
              <br />Bank Detail: Siddhartha Bank Chabahil Branch, Kathmandu, Nepal 
              <br />Account number: 55500316650
              <br /> Account Name: REPA RETREAT CENTER" 
             </>
    ),
    cta: "Ask about sponsorship",
  },
  // {
  //   icon: Hammer,
  //   title: "Volunteer at a retreat",
  //   body: "Retreats run on volunteer support in the kitchen, grounds, and logistics — in exchange for reduced or waived fees.",
  //   cta: "Apply to volunteer",
  // },
];

export default function SupportUsPage() {
  return (
    <main className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <h1 className="max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl">
        Support the community
      </h1>
      <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
        You can basically support us in two ways; via donation and volunteering.
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
