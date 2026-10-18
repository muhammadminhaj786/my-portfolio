"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone, sceneState } from "@/lib/scene-state";
import { profile } from "@/data/portfolio";

export const INTRO_KEY = "mm-intro-seen";

// Runs before first paint (see layout.tsx) so repeat visitors never see the preloader flash.
export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.classList.add("intro-seen")}catch(e){}`;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const seen = document.documentElement.classList.contains("intro-seen");
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}

      // Repeat visit in this session: skip straight to the content.
      if (seen) {
        gsap.to(sceneState, { intro: 1, duration: 1.6, ease: "elastic.out(1, 0.6)" });
        markIntroDone();
        return;
      }

      window.scrollTo(0, 0);
      const counter = { v: 0 };

      // ~1s on purpose — recruiters shouldn't wait to see the content.
      gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .to(counter, {
          v: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(".pl-bar", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
        .to(".pl-line", { yPercent: -110, stagger: 0.03, duration: 0.4, ease: "expo.in" }, ">-0.1")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7 }, "-=0.15")
        .to(sceneState, { intro: 1, duration: 1.8, ease: "elastic.out(1, 0.6)" }, "<0.2")
        .add(markIntroDone, "<-0.1")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="overflow-hidden">
        <p className="pl-line font-mono text-xs tracking-[0.3em] text-muted uppercase">Portfolio — Full Stack</p>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <p className="pl-line font-display text-4xl font-medium tracking-tight md:text-6xl">
            {profile.name}
            <em className="font-serif font-normal text-accent italic"> / {profile.role}</em>
          </p>
        </div>
        <div className="overflow-hidden">
          <span ref={count} className="pl-line block font-mono text-5xl text-accent tabular-nums md:text-8xl">
            000
          </span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
        <div className="pl-bar h-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
