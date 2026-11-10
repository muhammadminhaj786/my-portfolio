import SmoothScroll from "@/components/providers/SmoothScroll";
import SceneCanvas from "@/components/three/SceneCanvas";
import ScrollChoreography from "@/components/ScrollChoreography";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { about, education, experience, featuredProjects, profile, projects, services, skills } from "@/data/portfolio";
import { projectImages } from "@/lib/project-images";
import { siteUrl } from "@/lib/site";

const personId = `${siteUrl}/#person`;

// Every shipped project with a live URL, featured case studies first.
const portfolioItems = [
  ...featuredProjects.map((p) => ({
    name: p.title,
    description: `${p.summary} ${p.problem} ${p.solution}`,
    url: p.live,
    image: projectImages[p.images.cover].src,
    keywords: p.stack,
    client: p.client,
  })),
  ...projects
    .filter((p) => p.live)
    .map((p) => ({
      name: p.title,
      description: p.problem ? `${p.problem} ${p.description}` : p.description,
      url: p.live,
      image: p.image ? projectImages[p.image].src : undefined,
      keywords: p.stack,
      client: p.client,
    })),
];

// Structured data so Google can show a rich result when people search the name or the projects.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      description: profile.tagline,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: `${profile.name}, ${profile.role}`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: "Muhammad Minhaj Wahid",
      jobTitle: profile.role,
      description: about.intro,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      worksFor: { "@type": "Organization", name: experience[0].company },
      alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
      knowsAbout: skills.flatMap((g) => g.items),
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.intro },
      })),
      sameAs: [profile.github, profile.linkedin].filter(Boolean),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: `Projects by ${profile.name}`,
      itemListElement: portfolioItems.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          url: p.url,
          ...(p.image && { image: `${siteUrl}${p.image}` }),
          keywords: p.keywords.join(", "),
          creator: { "@id": personId },
          ...(p.client && { genre: "Client project" }),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <SmoothScroll>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#about"
        className="sr-only z-[95] rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SceneCanvas />
      <div aria-hidden className="vignette pointer-events-none fixed inset-0 -z-[5]" />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* Must come after the sections so its triggers account for the pinned projects spacer. */}
      <ScrollChoreography />
    </SmoothScroll>
  );
}
