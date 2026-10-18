"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/lib/scene-state";
import { blobFragment, blobVertex, particlesFragment, particlesVertex } from "./shaders";

const damp = THREE.MathUtils.damp;

function Blob({ detail }: { detail: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const smoothed = useRef({ distort: sceneState.distort, mix: 0, dim: 1, mx: 0, my: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: sceneState.distort },
      uFrequency: { value: 1.25 },
      uMouse: { value: new THREE.Vector2() },
      uColorMix: { value: 0 },
      uDim: { value: 1 },
      uColorA: { value: new THREE.Color("#120a33") },
      uColorB: { value: new THREE.Color("#6a4bff") },
      uColorC: { value: new THREE.Color("#8ff0ff") },
      uColorD: { value: new THREE.Color("#c6ff3d") },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = mesh.current;
    const u = material.current?.uniforms;
    if (!m || !u) return;
    const s = sceneState;
    const sm = smoothed.current;
    const dt = Math.min(delta, 0.05);

    // Scrolling only nudges the motion; a strong reaction pulls the eye away from the content.
    u.uTime.value += dt * (1 + Math.abs(s.velocity) * 1.2);

    sm.distort = damp(sm.distort, s.distort + Math.min(Math.abs(s.velocity) * 0.5, 0.15), 2.5, dt);
    sm.mix = damp(sm.mix, s.colorMix, 4, dt);
    sm.dim = damp(sm.dim, s.dim, 4, dt);
    sm.mx = damp(sm.mx, s.mouseX, 3, dt);
    sm.my = damp(sm.my, s.mouseY, 3, dt);
    u.uDistort.value = sm.distort;
    u.uColorMix.value = sm.mix;
    u.uDim.value = sm.dim;
    u.uMouse.value.set(sm.mx, sm.my);

    m.position.x = damp(m.position.x, s.x + sm.mx * 0.25, 5, dt);
    m.position.y = damp(m.position.y, s.y + sm.my * 0.25, 5, dt);
    m.position.z = damp(m.position.z, s.z, 5, dt);
    const scale = s.scale * s.intro;
    m.scale.setScalar(damp(m.scale.x, scale, 6, dt));
    m.rotation.y += dt * 0.15;
    m.rotation.x = damp(m.rotation.x, sm.my * 0.4, 3, dt);
  });

  return (
    <mesh ref={mesh} position={[sceneState.x, sceneState.y, 0]} scale={0}>
      <icosahedronGeometry args={[1.35, detail]} />
      <shaderMaterial ref={material} vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} />
    </mesh>
  );
}

function Rings() {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const s = sceneState;
    const dt = Math.min(delta, 0.05);
    g.position.x = damp(g.position.x, s.x, 4, dt);
    g.position.y = damp(g.position.y, s.y, 4, dt);
    g.position.z = damp(g.position.z, s.z, 4, dt);
    g.scale.setScalar(damp(g.scale.x, s.scale * s.intro, 5, dt));
    g.rotation.z = state.clock.elapsedTime * 0.08;
    g.rotation.x = 1.1 + s.mouseY * 0.2;
    g.rotation.y = s.mouseX * 0.3;
    mats.current.forEach((m, i) => {
      m.opacity = damp(m.opacity, s.rings * (i === 0 ? 0.35 : 0.18) * s.intro, 4, dt);
    });
  });

  return (
    <group ref={group}>
      {[2.15, 2.6].map((r, i) => (
        <mesh key={r} rotation={[0, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.004, 8, 200]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            color={i === 0 ? "#c6ff3d" : "#8ff0ff"}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Seeded PRNG keeps particle generation pure and identical between renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticles(count: number) {
  const rand = mulberry32(7);
  const pos = new Float32Array(count * 3);
  const sc = new Float32Array(count);
  const off = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 3 + rand() * 9;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi) - 4;
    sc[i] = 0.4 + rand() * 1.6;
    off[i] = rand() * Math.PI * 2;
  }
  return [pos, sc, off] as const;
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const [positions, scales, offsets] = useMemo(() => createParticles(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color("#b9c4ff") },
    }),
    [gl],
  );

  useFrame((state, delta) => {
    const p = points.current;
    if (!p || !material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    p.rotation.y += delta * 0.015;
    p.rotation.x = damp(p.rotation.x, sceneState.mouseY * 0.08, 2, delta);
    p.position.y = damp(p.position.y, -window.scrollY * 0.0006, 4, delta);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={particlesVertex}
        fragmentShader={particlesFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    const cam = state.camera;
    cam.position.x = damp(cam.position.x, sceneState.mouseX * 0.35, 2.5, delta);
    cam.position.y = damp(cam.position.y, sceneState.mouseY * 0.25, 2.5, delta);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Blob detail={isMobile ? 40 : 72} />
      <Rings />
      <Particles count={isMobile ? 700 : 1800} />
      <CameraRig />
    </Canvas>
  );
}
