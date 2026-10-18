// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Muhammad Minhaj",
  shortName: "M. Minhaj",
  initials: "MM",
  role: "MERN Stack Developer",
  tagline:
    "I build fast, scalable web apps end to end — from MongoDB schemas and Node APIs to pixel-perfect React interfaces.",
  location: "Karachi, Pakistan",
  timezone: "Asia/Karachi",
  experienceYears: 3,
  email: "mminhajwahidm@gmail.com",
  github: "https://github.com/muhammadminhaj786",
  linkedin: "https://www.linkedin.com/in/muhammad-minhaj-wahid-7b47781ba",
  whatsapp: "", // international format without "+", e.g. "923001234567" — hidden while empty
  resume: "/resume.pdf", // drop your CV at public/resume.pdf
  available: true,
  currentRole: "MERN Stack Developer",
  currentCompany: "DecryptedLabs",
};

export const about = {
  intro:
    "I'm a full-stack developer with 3 years of experience shipping production apps on the MERN stack. I care about clean architecture, readable code and interfaces that feel effortless — and I love turning messy requirements into products people actually enjoy using.",
  stats: [
    { value: 3, suffix: "+", label: "Years of experience" },
    { value: 60, suffix: "+", label: "Repositories on GitHub" },
    { value: 25, suffix: "+", label: "Projects shipped" },
    { value: 80, suffix: "+", label: "GitHub followers" },
  ],
};

export const experience = [
  {
    company: "DecryptedLabs",
    role: "MERN Stack Developer",
    period: "Aug 2025 — Present",
    points: [
      "Building Latinum, a React Native crypto wallet (in the vein of RedotPay and Kast): app UI, blockchain network and smart contract integration.",
      "Shipped Eye Coin's web app and admin back office end to end: UI, backend, API integration, a DAO voting system, Doba marketplace and smart contracts.",
      "Designed and implemented a micro-frontend architecture, so teams can deploy large frontend apps independently.",
      "Built a full-stack AI voice generation platform (similar to ElevenLabs): auth, audio generation workflows and scalable APIs.",
    ],
    stack: ["React Native", "React", "Node.js", "MongoDB", "Web3", "Smart Contracts"],
  },
  {
    company: "SRU Business Groups",
    role: "Junior MERN Stack Developer",
    period: "Aug 2024 — Aug 2025",
    points: [
      "Developed and maintained full-stack web apps with React on the frontend and Node.js/Express on the backend.",
      "Built REST APIs for authentication, product listings, sales processing and order management with MongoDB and Mongoose.",
      "Managed AWS infrastructure (EC2, S3, Route 53) to keep deployed apps available and fast.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "AWS"],
  },
  {
    company: "Saylani Mass IT Training (SMIT)",
    role: "Web & App Development Instructor",
    period: "2024 — Present",
    points: [
      "Teach HTML, CSS, JavaScript, React and the MERN stack to batches of students.",
      "Design assignments, hackathons and code reviews that mirror real-world projects.",
    ],
    stack: ["JavaScript", "React", "Node.js", "Firebase"],
  },
  {
    company: "Innovative Solutions",
    role: "Junior Software Engineer",
    period: "Sep 2023 — Jun 2024",
    points: [
      "Built interactive dashboards with React, Material UI, Ant Design and React Bootstrap.",
      "Implemented secure REST API communication with refresh-token based session renewal.",
    ],
    stack: ["React", "Material UI", "Ant Design", "REST APIs"],
  },
];

export const education = {
  degree: "BS Software Engineering",
  school: "UBIT — University of Karachi",
};

export const skills = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT Auth", "Socket.io", "Web3 / Smart Contracts"],
  },
  {
    title: "Database",
    items: ["MongoDB", "Mongoose", "MySQL", "Firebase", "Redis"],
  },
  {
    title: "Tools & Cloud",
    items: ["Git & GitHub", "Vercel", "AWS EC2", "Docker", "Postman", "Figma"],
  },
];

// "What I build" — the kinds of work clients hire me for.
export const services = [
  {
    title: "Full Stack Web Apps",
    tag: "Core",
    intro:
      "SaaS products, dashboards and platforms built end to end — one developer owning the database, the API and the interface, so nothing gets lost between teams.",
    points: [
      "Next.js and MERN apps structured to grow with your users",
      "REST APIs, JWT auth, roles and permissions",
      "Admin dashboards, real-time updates and notifications",
      "Deployed on Vercel or AWS with clean, documented code",
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB"],
  },
  {
    title: "AI-Powered Products",
    tag: "Core",
    intro:
      "AI features that do real work inside your product, not demos — grounded in your data, with answers people can check.",
    points: [
      "LLM features with OpenAI, Anthropic or Google models",
      "Retrieval over your docs or code with cited sources",
      "Voice generation and speech-to-text pipelines",
      "Cost and latency tuned for real traffic",
    ],
    stack: ["Vercel AI SDK", "OpenAI", "ElevenLabs", "Zod"],
  },
  {
    title: "Business Websites & E-Commerce",
    tag: "Growth",
    intro:
      "Websites that win customers for small businesses — fast, easy for you to update, and built to show up on Google.",
    points: [
      "Online stores with products, cart and checkout",
      "WordPress and WooCommerce sites you can manage yourself",
      "Technical SEO, structured data and Core Web Vitals",
      "Reviews, social feeds and trust signals that convert",
    ],
    stack: ["WordPress", "WooCommerce", "Next.js", "SEO"],
  },
  {
    title: "Interactive & Gamified Experiences",
    tag: "Craft",
    intro:
      "Interfaces people remember — motion, 3D and game mechanics that keep users coming back, without hurting performance or accessibility.",
    points: [
      "Gamified learning with XP, levels and leaderboards",
      "Scroll-driven animation with GSAP",
      "3D scenes with Three.js and React Three Fiber",
      "Reduced-motion aware and keyboard accessible",
    ],
    stack: ["GSAP", "Three.js", "Tailwind CSS", "TypeScript"],
  },
];

// "How I work" — the loop every project goes through.
export const workProcess = [
  {
    title: "Understand",
    text: "We talk through the real problem, your users and your deadline. You get a clear plan and an honest estimate before any code is written.",
  },
  {
    title: "Plan",
    text: "Data model, pages, APIs and tech choices are decided up front — the things that are expensive to change later get settled first.",
  },
  {
    title: "Build",
    text: "Short iterations with a live preview link you can click. You always know what's done, what's next and where the project stands.",
  },
  {
    title: "Launch & support",
    text: "Deploy, set up SEO and analytics, fix what real users find. I stay after launch, because that's when the useful feedback arrives.",
  },
];

// Options for the "What do you need?" field on the contact form.
export const contactTopics = [
  "Full stack web app",
  "Mobile app (React Native)",
  "Web3 / crypto wallet / DAO",
  "AI feature / product",
  "Business website / e-commerce",
  "Interactive / gamified site",
  "Full-time role",
  "Something else",
];

export const marquee = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript",
  "Tailwind", "Redux", "Firebase", "GSAP", "Three.js", "NestJS",
];

// Screenshot keys — the files live in src/assets/projects and are mapped in src/lib/project-images.ts.
export type ProjectImage =
  | "codekhoj-landing"
  | "codekhoj-lesson"
  | "playhire-landing"
  | "playhire-master"
  | "eyecoin"
  | "isai"
  | "simplycavapoos"
  | "olx"
  | "apple";

// Flagship projects, shown as case studies.
export const featuredProjects: {
  title: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  live: string;
  code?: string; // omitted for private client work
  client?: boolean;
  // `cover` shows first; `detail` wipes in as you scroll.
  images: { cover: ProjectImage; detail: ProjectImage; coverAlt: string; detailAlt: string };
}[] = [
  {
    title: "CodeKhoj",
    category: "AI developer tool",
    year: "2026",
    summary: "Read any codebase in the right order.",
    problem:
      "Opening an unfamiliar repo usually means clicking around the file tree and hoping. Developers waste hours finding where to start.",
    solution:
      "Paste a GitHub repo and CodeKhoj maps it, picks the files to read first, explains each one in plain language with links to exact lines, answers questions about the code and finishes with a quiz.",
    highlights: [
      "Walks the import graph outward from the entry point, so every file you open only uses things you've already read.",
      "Grounded Q&A: code is split into 40-line windows and ranked with BM25 — every answer cites exact line numbers, no vector DB needed.",
      "Works with Anthropic, OpenAI or Google models through the Vercel AI SDK, plus a built-in demo lesson that needs no API key.",
      "Responsive, keyboard accessible, light & dark mode, reduced-motion aware — with unit tests in Vitest.",
    ],
    metrics: [
      { value: "11", label: "step reading path" },
      { value: "BM25", label: "code retrieval" },
      { value: "3", label: "AI providers" },
    ],
    stack: ["Next.js 16", "TypeScript", "Vercel AI SDK", "Tailwind CSS", "Zod", "Vitest"],
    live: "https://code-khoj.vercel.app",
    code: "https://github.com/muhammadminhaj786/CodeKhoj",
    images: {
      cover: "codekhoj-landing",
      detail: "codekhoj-lesson",
      coverAlt: "CodeKhoj landing page",
      detailAlt: "CodeKhoj lesson view with reading path and quiz",
    },
  },
  {
    title: "Playhire",
    category: "Client work · EdTech platform",
    year: "2025",
    summary: "Interview prep you actually want to play.",
    problem:
      "Technical interview prep is a grind of dry question banks and long videos — candidates lose motivation before they're ready, and recruiters have no quick way to verify what someone really knows.",
    solution:
      "Playhire turns prep into games. Six Masters — CSS, DSA, JavaScript, OOP, System Design and interview English — where every level teaches a real concept: flexbox builds the bridge you run across, arrays get sorted with spider webs, tricky JS output questions become boss fights. Players earn XP, climb the leaderboard and finish with a certificate recruiters can verify.",
    highlights: [
      "In-game live CSS editor: change a value in the level's stylesheet and the level re-lays out instantly, so learners see exactly what each property does.",
      "XP economy that rewards cleared levels, stars, no-hint runs and daily streaks, with weekly and all-time leaderboards to keep players coming back.",
      "Certificates with a public verify link, so candidates can prove skills to recruiters in one click.",
      "Guest play with on-device progress that carries over on sign-in — zero friction from landing page to first level.",
    ],
    metrics: [
      { value: "6", label: "skill tracks" },
      { value: "28", label: "CSS levels live" },
      { value: "0", label: "sign-ups to start" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://www.playhire.online",
    client: true,
    images: {
      cover: "playhire-landing",
      detail: "playhire-master",
      coverAlt: "Playhire landing page — interview prep as games",
      detailAlt: "Playhire CSS Master track with Web Runner and Drone Dock games",
    },
  },
];

export const projects: {
  title: string;
  category: string;
  year: string;
  problem?: string; // the pain point the project solves
  description: string;
  stack: string[];
  live: string;
  code?: string; // omitted for private client work
  client?: boolean;
  image: ProjectImage | null;
  hue: string;
}[] = [
  {
    title: "Eye Coin",
    category: "Web3 · Rewards platform",
    year: "2026",
    problem:
      "Eye care clinics lose touch with patients between visits, and have no fun way to keep them engaged or turn that engagement into reviews and referrals.",
    description:
      "Gamified rewards platform where clinic patients join teams, play and earn EYCO, with an EyeDAO that funds vision care. I built the UI and the admin back office, the backend and APIs, the DAO system, a Doba-powered marketplace and the smart contract integration.",
    stack: ["React", "Node.js", "Smart Contracts", "DAO", "Doba API"],
    live: "https://backoffice.geteyecoin.com/auth/login",
    client: true,
    image: "eyecoin",
    hue: "from-sky-400/40 via-indigo-500/20 to-violet-500/40",
  },
  {
    title: "Latinum",
    category: "Mobile · Crypto wallet",
    year: "2026",
    problem:
      "People holding crypto want to spend and move it as easily as a bank card, without juggling exchanges and complex wallets.",
    description:
      "React Native crypto wallet in the vein of RedotPay and Kast. I'm building the app UI and integrating blockchain networks and smart contracts.",
    stack: ["React Native", "TypeScript", "Web3", "Smart Contracts"],
    live: "", // in development, no public link yet
    client: true,
    image: null,
    hue: "from-amber-300/40 via-yellow-500/20 to-lime-400/40",
  },
  {
    title: "iSai",
    category: "AI · Voice & Content",
    year: "2025",
    problem:
      "Publishing podcasts and YouTube videos consistently takes a studio, voice talent and hours of editing that solo creators can't afford.",
    description:
      "AI content studio that writes scripts, clones your voice with ElevenLabs, turns blogs into videos and lets you edit the transcript to instantly regenerate the matching audio.",
    stack: ["React", "Firebase", "ElevenLabs", "Wagmi"],
    live: "https://ai-lama.vercel.app/",
    client: true,
    image: "isai",
    hue: "from-emerald-400/40 via-teal-500/20 to-cyan-500/40",
  },
  {
    title: "Simply Cavapoos",
    category: "E-Commerce · Business",
    year: "2025",
    problem:
      "A family breeder relied on social media and word of mouth — buyers had no single, trustworthy place to see available puppies and learn about the breed.",
    description:
      "Online home for a South Carolina Cavapoo breeder: puppy shop and cart, breed guides, parents, FAQ and a 10-year health guarantee, with Google reviews and an Instagram feed to build trust.",
    stack: ["WordPress", "WooCommerce", "PHP", "CSS"],
    live: "https://simplycavapoos.com/",
    client: true,
    image: "simplycavapoos",
    hue: "from-rose-300/40 via-amber-400/20 to-yellow-300/40",
  },
  {
    title: "OLX Clone",
    category: "Marketplace",
    year: "2024",
    problem: "Buyers and sellers need one simple place to list, browse and find second-hand items by category.",
    description:
      "Classifieds marketplace with category browsing, a multi-step 'post your ad' flow, ad cards and detail views.",
    stack: ["React", "Material UI", "Bootstrap"],
    live: "https://rococo-sunshine-38477d.netlify.app/",
    code: "https://github.com/muhammadminhaj786/olx-clone-react",
    image: "olx",
    hue: "from-cyan-400/40 via-blue-500/20 to-violet-500/40",
  },
  {
    title: "JobConnect",
    category: "Social · Real-time",
    year: "2024",
    problem: "Job seekers and employers juggle separate apps for listings, applications and follow-up messages.",
    description:
      "Social job platform: post jobs, apply, chat and get real-time notifications. Auth, Firestore and live listeners via Firebase.",
    stack: ["JavaScript", "Firebase Auth", "Firestore", "Bootstrap"],
    live: "", // live demo needs an account — add a demo login, then set the URL here
    code: "https://github.com/muhammadminhaj786/social-app-with-firebase",
    image: null,
    hue: "from-lime-400/40 via-emerald-500/20 to-sky-500/40",
  },
  {
    title: "E-Commerce Store",
    category: "E-Commerce",
    year: "2024",
    problem: "Small shops need a fast, mobile-friendly storefront without paying for a heavy platform.",
    description:
      "Responsive storefront with product listing, filtering, product pages and a cart — data via Axios, routing with React Router.",
    stack: ["React", "React Router", "Axios", "Tailwind"],
    live: "",
    code: "https://github.com/muhammadminhaj786/E-Commerce-Web-React",
    image: null,
    hue: "from-orange-400/40 via-rose-500/20 to-fuchsia-500/40",
  },
  {
    title: "Apple Replica",
    category: "UI Engineering",
    year: "2023",
    problem: "A test of craft: can a premium product page be rebuilt pixel-for-pixel with nothing but HTML and CSS?",
    description:
      "Pixel-faithful recreation of Apple's product landing page — responsive layout, typography and imagery in plain HTML & CSS.",
    stack: ["HTML", "CSS", "Responsive"],
    live: "https://muhammadminhaj786.github.io/Apple-Replica/",
    code: "https://github.com/muhammadminhaj786/Apple-Replica",
    image: "apple",
    hue: "from-fuchsia-400/40 via-violet-500/20 to-indigo-500/40",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
