"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function SectionHeading({ title, className = "" }: { title: string; className?: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(root.current, {
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
            scrollTrigger: { trigger: root.current, start: "top 85%" },
          }),
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <h2
      ref={root}
      className={`font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-tight ${className}`}
    >
      {title}
    </h2>
  );
}
