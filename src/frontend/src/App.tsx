import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";
import "./portfolio.css";

/* ============================================
   TYPES
   ============================================ */
interface Project {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  category: string;
  gradient: string;
  github?: string;
  live?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
  gradient: string;
}

/* ============================================
   DATA
   ============================================ */
const SKILLS = [
  { name: "React / Next.js", pct: 95, color: "#61DAFB" },
  { name: "Node.js / Express", pct: 90, color: "#68A063" },
  { name: "TypeScript", pct: 88, color: "#3178C6" },
  { name: "Python / FastAPI", pct: 82, color: "#FFD43B" },
  { name: "MongoDB", pct: 85, color: "#4FAA41" },
  { name: "PostgreSQL", pct: 80, color: "#336791" },
  { name: "Docker / Kubernetes", pct: 78, color: "#2496ED" },
  { name: "AWS / Cloud", pct: 75, color: "#FF9900" },
  { name: "UI/UX Design", pct: 88, color: "#FF7262" },
  { name: "Figma", pct: 85, color: "#A259FF" },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NexusPay — FinTech Dashboard",
    category: "web",
    desc: "Real-time financial analytics dashboard with multi-currency support and fraud detection.",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "ArtFlow — NFT Marketplace",
    category: "web",
    desc: "Decentralized marketplace for digital art with wallet connect and on-chain royalties.",
    tags: ["Next.js", "Solidity", "IPFS"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "TrailBuddy — Fitness App",
    category: "mobile",
    desc: "Cross-platform fitness tracker with GPS routes, AI coaching, and social challenges.",
    tags: ["React Native", "Python", "MongoDB"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "Luminary — SaaS Platform",
    category: "web",
    desc: "Multi-tenant B2B SaaS platform with role-based access, billing, and analytics.",
    tags: ["React", "TypeScript", "AWS"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    github: "#",
    live: "#",
  },
  {
    id: 5,
    title: "Mosaic — Design System",
    category: "design",
    desc: "Comprehensive UI component library with 80+ components, Figma tokens, and Storybook.",
    tags: ["Figma", "React", "Storybook"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    github: "#",
    live: "#",
  },
  {
    id: 6,
    title: "Nexora — AI Chatbot",
    category: "mobile",
    desc: "Conversational AI assistant with voice input, multi-language support, and context memory.",
    tags: ["React Native", "OpenAI", "Node.js"],
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    github: "#",
    live: "#",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "CTO",
    company: "Nexus Tech",
    initials: "SM",
    gradient: "linear-gradient(135deg, #A855F7, #3B82F6)",
    text: "Alex delivered our fintech dashboard ahead of schedule with flawless attention to detail. The code quality, documentation, and communication were all exceptional. Truly a 10x engineer.",
  },
  {
    name: "David Okonkwo",
    role: "Founder",
    company: "ArtFlow Labs",
    initials: "DO",
    gradient: "linear-gradient(135deg, #FF8A5B, #FF5B94)",
    text: "Working with Alex was transformative. He took our vague NFT marketplace concept and turned it into a production-ready product in 8 weeks. The UI polish is stunning.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Luminary SaaS",
    initials: "PS",
    gradient: "linear-gradient(135deg, #22D3EE, #3B82F6)",
    text: "Alex rebuilt our entire frontend architecture while maintaining zero downtime. He introduced TypeScript, improved performance by 60%, and mentored our junior devs throughout.",
  },
  {
    name: "James Whitfield",
    role: "Design Lead",
    company: "Mosaic Studio",
    initials: "JW",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    text: "The design system Alex built became the backbone of our product suite. His eye for design combined with engineering rigor is a rare and powerful combination.",
  },
];

const TIMELINE = [
  {
    date: "2022 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Nexus Technology Group",
    type: "work",
    desc: "Lead architect for micro-frontend platform serving 500K+ users. Drove 45% performance improvements and reduced deployment time by 70% through CI/CD optimization.",
  },
  {
    date: "2020 — 2022",
    role: "Full-Stack Developer",
    company: "BrightPath Digital Agency",
    type: "work",
    desc: "Delivered 25+ client projects across fintech, e-commerce, and SaaS. Specialized in React/Node.js architectures with focus on scalability and DX.",
  },
  {
    date: "2018 — 2020",
    role: "Frontend Engineer",
    company: "Velocity Startup Studio",
    type: "work",
    desc: "Built 0-to-1 products for early-stage startups. Introduced modern React patterns, unit testing culture, and design-engineering collaboration workflows.",
  },
  {
    date: "2014 — 2018",
    role: "B.Sc. Computer Science",
    company: "University of Cambridge",
    type: "edu",
    desc: "First Class Honours. Specialization in Software Engineering and Human-Computer Interaction. Final project: Distributed ML inference pipeline.",
  },
  {
    date: "2012 — 2014",
    role: "A-Levels: Maths, Physics, CS",
    company: "Oxford Sixth Form College",
    type: "edu",
    desc: "Triple distinction. Founded the school's first Robotics Club. Won regional coding competition in Year 2.",
  },
];

const FAQ = [
  {
    q: "What types of projects do you specialise in?",
    a: "I specialise in full-stack web and mobile applications — from SaaS dashboards and fintech platforms to e-commerce solutions and design systems. I'm equally comfortable owning the frontend, backend, or the full product.",
  },
  {
    q: "How do you approach a new project?",
    a: "I start with a discovery workshop to understand goals, constraints, and users. Then I produce architecture diagrams and a phased delivery plan before writing a single line of code. This prevents costly rewrites.",
  },
  {
    q: "What are your typical project timelines?",
    a: "A focused MVP typically takes 6–10 weeks. Larger platforms are 3–6 months. I provide detailed milestone breakdowns so you always know what to expect at each phase.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Absolutely. I regularly take over and modernise legacy codebases, introduce TypeScript, improve performance, and establish maintainable patterns that scale with your team.",
  },
  {
    q: "What's your pricing model?",
    a: "I offer project-based fixed pricing for well-scoped work, and a flexible monthly retainer for ongoing product development. Rates are based on complexity and timeline — let's chat to get you an estimate.",
  },
  {
    q: "Can you collaborate with our in-house team?",
    a: "Yes — in fact it's how I prefer to work. I integrate with your existing workflows (GitHub, Linear, Slack, Figma) and actively contribute to code reviews and knowledge sharing.",
  },
];

/* ============================================
   SKILL PROGRESS BAR
   ============================================ */
function SkillBar({
  name,
  pct,
  delay,
}: { name: string; pct: number; delay: number }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setFilled(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div className="pf-progress-wrap" ref={ref}>
      <div className="pf-progress-label">
        <span className="pf-progress-name">{name}</span>
        <span className="pf-progress-pct">{pct}%</span>
      </div>
      <div className="pf-progress-track">
        <div
          className={`pf-progress-fill${filled ? " animated" : ""}`}
          style={{ width: filled ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ============================================
   COUNTER
   ============================================ */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  num,
  suffix,
  label,
}: { num: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(num, 1500, active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pf-stat-card" ref={ref} data-ocid="hero.card">
      <div className="pf-stat-num">
        {count}
        {suffix}
      </div>
      <div className="pf-stat-label">{label}</div>
    </div>
  );
}

/* ============================================
   TESTIMONIALS SLIDER
   ============================================ */
function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const visibleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;
  const maxIndex = TESTIMONIALS.length - visibleCount;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex],
  );
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? maxIndex : i - 1)),
    [maxIndex],
  );

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  return (
    <div>
      <div className="pf-testimonial-slider">
        <div
          className="pf-testimonial-track"
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
        >
          {TESTIMONIALS.map((t) => (
            <div className="pf-testimonial-slide" key={t.name}>
              <div className="pf-testimonial-card">
                <div className="pf-stars">★★★★★</div>
                <p className="pf-testimonial-text">"{t.text}"</p>
                <div className="pf-testimonial-author">
                  <div
                    className="pf-author-avatar"
                    style={{ background: t.gradient }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="pf-author-name">{t.name}</div>
                    <div className="pf-author-role">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pf-slider-controls">
        <button
          type="button"
          className="pf-slider-arrow"
          onClick={() => {
            prev();
            resetTimer();
          }}
          aria-label="Previous"
          data-ocid="testimonials.pagination_prev"
        >
          <i className="bi bi-chevron-left" />
        </button>
        <div className="pf-slider-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: pagination dots have no other unique id
              <button
                type="button"
                key={`dot-${i}`}
                className={`pf-slider-dot${index === i ? " active" : ""}`}
                onClick={() => {
                  setIndex(i);
                  resetTimer();
                }}
                aria-label={`Slide ${i + 1}`}
                data-ocid="testimonials.toggle"
              />
            );
          })}
        </div>
        <button
          type="button"
          className="pf-slider-arrow"
          onClick={() => {
            next();
            resetTimer();
          }}
          aria-label="Next"
          data-ocid="testimonials.pagination_next"
        >
          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </div>
  );
}

/* ============================================
   MAIN APP
   ============================================ */
export default function App() {
  const { actor } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  /* ----- Scroll effects ----- */
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      // active nav
      const sections = [
        "home",
        "about",
        "skills",
        "resume",
        "portfolio",
        "services",
        "testimonials",
        "faq",
        "contact",
      ];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- Scroll reveal ----- */
  useEffect(() => {
    const els = document.querySelectorAll(".pf-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ----- Contact form ----- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setFormLoading(true);
    try {
      if (actor) {
        await actor.submitContact(
          formData.name,
          formData.email,
          formData.subject || "General Inquiry",
          formData.message,
        );
      }
      toast.success("Message sent! I'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const filteredProjects =
    portfolioFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === portfolioFilter);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Work" },
    { id: "services", label: "Services" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <Toaster position="top-right" />

      {/* Background blobs */}
      <div className="pf-blob-container" aria-hidden>
        <div className="pf-blob pf-blob-1" />
        <div className="pf-blob pf-blob-2" />
        <div className="pf-blob pf-blob-3" />
        <div className="pf-blob pf-blob-4" />
      </div>

      {/* ====== NAVBAR ====== */}
      <nav className="pf-navbar" aria-label="Main navigation">
        <div className="pf-navbar-inner">
          <button
            type="button"
            className="pf-nav-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
            data-ocid="nav.link"
          >
            Alex.dev
          </button>
          <ul className="pf-nav-links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={activeSection === l.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.id);
                  }}
                  data-ocid={`nav.${l.id}.link`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="pf-nav-cta pf-nav-cta-desktop"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            data-ocid="nav.contact.button"
          >
            Hire Me
          </button>
          <button
            type="button"
            className="pf-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            data-ocid="nav.toggle"
          >
            <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"}`} />
          </button>
        </div>
        {/* Mobile menu */}
        <div className={`pf-mobile-menu${mobileMenuOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.id);
              }}
              data-ocid={`nav.mobile.${l.id}.link`}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="pf-nav-cta"
            style={{ marginTop: 8, textAlign: "center" }}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            data-ocid="nav.mobile.hire.button"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* ====== MAIN ====== */}
      <main className="pf-main">
        {/* ====== HERO ====== */}
        <section id="home" className="pf-hero">
          <div className="pf-container">
            <div className="row align-items-center g-5">
              {/* Left */}
              <div className="col-lg-6">
                <span className="pf-eyebrow">👋 Available for Freelance</span>
                <h1 className="pf-hero-headline">
                  <span className="pf-gradient-text">Building</span>
                  <br />
                  <span style={{ color: "var(--pf-text)" }}>Digital</span>
                  <br />
                  <span className="pf-gradient-text">Experiences</span>
                </h1>
                <p className="pf-hero-sub">
                  Alex Chen — Senior Full-Stack Developer & UI Designer
                </p>
                <p className="pf-hero-desc">
                  I craft high-performance web applications and intuitive
                  interfaces that drive real business outcomes. 5+ years turning
                  complex problems into elegant, scalable solutions.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <button
                    type="button"
                    className="pf-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("portfolio");
                    }}
                    data-ocid="hero.primary_button"
                  >
                    <i className="bi bi-grid-3x3-gap" /> My Projects
                  </button>
                  <button
                    type="button"
                    className="pf-btn-outline"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                    data-ocid="hero.secondary_button"
                  >
                    <i className="bi bi-send" /> Get in Touch
                  </button>
                </div>
              </div>

              {/* Right: Feature Card */}
              <div className="col-lg-6 d-flex justify-content-center">
                <div style={{ width: "100%", maxWidth: 400 }}>
                  <div className="pf-hero-card">
                    <div className="pf-hero-badge">Available Now</div>
                    {/* Avatar */}
                    <div className="text-center">
                      <div className="pf-avatar-ring">
                        <div className="pf-avatar-inner">
                          <img
                            src="/assets/generated/avatar-hero.dim_200x200.png"
                            alt="Alex Chen"
                          />
                        </div>
                      </div>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--pf-text)",
                          marginBottom: 4,
                        }}
                      >
                        Alex Chen
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--pf-muted)",
                          marginBottom: 16,
                        }}
                      >
                        Full-Stack Developer & UI Designer
                      </p>
                      {/* Chips */}
                      <div>
                        {["React", "Node.js", "TypeScript", "AWS", "Figma"].map(
                          (s) => (
                            <span key={s} className="pf-skill-chip">
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "var(--pf-accent-1)",
                                  display: "inline-block",
                                }}
                              />
                              {s}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                    {/* Code panel */}
                    <div className="pf-code-panel">
                      <div style={{ marginBottom: 10 }}>
                        <span
                          className="pf-code-dot"
                          style={{ background: "#FF5F57" }}
                        />
                        <span
                          className="pf-code-dot"
                          style={{ background: "#FEBC2E" }}
                        />
                        <span
                          className="pf-code-dot"
                          style={{ background: "#28C840" }}
                        />
                        <span
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            fontSize: "0.65rem",
                            marginLeft: 8,
                          }}
                        >
                          portfolio.tsx
                        </span>
                      </div>
                      <div style={{ color: "#A855F7" }}>
                        const{" "}
                        <span style={{ color: "#22D3EE" }}>developer</span> ={" "}
                        {"{"}
                      </div>
                      <div
                        style={{ paddingLeft: 16, color: "var(--pf-muted)" }}
                      >
                        {" "}
                        name:{" "}
                        <span style={{ color: "#86EFAC" }}>"Alex Chen"</span>,
                      </div>
                      <div
                        style={{ paddingLeft: 16, color: "var(--pf-muted)" }}
                      >
                        {" "}
                        role:{" "}
                        <span style={{ color: "#86EFAC" }}>"Full-Stack"</span>,
                      </div>
                      <div
                        style={{ paddingLeft: 16, color: "var(--pf-muted)" }}
                      >
                        {" "}
                        exp: <span style={{ color: "#FCA5A5" }}>5</span>,
                      </div>
                      <div
                        style={{ paddingLeft: 16, color: "var(--pf-muted)" }}
                      >
                        {" "}
                        open: <span style={{ color: "#4ADE80" }}>true</span>,
                      </div>
                      <div style={{ color: "#A855F7" }}>{"}"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="pf-stats-row pf-reveal">
              <StatCard num={50} suffix="+" label="Projects Delivered" />
              <StatCard num={5} suffix="+" label="Years Experience" />
              <StatCard num={30} suffix="+" label="Happy Clients" />
              <StatCard num={10} suffix="+" label="Awards Won" />
            </div>
          </div>
        </section>

        {/* ====== ABOUT ====== */}
        <section id="about" className="pf-section">
          <div className="pf-container">
            <div className="row align-items-center g-5">
              {/* Image */}
              <div className="col-lg-5 pf-reveal">
                <div className="pf-about-img-wrap">
                  <div
                    className="pf-about-img"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/assets/generated/avatar-hero.dim_200x200.png"
                        alt="Alex Chen portrait"
                        style={{
                          width: 220,
                          height: 220,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid rgba(168,85,247,0.3)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="pf-about-badge">
                    <div style={{ fontSize: "1.5rem" }}>🏆</div>
                    <div>5+ Years</div>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: "0.7rem",
                        opacity: 0.85,
                      }}
                    >
                      Experience
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="col-lg-7 pf-reveal pf-reveal-delay-2">
                <span className="pf-eyebrow">About Me</span>
                <h2
                  className="pf-section-title"
                  style={{ textAlign: "left", margin: "0 0 16px" }}
                >
                  Crafting Digital
                  <br />
                  Excellence
                </h2>
                <p
                  style={{
                    color: "var(--pf-muted)",
                    lineHeight: 1.8,
                    marginBottom: 28,
                    fontSize: "0.95rem",
                  }}
                >
                  I'm a Senior Full-Stack Developer based in London with a
                  passion for building products that sit at the intersection of
                  engineering precision and beautiful design. I believe the best
                  software is invisible — it just works, delights users, and
                  scales effortlessly.
                </p>
                <p
                  style={{
                    color: "var(--pf-muted)",
                    lineHeight: 1.8,
                    marginBottom: 32,
                    fontSize: "0.95rem",
                  }}
                >
                  When I'm not shipping code, I'm writing about web architecture
                  on my blog, contributing to open-source projects, or mentoring
                  junior developers in my community.
                </p>

                {/* What I do */}
                <div style={{ marginBottom: 32 }}>
                  {[
                    {
                      icon: "bi-code-slash",
                      title: "Full-Stack Engineering",
                      desc: "End-to-end product development from architecture to deployment",
                    },
                    {
                      icon: "bi-phone",
                      title: "Mobile Development",
                      desc: "Cross-platform React Native apps with native performance",
                    },
                    {
                      icon: "bi-palette",
                      title: "UI/UX Design",
                      desc: "Figma-first design systems with pixel-perfect implementation",
                    },
                  ].map((item) => (
                    <div key={item.title} className="pf-what-item">
                      <div className="pf-what-icon">
                        <i className={`bi ${item.icon}`} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            marginBottom: 3,
                            color: "var(--pf-text)",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--pf-muted)",
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex gap-3 flex-wrap">
                  <button
                    type="button"
                    className="pf-btn-primary pf-btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                    data-ocid="about.primary_button"
                  >
                    <i className="bi bi-download" /> Download CV
                  </button>
                  <button
                    type="button"
                    className="pf-btn-outline pf-btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("portfolio");
                    }}
                    data-ocid="about.secondary_button"
                  >
                    <i className="bi bi-eye" /> View Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SKILLS ====== */}
        <section id="skills" className="pf-section">
          <div className="pf-container">
            <div className="text-center pf-reveal" style={{ marginBottom: 60 }}>
              <span className="pf-eyebrow">Technical Stack</span>
              <h2 className="pf-section-title">Core Expertise</h2>
              <div className="pf-divider" />
              <p className="pf-section-desc">
                Years of building production systems have sharpened these skills
                to a fine edge.
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                {SKILLS.slice(0, 5).map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    pct={s.pct}
                    delay={i * 100}
                  />
                ))}
              </div>
              <div className="col-md-6">
                {SKILLS.slice(5).map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    pct={s.pct}
                    delay={i * 100 + 50}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== RESUME / TIMELINE ====== */}
        <section id="resume" className="pf-section">
          <div className="pf-container">
            <div className="text-center pf-reveal" style={{ marginBottom: 60 }}>
              <span className="pf-eyebrow">My Journey</span>
              <h2 className="pf-section-title">Resume</h2>
              <div className="pf-divider" />
            </div>
            <div className="pf-timeline">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.role}
                  className={`pf-timeline-item pf-reveal${i % 2 === 1 ? " right" : ""} pf-reveal-delay-${(i % 5) + 1}`}
                >
                  <div className="pf-timeline-dot" />
                  <div className="pf-timeline-card">
                    <div className="pf-timeline-date">
                      <i
                        className={`bi ${item.type === "work" ? "bi-briefcase" : "bi-mortarboard"}`}
                      />
                      {item.date}
                    </div>
                    <div className="pf-timeline-role">{item.role}</div>
                    <div className="pf-timeline-company">{item.company}</div>
                    <div className="pf-timeline-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PORTFOLIO ====== */}
        <section id="portfolio" className="pf-section">
          <div className="pf-container">
            <div className="text-center pf-reveal" style={{ marginBottom: 20 }}>
              <span className="pf-eyebrow">Selected Work</span>
              <h2 className="pf-section-title">Featured Projects</h2>
              <div className="pf-divider" />
            </div>

            {/* Filter bar */}
            <div className="pf-filter-bar pf-reveal">
              {["all", "web", "mobile", "design"].map((f) => (
                <button
                  type="button"
                  key={f}
                  className={`pf-filter-btn${portfolioFilter === f ? " active" : ""}`}
                  onClick={() => setPortfolioFilter(f)}
                  data-ocid={`portfolio.${f}.tab`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="row g-4">
              {filteredProjects.map((p, i) => (
                <div
                  key={p.id}
                  className={`col-md-6 col-lg-4 pf-reveal pf-reveal-delay-${(i % 3) + 1}`}
                >
                  <div
                    className="pf-project-card"
                    data-ocid={`portfolio.item.${i + 1}`}
                  >
                    {/* Thumbnail */}
                    <div
                      className="pf-project-thumb"
                      style={{ background: p.gradient }}
                    >
                      <div className="pf-project-overlay">
                        <div
                          style={{
                            fontWeight: 700,
                            color: "white",
                            fontSize: "0.95rem",
                          }}
                        >
                          {p.title}
                        </div>
                        <div className="d-flex gap-2">
                          {p.github && (
                            <a
                              href={p.github}
                              className="pf-btn-outline pf-btn-sm"
                              data-ocid={`portfolio.github.button.${i + 1}`}
                            >
                              <i className="bi bi-github" /> GitHub
                            </a>
                          )}
                          {p.live && (
                            <a
                              href={p.live}
                              className="pf-btn-primary pf-btn-sm"
                              data-ocid={`portfolio.live.button.${i + 1}`}
                            >
                              <i className="bi bi-box-arrow-up-right" /> Live
                            </a>
                          )}
                        </div>
                      </div>
                      {/* Category badge */}
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span
                          style={{
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: 50,
                            padding: "4px 12px",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "white",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="pf-project-body">
                      <h3 className="pf-project-title">{p.title}</h3>
                      <p className="pf-project-desc">{p.desc}</p>
                      <div>
                        {p.tags.map((tag) => (
                          <span key={tag} className="pf-tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div
                  className="col-12 text-center py-5"
                  data-ocid="portfolio.empty_state"
                >
                  <p style={{ color: "var(--pf-muted)" }}>
                    No projects in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section id="services" className="pf-section">
          <div className="pf-container">
            <div className="text-center pf-reveal" style={{ marginBottom: 60 }}>
              <span className="pf-eyebrow">What I Offer</span>
              <h2 className="pf-section-title">Services</h2>
              <div className="pf-divider" />
              <p className="pf-section-desc">
                End-to-end solutions crafted with precision, passion, and
                production-readiness.
              </p>
            </div>
            <div className="row g-4">
              {[
                {
                  icon: "bi-code-slash",
                  iconColor: "#A855F7",
                  title: "Web Development",
                  desc: "High-performance web applications built with React, Next.js, and Node.js. From MVPs to enterprise-grade platforms with scalable architectures.",
                  features: [
                    "React / Next.js",
                    "REST & GraphQL APIs",
                    "CI/CD Pipelines",
                    "Cloud Deployment",
                  ],
                },
                {
                  icon: "bi-phone",
                  iconColor: "#3B82F6",
                  title: "Mobile Apps",
                  desc: "Cross-platform mobile applications with React Native that look and feel native on both iOS and Android, with offline capabilities.",
                  features: [
                    "React Native",
                    "iOS & Android",
                    "Push Notifications",
                    "App Store Publishing",
                  ],
                },
                {
                  icon: "bi-palette",
                  iconColor: "#22D3EE",
                  title: "UI/UX Design",
                  desc: "Research-driven design systems and interfaces that convert. From wireframes to pixel-perfect Figma components ready for dev handoff.",
                  features: [
                    "Figma Design",
                    "Design Systems",
                    "Prototyping",
                    "Usability Testing",
                  ],
                },
              ].map((s, i) => (
                <div
                  key={s.title}
                  className={`col-lg-4 col-md-6 pf-reveal pf-reveal-delay-${i + 1}`}
                  data-ocid={`services.card.${i + 1}`}
                >
                  <div className="pf-service-card">
                    <div
                      className="pf-service-icon"
                      style={{ color: s.iconColor }}
                    >
                      <i className={`bi ${s.icon}`} />
                    </div>
                    <h3 className="pf-service-title">{s.title}</h3>
                    <p className="pf-service-desc">{s.desc}</p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        marginBottom: 20,
                      }}
                    >
                      {s.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--pf-muted)",
                            padding: "4px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <i
                            className="bi bi-check2"
                            style={{ color: "var(--pf-accent-1)" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="pf-link-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo("contact");
                      }}
                      data-ocid={`services.learn_more.button.${i + 1}`}
                    >
                      Learn More <i className="bi bi-arrow-right" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TESTIMONIALS ====== */}
        <section id="testimonials" className="pf-section">
          <div className="pf-container">
            <div className="text-center pf-reveal" style={{ marginBottom: 60 }}>
              <span className="pf-eyebrow">Kind Words</span>
              <h2 className="pf-section-title">Client Testimonials</h2>
              <div className="pf-divider" />
            </div>
            <div className="pf-reveal">
              <TestimonialsSlider />
            </div>
          </div>
        </section>

        {/* ====== FAQ + CONTACT ====== */}
        <section id="faq" className="pf-section">
          <div className="pf-container">
            <div className="row g-5">
              {/* FAQ */}
              <div className="col-lg-6 pf-reveal">
                <span className="pf-eyebrow">Quick Answers</span>
                <h2
                  className="pf-section-title"
                  style={{ textAlign: "left", fontSize: "2rem" }}
                >
                  Frequently Asked
                </h2>
                <div className="pf-divider" style={{ margin: "0 0 32px" }} />

                <div className="accordion" id="faqAccordion">
                  {FAQ.map((item, i) => (
                    <div key={item.q} className="accordion-item pf-faq-item">
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button pf-faq-btn${i !== 0 ? " collapsed" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-${i}`}
                          aria-expanded={i === 0 ? "true" : "false"}
                          data-ocid={`faq.toggle.${i + 1}`}
                        >
                          {item.q}
                        </button>
                      </h3>
                      <div
                        id={`faq-${i}`}
                        className={`accordion-collapse collapse${i === 0 ? " show" : ""}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body pf-faq-body">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="col-lg-6 pf-reveal pf-reveal-delay-2"
                id="contact"
              >
                <span className="pf-eyebrow">Let's Connect</span>
                <h2
                  className="pf-section-title"
                  style={{ textAlign: "left", fontSize: "2rem" }}
                >
                  Get in Touch
                </h2>
                <div className="pf-divider" style={{ margin: "0 0 32px" }} />

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="pf-form-group">
                        <label className="pf-form-label" htmlFor="contact-name">
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          className="form-control pf-form-input"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          data-ocid="contact.name.input"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="pf-form-group">
                        <label
                          className="pf-form-label"
                          htmlFor="contact-email"
                        >
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          className="form-control pf-form-input"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          required
                          data-ocid="contact.email.input"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="pf-form-group">
                        <label
                          className="pf-form-label"
                          htmlFor="contact-subject"
                        >
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          className="form-control pf-form-input"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              subject: e.target.value,
                            }))
                          }
                          data-ocid="contact.subject.input"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="pf-form-group">
                        <label
                          className="pf-form-label"
                          htmlFor="contact-message"
                        >
                          Message *
                        </label>
                        <textarea
                          id="contact-message"
                          className="form-control pf-form-input"
                          rows={5}
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          required
                          data-ocid="contact.message.textarea"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="pf-btn-primary w-100"
                        disabled={formLoading}
                        style={{ justifyContent: "center" }}
                        data-ocid="contact.submit_button"
                      >
                        {formLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            />{" "}
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send" /> Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Contact details */}
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {[
                    { icon: "bi-envelope", text: "hello@alexchen.dev" },
                    { icon: "bi-geo-alt", text: "London, United Kingdom" },
                    { icon: "bi-clock", text: "Mon–Fri, 9am–6pm GMT" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "rgba(168,85,247,0.1)",
                          border: "1px solid rgba(168,85,247,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--pf-accent-1)",
                          flexShrink: 0,
                        }}
                      >
                        <i className={`bi ${item.icon}`} />
                      </div>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--pf-muted)",
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="pf-footer">
        <div className="pf-container">
          <div className="row g-4">
            {/* Brand */}
            <div className="col-lg-4">
              <div className="pf-footer-brand">Alex.dev</div>
              <p className="pf-footer-text">
                Senior Full-Stack Developer crafting premium digital
                experiences. Available for freelance projects and full-time
                opportunities.
              </p>
              {/* Social */}
              <div style={{ marginTop: 20 }}>
                {[
                  { icon: "bi-github", href: "#", label: "GitHub" },
                  { icon: "bi-linkedin", href: "#", label: "LinkedIn" },
                  { icon: "bi-twitter-x", href: "#", label: "Twitter" },
                  { icon: "bi-instagram", href: "#", label: "Instagram" },
                  { icon: "bi-dribbble", href: "#", label: "Dribbble" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="pf-social-btn"
                    aria-label={s.label}
                    data-ocid={`footer.${s.label.toLowerCase()}.link`}
                  >
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="col-lg-2 col-md-4 col-6 pf-footer-links">
              <h6>Navigation</h6>
              {["Home", "About", "Skills", "Resume", "Portfolio"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.toLowerCase());
                  }}
                  data-ocid={`footer.nav.${l.toLowerCase()}.link`}
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="col-lg-2 col-md-4 col-6 pf-footer-links">
              <h6>Services</h6>
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "Consulting",
              ].map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("services");
                  }}
                  data-ocid="footer.services.link"
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="col-lg-4 col-md-4 pf-footer-links">
              <h6>Get in Touch</h6>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--pf-muted)",
                  lineHeight: 1.7,
                }}
              >
                <p style={{ marginBottom: 8 }}>
                  <i
                    className="bi bi-envelope me-2"
                    style={{ color: "var(--pf-accent-1)" }}
                  />
                  hello@alexchen.dev
                </p>
                <p style={{ marginBottom: 8 }}>
                  <i
                    className="bi bi-geo-alt me-2"
                    style={{ color: "var(--pf-accent-1)" }}
                  />
                  London, United Kingdom
                </p>
                <p style={{ marginBottom: 0 }}>
                  <i
                    className="bi bi-telephone me-2"
                    style={{ color: "var(--pf-accent-1)" }}
                  />
                  +44 20 7123 4567
                </p>
              </div>
            </div>
          </div>

          <div className="pf-footer-bottom d-flex justify-content-between flex-wrap gap-3">
            <span>
              © {new Date().getFullYear()} Alex Chen. All rights reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        type="button"
        className={`pf-scroll-top${showScrollTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        data-ocid="scroll_top.button"
      >
        <i className="bi bi-chevron-up" />
      </button>
    </>
  );
}
