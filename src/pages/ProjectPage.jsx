import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { Reveal } from "../components/ui/Reveal";
import { SkillBadge } from "../components/ui/SkillBadge";
import { CTAButton } from "../components/ui/CTAButton";
import { ArrowLeftIcon, GitHubIcon } from "../components/icons";

export function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="container project-not-found">
        <h1>Project not found</h1>
        <p>The project you are looking for does not exist.</p>
        <Link
          to="/"
          className="button button--secondary"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="container project-detail">
      <Reveal>
        <Link
          to="/"
          className="project-detail__back"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Projects
        </Link>
      </Reveal>

      <Reveal delay={50}>
        <div className="project-detail__tags">
          {project.tags.map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="project-detail__title">
          {project.title}
        </h1>
      </Reveal>

      {project.hero && (
        <Reveal delay={180}>
          <div className="project-detail__media">
            <img src={project.hero} alt={`${project.title} preview`} />
          </div>
        </Reveal>
      )}

      <Reveal delay={260}>
        <div className="project-detail__overview">
          <h2>Overview</h2>
          <p>{project.desc}</p>
        </div>
      </Reveal>

      {project.details?.length > 0 && (
        <div className="project-detail__highlights">
          <Reveal>
            <h2>Key highlights</h2>
          </Reveal>

          {project.details.map((detail, i) => (
            <Reveal key={detail} delay={i * 45}>
              <div className="project-detail__highlight">
                <span>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {project.links?.repo && (
        <Reveal delay={180}>
          <div className="project-detail__repository">
            <CTAButton href={project.links.repo} target="_blank" rel="noreferrer" icon={<GitHubIcon />}>
              View Repository
            </CTAButton>
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="project-detail__footer">
          <Link
            to="/"
            className="project-detail__back"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Projects
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
