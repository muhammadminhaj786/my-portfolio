"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { onIntroDone } from "@/lib/scene-state";
import { navLinks, profile } from "@/data/portfolio";
import { buttonClass } from "@/components/ui/button";

// Text that rolls up to a duplicate of itself on hover.
const Roll = ({ children }: { children: string }) => (
  <span className="roll">
    <span>{children}</span>
    <span aria-hidden>{children}</span>
  </span>
);

export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useGSAP(() => {
    gsap.set(header.current, { yPercent: -120 });
    const off = onIntroDone(() =>
      gsap.to(header.current, { yPercent: 0, duration: 1, ease: "expo.out", delay: 0.4 }),
    );

    // Hide on scroll down, reveal on scroll up.
    const st = ScrollTrigger.create({
      start: 200,
      end: "max",
      onUpdate: (self) => {
        gsap.to(header.current, {
          yPercent: self.direction === 1 ? -120 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });

    navLinks.forEach(({ href }) =>
      ScrollTrigger.create({
        trigger: href,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(href),
        onLeaveBack: () => href === navLinks[0].href && setActive(""),
      }),
    );

    return () => {
      off();
      st.kill();
    };
  });

  useEffect(() => {
    if (!menu.current) return;
    gsap.to(menu.current, {
      clipPath: open ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
      duration: 0.8,
      ease: "expo.inOut",
    });
    if (open) {
      gsap.fromTo(
        menu.current.querySelectorAll("li"),
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, stagger: 0.06, delay: 0.25, duration: 0.7, ease: "expo.out" },
      );
    }
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-line bg-ink/60 py-2 pr-2 pl-5 backdrop-blur-xl">
          <button onClick={() => go("#top")} className="font-display text-lg font-semibold tracking-tight" aria-label="Back to top">
            {profile.initials}
            <span className="text-accent">.</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className={`relative rounded-lg px-4 py-2 text-sm transition-colors ${
                    active === l.href ? "bg-white/10 text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <Roll>{l.label}</Roll>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex ${buttonClass("primary", "sm")}`}
            >
              Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex size-10 items-center justify-center rounded-lg border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menu}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-28 pb-10 lg:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="flex items-baseline gap-4 font-display text-5xl font-medium tracking-tight"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 text-sm text-muted">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>{profile.email}</a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="text-accent">
            Download résumé
          </a>
        </div>
      </div>
    </>
  );
}
