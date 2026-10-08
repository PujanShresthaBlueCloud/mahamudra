import Image from "next/image";
import { Flower2, Users, Mountain } from "lucide-react";

export const metadata = {
  title: "About Us — Mahamudra",
};

const VALUES = [
  {
    icon: Flower2,
    title: "Practice over performance",
    body: "We measure a retreat by whether students keep practicing afterward, not by how the week looked.",
  },
  {
    icon: Users,
    title: "Small groups, real attention",
    body: "No retreat runs with more than thirty students, so teachers can actually know who they're guiding.",
  },
  {
    icon: Mountain,
    title: "Rooted in lineage",
    body: "Our teachers trained directly within the Kagyu Mahamudra tradition and teach what they were taught.",
  },
];

export default function AboutUsPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-content gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
            About Us
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
            Mahamudra is the program running under Nepal Buddhist Association which is a non-profit organization under the guidance of H.E Chogyal Rinpoche. Mahamudra Hall is Located outside the KathmanduValley near Pharping .
Mahamudra was introduced by Gautam Buddha around 2500 years ago and practiced by many Mahasiddhas from Ancient India. Mahasiddhas such as Tilopa, Saraha, Naropa, Virupa etc. liberated from this technique.
</p> 
<p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
Mahamudra program offers this ancient technique to all spiritual seekers, which liberates from Suffering (Dukkha) and brings peace in life and after Death. Mahamudra, is the technique to the Cessation of Suffering(Dukha).
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            We are not a wellness brand. We teach a specific meditation
            tradition, carefully, to people willing to put in the time.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2">
          {/* <Image
            src="https://images.unsplash.com/photo-1518241353330-0f7941c25d88?w=1200&q=80"
            alt="Students seated in quiet practice inside a meditation hall"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          /> */}
          <Image
            src="/images/hall.jpg"
            alt="Students seated in quiet practice inside a meditation hall"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-line bg-stone-dim/60">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            What we hold to
          </h2>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:gap-10">
            {VALUES.map((value) => (
              <div key={value.title} className="flex flex-1 flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron/10">
                  <value.icon className="h-5 w-5 text-saffron" />
                </span>
                <h3 className="font-display text-lg text-ink">{value.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ink-soft">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
