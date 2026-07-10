import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollY } from "../../hooks/useScrollY";
import { useActiveSection } from "../../hooks/useActiveSection";
import { NAV_ITEMS, NAV_SECTION_IDS } from "../../data/navigation";
import { getResumeUrl } from "../../data/resume";
import { SunIcon, MoonIcon, MenuIcon, XIcon, DownloadIcon } from "../icons";

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
        className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
      >
        <nav className="container site-nav" aria-label="Primary navigation">
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="brand"
          >
            <span className="brand__inner">
              <span className="brand__mark">
                KC
              </span>
              <span className="brand__name">kabeer cheema</span>
            </span>
          </button>

          <ul className="site-nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goToSection(item.id)}
                  className={`nav-link ${active === item.id ? "nav-link--active" : ""}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="site-nav__actions">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="icon-button"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href={getResumeUrl()}
              className="button button--secondary site-nav__resume"
            >
              <DownloadIcon />
              Resume
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="icon-button site-nav__menu-toggle"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="mobile-menu__link"
              >
                {item.label}
              </button>
            ))}
            <a
              href={getResumeUrl()}
              className="button button--primary mobile-menu__resume"
            >
              <DownloadIcon /> Resume
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
