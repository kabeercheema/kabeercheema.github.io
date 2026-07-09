import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { Reveal } from "../components/ui/Reveal";
import { SkillBadge } from "../components/ui/SkillBadge";
import { CTAButton } from "../components/ui/CTAButton";
import { ArrowLeftIcon, GitHubIcon } from "../components/icons";

const CONTAINER = "mx-auto max-w-6xl px-5 sm:px-8";

export function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className={`${CONTAINER} pt-32 pb-20 text-center`}>
        <h1 className="mb-4 font-display text-3xl font-bold">Project not found</h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">The project you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:border-cyan-500/50 dark:border-slate-700"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 pb-20 sm:px-8">
      <Reveal>
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-mono text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Projects
        </Link>
      </Reveal>

      <Reveal delay={50}>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
          {project.title}
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-cyan-500" />
      </Reveal>

      {project.hero && (
        <Reveal delay={180}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img src={project.hero} alt={`${project.title} preview`} className="h-auto w-full object-cover" />
          </div>
        </Reveal>
      )}

      <Reveal delay={260}>
        <div className="mt-9">
          <h2 className="mb-3 font-display text-xl font-semibold">Overview</h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.desc}</p>
        </div>
      </Reveal>

      {project.details?.length > 0 && (
        <div className="mt-10 space-y-3">
          <Reveal>
            <h2 className="mb-4 font-display text-xl font-semibold">Key Highlights</h2>
          </Reveal>

          {project.details.map((detail, i) => (
            <Reveal key={detail} delay={i * 45}>
              <div className="flex gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <span className="mt-0.5 w-6 flex-shrink-0 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {project.links?.repo && (
        <Reveal delay={180}>
          <div className="mt-10">
            <CTAButton href={project.links.repo} target="_blank" rel="noreferrer" icon={<GitHubIcon />}>
              View Repository
            </CTAButton>
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="mt-14 border-t border-slate-200 pt-7 dark:border-slate-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Projects
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
