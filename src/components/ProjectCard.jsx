import { Link } from "react-router-dom";
import { SkillBadge } from "./ui/SkillBadge";
import { ArrowRightIcon } from "./icons";

/**
 * Project summary card used in the projects grid on the homepage.
 * Links to the full project detail page.
 */
export function ProjectCard({ project, index, featured = false }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20"
    >
      <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${featured ? "aspect-[16/8]" : "aspect-video"}`}>
        {project.hero ? (
          <img src={project.hero} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-3xl text-slate-300 dark:text-slate-600">&lt;/&gt;</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md border border-slate-300/80 bg-white/80 px-2 py-0.5 font-mono text-[11px] text-slate-500 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/85 dark:text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {featured ? (
          <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400">Featured Project</span>
        ) : null}
        <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-300">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
          {project.tags.length > 4 ? (
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              +{project.tags.length - 4}
            </span>
          ) : null}
        </div>

        <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 transition-all group-hover:gap-2.5 dark:text-cyan-300">
            View Details
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
