import { useTypingEffect } from "../../hooks/useTypingEffect";
import { HERO_PHRASES } from "../../data/hero";
import { getResumeUrl } from "../../data/resume";
import { getAssetPath } from "../../utils/assetPath";
import { Reveal } from "../ui/Reveal";
import { CTAButton } from "../ui/CTAButton";
import { DownloadIcon } from "../icons";

const CONTAINER = "container";

export function Hero() {
  const typed = useTypingEffect(HERO_PHRASES, 70, 35, 2200);

  return (
    <section id="about" className="hero">
      <div className={CONTAINER}>
        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal>
              <p className="eyebrow">
                Software Engineering & Autonomous Systems Portfolio
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="hero__title">
                Building reliable software for complex physical systems.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="hero__summary">
                I am Kabeer Cheema, currently in my 3A term of Mechatronics Engineering at the University of Waterloo.
                I am passionate about developing software for autonomous vehicles, robotics, and full-stack systems. My
                work focuses on the intersection of hardware and software, and I am continuously expanding my skills in
                systems-level programming, machine learning, and hardware integration.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="hero__status">
                <span>Current focus</span>
                <span className="hero__typed">{typed}<span className="typing-cursor" /></span>
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="hero__actions">
                <CTAButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  View Projects
                </CTAButton>
                <CTAButton href={getResumeUrl()} variant="secondary" icon={<DownloadIcon />}>
                  Download Resume
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className="portrait-frame">
              <img
                src={getAssetPath("images/hero.jpg")}
                alt="Kabeer Cheema portrait"
                className="portrait-frame__image"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
