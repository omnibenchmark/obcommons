# AGENTS.md — obcommons

Guidance for AI coding agents working on this repository.

## What this is

A community registry of [omnibenchmark](https://omnibenchmark.org) modules. Contributors
open a pull request adding one YAML file; CI validates it; merging to `main` publishes
the site to https://omnibenchmark.github.io/obcommons/.

- **Stack**: Astro 5 + Tailwind v4. No UI framework, no hydration, no search library.
- **License**: GPL-3.0-or-later.
- **Node**: 22 (`.nvmrc`). Astro refuses to run on 18.

---

## Layout

```
modules/<id>.yaml          # the registry — the only thing contributors touch
src/
  content.config.ts        # collection + Zod schema — the single definition of the entry format
  lib/filter.js            # matches() / facetsOf() / haystackOf(), shared by index page and test
  lib/updated.js           # "last updated", read from git
  lib/url.js               # href() — prefixes the GitHub Pages base path
  layouts/Base.astro
  components/ModuleCard.astro
  pages/index.astro        # cards + search + chips, filtering in one inline <script>
  pages/modules/[id].astro
  pages/tags/[tag].astro
  pages/modules.json.ts    # the whole registry as data
scripts/check-repos.sh     # every entry's repo + commit must resolve
.github/workflows/         # ci.yml (PRs) and deploy.yml (Pages)
```

## Commands

```sh
npm install
npm run dev      # http://localhost:4321/obcommons/
npm test         # node --test — the filter logic
npm run build    # also validates every entry against the schema
bash scripts/check-repos.sh modules/*.yaml
```

## Things that will bite you

- **The Zod schema is the PR gate.** A malformed entry fails `astro build` naming the file
  and field. Do not add a second validator; change `src/content.config.ts` instead.
- **The filename is the module id.** There is no `id:` field in the YAML.
- **`updated` is derived from git**, not declared — `git log -1` on the entry file. Anything
  building the site needs full history (`fetch-depth: 0` in CI), or dates come out blank.
- **Base path.** The site is served under `/obcommons`, so every internal link goes through
  `href()` from `src/lib/url.js`. A bare `/modules/foo/` 404s in production but works in dev.
- **Facet semantics.** Chips are `group:value`. Values in the same group OR, groups AND.
  `facetsOf()` decides what is filterable; add a group there and the index page picks it up.
- **`node --test <dir>` does not traverse directories on node 22.** The test script globs
  `src/lib/*.test.js` for that reason.
- **Filtering is server-rendered plus 40 lines of DOM code.** The full list works without
  JavaScript. Keep it that way — do not reach for a framework or a search index at this size.

## Adding to the registry

See CONTRIBUTING.md. `category` is `generic` (useful in any benchmark) or `biofx`
(domain-specific); extend the enum in `src/content.config.ts` when a third kind shows up.

## Conventions

- No new dependencies without a reason a few lines of code cannot cover.
- Non-trivial logic leaves one runnable check behind — see `src/lib/filter.test.js`.
- Deferred, deliberately: submission issue-form, benchmarks/results collections, fuzzy
  search (Fuse.js), full-text search (Pagefind, past ~1k entries).
