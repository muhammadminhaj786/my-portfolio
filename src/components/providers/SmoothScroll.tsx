"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { markIntroDone, sceneState } from "@/lib/scene-state";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Grow the 3D blob in and let the hero and navbar animate.
    gsap.to(sceneState, { intro: 1, duration: 1.6, ease: "elastic.out(1, 0.6)" });
    markIntroDone();

    // Scroll velocity feeds the 3D blob so it reacts to how fast you scroll.
    const velocityTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        sceneState.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 4000);
      },
    });
    const decay = () => {
      sceneState.velocity *= 0.92;
    };
    gsap.ticker.add(decay);

    const onMove = (e: PointerEvent) => {
      sceneState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Fonts change layout metrics, so recalculate trigger positions once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(decay);
      if (tick) gsap.ticker.remove(tick);
      velocityTrigger.kill();
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
