import { useEffect, useRef, useState, useCallback } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════ */
const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return base + clean;
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    slug: "lidar-supervisory-detector",
    title: "2D LiDAR Supervisory Detector",
    desc: "Real-time supervisor that cross-checks OEM ADAS detections with 2D LiDAR evidence in RTMaps. C++ handles UART/TCP intake; a Python (NumPy + scikit-learn) pipeline cleans, clusters, and scores; OpenCV provides live viz and log replay.",
    tags: ["RTMaps", "Python", "C++", "scikit-learn", "NumPy", "OpenCV", "Real-time"],
    details: [
      "Stack: RTMaps graph; C++ RPLidar driver (UART/TCP); Python processing nodes; OpenCV UI.",
      "Flow: LiDAR frames → preprocessing → feature vectorization → clustering/classification → per-object confidence.",
      "Preprocessing: polar→Cartesian, range/quality gating, angular downsampling, ROI masks, light temporal smoothing.",
      "Features: segment span, point density, local curvature, and short-window motion cues.",
      "Decisioning: accept/flag/veto OEM proposals with tunable thresholds; JSON topics for downstream consumers.",
      "Tooling: YAML configs for extrinsics, ROIs, thresholds; CLI switch for live vs log replay.",
      "Validation: RTMaps log replay (HIL-style); sub-frame latency at native LiDAR rate; robust to clutter/noise.",
      "Deployment: runs on Linux (Raspberry Pi 4) under systemd with clean shutdown and auto-restart.",
    ],
    links: { repo: "https://github.com/kabeercheema/RPLidarC1-ObjectDetection" },
    hero: getAssetPath("images/projects/lidar.gif"),
  },
  {
    slug: "pi4-can-gateway",
    title: "Raspberry Pi 4 CAN Gateway",
    desc: "Linux-based Python gateway that reads physical switches and drives indicator lights via socketCAN. Uses DBC-driven encode/decode (cantools), multithreaded RX/TX with shared-state protection, GPIO control with change-detection, a comms watchdog that falls back to a flashing pattern, and graceful startup/shutdown.",
    tags: ["Linux", "Raspberry Pi", "Python", "Bash", "CAN", "Real-time"],
    details: [
      "Architecture: separate threads for CAN receive/transmit and GPIO, queue-backed handoff, and locking to avoid race conditions.",
      "Messaging: DBC-based encoding/decoding to keep signal names/type ranges consistent across components.",
      "I/O control: switch sampling and debounced state publishing; lights updated on change with support for off/on/flash.",
      "Health & safety: watchdog detects loss of traffic and switches lights to a visible fallback; normal behavior resumes automatically.",
      "Reliability: non-blocking I/O, send retries on transient errors, and service-oriented startup for repeatable boots.",
      "Ops: shell automation for setup, logging, and service lifecycle; clean shutdown that turns outputs off and releases hardware.",
    ],
    links: { repo: "https://github.com/kabeercheema/LightsNSwitches" },
    hero: getAssetPath("images/projects/raspi.jpeg"),
  },
  {
    slug: "buck-converter-pcbs",
    title: "Buck-Converter PCBs",
    desc: "LTspice simulation and Altium schematic/layout; efficiency/EMI + DFM optimization; assembly and bench bring-up for reliable vehicle power.",
    tags: ["LTspice", "Altium", "DFM", "Testing"],
    details: [
      "Simulated power stage and control in LTspice; verified stability and thermal limits.",
      "Completed Altium schematic/layout with attention to loops, planes, and EMI.",
      "Assembled and bench-tested with load steps; documented bring-up procedure.",
    ],
    links: {},
    hero: getAssetPath("images/projects/buck.png"),
  },
  {
    slug: "sensor-fusion-radar-camera",
    title: "Radar + Camera Sensor Fusion",
    desc: "Fusion modeled in Simulink/MATLAB with RTMaps + Python ingest/replay; improved object-tracking accuracy by 85% for ADAS perception.",
    tags: ["Simulink", "MATLAB", "RTMaps", "Python", "Perception"],
    details: [
      "Modeled fusion primitives and data association in Simulink; evaluated with recorded datasets.",
      "RTMaps handled synchronized ingest/replay of radar/camera; Python tooling for metrics.",
      "Demonstrated +85% tracking accuracy improvement against baseline.",
    ],
    links: {},
    hero: "",
  },
  {
    slug: "rc-f1-firmware",
    title: "RC F1 Car Firmware",
    desc: "Embedded C++ (Arduino) non-blocking control loop; receiver decode → ESC/servo PWM with calibration, deadbands, smoothing; safety modes and diagnostics.",
    tags: ["Embedded C++", "Arduino", "PWM", "Control"],
    details: [
      "Non-blocking loop with timer interrupts; safety modes for arm/disarm/fault.",
      "Receiver decoding and normalized PWM output to ESC and steering servo.",
      "LED/serial diagnostics; wiring diagram and BOM for maintainability.",
    ],
    links: { repo: "https://github.com/kabeercheema/RC-F1-Car-Firmware" },
    hero: "",
  },
];

const EXPERIENCE = [
  {
    role: "Connected & Autonomous Vehicles Lead",
    company: "UWaterloo EcoCAR",
    period: "May 2025 – Present",
    bullets: [
      "Deployed a Raspberry Pi 4 CAN gateway on Linux with Bash automation and Python multithreading for low-latency, real-time control; validated via HIL.",
      "Built a 2D LiDAR supervisory detector in RTMaps + Python with C++ UART/TCP I/O; used scikit-learn + NumPy with OpenCV visualization.",
      "Designed radar + camera sensor fusion in Simulink/MATLAB with RTMaps + Python; improved tracking accuracy by 85%.",
    ],
  },
  {
    role: "Software QA Engineer",
    company: "i4i",
    period: "Jan 2024 – Dec 2024",
    bullets: [
      "Built a Python/XSLT tool to convert Excel metadata into Word, increasing team productivity by ~90%.",
      "Led functional, regression, and performance test cycles; coordinated QA contributors across releases.",
      "Authored release notes and validation documents aligned with FDA/Health Canada guidelines.",
    ],
  },
];

const SKILL_CATEGORIES = [
  { label: "Languages", items: ["C/C++", "Python", "Bash"] },
  { label: "Libraries & Frameworks", items: ["NumPy", "pandas", "scikit-learn", "OpenCV", "RTMaps"] },
  { label: "Systems & Infrastructure", items: ["Linux", "systemd", "Multithreading"] },
  { label: "Simulation & CAD", items: ["MATLAB/Simulink", "Altium Designer", "LTspice", "SolidWorks"] },
  { label: "Dev & Workflow", items: ["Git", "Jira"] },
];

const HERO_PHRASES = [
  "real-time embedded systems",
  "robotics perception pipelines",
  "sensor fusion algorithms",
  "reliable automotive firmware",
  "hardware–software integrations",
];

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function useTypingEffect(phrases, speed = 80, delSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIdx((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      deleting ? delSpeed : speed
    );
    return () => clearTimeout(timer);
  }, [text, deleting, idx, phrases, speed, delSpeed, pause]);

  return text;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

/* ═══════════════════════════════════════════════════════════════
   REVEAL WRAPPER
   ═══════════════════════════════════════════════════════════════ */
function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${transforms[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      return s ? s === "dark" : true;
    } catch { return true; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark((d) => !d)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar({ isDark, toggleTheme }) {
  const scrollY = useScrollY();
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrolled = scrollY > 40;

  const goToSection = useCallback(
    (id) => {
      const base = import.meta.env.BASE_URL || "/";
      const onHome =
        window.location.pathname === base ||
        window.location.pathname === base.replace(/\/$/, "");

      if (onHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      setMenuOpen(false);
    },
    [navigate]
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-8 h-16">
          {/* Logo */}
          <button
            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            kabeer<span className="text-emerald-500">.</span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goToSection(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    active === item.id
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href={getAssetPath("resume.pdf")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-colors"
            >
              <DownloadIcon />
              Resume
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="text-2xl font-display font-semibold py-3 px-8 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={getAssetPath("resume.pdf")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-neutral-950 font-semibold text-lg hover:bg-emerald-400 transition-colors"
            >
              <DownloadIcon /> Resume
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════ */
function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const typed = useTypingEffect(HERO_PHRASES, 70, 35, 2200);

  return (
    <section id="about" className="relative min-h-screen flex items-center scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-60 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-100" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pt-28 pb-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to Opportunities
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="font-mono text-sm text-neutral-500 dark:text-neutral-500 mb-3">
            Hi, my name is
          </p>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95]">
            Kabeer
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
              Cheema
            </span>
          </h1>
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-6 sm:mt-8 h-8 sm:h-10">
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-neutral-600 dark:text-neutral-400">
              I build{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {typed}
              </span>
              <span className="inline-block w-0.5 h-5 sm:h-6 bg-emerald-500 ml-0.5 align-middle animate-typing-cursor" />
            </p>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Aspiring{" "}
            <span className="text-neutral-800 dark:text-neutral-200 font-medium">
              embedded &amp; robotics engineer
            </span>{" "}
            studying Mechatronics Engineering at the University of Waterloo. Passionate about real-time
            systems, sensor fusion, and reliable hardware–software integration — from firmware to
            deployment on Linux &amp; microcontrollers.
          </p>
        </Reveal>

        <Reveal delay={650}>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              View My Work
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <a
              href={getAssetPath("resume.pdf")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-sm font-medium transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <Reveal delay={900} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28 scroll-mt-20">
      <Reveal>
        <SectionLabel number="01" label="PROJECTS" />
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Featured Projects
          </h2>
          <a
            href="https://github.com/kabeercheema"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-mono text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            View GitHub
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </a>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 overflow-hidden h-full"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {project.hero ? (
          <img
            src={project.hero}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
            <span className="font-mono text-3xl text-neutral-300 dark:text-neutral-700">&lt;/&gt;</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-2 py-1 rounded-md">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-semibold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
            >
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2.5 transition-all">
            View Details
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 scroll-mt-20">
      <Reveal>
        <SectionLabel number="02" label="EXPERIENCE" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
          Professional Experience
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 h-full hover:border-emerald-500/30 transition-colors duration-300">
              {/* Accent bar */}
              <div className="absolute top-0 left-6 sm:left-8 right-6 sm:right-8 h-px bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-5">
                <div>
                  <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap mt-1 sm:mt-1">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-3">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS
   ═══════════════════════════════════════════════════════════════ */
function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 scroll-mt-20">
      <Reveal>
        <SectionLabel number="03" label="TECH STACK" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
          Technical Arsenal
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.label} delay={i * 80}>
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 font-medium hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 scroll-mt-20">
      <Reveal>
        <SectionLabel number="04" label="CONTACT" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
          Let's Connect
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900/60 dark:to-neutral-900/40 p-8 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I'm open to{" "}
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                internship opportunities
              </span>{" "}
              and{" "}
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                collaborations
              </span>{" "}
              across any field where I can apply my problem-solving skills and passion for technology.
            </p>
            <p className="mt-3 font-mono text-sm text-neutral-500 dark:text-neutral-500">
              {">"} Whether it's embedded systems, robotics, or automotive — let's talk.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:ks4cheem@uwaterloo.ca"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              <MailIcon />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/kabeer-cheema-b32238288/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="https://github.com/kabeercheema"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-600">
        <span className="font-mono">
          © {new Date().getFullYear()} Kabeer Cheema
        </span>
        <span className="font-mono">
          Built with React + Tailwind CSS
        </span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL PAGE
   ═══════════════════════════════════════════════════════════════ */
function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-32 pb-20 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Project not found</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500/50 text-sm font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-28 pb-20">
      {/* Back */}
      <Reveal>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
      </Reveal>

      {/* Tags */}
      <Reveal delay={50}>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Title */}
      <Reveal delay={100}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight">
          {project.title}
        </h1>
        <div className="mt-4 w-16 h-0.5 bg-emerald-500" />
      </Reveal>

      {/* Hero image */}
      {project.hero && (
        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <img
              src={project.hero}
              alt={`${project.title} preview`}
              className="w-full h-auto object-cover"
            />
          </div>
        </Reveal>
      )}

      {/* Overview */}
      <Reveal delay={300}>
        <div className="mt-10">
          <h2 className="font-display font-semibold text-xl mb-4 text-neutral-800 dark:text-neutral-200">
            Overview
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base sm:text-lg">
            {project.desc}
          </p>
        </div>
      </Reveal>

      {/* Key Highlights */}
      {project.details?.length > 0 && (
        <div className="mt-12">
          <Reveal>
            <h2 className="font-display font-semibold text-xl mb-6 text-neutral-800 dark:text-neutral-200">
              Key Highlights
            </h2>
          </Reveal>
          <div className="space-y-3">
            {project.details.map((d, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
                  <span className="flex-shrink-0 font-mono text-sm font-bold text-emerald-500/70 mt-0.5 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Repo link */}
      {project.links?.repo && (
        <Reveal delay={200}>
          <div className="mt-12">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              <GitHubIcon />
              View Repository
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
            </a>
          </div>
        </Reveal>
      )}

      {/* Bottom nav */}
      <Reveal delay={100}>
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Projects
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UI COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {number}
      </span>
      <div className="w-8 h-px bg-neutral-300 dark:bg-neutral-700" />
      <span className="font-mono text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

/* ─── Icons ─── */
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.64 5.64l1.41 1.41m9.9 9.9l1.41 1.41m0-12.72-1.41 1.41m-9.9 9.9-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
