"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { workProcess } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".process-step", {
        y: 50,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".process-list", start: "top 80%" },
      });
      // The connecting line draws across as the steps come in.
      gsap.from(".process-line", {
        scaleX: 0,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".process-list", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="06"
          eyebrow="How I work"
          title="A tight loop, from idea to"
          accent="production."
          className="mx-auto max-w-4xl text-center [&_.eyebrow]:justify-center"
        />

        <ol className="process-list relative mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden
            className="process-line absolute top-7 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-line lg:block"
          />
          {workProcess.map((step, i) => (
            <li key={step.title} className="process-step relative flex flex-col items-center text-center">
              <span className="relative grid size-14 place-items-center rounded-full bg-accent font-display text-lg font-medium text-ink shadow-[0_0_40px_-6px] shadow-accent/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
