import { useTypingEffect } from "../../hooks/useTypingEffect";
import { HERO_PHRASES } from "../../data/hero";
import { getResumeUrl } from "../../data/resume";
import { getAssetPath } from "../../utils/assetPath";
import { Reveal } from "../ui/Reveal";
import { CTAButton } from "../ui/CTAButton";
import { DownloadIcon } from "../icons";

const CONTAINER = "mx-auto max-w-6xl px-5 sm:px-8";

export function Hero() {
  const typed = useTypingEffect(HERO_PHRASES, 70, 35, 2200);

  return (
    <section id="about" className="relative scroll-mt-20 border-b border-slate-200/80 pt-28 pb-20 dark:border-slate-800/80 md:pt-36 md:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className={`${CONTAINER} relative`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <Reveal>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
                Software Engineering & Autonomous Systems Portfolio
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
                Mechatronics Engineering Student | Software & Autonomous Systems
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                I am Kabeer Cheema, currently in my 3A term of Mechatronics Engineering at the University of Waterloo.
                I am passionate about developing software for autonomous vehicles, robotics, and full-stack systems. My
                work focuses on the intersection of hardware and software, and I am continuously expanding my skills in
                systems-level programming, machine learning, and hardware integration.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 font-mono text-sm text-slate-500 dark:text-slate-400">
                Current focus: <span className="font-semibold text-cyan-700 dark:text-cyan-300">{typed}</span>
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-typing-cursor bg-cyan-500 align-middle" />
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-wrap gap-3">
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
            <div className="mx-auto w-[88%] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 lg:w-full">
              <img
                src={getAssetPath("images/hero.jpg")}
                alt="Kabeer Cheema portrait"
                className="aspect-[4/5] w-full object-cover object-[center_20%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
