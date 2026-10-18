"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { marquee, skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-card", {
        y: 80,
        rotateX: -25,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        transformPerspective: 900,
        scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
      });

      // Two marquee rows drift in opposite directions (content is doubled, so -50% loops seamlessly).
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((row, i) => {
        const [from, to] = i % 2 ? [-50, 0] : [0, -50];
        gsap.fromTo(row, { xPercent: from }, { xPercent: to, duration: 40, ease: "none", repeat: -1 });
      });

      gsap.to(".marquee-wrap", {
        rotate: -2,
        ease: "none",
        scrollTrigger: { trigger: ".marquee-wrap", start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  // Tilt cards toward the pointer.
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 900, duration: 0.5, ease: "power3.out" });
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });

  return (
    <section ref={root} id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="04" eyebrow="Skills & tools" title="My" accent="toolkit." />

        <div className="skill-grid mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <div
              key={group.title}
              onPointerMove={tilt}
              onPointerLeave={untilt}
              className="skill-card group relative overflow-hidden rounded-3xl border border-line bg-ink/40 p-7 backdrop-blur-xl"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(198,255,61,0.12), transparent 50%)",
                }}
              />
              <div className="relative flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-medium">{group.title}</h3>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
              </div>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li key={s} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-fg/85">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrap mt-28 -mx-4 space-y-3 md:mt-36" aria-hidden>
        {[0, 1].map((row) => (
          <div key={row} className={`overflow-hidden py-3 ${row ? "border-y border-line" : "bg-accent text-ink"}`}>
            <div className="marquee-track flex w-max">
              {[...marquee, ...marquee].map((t, i) => (
                <span key={i} className="flex items-center gap-8 pr-8 font-display text-4xl font-medium tracking-tight whitespace-nowrap md:text-6xl">
                  {t}
                  <span className={`font-serif text-3xl italic ${row ? "text-accent" : ""}`}>✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
