"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

// WebGL only runs in the browser — load the scene lazily so it never blocks first paint.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

// If WebGL is unavailable (old GPU, disabled hardware acceleration) the page still works,
// with a soft CSS glow in place of the 3D scene.
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(106,75,255,0.35),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(143,240,255,0.12),transparent_40%)]" />
      );
    }
    return this.props.children;
  }
}

export default function SceneCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <WebGLBoundary>
        <Scene />
      </WebGLBoundary>
    </div>
  );
}
