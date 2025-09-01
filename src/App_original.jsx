// ====== src/App.jsx ======
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

// ---- Project data (unchanged content) ----
const PROJECTS = [
  {
    slug: "lidar-supervisory-detector",
    title: "2D LiDAR Supervisory Detector",
    desc:
      "Real-time supervisor that cross-checks OEM ADAS detections with 2D LiDAR evidence in RTMaps on Linux (RPi 4). C++ handles UART/TCP intake; a Python (NumPy + scikit-learn) pipeline cleans, clusters, and scores; OpenCV provides live viz and log replay.",
    tags: ["RTMaps", "Python", "C++", "scikit-learn", "NumPy", "OpenCV", "Real-time"],
    details: [
      "Stack: RTMaps graph; C++ RPLidar driver (UART/TCP); Python processing nodes; OpenCV UI.",
      "Flow: LiDAR frames → preprocessing → feature vectorization → clustering/classification → per-object confidence.",
      "Preprocessing: polar→Cartesian, range/quality gating, angular downsampling, ROI masks, light temporal smoothing.",
      "Features: segment span, point density, local curvature, and short-window motion cues.",
      "Decisioning: accept/flag/veto OEM proposals with tunable thresholds; JSON topics for downstream consumers.",
      "Tooling: YAML configs for extrinsics, ROIs, thresholds; CLI switch for live vs log replay.",
      "Validation: RTMaps log replay (HIL-style); sub-frame latency at native LiDAR rate; robust to clutter/noise.",
      "Deployment: runs on Linux (Raspberry Pi 4) under systemd with clean shutdown and auto-restart."
    ],
    links: { repo: "https://github.com/kabeercheema/RPLidarC1-ObjectDetection" },
    hero: "/images/projects/lidar.gif",
  },

  {
    slug: "pi4-can-gateway",
    title: "Raspberry Pi 4 CAN Gateway",
    desc:
      "Linux-based Python gateway that reads physical switches and drives indicator lights via socketCAN. Uses DBC-driven encode/decode (cantools), multithreaded RX/TX with shared-state protection, GPIO control with change-detection, a comms watchdog that falls back to a flashing pattern, and graceful startup/shutdown.",
    tags: ["Linux", "Raspberry Pi", "Python", "Bash", "CAN", "Real-time"],
    details: [
      "Architecture: separate threads for CAN receive/transmit and GPIO, queue-backed handoff, and locking to avoid race conditions.",
      "Messaging: DBC-based encoding/decoding to keep signal names/type ranges consistent across components.",
      "I/O control: switch sampling and debounced state publishing; lights updated on change with support for off/on/flash.",
      "Health & safety: watchdog detects loss of traffic and switches lights to a visible fallback; normal behavior resumes automatically.",
      "Reliability: non-blocking I/O, send retries on transient errors, and service-oriented startup for repeatable boots.",
      "Ops: shell automation for setup, logging, and service lifecycle; clean shutdown that turns outputs off and releases hardware."
    ],
    links: { repo: "https://github.com/kabeercheema" },
    hero: "/images/projects/raspi.jpeg",
  },

  {
    slug: "buck-converter-pcbs",
    title: "Buck-Converter PCBs",
    desc:
      "LTspice simulation and Altium schematic/layout; efficiency/EMI + DFM optimization; assembly and bench bring-up for reliable vehicle power.",
    tags: ["LTspice", "Altium", "DFM", "Testing"],
    details: [
      "Simulated power stage and control in LTspice; verified stability and thermal limits.",
      "Completed Altium schematic/layout with attention to loops, planes, and EMI.",
      "Assembled and bench-tested with load steps; documented bring-up procedure.",
    ],
    links: {},
    hero: "/images/projects/buck.png",
  },

  {
    slug: "sensor-fusion-radar-camera",
    title: "Radar + Camera Sensor Fusion",
    desc:
      "Fusion modeled in Simulink/MATLAB with RTMaps + Python ingest/replay; improved object-tracking accuracy by 85% for ADAS perception.",
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
    desc:
      "Embedded C++ (Arduino) non-blocking control loop; receiver decode → ESC/servo PWM with calibration, deadbands, smoothing; safety modes and diagnostics.",
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

const SKILLS = [
  "C/C++", "Python", "Bash", "Linux", "systemd", "RTMaps",
  "MATLAB/Simulink", "NumPy", "pandas", "scikit-learn",
  "OpenCV", "Multithreading", "Git", "Jira",
  "Altium Designer", "LTspice", "SolidWorks",
];

// ===== App Shell with Sidebar =====
export default function App() {
  // default to dark mode (can be toggled and persisted)
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      return stored ? stored === "dark" : true;
    } catch {
      return true;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const toggleTheme = () => setIsDark((d) => !d);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-slate-800 dark:text-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl animate-float"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-pink-400/10 to-orange-400/10 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Grid shell: sidebar + content */}
        <div className="grid lg:grid-cols-[280px,1fr] gap-8 animate-fade-in">
          <Sidebar
            isDark={isDark}
            toggleTheme={toggleTheme}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            year={year}
          />

          <main className="rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-5 sm:p-8 lg:p-12">
              <Routes>
                <Route path="/" element={<Home projects={PROJECTS} skills={SKILLS} />} />
                <Route path="/projects/:slug" element={<ProjectDetails projects={PROJECTS} />} />
              </Routes>
            </div>

            <footer className="border-t border-white/20 dark:border-slate-700/50 px-5 sm:px-8 lg:px-12 py-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between backdrop-blur-sm">
              <span className="font-mono">© {year} Kabeer Cheema</span>
              <span className="hidden sm:inline animate-pulse">Built with React + Tailwind ✨</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

// ===== Sidebar =====
function Sidebar({ isDark, toggleTheme, menuOpen, setMenuOpen, year }) {
  const NavLink = ({ label, href, delay = 0 }) => (
    <a
      href={href}
      className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 dark:hover:from-indigo-400/10 dark:hover:to-purple-400/10 transition-all duration-300 transform hover:scale-105 animate-slide-right"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </a>
  );

  return (
    <aside className="lg:sticky lg:top-10 self-start animate-slide-right">
      {/* Card */}
      <div className="rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/20 dark:border-slate-700/50 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="animate-slide-up">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Kabeer Cheema
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">
                &lt; Embedded &amp; Robotics Engineer /&gt;
              </p>
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-2xl border border-white/30 dark:border-slate-600 p-3 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-300 transform hover:scale-110 hover:rotate-180 animate-bounce-subtle"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="p-4 sm:p-6">
          <nav className="flex flex-col space-y-2">
            <NavLink label="🚀 Projects" href="/#projects" delay={100} />
            <NavLink label="💼 Experience" href="/#experience" delay={200} />
            <NavLink label="🛠️ Skills" href="/#skills" delay={300} />
            <NavLink label="📧 Contact" href="/#contact" delay={400} />
          </nav>
        </div>

        {/* Actions */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <a
            href="/resume.pdf"
            className="w-full flex items-center justify-center gap-2 text-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-glow"
          >
            <span>📄</span>
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="lg:hidden mt-6 text-xs text-slate-500 dark:text-slate-400 text-center font-mono animate-fade-in">
        © {year} • Made with ❤️
      </div>
    </aside>
  );
}

// ===== Home =====
function Home({ projects, skills }) {
  return (
    <>
      {/* Hero */}
      <section id="home" className="mb-10">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600/15 via-sky-500/10 to-emerald-500/10 dark:from-indigo-400/10 dark:via-sky-400/10 dark:to-emerald-400/10 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Embedded • Robotics • Automotive
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
          Kabeer Cheema
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl text-sm sm:text-base">
            I’m an embedded & robotics engineer focused on real-time systems and reliable hardware–software
            integration. I design end-to-end solutions, from sensor bring-up and firmware to algorithms and
            deployment on Linux/Raspberry Pi and microcontrollers. Toolkit: C/C++, Python, MATLAB/Simulink;
            comms: CAN, SPI, UART, TCP/IP.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#projects" className="rounded-2xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[.99] text-sm">
              See Projects
            </a>
            <a href="mailto:ks4cheem@uwaterloo.ca" className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">
              Email Me
            </a>
            <a href="/resume.pdf" className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mb-12">
        <SectionHeading title="Projects" ctaHref="https://github.com/kabeercheema" ctaLabel="View GitHub →" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur hover:shadow-md transition"
            >
              {p.hero && (
                <img
                  src={p.hero}
                  alt={`${p.title} preview`}
                  className="aspect-video w-full object-cover rounded-t-2xl border-b border-slate-200/60 dark:border-slate-800/60"
                />
              )}
              <div className="p-4">
                <h3 className="font-medium text-base">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-3">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] rounded-full border border-slate-300/60 dark:border-slate-700 px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-sm inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Details <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-12">
        <SectionHeading title="Experience" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="UWAFT — Connected & Autonomous Vehicles Lead" meta="May 2025 – Present">
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li>Deployed a Raspberry Pi 4 CAN gateway on Linux with Bash automation and Python multithreading for low-latency, real-time control; validated via HIL.</li>
              <li>Built a 2D LiDAR supervisory detector in RTMaps + Python with C++ UART/TCP I/O; used scikit-learn + NumPy with OpenCV visualization.</li>
              <li>Designed radar + camera sensor fusion in Simulink/MATLAB with RTMaps + Python; improved tracking accuracy by 85%.</li>
            </ul>
          </Card>
          <Card title="i4i — Software QA Engineer" meta="Jan 2024 – Dec 2024">
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li>Built a Python/XSLT tool to convert Excel metadata into Word, increasing team productivity by ~90%.</li>
              <li>Led functional, regression, and performance test cycles; coordinated QA contributors across releases.</li>
              <li>Authored release notes and validation documents aligned with FDA/Health Canada guidelines.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mb-12">
        <SectionHeading title="Skills" />
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-slate-300/60 dark:border-slate-700 px-3 py-1 text-sm">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <SectionHeading title="Contact" />
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <p className="text-slate-700 dark:text-slate-300">
            I’m open to internships and collaborations in automotive perception, embedded systems, and robotics. The fastest way to reach me is email.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:ks4cheem@uwaterloo.ca" className="rounded-2xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500">Email</a>
            <a href="https://www.linkedin.com/in/kabeer-cheema-b32238288/" className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">LinkedIn</a>
            <a href="https://github.com/kabeercheema" className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ===== Project Details =====
function ProjectDetails({ projects }) {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">Project not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">The project you’re looking for doesn’t exist.</p>
        <Link to="/" className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">Back to Home</Link>
      </section>
    );
  }

  return (
    <section>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/#projects" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">← Back to Projects</Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Project</p>
        <h1 className="text-2xl md:text-3xl font-semibold mt-1">{project.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-[11px] rounded-full border border-slate-300/60 dark:border-slate-700 px-2 py-0.5">{t}</span>
          ))}
        </div>
      </div>

      {/* Hero image (only if provided) */}
      {project.hero && (
        <div className="mb-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <img src={project.hero} alt={`${project.title} preview`} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Overview */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p className="!mt-2">{project.desc}</p>
      </div>

      {/* Highlights */}
      {project.details && project.details.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {project.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Links (only if present) */}
      {project.links && project.links.repo && (
        <div className="mt-8">
          <a
            href={project.links.repo}
            className="rounded-2xl px-4 py-2 border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            target="_blank"
            rel="noreferrer"
          >
            View Repository
          </a>
        </div>
      )}
    </section>
  );
}

// ===== Reusable UI bits =====
function SectionHeading({ title, ctaHref, ctaLabel }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      {ctaHref && ctaLabel && (
        <a href={ctaHref} className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

function Card({ title, meta, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur p-5 hover:shadow-md transition">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h3 className="font-medium">{title}</h3>
        {meta && <span className="text-xs text-slate-500 dark:text-slate-400">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

// Minimal inline icons
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.64 5.64l1.41 1.41m9.9 9.9l1.41 1.41m0-12.72-1.41 1.41m-9.9 9.9-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
