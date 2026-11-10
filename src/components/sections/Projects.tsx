"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { featuredProjects, profile, projects } from "@/data/portfolio";
import { projectImages } from "@/lib/project-images";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/button";

const prettyUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#121418] shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-muted">{prettyUrl(url)}</span>
      </div>
      {children}
    </div>
  );
}

function LinkButton({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(primary ? "primary" : "secondary")}
    >
      {children}
    </a>
  );
}

function FeaturedProject({ featured, index }: { featured: (typeof featuredProjects)[number]; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article
      className={`featured mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16 ${index === 0 ? "mt-16 md:mt-24" : "mt-32 md:mt-48"}`}
    >
      <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
        <div className="lg:sticky lg:top-28">
          <a href={featured.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${featured.title} live`}>
            <BrowserFrame url={featured.live} className="fk-frame">
              <div className="relative aspect-[16/10]">
                <Image src={projectImages[featured.images.cover]} alt={featured.images.coverAlt} fill sizes="(min-width:1024px) 58vw, 100vw" placeholder="blur" loading={index === 0 ? "eager" : "lazy"} className="object-cover object-top" />
                <div className="fk-reveal absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
                  <Image src={projectImages[featured.images.detail]} alt={featured.images.detailAlt} fill sizes="(min-width:1024px) 58vw, 100vw" placeholder="blur" loading={index === 0 ? "eager" : "lazy"} className="object-cover object-top" />
                </div>
              </div>
            </BrowserFrame>
          </a>
          <div className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            <span>
              <span className="text-accent">Featured</span> · {featured.category}
            </span>
            <span>{featured.year}</span>
          </div>
        </div>
      </div>

      <div className={`fk-text space-y-12 lg:col-span-5 lg:py-[6vh] ${flipped ? "lg:order-1" : ""}`}>
        <div className="fk-anim">
          <h3 className="font-display text-5xl font-medium tracking-tight md:text-6xl">{featured.title}</h3>
          <p className="mt-3 font-serif text-2xl text-accent italic">{featured.summary}</p>
        </div>

        <div className="fk-anim grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">The problem</p>
            <p className="mt-2 leading-relaxed text-fg/85">{featured.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">What I built</p>
            <p className="mt-2 leading-relaxed text-fg/85">{featured.solution}</p>
          </div>
        </div>

        <dl className="fk-anim grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white/[0.02] backdrop-blur-md">
          {featured.metrics.map((m) => (
            <div key={m.label} className="p-4 md:p-5">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-2xl font-medium md:text-3xl">{m.value}</dd>
              <dd className="mt-1 text-xs text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>

        <div className="fk-anim">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Engineering highlights</p>
          <ul className="mt-4 space-y-4">
            {featured.highlights.map((h) => (
              <li key={h} className="flex gap-3 leading-relaxed text-fg/85">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="fk-anim space-y-6">
          <ul className="flex flex-wrap gap-2">
            {featured.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={featured.live} primary>
              Live site
            </LinkButton>
            {featured.code && <LinkButton href={featured.code}>Source code</LinkButton>}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const href = project.live || project.code || "";
  const img = project.image ? projectImages[project.image] : null;
  // Private apps with no public link render as a plain card, not a dead link.
  const Media = href ? "a" : "div";

  return (
    <article className="project-card group relative flex w-full shrink-0 flex-col lg:w-[min(44vw,640px,calc((100svh-21rem)*1.6))]">
      <Media
        {...(href && {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `Open ${project.title}`,
        })}
        className="relative block aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-ink"
      >
        <div className={`project-media absolute inset-[-10%] bg-linear-to-br ${project.hue}`} />
        <div className="absolute inset-x-[7%] top-[11%] bottom-[-4%] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
          <BrowserFrame url={href || project.category} className="h-full">
            {img ? (
              <div className="relative h-full">
                <Image src={img} alt={`${project.title}, ${project.category} website screenshot`} fill sizes="(min-width:1024px) 40vw, 90vw" placeholder="blur" className="object-cover object-top" />
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center px-[9%] pb-10">
                <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">{project.category}</p>
                <p className="mt-2 font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-none font-medium tracking-tight">{project.title}</p>
              </div>
            )}
          </BrowserFrame>
        </div>
        {project.client && (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-ink">Client work</span>
        )}
        <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </Media>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-display text-2xl font-medium tracking-tight">{project.title}</h4>
          <span className="font-mono text-xs text-muted">
            {project.category} · {project.year}
          </span>
        </div>
        {project.problem && (
          <p className="mt-3 text-sm leading-relaxed text-fg/85">
            <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">Problem</span>
            {project.problem}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.problem && <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-fg uppercase">Solution</span>}
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 text-sm">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line underline-offset-4 hover:text-accent">
                Live
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line underline-offset-4 hover:text-accent">
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const featuredEls = gsap.utils.toArray<HTMLElement>(".featured");

      featuredEls.forEach((el) => {
        const q = gsap.utils.selector(el);
        gsap.from(q(".fk-anim"), {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: q(".fk-text")[0], start: "top 75%" },
        });
        gsap.from(q(".fk-frame"), {
          clipPath: "inset(12% 8% 12% 8% round 24px)",
          scale: 0.94,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      mm.add("(min-width: 1024px)", () => {
        // Desktop: while the text column scrolls, the sticky screenshot wipes to the detail view.
        featuredEls.forEach((el) => {
          const q = gsap.utils.selector(el);
          gsap.to(q(".fk-reveal"), {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            scrollTrigger: { trigger: q(".fk-text")[0], start: "top 25%", end: "center 30%", scrub: true },
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        featuredEls.forEach((el) => {
          const q = gsap.utils.selector(el);
          gsap.to(q(".fk-reveal"), {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            scrollTrigger: { trigger: q(".fk-frame")[0], start: "top 60%", end: "bottom 30%", scrub: true },
          });
        });
      });

      // Desktop: pin the gallery and scroll the cards horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".project-media").forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: media.closest(".project-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        gsap.to(".projects-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".projects-pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.from(card, { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" className="relative pt-28 pb-28 md:pt-40 lg:pb-0">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading title="Work" />
      </div>

      {featuredProjects.map((f, i) => (
        <FeaturedProject key={f.title} featured={f} index={i} />
      ))}

      <div className="projects-pin relative mt-28 lg:mt-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-6 md:px-10">
          <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            Projects I&apos;ve <em className="font-serif font-normal text-accent italic">shipped</em>
          </h3>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-muted underline decoration-line underline-offset-8 transition-colors hover:text-accent"
          >
            60+ repos on GitHub
          </a>
        </div>
        <div
          ref={track}
          className="flex flex-col gap-16 px-6 md:px-10 lg:flex-row lg:gap-12 lg:pr-[12vw] lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
        <div className="absolute inset-x-10 bottom-8 hidden h-px bg-line lg:block">
          <div className="projects-progress h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
