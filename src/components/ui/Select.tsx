"use client";

import { useEffect, useId, useRef, useState } from "react";

// Themed replacement for <select>: the native popup is drawn by the OS and can't match the site.
// Keyboard: ↑/↓ move, Home/End jump, Enter/Space pick, Esc closes, typing a letter jumps to a match.
export default function Select({
  id,
  name,
  options,
  placeholder,
  className = "",
  invalid = false,
  onChange,
}: {
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  className?: string;
  invalid?: boolean;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const pick = (i: number) => {
    setValue(options[i]);
    onChange?.(options[i]);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => (open ? setActive((a) => Math.min(a + 1, last)) : show()),
      ArrowUp: () => (open ? setActive((a) => Math.max(a - 1, 0)) : show()),
      Home: () => open && setActive(0),
      End: () => open && setActive(last),
      Enter: () => (open ? pick(active) : show()),
      " ": () => (open ? pick(active) : show()),
      Escape: () => setOpen(false),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1) {
      const i = options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) {
        if (open) setActive(i);
        else pick(i);
      }
    }
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between gap-4 text-left ${open ? "border-accent bg-white/[0.05]" : ""} ${invalid ? "border-red-400/70" : ""}`}
      >
        <span className={value ? "text-fg" : "text-muted/60"}>{value || placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`}
        >
          <path d="M2 4.5 6 8.5l4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <ul
        ref={list}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        className={`absolute inset-x-0 top-full z-20 mt-2 max-h-72 origin-top overflow-y-auto rounded-2xl border border-line bg-ink/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl transition duration-200 ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {options.map((o, i) => (
          <li
            key={o}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={o === value}
            onPointerEnter={() => setActive(i)}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => pick(i)}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
              i === active ? "bg-white/[0.07] text-fg" : "text-fg/80"
            }`}
          >
            {o}
            {o === value && <span aria-hidden className="text-accent">✓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
