import { useEffect, useState } from "react";

/**
 * Uses IntersectionObserver to track which section is currently
 * most visible in the viewport. Useful for scroll-spy nav highlighting.
 * @param {string[]} ids — DOM element IDs to observe
 * @returns {string} the id of the currently active section
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState("");
  // Stringify the array to ensure a stable reference dependency
  const idsKey = JSON.stringify(ids);

  useEffect(() => {
    const parsedIds = JSON.parse(idsKey);
    const observers = parsedIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [idsKey]);

  return active;
}
