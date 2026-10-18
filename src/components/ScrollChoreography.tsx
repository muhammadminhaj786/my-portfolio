"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { sceneState, type SceneKeyframe } from "@/lib/scene-state";

type Step = { trigger: string; desktop: SceneKeyframe; mobile: SceneKeyframe };

// Where the 3D object sits as each section scrolls into view.
const steps: Step[] = [
  {
    trigger: "#about",
    desktop: { x: 3.3, y: -2.3, z: -1, scale: 0.5, distort: 0.55, colorMix: 0.25, rings: 0.4, dim: 0.75 },
    mobile: { x: 0, y: 1.6, z: -2, scale: 0.6, distort: 0.5, colorMix: 0.25, rings: 0.3, dim: 0.5 },
  },
  {
    trigger: "#experience",
    desktop: { x: -3.3, y: -1.6, z: -1, scale: 0.45, distort: 0.25, colorMix: 0.6, rings: 0.8, dim: 0.9 },
    mobile: { x: 1.4, y: 2.2, z: -3, scale: 0.45, distort: 0.25, colorMix: 0.6, rings: 0.6, dim: 0.45 },
  },
  {
    trigger: "#skills",
    desktop: { x: 0, y: 0, z: -1.5, scale: 1.25, distort: 0.85, colorMix: 1, rings: 1, dim: 0.75 },
    mobile: { x: 0, y: 0, z: -2, scale: 1, distort: 0.8, colorMix: 1, rings: 1, dim: 0.5 },
  },
  {
    trigger: "#projects",
    desktop: { x: -3.5, y: -2.4, z: -3, scale: 0.45, distort: 0.3, colorMix: 0.4, rings: 0, dim: 0.7 },
    mobile: { x: 1.6, y: 3, z: -4, scale: 0.45, distort: 0.3, colorMix: 0.4, rings: 0, dim: 0.5 },
  },
  {
    trigger: "#contact",
    desktop: { x: 3.4, y: 1.4, z: -2, scale: 0.85, distort: 0.45, colorMix: 0, rings: 1, dim: 0.3 },
    mobile: { x: 0, y: 0, z: -2, scale: 0.9, distort: 0.45, colorMix: 0, rings: 1, dim: 0.35 },
  },
];

const heroDesktop: SceneKeyframe = { x: 1.9, y: 0, z: 0, scale: 1, distort: 0.35, colorMix: 0, rings: 1, dim: 1 };
const heroMobile: SceneKeyframe = { x: 0.6, y: 1.9, z: -1.5, scale: 0.6, distort: 0.35, colorMix: 0, rings: 1, dim: 0.55 };

export default function ScrollChoreography() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const isDesktop = Boolean(ctx.conditions?.desktop);
      let prev = isDesktop ? heroDesktop : heroMobile;
      gsap.set(sceneState, prev);

      // fromTo + immediateRender:false lets each step scrub between explicit keyframes,
      // so scrolling back up always lands on the previous section's pose.
      steps.forEach((step) => {
        const next = isDesktop ? step.desktop : step.mobile;
        gsap.fromTo(sceneState, { ...prev }, {
          ...next,
          ease: "power1.inOut",
          immediateRender: false,
          scrollTrigger: { trigger: step.trigger, start: "top 85%", end: "top 15%", scrub: 1.2 },
        });
        prev = next;
      });
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  });

  return null;
}
