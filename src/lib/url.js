const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an absolute in-site path with the GitHub Pages base path. */
export const href = (path) => BASE + path;
