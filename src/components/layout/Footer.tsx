import Link from "next/link";
import Image from "next/image";
import { Flower2, Copyright, Mail, MapPin, Instagram, Youtube } from "lucide-react";

const SITE_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/registration", label: "Registration" },
  { href: "/code-of-conduct", label: "Code of Conduct" },
];

const SUPPORT_LINKS = [
  { href: "/support-us", label: "Support Us" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-stone-dim">
      <div className="mx-auto max-w-content px-6 py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-ink">
              <Image src="/images/logo.png" alt="Mahamudra Logo" width={280} height={280} />
              {/* <Flower2 className="h-6 w-6 text-saffron" strokeWidth={1.5} /> */}
              {/* <span className="font-display text-lg font-medium">Mahamudra</span> */}
            </div>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-soft">
              Mahamudra, (Sanskrit: “the great seal”) in Vajrayana (Tantric) Buddhism, the final goal, the union of all apparent dualities. 
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-saffron hover:text-saffron"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-saffron hover:text-saffron"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-body text-sm font-medium text-ink">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-medium text-ink">Community</p>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-medium text-ink">Reach us</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 font-body text-sm text-ink-soft">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
                  Kumarithan area, Chabahil, Kathmandu
              </li>
              <li className="flex items-start gap-2.5 font-body text-sm text-ink-soft">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
                info@mahamudra.com repanepal1@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 font-body text-xs text-ink-soft">
            <Copyright className="h-3.5 w-3.5" />
            {new Date().getFullYear()} Mahamudra. All rights reserved.
          </p>
          <p className="font-body text-xs text-ink-soft">
            Built with care for a quiet practice.
          </p>
        </div>
      </div>
    </footer>
  );
}
