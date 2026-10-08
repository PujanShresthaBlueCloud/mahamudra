import type { Metadata } from "next";
import { Spectral, Work_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahamudra — Meditation Retreats & Practice",
  description:
    "Book a Mahamudra meditation retreat, meet our teachers, and learn about our community.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={cn(spectral.variable, workSans.variable, "font-sans", inter.variable)}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <div className="flex-1">{children}</div>
      </body>
    </html>
    </ClerkProvider>
  );
}
