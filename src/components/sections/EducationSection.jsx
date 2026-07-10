import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function EducationSection() {
  return (
    <section id="education" className="section">
      <Reveal>
        <SectionHeader
          number="04"
          label="Education"
          title="Academic Foundation"
          description="Strong performance in mechatronics engineering with systems, controls, and software depth for autonomous platforms."
        />
      </Reveal>

      <Reveal delay={90}>
        <article className="education-card">
          <div className="education-card__header">
            <div>
              <h3 className="education-card__school">
                University of Waterloo
              </h3>
              <p className="education-card__degree">
                BASc. Mechatronics Engineering (Currently in 3A Term)
              </p>
            </div>
            <span className="metadata">
              Sept 2023 - Apr 2028
            </span>
          </div>

          <div className="education-card__facts">
            <div className="education-card__fact">
              <p>Academic standing</p>
              <strong>GPA: 93%</strong>
            </div>
            <div className="education-card__fact">
              <p>Focus</p>
              <strong>Autonomous systems, software architecture, and embedded intelligence</strong>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
