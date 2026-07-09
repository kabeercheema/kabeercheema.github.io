import { SKILL_CATEGORIES } from "../../data/skills";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillBadge } from "../ui/SkillBadge";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="03"
          label="Tech Stack"
          title="Technical Capabilities"
          description="Core languages, tools, and frameworks used for systems engineering, ML integrations, and production software delivery."
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
