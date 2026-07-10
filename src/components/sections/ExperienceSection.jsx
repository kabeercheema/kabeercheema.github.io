import { EXPERIENCE } from "../../data/experience";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ExperienceItem } from "../ExperienceItem";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <SectionHeader
          number="02"
          label="Experience"
          title="Professional Experience"
          description="Hands-on delivery in autonomous systems and regulated software environments."
        />
      </Reveal>

      <div className="experience-grid">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={`${exp.company}-${exp.role}`} delay={i * 90}>
            <ExperienceItem experience={exp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
