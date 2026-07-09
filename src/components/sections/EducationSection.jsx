import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="04"
          label="Education"
          title="Academic Foundation"
          description="Strong performance in mechatronics engineering with systems, controls, and software depth for autonomous platforms."
        />
      </Reveal>

      <Reveal delay={90}>
        <article className="mt-8 rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                University of Waterloo
              </h3>
              <p className="mt-0.5 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                BASc. Mechatronics Engineering (Currently in 3A Term)
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Sept 2023 - Apr 2028
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Academic Standing</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">GPA: 93%</p>
            </div>
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Focus</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Autonomous systems, software architecture, and embedded intelligence</p>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
