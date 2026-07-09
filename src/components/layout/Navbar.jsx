import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollY } from "../../hooks/useScrollY";
import { useActiveSection } from "../../hooks/useActiveSection";
import { NAV_ITEMS, NAV_SECTION_IDS } from "../../data/navigation";
import { getResumeUrl } from "../../data/resume";
import { SunIcon, MoonIcon, MenuIcon, XIcon, DownloadIcon } from "../icons";

const CONTAINER = "mx-auto max-w-6xl px-5 sm:px-8";

export function Navbar({ isDark, toggleTheme }) {
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
        // Pass the target section ID to the router state to avoid race conditions
        navigate("/", { state: { scrollTo: id } });
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
            className="rounded-md px-1 py-0.5 transition-opacity hover:opacity-80"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/45 bg-cyan-500/10 font-mono text-xs font-bold tracking-wide text-cyan-700 dark:text-cyan-300">
                KC
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">kabeer cheema</span>
            </span>
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
              href={getResumeUrl()}
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
              href={getResumeUrl()}
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
