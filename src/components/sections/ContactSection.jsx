import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { CTAButton } from "../ui/CTAButton";
import { MailIcon, LinkedInIcon, PhoneIcon, GitHubIcon } from "../icons";

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <SectionHeader
          number="05"
          label="Contact"
          title="Open to Software Engineering and Autonomous Systems Roles"
          description="I am actively seeking opportunities where I can contribute to high-impact software, autonomy, and systems integration work."
        />
      </Reveal>

      <Reveal delay={90}>
        <div className="contact-panel">
          <div className="contact-panel__layout">
            <div>
              <p className="contact-panel__copy">
                I specialize in systems-level programming, machine learning integrations, and robust software
                architecture for autonomous platforms. If your team is building reliability-critical software, I would
                love to connect.
              </p>
              <p className="contact-panel__metadata">
                ks4cheem@uwaterloo.ca / 519-500-2915 / linkedin.com/in/kabeercheema
              </p>
            </div>

            <div className="contact-panel__actions">
              <CTAButton href="mailto:ks4cheem@uwaterloo.ca" icon={<MailIcon />}>
                Email Me
              </CTAButton>
              <CTAButton
                href="https://linkedin.com/in/kabeercheema"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                icon={<LinkedInIcon />}
              >
                LinkedIn
              </CTAButton>
              <CTAButton href="tel:+15195002915" variant="secondary" icon={<PhoneIcon />}>
                Call
              </CTAButton>
              <CTAButton
                href="https://github.com/kabeercheema"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                icon={<GitHubIcon />}
              >
                GitHub
              </CTAButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
