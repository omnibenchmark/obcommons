# obcommons

A community registry of [omnibenchmark](https://omnibenchmark.org) modules.

One YAML file per module in [`modules/`](modules/). Open a pull request to add
yours — see [CONTRIBUTING.md](CONTRIBUTING.md). CI validates the entry and checks
that the repository and commit resolve; merging to `main` publishes the site to
GitHub Pages.

The whole registry is also served as data at `/modules.json`.

## Development

Needs Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev     # http://localhost:4321/obcommons/
npm test        # the filter logic
npm run build   # also validates every entry against the schema
```

Astro + Tailwind. `src/content.config.ts` holds the schema — it is the only place
the entry format is defined.
