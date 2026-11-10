"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { about, education, profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import avatar from "@/assets/avatar.jpg";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Words light up one by one as you scroll through the paragraph.
      const split = SplitText.create(".about-text", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 50%", scrub: true },
        },
      );

      // Portrait: clip-path reveal, then a slow parallax inside its frame.
      gsap.fromTo(
        ".portrait",
        { clipPath: "inset(100% 0 0 0 round 28px)" },
        {
          clipPath: "inset(0% 0 0 0 round 28px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ".portrait", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".portrait img",
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1.05,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".portrait", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const obj = { v: 0 };
        el.textContent = "0"; // server HTML shows the real number; JS counts up from zero
        gsap.to(obj, {
          v: Number(el.dataset.value),
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      gsap.from(".stat-card", {
        y: 60,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".stats", start: "top 85%" },
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
        <SectionHeading title="About" className="lg:col-span-12" />

        <div className="lg:col-span-4">
          <figure className="portrait relative aspect-[4/5] max-w-sm overflow-hidden rounded-[28px] border border-line bg-white/5">
            <Image
              src={avatar}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width:1024px) 30vw, 90vw"
              placeholder="blur"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-xs backdrop-blur-md">
              <span>
                <span className="block font-medium text-fg">{profile.name}</span>
                <span className="text-muted">{profile.currentRole}</span>
              </span>
              <span className="flex items-center gap-1.5 text-accent">
                <span className="size-1.5 rounded-full bg-accent" /> Open to work
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-8">
          <p className="about-text font-display text-2xl leading-snug font-normal tracking-tight md:text-[2.15rem]">
            {about.intro}
          </p>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Currently</dt>
              <dd className="mt-1.5 text-fg">
                {profile.currentRole} <span className="text-muted">@ {profile.currentCompany}</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Education</dt>
              <dd className="mt-1.5 text-fg">
                {education.degree} <span className="text-muted">, {education.school}</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Based in</dt>
              <dd className="mt-1.5 text-fg">
                {profile.location} <span className="text-muted">· remote-friendly</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="stats grid grid-cols-2 gap-3 md:grid-cols-4 lg:col-span-12">
          {about.stats.map((s) => (
            <div
              key={s.label}
              className="stat-card rounded-3xl border border-line bg-white/[0.02] p-6 backdrop-blur-md transition-colors hover:border-accent/40 md:p-8"
            >
              <p className="font-display text-5xl font-medium tracking-tight md:text-6xl">
                <span className="stat-value" data-value={s.value}>
                  {s.value}
                </span>
                <span className="text-accent">{s.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
