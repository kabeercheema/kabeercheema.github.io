import { useInView } from "../../hooks/useInView";

/**
 * Scroll-triggered reveal animation wrapper.
 * Once the element enters the viewport, it fades in with an optional directional slide.
 */
export function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal reveal--${direction} ${inView ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
