"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { onIntroDone } from "@/lib/scene-state";
import { profile } from "@/data/portfolio";
import { buttonClass } from "@/components/ui/button";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const first = SplitText.create(".hero-first", { type: "chars", mask: "chars" });
      const last = SplitText.create(".hero-last", { type: "chars", mask: "chars" });
      // Resolve elements now: the intro callback fires outside this section's GSAP context,
      // where string selectors wouldn't be scoped to this section.
      const fades = gsap.utils.toArray<HTMLElement>(".hero-fade");
      gsap.set([first.chars, last.chars], { yPercent: 115 });
      gsap.set(fades, { autoAlpha: 0, y: 24 });

      const off = onIntroDone(
        contextSafe!(() => {
          gsap
            .timeline()
            .to(first.chars, { yPercent: 0, stagger: 0.025, duration: 1, ease: "expo.out" })
            .to(last.chars, { yPercent: 0, stagger: 0.025, duration: 1, ease: "expo.out" }, "<0.08")
            .to(fades, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.9, ease: "expo.out" }, "<0.2");
        }),
      );

      // Parallax-out as the hero leaves the viewport.
      gsap.to(".hero-content", {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        off();
        first.revert();
        last.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative flex min-h-svh items-end px-6 pt-32 pb-10 md:px-10 md:pb-14">
      <div className="hero-content mx-auto w-full max-w-7xl">
        <div className="hero-fade mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available for new opportunities
            </span>
          )}
          <span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{profile.location} · Remote</span>
        </div>

        <h1 className="font-display leading-[0.86] font-medium tracking-[-0.04em]">
          <span className="sr-only">
            {profile.name}, {profile.role}
          </span>
          <span aria-hidden className="hero-first block text-[clamp(3.6rem,13vw,12.5rem)]">
            Muhammad
          </span>
          <span aria-hidden className="hero-last block text-[clamp(3.6rem,13vw,12.5rem)]">
            Minhaj<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="hero-fade font-serif text-3xl text-accent italic md:text-4xl">{profile.role}</p>
            <p className="hero-fade mt-3 max-w-md text-base leading-relaxed text-muted md:text-lg">{profile.tagline}</p>
            <p className="hero-fade mt-4 text-sm text-muted">
              Currently at <span className="text-fg">{profile.currentCompany}</span>
              <span className="mt-1.5 block font-mono text-xs text-fg/70">React · Next.js · Node.js · Express · MongoDB · TypeScript</span>
            </p>
          </div>

          <div className="hero-fade flex flex-wrap gap-3 md:col-span-4">
            <button onClick={() => scrollToTarget("#projects")} className={buttonClass("primary", "lg")}>
              View my work
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "lg")}>
              Download CV
            </a>
          </div>

          <dl className="hero-fade grid grid-cols-3 gap-4 border-t border-line pt-5 md:col-span-3 md:border-0 md:pt-0">
            {[
              [`${profile.experienceYears}+`, "Years exp."],
              ["MERN", "Core stack"],
              ["25+", "Projects"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-medium">{v}</dd>
                <dd className="text-xs text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-fade mt-12 hidden items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-muted uppercase md:flex">
          <span className="relative h-8 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent" />
          </span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
