import Image from "next/image";
import { Flower2, Users, Mountain } from "lucide-react";
import { ReadMore } from "@/components/ui/readMore";

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

const items = {
  description: "Mahamudra, (Sanskrit: “the great seal”) in Vajrayana (Tantric) Buddhism, the final goal, the union of all apparent dualities. Mudra, in addition to its more usual meaning, has in Vajrayana Buddhism the esoteric meaning of “female partner,” which in turn symbolizes prajna (“wisdom”). The union of the Tantric initiate with his sexual partner signifies the symbolic union of the upaya (the “means,” or method of teaching the goal) with prajna and—on the highest level—the identity of samsara (a concept indicating both the phenomenal world and the process of death and rebirth within it) with nirvana (the extinction of craving and actions that bind one to samsara).</p>The intentionally ambiguous language of Tantric texts produces many difficulties in interpretation. It is not clear whether erotic terms are to be understood only symbolically or whether the spiritual process is meant to be expressed concretely in physical acts (as is the practice in certain Vajrayana sects). The transcendent meaning of the symbol, however, is always the supreme joy that comes about with the realization of mystical union.Mahamudra, an ancient meditation technique from India, holds great significance in the realm of self-discovery and spiritual growth. Initially lost to humanity, it was later rediscovered by Gotama the Buddha over 2500 years ago.The term “Mahamudra” translates to “seeing things as they really are,” emphasizing the importance of gaining a clear and unbiased perception of reality. This powerful practice involves self-purification through self-observation.To embark on the journey of Mahamudra, one begins by focusing on the natural breath as a means to concentrate the mind. Through this process, the individual develops a heightened state of awareness, which enables them to observe the ever-changing nature of both the body and mind. By directly experiencing these fluctuations, one gains insights into the universal truths of impermanence, suffering, and egolessness.It is crucial to understand that Mahamudra is not bound by any organized religion or sectarianism. It offers a universal remedy for universal problems, making it accessible to individuals from all walks of life. Regardless of one’s race, community, or religious background, Mahamudra can be freely practiced by anyone, anywhere, and at any time. Its benefits are equally profound and transformative for all who embark on this path of self-discovery and realization."
}

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
      <section className="mx-auto grid max-w-content gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
        <div className="relative w-full h-[600px] overflow-hidden rounded-xl2">
          <Image
            src="/images/guru.jpg"
            alt="Students seated in quiet practice inside a meditation hall"
            fill
            sizes="(min-width: 1024px) 10vw, 10vw"
            className="object-cover  -scale-x-100"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            Introduction to technique
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
            Mahamudra, meaning “the Great Seal,” is the ultimate realization in Vajrayana Buddhism, representing the union of apparent dualities. It symbolizes the integration of wisdom (prajna) and skilful means (upaya), ultimately revealing the profound relationship between samsara, the cycle of death and rebirth, and nirvana, liberation from craving and suffering.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            Mahamudra is an ancient Indian meditation practice associated with Gotama the Buddha and the pursuit of self-discovery and spiritual growth. Its meaning, “seeing things as they really are,” emphasizes clear, unbiased awareness through self-observation and inner purification. Although Tantric texts can be interpreted symbolically or literally, Mahamudra’s deeper spiritual significance lies in the profound joy and freedom arising from the realization of mystical union.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            Mahamudra meditation begins with focusing on the natural breath to calm the mind and develop deeper awareness. By observing the changing nature of the body and mind, practitioners gain insight into impermanence, suffering, and egolessness. As a universal practice beyond religious or cultural boundaries, Mahamudra is accessible to everyone and offers a path toward self-discovery, inner peace, and spiritual realization.
          </p>
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
