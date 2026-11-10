"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { contactTopics, profile } from "@/data/portfolio";
import { buttonClass } from "@/components/ui/button";
import Select from "@/components/ui/Select";

const field =
  "w-full rounded-2xl border border-line bg-white/[0.03] px-5 py-4 text-fg placeholder:text-muted/60 transition-colors outline-none focus:border-accent focus:bg-white/[0.05]";
const label = "mb-2 block font-mono text-[11px] tracking-[0.2em] text-muted uppercase";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [topicMissing, setTopicMissing] = useState(false);

  useGSAP(
    () => {
      const split = SplitText.create(".contact-title", {
        type: "lines,words",
        mask: "lines",
        // Room for the italic serif descenders, which the line masks would otherwise clip.
        linesClass: "pb-[0.12em]",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            stagger: 0.04,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
          }),
      });
      gsap.from(".contact-fade", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-title", start: "top 70%" },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // No backend: the form composes an email in the visitor's mail app with everything pre-filled.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const problem = String(data.get("problem") ?? "").trim();
    // The custom dropdown is a hidden input, so the browser's `required` check can't cover it.
    if (!topic) {
      setTopicMissing(true);
      document.getElementById("c-topic")?.focus();
      return;
    }

    const subject = `${topic} from ${name}`;
    const body = `Hi Minhaj,\n\n${problem}\n\nName: ${name}\nEmail: ${email}\nNeed: ${topic}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const channels = [
    profile.whatsapp && {
      label: "WhatsApp",
      value: `+${profile.whatsapp}`,
      href: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Minhaj, I have a project in mind.")}`,
    },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\/(www\.)?/, ""), href: profile.github },
    profile.linkedin && { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin },
    profile.resume && { label: "Résumé", value: "Download PDF", href: profile.resume },
  ].filter((c): c is { label: string; value: string; href: string } => Boolean(c));

  return (
    <section ref={root} id="contact" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="contact-title max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-tight">
          Get in touch
        </h2>
        <p className="contact-fade mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Have a project in mind, or hiring for a full-time role? Send me a message and I&apos;ll get back to you
          within a day.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <form
            onSubmit={submit}
            className="contact-fade rounded-3xl border border-line bg-ink/50 p-6 backdrop-blur-xl md:p-10 lg:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className={label}>
                  Name
                </label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="c-email" className={label}>
                  Email
                </label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="c-topic" className={label}>
                What do you need?
              </label>
              <Select
                id="c-topic"
                name="topic"
                options={contactTopics}
                placeholder="Pick one"
                className={field}
                invalid={topicMissing}
                onChange={() => setTopicMissing(false)}
              />
              {topicMissing && (
                <p role="alert" className="mt-2 text-sm text-red-300">
                  Pick what you need so I can reply with the right details.
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="c-problem" className={label}>
                Message
              </label>
              <textarea
                id="c-problem"
                name="problem"
                required
                rows={5}
                placeholder="Tell me a bit about the project or role"
                className={`${field} resize-y`}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button type="submit" className={buttonClass("primary", "lg")}>
                Send message
              </button>
              <p className="text-sm text-muted" aria-live="polite">
                {sent ? "Your email app should open with everything filled in." : "Opens your email app, pre-filled."}
              </p>
            </div>
          </form>

          <aside className="contact-fade flex flex-col rounded-3xl border border-line bg-ink/50 p-6 backdrop-blur-xl md:p-10 lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Or reach me directly</p>
            <ul className="mt-6 divide-y divide-line">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group block py-4"
                  >
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="mt-0.5 block break-all text-fg transition-colors group-hover:text-accent">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={copy}
              className={`mt-6 ${buttonClass("secondary")}`}
              aria-live="polite"
            >
              {copied ? "Copied to clipboard ✓" : "Copy email address"}
            </button>

            <div className="mt-auto flex items-center gap-3 pt-8 text-sm text-muted">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
              {profile.available ? "Open to freelance and full-time work" : "Not taking new work right now"}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
