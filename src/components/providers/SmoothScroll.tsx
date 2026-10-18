"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { onIntroDone, sceneState } from "@/lib/scene-state";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let offIntro = () => {};

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      // Lock scrolling until the preloader has finished.
      lenis.stop();
      offIntro = onIntroDone(() => lenis?.start());
    }

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

    // Fonts change layout metrics — recalculate trigger positions once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(decay);
      if (tick) gsap.ticker.remove(tick);
      offIntro();
      velocityTrigger.kill();
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
