// ====== src/App.jsx ======
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

// ---- Utility function for asset paths ----
const getAssetPath = (path) => {
  // Get base URL from import.meta.env (Vite environment variable)
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path and combine with base
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base + cleanPath;
};

// ---- Project data (unchanged content) ----
const PROJECTS = [
  {
    slug: "lidar-supervisory-detector",
    title: "2D LiDAR Supervisory Detector",
    desc:
      "Real-time supervisor that cross-checks OEM ADAS detections with 2D LiDAR evidence in RTMaps. C++ handles UART/TCP intake; a Python (NumPy + scikit-learn) pipeline cleans, clusters, and scores; OpenCV provides live viz and log replay.",
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
    hero: getAssetPath("images/projects/lidar.gif"),
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
    links: { repo: "https://github.com/kabeercheema/LightsNSwitches" },
    hero: getAssetPath("images/projects/raspi.jpeg"),
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
    hero: getAssetPath("images/projects/buck.png"),
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
              <span className="font-mono">Kabeer Cheema</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

// ===== Sidebar =====
function Sidebar({ isDark, toggleTheme, menuOpen, setMenuOpen, year }) {
  const NavLink = ({ label, href, delay = 0 }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Get the base URL
      const baseUrl = import.meta.env.BASE_URL || '/';
      const currentPath = window.location.pathname;
      
      // If we're on a project page, navigate to home first
      if (currentPath !== baseUrl) {
        window.location.href = baseUrl;
        // Wait a bit for navigation, then scroll to section
        setTimeout(() => {
          const targetId = href.replace('/#', '');
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // We're already on home page, just scroll to section
        const targetId = href.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const handleTouchStart = (e) => {
      // Prevent default to avoid conflicts with hover states on mobile
      e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    };

    const handleTouchEnd = (e) => {
      setTimeout(() => {
        e.currentTarget.style.backgroundColor = '';
      }, 150);
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 dark:hover:from-indigo-400/10 dark:hover:to-purple-400/10 transition-colors duration-200 cursor-pointer select-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <span className="text-sm font-medium">{label}</span>
        <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowIcon />
        </span>
      </a>
    );
  };

  return (
    <aside className="lg:sticky lg:top-10 self-start">
      {/* Card */}
      <div className="rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/20 dark:border-slate-700/50 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div>
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
              className="rounded-2xl border border-white/30 dark:border-slate-600 p-3 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-colors duration-200"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="p-4 sm:p-6">
          <nav className="flex flex-col space-y-2">
            <NavLink label="🚀 Projects" href="/#projects" />
            <NavLink label="💼 Experience" href="/#experience" />
            <NavLink label="🛠️ Skills" href="/#skills" />
            <NavLink label="📧 Contact" href="/#contact" />
          </nav>
        </div>

        {/* Actions */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <a
            href={getAssetPath("resume.pdf")}
            className="w-full flex items-center justify-center gap-2 text-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 active:from-indigo-500 active:to-purple-500 text-white px-4 py-3 text-sm font-medium transition-colors duration-200"
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>📄</span>
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="lg:hidden mt-6 text-xs text-slate-500 dark:text-slate-400 text-center font-mono animate-fade-in">

      </div>
    </aside>
  );
}

// ===== Home =====
function Home({ projects, skills }) {
  return (
    <>
      {/* Hero */}
      <section id="home" className="mb-12 animate-slide-up">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-500/15 to-emerald-500/15 dark:from-indigo-400/15 dark:via-purple-400/15 dark:to-emerald-400/15 border border-white/30 dark:border-slate-700/50 p-8 sm:p-12 relative overflow-hidden">
          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl animate-float" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-lg animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 font-mono animate-slide-right">
              &gt; EMBEDDED • ROBOTICS • AUTOMOTIVE
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Kabeer Cheema
              </span>
            </h2>
            <div className="mt-6 text-slate-700 dark:text-slate-300 max-w-4xl text-sm sm:text-base leading-relaxed animate-slide-up" style={{ animationDelay: '400ms' }}>
              <p className="mb-4">
                Hey there! 👋 I'm an aspiring <span className="font-semibold text-indigo-600 dark:text-indigo-400">embedded & robotics engineer</span> currently studying Mechatronics Engineering at the University of Waterloo. I am passionate about real-time systems and reliable hardware–software integration.
              </p>
              <p>
                As a problem solver, I love working on end-to-end solutions - from sensor bring-up and firmware to algorithms and deployment on Linux/Raspberry Pi and microcontrollers. 
                <span className="font-mono text-sm text-purple-600 dark:text-purple-400"> Learning with: C/C++, Python, MATLAB/Simulink; exploring: CAN, SPI, UART, TCP/IP.</span>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <a 
                href="mailto:ks4cheem@uwaterloo.ca" 
                className="group rounded-2xl px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 text-sm font-medium transition-colors duration-200 shadow-lg cursor-pointer select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="flex items-center gap-2">
                  💬 <span>Email Me</span>
                  <span>→</span>
                </span>
              </a>
              <a 
                href={getAssetPath("resume.pdf")} 
                className="rounded-2xl px-6 py-3 border border-white/30 dark:border-slate-600 hover:bg-white/20 dark:hover:bg-slate-800/50 text-sm font-medium transition-colors duration-200 backdrop-blur-sm cursor-pointer select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                📄 Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mb-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <SectionHeading title="Featured Projects" ctaHref="https://github.com/kabeercheema" ctaLabel="View GitHub →" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <article
              key={p.slug}
              className="group rounded-3xl border border-white/30 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {p.hero && (
                <div className="relative overflow-hidden">
                  <img
                    src={p.hero}
                    alt={`${p.title} preview`}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-700/50 px-3 py-1 font-mono">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 4 && (
                    <span className="text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 font-mono text-slate-500">
                      +{p.tags.length - 4}
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.color = 'rgb(147, 51, 234)';
                    }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        e.currentTarget.style.color = '';
                      }, 150);
                    }}
                  >
                    <span>Explore Details</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <SectionHeading title="Professional Experience" />
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="UWaterloo EcoCAR — Connected & Autonomous Vehicles Lead" meta="May 2025 – Present" delay={0}>
            <ul className="list-none space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">⚡</span>
                Deployed a Raspberry Pi 4 CAN gateway on Linux with Bash automation and Python multithreading for low-latency, real-time control; validated via HIL.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-lg">🎯</span>
                Built a 2D LiDAR supervisory detector in RTMaps + Python with C++ UART/TCP I/O; used scikit-learn + NumPy with OpenCV visualization.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 text-lg">🚗</span>
                Designed radar + camera sensor fusion in Simulink/MATLAB with RTMaps + Python; improved tracking accuracy by 85%.
              </li>
            </ul>
          </Card>
          <Card title="i4i — Software QA Engineer" meta="Jan 2024 – Dec 2024" delay={200}>
            <ul className="list-none space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-lg">🛠️</span>
                Built a Python/XSLT tool to convert Excel metadata into Word, increasing team productivity by ~90%.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-lg">🎖️</span>
                Led functional, regression, and performance test cycles; coordinated QA contributors across releases.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-lg">📋</span>
                Authored release notes and validation documents aligned with FDA/Health Canada guidelines.
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mb-16 animate-slide-up" style={{ animationDelay: '500ms' }}>
        <SectionHeading title="Technical Arsenal" />
        <div className="flex flex-wrap gap-3">
          {skills.map((s, index) => (
            <span 
              key={s} 
              className="rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-2 text-sm font-medium hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all duration-300 cursor-default hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="animate-slide-up" style={{ animationDelay: '600ms' }}>
        <SectionHeading title="Let's Connect" />
        <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-white/30 dark:border-slate-700/50 p-8 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                I'm open to <span className="font-semibold text-indigo-600 dark:text-indigo-400">opportunities</span> and <span className="font-semibold text-purple-600 dark:text-purple-400">collaborations</span> across any field where I can apply my problem-solving skills and passion for technology.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2 font-mono text-sm">
                &gt; Whether it's tech, research, or innovation - let's connect! ⚡
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:ks4cheem@uwaterloo.ca" 
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 font-medium active:from-indigo-500 active:to-purple-500 transition-colors duration-200 shadow-lg"
                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span>📧</span>
                <span>Email</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/kabeer-cheema-b32238288/" 
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 rounded-2xl border border-white/30 dark:border-slate-600 active:bg-white/20 dark:active:bg-slate-800/50 px-6 py-4 font-medium transition-colors duration-200 backdrop-blur-sm"
                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/kabeercheema" 
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 rounded-2xl border border-white/30 dark:border-slate-600 active:bg-white/20 dark:active:bg-slate-800/50 px-6 py-4 font-medium transition-colors duration-200 backdrop-blur-sm"
                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span>🐙</span>
                <span>GitHub</span>
              </a>
            </div>
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
      <section className="py-20 text-center animate-slide-up">
        <h1 className="text-2xl font-semibold mb-2">Project not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">The project you're looking for doesn't exist.</p>
        <Link to="/" className="rounded-2xl px-4 py-2 border border-white/30 dark:border-slate-600 hover:bg-white/20 dark:hover:bg-slate-800/50 transition-all duration-300">Back to Home</Link>
      </section>
    );
  }

  return (
    <section className="animate-slide-up">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/#projects" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 font-mono">← Back to Projects</Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 font-mono">PROJECT</p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{project.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-700/50 px-3 py-1 font-mono">{t}</span>
          ))}
        </div>
      </div>

      {/* Hero image (only if provided) */}
      {project.hero && (
        <div className="mb-8 rounded-3xl border border-white/30 dark:border-slate-700/50 overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
          <img src={project.hero} alt={`${project.title} preview`} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Overview */}
      <div className="prose prose-slate dark:prose-invert max-w-none animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Overview</h2>
        <p className="!mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{project.desc}</p>
      </div>

      {/* Highlights */}
      {project.details && project.details.length > 0 && (
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Key Highlights</h3>
          <ul className="list-none space-y-3">
            {project.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50">
                <span className="text-indigo-500 font-bold text-lg">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links (only if present) */}
      {project.links && project.links.repo && (
        <div className="mt-10 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <a
            href={project.links.repo}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg"
            target="_blank"
            rel="noreferrer"
          >
            <span>🔗</span>
            <span>View Repository</span>
          </a>
        </div>
      )}
    </section>
  );
}

// ===== Reusable UI bits =====
function SectionHeading({ title, ctaHref, ctaLabel }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">{title}</h2>
      {ctaHref && ctaLabel && (
        <a href={ctaHref} className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 font-mono group">
          <span className="flex items-center gap-1">
            {ctaLabel}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </a>
      )}
    </div>
  );
}

function Card({ title, meta, children, delay = 0 }) {
  return (
    <div 
      className="rounded-3xl border border-white/30 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
        {meta && <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{meta}</span>}
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
