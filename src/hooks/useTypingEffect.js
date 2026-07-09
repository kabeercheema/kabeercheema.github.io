import { useEffect, useState } from "react";

/**
 * Cycles through an array of phrases with a type-then-delete animation.
 * @param {string[]} phrases
 * @param {number} [speed=80] — typing speed (ms per character)
 * @param {number} [delSpeed=40] — deleting speed (ms per character)
 * @param {number} [pause=2000] — pause before deleting (ms)
 * @returns {string} current visible text
 */
export function useTypingEffect(phrases, speed = 80, delSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIdx((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      deleting ? delSpeed : speed
    );

    return () => clearTimeout(timer);
  }, [text, deleting, idx, phrases, speed, delSpeed, pause]);

  return text;
}
