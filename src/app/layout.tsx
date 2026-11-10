import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${profile.name} | MERN Stack & Next.js Developer in ${profile.location.split(",")[0]}`;
const description = `${profile.name} is a freelance ${profile.role} in ${profile.location} with ${profile.experienceYears}+ years of experience. I build fast, SEO-friendly web apps, SaaS platforms and business websites for clients worldwide with React, Next.js, Node.js and MongoDB.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: profile.name,
  keywords: [
    profile.name,
    "Muhammad Minhaj Wahid",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Freelance Web Developer",
    "Hire MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer in Karachi",
    "Web Developer in Pakistan",
    "Remote Full Stack Developer",
    "SaaS Development",
    "WordPress Developer",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { title, description, type: "profile", url: "/", siteName: profile.name, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  // Paste the token from Google Search Console → Settings → Ownership verification (HTML tag).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
