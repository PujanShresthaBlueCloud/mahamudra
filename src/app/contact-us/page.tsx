import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us — Mahamudra",
};

export default function ContactUsPage() {
  return (
    <main className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-sm font-body text-base leading-relaxed text-ink-soft">
            Questions about a program, accessibility, or anything else —
            we're glad to help.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10">
                <MapPin className="h-4 w-4 text-pine" />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">Address</p>
                <p className="font-body text-sm text-ink-soft">
                  Kumarithan area, Chabahil, Kathmandu
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10">
                <Mail className="h-4 w-4 text-pine" />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">Email</p>
                <p className="font-body text-sm text-ink-soft">info@mahamudra.com | repanepal1@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10">
                <Phone className="h-4 w-4 text-pine" />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">Phone</p>
                <p className="font-body text-sm text-ink-soft">+977 984-3557333</p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
