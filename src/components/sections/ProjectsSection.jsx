import { PROJECTS } from "../../data/projects";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ProjectCard";
import { ArrowUpRightIcon } from "../icons";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 py-16 md:py-20">
      <Reveal>
        <SectionHeader
          number="01"
          label="Projects"
          title="Featured Engineering Projects"
          description="Selected work across embedded software, sensor fusion, robotics perception, and hardware integration."
          action={
            <a
              href="https://github.com/kabeercheema"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-300/90 px-3 py-1.5 text-xs font-mono uppercase tracking-wide text-slate-600 transition-colors hover:border-cyan-500/50 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-cyan-300"
            >
              View GitHub
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          }
        />
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className={index === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} index={index} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
