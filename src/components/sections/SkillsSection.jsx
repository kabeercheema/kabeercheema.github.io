import { SKILL_CATEGORIES } from "../../data/skills";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillBadge } from "../ui/SkillBadge";

export function SkillsSection() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <SectionHeader
          number="03"
          label="Tech Stack"
          title="Technical Capabilities"
          description="Core languages, tools, and frameworks used for systems engineering, ML integrations, and production software delivery."
        />
      </Reveal>

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.label} delay={i * 60}>
            <div className="skill-group">
              <h3 className="skill-group__title">{cat.label}</h3>
              <div className="skill-group__items">
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
