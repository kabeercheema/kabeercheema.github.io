/**
 * Resolves a relative asset path against the Vite base URL.
 * @param {string} path — relative path (e.g. "images/hero.jpg")
 * @returns {string} fully-qualified path with base prefix
 */
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return base + clean;
};
