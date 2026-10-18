"use client";

import { useRef, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { navLinks, profile } from "@/data/portfolio";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

// Ticks every 30s; the server snapshot is empty so the clock only renders in the browser.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const getTime = () => fmt.format(new Date());
const getYear = () => String(new Date().getFullYear());
const getServer = () => "";

const linkCls = "text-fg/80 transition-colors hover:text-accent";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const time = useSyncExternalStore(subscribe, getTime, getServer);
  const year = useSyncExternalStore(subscribe, getYear, getServer);

  useGSAP(
    () => {
      gsap.from(".wordmark span", {
        yPercent: 100,
        stagger: 0.04,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".wordmark", start: "top 95%" },
      });
    },
    { scope: root },
  );

  const socials = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Résumé", href: profile.resume },
  ].filter((s) => s.href);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-ink px-6 pt-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-medium">
            {profile.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-xs text-muted">{profile.role} building fast, scalable products with the MERN stack.</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Menu</p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(l.href);
                  }}
                  className={linkCls}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Say hi</p>
          <a href={`mailto:${profile.email}`} className={`${linkCls} break-all`}>
            {profile.email}
          </a>
          <p className="mt-4 text-muted">
            Karachi · <span className="text-fg tabular-nums">{time}</span> PKT
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="wordmark mx-auto mt-16 flex max-w-7xl justify-between overflow-hidden font-display text-[21vw] leading-[0.8] font-semibold tracking-[-0.06em] text-white/[0.06] select-none xl:text-[17.5rem]"
      >
        {"MINHAJ".split("").map((c, i) => (
          <span key={i} className="inline-block">
            {c}
          </span>
        ))}
      </p>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-line py-6 font-mono text-[11px] tracking-wider text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p className="hidden md:block">Built with Next.js · Three.js · GSAP</p>
        <button onClick={() => scrollToTarget(0)} className="text-left uppercase hover:text-accent">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
