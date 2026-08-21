import { execSync } from 'node:child_process';

// ponytail: one `git log` per file at build time. Fine for hundreds of modules;
// parse a single `git log --name-only` pass if it ever shows up in build times.
const cache = new Map();

/** ISO date the registry entry last changed, from git. null outside a git checkout. */
export function updatedAt(id) {
  if (!cache.has(id)) {
    let iso = null;
    try {
      iso =
        execSync(`git log -1 --format=%cI -- "modules/${id}.yaml"`, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim() || null;
    } catch {
      // not a git checkout (or shallow clone with no history for this file)
    }
    cache.set(id, iso);
  }
  return cache.get(id);
}

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'UTC' }) : null;
