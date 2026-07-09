import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { CTAButton } from "../ui/CTAButton";
import { MailIcon, LinkedInIcon, PhoneIcon, GitHubIcon } from "../icons";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-slate-200/80 py-16 dark:border-slate-800/80 md:py-20">
      <Reveal>
        <SectionHeader
          number="05"
          label="Contact"
          title="Open to Software Engineering and Autonomous Systems Roles"
          description="I am actively seeking opportunities where I can contribute to high-impact software, autonomy, and systems integration work."
        />
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white/90 p-7 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                I specialize in systems-level programming, machine learning integrations, and robust software
                architecture for autonomous platforms. If your team is building reliability-critical software, I would
                love to connect.
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                ks4cheem@uwaterloo.ca / 519-500-2915 / linkedin.com/in/kabeercheema
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
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
