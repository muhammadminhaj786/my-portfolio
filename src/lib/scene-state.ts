// Shared, mutable state that GSAP animates on scroll and the 3D scene reads every frame.
// Kept outside React so scroll updates never trigger re-renders.

export const sceneState = {
  intro: 0, // 0 → 1 once the preloader finishes
  x: 1.9,
  y: 0,
  z: 0,
  scale: 1,
  distort: 0.35,
  colorMix: 0,
  rings: 1,
  dim: 1, // brightness multiplier — lowered when the blob sits behind body text
  velocity: 0,
  mouseX: 0,
  mouseY: 0,
};

export type SceneKeyframe = Partial<Omit<typeof sceneState, "intro" | "velocity" | "mouseX" | "mouseY">>;

// Intro handshake between the preloader and the sections that animate in after it.
let introDone = false;
const listeners = new Set<() => void>();

export function onIntroDone(cb: () => void) {
  if (introDone) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function markIntroDone() {
  introDone = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}
