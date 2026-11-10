// Shared button styles so every button on the site looks the same.
const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors";

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants = {
  primary: "bg-accent text-ink hover:bg-fg",
  secondary: "border border-line bg-ink/60 text-fg backdrop-blur-md hover:border-fg/40 hover:bg-white/5",
};

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
