import { useEffect, useRef, useState, useCallback } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return base + clean;
};

const PROJECTS = [
  {
    slug: "lidar-supervisory-detector",
    title: "2D LiDAR Supervisory Detector",
    desc: "Real-time supervisor that cross-checks OEM ADAS detections with 2D LiDAR evidence in RTMaps. C++ handles UART/TCP intake; a Python (NumPy + scikit-learn) pipeline cleans, clusters, and scores; OpenCV provides live viz and log replay.",
    tags: ["RTMaps", "Python", "C++", "scikit-learn", "NumPy", "OpenCV", "Real-time"],
    details: [
      "Stack: RTMaps graph; C++ RPLidar driver (UART/TCP); Python processing nodes; OpenCV UI.",
      "Flow: LiDAR frames -> preprocessing -> feature vectorization -> clustering/classification -> per-object confidence.",
      "Preprocessing: polar->Cartesian, range/quality gating, angular downsampling, ROI masks, light temporal smoothing.",
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
    desc: "Embedded C++ (Arduino) non-blocking control loop; receiver decode -> ESC/servo PWM with calibration, deadbands, smoothing; safety modes and diagnostics.",
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
    period: "May 2025 - Present",
    bullets: [
      "Deployed a Raspberry Pi 4 CAN gateway on Linux with Bash automation and Python multithreading for low-latency, real-time control; validated via HIL.",
      "Built a 2D LiDAR supervisory detector in RTMaps + Python with C++ UART/TCP I/O; used scikit-learn + NumPy with OpenCV visualization.",
      "Designed radar + camera sensor fusion in Simulink/MATLAB with RTMaps + Python; improved tracking accuracy by 85%.",
    ],
  },
  {
    role: "Software QA Engineer",
    company: "i4i",
    period: "Jan 2024 - Dec 2024",
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
  "hardware-software integrations",
];

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const HERO_METRICS = [
  { value: "+85%", label: "Tracking accuracy uplift" },
  { value: "Linux + CAN", label: "Production-style systems" },
  { value: "HIL", label: "Validation workflow" },
];

const CONTAINER = "mx-auto max-w-6xl px-5 sm:px-8";

function useInView(options) {
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
  }, [options]);

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
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}

function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
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

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      return s ? s === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // no-op: storage can be unavailable in private contexts
    }
  }, [isDark]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark((d) => !d)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Navbar({ isDark, toggleTheme }) {
  const scrollY = useScrollY();
  const active = useActiveSection(NAV_SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrolled = scrollY > 28;

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
        }, 140);
      }

      setMenuOpen(false);
    },
    [navigate]
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/90 bg-slate-50/88 shadow-sm backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/88"
            : "bg-transparent"
        }`}
      >
        <nav className={`${CONTAINER} flex h-16 items-center justify-between`}>
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-md px-1 py-0.5 font-display text-lg font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80 dark:text-slate-100"
          >
            kabeer<span className="text-cyan-500">.</span>
          </button>

          <ul className="hidden items-center gap-1.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goToSection(item.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active === item.id
                      ? "bg-cyan-500/12 text-cyan-700 dark:text-cyan-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg border border-transparent p-2 text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href={getAssetPath("resume.pdf")}
              className="hidden items-center gap-1.5 rounded-lg border border-cyan-500/40 px-3.5 py-1.5 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-500/10 dark:text-cyan-300 sm:inline-flex"
            >
              <DownloadIcon />
              Resume
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:hidden"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-xl dark:bg-slate-950/95 md:hidden">
          <nav className="flex h-full flex-col items-center justify-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="rounded-xl px-8 py-3 text-2xl font-display font-semibold tracking-tight text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {item.label}
              </button>
            ))}
            <a
              href={getAssetPath("resume.pdf")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-lg font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <DownloadIcon /> Resume
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <main className={`${CONTAINER} pb-24`}>
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}

function Hero() {
  const typed = useTypingEffect(HERO_PHRASES, 70, 35, 2200);

  return (
    <section id="about" className="relative scroll-mt-20 border-b border-slate-200/80 pt-28 pb-20 dark:border-slate-800/80 md:pt-36 md:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className={`${CONTAINER} relative`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <Reveal>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
                Mechatronics Engineering Portfolio
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
                Embedded, Robotics, and Real-Time Systems Engineering.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                I am Kabeer Cheema, a Mechatronics Engineering student at the University of Waterloo focused on
                building dependable hardware-software systems for autonomous and embedded applications.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 font-mono text-sm text-slate-500 dark:text-slate-400">
                Current focus: <span className="font-semibold text-cyan-700 dark:text-cyan-300">{typed}</span>
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-typing-cursor bg-cyan-500 align-middle" />
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  View Projects
                </CTAButton>
                <CTAButton href={getAssetPath("resume.pdf")} variant="secondary" icon={<DownloadIcon />}>
                  Download Resume
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Engineering Highlights
              </p>
              <div className="space-y-4">
                {HERO_METRICS.map((item) => (
                  <div key={item.label} className="border-l-2 border-cyan-500/60 pl-3">
                    <p className="text-xl font-display font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {item.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 py-16 md:py-20">
      <Reveal>
        <SectionHeader
          number="01"
          label="Projects"
          title="Featured Engineering Projects"
          description="Selected work across embedded software, sensor fusion, robotics perception, and hardware integration."
          action={
            <a
              href="https://github.com/kabeercheema"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-300/90 px-3 py-1.5 text-xs font-mono uppercase tracking-wide text-slate-600 transition-colors hover:border-cyan-500/50 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-cyan-300"
            >
              View GitHub
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          }
        />
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className={index === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} index={index} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="02"
          label="Experience"
          title="Professional Experience"
          description="Hands-on delivery in autonomous systems and regulated software environments."
        />
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={`${exp.company}-${exp.role}`} delay={i * 90}>
            <ExperienceItem experience={exp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="03"
          label="Tech Stack"
          title="Technical Capabilities"
          description="Tools and technologies used across firmware, modeling, validation, and deployment."
        />
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.label} delay={i * 60}>
            <div className="h-full rounded-2xl border border-slate-200/90 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{cat.label}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <SkillBadge key={skill}>{skill}</SkillBadge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="04"
          label="Contact"
          title="Open to Internships and Engineering Collaboration"
          description="Whether the challenge is embedded systems, robotics, or automotive software, I am ready to contribute and learn quickly."
        />
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white/90 p-7 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                I am open to <span className="font-semibold text-slate-900 dark:text-slate-100">internship opportunities</span> and
                <span className="font-semibold text-slate-900 dark:text-slate-100"> collaborations</span> across any field where I can apply my
                problem-solving skills and passion for technology.
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Embedded systems / robotics / automotive
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <CTAButton href="mailto:ks4cheem@uwaterloo.ca" icon={<MailIcon />}>
                Email Me
              </CTAButton>
              <CTAButton
                href="https://www.linkedin.com/in/kabeer-cheema-b32238288/"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                icon={<LinkedInIcon />}
              >
                LinkedIn
              </CTAButton>
              <CTAButton
                href="https://github.com/kabeercheema"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                icon={<GitHubIcon />}
              >
                GitHub
              </CTAButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800">
      <div className={`${CONTAINER} flex flex-col items-center justify-between gap-3 py-7 text-xs text-slate-500 dark:text-slate-400 sm:flex-row`}>
        <span className="font-mono">© {new Date().getFullYear()} Kabeer Cheema</span>
        <span className="font-mono">Built with React + Tailwind CSS</span>
      </div>
    </footer>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className={`${CONTAINER} pt-32 pb-20 text-center`}>
        <h1 className="mb-4 font-display text-3xl font-bold">Project not found</h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">The project you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:border-cyan-500/50 dark:border-slate-700"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 pb-20 sm:px-8">
      <Reveal>
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-mono text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Projects
        </Link>
      </Reveal>

      <Reveal delay={50}>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
          {project.title}
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-cyan-500" />
      </Reveal>

      {project.hero && (
        <Reveal delay={180}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img src={project.hero} alt={`${project.title} preview`} className="h-auto w-full object-cover" />
          </div>
        </Reveal>
      )}

      <Reveal delay={260}>
        <div className="mt-9">
          <h2 className="mb-3 font-display text-xl font-semibold">Overview</h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.desc}</p>
        </div>
      </Reveal>

      {project.details?.length > 0 && (
        <div className="mt-10 space-y-3">
          <Reveal>
            <h2 className="mb-4 font-display text-xl font-semibold">Key Highlights</h2>
          </Reveal>

          {project.details.map((detail, i) => (
            <Reveal key={detail} delay={i * 45}>
              <div className="flex gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <span className="mt-0.5 w-6 flex-shrink-0 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {project.links?.repo && (
        <Reveal delay={180}>
          <div className="mt-10">
            <CTAButton href={project.links.repo} target="_blank" rel="noreferrer" icon={<GitHubIcon />}>
              View Repository
            </CTAButton>
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="mt-14 border-t border-slate-200 pt-7 dark:border-slate-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Projects
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

function SectionHeader({ number, label, title, description, action }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">{number}</span>
        <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl md:text-4xl">{title}</h2>
          {description ? <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, featured = false }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20"
    >
      <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${featured ? "aspect-[16/8]" : "aspect-video"}`}>
        {project.hero ? (
          <img src={project.hero} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-3xl text-slate-300 dark:text-slate-600">&lt;/&gt;</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md border border-slate-300/80 bg-white/80 px-2 py-0.5 font-mono text-[11px] text-slate-500 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/85 dark:text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {featured ? (
          <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400">Featured Project</span>
        ) : null}
        <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-300">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
          {project.tags.length > 4 ? (
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              +{project.tags.length - 4}
            </span>
          ) : null}
        </div>

        <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 transition-all group-hover:gap-2.5 dark:text-cyan-300">
            View Details
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ExperienceItem({ experience }) {
  return (
    <article className="h-full rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm shadow-slate-200/50 transition-colors hover:border-cyan-500/35 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-7">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{experience.role}</h3>
          <p className="mt-0.5 text-sm font-medium text-cyan-700 dark:text-cyan-300">{experience.company}</p>
        </div>
        <span className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{experience.period}</span>
      </div>

      <ul className="space-y-3">
        {experience.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SkillBadge({ children }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 transition-colors hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-300">
      {children}
    </span>
  );
}

function CTAButton({ children, href, onClick, variant = "primary", icon, className = "", ...rest }) {
  const base = "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all";
  const variants = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm shadow-cyan-500/20",
    secondary:
      "border border-slate-300 bg-transparent text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}

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

function ArrowRightIcon({ className = "" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  );
}
