import { EXPERIENCE } from "../../data/experience";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ExperienceItem } from "../ExperienceItem";

export function ExperienceSection() {
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
