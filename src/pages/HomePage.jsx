import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/sections/Hero";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { EducationSection } from "../components/sections/EducationSection";
import { ContactSection } from "../components/sections/ContactSection";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Gracefully handle scroll routing safely after paint
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <main className="container site-main">
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
