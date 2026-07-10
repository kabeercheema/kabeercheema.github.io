/**
 * Numbered section heading used across all homepage sections.
 * Renders a number, label, title, optional description, and optional action slot.
 */
export function SectionHeader({ number, label, title, description, action }) {
  return (
    <div className="section-heading">
      <div className="section-heading__copy">
        <div className="section-kicker"><span>{number}</span><span>{label}</span></div>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
        </div>
      {action}
    </div>
  );
}
