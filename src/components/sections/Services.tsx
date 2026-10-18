"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 60,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".service-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="02" eyebrow="What I build" title="Four kinds of work." accent="One developer." />

        <div className="service-grid mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="service-card group flex flex-col rounded-3xl border border-line bg-ink/50 p-7 backdrop-blur-xl transition-colors duration-500 hover:border-accent/40 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-line font-display text-lg font-medium transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{s.tag}</span>
              </div>

              <h3 className="mt-7 font-display text-2xl font-medium tracking-tight md:text-3xl">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>

              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-fg/85">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="border-t border-line pt-5 font-mono text-xs text-muted">{s.stack.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
