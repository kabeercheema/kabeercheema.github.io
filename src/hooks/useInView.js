import { useEffect, useRef, useState } from "react";

/**
 * Observes whether an element is in the viewport.
 * Once visible, the observer disconnects (fire-once).
 * @param {IntersectionObserverInit} [options]
 * @returns {[React.RefObject, boolean]}
 */
export function useInView(options) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
