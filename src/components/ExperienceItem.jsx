/**
 * Experience card displaying role, company, period, and bullet points.
 */
export function ExperienceItem({ experience }) {
  return (
    <article className="experience-card">
      <div className="experience-card__header">
        <div>
          <h3 className="experience-card__role">{experience.role}</h3>
          <p className="experience-card__company">{experience.company}</p>
        </div>
        <span className="metadata">{experience.period}</span>
      </div>

      <ul className="experience-card__list">
        {experience.bullets.map((bullet) => (
          <li key={bullet}>
            <span className="experience-card__bullet" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
