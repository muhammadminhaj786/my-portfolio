"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The timeline line draws itself as you scroll.
      gsap.fromTo(
        ".xp-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".xp-list", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );

      const splits: SplitText[] = [];
      gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".xp-anim"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });
        // Same as the About paragraph: words light up one by one as you scroll through the points.
        const split = SplitText.create(item.querySelectorAll(".xp-text"), { type: "words" });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: item.querySelector("ul"), start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );
        gsap.from(item.querySelector(".xp-dot"), {
          scale: 0,
          duration: 0.6,
          ease: "back.out(3)",
          scrollTrigger: { trigger: item, start: "top 70%" },
        });
      });
      return () => splits.forEach((s) => s.revert());
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've" accent="worked." />

        <ol className="xp-list relative mt-20 md:mt-28">
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(33.333%+7px)]" />
          <span
            aria-hidden
            className="xp-progress absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent md:left-[calc(33.333%+7px)]"
          />

          {experience.map((job) => (
            <li key={job.company + job.role} className="xp-item relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-3 md:gap-0 md:pl-0">
              <span
                aria-hidden
                className="xp-dot absolute top-2 left-0 size-[15px] rounded-full border-2 border-accent bg-ink md:left-[33.333%]"
              />
              <div className="md:pr-14 md:text-right">
                <p className="xp-anim font-mono text-xs tracking-[0.2em] text-accent uppercase">{job.period}</p>
                <p className="xp-anim mt-2 text-lg text-muted">{job.company}</p>
              </div>
              <div className="md:col-span-2 md:pl-14">
                <h3 className="xp-anim font-display text-3xl font-medium tracking-tight md:text-4xl">{job.role}</h3>
                <ul className="mt-5 space-y-3">
                  {job.points.map((p) => (
                    <li key={p} className="xp-anim flex gap-3 leading-relaxed text-fg">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                      <span className="xp-text">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="xp-anim mt-6 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
