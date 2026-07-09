/**
 * Numbered section heading used across all homepage sections.
 * Renders a number, label, title, optional description, and optional action slot.
 */
export function SectionHeader({ number, label, title, description, action }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">{number}</span>
        <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl md:text-4xl">{title}</h2>
          {description ? <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}
