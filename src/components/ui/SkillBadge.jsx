/**
 * Reusable tag/badge chip for skills, technologies, etc.
 */
export function SkillBadge({ children }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 transition-colors hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-300">
      {children}
    </span>
  );
}
