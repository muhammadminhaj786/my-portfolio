"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { now, skills } from "@/data/portfolio";
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

      gsap.from(".now-item", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".now", start: "top 85%" },
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
        <SectionHeading title="Skills" />

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
                  background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,199,250,0.12), transparent 50%)",
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

      <div className="now mx-auto mt-24 max-w-7xl px-6 md:mt-32 md:px-10">
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-8">
          <h3 className="font-display text-2xl font-medium tracking-tight">Right now</h3>
          <p className="text-sm text-muted">Updated {now.updated}</p>
        </div>
        <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          {now.items.map((item) => (
            <li key={item.label} className="now-item">
              <p className="text-sm text-muted">{item.label}</p>
              <p className="mt-2 text-lg leading-snug text-fg">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
