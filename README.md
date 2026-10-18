# Muhammad Minhaj — Portfolio

Interactive 3D portfolio built with **Next.js 16**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, **GSAP (ScrollTrigger + SplitText)** and **Lenis** smooth scrolling.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content

Everything you'd want to change — name, email, experience, skills, projects, links — lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts).

- Put your CV at `public/resume.pdf` (the Resume buttons link there).
- Set `linkedin` in `profile` to show the LinkedIn link.
- Portrait: `src/assets/avatar.jpg` (also used in the social share image). Project screenshots: `src/assets/projects/`.
- After deploying, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://minhaj.dev`) so OG tags, sitemap and canonical URLs point at your domain.

## How it fits together

| File | Role |
| --- | --- |
| `src/components/three/Scene.tsx` | WebGL scene: noise-displaced shader blob, orbit rings, particle field |
| `src/components/three/shaders.ts` | GLSL for the blob and particles |
| `src/lib/scene-state.ts` | Shared mutable state GSAP animates and the scene reads each frame |
| `src/components/ScrollChoreography.tsx` | Per-section 3D poses (position, scale, distortion, colour, dim) scrubbed on scroll |
| `src/components/providers/SmoothScroll.tsx` | Lenis ↔ GSAP ticker sync, scroll velocity, mouse tracking |
| `src/components/sections/*` | Hero, About, Experience, Skills, Projects (pinned horizontal scroll on desktop), Contact |

SEO: `opengraph-image.tsx` (share card with portrait), `icon.tsx`, `robots.ts`, `sitemap.ts`, and Person JSON-LD in `page.tsx`.

Respects `prefers-reduced-motion` (no smooth scroll, no pinned horizontal section).

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no config needed.
