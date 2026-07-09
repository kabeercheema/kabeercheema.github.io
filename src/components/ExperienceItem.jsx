/**
 * Experience card displaying role, company, period, and bullet points.
 */
export function ExperienceItem({ experience }) {
  return (
    <article className="h-full rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm shadow-slate-200/50 transition-colors hover:border-cyan-500/35 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-7">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{experience.role}</h3>
          <p className="mt-0.5 text-sm font-medium text-cyan-700 dark:text-cyan-300">{experience.company}</p>
        </div>
        <span className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{experience.period}</span>
      </div>

      <ul className="space-y-3">
        {experience.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
