"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Desktop-only cursor: a dot plus a trailing ring that grows over interactive elements.
// Add data-cursor="Label" to any element to show a label inside the ring.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    gsap.set([dot.current, ring.current], { autoAlpha: 0, xPercent: -50, yPercent: -50 });
    let current: Element | null = null;

    const move = (e: PointerEvent) => {
      gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      if (target === current) return;
      current = target;

      const text = target?.dataset.cursor ?? "";
      if (label.current) label.current.textContent = text;
      // Animate real width/height (not scale) so the label text stays crisp.
      const size = text ? 84 : target ? 56 : 36;
      gsap.to(ring.current, {
        width: size,
        height: size,
        backgroundColor: text ? "rgba(198,255,61,1)" : "rgba(198,255,61,0)",
        borderColor: text ? "rgba(198,255,61,1)" : "rgba(198,255,61,0.6)",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(label.current, { autoAlpha: text ? 1 : 0, duration: 0.2 });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25, overwrite: "auto" });
    };
    const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  });

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-9 items-center justify-center rounded-full border border-accent/60 [@media(pointer:fine)]:flex"
      >
        <span ref={label} className="invisible text-xs font-semibold tracking-wide text-ink uppercase opacity-0" />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-2 rounded-full bg-accent [@media(pointer:fine)]:block"
      />
    </>
  );
}
