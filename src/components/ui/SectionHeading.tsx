"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = root.current!.querySelector("h2")!;
      const split = SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        linesClass: "pb-[0.08em]",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: heading, start: "top 85%" },
          }),
      });
      gsap.from(root.current!.querySelector(".eyebrow"), {
        autoAlpha: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <p className="eyebrow mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-tight">
        {title} {accent && <em className="font-serif font-normal text-accent italic">{accent}</em>}
      </h2>
    </div>
  );
}
