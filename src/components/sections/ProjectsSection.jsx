import { PROJECTS } from "../../data/projects";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ProjectCard";
import { ArrowUpRightIcon } from "../icons";

export function ProjectsSection() {
  return (
    <section id="projects" className="section section--first">
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
              className="section-action"
            >
              View GitHub
              <ArrowUpRightIcon className="section-action__icon" />
            </a>
          }
        />
      </Reveal>

      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className={index === 0 ? "project-grid__featured" : ""}>
            <ProjectCard project={project} index={index} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
