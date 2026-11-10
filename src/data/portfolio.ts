// Site content.

export const profile = {
  name: "Muhammad Minhaj",
  shortName: "M. Minhaj",
  initials: "MM",
  role: "MERN Stack Developer",
  tagline:
    "I build fast, scalable web apps end to end, from MongoDB schemas and Node APIs to pixel-perfect React interfaces.",
  location: "Karachi, Pakistan",
  experienceYears: 3,
  email: "mminhajwahidm@gmail.com",
  github: "https://github.com/muhammadminhaj786",
  linkedin: "https://www.linkedin.com/in/muhammad-minhaj-wahid-7b47781ba",
  whatsapp: "", // e.g. "923001234567"
  resume: "/resume.pdf",
  available: true,
  currentRole: "Full Stack Developer",
  currentCompany: "DecryptedLabs",
};

export const about = {
  intro:
    "I'm a full-stack developer with 3 years of experience shipping production apps on the MERN stack. I care about clean architecture, readable code and interfaces that feel effortless. I love turning messy requirements into products people actually enjoy using.",
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
    role: "Full Stack Developer",
    period: "Aug 2025 to Present",
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
    role: "MERN Stack Developer",
    period: "Aug 2024 to Aug 2025",
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
    period: "2024 to Present",
    points: [
      "Teach HTML, CSS, JavaScript, React and the MERN stack to batches of students.",
      "Design assignments, hackathons and code reviews that mirror real-world projects.",
    ],
    stack: ["JavaScript", "React", "Node.js", "Firebase"],
  },
  {
    company: "Innovative Solutions",
    role: "Junior Software Engineer",
    period: "Sep 2023 to Jun 2024",
    points: [
      "Built interactive dashboards with React, Material UI, Ant Design and React Bootstrap.",
      "Implemented secure REST API communication with refresh-token based session renewal.",
    ],
    stack: ["React", "Material UI", "Ant Design", "REST APIs"],
  },
];

export const education = {
  degree: "BS Software Engineering",
  school: "UBIT, University of Karachi",
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

export const services = [
  {
    title: "Full stack web apps",
    intro:
      "Web apps with React or Next.js on the front and Node.js with MongoDB behind it. I handle the whole thing, from the database to the UI.",
    points: [
      "REST APIs with JWT auth and user roles",
      "Admin panels and dashboards",
      "Real-time features with Socket.io or Firebase",
      "Deployment on Vercel or AWS",
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB"],
  },
  {
    title: "AI features",
    intro:
      "I've built an AI voice platform and a tool that explains codebases. I can add chat, document search or voice generation to your app.",
    points: [
      "Chat and Q&A with OpenAI, Anthropic or Google models",
      "Search over your own docs or code",
      "Text to speech and voice cloning with ElevenLabs",
    ],
    stack: ["Vercel AI SDK", "OpenAI", "ElevenLabs"],
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

// What I'm doing at the moment. Update the month whenever this changes.
export const now = {
  updated: "Oct 2026",
  items: [
    { label: "Building", text: "Latinum, a React Native crypto wallet, at DecryptedLabs." },
    { label: "Teaching", text: "Web and app development batches at Saylani Mass IT Training." },
    { label: "On the side", text: "CodeKhoj, a tool that walks you through an unfamiliar GitHub repo file by file." },
  ],
};

// Screenshot keys. The files live in src/assets/projects and are mapped in src/lib/project-images.ts.
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
      "Grounded Q&A: code is split into 40-line windows and ranked with BM25. Every answer cites exact line numbers, no vector DB needed.",
      "Works with Anthropic, OpenAI or Google models through the Vercel AI SDK, plus a built-in demo lesson that needs no API key.",
      "Responsive, keyboard accessible, light & dark mode, reduced-motion aware, with unit tests in Vitest.",
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
      "Technical interview prep is a grind of dry question banks and long videos. Candidates lose motivation before they're ready, and recruiters have no quick way to verify what someone really knows.",
    solution:
      "Playhire turns prep into games. Six Masters (CSS, DSA, JavaScript, OOP, System Design and interview English) where every level teaches a real concept: flexbox builds the bridge you run across, arrays get sorted with spider webs, tricky JS output questions become boss fights. Players earn XP, climb the leaderboard and finish with a certificate recruiters can verify.",
    highlights: [
      "In-game live CSS editor: change a value in the level's stylesheet and the level re-lays out instantly, so learners see exactly what each property does.",
      "XP economy that rewards cleared levels, stars, no-hint runs and daily streaks, with weekly and all-time leaderboards to keep players coming back.",
      "Certificates with a public verify link, so candidates can prove skills to recruiters in one click.",
      "Guest play with on-device progress that carries over on sign-in, so there's zero friction from landing page to first level.",
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
      coverAlt: "Playhire landing page: interview prep as games",
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
    hue: "from-blue-300/25 via-slate-700/20 to-zinc-900/40",
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
    hue: "from-slate-300/25 via-blue-900/20 to-zinc-900/40",
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
    hue: "from-zinc-400/20 via-slate-700/20 to-blue-950/40",
  },
  {
    title: "Simply Cavapoos",
    category: "E-Commerce · Business",
    year: "2025",
    problem:
      "A family breeder relied on social media and word of mouth. Buyers had no single, trustworthy place to see available puppies and learn about the breed.",
    description:
      "Online home for a South Carolina Cavapoo breeder: puppy shop and cart, breed guides, parents, FAQ and a 10-year health guarantee, with Google reviews and an Instagram feed to build trust.",
    stack: ["WordPress", "WooCommerce", "PHP", "CSS"],
    live: "https://simplycavapoos.com/",
    client: true,
    image: "simplycavapoos",
    hue: "from-blue-200/20 via-zinc-700/20 to-slate-900/40",
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
    hue: "from-slate-400/25 via-zinc-800/20 to-blue-950/40",
  },
  {
    title: "JobConnect",
    category: "Social · Real-time",
    year: "2024",
    problem: "Job seekers and employers juggle separate apps for listings, applications and follow-up messages.",
    description:
      "Social job platform: post jobs, apply, chat and get real-time notifications. Auth, Firestore and live listeners via Firebase.",
    stack: ["JavaScript", "Firebase Auth", "Firestore", "Bootstrap"],
    live: "",
    code: "https://github.com/muhammadminhaj786/social-app-with-firebase",
    image: null,
    hue: "from-zinc-300/20 via-blue-900/20 to-slate-900/40",
  },
  {
    title: "E-Commerce Store",
    category: "E-Commerce",
    year: "2024",
    problem: "Small shops need a fast, mobile-friendly storefront without paying for a heavy platform.",
    description:
      "Responsive storefront with product listing, filtering, product pages and a cart. Data via Axios, routing with React Router.",
    stack: ["React", "React Router", "Axios", "Tailwind"],
    live: "",
    code: "https://github.com/muhammadminhaj786/E-Commerce-Web-React",
    image: null,
    hue: "from-blue-400/20 via-slate-800/20 to-zinc-900/40",
  },
  {
    title: "Apple Replica",
    category: "UI Engineering",
    year: "2023",
    problem: "A test of craft: can a premium product page be rebuilt pixel-for-pixel with nothing but HTML and CSS?",
    description:
      "Pixel-faithful recreation of Apple's product landing page: responsive layout, typography and imagery in plain HTML & CSS.",
    stack: ["HTML", "CSS", "Responsive"],
    live: "https://muhammadminhaj786.github.io/Apple-Replica/",
    code: "https://github.com/muhammadminhaj786/Apple-Replica",
    image: "apple",
    hue: "from-slate-200/20 via-zinc-700/20 to-blue-950/40",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
