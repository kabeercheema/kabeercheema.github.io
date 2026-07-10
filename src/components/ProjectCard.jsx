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
      className="project-card"
    >
      <div className={`project-card__media ${featured ? "project-card__media--featured" : ""}`}>
        {project.hero ? (
          <img src={project.hero} alt={project.title} className="project-card__image" />
        ) : (
          <div className="project-card__placeholder">
            <span>&lt;/&gt;</span>
          </div>
        )}
        <span className="project-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="project-card__body">
        {featured ? (
          <span className="project-card__label">Featured project</span>
        ) : null}
        <h3 className="project-card__title">
          {project.title}
        </h3>
        <p className="project-card__description">{project.desc}</p>

        <div className="project-card__tags">
          {project.tags.slice(0, 4).map((tag) => (
            <SkillBadge key={tag}>{tag}</SkillBadge>
          ))}
          {project.tags.length > 4 ? (
            <span className="badge">
              +{project.tags.length - 4}
            </span>
          ) : null}
        </div>

        <div className="project-card__footer">
          <span className="project-card__link">
            View Details
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
